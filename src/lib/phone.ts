// Set these in Vercel env vars once you provision your Twilio number.
// NEXT_PUBLIC_ prefix = available in client-side code.
export const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(346) 752-6880";

export const PHONE_E164 =
  process.env.NEXT_PUBLIC_PHONE_E164 ?? "+13467526880";
