import { getTranslations } from "next-intl/server"
import CatalogoClientPage from "./CatalogoClientPage"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params?.locale || "pt"
  const t = await getTranslations({ locale, namespace: "seo" })

  return {
    title: t("catalogTitle"),
    description: t("catalogDescription"),
    keywords: "catálogo acompanhantes, Porto de Galinhas, filtrar acompanhantes, buscar acompanhantes PE",
    openGraph: {
      title: t("catalogTitle"),
      description: t("catalogDescription"),
    },
    alternates: {
      canonical: "/catalogo",
    },
  }
}

export default function CatalogoPage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || "pt"
  return <CatalogoClientPage locale={locale} />
}
