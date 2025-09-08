import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AcompanhanteCard } from "@/components/acompanhante-card";
import { Button } from "@/components/ui/button";
import { getAcompanhantes } from "@/lib/data";
import Link from "next/link";
import { Star, Shield, Clock } from "lucide-react";

export const metadata = {
  title: "MyGirls - Acompanhantes Exclusivas em Porto de Galinhas",
  description:
    "Acompanhantes elegantes e sofisticadas para eventos, jantares e ocasiões especiais em Porto de Galinhas, PE. Discrição e qualidade garantidas.",
  keywords:
    "acompanhantes Porto de Galinhas, eventos sociais PE, jantares executivos, acompanhamento discreto, Pernambuco",
  openGraph: {
    title: "MyGirls - Acompanhantes Exclusivas em Porto de Galinhas",
    description:
      "Acompanhantes elegantes e sofisticadas para eventos, jantares e ocasiões especiais em Porto de Galinhas, PE. Discrição e qualidade garantidas.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MyGirls",
  description:
    "Acompanhantes elegantes para eventos sociais em Porto de Galinhas",
  image: `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br"
  }/og-image.jpg`,
  telephone: "+55-81-99999-0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto de Galinhas",
    addressRegion: "PE",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.5014,
    longitude: -35.0217,
  },
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://mygirls.com.br",
  priceRange: "$$$",
  openingHours: "Mo-Su 00:00-23:59",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -8.5014,
      longitude: -35.0217,
    },
    geoRadius: "50000",
  },
};

export default function HomePage() {
  const acompanhantes = getAcompanhantes();
  const featuredAcompanhantes = acompanhantes.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center gradient-red-gold">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance text-high-contrast">
              Acompanhantes Exclusivas em Porto de Galinhas
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto text-pretty text-high-contrast">
              Elegância e sofisticação para seus eventos mais especiais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-red-700 hover:bg-gray-100 font-semibold"
              >
                <Link href="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-700 bg-transparent font-semibold"
              >
                <Link href="/contato">Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4" aria-labelledby="features-heading">
          <div className="container mx-auto">
            <h2 id="features-heading" className="sr-only">
              Nossos Serviços
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <article className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-red-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Eventos Sociais</h3>
                <p className="text-gray-600 leading-relaxed">
                  Acompanhamento elegante para festas, formaturas e celebrações
                  especiais
                </p>
              </article>

              <article className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Jantares Executivos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discrição e sofisticação para seus compromissos profissionais
                  e corporativos
                </p>
              </article>

              <article className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-red-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Eventos Culturais
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Companhia refinada para teatros, exposições e eventos
                  culturais
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Featured Escorts */}
        <section
          className="py-16 px-4 bg-gray-50"
          aria-labelledby="featured-heading"
        >
          <div className="container mx-auto">
            <header className="text-center mb-12">
              <h2
                id="featured-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Acompanhantes em Destaque
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Conheça nossas acompanhantes mais requisitadas
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredAcompanhantes.map((acompanhante) => (
                <AcompanhanteCard
                  key={acompanhante.id}
                  acompanhante={acompanhante}
                  featured={true}
                />
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/catalogo">Ver Todas</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4" aria-labelledby="about-heading">
          <div className="container mx-auto max-w-4xl text-center">
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Por Que Escolher MyGirls?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Oferecemos o mais alto padrão de qualidade e discrição. Nossas
              acompanhantes são cuidadosamente selecionadas por sua elegância,
              inteligência e capacidade de proporcionar experiências memoráveis
              em qualquer ocasião.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
