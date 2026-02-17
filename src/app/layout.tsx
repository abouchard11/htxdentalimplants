import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    default: "Best Dental Implant Dentists in Houston TX | HTX Dental Implants",
    template: "%s | HTX Dental Implants",
  },
  description:
    "Find the top-rated dental implant specialists in Houston, Texas. Compare dentists, read reviews, and book free consultations for All-on-4, single tooth implants, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://htxdentalimplants.com",
    siteName: "HTX Dental Implants",
    title: "Best Dental Implant Dentists in Houston TX",
    description:
      "Find the top-rated dental implant specialists in Houston, Texas. Compare dentists, read reviews, and book free consultations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dental Implant Dentists in Houston TX",
    description:
      "Find the top-rated dental implant specialists in Houston. Compare dentists, read reviews, and book free consultations.",
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
  "@type": "WebSite",
  name: "HTX Dental Implants",
  url: "https://htxdentalimplants.com",
  description:
    "Houston's premier dental implant directory. Find top-rated implant specialists, compare prices, and book free consultations.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://htxdentalimplants.com/dentists?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
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
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {schemaMarkup}
        </Script>
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
