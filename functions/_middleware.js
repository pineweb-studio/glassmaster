// Não deixa baixar o código do servidor pelo site (pastas lib/, functions/ e lembretes/).
// O _routes.json manda só /api/* e essas pastas para cá; o resto do site continua estático e grátis.
const ESCONDIDO = /^\/(?:(?:lib|functions|lembretes)(?:\/|$)|_routes\.json$)/i;

export async function onRequest({ request, next }) {
  const { pathname } = new URL(request.url);
  if (ESCONDIDO.test(pathname)) return new Response("Not found", { status: 404, headers: { "content-type": "text/plain", "cache-control": "no-store" } });
  return next();
}
