"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AcompanhanteCard } from "@/components/acompanhante-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAcompanhantes } from "@/lib/data"
import { Search, Filter } from "lucide-react"
import { useTranslations } from "next-intl"

interface CatalogoClientPageProps {
  locale: string
}

export default function CatalogoClientPage({ locale }: CatalogoClientPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cabeloFilter, setCabeloFilter] = useState("all")
  const [idadeFilter, setIdadeFilter] = useState("all")

  const t = useTranslations("catalog")
  const tCommon = useTranslations("common")

  const acompanhantes = getAcompanhantes(locale)

  const filteredAcompanhantes = useMemo(() => {
    return acompanhantes.filter((acompanhante) => {
      const matchesSearch =
        acompanhante.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acompanhante.descricao.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCabelo =
        cabeloFilter === "all" || acompanhante.caracteristicas.cabelo.toLowerCase().includes(cabeloFilter.toLowerCase())

      const matchesIdade =
        idadeFilter === "all" ||
        (idadeFilter === "18-25" && acompanhante.idade >= 18 && acompanhante.idade <= 25) ||
        (idadeFilter === "26-30" && acompanhante.idade >= 26 && acompanhante.idade <= 30) ||
        (idadeFilter === "31+" && acompanhante.idade >= 31)

      return matchesSearch && matchesCabelo && matchesIdade
    })
  }, [acompanhantes, searchTerm, cabeloFilter, idadeFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setCabeloFilter("all")
    setIdadeFilter("all")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b" aria-labelledby="filters-heading">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter size={20} aria-hidden="true" />
              <span id="filters-heading" className="font-semibold">
                {tCommon("filter")}:
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                  aria-hidden="true"
                />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label={tCommon("search")}
                />
              </div>

              <Select value={cabeloFilter} onValueChange={setCabeloFilter}>
                <SelectTrigger className="w-full sm:w-48" aria-label={tCommon("hairColor")}>
                  <SelectValue placeholder={tCommon("hairColor")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{tCommon("all")}</SelectItem>
                  <SelectItem value="moreno">{tCommon("brunette")}</SelectItem>
                  <SelectItem value="loiro">{tCommon("blonde")}</SelectItem>
                  <SelectItem value="ruivo">{tCommon("redhead")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={idadeFilter} onValueChange={setIdadeFilter}>
                <SelectTrigger className="w-full sm:w-48" aria-label={tCommon("age")}>
                  <SelectValue placeholder={tCommon("age")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{tCommon("all")}</SelectItem>
                  <SelectItem value="18-25">18-25 {tCommon("years")}</SelectItem>
                  <SelectItem value="26-30">26-30 {tCommon("years")}</SelectItem>
                  <SelectItem value="31+">31+ {tCommon("years")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap bg-transparent">
              {t("clearFilters")}
            </Button>
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <p className="text-gray-600" role="status" aria-live="polite">
              Mostrando {filteredAcompanhantes.length} de {acompanhantes.length} acompanhantes
            </p>
          </div>

          {filteredAcompanhantes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAcompanhantes.map((acompanhante) => (
                <AcompanhanteCard key={acompanhante.id} acompanhante={acompanhante} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">{t("noResults")}</p>
              <Button onClick={clearFilters}>{t("clearFilters")}</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
