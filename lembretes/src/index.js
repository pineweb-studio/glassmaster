// Lembrete diário por e-mail: avisa o Greg quais clientes estão chegando no prazo da limpeza
// (lembrete de 2 a 3 meses ligado no cadastro e nenhuma limpeza futura marcada).
// Cada cliente é avisado uma vez por ciclo: depois do aviso, só volta a avisar no próximo vencimento.
import { EmailMessage } from "cloudflare:email";
import { prepararBanco } from "../../lib/banco.js";
import { lembretesDevidos } from "../../lib/dados.js";

const b64utf8 = s => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
};
const cabecalhoUTF8 = s => `=?UTF-8?B?${b64utf8(s)}?=`;
const quebrar76 = s => s.replace(/.{1,76}/g, "$&\r\n");
const limpar = s => String(s || "").replace(/[\r\n]+/g, " ").slice(0, 200);

function dataEN(iso) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(new Date(iso + "T12:00:00Z"));
}
function fone(t) {
  return /^\d{10}$/.test(t) ? `(${t.slice(0, 3)}) ${t.slice(3, 6)}-${t.slice(6)}` : t;
}

export function montarTexto(novos, hoje, painel) {
  const linhas = novos.map(c => {
    const atraso = c.vence <= hoje ? "OVERDUE / VENCIDO" : `due / vence ${dataEN(c.vence)}`;
    return [
      `• ${limpar(c.nome)}${c.empresa ? " – " + limpar(c.empresa) : ""}`,
      `  Last cleaning / Última limpeza: ${dataEN(c.ultima)} (every ${c.lembrete_meses} months / a cada ${c.lembrete_meses} meses)`,
      `  ${atraso}`,
      c.telefone ? `  Phone / Telefone: ${fone(c.telefone)}` : null,
      `  Address / Endereço: ${limpar(c.endereco)}`
    ].filter(Boolean).join("\r\n");
  });
  return [
    `Hi Greg! These clients are coming due for their next cleaning:`,
    `Oi Greg! Estes clientes estão chegando no prazo da próxima limpeza:`,
    ``,
    linhas.join("\r\n\r\n"),
    ``,
    `Open the dashboard to schedule / Abra o painel para agendar:`,
    painel,
    ``,
    `— GlassMaster dashboard (automatic e-mail / e-mail automático)`
  ].join("\r\n");
}

async function enviar(env, assunto, texto) {
  const de = env.AVISO_DE, para = env.AVISO_PARA;
  const id = `<${crypto.randomUUID()}@${de.split("@")[1]}>`;
  const mime = [
    `From: GlassMaster Dashboard <${de}>`,
    `To: ${para}`,
    `Subject: ${cabecalhoUTF8(assunto)}`,
    `Message-ID: ${id}`,
    `Date: ${new Date().toUTCString()}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    quebrar76(b64utf8(texto))
  ].join("\r\n");
  await env.EMAIL.send(new EmailMessage(de, para, mime));
}

export async function rodar(env) {
  await prepararBanco(env);
  const { hoje, devidos } = await lembretesDevidos(env, 7);
  const novos = devidos.filter(c => c.lembrete_avisado !== c.vence);
  if (!novos.length) return { enviados: 0 };
  const n = novos.length;
  await enviar(env, `🔔 GlassMaster: ${n} client${n > 1 ? "s" : ""} due for cleaning / ${n} cliente${n > 1 ? "s" : ""} para limpar`, montarTexto(novos, hoje, env.PAINEL));
  await env.DB.batch(novos.map(c => env.DB.prepare("UPDATE clientes SET lembrete_avisado = ? WHERE id = ?").bind(c.vence, c.id)));
  return { enviados: n };
}

export default {
  async scheduled(_evento, env, ctx) {
    ctx.waitUntil(rodar(env).then(r => console.log("lembretes", r.enviados)));
  }
};
