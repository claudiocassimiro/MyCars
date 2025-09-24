import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Footer } from "@/components/footer";

global.fetch = jest.fn();

describe("Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render footer content", () => {
    render(<Footer />);

    expect(screen.getByText("AutoVenda")).toBeInTheDocument();
    expect(screen.getByText("Navegação")).toBeInTheDocument();
    expect(screen.getByText("Serviços")).toBeInTheDocument();
    expect(screen.getByText("Localização")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Contato")).toBeInTheDocument();
  });

  it("should render admin button", () => {
    render(<Footer />);

    expect(screen.getByText("Área Admin")).toBeInTheDocument();
  });

  it("should open admin login modal when admin button is clicked", () => {
    render(<Footer />);

    const adminButton = screen.getByText("Área Admin");
    fireEvent.click(adminButton);

    expect(screen.getByText("Acesso Administrativo")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha de Administrador")).toBeInTheDocument();
  });

  it("should close admin login modal when close button is clicked", () => {
    render(<Footer />);

    const adminButton = screen.getByText("Área Admin");
    fireEvent.click(adminButton);

    const closeButton = screen.getByRole("button", { name: "" });
    fireEvent.click(closeButton);

    expect(screen.queryByText("Acesso Administrativo")).not.toBeInTheDocument();
  });
});
