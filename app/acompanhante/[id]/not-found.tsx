import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto shadow-luxury">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Acompanhante não encontrada</h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              A acompanhante que você está procurando não foi encontrada ou pode ter sido removida do nosso catálogo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/catalogo" className="flex items-center gap-2">
                  <Search size={20} />
                  Ver Catálogo Completo
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft size={20} />
                  Voltar ao Início
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
