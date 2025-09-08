import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Estamos aqui para atender suas necessidades com discrição e profissionalismo
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-700">
                  <MapPin className="w-6 h-6" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Atendemos em toda região de Porto de Galinhas, incluindo hotéis, resorts, restaurantes e eventos
                  privados. Nossos serviços cobrem toda a área metropolitana e praias adjacentes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-700">
                  <Clock className="w-6 h-6" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Segunda a Domingo:</span> 24 horas
                  </p>
                  <p>
                    <span className="font-semibold">Agendamentos:</span> Com antecedência mínima de 2 horas
                  </p>
                  <p>
                    <span className="font-semibold">Eventos especiais:</span> Agendamento com 24h de antecedência
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-700">
                  <Phone className="w-6 h-6" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">Para agendamentos e informações gerais:</p>
                <p className="text-lg font-semibold text-gray-900">(81) 9 9999-0000</p>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-700">
                  <Mail className="w-6 h-6" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">Para consultas e informações:</p>
                <p className="text-lg font-semibold text-gray-900">contato@mygirls.com.br</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="shadow-luxury">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Informações Importantes</h3>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>
                    A MyGirls é uma agência especializada em acompanhamento para eventos sociais, jantares, viagens de
                    negócios e ocasiões especiais em Porto de Galinhas e região.
                  </p>
                  <p>
                    Todos os nossos serviços são prestados com total discrição e profissionalismo. Garantimos
                    privacidade e confidencialidade em todos os atendimentos.
                  </p>
                  <p>
                    Para agendamentos, entre em contato conosco com antecedência. Aceitamos pagamentos em dinheiro, PIX
                    e cartões de crédito/débito.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
