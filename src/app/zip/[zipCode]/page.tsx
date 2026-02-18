import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Phone, Star, Shield } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { houstonZipCodes, getZipByCode } from "@/data/zip-codes";
import { dentists } from "@/data/dentists";

export function generateStaticParams() {
  return houstonZipCodes.map((z) => ({ zipCode: z.zip }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zipCode: string }>;
}): Promise<Metadata> {
  const { zipCode } = await params;
  const zip = getZipByCode(zipCode);
  if (!zip) return {};

  const area = zip.neighborhood;
  return {
    title: `Dental Implants ${zipCode} — ${area} TX | HTX Dental Implants`,
    description: `Find top dental implant dentists near ${zipCode} in ${area}, ${zip.city}, Texas. Compare costs, read reviews, and book a free consultation. Single implants from $1,500. All-on-4 available.`,
    alternates: {
      canonical: `https://htxdentalimplants.com/zip/${zipCode}`,
    },
  };
}

const faqs = (zip: string, area: string, city: string) => [
  {
    question: `How much do dental implants cost near zip code ${zip} in ${area}?`,
    answer: `Dental implants near ${zip} in ${area}, TX range from $1,500–$6,000 for a single tooth and $15,000–$30,000 per arch for All-on-4. Many practices near ${city} offer 0% financing and accept most major insurance plans.`,
  },
  {
    question: `Which dental implant dentists serve the ${zip} zip code?`,
    answer: `Several top-rated implant specialists serve patients in the ${zip} area of ${area}. Our directory includes verified dentists near ${city} who offer free consultations. Use our quote form to get matched with up to 3 dentists.`,
  },
  {
    question: `Can I get same-day dental implants near ${area}?`,
    answer: `Yes — several Houston-area implant dentists offer same-day (immediate load) implants for qualifying patients. Eligibility requires sufficient bone density confirmed by a 3D scan. Contact a specialist near ${zip} for a free evaluation.`,
  },
  {
    question: `Does insurance cover dental implants for ${zip} residents?`,
    answer: `Most major dental insurance plans cover a portion of implant costs — typically 50% up to your annual maximum. Dentists serving ${area} accept Delta Dental, Cigna, Aetna, BCBS, and others. Call your provider or ask the dentist office to verify your coverage.`,
  },
];

export default async function ZipCodePage({
  params,
}: {
  params: Promise<{ zipCode: string }>;
}) {
  const { zipCode } = await params;
  const zip = getZipByCode(zipCode);
  if (!zip) notFound();

  // Find dentists that serve this area via serviceAreas slug match
  const nearby = zip.locationSlug
    ? dentists
        .filter((d) => d.serviceAreas?.includes(zip.locationSlug!))
        .sort((a, b) => b.rating - a.rating)
    : dentists.sort((a, b) => b.rating - a.rating);

  const displayDentists = nearby.length >= 2 ? nearby : dentists.sort((a, b) => b.rating - a.rating);
  const topDentists = displayDentists.slice(0, 4);

  const zipFaqs = faqs(zipCode, zip.neighborhood, zip.city);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://htxdentalimplants.com" },
          { "@type": "ListItem", position: 2, name: "Zip Code Search", item: "https://htxdentalimplants.com/zip" },
          { "@type": "ListItem", position: 3, name: zipCode, item: `https://htxdentalimplants.com/zip/${zipCode}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: zipFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "LocalBusiness",
        name: "HTX Dental Implants",
        url: `https://htxdentalimplants.com/zip/${zipCode}`,
        description: `Dental implant directory serving ${zip.neighborhood}, ${zip.city}, TX ${zipCode}`,
        areaServed: {
          "@type": "PostalAddress",
          postalCode: zipCode,
          addressLocality: zip.city,
          addressRegion: "TX",
        },
      },
    ],
  });

  return (
    <>
      <Script id={`schema-zip-${zipCode}`} type="application/ld+json" strategy="afterInteractive">
        {schema}
      </Script>

      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1">
            <Link href="/" className="hover:text-primary-light">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Dental Implants {zipCode}</span>
          </nav>
          <div className="flex items-center gap-2 text-primary-light text-sm mb-3">
            <MapPin className="h-4 w-4" />
            {zip.neighborhood}, {zip.city}, TX {zipCode}
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Dental Implants {zipCode} — {zip.neighborhood}
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Find top-rated dental implant specialists serving zip code {zipCode} in {zip.neighborhood},{" "}
            {zip.city}, Texas. Compare dentists, read reviews, and get free quotes.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Star className="h-4 w-4 text-accent" />
              <span>{topDentists.length} implant specialists nearby</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Shield className="h-4 w-4 text-primary-light" />
              <span>Free consultations available</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/get-quotes"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Get 3 Free Quotes Near {zipCode}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+17135550000"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call for Help
            </a>
          </div>
        </div>
      </section>

      {/* Dentist listings + sidebar */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-heading font-bold text-secondary mb-5">
                Top Implant Dentists Serving {zipCode} — {zip.neighborhood}
              </h2>
              <div className="grid gap-4">
                {topDentists.map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/dentists"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
                >
                  View all Houston dentists
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:sticky lg:top-20 lg:self-start">
              <LeadCaptureForm source={`zip-${zipCode}`} locationInterest={zip.neighborhood} />
            </div>
          </div>
        </div>
      </section>

      {/* Cost overview */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-4">
            Dental Implant Costs Near {zipCode}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { name: "Single Tooth Implant", range: "$1,500 – $6,000" },
              { name: "All-on-4 (per arch)", range: "$15,000 – $30,000" },
              { name: "Implant Dentures", range: "$5,000 – $15,000" },
              { name: "Bone Grafting", range: "$300 – $3,000" },
              { name: "Same-Day Implants", range: "$3,000 – $8,000" },
              { name: "Full Mouth", range: "$20,000 – $50,000+" },
            ].map((item) => (
              <div key={item.name} className="rounded-xl border border-border bg-white p-4">
                <p className="text-xs text-gray-500 mb-1">{item.name}</p>
                <p className="text-lg font-bold text-primary">{item.range}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Financing available from $89/month. Many dentists accept CareCredit and major insurance.{" "}
            <Link href="/cost-guide" className="text-primary hover:underline">View full 2026 cost guide →</Link>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            FAQs — Dental Implants Near {zipCode}
          </h2>
          <div className="space-y-4">
            {zipFaqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-heading font-bold text-secondary">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby location links */}
      {zip.locationSlug && (
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-600">
              Zip code {zipCode} is part of the{" "}
              <Link href={`/locations/${zip.locationSlug}`} className="text-primary font-medium hover:underline">
                {zip.neighborhood} area →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Get Free Implant Quotes for {zipCode}
          </h2>
          <p className="mt-2 text-white/80 max-w-lg mx-auto">
            Match with 3 top dentists near {zip.neighborhood}. Free, no-obligation, takes 2 minutes.
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
