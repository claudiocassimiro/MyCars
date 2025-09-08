import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAcompanhanteById, getAcompanhantes } from "@/lib/data"
import { Phone, MessageCircle, ArrowLeft, MapPin, Clock, User, Ruler } from "lucide-react"

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const acompanhantes = getAcompanhantes()
  return acompanhantes.map((acompanhante) => ({
    id: acompanhante.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const acompanhante = getAcompanhanteById(params.id)

  if (!acompanhante) {
    return {
      title: "Acompanhante não encontrada - MyGirls",
    }
  }

  return {
    title: `${acompanhante.nome}, ${acompanhante.idade} anos - Acompanhante em Porto de Galinhas | MyGirls`,
    description: `${acompanhante.descricao} Acompanhante exclusiva para eventos sociais em Porto de Galinhas. ${acompanhante.detalhes}`,
    keywords: `${acompanhante.nome}, acompanhante Porto de Galinhas, ${acompanhante.caracteristicas.cabelo.toLowerCase()}, ${acompanhante.idade} anos, eventos sociais`,
    openGraph: {
      title: `${acompanhante.nome} - Acompanhante em Porto de Galinhas`,
      description: acompanhante.descricao,
      images: [
        {
          url: acompanhante.foto,
          width: 400,
          height: 500,
          alt: `${acompanhante.nome} - Acompanhante em Porto de Galinhas`,
        },
      ],
      type: "profile",
    },
    alternates: {
      canonical: `/acompanhante/${acompanhante.id}`,
    },
  }
}

export default function AcompanhantePage({ params }: PageProps) {
  const acompanhante = getAcompanhanteById(params.id)

  if (!acompanhante) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: acompanhante.nome,
    description: acompanhante.descricao,
    image: acompanhante.foto,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Porto de Galinhas",
      addressRegion: "PE",
      addressCountry: "BR",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Back Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Link href="/catalogo" className="flex items-center gap-2">
                <ArrowLeft size={20} />
                Voltar ao Catálogo
              </Link>
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Photo and Contact */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-luxury sticky top-24">
                <div className="relative">
                  <Image
                    src={acompanhante.foto || "/placeholder.svg"}
                    alt={`${acompanhante.nome} - Acompanhante em Porto de Galinhas`}
                    width={400}
                    height={600}
                    className="w-full h-96 lg:h-[500px] object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{acompanhante.nome}</h1>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {acompanhante.idade} anos
                    </Badge>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <a
                        href={acompanhante.contato.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <MessageCircle size={20} />
                        Conversar no WhatsApp
                      </a>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                    >
                      <a
                        href={`tel:${acompanhante.contato.telefone}`}
                        className="flex items-center justify-center gap-3"
                      >
                        <Phone size={20} />
                        {acompanhante.contato.telefone}
                      </a>
                    </Button>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-gray-600">
                        <User size={16} className="text-red-600" />
                        <span className="font-medium">Cabelo:</span>
                        <span>{acompanhante.caracteristicas.cabelo}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Ruler size={16} className="text-red-600" />
                        <span className="font-medium">Altura:</span>
                        <span>{acompanhante.caracteristicas.altura}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin size={16} className="text-red-600" />
                        <span className="font-medium">Local:</span>
                        <span>Porto de Galinhas</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="shadow-luxury">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre {acompanhante.nome}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">{acompanhante.descricao}</p>
                  <p className="text-gray-600 leading-relaxed">{acompanhante.detalhes}</p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="shadow-luxury">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Clock className="text-red-600" size={24} />
                    Disponibilidade
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{acompanhante.caracteristicas.disponibilidade}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Eventos Sociais</h4>
                      <p className="text-sm text-red-700">
                        Jantares, festas, eventos corporativos e ocasiões especiais
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Acompanhamento</h4>
                      <p className="text-sm text-red-700">Viagens, passeios turísticos e atividades culturais</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="shadow-luxury">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <MapPin className="text-red-600" size={24} />
                    Localização e Atendimento
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Atendimento em toda região de Porto de Galinhas, incluindo:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        Hotéis e Resorts
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        Restaurantes
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        Eventos Privados
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        Viagens de Negócios
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="shadow-luxury gradient-red-gold text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Interessado em agendar?</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Entre em contato agora mesmo para verificar disponibilidade e agendar seu encontro com{" "}
                    {acompanhante.nome}. Atendimento discreto e profissional garantido.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      <a
                        href={acompanhante.contato.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <MessageCircle size={20} />
                        WhatsApp
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 bg-transparent"
                    >
                      <a
                        href={`tel:${acompanhante.contato.telefone}`}
                        className="flex items-center justify-center gap-3"
                      >
                        <Phone size={20} />
                        Ligar Agora
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Profiles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Outras Acompanhantes Disponíveis</h3>
            <div className="text-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/catalogo">Ver Catálogo Completo</Link>
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
