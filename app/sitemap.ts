import type { MetadataRoute } from "next";
import { getAcompanhantes } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br";

  const sitemapEntries: MetadataRoute.Sitemap = [
    // Home page
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Catalog page
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Contact page
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Add individual escort profile pages
  const acompanhantes = getAcompanhantes();
  acompanhantes.forEach((acompanhante) => {
    sitemapEntries.push({
      url: `${baseUrl}/acompanhante/${acompanhante.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return sitemapEntries;
}
