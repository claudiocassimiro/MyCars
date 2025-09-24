import type { Veiculo } from './data';

// Armazenamento em memória para desenvolvimento local
let veiculosMemory: Veiculo[] = [];

// Função para inicializar dados em memória
function initializeMemoryData() {
  if (veiculosMemory.length === 0) {
    veiculosMemory = [
      {
        "id": "civic-2020-azul",
        "marca": "Honda",
        "modelo": "Civic SI",
        "ano": 2020,
        "preco": 85000,
        "quilometragem": 45000,
        "cor": "Azul Metálico",
        "combustivel": "Flex",
        "cambio": "Automático",
        "portas": 4,
        "fotos": [
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
        ],
        "descricao": "Honda Civic 2020 em excelente estado de conservação. Único dono, sempre na concessionária.",
        "detalhes": "Ar condicionado, direção hidráulica, airbag duplo, freios ABS, sistema de som original, pneus em bom estado.",
        "chaveReserva": true,
        "tabelaFipe": 82000,
        "tipo": "seminovo" as const,
        "contato": {
          "telefone": "(81) 99999-9999",
          "whatsapp": "https://wa.me/5581999999999"
        },
        "caracteristicas": {
          "motor": "1.6 16V",
          "potencia": "126 cv",
          "consumo": "14 km/l (etanol) / 16 km/l (gasolina)",
          "opcionais": "Ar condicionado, direção hidráulica, airbag, ABS, som original"
        },
        "status": "disponivel" as const,
        "dataCadastro": "2024-01-15"
      },
      {
        "id": "corolla-2019-prata",
        "marca": "Toyota",
        "modelo": "Corolla",
        "ano": 2019,
        "preco": 92000,
        "quilometragem": 38000,
        "cor": "Prata Metálico",
        "combustivel": "Flex",
        "cambio": "Automático",
        "portas": 4,
        "fotos": [
          "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop"
        ],
        "descricao": "Toyota Corolla 2019 seminovo, muito bem conservado. Documentação em dia.",
        "detalhes": "Ar condicionado digital, direção elétrica, airbag duplo, freios ABS, sistema de som com Bluetooth, rodas de liga leve.",
        "chaveReserva": true,
        "tabelaFipe": 95000,
        "tipo": "seminovo" as const,
        "contato": {
          "telefone": "(81) 98888-8888",
          "whatsapp": "https://wa.me/5581988888888"
        },
        "caracteristicas": {
          "motor": "2.0 16V",
          "potencia": "152 cv",
          "consumo": "12 km/l (etanol) / 14 km/l (gasolina)",
          "opcionais": "Ar condicionado digital, direção elétrica, airbag, ABS, som Bluetooth, rodas de liga"
        },
        "status": "disponivel" as const,
        "dataCadastro": "2024-01-10"
      },
      {
        "id": "hb20-2021-branco",
        "marca": "Hyundai",
        "modelo": "HB20",
        "ano": 2021,
        "preco": 65000,
        "quilometragem": 25000,
        "cor": "Branco",
        "combustivel": "Flex",
        "cambio": "Manual",
        "portas": 4,
        "fotos": [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
        ],
        "descricao": "Hyundai HB20 2021 seminovo, único dono. Veículo econômico e confiável.",
        "detalhes": "Ar condicionado, direção elétrica, airbag duplo, freios ABS, sistema de som com USB, pneus novos.",
        "chaveReserva": false,
        "tabelaFipe": 68000,
        "tipo": "seminovo" as const,
        "contato": {
          "telefone": "(81) 97777-7777",
          "whatsapp": "https://wa.me/5581977777777"
        },
        "caracteristicas": {
          "motor": "1.0 12V",
          "potencia": "75 cv",
          "consumo": "16 km/l (etanol) / 18 km/l (gasolina)",
          "opcionais": "Ar condicionado, direção elétrica, airbag, ABS, som USB"
        },
        "status": "disponivel" as const,
        "dataCadastro": "2024-01-05"
      }
    ];
  }
  return veiculosMemory;
}

// Função para obter todos os veículos
export async function getVeiculos(): Promise<Veiculo[]> {
  try {
    // Tentar usar Vercel KV primeiro
    const { kv } = await import('@vercel/kv');
    const veiculos = await kv.get('veiculos');
    if (veiculos) {
      return veiculos as Veiculo[];
    }
  } catch (error) {
    console.log('Vercel KV não disponível, usando memória local');
  }
  
  // Fallback para memória local
  return initializeMemoryData();
}

// Função para obter um veículo por ID
export async function getVeiculoById(id: string): Promise<Veiculo | undefined> {
  try {
    const veiculos = await getVeiculos();
    return veiculos.find(veiculo => veiculo.id === id);
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    return undefined;
  }
}

// Função para criar um novo veículo
export async function createVeiculo(veiculo: Omit<Veiculo, 'id' | 'dataCadastro'>): Promise<Veiculo> {
  try {
    // Tentar usar Vercel KV primeiro
    const { kv } = await import('@vercel/kv');
    const veiculos = await kv.get('veiculos') as Veiculo[] || [];
    
    const id = `${veiculo.marca.toLowerCase()}-${veiculo.modelo.toLowerCase()}-${
      veiculo.ano
    }-${Date.now()}`;
    
    const novoVeiculo: Veiculo = {
      ...veiculo,
      id,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    
    veiculos.push(novoVeiculo);
    await kv.set('veiculos', veiculos);
    
    return novoVeiculo;
  } catch (error) {
    console.log('Vercel KV não disponível, usando memória local');
    
    // Fallback para memória local
    const veiculos = initializeMemoryData();
    
    const id = `${veiculo.marca.toLowerCase()}-${veiculo.modelo.toLowerCase()}-${
      veiculo.ano
    }-${Date.now()}`;
    
    const novoVeiculo: Veiculo = {
      ...veiculo,
      id,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    
    veiculos.push(novoVeiculo);
    veiculosMemory = veiculos;
    
    return novoVeiculo;
  }
}

// Função para atualizar um veículo
export async function updateVeiculo(id: string, veiculoData: Partial<Veiculo>): Promise<Veiculo | null> {
  try {
    // Tentar usar Vercel KV primeiro
    const { kv } = await import('@vercel/kv');
    const veiculos = await kv.get('veiculos') as Veiculo[] || [];
    const index = veiculos.findIndex(v => v.id === id);
    
    if (index === -1) {
      return null;
    }
    
    veiculos[index] = { ...veiculos[index], ...veiculoData };
    await kv.set('veiculos', veiculos);
    
    return veiculos[index];
  } catch (error) {
    console.log('Vercel KV não disponível, usando memória local');
    
    // Fallback para memória local
    const veiculos = initializeMemoryData();
    const index = veiculos.findIndex(v => v.id === id);
    
    if (index === -1) {
      return null;
    }
    
    veiculos[index] = { ...veiculos[index], ...veiculoData };
    veiculosMemory = veiculos;
    
    return veiculos[index];
  }
}

// Função para deletar um veículo
export async function deleteVeiculo(id: string): Promise<boolean> {
  try {
    // Tentar usar Vercel KV primeiro
    const { kv } = await import('@vercel/kv');
    const veiculos = await kv.get('veiculos') as Veiculo[] || [];
    const veiculosAtualizados = veiculos.filter(v => v.id !== id);
    
    if (veiculosAtualizados.length === veiculos.length) {
      return false;
    }
    
    await kv.set('veiculos', veiculosAtualizados);
    return true;
  } catch (error) {
    console.log('Vercel KV não disponível, usando memória local');
    
    // Fallback para memória local
    const veiculos = initializeMemoryData();
    const veiculosAtualizados = veiculos.filter(v => v.id !== id);
    
    if (veiculosAtualizados.length === veiculos.length) {
      return false;
    }
    
    veiculosMemory = veiculosAtualizados;
    return true;
  }
}
