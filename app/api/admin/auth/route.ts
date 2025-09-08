import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })

      // Set secure cookie for admin session
      response.cookies.set("admin-session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return response
    }

    return NextResponse.json({ success: false, error: "Senha incorreta" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno" }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin-session")
  return response
}

export async function GET() {
  const cookieStore = cookies()
  const session = cookieStore.get("admin-session")

  return NextResponse.json({
    authenticated: session?.value === "authenticated",
  })
}
