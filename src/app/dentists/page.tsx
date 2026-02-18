import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { dentists } from "@/data/dentists";

export const metadata: Metadata = {
  title: "Top 10 Dental Implant Dentists in Houston TX (2026)",
  description:
    "Compare Houston's best dental implant dentists in 2026. Read verified reviews, check insurance accepted, and book free consultations. All-on-4, same-day implants, and more.",
  alternates: {
    canonical: "https://htxdentalimplants.com/dentists",
  },
};

export default function DentistsPage() {
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
            {dentists.length} verified implant specialists serving the greater
            Houston area. Compare ratings, specialties, and insurance accepted.
          </p>
        </div>
      </section>

      {/* Directory + Lead Form */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dentist listings */}
            <div className="lg:col-span-2 space-y-4">
              {sorted.map((dentist) => (
                <DentistCard key={dentist.id} dentist={dentist} />
              ))}
            </div>

            {/* Sidebar with lead form */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <LeadCaptureForm source="dentists-directory" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
