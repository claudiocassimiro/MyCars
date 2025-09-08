import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import fs from "fs/promises"
import path from "path"

// Check admin authentication
function isAuthenticated() {
  const cookieStore = cookies()
  const session = cookieStore.get("admin-session")
  return session?.value === "authenticated"
}

const DATA_FILE = path.join(process.cwd(), "data", "acompanhantes.json")

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const acompanhantes = JSON.parse(data)
    return NextResponse.json(acompanhantes)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar dados" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const newAcompanhante = await request.json()

    // Generate ID from name and age
    const id = `${newAcompanhante.nome.toLowerCase().replace(/\s+/g, "-")}-${newAcompanhante.idade}anos`
    newAcompanhante.id = id

    const data = await fs.readFile(DATA_FILE, "utf-8")
    const acompanhantes = JSON.parse(data)

    acompanhantes.push(newAcompanhante)

    await fs.writeFile(DATA_FILE, JSON.stringify(acompanhantes, null, 2))

    return NextResponse.json({ success: true, acompanhante: newAcompanhante })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao adicionar acompanhante" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const updatedAcompanhante = await request.json()

    const data = await fs.readFile(DATA_FILE, "utf-8")
    const acompanhantes = JSON.parse(data)

    const index = acompanhantes.findIndex((a: any) => a.id === updatedAcompanhante.id)
    if (index === -1) {
      return NextResponse.json({ error: "Acompanhante não encontrada" }, { status: 404 })
    }

    acompanhantes[index] = updatedAcompanhante

    await fs.writeFile(DATA_FILE, JSON.stringify(acompanhantes, null, 2))

    return NextResponse.json({ success: true, acompanhante: updatedAcompanhante })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar acompanhante" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 })
    }

    const data = await fs.readFile(DATA_FILE, "utf-8")
    const acompanhantes = JSON.parse(data)

    const filteredAcompanhantes = acompanhantes.filter((a: any) => a.id !== id)

    if (filteredAcompanhantes.length === acompanhantes.length) {
      return NextResponse.json({ error: "Acompanhante não encontrada" }, { status: 404 })
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(filteredAcompanhantes, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao remover acompanhante" }, { status: 500 })
  }
}
