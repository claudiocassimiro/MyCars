import {
  getVeiculos,
  getVeiculoById,
  getVeiculosDisponiveis,
  getVeiculosEmDestaque,
} from "@/lib/data";
import veiculos from "@/data/veiculos.json";

// Mock the JSON import
jest.mock("@/data/veiculos.json", () => [
  {
    id: "test-1",
    marca: "Honda",
    modelo: "Civic",
    ano: 2020,
    preco: 85000,
    quilometragem: 45000,
    cor: "Azul Metálico",
    combustivel: "Flex",
    cambio: "Automático",
    portas: 4,
    fotos: ["https://example.com/civic.jpg"],
    descricao: "Honda Civic 2020 em excelente estado.",
    detalhes: "Ar condicionado, direção hidráulica.",
    chaveReserva: true,
    tabelaFipe: 82000,
    tipo: "seminovo",
    contato: {
      telefone: "(81) 99999-9999",
      whatsapp: "https://wa.me/5581999999999",
    },
    caracteristicas: {
      motor: "1.6 16V",
      potencia: "126 cv",
      consumo: "14 km/l",
      opcionais: "Ar condicionado",
    },
    status: "disponivel",
    dataCadastro: "2024-01-15",
  },
  {
    id: "test-2",
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2019,
    preco: 92000,
    quilometragem: 38000,
    cor: "Prata Metálico",
    combustivel: "Flex",
    cambio: "Automático",
    portas: 4,
    fotos: ["https://example.com/corolla.jpg"],
    descricao: "Toyota Corolla 2019 seminovo.",
    detalhes: "Ar condicionado digital.",
    chaveReserva: true,
    tabelaFipe: 95000,
    tipo: "seminovo",
    contato: {
      telefone: "(81) 88888-8888",
      whatsapp: "https://wa.me/5581888888888",
    },
    caracteristicas: {
      motor: "2.0 16V",
      potencia: "152 cv",
      consumo: "12 km/l",
      opcionais: "Ar condicionado digital",
    },
    status: "vendido",
    dataCadastro: "2024-01-10",
  },
  {
    id: "test-3",
    marca: "Hyundai",
    modelo: "HB20",
    ano: 2021,
    preco: 65000,
    quilometragem: 25000,
    cor: "Branco",
    combustivel: "Flex",
    cambio: "Manual",
    portas: 4,
    fotos: ["https://example.com/hb20.jpg"],
    descricao: "Hyundai HB20 2021 seminovo.",
    detalhes: "Ar condicionado, direção elétrica.",
    chaveReserva: false,
    tabelaFipe: 68000,
    tipo: "seminovo",
    contato: {
      telefone: "(81) 77777-7777",
      whatsapp: "https://wa.me/5581777777777",
    },
    caracteristicas: {
      motor: "1.0 12V",
      potencia: "75 cv",
      consumo: "16 km/l",
      opcionais: "Ar condicionado, direção elétrica",
    },
    status: "disponivel",
    dataCadastro: "2024-01-05",
  },
]);

describe("Data Utils", () => {
  describe("getVeiculos", () => {
    it("should return all vehicles", () => {
      const result = getVeiculos();
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe("test-1");
      expect(result[1].id).toBe("test-2");
      expect(result[2].id).toBe("test-3");
    });
  });

  describe("getVeiculoById", () => {
    it("should return vehicle by id", () => {
      const result = getVeiculoById("test-1");
      expect(result).toBeDefined();
      expect(result?.id).toBe("test-1");
      expect(result?.marca).toBe("Honda");
      expect(result?.modelo).toBe("Civic");
    });

    it("should return null for non-existent id", () => {
      const result = getVeiculoById("non-existent");
      expect(result).toBeUndefined();
    });

    it("should return null for empty id", () => {
      const result = getVeiculoById("");
      expect(result).toBeUndefined();
    });
  });

  describe("getVeiculosDisponiveis", () => {
    it("should return only available vehicles", () => {
      const result = getVeiculosDisponiveis();
      expect(result).toHaveLength(2);
      expect(result.every((v) => v.status === "disponivel")).toBe(true);
    });

    it("should not return sold vehicles", () => {
      const result = getVeiculosDisponiveis();
      expect(result.find((v) => v.status === "vendido")).toBeUndefined();
    });

    it("should not return reserved vehicles", () => {
      const result = getVeiculosDisponiveis();
      expect(result.find((v) => v.status === "reservado")).toBeUndefined();
    });
  });

  describe("getVeiculosEmDestaque", () => {
    it("should return featured vehicles", () => {
      const result = getVeiculosEmDestaque();
      expect(result).toHaveLength(2);
      expect(result.every((v) => v.status === "disponivel")).toBe(true);
    });

    it("should return vehicles sorted by price descending", () => {
      const result = getVeiculosEmDestaque();
      expect(result[0].preco).toBeGreaterThanOrEqual(result[1].preco);
    });

    it("should return only available vehicles", () => {
      const result = getVeiculosEmDestaque();
      expect(result.every((v) => v.status === "disponivel")).toBe(true);
    });
  });

  describe("Vehicle data structure", () => {
    it("should have all required fields", () => {
      const vehicle = getVeiculoById("test-1");
      expect(vehicle).toHaveProperty("id");
      expect(vehicle).toHaveProperty("marca");
      expect(vehicle).toHaveProperty("modelo");
      expect(vehicle).toHaveProperty("ano");
      expect(vehicle).toHaveProperty("preco");
      expect(vehicle).toHaveProperty("quilometragem");
      expect(vehicle).toHaveProperty("cor");
      expect(vehicle).toHaveProperty("combustivel");
      expect(vehicle).toHaveProperty("cambio");
      expect(vehicle).toHaveProperty("portas");
      expect(vehicle).toHaveProperty("fotos");
      expect(vehicle).toHaveProperty("descricao");
      expect(vehicle).toHaveProperty("detalhes");
      expect(vehicle).toHaveProperty("chaveReserva");
      expect(vehicle).toHaveProperty("tabelaFipe");
      expect(vehicle).toHaveProperty("tipo");
      expect(vehicle).toHaveProperty("contato");
      expect(vehicle).toHaveProperty("caracteristicas");
      expect(vehicle).toHaveProperty("status");
      expect(vehicle).toHaveProperty("dataCadastro");
    });

    it("should have correct contact structure", () => {
      const vehicle = getVeiculoById("test-1");
      expect(vehicle?.contato).toHaveProperty("telefone");
      expect(vehicle?.contato).toHaveProperty("whatsapp");
    });

    it("should have correct characteristics structure", () => {
      const vehicle = getVeiculoById("test-1");
      expect(vehicle?.caracteristicas).toHaveProperty("motor");
      expect(vehicle?.caracteristicas).toHaveProperty("potencia");
      expect(vehicle?.caracteristicas).toHaveProperty("consumo");
      expect(vehicle?.caracteristicas).toHaveProperty("opcionais");
    });

    it("should have valid status values", () => {
      const vehicles = getVeiculos();
      const validStatuses = ["disponivel", "vendido", "reservado"];
      vehicles.forEach((vehicle) => {
        expect(validStatuses).toContain(vehicle.status);
      });
    });

    it("should have valid type values", () => {
      const vehicles = getVeiculos();
      const validTypes = ["novo", "seminovo"];
      vehicles.forEach((vehicle) => {
        expect(validTypes).toContain(vehicle.tipo);
      });
    });

    it("should have valid fuel types", () => {
      const vehicles = getVeiculos();
      const validFuels = ["Flex", "Gasolina", "Etanol", "Diesel"];
      vehicles.forEach((vehicle) => {
        expect(validFuels).toContain(vehicle.combustivel);
      });
    });

    it("should have valid transmission types", () => {
      const vehicles = getVeiculos();
      const validTransmissions = ["Manual", "Automático", "CVT"];
      vehicles.forEach((vehicle) => {
        expect(validTransmissions).toContain(vehicle.cambio);
      });
    });
  });
});
