// Servidor do painel da GlassMaster (Cloudflare Pages Functions).
// Tudo fica em /api/admin/... e, menos o login, exige sessão válida.
import { prepararBanco, json, ErroPainel } from "../../lib/banco.js";
import * as acesso from "../../lib/acesso.js";
import * as dados from "../../lib/dados.js";

const ROTAS = {
  "GET sessao": async () => ({ ok: true }),
  "GET agenda": (env, url) => dados.agenda(env, url),
  "POST agenda/salvar": (env, _u, c) => dados.salvarAgendamento(env, c),
  "POST agenda/status": (env, _u, c) => dados.statusAgendamento(env, c),
  "POST agenda/remover": (env, _u, c) => dados.removerAgendamento(env, c),
  "GET clientes": (env, url) => dados.listaClientes(env, url),
  "GET clientes/um": (env, url) => dados.umCliente(env, url),
  "POST clientes/salvar": (env, _u, c) => dados.salvarCliente(env, c),
  "POST clientes/lembrete": (env, _u, c) => dados.lembreteCliente(env, c),
  "POST clientes/remover": (env, _u, c) => dados.removerCliente(env, c),
  "GET lembretes": env => dados.lembretes(env),
  "GET exportar": env => dados.exportar(env),
  "GET seguranca": env => acesso.ultimosAcessos(env),
  "POST sair-todos": async env => { await acesso.encerrarTodas(env); return { ok: true }; },
  "POST trocar-senha": async (env, _u, c) => {
    const atual = String(c.atual || "").slice(0, 200), nova = String(c.nova || "");
    if (!(await acesso.senhaCorreta(env, atual))) throw new ErroPainel(400, "A senha atual está errada.", "Current password is wrong.");
    if (nova.length < 12 || nova.length > 200) throw new ErroPainel(400, "A senha nova precisa ter pelo menos 12 caracteres.", "The new password needs at least 12 characters.");
    if (/^(.)\1+$/.test(nova) || /^(?:0123456789|1234567890|password|senha|glassmaster)/i.test(nova)) throw new ErroPainel(400, "Senha fácil demais. Use uma frase ou misture palavras e números.", "Password too easy. Use a phrase or mix words and numbers.");
    await env.DB.prepare("INSERT INTO config (chave, valor) VALUES ('senha_hash', ?) ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor")
      .bind(await acesso.gerarHash(nova)).run();
    await acesso.encerrarTodas(env);
    return { ok: true };
  }
};

async function corpoJSON(request) {
  if (!(request.headers.get("content-type") || "").startsWith("application/json")) throw new ErroPainel(415, "Envie em JSON.", "Send JSON.");
  const t = await request.text();
  if (t.length > 20000) throw new ErroPainel(413, "Pedido grande demais.", "Request too large.");
  try {
    const v = JSON.parse(t || "{}");
    if (!v || typeof v !== "object" || Array.isArray(v)) throw 0;
    return v;
  } catch { throw new ErroPainel(400, "JSON inválido.", "Invalid JSON."); }
}

// Contra CSRF: pedido que muda dados só vale se vier do próprio site
function mesmaOrigem(request, url) {
  const o = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  return !o || o === url.origin;
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const rota = url.pathname.replace(/^\/api\//, "").replace(/\/+$/, "");
  try {
    if (!rota.startsWith("admin/")) throw new ErroPainel(404, "Rota não encontrada.", "Not found.");
    if (request.method !== "GET" && request.method !== "POST") throw new ErroPainel(405, "Método não permitido.", "Method not allowed.");
    if (request.method === "POST" && !mesmaOrigem(request, url)) throw new ErroPainel(403, "Origem não permitida.", "Origin not allowed.");
    await prepararBanco(env);
    const sub = rota.slice(6);

    if (sub === "login" && request.method === "POST") {
      const ip = acesso.ipDe(request);
      if (await acesso.bloqueado(env, ip)) throw new ErroPainel(429, "Muitas tentativas erradas. Espere 15 minutos.", "Too many wrong attempts. Wait 15 minutes.");
      const { senha } = await corpoJSON(request);
      const certa = await acesso.senhaCorreta(env, String(senha || "").slice(0, 200));
      await acesso.registrarAcesso(env, request, certa);
      if (!certa) {
        await acesso.registrarErro(env, ip);
        throw new ErroPainel(401, "Senha errada.", "Wrong password.");
      }
      await acesso.limparErros(env, ip);
      return json({ ok: true }, 200, { "set-cookie": await acesso.criarSessao(env) });
    }

    if (sub === "sair" && request.method === "POST") {
      return json({ ok: true }, 200, { "set-cookie": await acesso.encerrarSessao(env, request) });
    }

    if (!(await acesso.sessaoValida(env, request))) throw new ErroPainel(401, "Entre com a senha.", "Please sign in.");

    const fn = ROTAS[`${request.method} ${sub}`];
    if (!fn) throw new ErroPainel(404, "Rota não encontrada.", "Not found.");
    const corpo = request.method === "POST" ? await corpoJSON(request) : null;
    return json(await fn(env, url, corpo));
  } catch (e) {
    if (e instanceof ErroPainel) return json({ erro: e.message, erro_en: e.en }, e.status);
    console.error("erro interno", e && e.message);
    return json({ erro: "Erro no servidor. Tente de novo.", erro_en: "Server error. Please try again." }, 500);
  }
}
