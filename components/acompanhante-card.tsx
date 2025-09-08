import Image from "next/image"
import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Acompanhante } from "@/lib/data"

interface AcompanhanteCardProps {
  acompanhante: Acompanhante
  featured?: boolean
}

export function AcompanhanteCard({ acompanhante, featured = false }: AcompanhanteCardProps) {
  return (
    <Card
      className={`overflow-hidden shadow-luxury hover:shadow-xl transition-all duration-300 bg-white border-red-100 ${featured ? "ring-2 ring-red-400" : ""}`}
    >
      <div className="relative">
        <Image
          src={acompanhante.foto || "/placeholder.svg"}
          alt={`${acompanhante.nome} - Acompanhante em Porto de Galinhas`}
          width={400}
          height={500}
          className="w-full h-64 object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Destaque
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {acompanhante.nome}, {acompanhante.idade} anos
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{acompanhante.descricao}</p>
        </div>

        <div className="mb-4 text-xs text-gray-500">
          <p>
            <span className="font-semibold">Cabelo:</span> {acompanhante.caracteristicas.cabelo}
          </p>
          <p>
            <span className="font-semibold">Altura:</span> {acompanhante.caracteristicas.altura}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button asChild size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <a
                href={acompanhante.contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
            >
              <a href={`tel:${acompanhante.contato.telefone}`} className="flex items-center justify-center gap-2">
                <Phone size={16} />
                Ligar
              </a>
            </Button>
          </div>

          <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
            <Link href={`/acompanhante/${acompanhante.id}`}>Ver Perfil Completo</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
