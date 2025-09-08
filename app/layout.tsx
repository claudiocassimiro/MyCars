import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "./globals.css"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale || "pt"

  const titles = {
    pt: "MyGirls - Acompanhantes Exclusivas em Porto de Galinhas",
    en: "MyGirls - Exclusive Escorts in Porto de Galinhas",
    es: "MyGirls - Escorts Exclusivas en Porto de Galinhas",
  }

  const descriptions = {
    pt: "Acompanhantes elegantes e sofisticadas para eventos, jantares e ocasiões especiais em Porto de Galinhas, PE. Discrição e qualidade garantidas.",
    en: "Elegant and sophisticated escorts for events, dinners and special occasions in Porto de Galinhas, PE. Discretion and quality guaranteed.",
    es: "Escorts elegantes y sofisticadas para eventos, cenas y ocasiones especiales en Porto de Galinhas, PE. Discreción y calidad garantizadas.",
  }

  return {
    title: {
      default: titles[locale as keyof typeof titles] || titles.pt,
      template: "%s | MyGirls",
    },
    description: descriptions[locale as keyof typeof descriptions] || descriptions.pt,
    keywords: [
      "acompanhantes Porto de Galinhas",
      "eventos sociais Pernambuco",
      "jantares executivos",
      "acompanhamento exclusivo",
      "Porto de Galinhas PE",
      "eventos corporativos",
      "acompanhantes elegantes",
      "serviços discretos",
    ],
    authors: [{ name: "MyGirls", url: "https://mygirls.com.br" }],
    creator: "MyGirls",
    publisher: "MyGirls",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br"),
    alternates: {
      canonical: "/",
      languages: {
        pt: "/pt",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US",
      url: "/",
      title: titles[locale as keyof typeof titles] || titles.pt,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.pt,
      siteName: "MyGirls",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "MyGirls - Acompanhantes em Porto de Galinhas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale as keyof typeof titles] || titles.pt,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.pt,
      images: ["/og-image.jpg"],
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dc2626" },
    { media: "(prefers-color-scheme: dark)", color: "#dc2626" },
  ],
}

function getOrganizationJsonLd(locale: string) {
  const descriptions = {
    pt: "Acompanhantes elegantes para eventos sociais em Porto de Galinhas",
    en: "Elegant escorts for social events in Porto de Galinhas",
    es: "Escorts elegantes para eventos sociales en Porto de Galinhas",
  }

  const languages = {
    pt: "Portuguese",
    en: "English",
    es: "Spanish",
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyGirls",
    description: descriptions[locale as keyof typeof descriptions] || descriptions.pt,
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br"}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Porto de Galinhas",
      addressRegion: "PE",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-81-99999-0000",
      contactType: "customer service",
      availableLanguage: languages[locale as keyof typeof languages] || languages.pt,
    },
    sameAs: [],
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const locale = params?.locale || "pt"
  const messages = await getMessages()
  const organizationJsonLd = getOrganizationJsonLd(locale)

  return (
    <html lang={locale === "pt" ? "pt-BR" : locale}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>{children}</Suspense>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
