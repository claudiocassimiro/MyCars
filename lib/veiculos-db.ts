import { kv } from "@vercel/kv";
import type { Veiculo } from "./data";

const VEICULOS_KEY = "veiculos";

// Função para inicializar dados se não existirem
async function initializeData() {
  const existing = await kv.get(VEICULOS_KEY);
  if (!existing) {
    // Importar dados iniciais do JSON
    const veiculosIniciais = [
      {
        id: "civic-2020-azul",
        marca: "Honda",
        modelo: "Civic SI",
        ano: 2020,
        preco: 85000,
        quilometragem: 45000,
        cor: "Azul Metálico",
        combustivel: "Flex",
        cambio: "Automático",
        portas: 4,
        fotos: [
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
        ],
        descricao:
          "Honda Civic 2020 em excelente estado de conservação. Único dono, sempre na concessionária.",
        detalhes:
          "Ar condicionado, direção hidráulica, airbag duplo, freios ABS, sistema de som original, pneus em bom estado.",
        chaveReserva: true,
        tabelaFipe: 82000,
        tipo: "seminovo" as const,
        contato: {
          telefone: "(81) 99999-9999",
          whatsapp: "https://wa.me/5581999999999",
        },
        caracteristicas: {
          motor: "1.6 16V",
          potencia: "126 cv",
          consumo: "14 km/l (etanol) / 16 km/l (gasolina)",
          opcionais:
            "Ar condicionado, direção hidráulica, airbag, ABS, som original",
        },
        status: "disponivel" as const,
        dataCadastro: "2024-01-15",
      },
      {
        id: "corolla-2019-prata",
        marca: "Toyota",
        modelo: "Corolla",
        ano: 2019,
        preco: 92000,
        quilometragem: 38000,
        cor: "Prata Metálico",
        combustivel: "Flex",
        cambio: "Automático",
        portas: 4,
        fotos: [
          "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
        ],
        descricao:
          "Toyota Corolla 2019 seminovo, muito bem conservado. Documentação em dia.",
        detalhes:
          "Ar condicionado digital, direção elétrica, airbag duplo, freios ABS, sistema de som com Bluetooth, rodas de liga leve.",
        chaveReserva: true,
        tabelaFipe: 95000,
        tipo: "seminovo" as const,
        contato: {
          telefone: "(81) 98888-8888",
          whatsapp: "https://wa.me/5581988888888",
        },
        caracteristicas: {
          motor: "2.0 16V",
          potencia: "152 cv",
          consumo: "12 km/l (etanol) / 14 km/l (gasolina)",
          opcionais:
            "Ar condicionado digital, direção elétrica, airbag, ABS, som Bluetooth, rodas de liga",
        },
        status: "disponivel" as const,
        dataCadastro: "2024-01-10",
      },
      {
        id: "hb20-2021-branco",
        marca: "Hyundai",
        modelo: "HB20",
        ano: 2021,
        preco: 65000,
        quilometragem: 25000,
        cor: "Branco",
        combustivel: "Flex",
        cambio: "Manual",
        portas: 4,
        fotos: [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
        ],
        descricao:
          "Hyundai HB20 2021 seminovo, único dono. Veículo econômico e confiável.",
        detalhes:
          "Ar condicionado, direção elétrica, airbag duplo, freios ABS, sistema de som com USB, pneus novos.",
        chaveReserva: false,
        tabelaFipe: 68000,
        tipo: "seminovo" as const,
        contato: {
          telefone: "(81) 97777-7777",
          whatsapp: "https://wa.me/5581977777777",
        },
        caracteristicas: {
          motor: "1.0 12V",
          potencia: "75 cv",
          consumo: "16 km/l (etanol) / 18 km/l (gasolina)",
          opcionais: "Ar condicionado, direção elétrica, airbag, ABS, som USB",
        },
        status: "disponivel" as const,
        dataCadastro: "2024-01-05",
      },
    ];

    await kv.set(VEICULOS_KEY, veiculosIniciais);
    return veiculosIniciais;
  }
  return existing as Veiculo[];
}

// Função para obter todos os veículos
export async function getVeiculos(): Promise<Veiculo[]> {
  try {
    const veiculos = await kv.get(VEICULOS_KEY);
    if (!veiculos) {
      return await initializeData();
    }
    return veiculos as Veiculo[];
  } catch (error) {
    console.error("Erro ao obter veículos:", error);
    // Fallback para dados locais em caso de erro
    const { getVeiculos: getVeiculosLocal } = await import("./data");
    return getVeiculosLocal();
  }
}

// Função para obter um veículo por ID
export async function getVeiculoById(id: string): Promise<Veiculo | undefined> {
  try {
    const veiculos = await getVeiculos();
    return veiculos.find((veiculo) => veiculo.id === id);
  } catch (error) {
    console.error("Erro ao obter veículo por ID:", error);
    return undefined;
  }
}

// Função para criar um novo veículo
export async function createVeiculo(
  veiculo: Omit<Veiculo, "id" | "dataCadastro">
): Promise<Veiculo> {
  try {
    const veiculos = await getVeiculos();

    // Gerar ID único
    const id = `${veiculo.marca.toLowerCase()}-${veiculo.modelo.toLowerCase()}-${
      veiculo.ano
    }-${Date.now()}`;

    const novoVeiculo: Veiculo = {
      ...veiculo,
      id,
      dataCadastro: new Date().toISOString().split("T")[0],
    };

    veiculos.push(novoVeiculo);
    await kv.set(VEICULOS_KEY, veiculos);

    return novoVeiculo;
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    throw new Error("Erro ao criar veículo");
  }
}

// Função para atualizar um veículo
export async function updateVeiculo(
  id: string,
  veiculoData: Partial<Veiculo>
): Promise<Veiculo | null> {
  try {
    const veiculos = await getVeiculos();
    const index = veiculos.findIndex((v) => v.id === id);

    if (index === -1) {
      return null;
    }

    veiculos[index] = { ...veiculos[index], ...veiculoData };
    await kv.set(VEICULOS_KEY, veiculos);

    return veiculos[index];
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    throw new Error("Erro ao atualizar veículo");
  }
}

// Função para deletar um veículo
export async function deleteVeiculo(id: string): Promise<boolean> {
  try {
    const veiculos = await getVeiculos();
    const veiculosAtualizados = veiculos.filter((v) => v.id !== id);

    if (veiculosAtualizados.length === veiculos.length) {
      return false; // Veículo não encontrado
    }

    await kv.set(VEICULOS_KEY, veiculosAtualizados);
    return true;
  } catch (error) {
    console.error("Erro ao deletar veículo:", error);
    throw new Error("Erro ao deletar veículo");
  }
}

// Função para filtrar veículos
export async function getVeiculosByFilter(filter: {
  marca?: string;
  modelo?: string;
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cor?: string;
  combustivel?: string;
  cambio?: string;
  status?: string;
}): Promise<Veiculo[]> {
  try {
    const veiculos = await getVeiculos();
    let filtered = veiculos;

    if (filter.marca) {
      filtered = filtered.filter((v) =>
        v.marca.toLowerCase().includes(filter.marca!.toLowerCase())
      );
    }

    if (filter.modelo) {
      filtered = filtered.filter((v) =>
        v.modelo.toLowerCase().includes(filter.modelo!.toLowerCase())
      );
    }

    if (filter.anoMin) {
      filtered = filtered.filter((v) => v.ano >= filter.anoMin!);
    }

    if (filter.anoMax) {
      filtered = filtered.filter((v) => v.ano <= filter.anoMax!);
    }

    if (filter.precoMin) {
      filtered = filtered.filter((v) => v.preco >= filter.precoMin!);
    }

    if (filter.precoMax) {
      filtered = filtered.filter((v) => v.preco <= filter.precoMax!);
    }

    if (filter.cor) {
      filtered = filtered.filter((v) =>
        v.cor.toLowerCase().includes(filter.cor!.toLowerCase())
      );
    }

    if (filter.combustivel) {
      filtered = filtered.filter((v) =>
        v.combustivel.toLowerCase().includes(filter.combustivel!.toLowerCase())
      );
    }

    if (filter.cambio) {
      filtered = filtered.filter((v) =>
        v.cambio.toLowerCase().includes(filter.cambio!.toLowerCase())
      );
    }

    if (filter.status) {
      filtered = filtered.filter((v) => v.status === filter.status);
    }

    return filtered;
  } catch (error) {
    console.error("Erro ao filtrar veículos:", error);
    return [];
  }
}
