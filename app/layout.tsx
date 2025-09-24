import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AutoVenda - Veículos Seminovos de Qualidade",
    template: "%s | AutoVenda",
  },
  description:
    "Encontre o veículo ideal para você. Carros seminovos com garantia, documentação em dia e preços justos. Financiamento facilitado.",
  keywords: [
    "carros seminovos",
    "veículos usados",
    "compra de carro",
    "financiamento automóvel",
    "concessionária",
    "veículos garantia",
    "transferência veículo",
    "carros Recife",
  ],
  authors: [{ name: "AutoVenda", url: "https://autovenda.com.br" }],
  creator: "AutoVenda",
  publisher: "AutoVenda",
  generator: "v0.app",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "AutoVenda - Veículos Seminovos de Qualidade",
    description:
      "Encontre o veículo ideal para você. Carros seminovos com garantia, documentação em dia e preços justos. Financiamento facilitado.",
    siteName: "AutoVenda",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoVenda - Veículos Seminovos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoVenda - Veículos Seminovos de Qualidade",
    description:
      "Encontre o veículo ideal para você. Carros seminovos com garantia, documentação em dia e preços justos. Financiamento facilitado.",
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
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#2563eb" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "AutoVenda",
  description:
    "Concessionária de veículos seminovos com garantia e documentação em dia",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br",
  logo: `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br"
  }/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Recife",
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
