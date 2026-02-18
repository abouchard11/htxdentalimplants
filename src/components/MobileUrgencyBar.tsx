"use client";

import Link from "next/link";
import { trackEvent } from "./Analytics";

export default function MobileUrgencyBar() {
  return (
    <div className="fixed bottom-0 w-full md:hidden z-40 flex border-t border-white/20 shadow-lg">
      <a
        href="tel:+17135550000"
        className="flex-1 bg-secondary py-4 text-center font-semibold text-white text-sm flex items-center justify-center gap-2 active:bg-secondary-dark"
        onClick={() => trackEvent("urgency_bar_call_click")}
      >
        📞 Call Free
      </a>
      <Link
        href="/get-quotes"
        className="flex-1 bg-accent py-4 text-center font-bold text-white text-sm flex items-center justify-center gap-1 active:bg-amber-600"
        onClick={() => trackEvent("urgency_bar_quotes_click")}
      >
        Get 3 Quotes →
      </Link>
    </div>
  );
}
