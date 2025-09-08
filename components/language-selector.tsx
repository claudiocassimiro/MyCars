"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"

const locales = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const handleLocaleChange = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/"

    // Navigate to new locale
    const newPath = newLocale === "pt" ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
    setIsOpen(false)
  }

  const currentLocaleData = locales.find((locale) => locale.code === currentLocale) || locales[0]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-2" aria-label="Selecionar idioma">
          <Globe size={16} />
          <span className="hidden sm:inline">{currentLocaleData.name}</span>
          <span className="sm:hidden">{currentLocaleData.flag}</span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLocale === locale.code ? "bg-red-50 text-red-700" : ""
            }`}
          >
            <span>{locale.flag}</span>
            <span>{locale.name}</span>
            {currentLocale === locale.code && <span className="ml-auto text-red-600">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
