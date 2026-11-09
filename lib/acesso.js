// Senha e sessões do painel da GlassMaster.
// - A senha nunca fica no código. Na primeira vez vale a senha guardada como segredo
//   ADMIN_SENHA no Cloudflare; depois de "Trocar senha", o banco guarda só o hash (PBKDF2).
// - A sessão é um código aleatório de 256 bits num cookie __Host- HttpOnly/Secure/SameSite=Strict
//   que vale 7 dias; o banco guarda só o hash (quem ler o banco não consegue entrar).
// - 5 senhas erradas bloqueiam aquele IP por 15 minutos; 30 erradas no total em 1 hora
//   (ataque de vários IPs) bloqueiam o login de todos por 15 minutos.
// - Todo acesso (certo ou errado) fica registrado por 90 dias para o dono conferir.
import { ErroPainel } from "./banco.js";

const COOKIE = "__Host-gm_sessao";
const SETE_DIAS = 7 * 24 * 3600;
const ITERACOES = 100000;
const enc = new TextEncoder();

const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const deB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");

async function sha256(texto) {
  return hex(await crypto.subtle.digest("SHA-256", enc.encode(texto)));
}

async function pbkdf2(senha, sal, iter = ITERACOES) {
  const chave = await crypto.subtle.importKey("raw", enc.encode(senha), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: sal, iterations: iter }, chave, 256);
}

function iguais(a, b) {
  const x = enc.encode(a), y = enc.encode(b);
  let dif = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) dif |= (x[i] || 0) ^ (y[i] || 0);
  return dif === 0;
}

export async function gerarHash(senha) {
  const sal = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${ITERACOES}$${b64(sal)}$${b64(await pbkdf2(senha, sal))}`;
}

async function conferirHash(senha, guardado) {
  const [tipo, iter, sal, hash] = guardado.split("$");
  if (tipo !== "pbkdf2") return false;
  return iguais(b64(await pbkdf2(senha, deB64(sal), Number(iter))), hash);
}

export async function senhaCorreta(env, senha) {
  const linha = await env.DB.prepare("SELECT valor FROM config WHERE chave = 'senha_hash'").first();
  if (linha) return conferirHash(senha, linha.valor);
  const inicial = env.ADMIN_SENHA || "";
  if (inicial.length < 12) throw new ErroPainel(500, "Senha do painel não configurada. Crie o segredo ADMIN_SENHA (mínimo 12 caracteres) no Cloudflare.", "Panel password not set. Create the ADMIN_SENHA secret (12+ characters) in Cloudflare.");
  return iguais(senha, inicial);
}

export function ipDe(request) {
  return request.headers.get("cf-connecting-ip") || "local";
}

export async function bloqueado(env, ip) {
  const agora = Math.floor(Date.now() / 1000);
  const [porIp, total] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS n FROM tentativas_login WHERE ip = ? AND quando > ?").bind(ip, agora - 15 * 60).first(),
    env.DB.prepare("SELECT COUNT(*) AS n FROM tentativas_login WHERE quando > ?").bind(agora - 3600).first()
  ]);
  if (porIp.n >= 5) return true;
  // Muitos erros de IPs diferentes: trava só se a última tentativa errada foi há menos de 15 min
  if (total.n >= 30) {
    const ult = await env.DB.prepare("SELECT MAX(quando) AS q FROM tentativas_login").first();
    return ult.q > agora - 15 * 60;
  }
  return false;
}

export async function registrarAcesso(env, request, ok) {
  const agora = Math.floor(Date.now() / 1000);
  const ua = (request.headers.get("user-agent") || "").slice(0, 160);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO acessos (quando, ip, pais, aparelho, ok) VALUES (?, ?, ?, ?, ?)")
      .bind(agora, ipDe(request), (request.cf && request.cf.country) || "", ua, ok ? 1 : 0),
    env.DB.prepare("DELETE FROM acessos WHERE quando < ?").bind(agora - 90 * 24 * 3600)
  ]);
}

export async function ultimosAcessos(env) {
  const r = await env.DB.prepare("SELECT quando, ip, pais, aparelho, ok FROM acessos ORDER BY quando DESC LIMIT 30").all();
  const s = await env.DB.prepare("SELECT COUNT(*) AS n FROM sessoes WHERE expira > ?").bind(Math.floor(Date.now() / 1000)).first();
  return { acessos: r.results, sessoes_abertas: s.n };
}

export async function registrarErro(env, ip) {
  const agora = Math.floor(Date.now() / 1000);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO tentativas_login (ip, quando) VALUES (?, ?)").bind(ip, agora),
    env.DB.prepare("DELETE FROM tentativas_login WHERE quando < ?").bind(agora - 24 * 3600)
  ]);
}

export async function limparErros(env, ip) {
  await env.DB.prepare("DELETE FROM tentativas_login WHERE ip = ?").bind(ip).run();
}

export async function criarSessao(env) {
  const token = b64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g, c => ({ "+": "-", "/": "_", "=": "" }[c]));
  const agora = Math.floor(Date.now() / 1000);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO sessoes (token_hash, expira, criada) VALUES (?, ?, ?)").bind(await sha256(token), agora + SETE_DIAS, agora),
    env.DB.prepare("DELETE FROM sessoes WHERE expira < ?").bind(agora)
  ]);
  return `${COOKIE}=${token}; Path=/; Max-Age=${SETE_DIAS}; HttpOnly; Secure; SameSite=Strict`;
}

function tokenDo(request) {
  const m = (request.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([A-Za-z0-9_-]{20,100})`));
  return m ? m[1] : null;
}

export async function sessaoValida(env, request) {
  const token = tokenDo(request);
  if (!token) return false;
  const r = await env.DB.prepare("SELECT expira FROM sessoes WHERE token_hash = ?").bind(await sha256(token)).first();
  return !!r && r.expira > Math.floor(Date.now() / 1000);
}

export async function encerrarSessao(env, request) {
  const token = tokenDo(request);
  if (token) await env.DB.prepare("DELETE FROM sessoes WHERE token_hash = ?").bind(await sha256(token)).run();
  return `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

export async function encerrarTodas(env) {
  await env.DB.prepare("DELETE FROM sessoes").run();
}
