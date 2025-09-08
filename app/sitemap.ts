import type { MetadataRoute } from "next"
import { getAcompanhantes } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br"
  const locales = ["pt", "en", "es"]

  // Base pages for each locale
  const basePages = ["", "/catalogo", "/contato"]

  // Generate sitemap entries for each locale and page
  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    basePages.forEach((page) => {
      const url = locale === "pt" ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            pt: locale === "pt" ? `${baseUrl}${page}` : `${baseUrl}${page}`,
            en: locale === "pt" ? `${baseUrl}/en${page}` : `${baseUrl}/en${page}`,
            es: locale === "pt" ? `${baseUrl}/es${page}` : `${baseUrl}/es${page}`,
          },
        },
      })
    })

    // Add individual escort profile pages
    const acompanhantes = getAcompanhantes(locale)
    acompanhantes.forEach((acompanhante) => {
      const profileUrl =
        locale === "pt"
          ? `${baseUrl}/acompanhante/${acompanhante.id}`
          : `${baseUrl}/${locale}/acompanhante/${acompanhante.id}`

      sitemapEntries.push({
        url: profileUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            pt: `${baseUrl}/acompanhante/${acompanhante.id}`,
            en: `${baseUrl}/en/acompanhante/${acompanhante.id}`,
            es: `${baseUrl}/es/acompanhante/${acompanhante.id}`,
          },
        },
      })
    })
  })

  return sitemapEntries
}
