import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Veiculo } from "@/lib/data";

const VEICULOS_FILE = join(process.cwd(), "data", "veiculos.json");

// GET - Listar todos os veículos
export async function GET() {
  try {
    const data = readFileSync(VEICULOS_FILE, "utf8");
    const veiculos = JSON.parse(data);
    return NextResponse.json(veiculos);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao ler veículos" },
      { status: 500 }
    );
  }
}

// POST - Criar novo veículo
export async function POST(request: NextRequest) {
  try {
    const veiculo: Veiculo = await request.json();

    // Ler veículos existentes
    const data = readFileSync(VEICULOS_FILE, "utf8");
    const veiculos = JSON.parse(data);

    // Gerar ID único
    const id = `${veiculo.marca.toLowerCase()}-${veiculo.modelo.toLowerCase()}-${
      veiculo.ano
    }-${Date.now()}`;
    veiculo.id = id;
    veiculo.dataCadastro = new Date().toISOString().split("T")[0];

    // Adicionar novo veículo
    veiculos.push(veiculo);

    // Salvar no arquivo
    writeFileSync(VEICULOS_FILE, JSON.stringify(veiculos, null, 2));

    return NextResponse.json({ success: true, veiculo });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar veículo" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar veículo
export async function PUT(request: NextRequest) {
  try {
    const { id, ...veiculoData }: { id: string } & Partial<Veiculo> =
      await request.json();

    // Ler veículos existentes
    const data = readFileSync(VEICULOS_FILE, "utf8");
    const veiculos = JSON.parse(data);

    // Encontrar e atualizar veículo
    const index = veiculos.findIndex((v: Veiculo) => v.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Veículo não encontrado" },
        { status: 404 }
      );
    }

    veiculos[index] = { ...veiculos[index], ...veiculoData };

    // Salvar no arquivo
    writeFileSync(VEICULOS_FILE, JSON.stringify(veiculos, null, 2));

    return NextResponse.json({ success: true, veiculo: veiculos[index] });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar veículo" },
      { status: 500 }
    );
  }
}

// DELETE - Remover veículo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do veículo é obrigatório" },
        { status: 400 }
      );
    }

    // Ler veículos existentes
    const data = readFileSync(VEICULOS_FILE, "utf8");
    const veiculos = JSON.parse(data);

    // Filtrar veículo removido
    const veiculosAtualizados = veiculos.filter((v: Veiculo) => v.id !== id);

    if (veiculosAtualizados.length === veiculos.length) {
      return NextResponse.json(
        { error: "Veículo não encontrado" },
        { status: 404 }
      );
    }

    // Salvar no arquivo
    writeFileSync(VEICULOS_FILE, JSON.stringify(veiculosAtualizados, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao remover veículo" },
      { status: 500 }
    );
  }
}
