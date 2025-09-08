"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Acompanhante } from "@/lib/data"

interface AcompanhanteFormProps {
  acompanhante?: Acompanhante
  onSubmit: (data: Partial<Acompanhante>) => Promise<void>
  onCancel: () => void
  isEditing?: boolean
}

export function AcompanhanteForm({ acompanhante, onSubmit, onCancel, isEditing = false }: AcompanhanteFormProps) {
  const [formData, setFormData] = useState({
    nome: acompanhante?.nome || "",
    idade: acompanhante?.idade || 18,
    foto: acompanhante?.foto || "",
    descricao: acompanhante?.descricao || "",
    detalhes: acompanhante?.detalhes || "",
    telefone: acompanhante?.contato?.telefone || "",
    whatsapp: acompanhante?.contato?.whatsapp || "",
    cabelo: acompanhante?.caracteristicas?.cabelo || "",
    altura: acompanhante?.caracteristicas?.altura || "",
    disponibilidade: acompanhante?.caracteristicas?.disponibilidade || "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const acompanhanteData = {
        ...(isEditing && { id: acompanhante?.id }),
        nome: formData.nome,
        idade: formData.idade,
        foto: formData.foto,
        descricao: formData.descricao,
        detalhes: formData.detalhes,
        contato: {
          telefone: formData.telefone,
          whatsapp: formData.whatsapp,
        },
        caracteristicas: {
          cabelo: formData.cabelo,
          altura: formData.altura,
          disponibilidade: formData.disponibilidade,
        },
      }

      await onSubmit(acompanhanteData)
    } catch (error) {
      setError("Erro ao salvar acompanhante")
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Acompanhante" : "Adicionar Nova Acompanhante"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => updateFormData("nome", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="idade">Idade *</Label>
              <Input
                id="idade"
                type="number"
                min="18"
                max="50"
                value={formData.idade}
                onChange={(e) => updateFormData("idade", Number.parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="foto">URL da Foto</Label>
            <Input
              id="foto"
              type="url"
              value={formData.foto}
              onChange={(e) => updateFormData("foto", e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição Breve *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => updateFormData("descricao", e.target.value)}
              placeholder="Descrição curta para o card"
              required
            />
          </div>

          <div>
            <Label htmlFor="detalhes">Detalhes Completos *</Label>
            <Textarea
              id="detalhes"
              value={formData.detalhes}
              onChange={(e) => updateFormData("detalhes", e.target.value)}
              placeholder="Descrição detalhada para a página individual"
              rows={4}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => updateFormData("telefone", e.target.value)}
                placeholder="(81) 99999-9999"
                required
              />
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp URL *</Label>
              <Input
                id="whatsapp"
                type="url"
                value={formData.whatsapp}
                onChange={(e) => updateFormData("whatsapp", e.target.value)}
                placeholder="https://wa.me/5581999999999"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cabelo">Cor do Cabelo *</Label>
              <Input
                id="cabelo"
                value={formData.cabelo}
                onChange={(e) => updateFormData("cabelo", e.target.value)}
                placeholder="Moreno, Loiro, Ruivo..."
                required
              />
            </div>

            <div>
              <Label htmlFor="altura">Altura *</Label>
              <Input
                id="altura"
                value={formData.altura}
                onChange={(e) => updateFormData("altura", e.target.value)}
                placeholder="1.65m"
                required
              />
            </div>

            <div>
              <Label htmlFor="disponibilidade">Disponibilidade *</Label>
              <Input
                id="disponibilidade"
                value={formData.disponibilidade}
                onChange={(e) => updateFormData("disponibilidade", e.target.value)}
                placeholder="Eventos, jantares..."
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? "Salvando..." : isEditing ? "Atualizar" : "Adicionar"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
