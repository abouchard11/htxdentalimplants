import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  DollarSign,
  Clock,
  TrendingUp,
  Search,
  CheckCircle,
  UserCheck,
  Phone,
} from "lucide-react";
import DentistCard from "@/components/DentistCard";
import { procedures, getProcedureBySlug } from "@/data/procedures";
import { dentists } from "@/data/dentists";

export function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) return {};

  return {
    title: procedure.metaTitle,
    description: procedure.metaDescription,
    alternates: {
      canonical: `https://htxdentalimplants.com/procedures/${slug}`,
    },
  };
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) notFound();

  const relatedDentists = dentists.filter((d) =>
    d.procedures.some(
      (p) =>
        p.toLowerCase().includes(procedure.name.split(" ")[0].toLowerCase()) ||
        procedure.name.toLowerCase().includes(p.split(" ")[0].toLowerCase())
    )
  );

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: procedure.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  const medicalSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: procedure.name,
    description: procedure.detailedDescription,
    procedureType: "http://schema.org/SurgicalProcedure",
    howPerformed: procedure.procedureSteps.join(". "),
    status: "http://schema.org/EventScheduled",
    url: `https://htxdentalimplants.com/procedures/${slug}`,
  });

  return (
    <>
      <Script
        id={`schema-faq-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqSchema}
      </Script>
      <Script
        id={`schema-procedure-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {medicalSchema}
      </Script>

      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/procedures"
            className="text-sm text-primary-light hover:text-white transition-colors mb-3 inline-block"
          >
            ← All Procedures
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            {procedure.name} in Houston TX
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            {procedure.shortDescription}
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary-light" />
              <div>
                <p className="text-xs text-gray-400">Cost Range</p>
                <p className="text-sm font-semibold text-white">
                  {procedure.priceRange}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-light" />
              <div>
                <p className="text-xs text-gray-400">Recovery Time</p>
                <p className="text-sm font-semibold text-white">
                  {procedure.recoveryTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="text-xs text-gray-400">Success Rate</p>
                <p className="text-sm font-semibold text-success">
                  {procedure.successRate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                  About {procedure.name}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {procedure.detailedDescription}
                </p>
              </div>

              {/* Procedure Steps */}
              <div>
                <h2 className="text-xl font-heading font-bold text-secondary mb-4">
                  Procedure Steps
                </h2>
                <ol className="space-y-3">
                  {procedure.procedureSteps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600 pt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Candidate Profile */}
              <div className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-heading font-bold text-secondary">
                    Ideal Candidate
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {procedure.candidateProfile}
                </p>
              </div>

              {/* Quick Cost */}
              <div className="rounded-xl border border-border bg-muted p-5">
                <h3 className="text-sm font-heading font-bold text-secondary mb-2">
                  Houston Cost Range
                </h3>
                <p className="text-2xl font-bold text-primary">
                  {procedure.priceRange}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Varies by provider, complexity, and insurance
                </p>
                <Link
                  href="/cost-guide"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark"
                >
                  View full cost guide
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* CTA card */}
              <div className="rounded-xl bg-primary p-5 text-white">
                <h3 className="text-sm font-heading font-bold mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-xs text-white/80 mb-4">
                  Compare Houston specialists and book a free consultation.
                </p>
                <Link
                  href="/dentists"
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:bg-gray-50 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Find a Specialist
                </Link>
                <a
                  href="tel:+17135550000"
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call for Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Frequently Asked Questions About {procedure.name}
          </h2>
          <div className="space-y-4">
            {procedure.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-white p-5"
              >
                <h3 className="text-base font-heading font-bold text-secondary">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Dentists */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary">
                Houston Dentists for {procedure.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {relatedDentists.length} specialists found
              </p>
            </div>
            <Link
              href="/dentists"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {relatedDentists.length > 0 ? (
            <div className="grid gap-4">
              {relatedDentists.map((dentist) => (
                <DentistCard key={dentist.id} dentist={dentist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No specific specialists found for this procedure.
              </p>
              <Link
                href="/dentists"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                <Search className="h-4 w-4" />
                Browse all dentists
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related Procedures */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-4">
            Related Procedures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {procedures
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/procedures/${p.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 hover:border-primary transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-heading font-bold text-secondary group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {p.priceRange}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Get a Free {procedure.name} Consultation
          </h2>
          <p className="mt-2 text-white/80 max-w-lg mx-auto">
            Compare top Houston specialists and find the right dentist for your
            needs.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dentists"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-gray-50 transition-colors"
            >
              <Search className="h-5 w-5" />
              Find a Specialist
            </Link>
            <Link
              href="/cost-guide"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              View Cost Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
