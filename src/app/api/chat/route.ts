import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the AI assistant for HTX Dental Implants — Houston's trusted implant network.
Your goal: help patients find the right specialist and collect their contact info for a free consultation match.

PERSONALITY: Warm, empathetic, concise. Many patients are nervous or price-sensitive. Reassure them.

FLOW:
1. Greet briefly and ask what procedure they're interested in
2. Ask which Houston area they're in
3. Ask their name
4. Ask for phone number — offer two options:
   a) "Fill out our quick form: htxdentalimplants.com/get-quotes"
   b) "Leave your number and we'll call you back within 24 hours — no forms needed"
5. Once you have name + phone → call the submit_lead tool

CALLBACK OPTION: If they say they're busy, can't fill a form, or prefer a call — immediately offer the callback. Just get name + phone and submit.

PROCEDURES: Single tooth implant, All-on-4, Snap-in dentures, Same-day implants, Bone grafting, Full mouth reconstruction, Free consultation (not sure)

SERVICE AREAS: All Houston metro — Katy, Sugar Land, The Woodlands, Pearland, Cypress, Spring, Clear Lake, League City, Humble, Missouri City, Pasadena, Baytown, Heights, Montrose, Midtown, Medical Center, River Oaks, Galleria, Memorial, Bellaire, downtown.

PRICING CONTEXT (use to reduce sticker shock):
- Single tooth: $1,500–$3,000
- All-on-4: $15,000–$25,000/arch — financing from $89/mo available
- Snap-in dentures: $5,000–$12,000
- Same-day: $3,000–$6,000

Keep responses SHORT (1-3 sentences max). Never mention competitor names.
When you have name + phone, call submit_lead immediately — don't ask again.`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LeadData {
  name?: string;
  phone?: string;
  procedure?: string;
  location?: string;
  urgency?: string;
}

async function submitLead(lead: LeadData): Promise<void> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ??
    "https://htxdentalimplants.com";
  await fetch(`${base}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: lead.name ?? "Chat Lead",
      phone: lead.phone ?? "",
      procedure: lead.procedure ?? "not-sure",
      source: "chatbot",
      location_interest: lead.location ?? "Houston",
      urgency: lead.urgency ?? "researching",
    }),
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { messages }: { messages: Message[] } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI not configured" }, { status: 500 });
  }

  const tools = [
    {
      type: "function",
      function: {
        name: "submit_lead",
        description: "Submit a qualified lead when you have the patient's name and phone number",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string", description: "Patient's full name" },
            phone: { type: "string", description: "Patient's phone number" },
            procedure: { type: "string", description: "Procedure of interest" },
            location: { type: "string", description: "Houston area/neighborhood" },
            urgency: {
              type: "string",
              enum: ["asap", "month", "researching"],
              description: "How soon they need treatment",
            },
          },
          required: ["name", "phone"],
        },
      },
    },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      tools,
      tool_choice: "auto",
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const choice = data.choices?.[0];

  // If the model wants to call submit_lead, do it server-side
  if (choice?.finish_reason === "tool_calls") {
    const toolCall = choice.message.tool_calls?.[0];
    if (toolCall?.function?.name === "submit_lead") {
      const args: LeadData = JSON.parse(toolCall.function.arguments);
      await submitLead(args);

      return NextResponse.json({
        role: "assistant",
        content: `Perfect, ${args.name?.split(" ")[0]}! You're all set. Our top Houston specialists will call you within 24 hours to schedule your free consultation. No obligation — just helpful guidance. Is there anything else I can help with?`,
        leadSubmitted: true,
      });
    }
  }

  return NextResponse.json({
    role: "assistant",
    content: choice?.message?.content ?? "I'm sorry, something went wrong. Please call us at (346) 752-6880.",
    leadSubmitted: false,
  });
}
