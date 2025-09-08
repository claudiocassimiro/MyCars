import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["pt", "en", "es"],

  // Used when no locale matches
  defaultLocale: "pt",

  // Automatically detect the user's locale based on their browser settings
  localeDetection: true,

  localePrefix: "as-needed",

  pathnames: {
    "/": "/",
    "/catalogo": {
      en: "/catalog",
      es: "/catalogo",
      pt: "/catalogo",
    },
    "/contato": {
      en: "/contact",
      es: "/contacto",
      pt: "/contato",
    },
    "/acompanhante/[id]": {
      en: "/escort/[id]",
      es: "/escort/[id]",
      pt: "/acompanhante/[id]",
    },
  },
})

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(pt|en|es)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
}
