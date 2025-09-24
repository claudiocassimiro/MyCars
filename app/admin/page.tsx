"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Save, X } from "lucide-react";
import type { Veiculo } from "@/lib/data";

export default function AdminPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Veiculo>>({
    marca: "",
    modelo: "",
    ano: new Date().getFullYear(),
    preco: 0,
    quilometragem: 0,
    cor: "",
    combustivel: "Flex",
    cambio: "Manual",
    portas: 4,
    fotos: [],
    descricao: "",
    detalhes: "",
    chaveReserva: false,
    tabelaFipe: 0,
    tipo: "seminovo",
    contato: {
      telefone: "",
      whatsapp: "",
    },
    caracteristicas: {
      motor: "",
      potencia: "",
      consumo: "",
      opcionais: "",
    },
    status: "disponivel",
    dataCadastro: new Date().toISOString().split("T")[0],
  });

  // Carregar veículos da API
  useEffect(() => {
    const loadVeiculos = async () => {
      try {
        const response = await fetch("/api/admin/veiculos");
        const data = await response.json();
        setVeiculos(data);
      } catch (error) {
        console.error("Erro ao carregar veículos:", error);
      }
    };

    loadVeiculos();
  }, []);

  const handleSave = async () => {
    if (!formData.marca || !formData.modelo || !formData.ano) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    const veiculoData: Veiculo = {
      id: editingVeiculo?.id || "",
      marca: formData.marca!,
      modelo: formData.modelo!,
      ano: formData.ano!,
      preco: formData.preco || 0,
      quilometragem: formData.quilometragem || 0,
      cor: formData.cor || "",
      combustivel: formData.combustivel || "Flex",
      cambio: formData.cambio || "Manual",
      portas: formData.portas || 4,
      fotos: formData.fotos || [],
      descricao: formData.descricao || "",
      detalhes: formData.detalhes || "",
      chaveReserva: formData.chaveReserva || false,
      tabelaFipe: formData.tabelaFipe || 0,
      tipo: formData.tipo || "seminovo",
      contato: {
        telefone: formData.contato?.telefone || "",
        whatsapp: formData.contato?.whatsapp || "",
      },
      caracteristicas: {
        motor: formData.caracteristicas?.motor || "",
        potencia: formData.caracteristicas?.potencia || "",
        consumo: formData.caracteristicas?.consumo || "",
        opcionais: formData.caracteristicas?.opcionais || "",
      },
      status: formData.status || "disponivel",
      dataCadastro:
        formData.dataCadastro || new Date().toISOString().split("T")[0],
    };

    try {
      let response;
      if (editingVeiculo) {
        // Atualizar veículo existente
        response = await fetch("/api/admin/veiculos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingVeiculo.id, ...veiculoData }),
        });
      } else {
        // Criar novo veículo
        response = await fetch("/api/admin/veiculos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veiculoData),
        });
      }

      if (response.ok) {
        // Recarregar lista de veículos
        const updatedResponse = await fetch("/api/admin/veiculos");
        const updatedData = await updatedResponse.json();
        setVeiculos(updatedData);

        setEditingVeiculo(null);
        setIsAddingNew(false);
        resetForm();
      } else {
        alert("Erro ao salvar veículo");
      }
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      alert("Erro ao salvar veículo");
    }
  };

  const handleEdit = (veiculo: Veiculo) => {
    setEditingVeiculo(veiculo);
    setFormData(veiculo);
    setIsAddingNew(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      try {
        const response = await fetch(`/api/admin/veiculos?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Recarregar lista de veículos
          const updatedResponse = await fetch("/api/admin/veiculos");
          const updatedData = await updatedResponse.json();
          setVeiculos(updatedData);
        } else {
          alert("Erro ao excluir veículo");
        }
      } catch (error) {
        console.error("Erro ao excluir veículo:", error);
        alert("Erro ao excluir veículo");
      }
    }
  };

  const handleAddNew = () => {
    setEditingVeiculo(null);
    setIsAddingNew(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      marca: "",
      modelo: "",
      ano: new Date().getFullYear(),
      preco: 0,
      quilometragem: 0,
      cor: "",
      combustivel: "Flex",
      cambio: "Manual",
      portas: 4,
      fotos: [],
      descricao: "",
      detalhes: "",
      chaveReserva: false,
      tabelaFipe: 0,
      tipo: "seminovo",
      contato: {
        telefone: "",
        whatsapp: "",
      },
      caracteristicas: {
        motor: "",
        potencia: "",
        consumo: "",
        opcionais: "",
      },
      status: "disponivel",
      dataCadastro: new Date().toISOString().split("T")[0],
    });
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Administração - Veículos
          </h1>
          <Button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Veículo
          </Button>
        </div>

        {/* Formulário de Edição/Adição */}
        {(editingVeiculo || isAddingNew) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingVeiculo ? "Editar Veículo" : "Adicionar Novo Veículo"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, marca: e.target.value })
                    }
                    placeholder="Ex: Honda"
                  />
                </div>
                <div>
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, modelo: e.target.value })
                    }
                    placeholder="Ex: Civic"
                  />
                </div>
                <div>
                  <Label htmlFor="ano">Ano *</Label>
                  <Input
                    id="ano"
                    type="number"
                    value={formData.ano || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ano: parseInt(e.target.value),
                      })
                    }
                    placeholder="2020"
                  />
                </div>
                <div>
                  <Label htmlFor="preco">Preço</Label>
                  <Input
                    id="preco"
                    type="number"
                    value={formData.preco || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preco: parseFloat(e.target.value),
                      })
                    }
                    placeholder="85000"
                  />
                </div>
                <div>
                  <Label htmlFor="quilometragem">Quilometragem</Label>
                  <Input
                    id="quilometragem"
                    type="number"
                    value={formData.quilometragem || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quilometragem: parseInt(e.target.value),
                      })
                    }
                    placeholder="45000"
                  />
                </div>
                <div>
                  <Label htmlFor="cor">Cor</Label>
                  <Input
                    id="cor"
                    value={formData.cor || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, cor: e.target.value })
                    }
                    placeholder="Azul Metálico"
                  />
                </div>
                <div>
                  <Label htmlFor="combustivel">Combustível</Label>
                  <Select
                    value={formData.combustivel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, combustivel: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Flex">Flex</SelectItem>
                      <SelectItem value="Gasolina">Gasolina</SelectItem>
                      <SelectItem value="Etanol">Etanol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cambio">Câmbio</Label>
                  <Select
                    value={formData.cambio}
                    onValueChange={(value) =>
                      setFormData({ ...formData, cambio: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automático">Automático</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="portas">Portas</Label>
                  <Select
                    value={formData.portas?.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, portas: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Portas</SelectItem>
                      <SelectItem value="4">4 Portas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tabelaFipe">Tabela FIPE</Label>
                  <Input
                    id="tabelaFipe"
                    type="number"
                    value={formData.tabelaFipe || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tabelaFipe: parseFloat(e.target.value),
                      })
                    }
                    placeholder="82000"
                  />
                </div>
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tipo: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="seminovo">Seminovo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="vendido">Vendido</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  placeholder="Descrição breve do veículo"
                />
              </div>

              <div>
                <Label htmlFor="detalhes">Detalhes</Label>
                <Textarea
                  id="detalhes"
                  value={formData.detalhes || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, detalhes: e.target.value })
                  }
                  placeholder="Detalhes técnicos e opcionais"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="motor">Motor</Label>
                  <Input
                    id="motor"
                    value={formData.caracteristicas?.motor || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caracteristicas: {
                          ...formData.caracteristicas,
                          motor: e.target.value,
                        },
                      })
                    }
                    placeholder="1.6 16V"
                  />
                </div>
                <div>
                  <Label htmlFor="potencia">Potência</Label>
                  <Input
                    id="potencia"
                    value={formData.caracteristicas?.potencia || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caracteristicas: {
                          ...formData.caracteristicas,
                          potencia: e.target.value,
                        },
                      })
                    }
                    placeholder="126 cv"
                  />
                </div>
                <div>
                  <Label htmlFor="consumo">Consumo</Label>
                  <Input
                    id="consumo"
                    value={formData.caracteristicas?.consumo || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caracteristicas: {
                          ...formData.caracteristicas,
                          consumo: e.target.value,
                        },
                      })
                    }
                    placeholder="14 km/l (etanol) / 16 km/l (gasolina)"
                  />
                </div>
                <div>
                  <Label htmlFor="opcionais">Opcionais</Label>
                  <Input
                    id="opcionais"
                    value={formData.caracteristicas?.opcionais || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caracteristicas: {
                          ...formData.caracteristicas,
                          opcionais: e.target.value,
                        },
                      })
                    }
                    placeholder="Ar condicionado, direção hidráulica, airbag"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.contato?.telefone || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contato: {
                          ...formData.contato,
                          telefone: e.target.value,
                        },
                      })
                    }
                    placeholder="(81) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.contato?.whatsapp || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contato: {
                          ...formData.contato,
                          whatsapp: e.target.value,
                        },
                      })
                    }
                    placeholder="https://wa.me/5581999999999"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="chaveReserva"
                  checked={formData.chaveReserva || false}
                  onChange={(e) =>
                    setFormData({ ...formData, chaveReserva: e.target.checked })
                  }
                />
                <Label htmlFor="chaveReserva">Possui chave reserva</Label>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingVeiculo(null);
                    setIsAddingNew(false);
                    resetForm();
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Veículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {veiculos.map((veiculo) => (
            <Card key={veiculo.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {veiculo.marca} {veiculo.modelo}
                  </h3>
                  <Badge
                    variant={
                      veiculo.status === "disponivel" ? "default" : "secondary"
                    }
                  >
                    {veiculo.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {veiculo.ano} • {veiculo.cor}
                </p>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  {formatPrice(veiculo.preco)}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {veiculo.quilometragem.toLocaleString()} km •{" "}
                  {veiculo.combustivel} • {veiculo.cambio}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(veiculo)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(veiculo.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {veiculos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum veículo cadastrado ainda.</p>
            <Button
              onClick={handleAddNew}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Veículo
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
