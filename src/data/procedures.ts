export interface Procedure {
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  priceRange: string;
  recoveryTime: string;
  successRate: string;
}

export const procedures: Procedure[] = [
  {
    slug: "single-tooth-implant",
    name: "Single Tooth Implant",
    shortDescription: "Replace one missing tooth with a natural-looking, permanent implant that functions like a real tooth.",
    metaTitle: "Single Tooth Dental Implant Houston TX | Cost & Top Dentists",
    metaDescription: "Find the best single tooth dental implant dentists in Houston. Compare costs ($1,500-$6,000), read reviews, and book free consultations.",
    icon: "Tooth",
    priceRange: "$1,500 - $6,000",
    recoveryTime: "3-6 months",
    successRate: "98%",
  },
  {
    slug: "all-on-4",
    name: "All-on-4 Dental Implants",
    shortDescription: "Full arch restoration using just 4 strategically placed implants. Get a new smile in one day.",
    metaTitle: "All-on-4 Dental Implants Houston TX | Same-Day Smile",
    metaDescription: "All-on-4 dental implant specialists in Houston. Full arch restoration from $15,000-$30,000. Same-day teeth available. Free consultations.",
    icon: "Grid2x2",
    priceRange: "$15,000 - $30,000",
    recoveryTime: "3-6 months",
    successRate: "97%",
  },
  {
    slug: "implant-supported-dentures",
    name: "Implant-Supported Dentures",
    shortDescription: "Secure your dentures permanently with implant attachments. No more slipping or adhesives.",
    metaTitle: "Implant-Supported Dentures Houston TX | Snap-In Dentures",
    metaDescription: "Implant-supported denture specialists in Houston. Snap-in dentures from $5,000-$15,000. Stop dealing with loose dentures. Free consultations.",
    icon: "Layers",
    priceRange: "$5,000 - $15,000",
    recoveryTime: "4-6 months",
    successRate: "96%",
  },
  {
    slug: "full-mouth-reconstruction",
    name: "Full Mouth Reconstruction",
    shortDescription: "Complete smile transformation combining implants, crowns, and restorations for optimal function and aesthetics.",
    metaTitle: "Full Mouth Reconstruction Houston TX | Top Implant Dentists",
    metaDescription: "Full mouth reconstruction specialists in Houston. Combine implants, crowns & veneers for a complete smile makeover. Free consultations.",
    icon: "Sparkles",
    priceRange: "$20,000 - $50,000+",
    recoveryTime: "6-12 months",
    successRate: "95%",
  },
  {
    slug: "bone-grafting",
    name: "Bone Grafting",
    shortDescription: "Rebuild jawbone density to support dental implants when bone loss has occurred.",
    metaTitle: "Dental Bone Grafting Houston TX | Implant Preparation",
    metaDescription: "Expert bone grafting for dental implants in Houston. Rebuild jawbone for successful implant placement. Costs from $300-$3,000.",
    icon: "Bone",
    priceRange: "$300 - $3,000",
    recoveryTime: "3-9 months",
    successRate: "90%",
  },
  {
    slug: "same-day-implants",
    name: "Same-Day Dental Implants",
    shortDescription: "Walk in with missing teeth and leave with a brand-new smile in a single appointment.",
    metaTitle: "Same-Day Dental Implants Houston TX | Teeth in a Day",
    metaDescription: "Same-day dental implant providers in Houston TX. Get permanent teeth in one visit. Immediate load implants from $3,000-$8,000 per tooth.",
    icon: "Zap",
    priceRange: "$3,000 - $8,000",
    recoveryTime: "3-6 months",
    successRate: "96%",
  },
];

export function getProcedureBySlug(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}
