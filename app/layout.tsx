import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyGirls - Acompanhantes Exclusivas em Porto de Galinhas",
    template: "%s | MyGirls",
  },
  description:
    "Acompanhantes elegantes e sofisticadas para eventos, jantares e ocasiões especiais em Porto de Galinhas, PE. Discrição e qualidade garantidas.",
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
  generator: "v0.app",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "MyGirls - Acompanhantes Exclusivas em Porto de Galinhas",
    description:
      "Acompanhantes elegantes e sofisticadas para eventos, jantares e ocasiões especiais em Porto de Galinhas, PE. Discrição e qualidade garantidas.",
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
    title: "MyGirls - Acompanhantes Exclusivas em Porto de Galinhas",
    description:
      "Acompanhantes elegantes e sofisticadas para eventos, jantares e ocasiões especiais em Porto de Galinhas, PE. Discrição e qualidade garantidas.",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dc2626" },
    { media: "(prefers-color-scheme: dark)", color: "#dc2626" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MyGirls",
  description:
    "Acompanhantes elegantes para eventos sociais em Porto de Galinhas",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br",
  logo: `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br"
  }/logo.png`,
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
    availableLanguage: "Portuguese",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
