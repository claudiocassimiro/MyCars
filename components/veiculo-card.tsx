import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Car,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Veiculo } from "@/lib/data";

interface VeiculoCardProps {
  veiculo: Veiculo;
  featured?: boolean;
}

export function VeiculoCard({ veiculo, featured = false }: VeiculoCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatKm = (km: number) => {
    return new Intl.NumberFormat("pt-BR").format(km) + " km";
  };

  return (
    <Card
      className={`overflow-hidden shadow-luxury hover:shadow-xl transition-all duration-300 bg-white border-blue-100 ${
        featured ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="relative">
        <Image
          src={veiculo.fotos[0] || "/placeholder.svg"}
          alt={`${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`}
          width={400}
          height={300}
          className="w-full h-[300px] object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Destaque
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {veiculo.ano}
          </Badge>
          <Badge
            variant={veiculo.tipo === "novo" ? "default" : "outline"}
            className={
              veiculo.tipo === "novo"
                ? "bg-green-600 text-white"
                : "bg-white/90 text-gray-800"
            }
          >
            {veiculo.tipo === "novo" ? "Novo" : "Seminovo"}
          </Badge>
        </div>
        {veiculo.chaveReserva && (
          <div className="absolute bottom-2 right-2">
            <Badge
              variant="outline"
              className="bg-white/90 text-green-700 border-green-300"
            >
              <Key size={12} className="mr-1" />
              Chave Reserva
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {veiculo.marca} {veiculo.modelo}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            {veiculo.descricao}
          </p>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {formatPrice(veiculo.preco)}
          </div>
        </div>

        <div className="mb-4 text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <Gauge size={14} />
            <span>{formatKm(veiculo.quilometragem)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{veiculo.ano}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel size={14} />
            <span>
              {veiculo.combustivel} • {veiculo.cambio}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Car size={14} />
            <span>
              {veiculo.cor} • {veiculo.portas} portas
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-gray-500">
            <span className="font-semibold">Motor:</span>{" "}
            {veiculo.caracteristicas.motor}
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-semibold">Potência:</span>{" "}
            {veiculo.caracteristicas.potencia}
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-semibold">Consumo:</span>{" "}
            {veiculo.caracteristicas.consumo}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <a
                href={veiculo.contato.whatsapp}
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
              className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <a
                href={`tel:${veiculo.contato.telefone}`}
                className="flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                Ligar
              </a>
            </Button>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Link href={`/veiculo/${veiculo.id}`}>Ver Detalhes Completos</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
