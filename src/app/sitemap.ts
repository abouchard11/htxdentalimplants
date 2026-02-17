import type { MetadataRoute } from "next";
import { dentists } from "@/data/dentists";
import { procedures } from "@/data/procedures";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://htxdentalimplants.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/dentists`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/procedures`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const dentistPages: MetadataRoute.Sitemap = dentists.map((d) => ({
    url: `${baseUrl}/dentists/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const procedurePages: MetadataRoute.Sitemap = procedures.map((p) => ({
    url: `${baseUrl}/procedures/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...dentistPages, ...procedurePages];
}
