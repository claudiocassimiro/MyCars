import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">A página que você está procurando não existe ou foi movida.</p>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">Voltar ao Início</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/catalogo">Ver Catálogo</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
