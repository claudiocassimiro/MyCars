"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations("common")

  return (
    <header className="bg-black backdrop-blur-sm border-b border-red-900/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-red-400 transition-colors"
            aria-label="MyGirls - Página inicial"
          >
            MyGirls
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegação principal">
            <Link href="/" className="text-white hover:text-red-400 transition-colors">
              {t("home")}
            </Link>
            <Link href="/catalogo" className="text-white hover:text-red-400 transition-colors">
              {t("catalog")}
            </Link>
            <Link href="/contato" className="text-white hover:text-red-400 transition-colors">
              {t("contact")}
            </Link>
            <LanguageSelector />
          </nav>

          {/* Mobile Menu Button and Language Selector */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t border-red-900/20"
            role="navigation"
            aria-label="Navegação móvel"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href="/catalogo"
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("catalog")}
              </Link>
              <Link
                href="/contato"
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
