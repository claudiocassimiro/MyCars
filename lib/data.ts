import acompanhantesPt from "../data/acompanhantes-pt.json"
import acompanhantesEn from "../data/acompanhantes-en.json"
import acompanhantesEs from "../data/acompanhantes-es.json"

export interface Acompanhante {
  id: string
  nome: string
  idade: number
  foto: string
  descricao: string
  detalhes: string
  contato: {
    telefone: string
    whatsapp: string
  }
  caracteristicas: {
    cabelo: string
    altura: string
    disponibilidade: string
  }
}

function getDataByLocale(locale: string): Acompanhante[] {
  switch (locale) {
    case "en":
      return acompanhantesEn as Acompanhante[]
    case "es":
      return acompanhantesEs as Acompanhante[]
    case "pt":
    default:
      return acompanhantesPt as Acompanhante[]
  }
}

export function getAcompanhantes(locale = "pt"): Acompanhante[] {
  return getDataByLocale(locale)
}

export function getAcompanhanteById(id: string, locale = "pt"): Acompanhante | undefined {
  const data = getDataByLocale(locale)
  return data.find((acompanhante) => acompanhante.id === id)
}

export function getAcompanhantesByFilter(
  filter: {
    cabelo?: string
    idadeMin?: number
    idadeMax?: number
  },
  locale = "pt",
): Acompanhante[] {
  let filtered = getDataByLocale(locale)

  if (filter.cabelo) {
    filtered = filtered.filter((a) => a.caracteristicas.cabelo.toLowerCase().includes(filter.cabelo!.toLowerCase()))
  }

  if (filter.idadeMin) {
    filtered = filtered.filter((a) => a.idade >= filter.idadeMin!)
  }

  if (filter.idadeMax) {
    filtered = filtered.filter((a) => a.idade <= filter.idadeMax!)
  }

  return filtered
}

export function getAvailableLocales(): string[] {
  return ["pt", "en", "es"]
}

export function getLocaleDisplayName(locale: string): string {
  const names: Record<string, string> = {
    pt: "Português",
    en: "English",
    es: "Español",
  }
  return names[locale] || locale
}
