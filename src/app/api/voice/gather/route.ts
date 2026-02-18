import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── TwiML helper ────────────────────────────────────────────────────────────

function twiml(body: string): NextResponse {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`,
    { status: 200, headers: { "Content-Type": "text/xml; charset=utf-8" } }
  );
}

function gatherWith(prompt: string, action: string): string {
  return `
    <Gather input="speech" timeout="8" speechTimeout="auto"
            action="${action}" method="POST">
      <Say voice="Polly.Joanna">${prompt}</Say>
    </Gather>
    <Say voice="Polly.Joanna">
      I didn't catch that. Someone from our team will follow up with you shortly. Goodbye!
    </Say>
  `;
}

// ─── NLU: classify procedure via OpenAI gpt-4o-mini (falls back to keywords) ─

const PROCEDURE_LABELS: Record<string, string> = {
  "single-tooth": "a single tooth implant",
  "all-on-4": "All-on-4 implants",
  "implant-dentures": "snap-in dentures",
  "same-day": "same-day implants",
  "bone-graft": "bone grafting",
  "full-mouth": "full mouth reconstruction",
  "not-sure": "a free implant consultation",
};

function keywordProcedure(speech: string): string {
  const s = speech.toLowerCase();
  if (s.includes("all on 4") || s.includes("all-on-4") || s.includes("all on four")) return "all-on-4";
  if (s.includes("full mouth") || s.includes("full arch")) return "full-mouth";
  if (s.includes("same day") || s.includes("same-day") || s.includes("immediate")) return "same-day";
  if (s.includes("snap") || s.includes("denture")) return "implant-dentures";
  if (s.includes("bone graft")) return "bone-graft";
  if (s.includes("single") || s.includes("one tooth")) return "single-tooth";
  return "not-sure";
}

async function classifyProcedure(speech: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return keywordProcedure(speech);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You classify dental procedure intent from speech transcripts.
Return ONLY one of these exact IDs — nothing else:
single-tooth, all-on-4, implant-dentures, same-day, bone-graft, full-mouth, not-sure
If the caller is unsure or unclear, return: not-sure`,
          },
          { role: "user", content: speech },
        ],
        max_tokens: 20,
        temperature: 0,
      }),
    });
    const data = await res.json();
    const id = data.choices?.[0]?.message?.content?.trim() ?? "";
    return PROCEDURE_LABELS[id] !== undefined ? id : keywordProcedure(speech);
  } catch {
    return keywordProcedure(speech);
  }
}

// ─── NLU: extract Houston area from speech ───────────────────────────────────

function keywordLocation(speech: string): string {
  const s = speech.toLowerCase();
  const map: [string[], string][] = [
    [["katy"], "Katy"],
    [["sugar land", "sugarland"], "Sugar Land"],
    [["woodlands", "wood lands", "the woodlands"], "The Woodlands"],
    [["pearland"], "Pearland"],
    [["cypress"], "Cypress"],
    [["spring"], "Spring"],
    [["clear lake", "clearlake"], "Clear Lake"],
    [["league city", "leaguecity"], "League City"],
    [["pasadena"], "Pasadena"],
    [["baytown"], "Baytown"],
    [["humble"], "Humble"],
    [["missouri city", "missouricite"], "Missouri City"],
    [["richmond"], "Richmond"],
    [["conroe"], "Conroe"],
    [["friendswood"], "Friendswood"],
    [["heights", "the heights"], "Heights"],
    [["montrose"], "Montrose"],
    [["midtown"], "Midtown"],
    [["downtown"], "Downtown Houston"],
    [["medical center", "med center"], "Medical Center"],
    [["river oaks"], "River Oaks"],
    [["galleria", "uptown"], "Galleria"],
    [["memorial"], "Memorial"],
    [["bellaire"], "Bellaire"],
    [["west university", "west u"], "West University"],
  ];
  for (const [keywords, label] of map) {
    if (keywords.some((kw) => s.includes(kw))) return label;
  }
  return "Houston";
}

async function classifyLocation(speech: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return keywordLocation(speech);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Extract a Houston-area neighborhood or suburb from the caller's speech.
Common areas: Downtown Houston, Montrose, Medical Center, Heights, Midtown, River Oaks,
Galleria, Memorial, Katy, Sugar Land, The Woodlands, Clear Lake, Pearland, Cypress, Spring,
Missouri City, Pasadena, Baytown, League City, Humble, Richmond, Conroe, Friendswood, Bellaire.
Return the area name only (2–4 words max). If unclear, return: Houston`,
          },
          { role: "user", content: speech },
        ],
        max_tokens: 15,
        temperature: 0,
      }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || keywordLocation(speech);
  } catch {
    return keywordLocation(speech);
  }
}

// ─── Name extraction (simple — first 1–2 words of speech) ───────────────────

function extractName(speech: string): string {
  const cleaned = speech
    .replace(/\b(my name is|i'm|i am|it's|its|this is)\b/gi, "")
    .trim();
  return cleaned.split(/\s+/).slice(0, 2).join(" ") || "there";
}

// ─── Submit lead to existing /api/leads endpoint ─────────────────────────────

async function submitLead(payload: {
  name: string;
  phone: string;
  procedure: string;
  location: string;
}): Promise<void> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ??
    "https://htxdentalimplants.com";

  await fetch(`${base}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      email: "",
      procedure: payload.procedure,
      source: "twilio-voice",
      location_interest: payload.location,
      urgency: "asap",
    }),
  });
}

// ─── Main gather handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Twilio sends form-encoded bodies on voice webhooks
  const form = await req.formData();
  const speech = (form.get("SpeechResult") as string) ?? "";
  const callerPhone = (form.get("From") as string) ?? "unknown";

  const url = new URL(req.url);
  const step = url.searchParams.get("step") ?? "procedure";
  const procedure = url.searchParams.get("procedure") ?? "";
  const location = url.searchParams.get("location") ?? "";

  // ── Step 1: Classify procedure, ask for location ──────────────────────────
  if (step === "procedure") {
    const proc = await classifyProcedure(speech);
    const procLabel = PROCEDURE_LABELS[proc] ?? "a dental implant procedure";
    const nextAction = `/api/voice/gather?step=location&procedure=${encodeURIComponent(proc)}`;

    return twiml(
      gatherWith(
        `Got it — ${procLabel}.
         And which area of Houston are you in?
         For example: Katy, Sugar Land, Montrose, the Medical Center, or just say your neighborhood.`,
        nextAction
      )
    );
  }

  // ── Step 2: Classify location, ask for name ───────────────────────────────
  if (step === "location") {
    const loc = await classifyLocation(speech);
    const procLabel = PROCEDURE_LABELS[procedure] ?? "dental implants";
    const nextAction = `/api/voice/gather?step=name&procedure=${encodeURIComponent(procedure)}&location=${encodeURIComponent(loc)}`;

    return twiml(
      gatherWith(
        `Perfect — ${loc}. Last question: what's your first name?`,
        nextAction
      )
    );
  }

  // ── Step 3: Capture name, submit lead, say goodbye ────────────────────────
  if (step === "name") {
    const name = extractName(speech);
    const procLabel = PROCEDURE_LABELS[procedure] ?? "dental implants";

    // Fire-and-forget — don't block the voice response
    submitLead({
      name,
      phone: callerPhone,
      procedure,
      location,
    }).catch(() => {});

    return twiml(`
      <Say voice="Polly.Joanna">
        Great, ${name}!
        I've matched you with Houston's top specialists for ${procLabel} near ${location || "Houston"}.
        Expect a call within 24 hours to schedule your free consultation — no obligation.
        Thank you for calling H T X Dental Implants. Have a wonderful day!
      </Say>
      <Hangup/>
    `);
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return twiml(`
    <Say voice="Polly.Joanna">
      I'm sorry, something went wrong on our end. Please call back and we'll get you sorted out.
      Goodbye!
    </Say>
    <Hangup/>
  `);
}
