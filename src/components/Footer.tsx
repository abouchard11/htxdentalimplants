import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  procedures: [
    { name: "Single Tooth Implant", href: "/procedures/single-tooth-implant" },
    { name: "All-on-4 Implants", href: "/procedures/all-on-4" },
    { name: "Implant Dentures", href: "/procedures/implant-supported-dentures" },
    { name: "Same-Day Implants", href: "/procedures/same-day-implants" },
    { name: "Bone Grafting", href: "/procedures/bone-grafting" },
    { name: "Full Mouth Reconstruction", href: "/procedures/full-mouth-reconstruction" },
  ],
  locations: [
    { name: "Katy", href: "/locations/katy" },
    { name: "Sugar Land", href: "/locations/sugar-land" },
    { name: "The Woodlands", href: "/locations/the-woodlands" },
    { name: "Pearland", href: "/locations/pearland" },
    { name: "Cypress", href: "/locations/cypress" },
    { name: "Clear Lake", href: "/locations/clear-lake" },
    { name: "Memorial", href: "/locations/memorial" },
    { name: "Spring", href: "/locations/spring" },
    { name: "Missouri City", href: "/locations/missouri-city" },
    { name: "Conroe", href: "/locations/conroe" },
    { name: "League City", href: "/locations/league-city" },
    { name: "Pasadena", href: "/locations/pasadena" },
    { name: "Baytown", href: "/locations/baytown" },
    { name: "Humble", href: "/locations/humble" },
    { name: "Richmond", href: "/locations/richmond" },
    { name: "View All Areas →", href: "/locations" },
  ],
  resources: [
    { name: "Get 3 Free Quotes", href: "/get-quotes" },
    { name: "Find a Dentist", href: "/dentists" },
    { name: "Cost Guide", href: "/cost-guide" },
    { name: "Locations", href: "/locations" },
    { name: "For Dentists", href: "/for-dentists" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo size="sm" inverted />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Houston&apos;s Trusted Implant Network. Compare top-rated dental implant
              specialists, read reviews, and book free consultations.
            </p>
          </div>

          {/* Procedures */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Procedures
            </h3>
            <ul className="space-y-2">
              {footerLinks.procedures.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2 columns-2">
              {footerLinks.locations.map((link) => (
                <li key={link.href} className="break-inside-avoid">
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Serving Houston, Katy, Sugar Land, Clear Lake, The Woodlands,
                Conroe, Pearland, and all surrounding areas.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} HTX Dental Implants. All rights reserved. Houston&apos;s Trusted Implant Network.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
