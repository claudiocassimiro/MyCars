import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/header";

describe("Header", () => {
  it("should render logo and navigation links", () => {
    render(<Header />);

    expect(screen.getByText("AutoVenda")).toBeInTheDocument();
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Contato")).toBeInTheDocument();
  });

  it("should render mobile menu button", () => {
    render(<Header />);

    expect(screen.getByLabelText("Abrir menu")).toBeInTheDocument();
  });

  it("should toggle mobile menu when button is clicked", () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("Abrir menu");
    fireEvent.click(menuButton);

    // Verificar se o menu mobile está sendo renderizado
    expect(screen.getByLabelText("Fechar menu")).toBeInTheDocument();
  });
});
