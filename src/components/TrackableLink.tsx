"use client";

import { trackEvent } from "./Analytics";

interface TrackableLinkProps {
  href: string;
  eventName: string;
  eventParams?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}

export function TrackablePhoneLink({
  phone,
  dentistName,
  location,
  className,
  children,
}: {
  phone: string;
  dentistName?: string;
  location?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`tel:${phone}`}
      className={className}
      onClick={() =>
        trackEvent("click_to_call", {
          phone_number: phone,
          dentist_name: dentistName || "general",
          location: location || "site-wide",
        })
      }
    >
      {children}
    </a>
  );
}

export function TrackableLink({
  href,
  eventName,
  eventParams,
  className,
  children,
}: TrackableLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  );
}
