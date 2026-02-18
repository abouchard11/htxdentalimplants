import Link from "next/link";
import { ArrowRight, MapPin, Phone, Star, Shield, Users, CheckCircle, FileText } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import ProcedureCard from "@/components/ProcedureCard";
import CostCalculator from "@/components/CostCalculator";
import TestimonialSection from "@/components/TestimonialSection";
import { getFeaturedDentists } from "@/data/dentists";
import { procedures } from "@/data/procedures";

const trustStats = [
  { label: "Patients Matched", value: "4,200+", icon: Users },
  { label: "Verified Specialists", value: "10", icon: Shield },
  { label: "Avg Rating", value: "4.8★", icon: Star },
  { label: "Free to Compare", value: "Always", icon: CheckCircle },
];

const objectionBadges = [
  { text: "Pain-free sedation available", icon: "💉" },
  { text: "Financing from $89/mo", icon: "💳" },
  { text: "Bone loss? Still a candidate.", icon: "✅" },
];

const areas = [
  { name: "Downtown Houston", slug: "downtown" },
  { name: "Montrose", slug: "montrose" },
  { name: "Medical Center", slug: "medical-center" },
  { name: "Katy", slug: "katy" },
  { name: "Sugar Land", slug: "sugar-land" },
  { name: "The Woodlands", slug: "the-woodlands" },
  { name: "Clear Lake", slug: "clear-lake" },
  { name: "Memorial", slug: "memorial" },
  { name: "Cypress", slug: "cypress" },
  { name: "Pearland", slug: "pearland" },
  { name: "Galleria", slug: "galleria" },
  { name: "Heights", slug: "heights" },
];

export default function Home() {
  const featuredDentists = getFeaturedDentists();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary-dark to-secondary overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6">
              <MapPin className="h-4 w-4 text-primary-light" />
              <span className="text-sm text-primary-light font-medium">
                Houston, Texas
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Stop Hiding Your Smile.{" "}
              <span className="text-primary-light">
                Houston&apos;s Best Implant Dentists, Compared.
              </span>
            </h1>

            <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-relaxed">
              Scared it&apos;ll hurt? Can&apos;t afford it? Think you&apos;re not a candidate? We&apos;ve
              matched <strong className="text-white">4,200+ Houston patients</strong> with implant
              specialists who handle exactly your situation.
            </p>

            {/* Fear-objection strip */}
            <div className="mt-6 flex flex-wrap gap-3">
              {objectionBadges.map((badge) => (
                <span
                  key={badge.text}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-white font-medium"
                >
                  <span>{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>

            {/* CTA hierarchy */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-quotes"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-900/30"
              >
                Get 3 Free Quotes
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dentists"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors border border-white/20"
              >
                Browse Dentists
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal Strip */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-white/70" />
                <span className="text-sm font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/70">{stat.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-white/70" />
              <span className="text-sm text-white/70">Free Consultations Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dentists */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
                Featured Implant Specialists
              </h2>
              <p className="mt-2 text-gray-600">
                Houston&apos;s highest-rated dental implant dentists
              </p>
            </div>
            <Link
              href="/dentists"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              View all dentists
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {featuredDentists.map((dentist) => (
              <DentistCard key={dentist.id} dentist={dentist} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/get-quotes"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Get 3 Free Quotes — Free &amp; No Obligation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Procedures Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
              Dental Implant Procedures
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Learn about the most common implant procedures, costs, and what to expect
              during recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((procedure) => (
              <ProcedureCard key={procedure.slug} procedure={procedure} />
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <TestimonialSection />

      {/* Cost Calculator */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary mb-3">
                How Much Do Dental Implants Cost in Houston?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Use our free calculator to estimate your dental implant cost in
                Houston. Prices vary by procedure type, number of teeth, and
                insurance coverage.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                For a precise quote, connect with one of our verified Houston
                implant specialists for a complimentary consultation.
              </p>
              <Link
                href="/cost-guide"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                View full 2026 cost guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
              Serving the Greater Houston Area
            </h2>
            <p className="mt-2 text-gray-600">
              Find dental implant specialists near you across Houston and surrounding communities.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                {area.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
            >
              View all 25 service areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Ready to Restore Your Smile?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
            Get 3 free quotes from Houston&apos;s top implant specialists. Free,
            no-obligation, and takes under 2 minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-quotes"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-bold text-white hover:bg-amber-600 transition-colors shadow-lg"
            >
              Get 3 Free Quotes
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+13467526880"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call for Help
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
