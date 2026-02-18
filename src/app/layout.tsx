import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileUrgencyBar from "@/components/MobileUrgencyBar";
import { GoogleTagManager, GTMNoScript } from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://htxdentalimplants.com"),
  title: {
    default: "Dental Implants Houston TX | HTX Dental Implants Network 2026",
    template: "%s | HTX Dental Implants",
  },
  description:
    "Houston's Trusted Implant Network. Find top-rated dental implant specialists in Houston, TX. Compare dentists, read verified reviews, and book free consultations for All-on-4, single tooth implants, and more. 4,200+ patients matched.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://htxdentalimplants.com",
    siteName: "HTX Dental Implants",
    title: "Dental Implants Houston TX | HTX Dental Implants Network 2026",
    description:
      "Houston's Trusted Implant Network. Compare 10 verified implant specialists, read reviews, and book free consultations. Find Your Dentist. Compare. Save. Smile.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Implants Houston TX | HTX Dental Implants 2026",
    description:
      "Houston's Trusted Implant Network. Compare top implant dentists, read reviews, and book free consultations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://htxdentalimplants.com",
  },
};

const schemaMarkup = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://htxdentalimplants.com/#website",
      name: "HTX Dental Implants",
      url: "https://htxdentalimplants.com",
      description: "Houston's Trusted Implant Network — find, compare, and book top dental implant specialists.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://htxdentalimplants.com/dentists?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "MedicalOrganization",
      "@id": "https://htxdentalimplants.com/#organization",
      name: "HTX Dental Implants",
      url: "https://htxdentalimplants.com",
      logo: "https://htxdentalimplants.com/logo.svg",
      description: "Houston's premier dental implant directory. Find top-rated implant specialists, compare prices, and book free consultations.",
      medicalSpecialty: "Dentistry",
      areaServed: {
        "@type": "City",
        name: "Houston",
        containedInPlace: {
          "@type": "State",
          name: "Texas",
        },
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-346-752-6880",
        contactType: "customer service",
        areaServed: "Houston, TX",
        availableLanguage: ["English", "Spanish"],
      },
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {schemaMarkup}
        </Script>
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        <GTMNoScript />
        <GoogleTagManager />
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileUrgencyBar />
      </body>
    </html>
  );
}
