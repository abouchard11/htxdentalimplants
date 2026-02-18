import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Star, Phone, ArrowRight, Shield, Zap, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "For Dentists | List Your Practice on HTX Dental Implants",
  description:
    "Join Houston's fastest-growing dental implant directory. Get qualified leads, increase visibility, and grow your implant practice. Standard listing is free.",
  alternates: {
    canonical: "https://htxdentalimplants.com/for-dentists",
  },
};

const tiers = [
  {
    name: "Standard",
    price: "Free",
    period: "",
    description: "Basic directory listing to get you started",
    icon: Shield,
    color: "border-border",
    headerColor: "bg-gray-50",
    features: [
      "Basic practice profile",
      "Reviews and ratings visible",
      "Procedures listed",
      "Last sort position",
      "Standard lead routing",
    ],
    cta: "Claim Free Listing",
    ctaStyle: "border border-primary text-primary hover:bg-primary hover:text-white",
  },
  {
    name: "Premium",
    price: "$149",
    period: "/month",
    description: "Featured placement, lead routing, and more visibility",
    icon: Zap,
    color: "border-primary",
    headerColor: "bg-primary",
    featured: true,
    features: [
      "Everything in Standard",
      '"Premium" verified badge',
      "Boosted sort position",
      "Direct lead routing (exclusive leads)",
      "Featured in homepage spotlight",
      "Featured in location pages",
      "Monthly lead report email",
    ],
    cta: "Start Premium",
    ctaStyle: "bg-primary text-white hover:bg-primary-dark",
  },
  {
    name: "Elite",
    price: "$299",
    period: "/month",
    description: "Top-of-directory placement and full tracking suite",
    icon: Award,
    color: "border-accent",
    headerColor: "bg-accent",
    features: [
      "Everything in Premium",
      '"Elite Verified" badge (top of profiles)',
      "Top sort position (1st or 2nd result)",
      "CallRail tracking phone number",
      "Dedicated lead report with call recordings",
      "Featured in comparison pages",
      "Zip code page priority placement",
      "Priority support",
    ],
    cta: "Start Elite",
    ctaStyle: "bg-accent text-white hover:bg-amber-600",
  },
];

const stats = [
  { value: "4,200+", label: "Patients matched to date" },
  { value: "10", label: "Verified specialists listed" },
  { value: "77+", label: "Houston zip codes served" },
  { value: "4.8★", label: "Average specialist rating" },
];

export default function ForDentistsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6">
              <Star className="h-4 w-4 text-accent fill-current" />
              <span className="text-sm text-primary-light font-medium">
                Houston&apos;s #1 Implant Directory
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Grow Your Implant Practice with Houston&apos;s Fastest-Growing Patient Directory
            </h1>
            <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-relaxed">
              HTX Dental Implants connects{" "}
              <strong className="text-white">4,200+ Houston patients</strong> with implant
              specialists like you. Get exclusive leads, featured placement, and more visibility
              for your practice — starting free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white hover:bg-amber-600 transition-colors shadow-lg"
              >
                See Pricing
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+13467526836"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors border border-white/20"
              >
                <Phone className="h-5 w-5" />
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HTX */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
              Why Implant Specialists Choose HTX Dental Implants
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Highly Qualified Leads",
                description:
                  "Patients arrive pre-qualified — they've selected their procedure, neighborhood, and urgency level. These are serious buyers, not casual browsers.",
                icon: "🎯",
              },
              {
                title: "Exclusive Lead Routing",
                description:
                  "Premium and Elite listings receive exclusive leads matched to their service areas and specialties. No sharing leads with 10 other dentists.",
                icon: "🔒",
              },
              {
                title: "Growing SEO Footprint",
                description:
                  "77+ zip code pages, 150+ procedure-location combo pages, and comparison guides bring in high-intent organic traffic from patients who are ready to book.",
                icon: "📈",
              },
              {
                title: "CallRail Phone Tracking",
                description:
                  "Elite members get a dedicated tracking phone number. See exactly which leads call, listen to recordings, and measure ROI down to the dollar.",
                icon: "📞",
              },
              {
                title: "Review-Rich Profiles",
                description:
                  "Your verified reviews are displayed with star ratings in Google SERPs via Schema.org markup — more clicks before patients even hit your website.",
                icon: "⭐",
              },
              {
                title: "No Long-Term Contracts",
                description:
                  "Month-to-month. Cancel anytime. Standard listing stays free permanently. We earn your business every month.",
                icon: "🤝",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-base font-heading font-bold text-secondary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-2 text-gray-600">No setup fees. No long-term contracts. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border-2 ${tier.color} bg-white overflow-hidden ${
                  tier.featured ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
              >
                {tier.featured && (
                  <div className="bg-primary text-center py-1.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`${tier.headerColor} px-6 py-5`}>
                  <div className="flex items-center gap-2 mb-2">
                    <tier.icon className={`h-5 w-5 ${tier.featured ? "text-white" : tier.name === "Elite" ? "text-white" : "text-secondary"}`} />
                    <h3 className={`text-lg font-heading font-bold ${tier.featured ? "text-white" : tier.name === "Elite" ? "text-white" : "text-secondary"}`}>
                      {tier.name}
                    </h3>
                  </div>
                  <div className={`flex items-baseline gap-1 ${tier.featured ? "text-white" : tier.name === "Elite" ? "text-white" : ""}`}>
                    <span className="text-3xl font-extrabold">{tier.price}</span>
                    <span className="text-sm opacity-80">{tier.period}</span>
                  </div>
                  <p className={`text-sm mt-1 ${tier.featured ? "text-white/80" : tier.name === "Elite" ? "text-white/80" : "text-gray-600"}`}>
                    {tier.description}
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:dentists@htxdentalimplants.com?subject=${encodeURIComponent(`${tier.name} Listing Inquiry`)}`}
                    className={`block w-full text-center rounded-xl px-4 py-3 text-sm font-bold transition-colors ${tier.ctaStyle}`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Questions? Call us at{" "}
            <a href="tel:+13467526836" className="text-primary font-medium">
              (346) 752-6836
            </a>{" "}
            or email{" "}
            <a href="mailto:dentists@htxdentalimplants.com" className="text-primary font-medium">
              dentists@htxdentalimplants.com
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-heading font-bold text-secondary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How does lead routing work?",
                a: "When a patient submits the 'Get 3 Quotes' form, our system matches them with up to 3 dentists based on their procedure interest and neighborhood. Premium and Elite listings receive these leads first and exclusively within their service area. Standard listings receive general inquiry leads.",
              },
              {
                q: "How quickly will I receive leads?",
                a: "Leads are delivered in real-time via email as soon as a patient submits a form. Elite members also receive a weekly digest with call recordings from their tracking number.",
              },
              {
                q: "Can I update my listing information?",
                a: "Yes — email us at dentists@htxdentalimplants.com with any updates (new procedures, hours, photos, awards). We'll update your profile within 24 hours.",
              },
              {
                q: "What's the minimum commitment?",
                a: "Month-to-month. No contracts. Your Standard listing remains free permanently, even if you cancel a paid plan. We believe in earning your business every month.",
              },
              {
                q: "How do I claim my free listing?",
                a: "Email dentists@htxdentalimplants.com with your practice name, address, phone, and a few specialties. We'll create your profile within 48 hours.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-heading font-bold text-secondary">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Ready to Grow Your Implant Practice?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
            Join Houston&apos;s fastest-growing implant directory. Standard listing is always free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:dentists@htxdentalimplants.com?subject=Listing Inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Claim Your Free Listing
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/dentists"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              See Current Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
