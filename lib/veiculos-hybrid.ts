import { getVeiculos as getVeiculosKV } from "./veiculos-db";
import { getVeiculos as getVeiculosLocal } from "./data";

// Função híbrida que tenta usar Vercel KV primeiro, depois fallback para dados locais
export async function getVeiculosHybrid() {
  try {
    // Tenta usar Vercel KV primeiro
    return await getVeiculosKV();
  } catch (error) {
    console.warn("Vercel KV não disponível, usando dados locais:", error);
    // Fallback para dados locais
    return getVeiculosLocal();
  }
}

export { getVeiculosHybrid as getVeiculos };
