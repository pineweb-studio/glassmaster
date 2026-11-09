// Banco Cloudflare D1 (SQLite) do painel da GlassMaster.
// As tabelas são criadas sozinhas na primeira chamada. Datas em AAAA-MM-DD, horas em HH:MM
// (horário da Flórida, America/New_York).

const TABELAS = [
  `CREATE TABLE IF NOT EXISTS config (chave TEXT PRIMARY KEY, valor TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS sessoes (token_hash TEXT PRIMARY KEY, expira INTEGER NOT NULL, criada INTEGER NOT NULL DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS tentativas_login (ip TEXT NOT NULL, quando INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS tentativas_ip ON tentativas_login (ip, quando)`,
  // Registro de acessos (para o dono ver se alguém estranho tentou entrar). Guardado por 90 dias.
  `CREATE TABLE IF NOT EXISTS acessos (quando INTEGER NOT NULL, ip TEXT NOT NULL, pais TEXT NOT NULL DEFAULT '', aparelho TEXT NOT NULL DEFAULT '', ok INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS acessos_quando ON acessos (quando)`,
  `CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    empresa TEXT NOT NULL DEFAULT '',
    telefone TEXT NOT NULL DEFAULT '',
    endereco TEXT NOT NULL,
    notas TEXT NOT NULL DEFAULT '',
    lembrete_meses INTEGER NOT NULL DEFAULT 0,
    lembrete_avisado TEXT NOT NULL DEFAULT '',
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    duracao INTEGER NOT NULL DEFAULT 120,
    servico TEXT NOT NULL DEFAULT '',
    notas TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'marcado',
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS agendamentos_data ON agendamentos (data, hora)`,
  `CREATE INDEX IF NOT EXISTS agendamentos_cliente ON agendamentos (cliente_id, data)`
];

let pronto = null;
export function prepararBanco(env) {
  if (!env.DB) throw new ErroPainel(500, "O banco D1 não está ligado ao projeto (variável DB). Veja o README.", "The D1 database is not bound to the project (DB). See the README.");
  if (!pronto) pronto = env.DB.batch(TABELAS.map(sql => env.DB.prepare(sql))).catch(e => { pronto = null; throw e; });
  return pronto;
}

// Erro com mensagem em português e em inglês (o painel mostra no idioma escolhido)
export class ErroPainel extends Error {
  constructor(status, pt, en) { super(pt); this.status = status; this.en = en || pt; }
}

export function json(dados, status = 200, extra = {}) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow",
      ...extra
    }
  });
}

// "Hoje" no horário da Flórida
export function hojeFL() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export function somarDias(iso, dias) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

// Soma meses sem pular o fim do mês (31/jan + 1 mês = 28 ou 29/fev)
export function somarMeses(iso, meses) {
  const [a, m, d] = iso.split("-").map(Number);
  const alvo = new Date(Date.UTC(a, m - 1 + meses, 1));
  const ultimo = new Date(Date.UTC(alvo.getUTCFullYear(), alvo.getUTCMonth() + 1, 0)).getUTCDate();
  alvo.setUTCDate(Math.min(d, ultimo));
  return alvo.toISOString().slice(0, 10);
}

/* ===== Validação de tudo que chega do navegador (nunca confiar no que vem de fora) ===== */
export function texto(v, max = 200) {
  if (v === undefined || v === null) return "";
  return String(v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max);
}
export function obrigatorio(v, max, pt, en, min = 2) {
  const s = texto(v, max);
  if (s.length < min) throw new ErroPainel(400, pt, en);
  return s;
}
export function dataISO(v) {
  const s = texto(v, 10);
  const ok = /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s;
  if (!ok || s < "2020-01-01" || s > "2099-12-31") throw new ErroPainel(400, "Data inválida.", "Invalid date.");
  return s;
}
export function hora(v) {
  const s = texto(v, 5);
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(s)) throw new ErroPainel(400, "Horário inválido.", "Invalid time.");
  return s;
}
export function idNum(v) {
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0 || n > 1e9) throw new ErroPainel(400, "Identificador inválido.", "Invalid id.");
  return n;
}
export function umDe(v, lista, pt, en) {
  const s = texto(v, 40);
  if (!lista.includes(s)) throw new ErroPainel(400, pt || "Opção inválida.", en || "Invalid option.");
  return s;
}
// Telefone opcional: guarda só os dígitos. EUA = 10 dígitos (ou 11 começando com 1); outro país = 8 a 15 dígitos com +.
export function telefone(v) {
  const bruto = texto(v, 30);
  if (!bruto) return "";
  let d = bruto.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length === 10 && /^[2-9]\d{2}[2-9]\d{6}$/.test(d)) return d;
  if (bruto.startsWith("+") && d.length >= 8 && d.length <= 15) return "+" + d;
  throw new ErroPainel(400, "Telefone inválido. Use 10 dígitos (ex.: 754 272 5100) ou + código do país.", "Invalid phone. Use 10 digits (e.g. 754 272 5100) or + country code.");
}
