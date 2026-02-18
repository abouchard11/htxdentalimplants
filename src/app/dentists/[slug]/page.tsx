import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, MapPin, Phone, Globe, CheckCircle, Clock, Shield, Languages, Award } from "lucide-react";
import { dentists, getDentistBySlug } from "@/data/dentists";
import ReviewWidget from "@/components/ReviewWidget";
import GoogleMap from "@/components/GoogleMap";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export function generateStaticParams() {
  return dentists.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dentist = getDentistBySlug(slug);
  if (!dentist) return {};

  const city = dentist.address.split(",")[1]?.trim() || "Houston";

  return {
    title: `${dentist.name} — Dental Implants ${city} TX | ${dentist.rating}★ (${dentist.reviewCount} Reviews)`,
    description: `${dentist.name} at ${dentist.practice} in ${city}, TX. ${dentist.description} ${dentist.rating}★ from ${dentist.reviewCount} verified reviews. Book a free consultation.`,
    alternates: {
      canonical: `https://htxdentalimplants.com/dentists/${slug}`,
    },
    openGraph: {
      title: `${dentist.name} — ${dentist.practice} | ${dentist.rating}★`,
      description: dentist.description,
      images: [{ url: dentist.imageUrl, width: 400, height: 400 }],
    },
  };
}

export default async function DentistProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dentist = getDentistBySlug(slug);
  if (!dentist) notFound();

  // BreadcrumbList schema
  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://htxdentalimplants.com" },
      { "@type": "ListItem", position: 2, name: "Dentists", item: "https://htxdentalimplants.com/dentists" },
      { "@type": "ListItem", position: 3, name: dentist.name, item: `https://htxdentalimplants.com/dentists/${dentist.slug}` },
    ],
  });

  // Full Dentist schema with Review nodes for SERP star ratings
  const dentistSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: dentist.name,
    description: dentist.description,
    image: dentist.imageUrl,
    telephone: dentist.trackingPhone ?? dentist.phone,
    url: `https://htxdentalimplants.com/dentists/${dentist.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: dentist.address.split(",")[0],
      addressLocality: dentist.address.split(",")[1]?.trim() || "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: dentist.coordinates.lat,
      longitude: dentist.coordinates.lng,
    },
    openingHours: dentist.openingHours ?? "Mo-Fr 09:00-17:00",
    priceRange: "$$-$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: dentist.rating,
      reviewCount: dentist.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: dentist.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
    })),
    medicalSpecialty: "Dental Implants",
    availableService: dentist.procedures.map((p) => ({
      "@type": "MedicalProcedure",
      name: p,
    })),
    ...(dentist.bookingUrl && { potentialAction: { "@type": "ReserveAction", target: dentist.bookingUrl } }),
  });

  return (
    <>
      <Script id={`schema-breadcrumb-${dentist.slug}`} type="application/ld+json" strategy="afterInteractive">
        {breadcrumbSchema}
      </Script>
      <Script id={`schema-dentist-${dentist.slug}`} type="application/ld+json" strategy="afterInteractive">
        {dentistSchema}
      </Script>

      {/* Header */}
      <section className="bg-secondary py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1">
            <Link href="/" className="hover:text-primary-light">Home</Link>
            <span>/</span>
            <Link href="/dentists" className="hover:text-primary-light">Dentists</Link>
            <span>/</span>
            <span className="text-primary-light">{dentist.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Image
              src={dentist.imageUrl}
              alt={dentist.name}
              width={120}
              height={120}
              className="h-28 w-28 rounded-xl object-cover border-2 border-white/20"
              priority
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {dentist.name}
                </h1>
                {dentist.isVerified && (
                  <CheckCircle className="h-5 w-5 text-primary-light" />
                )}
                {dentist.featuredTier === "elite" && (
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
                    ELITE
                  </span>
                )}
              </div>
              <p className="text-gray-300 mt-1">{dentist.practice}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(dentist.rating) ? "fill-current" : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">{dentist.rating}</span>
                <span className="text-sm text-gray-400">
                  ({dentist.reviewCount} reviews)
                </span>
              </div>

              {dentist.differentiators && dentist.differentiators.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {dentist.differentiators.map((diff) => (
                    <span
                      key={diff}
                      className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-light"
                    >
                      <Award className="h-3 w-3" />
                      {diff}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${(dentist.trackingPhone ?? dentist.phone).replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {dentist.trackingPhone ?? dentist.phone}
                </a>
                <a
                  href={dentist.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                  About {dentist.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">{dentist.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {dentist.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center rounded-lg bg-primary-light/20 px-3 py-1.5 text-sm font-medium text-primary-dark"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                  Procedures Offered
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dentist.procedures.map((proc) => (
                    <div
                      key={proc}
                      className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {proc}
                    </div>
                  ))}
                </div>
              </div>

              {dentist.reviews && dentist.reviews.length > 0 && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                    Patient Reviews
                  </h2>
                  <ReviewWidget
                    reviews={dentist.reviews}
                    dentistName={dentist.name}
                    rating={dentist.rating}
                    reviewCount={dentist.reviewCount}
                  />
                </div>
              )}

              <div>
                <h2 className="text-xl font-heading font-bold text-secondary mb-3">
                  Location
                </h2>
                <GoogleMap address={dentist.address} name={dentist.practice} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-white p-5 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{dentist.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700">
                      {dentist.yearsExperience} years experience
                    </span>
                  </div>
                  {dentist.openingHours && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-700">{dentist.openingHours}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Languages className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">
                      {dentist.languages.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Insurance Accepted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dentist.insurance.map((ins) => (
                    <span
                      key={ins}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-gray-600"
                    >
                      <Shield className="h-3 w-3" />
                      {ins}
                    </span>
                  ))}
                </div>
              </div>

              <LeadCaptureForm
                source={`dentist-${dentist.slug}`}
                procedureInterest={dentist.procedures[0]}
              />

              <div className="rounded-xl bg-primary p-5 text-center">
                <p className="text-white font-medium mb-3">
                  Book a Free Consultation
                </p>
                <a
                  href={`tel:${(dentist.trackingPhone ?? dentist.phone).replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-gray-50 transition-colors w-full"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border">
            <Link
              href="/dentists"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              ← Back to all dentists
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
