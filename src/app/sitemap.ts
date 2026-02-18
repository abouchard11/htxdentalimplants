import type { MetadataRoute } from "next";
import { dentists } from "@/data/dentists";
import { procedures } from "@/data/procedures";
import { locations } from "@/data/locations";
import { houstonZipCodes } from "@/data/zip-codes";

const baseUrl = "https://htxdentalimplants.com";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/dentists`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/get-quotes`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/procedures`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cost-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/for-dentists`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Comparison pages
    { url: `${baseUrl}/compare/implants-vs-dentures`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/compare/all-on-4-vs-snap-in`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/compare/bridge-vs-implant`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const dentistPages: MetadataRoute.Sitemap = dentists.map((d) => ({
    url: `${baseUrl}/dentists/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const procedurePages: MetadataRoute.Sitemap = procedures.map((p) => ({
    url: `${baseUrl}/procedures/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${baseUrl}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 77+ zip code pages
  const zipPages: MetadataRoute.Sitemap = houstonZipCodes.map((z) => ({
    url: `${baseUrl}/zip/${z.zip}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 150 procedure+location combo pages
  const comboPages: MetadataRoute.Sitemap = locations.flatMap((l) =>
    procedures.map((p) => ({
      url: `${baseUrl}/locations/${l.slug}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticPages,
    ...dentistPages,
    ...procedurePages,
    ...locationPages,
    ...zipPages,
    ...comboPages,
  ];
}
