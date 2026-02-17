import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, DollarSign, Clock, TrendingUp, Search } from "lucide-react";
import DentistCard from "@/components/DentistCard";
import { procedures, getProcedureBySlug } from "@/data/procedures";
import { dentists } from "@/data/dentists";

export function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) return {};

  return {
    title: procedure.metaTitle,
    description: procedure.metaDescription,
    alternates: {
      canonical: `https://htxdentalimplants.com/procedures/${slug}`,
    },
  };
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) notFound();

  // Find dentists who offer related procedures
  const relatedDentists = dentists.filter((d) =>
    d.procedures.some(
      (p) =>
        p.toLowerCase().includes(procedure.name.split(" ")[0].toLowerCase()) ||
        procedure.name.toLowerCase().includes(p.split(" ")[0].toLowerCase())
    )
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/procedures"
            className="text-sm text-primary-light hover:text-white transition-colors mb-3 inline-block"
          >
            ← All Procedures
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            {procedure.name} in Houston TX
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">{procedure.shortDescription}</p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary-light" />
              <div>
                <p className="text-xs text-gray-400">Cost Range</p>
                <p className="text-sm font-semibold text-white">{procedure.priceRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-light" />
              <div>
                <p className="text-xs text-gray-400">Recovery Time</p>
                <p className="text-sm font-semibold text-white">
                  {procedure.recoveryTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="text-xs text-gray-400">Success Rate</p>
                <p className="text-sm font-semibold text-success">
                  {procedure.successRate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Dentists */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary">
                Houston Dentists for {procedure.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {relatedDentists.length} specialists found
              </p>
            </div>
            <Link
              href="/dentists"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {relatedDentists.length > 0 ? (
            <div className="grid gap-4">
              {relatedDentists.map((dentist) => (
                <DentistCard key={dentist.id} dentist={dentist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No specific specialists found for this procedure.
              </p>
              <Link
                href="/dentists"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                <Search className="h-4 w-4" />
                Browse all dentists
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Get a Free {procedure.name} Consultation
          </h2>
          <p className="mt-2 text-white/80 max-w-lg mx-auto">
            Compare top Houston specialists and find the right dentist for your needs.
          </p>
          <Link
            href="/dentists"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-gray-50 transition-colors"
          >
            <Search className="h-5 w-5" />
            Find a Specialist
          </Link>
        </div>
      </section>
    </>
  );
}
