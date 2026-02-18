import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function twiml(body: string): NextResponse {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`,
    { status: 200, headers: { "Content-Type": "text/xml; charset=utf-8" } }
  );
}

// Twilio calls this route when a patient dials the HTX number.
// We greet them and ask what procedure they're interested in.
export async function POST(): Promise<NextResponse> {
  return twiml(`
    <Gather input="speech" timeout="8" speechTimeout="auto"
            action="/api/voice/gather?step=procedure" method="POST">
      <Say voice="Polly.Joanna">
        Hi! Thanks for calling H T X Dental Implants — Houston's trusted implant network.
        I'm here to connect you with a top-rated specialist near you, completely free.
        What type of dental procedure are you interested in?
        For example: a single tooth implant, All-on-4, snap-in dentures, same-day implants,
        or just say "not sure" and we'll set up a free consultation.
      </Say>
    </Gather>
    <Say voice="Polly.Joanna">
      I didn't catch that. No worries — please call us back and we'll get you matched right away.
      Goodbye!
    </Say>
  `);
}

// Twilio also sends GET on some webhook configs
export const GET = POST;
