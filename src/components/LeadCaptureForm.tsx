"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { trackEvent } from "./Analytics";

interface LeadCaptureFormProps {
  source: string;
  procedureInterest?: string;
  locationInterest?: string;
  variant?: "inline" | "card";
}

export default function LeadCaptureForm({
  source,
  procedureInterest,
  locationInterest,
  variant = "card",
}: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [procedure, setProcedure] = useState(procedureInterest || "");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Track the lead event
    trackEvent("lead_form_submit", {
      source,
      procedure_interest: procedure,
      location_interest: locationInterest || "general",
      has_email: !!email,
      has_phone: !!phone,
    });

    // Simulate form submission (replace with actual endpoint later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div
        className={`text-center py-8 ${
          variant === "card"
            ? "rounded-2xl border border-border bg-white shadow-sm p-6"
            : ""
        }`}
      >
        <div className="flex justify-center mb-3">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h3 className="text-lg font-heading font-bold text-secondary">
          Request Received!
        </h3>
        <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
          A Houston dental implant specialist will contact you within 24 hours
          to schedule your free consultation.
        </p>
      </div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor={`name-${source}`}
          className="block text-sm font-medium text-secondary mb-1"
        >
          Full Name *
        </label>
        <input
          id={`name-${source}`}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      <div>
        <label
          htmlFor={`phone-${source}`}
          className="block text-sm font-medium text-secondary mb-1"
        >
          Phone Number *
        </label>
        <input
          id={`phone-${source}`}
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(713) 555-0000"
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      <div>
        <label
          htmlFor={`email-${source}`}
          className="block text-sm font-medium text-secondary mb-1"
        >
          Email (optional)
        </label>
        <input
          id={`email-${source}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      <div>
        <label
          htmlFor={`procedure-${source}`}
          className="block text-sm font-medium text-secondary mb-1"
        >
          Procedure of Interest
        </label>
        <select
          id={`procedure-${source}`}
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        >
          <option value="">Select a procedure...</option>
          <option value="single-tooth">Single Tooth Implant</option>
          <option value="all-on-4">All-on-4 Implants</option>
          <option value="implant-dentures">Implant-Supported Dentures</option>
          <option value="same-day">Same-Day Implants</option>
          <option value="bone-graft">Bone Grafting</option>
          <option value="full-mouth">Full Mouth Reconstruction</option>
          <option value="not-sure">Not Sure – Need Consultation</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Request Free Consultation
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to be contacted by a dental implant specialist.
        No spam, no obligations.
      </p>
    </form>
  );

  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="bg-secondary px-6 py-4">
          <h3 className="text-base font-heading font-bold text-white">
            Get a Free Consultation
          </h3>
          <p className="text-sm text-gray-300 mt-0.5">
            Connect with a top Houston implant specialist.
          </p>
        </div>
        <div className="p-6">{formContent}</div>
      </div>
    );
  }

  return formContent;
}
