"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AcompanhanteForm } from "@/components/admin/acompanhante-form"
import { Plus, Edit, Trash2, LogOut, Users } from "lucide-react"
import type { Acompanhante } from "@/lib/data"

export default function AdminPage() {
  const [acompanhantes, setAcompanhantes] = useState<Acompanhante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingAcompanhante, setEditingAcompanhante] = useState<Acompanhante | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadAcompanhantes()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth")
      const data = await response.json()

      if (!data.authenticated) {
        router.push("/admin/login")
      }
    } catch (error) {
      router.push("/admin/login")
    }
  }

  const loadAcompanhantes = async () => {
    try {
      const response = await fetch("/api/admin/acompanhantes")
      if (response.ok) {
        const data = await response.json()
        setAcompanhantes(data)
      } else {
        setError("Erro ao carregar acompanhantes")
      }
    } catch (error) {
      setError("Erro de conexão")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const handleAddAcompanhante = async (data: Partial<Acompanhante>) => {
    try {
      const response = await fetch("/api/admin/acompanhantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await loadAcompanhantes()
        setShowForm(false)
        setError("")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erro ao adicionar acompanhante")
      }
    } catch (error) {
      setError("Erro de conexão")
    }
  }

  const handleEditAcompanhante = async (data: Partial<Acompanhante>) => {
    try {
      const response = await fetch("/api/admin/acompanhantes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await loadAcompanhantes()
        setEditingAcompanhante(null)
        setError("")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erro ao atualizar acompanhante")
      }
    } catch (error) {
      setError("Erro de conexão")
    }
  }

  const handleDeleteAcompanhante = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover esta acompanhante?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/acompanhantes?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadAcompanhantes()
        setError("")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erro ao remover acompanhante")
      }
    } catch (error) {
      setError("Erro de conexão")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (showForm || editingAcompanhante) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <AcompanhanteForm
          acompanhante={editingAcompanhante || undefined}
          onSubmit={editingAcompanhante ? handleEditAcompanhante : handleAddAcompanhante}
          onCancel={() => {
            setShowForm(false)
            setEditingAcompanhante(null)
          }}
          isEditing={!!editingAcompanhante}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-gray-600">MyGirls - Gerenciar Acompanhantes</p>
              </div>
            </div>

            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{acompanhantes.length}</p>
                  <p className="text-gray-600">Acompanhantes Cadastradas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gerenciar Acompanhantes</h2>
          <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
            <Plus size={16} />
            Adicionar Nova
          </Button>
        </div>

        {/* Acompanhantes List */}
        <div className="grid gap-4">
          {acompanhantes.map((acompanhante) => (
            <Card key={acompanhante.id} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      {acompanhante.foto && (
                        <img
                          src={acompanhante.foto || "/placeholder.svg"}
                          alt={acompanhante.nome}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {acompanhante.nome}, {acompanhante.idade} anos
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {acompanhante.caracteristicas.cabelo} • {acompanhante.caracteristicas.altura}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{acompanhante.descricao}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingAcompanhante(acompanhante)}
                      className="flex items-center gap-2"
                    >
                      <Edit size={14} />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteAcompanhante(acompanhante.id)}
                      className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Remover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {acompanhantes.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma acompanhante cadastrada</h3>
                <p className="text-gray-600 mb-4">Comece adicionando a primeira acompanhante ao catálogo.</p>
                <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700">
                  Adicionar Primeira Acompanhante
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
