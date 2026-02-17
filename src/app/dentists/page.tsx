import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import { dentists } from "@/data/dentists";

export const metadata: Metadata = {
  title: "Top 10 Dental Implant Dentists in Houston TX (2025)",
  description:
    "Compare Houston's best dental implant dentists. Read verified reviews, check insurance accepted, and book free consultations. All-on-4, same-day implants, and more.",
  alternates: {
    canonical: "https://htxdentalimplants.com/dentists",
  },
};

export default function DentistsPage() {
  // Sort: featured first, then by rating
  const sorted = [...dentists].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.rating - a.rating;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-light text-sm mb-3">
            <MapPin className="h-4 w-4" />
            Houston, Texas
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Dental Implant Dentists in Houston
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            {dentists.length} verified implant specialists serving the greater Houston area.
            Compare ratings, specialties, and insurance accepted.
          </p>
        </div>
      </section>

      {/* Directory */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {sorted.map((dentist) => (
              <DentistCard key={dentist.id} dentist={dentist} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
