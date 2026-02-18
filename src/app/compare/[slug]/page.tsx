import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, XCircle, Phone } from "lucide-react";

interface ComparisonData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  option1: {
    name: string;
    tagline: string;
    pros: string[];
    cons: string[];
    cost: string;
    lifespan: string;
    procedureLink?: string;
  };
  option2: {
    name: string;
    tagline: string;
    pros: string[];
    cons: string[];
    cost: string;
    lifespan: string;
    procedureLink?: string;
  };
  verdict: string;
  summary: string;
  faqs: { question: string; answer: string }[];
}

const comparisons: ComparisonData[] = [
  {
    slug: "implants-vs-dentures",
    title: "Dental Implants vs. Dentures in Houston TX (2026)",
    metaTitle: "Dental Implants vs Dentures Houston TX 2026 | Which Is Better?",
    metaDescription:
      "Dental implants vs dentures in Houston — which is right for you? Compare costs, longevity, comfort, and maintenance. Expert guidance for Houston patients.",
    option1: {
      name: "Dental Implants",
      tagline: "Permanent, bone-preserving, feels like natural teeth",
      pros: [
        "Permanent — lasts 25+ years with proper care",
        "Preserves jawbone, preventing facial collapse",
        "Fixed in place — no adhesives or removal needed",
        "Eat any food, including steak and apples",
        "Easier daily maintenance (brush like natural teeth)",
        "Boosts confidence — looks and feels natural",
      ],
      cons: [
        "Higher upfront cost ($1,500–$6,000 per tooth)",
        "Requires surgery and healing time (3–6 months)",
        "Not everyone qualifies (bone density required)",
        "Insurance covers limited amounts",
      ],
      cost: "$1,500–$6,000 per tooth",
      lifespan: "25+ years (implant may last lifetime)",
      procedureLink: "/procedures/single-tooth-implant",
    },
    option2: {
      name: "Traditional Dentures",
      tagline: "Removable, lower upfront cost, faster process",
      pros: [
        "Lower upfront cost ($1,000–$5,000 for full set)",
        "No surgery required",
        "Faster process (weeks vs. months)",
        "Anyone qualifies — no bone density requirement",
        "Insurance often covers a higher percentage",
      ],
      cons: [
        "Removable — must take out for cleaning",
        "Can slip or click when eating/speaking",
        "Bone loss continues beneath denture (facial collapse)",
        "Requires adhesives for secure fit",
        "Replace every 5–8 years (lifetime cost adds up)",
        "Restricts diet — can't eat hard/crunchy foods",
      ],
      cost: "$1,000–$5,000 for full set",
      lifespan: "5–8 years before replacement needed",
    },
    verdict:
      "For most Houston patients, dental implants deliver better long-term value, comfort, and quality of life — especially if you have adequate bone. The higher upfront cost is offset by dentures' replacement cycles and adhesive costs. Use implant-supported dentures as a middle ground if full implants aren't in budget.",
    summary:
      "Dental implants and dentures both replace missing teeth, but they work very differently. Implants are surgically placed titanium posts that fuse with the jawbone — they're permanent, bone-preserving, and feel like natural teeth. Dentures are removable prosthetics that rest on the gums. Both options have their place, and the right choice depends on your bone density, budget, and lifestyle.",
    faqs: [
      {
        question: "Are dental implants better than dentures for Houston patients?",
        answer:
          "For most patients, yes — dental implants provide superior comfort, function, and bone preservation. They don't slip, don't require adhesives, and allow you to eat anything. However, dentures are a valid option if you're not a surgical candidate or need a lower upfront cost. Implant-supported dentures offer a middle ground.",
      },
      {
        question: "How much more do implants cost than dentures in Houston?",
        answer:
          "A full set of dentures costs $1,000–$5,000 in Houston versus $20,000–$50,000+ for full-mouth implants. However, dentures need replacing every 5–8 years. Over a 20-year period, implants often cost less than repeated denture replacements plus adhesives. Many Houston dentists offer 0% financing for implants.",
      },
      {
        question: "Can I switch from dentures to implants in Houston?",
        answer:
          "Yes — many Houston patients convert from dentures to implants, though long-term denture wear causes bone loss that may require grafting first. Implant-supported dentures (snap-in dentures) are a popular first step: 2–4 implants stabilize your existing denture without full-arch surgery.",
      },
      {
        question: "Do Houston dentists recommend implants or dentures?",
        answer:
          "Most Houston implant specialists recommend implants for eligible patients due to their longevity and bone-preservation benefits. However, for patients with severe bone loss, medical conditions, or budget constraints, dentures remain a practical option. Schedule a free consultation to get a personalized recommendation.",
      },
    ],
  },
  {
    slug: "all-on-4-vs-snap-in",
    title: "All-on-4 vs. Snap-In Dentures Houston TX (2026)",
    metaTitle: "All-on-4 vs Snap-In Dentures Houston TX 2026 | Complete Guide",
    metaDescription:
      "All-on-4 vs snap-in dentures in Houston — cost, comfort, and candidacy compared. Find out which full-arch solution is right for you.",
    option1: {
      name: "All-on-4 Implants",
      tagline: "Fixed, permanent, non-removable full-arch restoration",
      pros: [
        "Permanently fixed — can't be removed by patient",
        "Feels like natural teeth 24/7",
        "Maximum chewing force and function",
        "No denture movement or clicking",
        "4 implants support full arch (often no bone graft needed)",
        "Same-day temporary teeth on surgery day",
      ],
      cons: [
        "Higher cost ($15,000–$30,000 per arch)",
        "Requires surgery under sedation",
        "3–6 month healing process",
        "More complex maintenance (Waterpik required)",
      ],
      cost: "$15,000–$30,000 per arch",
      lifespan: "15–25 years (prosthesis); implants may last lifetime",
      procedureLink: "/procedures/all-on-4",
    },
    option2: {
      name: "Snap-In Dentures",
      tagline: "Implant-stabilized, removable overdenture",
      pros: [
        "Much lower cost ($5,000–$15,000 per arch)",
        "Removable for easy cleaning",
        "Only 2–4 implants required",
        "Can often modify existing denture",
        "Still dramatically better than regular dentures",
        "Good for patients with some bone loss",
      ],
      cons: [
        "Removable — still taken out for nightly cleaning",
        "Less chewing force than fixed All-on-4",
        "Locator attachments need replacement every 1–2 years",
        "Slight movement still possible (less than regular dentures)",
      ],
      cost: "$5,000–$15,000 per arch",
      lifespan: "7–15 years (denture); implants may last lifetime",
      procedureLink: "/procedures/implant-supported-dentures",
    },
    verdict:
      "All-on-4 is the gold standard for full-arch restoration — it's the closest thing to natural teeth. But snap-in dentures cost 60–70% less and are a massive upgrade over regular dentures. If budget is the primary constraint, snap-in dentures are an excellent first step toward a fixed solution.",
    summary:
      "Both All-on-4 and snap-in dentures use implants to replace all teeth in an arch, but they differ in fixation, cost, and feel. All-on-4 is a permanently fixed prosthesis you can't remove — like permanent teeth. Snap-in dentures snap onto implants for stability but are still removed for cleaning. The best choice depends on your budget, bone density, and lifestyle goals.",
    faqs: [
      {
        question: "Is All-on-4 worth the extra cost over snap-in dentures in Houston?",
        answer:
          "For most patients, yes — All-on-4 provides a permanent, natural-feeling smile that doesn't require nightly removal. The $10,000–$20,000 price difference is significant, but snap-in dentures are still a strong second choice. Many Houston patients start with snap-in dentures and upgrade to All-on-4 later.",
      },
      {
        question: "How many implants do snap-in dentures require vs All-on-4?",
        answer:
          "Snap-in dentures typically require 2–4 implants per arch. All-on-4 uses exactly 4 implants per arch (placed at strategic angles to maximize bone contact). All-on-6 uses 6 implants for additional support. More implants provide more stability.",
      },
      {
        question: "Can I qualify for All-on-4 in Houston if I have bone loss?",
        answer:
          "Often yes — All-on-4 was specifically designed to work with reduced bone. The posterior implants are angled 30–45 degrees to engage more bone without sinus lifts or extensive grafting. Your Houston oral surgeon will take a 3D scan to assess your specific bone volume.",
      },
    ],
  },
  {
    slug: "bridge-vs-implant",
    title: "Dental Bridge vs. Implant in Houston TX (2026)",
    metaTitle: "Dental Bridge vs Implant Houston TX 2026 | Which Replaces One Tooth Best?",
    metaDescription:
      "Dental bridge vs implant in Houston — compare costs, longevity, and the impact on adjacent teeth. Expert comparison for single tooth replacement.",
    option1: {
      name: "Dental Implant",
      tagline: "Standalone replacement — doesn't touch adjacent teeth",
      pros: [
        "Standalone — no alteration to adjacent healthy teeth",
        "Preserves jawbone at the site of missing tooth",
        "Lasts 25+ years vs 5–15 years for bridges",
        "Easy to clean — brush like a natural tooth",
        "No risk of decay under the prosthetic",
        "Looks and feels like a natural tooth",
      ],
      cons: [
        "Higher upfront cost ($3,500 avg in Houston)",
        "Requires surgery and 3–6 month healing",
        "Not all patients qualify (bone density needed)",
      ],
      cost: "$1,500–$6,000 per tooth",
      lifespan: "25+ years",
      procedureLink: "/procedures/single-tooth-implant",
    },
    option2: {
      name: "Dental Bridge",
      tagline: "Faster, lower cost — but alters adjacent teeth",
      pros: [
        "Lower upfront cost ($2,000–$5,000 for 3-unit bridge)",
        "No surgery required",
        "Faster process (2–3 weeks)",
        "Covered more generously by insurance",
        "Good option when adjacent teeth already need crowns",
      ],
      cons: [
        "Requires grinding down 2 healthy adjacent teeth",
        "Bone loss continues beneath bridge",
        "Harder to clean — requires floss threader",
        "5–15 year lifespan before replacement",
        "Risk of decay under bridge",
        "Adjacent teeth can weaken over time",
      ],
      cost: "$2,000–$5,000 (3-unit bridge)",
      lifespan: "5–15 years",
    },
    verdict:
      "Dental implants are almost universally preferred over bridges for single tooth replacement, unless adjacent teeth already need crowns. The long-term cost of bridge replacement cycles, adjacent tooth risk, and ongoing bone loss typically makes implants the better investment. Houston implant dentists strongly favor implants when bone is sufficient.",
    summary:
      "A dental bridge and an implant both replace a single missing tooth, but they do it very differently. A bridge anchors to the two teeth on either side of the gap (requiring those teeth to be ground down and crowned). An implant stands alone, replacing only the missing tooth without touching neighbors. This fundamental difference drives most of the downstream advantages of implants.",
    faqs: [
      {
        question: "Is a dental implant better than a bridge for one missing tooth in Houston?",
        answer:
          "Yes, for most patients. Implants don't damage adjacent teeth, last significantly longer, preserve bone, and are easier to clean. The main advantages of bridges are lower upfront cost, no surgery, and better insurance coverage. If adjacent teeth are healthy, most Houston dentists recommend an implant.",
      },
      {
        question: "How much more does an implant cost vs a bridge in Houston?",
        answer:
          "A single tooth implant in Houston averages $3,500, while a 3-unit bridge averages $3,000. Initial costs are similar, but a bridge may need replacing in 5–15 years. Over 20 years, an implant that lasts decades often costs less than 2 bridge replacements.",
      },
      {
        question: "How long does a bridge last vs an implant in Houston?",
        answer:
          "Dental bridges in Houston typically last 5–15 years before needing replacement. Dental implants can last 25+ years — often a lifetime for the titanium post itself. The porcelain crown on an implant may need replacement after 15–25 years.",
      },
    ],
  },
];

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) return {};

  return {
    title: comp.metaTitle,
    description: comp.metaDescription,
    alternates: {
      canonical: `https://htxdentalimplants.com/compare/${slug}`,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) notFound();

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://htxdentalimplants.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://htxdentalimplants.com/compare" },
      { "@type": "ListItem", position: 3, name: comp.title, item: `https://htxdentalimplants.com/compare/${slug}` },
    ],
  });

  return (
    <>
      <Script id={`schema-faq-compare-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {faqSchema}
      </Script>
      <Script id={`schema-breadcrumb-compare-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {breadcrumbSchema}
      </Script>

      {/* Hero */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1">
            <Link href="/" className="hover:text-primary-light">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Compare</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            {comp.title}
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">{comp.summary}</p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/get-quotes"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Get 3 Free Quotes
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+13467526880"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call for Guidance
            </a>
          </div>
        </div>
      </section>

      {/* Side-by-side comparison */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[comp.option1, comp.option2].map((option) => (
              <div key={option.name} className="rounded-2xl border-2 border-border bg-white overflow-hidden">
                <div className="bg-secondary px-6 py-4">
                  <h2 className="text-lg font-heading font-bold text-white">{option.name}</h2>
                  <p className="text-sm text-gray-300 mt-1">{option.tagline}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Cost</p>
                    <p className="text-xl font-bold text-primary">{option.cost}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Lifespan</p>
                    <p className="text-sm font-semibold text-secondary">{option.lifespan}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Pros</p>
                    <ul className="space-y-1.5">
                      {option.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Cons</p>
                    <ul className="space-y-1.5">
                      {option.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                          <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {option.procedureLink && (
                    <Link
                      href={option.procedureLink}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      Learn more about {option.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Verdict box */}
          <div className="mt-8 rounded-2xl bg-primary-light/10 border border-primary-light/30 p-6">
            <h3 className="text-lg font-heading font-bold text-secondary mb-2">
              Our Verdict for Houston Patients
            </h3>
            <p className="text-gray-700 leading-relaxed">{comp.verdict}</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {comp.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-heading font-bold text-secondary">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other comparisons */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-4">
            Other Houston Implant Comparisons
          </h2>
          <div className="flex flex-wrap gap-3">
            {comparisons
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-4 py-2 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
                >
                  {c.option1.name} vs {c.option2.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-white">
            Not Sure Which Option Is Right for You?
          </h2>
          <p className="mt-2 text-white/80 max-w-lg mx-auto">
            Get 3 free quotes from Houston specialists who will evaluate your specific situation.
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
