"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VeiculoCard } from "@/components/veiculo-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import { getVeiculos } from "@/lib/data";
import type { Veiculo } from "@/lib/data";

export default function CatalogoPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [filteredVeiculos, setFilteredVeiculos] = useState<Veiculo[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    marca: "all",
    anoMin: "",
    anoMax: "",
    precoMin: "",
    precoMax: "",
    cor: "all",
    combustivel: "all",
    cambio: "all",
    status: "disponivel",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Carregar veículos
  useEffect(() => {
    const savedVeiculos = localStorage.getItem("veiculos");
    if (savedVeiculos) {
      const veiculosData = JSON.parse(savedVeiculos);
      setVeiculos(veiculosData);
      setFilteredVeiculos(
        veiculosData.filter((v: Veiculo) => v.status === "disponivel")
      );
    } else {
      // Carregar dados iniciais do arquivo JSON
      const veiculosData = getVeiculos();
      setVeiculos(veiculosData);
      setFilteredVeiculos(
        veiculosData.filter((v: Veiculo) => v.status === "disponivel")
      );
    }
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = veiculos.filter((veiculo) => {
      // Filtro por status
      if (filters.status && veiculo.status !== filters.status) return false;

      // Filtro por busca (marca, modelo, cor)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (
          !veiculo.marca.toLowerCase().includes(searchTerm) &&
          !veiculo.modelo.toLowerCase().includes(searchTerm) &&
          !veiculo.cor.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Filtro por marca
      if (
        filters.marca &&
        filters.marca !== "all" &&
        !veiculo.marca.toLowerCase().includes(filters.marca.toLowerCase())
      ) {
        return false;
      }

      // Filtro por ano
      if (filters.anoMin && veiculo.ano < parseInt(filters.anoMin))
        return false;
      if (filters.anoMax && veiculo.ano > parseInt(filters.anoMax))
        return false;

      // Filtro por preço
      if (filters.precoMin && veiculo.preco < parseFloat(filters.precoMin))
        return false;
      if (filters.precoMax && veiculo.preco > parseFloat(filters.precoMax))
        return false;

      // Filtro por cor
      if (
        filters.cor &&
        filters.cor !== "all" &&
        !veiculo.cor.toLowerCase().includes(filters.cor.toLowerCase())
      ) {
        return false;
      }

      // Filtro por combustível
      if (
        filters.combustivel &&
        filters.combustivel !== "all" &&
        !veiculo.combustivel
          .toLowerCase()
          .includes(filters.combustivel.toLowerCase())
      ) {
        return false;
      }

      // Filtro por câmbio
      if (
        filters.cambio &&
        filters.cambio !== "all" &&
        !veiculo.cambio.toLowerCase().includes(filters.cambio.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredVeiculos(filtered);
  }, [veiculos, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      marca: "all",
      anoMin: "",
      anoMax: "",
      precoMin: "",
      precoMax: "",
      cor: "all",
      combustivel: "all",
      cambio: "all",
      status: "disponivel",
    });
  };

  const getUniqueValues = (key: keyof Veiculo) => {
    const values = veiculos
      .map((v) => v[key])
      .filter((value, index, self) => self.indexOf(value) === index);
    return values;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo de Veículos
          </h1>
          <p className="text-gray-600">
            Encontre o veículo ideal para você. {filteredVeiculos.length}{" "}
            veículo(s) encontrado(s).
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por marca, modelo ou cor..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Botão de Filtros */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Filtros Avançados */}
            {(showFilters ||
              (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Marca
                  </label>
                  <Select
                    value={filters.marca}
                    onValueChange={(value) =>
                      handleFilterChange("marca", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as marcas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as marcas</SelectItem>
                      {getUniqueValues("marca").map((marca) => (
                        <SelectItem
                          key={marca as string}
                          value={marca as string}
                        >
                          {marca as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Ano Mínimo
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 2015"
                    value={filters.anoMin}
                    onChange={(e) =>
                      handleFilterChange("anoMin", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Ano Máximo
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 2023"
                    value={filters.anoMax}
                    onChange={(e) =>
                      handleFilterChange("anoMax", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Preço Mínimo
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 30000"
                    value={filters.precoMin}
                    onChange={(e) =>
                      handleFilterChange("precoMin", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Preço Máximo
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 100000"
                    value={filters.precoMax}
                    onChange={(e) =>
                      handleFilterChange("precoMax", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Cor
                  </label>
                  <Select
                    value={filters.cor}
                    onValueChange={(value) => handleFilterChange("cor", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as cores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cores</SelectItem>
                      {getUniqueValues("cor").map((cor) => (
                        <SelectItem key={cor as string} value={cor as string}>
                          {cor as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Combustível
                  </label>
                  <Select
                    value={filters.combustivel}
                    onValueChange={(value) =>
                      handleFilterChange("combustivel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {getUniqueValues("combustivel").map((combustivel) => (
                        <SelectItem
                          key={combustivel as string}
                          value={combustivel as string}
                        >
                          {combustivel as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Câmbio
                  </label>
                  <Select
                    value={filters.cambio}
                    onValueChange={(value) =>
                      handleFilterChange("cambio", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {getUniqueValues("cambio").map((cambio) => (
                        <SelectItem
                          key={cambio as string}
                          value={cambio as string}
                        >
                          {cambio as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lista de Veículos */}
        {filteredVeiculos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVeiculos.map((veiculo) => (
              <VeiculoCard key={veiculo.id} veiculo={veiculo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum veículo encontrado com os filtros aplicados.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
