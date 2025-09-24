export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://autovenda.com.br";

  const robots = `User-agent: *
Allow: /
Allow: /catalogo
Allow: /veiculo/*
Allow: /contato
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
