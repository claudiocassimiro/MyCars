import veiculos from "../data/veiculos.json";

export interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  cor: string;
  combustivel: string;
  cambio: string;
  portas: number;
  fotos: string[];
  descricao: string;
  detalhes: string;
  chaveReserva: boolean;
  tabelaFipe: number;
  tipo: "novo" | "seminovo";
  contato: {
    telefone: string;
    whatsapp: string;
  };
  caracteristicas: {
    motor: string;
    potencia: string;
    consumo: string;
    opcionais: string;
  };
  status: "disponivel" | "vendido" | "reservado";
  dataCadastro: string;
}

export function getVeiculos(): Veiculo[] {
  return veiculos as Veiculo[];
}

export function getVeiculoById(id: string): Veiculo | undefined {
  return veiculos.find((veiculo) => veiculo.id === id);
}

export function getVeiculosByFilter(filter: {
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
}): Veiculo[] {
  let filtered = veiculos as Veiculo[];

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
}

export function getVeiculosDisponiveis(): Veiculo[] {
  return veiculos.filter((v) => v.status === "disponivel") as Veiculo[];
}

export function getVeiculosEmDestaque(): Veiculo[] {
  return veiculos
    .filter((v) => v.status === "disponivel")
    .sort((a, b) => b.preco - a.preco)
    .slice(0, 3) as Veiculo[];
}
