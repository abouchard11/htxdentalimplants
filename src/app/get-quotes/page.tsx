"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, Star } from "lucide-react";
import { trackEvent } from "@/components/Analytics";

type Step = 1 | 2 | 3 | 4;

const procedures = [
  { id: "single-tooth", label: "Single Tooth Implant", price: "From $1,500" },
  { id: "all-on-4", label: "All-on-4 Implants", price: "From $15,000/arch" },
  { id: "implant-dentures", label: "Snap-In Dentures", price: "From $5,000" },
  { id: "same-day", label: "Same-Day Implants", price: "From $3,000" },
  { id: "bone-graft", label: "Bone Grafting", price: "From $300" },
  { id: "full-mouth", label: "Full Mouth Reconstruction", price: "From $20,000" },
  { id: "not-sure", label: "Not Sure — Need Consultation", price: "Free consult" },
];

const neighborhoods = [
  "Downtown Houston", "Montrose", "Medical Center", "Heights", "Midtown",
  "River Oaks", "Galleria / Uptown", "Memorial", "Katy", "Sugar Land",
  "The Woodlands", "Clear Lake", "Pearland", "Cypress", "Spring",
  "Missouri City", "Pasadena", "Baytown", "League City", "Other / Not sure",
];

const urgencyOptions = [
  { id: "asap", label: "As soon as possible", icon: "🔥" },
  { id: "month", label: "Within 1 month", icon: "📅" },
  { id: "researching", label: "Just researching for now", icon: "📖" },
];

interface MatchedDentist {
  slug: string;
  name: string;
  practice: string;
  phone: string;
  rating: number;
}

export default function GetQuotesPage() {
  const [step, setStep] = useState<Step>(1);
  const [procedure, setProcedure] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [urgency, setUrgency] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [matched, setMatched] = useState<MatchedDentist[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function next(newStep: Step) {
    trackEvent("get_quotes_step", { step: newStep, procedure, neighborhood });
    setStep(newStep);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);

    trackEvent("get_quotes_submit", { procedure, neighborhood, urgency });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          procedure,
          source: "get-quotes",
          location_interest: neighborhood,
          urgency,
        }),
      });
      const data = await res.json();
      if (data.matched) setMatched(data.matched);
    } catch {
      // show success regardless
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted">
        <section className="py-20">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-secondary mb-3">
              You&apos;re All Set, {name.split(" ")[0]}!
            </h1>
            <p className="text-gray-600 mb-6">
              We&apos;ve matched you with Houston&apos;s top implant specialists. Expect a call within
              24 hours to schedule your <strong>free consultation</strong>.
            </p>

            {matched.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-5 mb-8 text-left">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  Your Matched Dentists
                </h2>
                <div className="space-y-3">
                  {matched.map((d) => (
                    <div key={d.slug} className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <div>
                        <p className="text-sm font-semibold text-secondary">{d.name}</p>
                        <p className="text-xs text-gray-500">{d.practice}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 text-accent fill-current" />
                          <span className="text-xs font-medium">{d.rating}</span>
                        </div>
                      </div>
                      <a
                        href={`tel:${d.phone.replace(/[^+\d]/g, "")}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Call Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/dentists"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
            >
              Browse all Houston dentists
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Progress bar */}
      <div className="bg-white border-b border-border">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Step {step} of 4</span>
            <span>{Math.round(((step - 1) / 4) * 100)}% complete</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
            Get 3 Free Implant Quotes
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Takes 2 minutes. Houston&apos;s top specialists. Zero obligation.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="bg-secondary px-6 py-4">
            <p className="text-sm font-semibold text-white">
              {step === 1 && "Step 1: What procedure are you interested in?"}
              {step === 2 && "Step 2: Where in Houston are you located?"}
              {step === 3 && "Step 3: How soon do you need treatment?"}
              {step === 4 && "Step 4: How should we reach you?"}
            </p>
          </div>

          <div className="p-6">
            {/* Step 1: Procedure */}
            {step === 1 && (
              <div className="space-y-2">
                {procedures.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setProcedure(p.id);
                      next(2);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors hover:border-primary hover:bg-primary/5 ${
                      procedure === p.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <span className="text-sm font-medium text-secondary">{p.label}</span>
                    <span className="text-xs text-gray-500">{p.price}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Neighborhood */}
            {step === 2 && (
              <div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {neighborhoods.map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setNeighborhood(n);
                        next(3);
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-sm text-left transition-colors hover:border-primary hover:bg-primary/5 ${
                        neighborhood === n
                          ? "border-primary bg-primary/5 font-medium"
                          : "border-border text-gray-700"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>
              </div>
            )}

            {/* Step 3: Urgency */}
            {step === 3 && (
              <div>
                <div className="space-y-3 mb-4">
                  {urgencyOptions.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setUrgency(u.id);
                        next(4);
                      }}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition-colors hover:border-primary hover:bg-primary/5 ${
                        urgency === u.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <span className="text-2xl">{u.icon}</span>
                      <span className="text-sm font-medium text-secondary">{u.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>
              </div>
            )}

            {/* Step 4: Contact info */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(713) 555-0000"
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !name || !phone}
                  className="w-full rounded-lg bg-accent px-4 py-3.5 text-sm font-bold text-white hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Matching you with dentists...
                    </>
                  ) : (
                    <>
                      Get My 3 Free Quotes
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to be contacted by up to 3 Houston implant specialists.
                  No spam, no obligations.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" /> 100% Free</span>
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" /> No Obligation</span>
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" /> 10 Verified Dentists</span>
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" /> 4,200+ Patients Matched</span>
        </div>
      </div>
    </div>
  );
}
