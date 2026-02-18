import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Phone, Search, Star, Shield, Clock } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import ProcedureCard from "@/components/ProcedureCard";
import { locations, getLocationBySlug } from "@/data/locations";
import { dentists } from "@/data/dentists";
import { procedures } from "@/data/procedures";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return {
    title: `Dental Implants in ${location.name} TX 2026 | Compare Top Dentists & Cost`,
    description: `Find top-rated dental implant specialists in ${location.name}, Texas. Compare dentists, read reviews, check insurance, and book free consultations for All-on-4, single implants, and more.`,
    alternates: {
      canonical: `https://htxdentalimplants.com/locations/${slug}`,
    },
    openGraph: {
      title: `Dental Implant Dentists in ${location.name} TX`,
      description: `Find top-rated dental implant specialists in ${location.name}, Texas. Compare dentists and book free consultations.`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  // Filter dentists by serviceAreas geo match — local ranking factor
  const geoMatched = dentists.filter((d) => d.serviceAreas?.includes(slug));
  // Fall back to top-rated if no geo match (e.g. less-covered areas)
  const topDentists =
    geoMatched.length >= 2
      ? geoMatched.sort((a, b) => b.rating - a.rating).slice(0, 5)
      : [...dentists].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Dental Implant Dentists in ${location.name}, TX`,
    description: `Top-rated dental implant specialists serving ${location.name} and surrounding areas.`,
    url: `https://htxdentalimplants.com/locations/${slug}`,
    numberOfItems: topDentists.length,
    itemListElement: topDentists.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Dentist",
        name: d.name,
        url: `https://htxdentalimplants.com/dentists/${d.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: d.rating,
          reviewCount: d.reviewCount,
        },
      },
    })),
  });

  const faqs = [
    {
      question: `How much do dental implants cost in ${location.name}, TX?`,
      answer: `Dental implant costs in ${location.name} typically range from $1,500 to $6,000 per single implant, depending on the provider, complexity, and materials used. All-on-4 full-arch implants range from $18,000 to $35,000. Many ${location.name} dentists offer free consultations and financing options to make implants more affordable.`,
    },
    {
      question: `How do I find the best dental implant dentist in ${location.name}?`,
      answer: `Look for dentists in ${location.name} who specialize in implant dentistry, have board certifications (prosthodontist, periodontist, or oral surgeon), strong patient reviews, and experience with your specific procedure. Our directory lists verified implant specialists serving ${location.name} with ratings, specialties, and insurance information.`,
    },
    {
      question: `Does dental insurance cover implants in ${location.name}?`,
      answer: `Most dental insurance plans in Texas cover a portion of implant costs, typically 50% of the procedure up to your annual maximum ($1,000-$2,500). Some ${location.name} dental offices also accept CareCredit, Lending Club, and in-house payment plans. Contact providers directly to verify your specific coverage.`,
    },
    {
      question: `How long does the dental implant process take in ${location.name}?`,
      answer: `The typical dental implant process takes 3-6 months from start to finish. Some ${location.name} providers offer same-day implants where temporary teeth are placed during the same visit. The timeline depends on whether bone grafting is needed and the type of implant procedure selected.`,
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
      <Script
        id={`schema-location-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {schema}
      </Script>
      <Script
        id={`schema-faq-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqSchema}
      </Script>

      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-light text-sm mb-3">
            <MapPin className="h-4 w-4" />
            {location.name}, Texas &middot; {location.distanceFromDowntown} of Downtown Houston
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Dental Implant Dentists in {location.name}, TX
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            {location.description}
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Star className="h-4 w-4 text-accent" />
              <span>{topDentists.length} top-rated specialists</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Shield className="h-4 w-4 text-primary-light" />
              <span>All verified & licensed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="h-4 w-4 text-primary-light" />
              <span>Free consultations available</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href="tel:+13467526880"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call for Help
            </a>
            <Link
              href="/dentists"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Search className="h-4 w-4" />
              Browse All Dentists
            </Link>
          </div>
        </div>
      </section>

      {/* Dentist listings */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Top Implant Dentists Serving {location.name}
          </h2>
          <div className="grid gap-4">
            {topDentists.map((dentist) => (
              <DentistCard key={dentist.id} dentist={dentist} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/dentists"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
            >
              View all Houston dentists
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Procedures available */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Dental Implant Procedures in {location.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((procedure) => (
              <ProcedureCard key={procedure.slug} procedure={procedure} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Dental Implant FAQs for {location.name} Patients
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

      {/* Nearby locations */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-4">
            Other Houston Areas We Serve
          </h2>
          <div className="flex flex-wrap gap-2">
            {locations
              .filter((l) => l.slug !== slug)
              .slice(0, 12)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  {l.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Find a Dental Implant Dentist in {location.name}
          </h2>
          <p className="mt-2 text-white/80 max-w-lg mx-auto">
            Compare top specialists, read patient reviews, and book your free consultation today.
          </p>
          <Link
            href="/dentists"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-gray-50 transition-colors"
          >
            <Search className="h-5 w-5" />
            Browse Dentists
          </Link>
        </div>
      </section>
    </>
  );
}
