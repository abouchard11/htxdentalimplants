import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { DollarSign, ArrowRight, Search, Phone, CheckCircle } from "lucide-react";
import { procedures } from "@/data/procedures";
import CostCalculator from "@/components/CostCalculator";

export const metadata: Metadata = {
  title: "Dental Implant Cost in Houston TX (2025 Price Guide)",
  description:
    "How much do dental implants cost in Houston? Single implants $1,500-$6,000, All-on-4 $18,000-$35,000. Compare costs, insurance coverage, financing options, and find affordable providers.",
  alternates: {
    canonical: "https://htxdentalimplants.com/cost-guide",
  },
};

const costData = [
  {
    procedure: "Single Tooth Implant",
    lowCost: "$1,500",
    avgCost: "$3,500",
    highCost: "$6,000",
    includes: "Implant post, abutment, crown",
  },
  {
    procedure: "All-on-4 (per arch)",
    lowCost: "$18,000",
    avgCost: "$25,000",
    highCost: "$35,000",
    includes: "4 implants, full-arch prosthesis",
  },
  {
    procedure: "Implant-Supported Dentures",
    lowCost: "$7,000",
    avgCost: "$14,000",
    highCost: "$25,000",
    includes: "2-4 implants, overdenture",
  },
  {
    procedure: "Bone Grafting",
    lowCost: "$300",
    avgCost: "$1,500",
    highCost: "$3,000",
    includes: "Grafting material, surgery",
  },
  {
    procedure: "Same-Day Implants",
    lowCost: "$3,000",
    avgCost: "$5,500",
    highCost: "$8,000",
    includes: "Implant + immediate temp crown",
  },
  {
    procedure: "Full Mouth Reconstruction",
    lowCost: "$30,000",
    avgCost: "$50,000",
    highCost: "$90,000",
    includes: "Multiple implants, full prosthetics",
  },
];

const financingOptions = [
  {
    name: "CareCredit",
    description: "0% APR for 12-24 months on dental procedures. Widely accepted by Houston implant dentists.",
  },
  {
    name: "Lending Club Patient Solutions",
    description: "Fixed rates from 4.99% APR. Loans from $1,000 to $50,000 for dental work.",
  },
  {
    name: "In-House Payment Plans",
    description: "Many Houston practices offer monthly payment plans with little or no interest.",
  },
  {
    name: "Dental Discount Plans",
    description: "Save 20-60% on implant costs with discount dental plans ($100-$200/year membership).",
  },
];

export default function CostGuidePage() {
  const faqs = [
    {
      question: "How much do dental implants cost in Houston without insurance?",
      answer:
        "Without insurance, a single dental implant in Houston costs $3,000-$6,000 on average. This includes the titanium post ($1,500-$2,500), abutment ($500-$1,000), and porcelain crown ($1,000-$2,500). All-on-4 full-arch implants cost $18,000-$35,000 per arch without insurance. Many Houston dentists offer financing and payment plans to make implants more accessible.",
    },
    {
      question: "Does insurance cover dental implants in Texas?",
      answer:
        "Most dental insurance plans in Texas cover a portion of dental implant costs, typically 50% of the procedure up to your annual maximum benefit ($1,000-$2,500 per year). Medical insurance may also cover implants if they are needed due to an accident or medical condition. Some Houston dentists work with both dental and medical insurance to maximize your coverage.",
    },
    {
      question: "Why are dental implants so expensive?",
      answer:
        "Dental implants are a premium solution because they use biocompatible titanium or zirconia materials, require surgical placement by a specialist, involve custom-fabricated crowns, and have a 95-98% success rate lasting 25+ years. When compared to the cost of replacing bridges or dentures every 5-10 years, implants are often the most cost-effective long-term solution.",
    },
    {
      question: "What is the cheapest dental implant option in Houston?",
      answer:
        "The most affordable implant options in Houston include mini dental implants ($500-$1,500 each), dental schools like UTHealth School of Dentistry (30-50% less than private practices), and discount dental plans. Some practices also offer promotional pricing for new patients or bundle discounts for multiple implants.",
    },
    {
      question: "Are dental implants worth it?",
      answer:
        "Dental implants are considered the gold standard for tooth replacement by the American Dental Association. They prevent bone loss, don't damage adjacent teeth, look and feel like natural teeth, and can last a lifetime with proper care. While the upfront cost is higher than bridges or dentures, the 25+ year lifespan makes them the most cost-effective option long-term.",
    },
  ];

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  return (
    <>
      <Script id="schema-faq-cost" type="application/ld+json" strategy="afterInteractive">
        {faqSchema}
      </Script>

      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-light text-sm mb-3">
            <DollarSign className="h-4 w-4" />
            2025 Price Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Dental Implant Cost in Houston, TX
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            How much do dental implants really cost in Houston? Our 2025 guide breaks down
            pricing for every procedure type, plus insurance coverage and financing options.
          </p>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Houston Dental Implant Cost Breakdown (2025)
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-5 py-3 text-left font-heading font-bold text-secondary">
                    Procedure
                  </th>
                  <th className="px-5 py-3 text-center font-heading font-bold text-secondary">
                    Low Cost
                  </th>
                  <th className="px-5 py-3 text-center font-heading font-bold text-primary">
                    Average Cost
                  </th>
                  <th className="px-5 py-3 text-center font-heading font-bold text-secondary">
                    High Cost
                  </th>
                  <th className="px-5 py-3 text-left font-heading font-bold text-secondary">
                    Includes
                  </th>
                </tr>
              </thead>
              <tbody>
                {costData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-muted/50"}>
                    <td className="px-5 py-3 font-medium text-secondary">
                      {row.procedure}
                    </td>
                    <td className="px-5 py-3 text-center text-gray-600">{row.lowCost}</td>
                    <td className="px-5 py-3 text-center font-semibold text-primary">
                      {row.avgCost}
                    </td>
                    <td className="px-5 py-3 text-center text-gray-600">{row.highCost}</td>
                    <td className="px-5 py-3 text-gray-500">{row.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {costData.map((row, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-4">
                <h3 className="text-sm font-heading font-bold text-secondary">
                  {row.procedure}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{row.avgCost}</span>
                  <span className="text-xs text-gray-500">avg.</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Range: {row.lowCost} – {row.highCost}
                </p>
                <p className="mt-1 text-xs text-gray-400">Includes: {row.includes}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400 italic">
            * Prices are estimates based on Houston-area dental practices. Actual costs vary by
            provider, complexity, and insurance coverage. Always get a personalized quote.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                Estimate Your Dental Implant Cost
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Use our calculator to get an instant cost estimate for your
                dental implant procedure in Houston. Select your procedure type,
                number of teeth or arches, and insurance coverage to see
                estimated costs and monthly financing options.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                For a precise quote tailored to your specific needs, connect with
                one of our top-rated Houston implant specialists for a free
                consultation.
              </p>
            </div>
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Financing & Payment Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {financingOptions.map((opt) => (
              <div key={opt.name} className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <h3 className="text-sm font-heading font-bold text-secondary">{opt.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Frequently Asked Questions About Dental Implant Costs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-heading font-bold text-secondary">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Compare Procedures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((p) => (
              <Link
                key={p.slug}
                href={`/procedures/${p.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 hover:border-primary transition-colors"
              >
                <div>
                  <h3 className="text-sm font-heading font-bold text-secondary group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{p.priceRange}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Get a Free Dental Implant Cost Estimate
          </h2>
          <p className="mt-2 text-white/80 max-w-lg mx-auto">
            Connect with Houston&apos;s top implant specialists for a personalized consultation and cost breakdown.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dentists"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-gray-50 transition-colors"
            >
              <Search className="h-5 w-5" />
              Find a Dentist
            </Link>
            <a
              href="tel:+17135550000"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call for Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
