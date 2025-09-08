import CatalogoClientPage from "./CatalogoClientPage";

export const metadata = {
  title: "Catálogo de Acompanhantes - MyGirls",
  description:
    "Explore nosso catálogo completo de acompanhantes elegantes e sofisticadas em Porto de Galinhas. Filtros por idade, características e disponibilidade.",
  keywords:
    "catálogo acompanhantes, Porto de Galinhas, filtrar acompanhantes, buscar acompanhantes PE",
  openGraph: {
    title: "Catálogo de Acompanhantes - MyGirls",
    description:
      "Explore nosso catálogo completo de acompanhantes elegantes e sofisticadas em Porto de Galinhas. Filtros por idade, características e disponibilidade.",
  },
  alternates: {
    canonical: "/catalogo",
  },
};

export default function CatalogoPage() {
  return <CatalogoClientPage />;
}
