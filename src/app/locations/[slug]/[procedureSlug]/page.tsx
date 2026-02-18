import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, DollarSign, Phone } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import { locations, getLocationBySlug } from "@/data/locations";
import { procedures, getProcedureBySlug } from "@/data/procedures";
import { dentists } from "@/data/dentists";

export function generateStaticParams() {
  return locations.flatMap((l) =>
    procedures.map((p) => ({ slug: l.slug, procedureSlug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; procedureSlug: string }>;
}): Promise<Metadata> {
  const { slug, procedureSlug } = await params;
  const location = getLocationBySlug(slug);
  const procedure = getProcedureBySlug(procedureSlug);
  if (!location || !procedure) return {};

  return {
    title: `${procedure.name} in ${location.name} TX 2026 | Compare Dentists & Cost`,
    description: `Find the best ${procedure.name} dentists in ${location.name}, Texas. Compare costs (${procedure.priceRange}), read reviews, and book a free consultation. ${procedure.successRate} success rate.`,
    alternates: {
      canonical: `https://htxdentalimplants.com/locations/${slug}/${procedureSlug}`,
    },
  };
}

export default async function LocationProcedurePage({
  params,
}: {
  params: Promise<{ slug: string; procedureSlug: string }>;
}) {
  const { slug, procedureSlug } = await params;
  const location = getLocationBySlug(slug);
  const procedure = getProcedureBySlug(procedureSlug);
  if (!location || !procedure) notFound();

  // Geo-matched dentists who offer this procedure
  const matched = dentists.filter(
    (d) =>
      d.serviceAreas?.includes(slug) &&
      d.procedures.some((p) =>
        p.toLowerCase().includes(procedure.name.split(" ")[0].toLowerCase())
      )
  );
  const topDentists =
    matched.length >= 2
      ? matched.sort((a, b) => b.rating - a.rating).slice(0, 4)
      : dentists.sort((a, b) => b.rating - a.rating).slice(0, 4);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://htxdentalimplants.com" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://htxdentalimplants.com/locations" },
          { "@type": "ListItem", position: 3, name: location.name, item: `https://htxdentalimplants.com/locations/${slug}` },
          { "@type": "ListItem", position: 4, name: procedure.name, item: `https://htxdentalimplants.com/locations/${slug}/${procedureSlug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How much does ${procedure.name} cost in ${location.name}, TX?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${procedure.name} in ${location.name} costs approximately ${procedure.priceRange}. Prices vary by provider and complexity. Many ${location.name} dentists offer free consultations and financing options.`,
            },
          },
          {
            "@type": "Question",
            name: `Who are the best ${procedure.name} dentists in ${location.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Our directory lists verified ${procedure.name} specialists serving ${location.name}. All listed dentists are licensed, have strong patient reviews, and offer free consultations.`,
            },
          },
        ],
      },
    ],
  });

  return (
    <>
      <Script id={`schema-combo-${slug}-${procedureSlug}`} type="application/ld+json" strategy="afterInteractive">
        {schema}
      </Script>

      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-primary-light">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-primary-light">Locations</Link>
            <span>/</span>
            <Link href={`/locations/${slug}`} className="hover:text-primary-light">{location.name}</Link>
            <span>/</span>
            <span className="text-primary-light">{procedure.name}</span>
          </nav>

          <div className="flex items-center gap-2 text-primary-light text-sm mb-3">
            <MapPin className="h-4 w-4" />
            {location.name}, Texas
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            {procedure.name} in {location.name}, TX
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Find top-rated {procedure.name.toLowerCase()} specialists in {location.name}, Texas.
            Compare {topDentists.length} verified dentists, read reviews, and book a free consultation.
          </p>

          <div className="mt-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary-light" />
              <div>
                <p className="text-xs text-gray-400">Cost Range</p>
                <p className="text-sm font-semibold text-white">{procedure.priceRange}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/get-quotes"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Get 3 Free Quotes in {location.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+13467526836"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call for Help
            </a>
          </div>
        </div>
      </section>

      {/* Dentist listings */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Top {procedure.name} Dentists in {location.name}
          </h2>
          <div className="grid gap-4">
            {topDentists.map((dentist) => (
              <DentistCard key={dentist.id} dentist={dentist} />
            ))}
          </div>
        </div>
      </section>

      {/* About this procedure */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-xl font-heading font-bold text-secondary mb-3">
            About {procedure.name} in {location.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">{procedure.detailedDescription}</p>
          <Link
            href={`/procedures/${procedureSlug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
          >
            Full {procedure.name} guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            {procedure.name} FAQs for {location.name} Patients
          </h2>
          <div className="space-y-4">
            {procedure.faqs.slice(0, 3).map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-heading font-bold text-secondary">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Get a Free {procedure.name} Consultation in {location.name}
          </h2>
          <p className="mt-2 text-white/80">
            Compare top {location.name} specialists. Free, no-obligation quotes.
          </p>
          <Link
            href="/get-quotes"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-gray-50 transition-colors"
          >
            Get 3 Free Quotes
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
