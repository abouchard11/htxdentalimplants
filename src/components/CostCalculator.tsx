"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, DollarSign, Search, Phone, ArrowRight } from "lucide-react";

type ProcedureType =
  | "single"
  | "all-on-4"
  | "implant-dentures"
  | "same-day"
  | "bone-graft"
  | "full-mouth";

type InsuranceStatus = "none" | "basic" | "premium";

interface CostEstimate {
  low: number;
  avg: number;
  high: number;
  label: string;
}

const procedureCosts: Record<ProcedureType, CostEstimate> = {
  single: { low: 1500, avg: 3500, high: 6000, label: "Single Tooth Implant" },
  "all-on-4": { low: 18000, avg: 25000, high: 35000, label: "All-on-4 (per arch)" },
  "implant-dentures": { low: 7000, avg: 14000, high: 25000, label: "Implant-Supported Dentures" },
  "same-day": { low: 3000, avg: 5500, high: 8000, label: "Same-Day Implant" },
  "bone-graft": { low: 300, avg: 1500, high: 3000, label: "Bone Grafting" },
  "full-mouth": { low: 30000, avg: 50000, high: 90000, label: "Full Mouth Reconstruction" },
};

const insuranceDiscounts: Record<InsuranceStatus, { label: string; discount: number; annual: number }> = {
  none: { label: "No Insurance", discount: 0, annual: 0 },
  basic: { label: "Basic Dental Plan", discount: 0.3, annual: 1500 },
  premium: { label: "Premium Dental Plan", discount: 0.5, annual: 3000 },
};

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CostCalculator() {
  const [procedure, setProcedure] = useState<ProcedureType | "">("");
  const [teeth, setTeeth] = useState(1);
  const [insurance, setInsurance] = useState<InsuranceStatus>("none");
  const [showResult, setShowResult] = useState(false);

  const isPerTooth = procedure === "single" || procedure === "same-day";
  const isPerArch = procedure === "all-on-4" || procedure === "implant-dentures";
  const showMultiplier = isPerTooth || isPerArch;
  const multiplierLabel = isPerTooth ? "teeth" : "arches";
  const maxMultiplier = isPerTooth ? 8 : 2;

  function calculate() {
    if (!procedure) return null;
    const base = procedureCosts[procedure];
    const multiplier = showMultiplier ? teeth : 1;
    const ins = insuranceDiscounts[insurance];

    const rawLow = base.low * multiplier;
    const rawAvg = base.avg * multiplier;
    const rawHigh = base.high * multiplier;

    const insCredit = Math.min(rawAvg * ins.discount, ins.annual);

    return {
      label: base.label,
      rawLow,
      rawAvg,
      rawHigh,
      insCredit,
      finalLow: Math.max(rawLow - insCredit, 0),
      finalAvg: Math.max(rawAvg - insCredit, 0),
      finalHigh: Math.max(rawHigh - insCredit, 0),
      monthly: Math.round(Math.max(rawAvg - insCredit, 0) / 24),
    };
  }

  const result = showResult ? calculate() : null;

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-secondary px-6 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="h-5 w-5 text-primary-light" />
          <h3 className="text-lg font-heading font-bold text-white">
            Dental Implant Cost Calculator
          </h3>
        </div>
        <p className="text-sm text-gray-300">
          Get an instant estimate for your dental implant procedure in Houston.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Procedure type */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            What procedure do you need?
          </label>
          <select
            value={procedure}
            onChange={(e) => {
              setProcedure(e.target.value as ProcedureType);
              setTeeth(1);
              setShowResult(false);
            }}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-secondary bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select a procedure...</option>
            <option value="single">Single Tooth Implant</option>
            <option value="all-on-4">All-on-4 (Full Arch)</option>
            <option value="implant-dentures">Implant-Supported Dentures</option>
            <option value="same-day">Same-Day Implant</option>
            <option value="bone-graft">Bone Grafting</option>
            <option value="full-mouth">Full Mouth Reconstruction</option>
          </select>
        </div>

        {/* Quantity */}
        {procedure && showMultiplier && (
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              How many {multiplierLabel}?
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={maxMultiplier}
                value={teeth}
                onChange={(e) => {
                  setTeeth(parseInt(e.target.value));
                  setShowResult(false);
                }}
                className="flex-1 accent-primary"
              />
              <span className="w-8 text-center text-sm font-bold text-primary">
                {teeth}
              </span>
            </div>
          </div>
        )}

        {/* Insurance */}
        {procedure && (
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Insurance coverage
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["none", "basic", "premium"] as InsuranceStatus[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setInsurance(opt);
                    setShowResult(false);
                  }}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    insurance === opt
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {insuranceDiscounts[opt].label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calculate button */}
        {procedure && (
          <button
            onClick={() => setShowResult(true)}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            Calculate My Estimate
          </button>
        )}

        {/* Results */}
        {result && (
          <div className="border-t border-border pt-5 space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Estimated cost for {result.label}
                {showMultiplier ? ` (${teeth} ${multiplierLabel})` : ""}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(result.finalAvg)}
                </span>
                <span className="text-sm text-gray-400">avg.</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Range: {formatCurrency(result.finalLow)} – {formatCurrency(result.finalHigh)}
              </p>
            </div>

            {result.insCredit > 0 && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <p className="text-xs text-green-700">
                  Estimated insurance credit: {formatCurrency(result.insCredit)} (annual max)
                </p>
              </div>
            )}

            {result.monthly > 0 && (
              <div className="rounded-lg bg-muted px-4 py-3">
                <p className="text-xs text-gray-500">With financing (24 months)</p>
                <p className="text-lg font-bold text-secondary">
                  ~{formatCurrency(result.monthly)}/mo
                </p>
              </div>
            )}

            <p className="text-xs text-gray-400 italic">
              * Estimates based on Houston-area averages. Actual costs vary by provider and case complexity.
            </p>

            {/* CTAs */}
            <div className="space-y-2">
              <Link
                href="/dentists"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                <Search className="h-4 w-4" />
                Get a Precise Quote from Top Dentists
              </Link>
              <a
                href="tel:+17135550000"
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-secondary hover:bg-muted transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call for Free Consultation
              </a>
              <Link
                href="/cost-guide"
                className="flex items-center justify-center gap-1 text-xs font-medium text-primary hover:text-primary-dark"
              >
                View full cost guide
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
