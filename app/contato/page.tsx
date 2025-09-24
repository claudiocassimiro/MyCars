import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a encontrar o veículo ideal
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700">
                  <MapPin className="w-6 h-6" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Nossa concessionária está localizada em Recife, PE, com fácil
                  acesso e estacionamento próprio. Atendemos toda a região
                  metropolitana e oferecemos entrega em domicílio.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700">
                  <Clock className="w-6 h-6" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Segunda a Sexta:</span> 8h
                    às 18h
                  </p>
                  <p>
                    <span className="font-semibold">Sábado:</span> 8h às 12h
                  </p>
                  <p>
                    <span className="font-semibold">Domingo:</span> Fechado
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700">
                  <Phone className="w-6 h-6" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Para informações sobre veículos e financiamento:
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  (81) 9 9999-0000
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700">
                  <Mail className="w-6 h-6" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Para consultas e informações:
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  contato@autovenda.com.br
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="shadow-luxury">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Informações Importantes
                </h3>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>
                    A AutoVenda é uma concessionária especializada em veículos
                    seminovos com garantia e documentação em dia. Oferecemos
                    financiamento facilitado e transferência de veículo sem
                    complicações.
                  </p>
                  <p>
                    Todos os nossos veículos passam por rigorosa inspeção
                    técnica e vêm com garantia. Garantimos transparência e
                    confiabilidade em todas as negociações.
                  </p>
                  <p>
                    Aceitamos pagamentos à vista, financiamento próprio e
                    consórcio. Entre em contato conosco para mais informações
                    sobre condições especiais e promoções.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
