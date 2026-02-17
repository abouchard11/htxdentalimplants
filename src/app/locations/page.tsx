import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Dental Implants by Location | Houston Area Coverage",
  description:
    "Find dental implant specialists across the greater Houston area. We cover Katy, Sugar Land, The Woodlands, Pearland, Cypress, Clear Lake, Memorial, and 20+ more communities.",
  alternates: {
    canonical: "https://htxdentalimplants.com/locations",
  },
};

export default function LocationsPage() {
  // Group by type: suburbs vs inner-city neighborhoods
  const suburbs = locations.filter(
    (l) =>
      !["heights", "medical-center", "montrose", "midtown", "river-oaks", "galleria", "west-university", "bellaire", "memorial"].includes(
        l.slug
      )
  );
  const innerCity = locations.filter((l) =>
    ["heights", "medical-center", "montrose", "midtown", "river-oaks", "galleria", "west-university", "bellaire", "memorial"].includes(
      l.slug
    )
  );

  return (
    <>
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Dental Implants Across Greater Houston
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Find dental implant specialists in {locations.length} Houston-area communities.
            Click your neighborhood to see local providers and costs.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Inner Houston */}
          <h2 className="text-xl font-heading font-bold text-secondary mb-4">
            Inner Houston Neighborhoods
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {innerCity.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group card-hover flex items-start gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light/20 text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-heading font-bold text-secondary group-hover:text-primary transition-colors">
                    Dental Implants in {loc.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {loc.distanceFromDowntown} &middot; {loc.zipCodes.slice(0, 2).join(", ")}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors shrink-0 mt-0.5 ml-auto" />
              </Link>
            ))}
          </div>

          {/* Suburbs */}
          <h2 className="text-xl font-heading font-bold text-secondary mb-4">
            Houston Suburbs & Surrounding Cities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suburbs.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group card-hover flex items-start gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light/20 text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-heading font-bold text-secondary group-hover:text-primary transition-colors">
                    Dental Implants in {loc.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {loc.distanceFromDowntown} &middot; Pop. {loc.population}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors shrink-0 mt-0.5 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
