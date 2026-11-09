// Clientes, agenda e lembretes de limpeza do painel da GlassMaster.
import { ErroPainel, texto, obrigatorio, dataISO, hora, idNum, umDe, telefone, hojeFL, somarDias, somarMeses } from "./banco.js";

export const SERVICOS = ["residential", "commercial", "power", "hardwater", "solar", "other"];
export const STATUS = ["marcado", "feito", "cancelado"];
export const MESES_LEMBRETE = [0, 1, 2, 3, 4, 6, 12];
const DURACOES = [30, 60, 90, 120, 180, 240, 300, 360, 480];

/* ===================== Clientes ===================== */

function lerCliente(c) {
  const meses = Number(c.lembrete_meses || 0);
  if (!MESES_LEMBRETE.includes(meses)) throw new ErroPainel(400, "Lembrete inválido.", "Invalid reminder.");
  return {
    nome: obrigatorio(c.nome, 100, "Escreva o nome do cliente.", "Enter the client's name."),
    empresa: texto(c.empresa, 100),
    telefone: telefone(c.telefone),
    endereco: obrigatorio(c.endereco, 200, "Escreva o endereço (rua, número e cidade).", "Enter the address (street, number and city).", 6),
    notas: texto(c.notas, 1000),
    lembrete_meses: meses
  };
}

async function criarCliente(env, c) {
  const v = lerCliente(c);
  const r = await env.DB.prepare("INSERT INTO clientes (nome, empresa, telefone, endereco, notas, lembrete_meses) VALUES (?, ?, ?, ?, ?, ?) RETURNING id")
    .bind(v.nome, v.empresa, v.telefone, v.endereco, v.notas, v.lembrete_meses).first();
  return r.id;
}

export async function salvarCliente(env, c) {
  if (!c.id) return { ok: true, id: await criarCliente(env, c) };
  const id = idNum(c.id), v = lerCliente(c);
  const r = await env.DB.prepare("UPDATE clientes SET nome = ?, empresa = ?, telefone = ?, endereco = ?, notas = ?, lembrete_meses = ? WHERE id = ?")
    .bind(v.nome, v.empresa, v.telefone, v.endereco, v.notas, v.lembrete_meses, id).run();
  if (!r.meta.changes) throw new ErroPainel(404, "Cliente não encontrado.", "Client not found.");
  return { ok: true, id };
}

export async function lembreteCliente(env, c) {
  const id = idNum(c.id), meses = Number(c.lembrete_meses);
  if (!MESES_LEMBRETE.includes(meses)) throw new ErroPainel(400, "Lembrete inválido.", "Invalid reminder.");
  await env.DB.prepare("UPDATE clientes SET lembrete_meses = ? WHERE id = ?").bind(meses, id).run();
  return { ok: true };
}

// Apaga o cliente e todo o histórico dele (direito de exclusão da política de privacidade)
export async function removerCliente(env, c) {
  const id = idNum(c.id);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM agendamentos WHERE cliente_id = ?").bind(id),
    env.DB.prepare("DELETE FROM clientes WHERE id = ?").bind(id)
  ]);
  return { ok: true };
}

// Situação de cada cliente: última limpeza, próxima marcada e quando vence o lembrete
const SQL_CLIENTES = `SELECT c.id, c.nome, c.empresa, c.telefone, c.endereco, c.notas, c.lembrete_meses, c.lembrete_avisado,
  (SELECT MAX(a.data) FROM agendamentos a WHERE a.cliente_id = c.id AND a.status != 'cancelado' AND a.data <= ?1) AS ultima,
  (SELECT MIN(a.data) FROM agendamentos a WHERE a.cliente_id = c.id AND a.status = 'marcado' AND a.data > ?1) AS proxima
  FROM clientes c`;

function comVencimento(c) {
  c.vence = c.lembrete_meses > 0 && c.ultima ? somarMeses(c.ultima, c.lembrete_meses) : null;
  return c;
}

export async function listaClientes(env, url) {
  const q = texto(url.searchParams.get("q"), 60).toLowerCase();
  const hoje = hojeFL();
  let sql = SQL_CLIENTES, binds = [hoje];
  if (q) {
    const like = "%" + q.replace(/[\\%_]/g, m => "\\" + m) + "%";
    sql += ` WHERE lower(c.nome) LIKE ?2 ESCAPE '\\' OR lower(c.empresa) LIKE ?2 ESCAPE '\\' OR lower(c.endereco) LIKE ?2 ESCAPE '\\' OR c.telefone LIKE ?2 ESCAPE '\\'`;
    binds.push(like);
  }
  sql += " ORDER BY lower(c.nome) LIMIT 1000";
  const r = await env.DB.prepare(sql).bind(...binds).all();
  return { hoje, clientes: r.results.map(comVencimento) };
}

export async function umCliente(env, url) {
  const id = idNum(url.searchParams.get("id"));
  const hoje = hojeFL();
  const c = await env.DB.prepare(SQL_CLIENTES + " WHERE c.id = ?2").bind(hoje, id).first();
  if (!c) throw new ErroPainel(404, "Cliente não encontrado.", "Client not found.");
  const ag = await env.DB.prepare("SELECT id, data, hora, duracao, servico, notas, status FROM agendamentos WHERE cliente_id = ? ORDER BY data DESC, hora DESC LIMIT 300").bind(id).all();
  return { hoje, cliente: comVencimento(c), agendamentos: ag.results };
}

/* ===================== Agenda ===================== */

export async function agenda(env, url) {
  const de = dataISO(url.searchParams.get("de")), ate = dataISO(url.searchParams.get("ate"));
  if (ate < de || ate > somarDias(de, 100)) throw new ErroPainel(400, "Período inválido.", "Invalid date range.");
  const r = await env.DB.prepare(`SELECT a.id, a.cliente_id, a.data, a.hora, a.duracao, a.servico, a.notas, a.status,
      c.nome, c.empresa, c.telefone, c.endereco
    FROM agendamentos a JOIN clientes c ON c.id = a.cliente_id
    WHERE a.data BETWEEN ? AND ? ORDER BY a.data, a.hora LIMIT 2000`).bind(de, ate).all();
  return { hoje: hojeFL(), agendamentos: r.results };
}

export async function salvarAgendamento(env, c) {
  const data = dataISO(c.data), h = hora(c.hora);
  const duracao = Number(c.duracao || 120);
  if (!DURACOES.includes(duracao)) throw new ErroPainel(400, "Duração inválida.", "Invalid duration.");
  const servico = umDe(c.servico || "other", SERVICOS, "Serviço inválido.", "Invalid service.");
  const status = umDe(c.status || "marcado", STATUS);
  const notas = texto(c.notas, 1000);

  let clienteId;
  if (c.cliente_id) {
    clienteId = idNum(c.cliente_id);
    const existe = await env.DB.prepare("SELECT id FROM clientes WHERE id = ?").bind(clienteId).first();
    if (!existe) throw new ErroPainel(404, "Cliente não encontrado.", "Client not found.");
  } else if (c.novo_cliente && typeof c.novo_cliente === "object") {
    clienteId = await criarCliente(env, c.novo_cliente);
  } else {
    throw new ErroPainel(400, "Escolha o cliente ou cadastre um novo.", "Choose a client or add a new one.");
  }

  // Aviso (não bloqueia) se bater com outro horário no mesmo dia
  const outros = await env.DB.prepare("SELECT a.id, a.hora, a.duracao, c.nome FROM agendamentos a JOIN clientes c ON c.id = a.cliente_id WHERE a.data = ? AND a.status != 'cancelado' AND a.id != ?")
    .bind(data, c.id ? idNum(c.id) : 0).all();
  const min = s => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));
  const ini = min(h), fim = ini + duracao;
  const conflito = outros.results.find(o => min(o.hora) < fim && min(o.hora) + o.duracao > ini);

  if (c.id) {
    const id = idNum(c.id);
    const r = await env.DB.prepare("UPDATE agendamentos SET cliente_id = ?, data = ?, hora = ?, duracao = ?, servico = ?, notas = ?, status = ? WHERE id = ?")
      .bind(clienteId, data, h, duracao, servico, notas, status, id).run();
    if (!r.meta.changes) throw new ErroPainel(404, "Agendamento não encontrado.", "Appointment not found.");
    return { ok: true, id, cliente_id: clienteId, conflito: conflito ? { nome: conflito.nome, hora: conflito.hora } : null };
  }
  const r = await env.DB.prepare("INSERT INTO agendamentos (cliente_id, data, hora, duracao, servico, notas, status) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id")
    .bind(clienteId, data, h, duracao, servico, notas, status).first();
  return { ok: true, id: r.id, cliente_id: clienteId, conflito: conflito ? { nome: conflito.nome, hora: conflito.hora } : null };
}

export async function statusAgendamento(env, c) {
  const id = idNum(c.id), status = umDe(c.status, STATUS);
  const r = await env.DB.prepare("UPDATE agendamentos SET status = ? WHERE id = ?").bind(status, id).run();
  if (!r.meta.changes) throw new ErroPainel(404, "Agendamento não encontrado.", "Appointment not found.");
  return { ok: true };
}

export async function removerAgendamento(env, c) {
  await env.DB.prepare("DELETE FROM agendamentos WHERE id = ?").bind(idNum(c.id)).run();
  return { ok: true };
}

/* ===================== Lembretes de limpeza (2 a 3 meses) ===================== */

// Clientes com lembrete ligado, sem limpeza futura marcada, cujo prazo vence em até "antes" dias
export async function lembretesDevidos(env, antes = 7) {
  const hoje = hojeFL(), limite = somarDias(hoje, antes);
  const r = await env.DB.prepare(SQL_CLIENTES + " WHERE c.lembrete_meses > 0").bind(hoje).all();
  const todos = r.results.map(comVencimento);
  const devidos = todos.filter(c => c.vence && !c.proxima && c.vence <= limite).sort((a, b) => a.vence.localeCompare(b.vence));
  return { hoje, devidos, todos };
}

export async function lembretes(env) {
  const { hoje, devidos, todos } = await lembretesDevidos(env, 30);
  return {
    hoje,
    devidos,
    sem_limpeza: todos.filter(c => !c.ultima && !c.proxima).map(c => ({ id: c.id, nome: c.nome, empresa: c.empresa })),
    ligados: todos.length
  };
}

export async function exportar(env) {
  const [c, a] = await Promise.all([
    env.DB.prepare("SELECT id, nome, empresa, telefone, endereco, notas, lembrete_meses FROM clientes ORDER BY lower(nome)").all(),
    env.DB.prepare("SELECT a.data, a.hora, a.duracao, a.servico, a.status, a.notas, c.nome, c.empresa, c.endereco FROM agendamentos a JOIN clientes c ON c.id = a.cliente_id ORDER BY a.data, a.hora").all()
  ]);
  return { clientes: c.results, agendamentos: a.results };
}
