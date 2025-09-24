"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Car,
  Key,
  ArrowLeft,
} from "lucide-react";
import { getVeiculoById } from "@/lib/data";
import type { Veiculo } from "@/lib/data";

export default function VeiculoDetailPage() {
  const params = useParams();
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const veiculoId = params.id as string;

    // Buscar veículo no localStorage primeiro
    const savedVeiculos = localStorage.getItem("veiculos");
    if (savedVeiculos) {
      const veiculos = JSON.parse(savedVeiculos);
      const foundVeiculo = veiculos.find((v: Veiculo) => v.id === veiculoId);
      if (foundVeiculo) {
        setVeiculo(foundVeiculo);
        setLoading(false);
        return;
      }
    }

    // Se não encontrou no localStorage, buscar nos dados iniciais
    const foundVeiculo = getVeiculoById(veiculoId);
    if (foundVeiculo) {
      setVeiculo(foundVeiculo);
    }
    setLoading(false);
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatKm = (km: number) => {
    return new Intl.NumberFormat("pt-BR").format(km) + " km";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Carregando...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!veiculo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Veículo não encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              O veículo que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link href="/catalogo">Voltar ao Catálogo</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Início
          </Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-blue-600">
            Catálogo
          </Link>
          <span>/</span>
          <span className="text-gray-900">
            {veiculo.marca} {veiculo.modelo}
          </span>
        </div>

        {/* Botão Voltar */}
        <Button variant="outline" asChild className="mb-6">
          <Link href="/catalogo">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Catálogo
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de Imagens */}
          <div>
            <div className="relative mb-4">
              <Image
                src={veiculo.fotos[currentImageIndex] || "/placeholder.svg"}
                alt={`${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              {veiculo.chaveReserva && (
                <Badge className="absolute top-4 right-4 bg-green-600">
                  <Key className="w-3 h-3 mr-1" />
                  Chave Reserva
                </Badge>
              )}
            </div>

            {/* Miniaturas */}
            {veiculo.fotos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {veiculo.fotos.map((foto, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={foto}
                      alt={`${veiculo.marca} ${veiculo.modelo} - Foto ${
                        index + 1
                      }`}
                      width={150}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Veículo */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {veiculo.marca} {veiculo.modelo}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {veiculo.ano}
                </span>
                <span className="flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  {formatKm(veiculo.quilometragem)}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  {veiculo.combustivel}
                </span>
                <span className="flex items-center gap-1">
                  <Car className="w-4 h-4" />
                  {veiculo.cambio}
                </span>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {formatPrice(veiculo.preco)}
              </div>
              <Badge
                variant={
                  veiculo.status === "disponivel" ? "default" : "secondary"
                }
              >
                {veiculo.status === "disponivel"
                  ? "Disponível"
                  : veiculo.status === "vendido"
                  ? "Vendido"
                  : "Reservado"}
              </Badge>
            </div>

            {/* Descrição */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{veiculo.descricao}</p>
                <p className="text-gray-600">{veiculo.detalhes}</p>
              </CardContent>
            </Card>

            {/* Características Técnicas */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Características Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Motor:</span>
                  <span className="font-medium">
                    {veiculo.caracteristicas.motor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Potência:</span>
                  <span className="font-medium">
                    {veiculo.caracteristicas.potencia}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consumo:</span>
                  <span className="font-medium">
                    {veiculo.caracteristicas.consumo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cor:</span>
                  <span className="font-medium">{veiculo.cor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Portas:</span>
                  <span className="font-medium">{veiculo.portas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tabela FIPE:</span>
                  <span className="font-medium">
                    {formatPrice(veiculo.tabelaFipe)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Opcionais */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Opcionais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {veiculo.caracteristicas.opcionais}
                </p>
              </CardContent>
            </Card>

            {/* Botões de Contato */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  asChild
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <a
                    href={veiculo.contato.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </Button>

                <Button asChild variant="outline" className="flex-1">
                  <a
                    href={`tel:${veiculo.contato.telefone}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Ligar
                  </a>
                </Button>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="/contato">Solicitar Informações</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
