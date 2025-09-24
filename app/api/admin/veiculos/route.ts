import { NextRequest, NextResponse } from "next/server";
import {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
} from "@/lib/veiculos-memory";
import type { Veiculo } from "@/lib/data";

// GET - Listar todos os veículos
export async function GET() {
  try {
    const veiculos = await getVeiculos();
    return NextResponse.json(veiculos);
  } catch (error) {
    console.error("Erro ao obter veículos:", error);
    return NextResponse.json(
      { error: "Erro ao ler veículos" },
      { status: 500 }
    );
  }
}

// POST - Criar novo veículo
export async function POST(request: NextRequest) {
  try {
    const veiculoData = await request.json();
    const veiculo = await createVeiculo(veiculoData);
    return NextResponse.json({ success: true, veiculo });
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
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

    const veiculo = await updateVeiculo(id, veiculoData);

    if (!veiculo) {
      return NextResponse.json(
        { error: "Veículo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, veiculo });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
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

    const success = await deleteVeiculo(id);

    if (!success) {
      return NextResponse.json(
        { error: "Veículo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar veículo:", error);
    return NextResponse.json(
      { error: "Erro ao remover veículo" },
      { status: 500 }
    );
  }
}
