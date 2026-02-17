import Link from "next/link";

const footerLinks = {
  procedures: [
    { name: "Single Tooth Implant", href: "/procedures/single-tooth-implant" },
    { name: "All-on-4 Implants", href: "/procedures/all-on-4" },
    { name: "Implant Dentures", href: "/procedures/implant-supported-dentures" },
    { name: "Same-Day Implants", href: "/procedures/same-day-implants" },
    { name: "Bone Grafting", href: "/procedures/bone-grafting" },
    { name: "Full Mouth Reconstruction", href: "/procedures/full-mouth-reconstruction" },
  ],
  resources: [
    { name: "Find a Dentist", href: "/dentists" },
    { name: "Cost Guide", href: "/cost-guide" },
    { name: "About Us", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                HTX
              </div>
              <span className="text-lg font-heading font-bold">HTX Dental Implants</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Houston&apos;s trusted directory for finding top-rated dental implant specialists.
              Compare dentists, read reviews, and book free consultations.
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
                Serving Houston, Katy, Sugar Land, Clear Lake, The Woodlands, and surrounding areas.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} HTX Dental Implants. All rights reserved.
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
