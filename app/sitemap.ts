import type { MetadataRoute } from "next";
import { getVeiculos } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br";

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
    // Admin page
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Contact page
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Add individual vehicle pages
  const veiculos = getVeiculos();
  veiculos.forEach((veiculo) => {
    sitemapEntries.push({
      url: `${baseUrl}/veiculo/${veiculo.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return sitemapEntries;
}
