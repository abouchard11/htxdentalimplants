import { NextRequest, NextResponse } from "next/server";
import { dentists } from "@/data/dentists";

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  procedure?: string;
  source: string;
  location_interest?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Match up to 3 dentists by procedure preference
function matchDentists(procedure?: string): typeof dentists {
  if (!procedure || procedure === "not-sure") {
    return dentists.filter((d) => d.isFeatured).slice(0, 3);
  }
  const matched = dentists.filter((d) =>
    d.procedures.some((p) =>
      p.toLowerCase().includes(procedure.toLowerCase().split("-")[0])
    )
  );
  return matched.slice(0, 3).length >= 1
    ? matched.slice(0, 3)
    : dentists.filter((d) => d.isFeatured).slice(0, 3);
}

async function sendResendEmail(lead: LeadPayload, matchedDentists: typeof dentists) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const OWNER_EMAIL = process.env.OWNER_EMAIL || "owner@htxdentalimplants.com";
  if (!RESEND_API_KEY) return;

  const dentistList = matchedDentists
    .map((d) => `• ${d.name} — ${d.practice} (${d.phone})`)
    .join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "HTX Dental Implants <leads@htxdentalimplants.com>",
      to: [OWNER_EMAIL],
      subject: `New Lead: ${lead.name} — ${lead.procedure || "General"}`,
      text: [
        `NEW LEAD — HTX Dental Implants`,
        ``,
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email || "not provided"}`,
        `Procedure: ${lead.procedure || "Not specified"}`,
        `Source: ${lead.source}`,
        `Location: ${lead.location_interest || "general"}`,
        ``,
        `UTM Source: ${lead.utm_source || "direct"}`,
        `UTM Medium: ${lead.utm_medium || "none"}`,
        `UTM Campaign: ${lead.utm_campaign || "none"}`,
        ``,
        `Matched Dentists:`,
        dentistList,
      ].join("\n"),
    }),
  });
}

async function postToGoogleSheets(lead: LeadPayload) {
  const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!SHEETS_WEBHOOK) return;

  await fetch(SHEETS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      ...lead,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const matched = matchDentists(body.procedure);

    // Fire both integrations concurrently — don't block response on failures
    await Promise.allSettled([
      sendResendEmail(body, matched),
      postToGoogleSheets(body),
    ]);

    return NextResponse.json({
      success: true,
      matched: matched.map((d) => ({
        slug: d.slug,
        name: d.name,
        practice: d.practice,
        phone: d.trackingPhone ?? d.phone,
        rating: d.rating,
      })),
    });
  } catch {
    // Always return success to user — don't expose internal errors
    return NextResponse.json({ success: true, matched: [] });
  }
}
