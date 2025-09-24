import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { getVeiculosDisponiveis, getVeiculosEmDestaque } from "@/lib/data";

jest.mock("@/lib/data", () => ({
  getVeiculosDisponiveis: jest.fn(),
  getVeiculosEmDestaque: jest.fn(),
}));

const mockVeiculos = [
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
    tipo: "seminovo" as const,
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
    status: "disponivel" as const,
    dataCadastro: "2024-01-15",
  },
];

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getVeiculosDisponiveis as jest.Mock).mockReturnValue(mockVeiculos);
    (getVeiculosEmDestaque as jest.Mock).mockReturnValue(mockVeiculos);
  });

  it("should render hero section", () => {
    render(<HomePage />);

    expect(
      screen.getByText("Veículos Novos e Seminovos de Qualidade")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Encontre o carro ideal com garantia, documentação em dia e financiamento sem entrada"
      )
    ).toBeInTheDocument();
  });

  it("should render CTA buttons", () => {
    render(<HomePage />);

    expect(screen.getByText("Ver Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Entre em Contato")).toBeInTheDocument();
  });

  it("should render vehicle cards", () => {
    render(<HomePage />);

    expect(screen.getByText("Honda Civic")).toBeInTheDocument();
    expect(screen.getByText("R$ 85.000,00")).toBeInTheDocument();
  });
});
