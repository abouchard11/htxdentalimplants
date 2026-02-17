import Link from "next/link";
import { Search, Shield, Star, Users, ArrowRight, MapPin, Phone } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import ProcedureCard from "@/components/ProcedureCard";
import CostCalculator from "@/components/CostCalculator";
import { getFeaturedDentists } from "@/data/dentists";
import { procedures } from "@/data/procedures";

const stats = [
  { label: "Verified Dentists", value: "10+", icon: Shield },
  { label: "Patient Reviews", value: "2,400+", icon: Star },
  { label: "Procedures Listed", value: "6", icon: Users },
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
              Find the Best{" "}
              <span className="text-primary-light">Dental Implant</span> Dentist in
              Houston
            </h1>

            <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-relaxed">
              Compare top-rated implant specialists, read verified patient reviews, and
              book free consultations. Your new smile starts here.
            </p>

            {/* Search-like CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dentists"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                <Search className="h-5 w-5" />
                Browse All Dentists
              </Link>
              <Link
                href="/procedures"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors border border-white/20"
              >
                Explore Procedures
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <stat.icon className="h-5 w-5 text-primary-light" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
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

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/dentists"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              View all dentists
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

      {/* Cost Calculator */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary mb-3">
                How Much Do Dental Implants Cost?
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
                View full cost guide
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
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Ready to Restore Your Smile?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
            Browse Houston&apos;s top dental implant specialists and book a free consultation today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dentists"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-primary hover:bg-gray-50 transition-colors"
            >
              <Search className="h-5 w-5" />
              Find a Dentist Near You
            </Link>
            <a
              href="tel:+17135550000"
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
