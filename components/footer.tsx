"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">MyGirls</h3>
            <p className="text-gray-300 leading-relaxed">
              Acompanhantes elegantes e sofisticadas para eventos, jantares e
              ocasiões especiais em Porto de Galinhas. Discrição e qualidade
              garantidas.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">
              Localização
            </h4>
            <p className="text-gray-300">
              Porto de Galinhas
              <br />
              Pernambuco - PE
              <br />
              Brasil
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 MyGirls. Todos os direitos reservados. Serviços de
            acompanhamento para eventos sociais.
          </p>
        </div>
      </div>
    </footer>
  );
}
