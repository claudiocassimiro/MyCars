import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VeiculoCard } from "@/components/veiculo-card";
import { Button } from "@/components/ui/button";
import { getVeiculosEmDestaque, getVeiculosDisponiveis } from "@/lib/data";
import Link from "next/link";
import { Car, Shield, Wrench, CheckCircle } from "lucide-react";

export const metadata = {
  title: "AutoVenda - Veículos Novos e Seminovos de Qualidade",
  description:
    "Encontre o veículo ideal para você. Carros novos e seminovos com garantia, documentação em dia e financiamento sem entrada. Aprovação rápida!",
  keywords:
    "carros novos, carros seminovos, veículos usados, compra de carro, financiamento sem entrada, concessionária, financiamento automóvel",
  openGraph: {
    title: "AutoVenda - Veículos Novos e Seminovos de Qualidade",
    description:
      "Encontre o veículo ideal para você. Carros novos e seminovos com garantia, documentação em dia e financiamento sem entrada. Aprovação rápida!",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "AutoVenda",
  description:
    "Concessionária de veículos novos e seminovos com garantia, documentação em dia e financiamento sem entrada",
  image: `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br"
  }/og-image.jpg`,
  telephone: "+55-81-99999-0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Recife",
    addressRegion: "PE",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.0476,
    longitude: -34.877,
  },
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br",
  priceRange: "$$",
  openingHours: "Mo-Fr 08:00-18:00, Sa 08:00-12:00",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -8.0476,
      longitude: -34.877,
    },
    geoRadius: "100000",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Car",
        name: "Veículos Novos",
      },
      description: "Carros zero quilômetro com garantia de fábrica",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Car",
        name: "Veículos Seminovos",
      },
      description: "Carros seminovos com garantia e documentação em dia",
    },
  ],
};

export default function HomePage() {
  const veiculos = getVeiculosDisponiveis();
  const featuredVeiculos = getVeiculosEmDestaque();

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
        <section className="relative py-20 px-4 text-center gradient-blue-silver">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance text-high-contrast">
              Veículos Novos e Seminovos de Qualidade
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto text-pretty text-high-contrast">
              Encontre o carro ideal com garantia, documentação em dia e
              financiamento sem entrada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 font-semibold"
              >
                <Link href="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent font-semibold"
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
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <article className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Novos e Seminovos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Veículos zero quilômetro e seminovos com garantia completa
                </p>
              </article>

              <article className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle
                    className="w-8 h-8 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Garantia Total</h3>
                <p className="text-gray-600 leading-relaxed">
                  Todos os veículos passam por rigorosa inspeção e vêm com
                  garantia
                </p>
              </article>

              <article className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield
                    className="w-8 h-8 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Documentação em Dia
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  IPVA quitado, licenciamento atualizado e transferência
                  facilitada
                </p>
              </article>

              <article className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench
                    className="w-8 h-8 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Financiamento Sem Entrada
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Aprovação rápida sem entrada inicial, parcelamos em até 60x
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
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
                Veículos em Destaque
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Conheça nossos veículos mais procurados
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredVeiculos.map((veiculo) => (
                <VeiculoCard
                  key={veiculo.id}
                  veiculo={veiculo}
                  featured={true}
                />
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Link href="/catalogo">Ver Todos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Financing Section */}
        <section
          className="py-16 px-4 bg-blue-50"
          aria-labelledby="financing-heading"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2
                id="financing-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Financiamento Sem Entrada
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Realize o sonho do seu carro novo ou seminovo sem precisar de
                entrada inicial
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      0%
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Sem Entrada
                  </h3>
                </div>
                <p className="text-gray-600 text-center">
                  Aprovação imediata sem necessidade de entrada inicial. Comece
                  a dirigir hoje mesmo!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      60x
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Até 60 Parcelas
                  </h3>
                </div>
                <p className="text-gray-600 text-center">
                  Parcelas que cabem no seu bolso. Escolha o prazo que melhor se
                  adapta à sua renda.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-purple-600">
                      ✓
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Aprovação Rápida
                  </h3>
                </div>
                <p className="text-gray-600 text-center">
                  Análise de crédito em até 24 horas. Resposta rápida e sem
                  burocracias.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Condições Especiais
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Para Veículos Novos:
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Financiamento até 100% do valor</li>
                      <li>• Taxas especiais para compradores</li>
                      <li>• Garantia de fábrica inclusa</li>
                      <li>• Seguro opcional</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Para Veículos Seminovos:
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Financiamento até 90% do valor</li>
                      <li>• Taxas competitivas</li>
                      <li>• Garantia estendida disponível</li>
                      <li>• Transferência facilitada</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href="/contato">Simular Financiamento</Link>
                  </Button>
                </div>
              </div>
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
              Por Que Escolher AutoVenda?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Oferecemos o mais alto padrão de qualidade e confiabilidade.
              Nossos veículos novos e seminovos são cuidadosamente inspecionados
              e selecionados para garantir que você tenha a melhor experiência
              na compra do seu carro.
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
