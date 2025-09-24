"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, X } from "lucide-react";

export function Footer() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = "/admin";
      } else {
        setError(data.error || "Senha incorreta");
      }
    } catch (error) {
      setError("Erro de conexão");
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">AutoVenda</h3>
            <p className="text-gray-300 leading-relaxed">
              Veículos seminovos de qualidade com garantia e documentação em
              dia. Encontre o carro ideal para você com os melhores preços do
              mercado.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Serviços
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>Venda de Veículos</li>
              <li>Financiamento</li>
              <li>Transferência de Veículo</li>
              <li>Garantia Estendida</li>
            </ul>
            <div className="mt-4">
              <Button
                onClick={() => setShowAdminLogin(true)}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-800"
              >
                <Lock className="w-4 h-4 mr-2" />
                Área Admin
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Localização
            </h4>
            <p className="text-gray-300">
              Recife
              <br />
              Pernambuco - PE
              <br />
              Brasil
            </p>
            <div className="mt-4">
              <p className="text-gray-300 text-sm">
                <strong>Horário de Funcionamento:</strong>
                <br />
                Segunda a Sexta: 8h às 18h
                <br />
                Sábado: 8h às 12h
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 AutoVenda. Todos os direitos reservados. Venda de veículos
            seminovos.
          </p>
        </div>
      </div>

      {/* Modal de Login Admin */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Acesso Administrativo
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setPassword("");
                    setError("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <Label htmlFor="admin-password">Senha de Administrador</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha de administrador"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </footer>
  );
}
