import acompanhantes from "../data/acompanhantes.json";

export interface Acompanhante {
  id: string;
  nome: string;
  idade: number;
  foto: string;
  descricao: string;
  detalhes: string;
  contato: {
    telefone: string;
    whatsapp: string;
  };
  caracteristicas: {
    cabelo: string;
    altura: string;
    disponibilidade: string;
  };
}

export function getAcompanhantes(): Acompanhante[] {
  return acompanhantes as Acompanhante[];
}

export function getAcompanhanteById(id: string): Acompanhante | undefined {
  return acompanhantes.find((acompanhante) => acompanhante.id === id);
}

export function getAcompanhantesByFilter(filter: {
  cabelo?: string;
  idadeMin?: number;
  idadeMax?: number;
}): Acompanhante[] {
  let filtered = acompanhantes as Acompanhante[];

  if (filter.cabelo) {
    filtered = filtered.filter((a) =>
      a.caracteristicas.cabelo
        .toLowerCase()
        .includes(filter.cabelo!.toLowerCase())
    );
  }

  if (filter.idadeMin) {
    filtered = filtered.filter((a) => a.idade >= filter.idadeMin!);
  }

  if (filter.idadeMax) {
    filtered = filtered.filter((a) => a.idade <= filter.idadeMax!);
  }

  return filtered;
}
