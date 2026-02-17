import type { Metadata } from "next";
import ProcedureCard from "@/components/ProcedureCard";
import { procedures } from "@/data/procedures";

export const metadata: Metadata = {
  title: "Dental Implant Procedures & Costs in Houston TX",
  description:
    "Learn about dental implant procedures available in Houston. Compare costs for single tooth implants, All-on-4, bone grafting, same-day implants, and more.",
  alternates: {
    canonical: "https://htxdentalimplants.com/procedures",
  },
};

export default function ProceduresPage() {
  return (
    <>
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Dental Implant Procedures
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Compare implant procedures, costs, recovery times, and success rates.
            Find the right solution for your smile.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((procedure) => (
              <ProcedureCard key={procedure.slug} procedure={procedure} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
