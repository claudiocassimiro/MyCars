import { render, screen } from "@testing-library/react";
import { VeiculoCard } from "@/components/veiculo-card";
import type { Veiculo } from "@/lib/data";

const mockVeiculo: Veiculo = {
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
  fotos: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
  ],
  descricao: "Honda Civic 2020 em excelente estado de conservação.",
  detalhes: "Ar condicionado, direção hidráulica, airbag duplo.",
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
    consumo: "14 km/l (etanol) / 16 km/l (gasolina)",
    opcionais: "Ar condicionado, direção hidráulica, airbag, ABS",
  },
  status: "disponivel",
  dataCadastro: "2024-01-15",
};

describe("VeiculoCard", () => {
  it("should render vehicle information correctly", () => {
    render(<VeiculoCard veiculo={mockVeiculo} />);

    expect(screen.getByText("Honda Civic")).toBeInTheDocument();
    expect(screen.getByText("R$ 85.000,00")).toBeInTheDocument();
    expect(screen.getByText("45.000 km")).toBeInTheDocument();
  });

  it("should render contact buttons", () => {
    render(<VeiculoCard veiculo={mockVeiculo} />);

    expect(screen.getByText("Ver Detalhes Completos")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Ligar")).toBeInTheDocument();
  });

  it("should have correct WhatsApp link", () => {
    render(<VeiculoCard veiculo={mockVeiculo} />);

    const whatsappButton = screen.getByText("WhatsApp").closest("a");
    expect(whatsappButton).toHaveAttribute(
      "href",
      mockVeiculo.contato.whatsapp
    );
  });

  it("should have correct phone link", () => {
    render(<VeiculoCard veiculo={mockVeiculo} />);

    const phoneButton = screen.getByText("Ligar").closest("a");
    expect(phoneButton).toHaveAttribute(
      "href",
      `tel:${mockVeiculo.contato.telefone}`
    );
  });

  it("should have correct details link", () => {
    render(<VeiculoCard veiculo={mockVeiculo} />);

    const detailsButton = screen
      .getByText("Ver Detalhes Completos")
      .closest("a");
    expect(detailsButton).toHaveAttribute("href", `/veiculo/${mockVeiculo.id}`);
  });

  it("should render vehicle image", () => {
    render(<VeiculoCard veiculo={mockVeiculo} />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockVeiculo.fotos[0]);
    expect(image).toHaveAttribute("alt", "Honda Civic 2020");
  });
});
