// Funções comuns do painel da GlassMaster: idioma (PT/EN), chamar o servidor, datas, menu e janelas.
// Regra de segurança: todo texto que vem do banco passa por esc() antes de ir para o HTML.
"use strict";
const GM = (() => {
  /* ---------- Idioma ---------- */
  const TXT = {
    pt: {
      agenda: "Agenda", clientes: "Clientes", lembretes: "Lembretes", painel: "Painel",
      sair: "Sair", trocarSenha: "Trocar senha", seguranca: "Segurança", exportar: "Baixar planilha", idioma: "English",
      mais: "Mais", fechar: "Fechar", salvar: "Salvar", cancelar: "Cancelar", excluir: "Excluir", editar: "Editar",
      agendar: "Agendar", novoAg: "Novo agendamento", editarAg: "Editar agendamento", novoCliente: "Novo cliente", editarCliente: "Editar cliente",
      cliente: "Cliente", escolhaCliente: "Escolha o cliente", buscarCliente: "Buscar cliente…", cadastrarNovo: "+ Cadastrar cliente novo",
      nome: "Nome", empresa: "Nome da empresa (opcional)", telefone: "Telefone (opcional)", endereco: "Endereço (rua, número, cidade, ZIP)",
      notas: "Observações (opcional)", data: "Data", hora: "Horário", duracao: "Duração", servico: "Serviço", status: "Situação",
      lembrete: "Lembrete de limpeza", lembreteOff: "Desligado", lembreteN: n => n === 1 ? "A cada 1 mês" : `A cada ${n} meses`,
      lembreteAjuda: "Se ligado, o painel avisa (e manda e-mail) quando chegar a hora da próxima limpeza.",
      marcado: "Marcado", feito: "Feito", cancelado: "Cancelado", marcarFeito: "Feito ✓",
      ligar: "Ligar", sms: "Mensagem", mapa: "Mapa", ate: "até",
      hoje: "Hoje", amanha: "Amanhã", proximos: "Próximos", mes: "Mês", verAnteriores: "Ver dias anteriores",
      nadaMarcado: "Nada marcado nesses dias.", diaLivre: "Dia livre.", agendarDia: "+ Agendar neste dia",
      ultima: "Última limpeza", proxima: "Próxima marcada", vence: "Próxima limpeza ideal", nunca: "nenhuma ainda",
      historico: "Histórico", semHistorico: "Nenhum agendamento ainda.", buscar: "Buscar por nome, empresa, endereço ou telefone",
      semClientes: "Nenhum cliente cadastrado ainda.", nenhumAchado: "Nenhum cliente encontrado.",
      precisam: "Precisam de limpeza", precisamAjuda: "Clientes com lembrete ligado e sem limpeza marcada, vencendo nos próximos 30 dias.",
      nenhumDevido: "Nenhum cliente precisando de limpeza agora. 👍", semLimpeza: "Lembrete ligado, mas sem nenhuma limpeza registrada",
      semLimpezaAjuda: "O prazo começa a contar a partir da primeira limpeza. Agende ou registre a última limpeza.",
      vencidoHa: n => n === 0 ? "vence hoje" : `venceu há ${n} dia${n > 1 ? "s" : ""}`, venceEm: n => `vence em ${n} dia${n > 1 ? "s" : ""}`,
      desligarLembrete: "Desligar lembrete", lembreteDesligado: "Lembrete desligado.",
      avisoEmail: "Todo dia de manhã o sistema manda um e-mail para o Greg com os clientes que estão chegando no prazo.",
      bannerLembretes: n => `${n} cliente${n > 1 ? "s precisam" : " precisa"} de limpeza. Ver lembretes`,
      salvo: "Salvo.", excluido: "Excluído.", conflito: (n, h) => `Atenção: bate com o horário de ${n} (${h}).`,
      confirmaExcluirCliente: n => `Excluir ${n} e TODO o histórico? Isso não pode ser desfeito.`, confirmaExcluirAg: "Excluir este agendamento?",
      senhaAtual: "Senha atual", senhaNova: "Senha nova (mínimo 12 caracteres)", senhaTrocada: "Senha trocada. Entre de novo com a senha nova.",
      acessos: "Últimos acessos ao painel", acessoOk: "entrou", acessoErro: "senha errada", sessoes: n => `Aparelhos conectados agora: ${n}`,
      sairTodos: "Desconectar todos os aparelhos", segurancaAjuda: "Se aparecer acesso que não foi você, troque a senha na hora (isso desconecta todo mundo).",
      semConexao: "Sem conexão. Confira a internet.", entreSenha: "Entre com a senha.",
      servicos: { residential: "Vidros residenciais", commercial: "Vidros comerciais", power: "Lavagem com pressão", hardwater: "Manchas de água dura", solar: "Painéis solares", other: "Outro" },
      duracoes: { 30: "30 min", 60: "1 hora", 90: "1h30", 120: "2 horas", 180: "3 horas", 240: "4 horas", 300: "5 horas", 360: "6 horas", 480: "Dia todo (8h)" },
      sms_texto: (nome, meses) => `Hi ${nome}, this is GlassMaster Cleaning. It's been about ${meses} month${meses > 1 ? "s" : ""} since your last cleaning. Would you like to schedule the next one?`,
      obrigatorioCliente: "Escolha o cliente ou cadastre um novo.",
      areaDono: "Área do dono", tituloEntrar: "Painel da GlassMaster", senha: "Senha", entrar: "Entrar", voltarSite: "Voltar ao site",
      hojeE: "Hoje é", totalClientes: n => `${n} cliente${n === 1 ? "" : "s"}`, lembretesOlho: "Limpeza a cada 2–3 meses"
    },
    en: {
      agenda: "Schedule", clientes: "Clients", lembretes: "Reminders", painel: "Dashboard",
      sair: "Sign out", trocarSenha: "Change password", seguranca: "Security", exportar: "Download spreadsheet", idioma: "Português",
      mais: "More", fechar: "Close", salvar: "Save", cancelar: "Cancel", excluir: "Delete", editar: "Edit",
      agendar: "Schedule", novoAg: "New appointment", editarAg: "Edit appointment", novoCliente: "New client", editarCliente: "Edit client",
      cliente: "Client", escolhaCliente: "Choose the client", buscarCliente: "Search client…", cadastrarNovo: "+ Add a new client",
      nome: "Name", empresa: "Company name (optional)", telefone: "Phone (optional)", endereco: "Address (street, number, city, ZIP)",
      notas: "Notes (optional)", data: "Date", hora: "Time", duracao: "Duration", servico: "Service", status: "Status",
      lembrete: "Cleaning reminder", lembreteOff: "Off", lembreteN: n => n === 1 ? "Every month" : `Every ${n} months`,
      lembreteAjuda: "When on, the dashboard (and a daily e-mail) tells you when the next cleaning is due.",
      marcado: "Scheduled", feito: "Done", cancelado: "Canceled", marcarFeito: "Done ✓",
      ligar: "Call", sms: "Text", mapa: "Map", ate: "until",
      hoje: "Today", amanha: "Tomorrow", proximos: "Upcoming", mes: "Month", verAnteriores: "Show earlier days",
      nadaMarcado: "Nothing scheduled for these days.", diaLivre: "Free day.", agendarDia: "+ Schedule on this day",
      ultima: "Last cleaning", proxima: "Next scheduled", vence: "Next cleaning due", nunca: "none yet",
      historico: "History", semHistorico: "No appointments yet.", buscar: "Search by name, company, address or phone",
      semClientes: "No clients yet.", nenhumAchado: "No clients found.",
      precisam: "Due for cleaning", precisamAjuda: "Clients with the reminder on and nothing scheduled, due in the next 30 days.",
      nenhumDevido: "No clients due for cleaning right now. 👍", semLimpeza: "Reminder on, but no cleaning recorded yet",
      semLimpezaAjuda: "The countdown starts from the first cleaning. Schedule it or record the last cleaning.",
      vencidoHa: n => n === 0 ? "due today" : `overdue by ${n} day${n > 1 ? "s" : ""}`, venceEm: n => `due in ${n} day${n > 1 ? "s" : ""}`,
      desligarLembrete: "Turn reminder off", lembreteDesligado: "Reminder turned off.",
      avisoEmail: "Every morning the system e-mails Greg the clients that are coming due.",
      bannerLembretes: n => `${n} client${n > 1 ? "s are" : " is"} due for cleaning. See reminders`,
      salvo: "Saved.", excluido: "Deleted.", conflito: (n, h) => `Heads up: overlaps with ${n} (${h}).`,
      confirmaExcluirCliente: n => `Delete ${n} and ALL their history? This cannot be undone.`, confirmaExcluirAg: "Delete this appointment?",
      senhaAtual: "Current password", senhaNova: "New password (12+ characters)", senhaTrocada: "Password changed. Sign in again with the new one.",
      acessos: "Recent sign-ins", acessoOk: "signed in", acessoErro: "wrong password", sessoes: n => `Devices signed in now: ${n}`,
      sairTodos: "Sign out all devices", segurancaAjuda: "If you see a sign-in that wasn't you, change the password right away (it signs everyone out).",
      semConexao: "No connection. Check the internet.", entreSenha: "Please sign in.",
      servicos: { residential: "Residential windows", commercial: "Commercial windows", power: "Pressure washing", hardwater: "Hard water stains", solar: "Solar panels", other: "Other" },
      duracoes: { 30: "30 min", 60: "1 hour", 90: "1.5 hours", 120: "2 hours", 180: "3 hours", 240: "4 hours", 300: "5 hours", 360: "6 hours", 480: "All day (8h)" },
      sms_texto: (nome, meses) => `Hi ${nome}, this is GlassMaster Cleaning. It's been about ${meses} month${meses > 1 ? "s" : ""} since your last cleaning. Would you like to schedule the next one?`,
      obrigatorioCliente: "Choose a client or add a new one.",
      areaDono: "Owner area", tituloEntrar: "GlassMaster Dashboard", senha: "Password", entrar: "Sign in", voltarSite: "Back to website",
      hojeE: "Today is", totalClientes: n => `${n} client${n === 1 ? "" : "s"}`, lembretesOlho: "Cleaning every 2–3 months"
    }
  };
  function lerLang() {
    try { const s = localStorage.getItem("gm_lang"); if (s === "pt" || s === "en") return s; } catch {}
    return (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
  }
  let lang = lerLang();
  const t = k => TXT[lang][k];
  const locale = () => (lang === "pt" ? "pt-BR" : "en-US");
  function trocarIdioma() {
    lang = lang === "pt" ? "en" : "pt";
    try { localStorage.setItem("gm_lang", lang); } catch {}
    location.reload();
  }
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  /* ---------- Servidor ---------- */
  async function api(rota, corpo) {
    const op = corpo === undefined
      ? { method: "GET", credentials: "same-origin", cache: "no-store" }
      : { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) };
    let r;
    try { r = await fetch("/api/admin/" + rota, op); } catch { throw new Error(t("semConexao")); }
    const dados = await r.json().catch(() => ({}));
    if (r.status === 401 && rota !== "login" && rota !== "trocar-senha") {
      location.href = "./?voltar=" + encodeURIComponent(location.pathname);
      throw new Error(t("entreSenha"));
    }
    if (!r.ok) throw new Error((lang === "en" ? dados.erro_en : dados.erro) || "Erro " + r.status);
    return dados;
  }

  /* ---------- Formatos ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dataObj = iso => new Date(iso + "T12:00:00Z");
  const fmtData = (iso, op = { weekday: "short", day: "numeric", month: "short" }) => iso ? new Intl.DateTimeFormat(locale(), { timeZone: "UTC", ...op }).format(dataObj(iso)) : "";
  const fmtCurta = iso => fmtData(iso, { day: "2-digit", month: "2-digit", year: "numeric" });
  function fmtHora(hm) {
    if (!hm) return "";
    const [h, m] = hm.split(":").map(Number);
    return new Intl.DateTimeFormat(locale(), { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(Date.UTC(2000, 0, 1, h, m)));
  }
  const somaMin = (hm, min) => { const [h, m] = hm.split(":").map(Number); const x = (h * 60 + m + min) % 1440; return String(Math.floor(x / 60)).padStart(2, "0") + ":" + String(x % 60).padStart(2, "0"); };
  const somarDias = (iso, n) => { const d = dataObj(iso); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const difDias = (a, b) => Math.round((dataObj(b) - dataObj(a)) / 86400000);
  // "Hoje" na Flórida (a empresa trabalha lá)
  const hojeFL = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  function fmtTel(tel) {
    if (!tel) return "";
    if (/^\d{10}$/.test(tel)) return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)}-${tel.slice(6)}`;
    return tel;
  }
  const telLink = tel => /^\d{10}$/.test(tel) ? "+1" + tel : tel;
  const mapa = end => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(end);
  const param = n => new URLSearchParams(location.search).get(n);

  /* ---------- Avisos ---------- */
  let timer;
  function aviso(msg, erro = false) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite"); document.body.appendChild(el); }
    el.textContent = msg; el.classList.toggle("erro", erro); el.classList.add("ver");
    clearTimeout(timer); timer = setTimeout(() => el.classList.remove("ver"), erro ? 6000 : 3000);
  }

  /* ---------- Janelas ---------- */
  function janela(html) {
    const d = document.createElement("dialog");
    d.innerHTML = html;
    document.body.appendChild(d);
    d.addEventListener("close", () => d.remove());
    d.querySelectorAll("[data-fechar]").forEach(b => b.addEventListener("click", () => d.close()));
    d.showModal();
    return d;
  }
  const topoJanela = titulo => `<div class="janela-topo"><h2>${esc(titulo)}</h2><button type="button" class="fechar" data-fechar aria-label="${esc(t("fechar"))}">×</button></div>`;

  /* ---------- Menu ---------- */
  const PAGINAS = [["agenda", "agenda", "📅"], ["clientes", "clientes", "👥"], ["lembretes", "lembretes", "🔔"]];
  function montarTopo() {
    const atual = location.pathname.split("/").pop().replace(/\.html$/, "") || "agenda";
    const topo = document.createElement("header");
    topo.className = "topo";
    topo.innerHTML = `<div class="miolo">
      <a class="marca" href="agenda"><img src="../img/logo.png" alt="" width="36" height="36"><span>GlassMaster <small>${esc(t("painel"))}</small></span></a>
      <nav class="abas" aria-label="${esc(t("painel"))}">${PAGINAS.map(([href, k, ic]) =>
        `<a href="${href}"${href === atual ? ' aria-current="page"' : ""}><span aria-hidden="true">${ic}</span>${esc(t(k))}${href === "lembretes" ? '<b class="selo" id="selo-lembretes" hidden></b>' : ""}</a>`).join("")}</nav>
      <details class="menu-mais"><summary>${esc(t("mais"))}</summary><div class="menu-lista">
        <button type="button" data-acao="idioma">🌐 ${esc(t("idioma"))}</button>
        <button type="button" data-acao="seguranca">🛡️ ${esc(t("seguranca"))}</button>
        <button type="button" data-acao="senha">🔑 ${esc(t("trocarSenha"))}</button>
        <button type="button" data-acao="exportar">⬇️ ${esc(t("exportar"))}</button>
        <button type="button" data-acao="sair">↩︎ ${esc(t("sair"))}</button>
      </div></details>
    </div>`;
    document.body.prepend(topo);
    const acoes = {
      idioma: trocarIdioma, seguranca, senha: trocarSenha, exportar: exportarCSV,
      sair: async () => { await api("sair", {}).catch(() => {}); location.href = "./"; }
    };
    topo.querySelectorAll("[data-acao]").forEach(b => b.addEventListener("click", () => { topo.querySelector("details").open = false; acoes[b.dataset.acao](); }));
    document.addEventListener("click", e => { const d = topo.querySelector("details"); if (d.open && !d.contains(e.target)) d.open = false; });
    atualizarSelo();
  }
  async function atualizarSelo() {
    try {
      const r = await api("lembretes");
      const n = r.devidos.filter(c => c.vence <= somarDias(r.hoje, 7)).length;
      const s = document.getElementById("selo-lembretes");
      if (s) { s.textContent = n; s.hidden = !n; s.setAttribute("aria-label", n + ""); }
      return r;
    } catch { return null; }
  }

  function trocarSenha() {
    const d = janela(`<form>${topoJanela(t("trocarSenha"))}
      <div class="janela-corpo">
        <div class="campo"><label for="s-atual">${esc(t("senhaAtual"))}</label><input id="s-atual" type="password" autocomplete="current-password" required maxlength="200"></div>
        <div class="campo"><label for="s-nova">${esc(t("senhaNova"))}</label><input id="s-nova" type="password" autocomplete="new-password" minlength="12" maxlength="200" required></div>
        <p class="erro-msg" aria-live="polite"></p>
      </div>
      <div class="janela-rodape"><button class="btn primario">${esc(t("salvar"))}</button></div></form>`);
    d.querySelector("form").addEventListener("submit", async ev => {
      ev.preventDefault();
      try {
        await api("trocar-senha", { atual: d.querySelector("#s-atual").value, nova: d.querySelector("#s-nova").value });
        alert(t("senhaTrocada")); location.href = "./";
      } catch (e) { d.querySelector(".erro-msg").textContent = e.message; }
    });
  }

  async function seguranca() {
    let r;
    try { r = await api("seguranca"); } catch (e) { aviso(e.message, true); return; }
    const linhas = r.acessos.map(a => {
      const quando = new Intl.DateTimeFormat(locale(), { dateStyle: "short", timeStyle: "short", timeZone: "America/New_York" }).format(new Date(a.quando * 1000));
      const aparelho = /iPhone|iPad/.test(a.aparelho) ? "iPhone/iPad" : /Android/.test(a.aparelho) ? "Android" : /Mac/.test(a.aparelho) ? "Mac" : /Windows/.test(a.aparelho) ? "Windows" : "—";
      return `<li class="${a.ok ? "" : "ruim"}"><b>${esc(quando)}</b> · ${esc(a.ok ? t("acessoOk") : t("acessoErro"))} · ${esc(a.pais || "?")} · ${esc(aparelho)} <span class="suave">${esc(a.ip)}</span></li>`;
    }).join("") || "<li>—</li>";
    const d = janela(`${topoJanela(t("seguranca"))}<div class="janela-corpo">
      <p>${esc(t("sessoes")(r.sessoes_abertas))}</p>
      <p class="suave">${esc(t("segurancaAjuda"))}</p>
      <h3>${esc(t("acessos"))}</h3><ul class="acessos">${linhas}</ul></div>
      <div class="janela-rodape"><button type="button" class="btn perigo" id="sair-todos">${esc(t("sairTodos"))}</button></div>`);
    d.querySelector("#sair-todos").addEventListener("click", async () => {
      try { await api("sair-todos", {}); location.href = "./"; } catch (e) { aviso(e.message, true); }
    });
  }

  async function exportarCSV() {
    let r;
    try { r = await api("exportar"); } catch (e) { aviso(e.message, true); return; }
    const S = TXT[lang].servicos;
    // Proteção contra "fórmula" escondida em planilha (CSV injection): célula que começa com = + - @ ganha um '
    const cel = v => { let s = String(v ?? ""); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return `"${s.replace(/"/g, '""')}"`; };
    const linhas = [[t("data"), t("hora"), t("duracao"), t("servico"), t("status"), t("cliente"), t("empresa"), t("endereco"), t("notas")]]
      .concat(r.agendamentos.map(a => [a.data, a.hora, a.duracao, S[a.servico] || a.servico, t(a.status), a.nome, a.empresa, a.endereco, a.notas]));
    const csv = "﻿" + linhas.map(l => l.map(cel).join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `glassmaster-${hojeFL()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------- Cliente: cadastro ---------- */
  const opcoesLembrete = atual => [0, 1, 2, 3, 4, 6, 12].map(n => `<option value="${n}"${n === Number(atual || 0) ? " selected" : ""}>${esc(n ? t("lembreteN")(n) : t("lembreteOff"))}</option>`).join("");
  function camposCliente(c = {}, pre = "c") {
    return `<div class="campo largo"><label for="${pre}-nome">${esc(t("nome"))}</label><input id="${pre}-nome" name="nome" maxlength="100" autocomplete="off" value="${esc(c.nome)}"></div>
      <div class="campo"><label for="${pre}-empresa">${esc(t("empresa"))}</label><input id="${pre}-empresa" name="empresa" maxlength="100" autocomplete="off" value="${esc(c.empresa)}"></div>
      <div class="campo"><label for="${pre}-telefone">${esc(t("telefone"))}</label><input id="${pre}-telefone" name="telefone" type="tel" inputmode="tel" maxlength="30" autocomplete="off" value="${esc(fmtTel(c.telefone))}"></div>
      <div class="campo largo"><label for="${pre}-endereco">${esc(t("endereco"))}</label><textarea id="${pre}-endereco" name="endereco" rows="2" maxlength="200">${esc(c.endereco)}</textarea></div>
      <div class="campo largo"><label for="${pre}-lembrete">${esc(t("lembrete"))}</label><select id="${pre}-lembrete" name="lembrete_meses">${opcoesLembrete(c.lembrete_meses)}</select><small class="suave">${esc(t("lembreteAjuda"))}</small></div>
      <div class="campo largo"><label for="${pre}-notas">${esc(t("notas"))}</label><textarea id="${pre}-notas" name="notas" rows="2" maxlength="1000">${esc(c.notas)}</textarea></div>`;
  }
  const lerCampos = raiz => Object.fromEntries([...raiz.querySelectorAll("[name]")].map(i => [i.name, i.value]));

  function formCliente(c, depois) {
    const editando = !!(c && c.id);
    const d = janela(`<form novalidate>${topoJanela(editando ? t("editarCliente") : t("novoCliente"))}
      <div class="janela-corpo"><div class="grade-campos">${camposCliente(c || {})}</div><p class="erro-msg" aria-live="polite"></p></div>
      <div class="janela-rodape">${editando ? `<button type="button" class="btn perigo" id="excluir">${esc(t("excluir"))}</button>` : ""}<button class="btn primario">${esc(t("salvar"))}</button></div></form>`);
    d.querySelector("form").addEventListener("submit", async ev => {
      ev.preventDefault();
      try {
        const r = await api("clientes/salvar", { ...(editando ? { id: c.id } : {}), ...lerCampos(d) });
        d.close(); aviso(t("salvo")); if (depois) depois(r.id);
      } catch (e) { d.querySelector(".erro-msg").textContent = e.message; }
    });
    if (editando) d.querySelector("#excluir").addEventListener("click", async () => {
      if (!confirm(t("confirmaExcluirCliente")(c.nome))) return;
      try { await api("clientes/remover", { id: c.id }); d.close(); aviso(t("excluido")); if (depois) depois(null); } catch (e) { aviso(e.message, true); }
    });
    d.querySelector("input").focus();
  }

  /* ---------- Agendamento: cadastro ---------- */
  const opcoesServico = atual => Object.entries(TXT[lang].servicos).map(([k, v]) => `<option value="${k}"${k === atual ? " selected" : ""}>${esc(v)}</option>`).join("");
  const opcoesDuracao = atual => Object.entries(TXT[lang].duracoes).map(([k, v]) => `<option value="${k}"${Number(k) === Number(atual || 120) ? " selected" : ""}>${esc(v)}</option>`).join("");

  // ag = agendamento existente (editar) ou {} ; pre = { cliente_id, data, servico }
  async function formAgendamento(ag = {}, pre = {}, depois) {
    const editando = !!ag.id;
    let lista = [];
    try { lista = (await api("clientes")).clientes; } catch (e) { aviso(e.message, true); return; }
    const clienteId = ag.cliente_id || pre.cliente_id || "";
    const opcoes = lista.map(c => `<option value="${c.id}"${c.id === Number(clienteId) ? " selected" : ""}>${esc(c.nome)}${c.empresa ? " · " + esc(c.empresa) : ""}</option>`).join("");
    const d = janela(`<form novalidate>${topoJanela(editando ? t("editarAg") : t("novoAg"))}
      <div class="janela-corpo"><div class="grade-campos">
        <div class="campo largo"><label for="a-cliente">${esc(t("cliente"))}</label>
          ${lista.length > 8 ? `<input type="search" id="a-busca" class="busca-mini" placeholder="${esc(t("buscarCliente"))}" aria-label="${esc(t("buscarCliente"))}" autocomplete="off">` : ""}
          <select id="a-cliente" name="cliente_id"><option value="">${esc(t("escolhaCliente"))}</option>${opcoes}<option value="novo">${esc(t("cadastrarNovo"))}</option></select>
        </div>
        <fieldset class="novo-cliente largo" hidden><legend>${esc(t("novoCliente"))}</legend><div class="grade-campos">${camposCliente({}, "n")}</div></fieldset>
        <div class="campo"><label for="a-data">${esc(t("data"))}</label><input id="a-data" name="data" type="date" required value="${esc(ag.data || pre.data || hojeFL())}"></div>
        <div class="campo"><label for="a-hora">${esc(t("hora"))}</label><input id="a-hora" name="hora" type="time" required step="300" value="${esc(ag.hora || pre.hora || "09:00")}"></div>
        <div class="campo"><label for="a-servico">${esc(t("servico"))}</label><select id="a-servico" name="servico">${opcoesServico(ag.servico || pre.servico || "residential")}</select></div>
        <div class="campo"><label for="a-duracao">${esc(t("duracao"))}</label><select id="a-duracao" name="duracao">${opcoesDuracao(ag.duracao)}</select></div>
        ${editando ? `<div class="campo"><label for="a-status">${esc(t("status"))}</label><select id="a-status" name="status">${["marcado", "feito", "cancelado"].map(s => `<option value="${s}"${s === ag.status ? " selected" : ""}>${esc(t(s))}</option>`).join("")}</select></div>` : ""}
        <div class="campo largo"><label for="a-notas">${esc(t("notas"))}</label><textarea id="a-notas" name="notas" rows="2" maxlength="1000">${esc(ag.notas)}</textarea></div>
      </div><p class="erro-msg" aria-live="polite"></p></div>
      <div class="janela-rodape">${editando ? `<button type="button" class="btn perigo" id="excluir">${esc(t("excluir"))}</button>` : ""}<button class="btn primario">${esc(t("salvar"))}</button></div></form>`);
    const sel = d.querySelector("#a-cliente"), novo = d.querySelector(".novo-cliente");
    const mostrarNovo = () => { novo.hidden = sel.value !== "novo"; if (!novo.hidden) novo.querySelector("input").focus(); };
    sel.addEventListener("change", mostrarNovo);
    const busca = d.querySelector("#a-busca");
    if (busca) busca.addEventListener("input", () => {
      const q = busca.value.trim().toLowerCase();
      [...sel.options].forEach(o => { if (o.value && o.value !== "novo") o.hidden = !!q && !o.textContent.toLowerCase().includes(q); });
      const primeiro = [...sel.options].find(o => o.value && o.value !== "novo" && !o.hidden);
      if (q && primeiro) { sel.value = primeiro.value; mostrarNovo(); }
    });
    d.querySelector("form").addEventListener("submit", async ev => {
      ev.preventDefault();
      const erro = d.querySelector(".erro-msg");
      const val = id => { const el = d.querySelector("#" + id); return el ? el.value : ""; };
      const corpo = { ...(editando ? { id: ag.id } : {}), data: val("a-data"), hora: val("a-hora"), servico: val("a-servico"), duracao: Number(val("a-duracao")), notas: val("a-notas"), status: val("a-status") || "marcado" };
      if (sel.value === "novo") corpo.novo_cliente = lerCampos(novo);
      else if (sel.value) corpo.cliente_id = Number(sel.value);
      else { erro.textContent = t("obrigatorioCliente"); sel.focus(); return; }
      try {
        const r = await api("agenda/salvar", corpo);
        d.close();
        if (r.conflito) aviso(t("conflito")(r.conflito.nome, fmtHora(r.conflito.hora)), true); else aviso(t("salvo"));
        if (depois) depois(r);
      } catch (e) { erro.textContent = e.message; }
    });
    if (editando) d.querySelector("#excluir").addEventListener("click", async () => {
      if (!confirm(t("confirmaExcluirAg"))) return;
      try { await api("agenda/remover", { id: ag.id }); d.close(); aviso(t("excluido")); if (depois) depois(null); } catch (e) { aviso(e.message, true); }
    });
    if (!clienteId) (busca || sel).focus();
  }

  /* ---------- Cliente: ficha ---------- */
  function botoesContato(c) {
    const b = [];
    if (c.telefone) {
      b.push(`<a class="btn mini" href="tel:${esc(telLink(c.telefone))}">📞 ${esc(t("ligar"))}</a>`);
      b.push(`<a class="btn mini" href="sms:${esc(telLink(c.telefone))}">💬 ${esc(t("sms"))}</a>`);
    }
    b.push(`<a class="btn mini" href="${esc(mapa(c.endereco))}" target="_blank" rel="noopener noreferrer">📍 ${esc(t("mapa"))}</a>`);
    return b.join("");
  }

  async function fichaCliente(id, depois) {
    let r;
    try { r = await api("clientes/um?id=" + encodeURIComponent(id)); } catch (e) { aviso(e.message, true); return; }
    const c = r.cliente, S = TXT[lang].servicos;
    const hist = r.agendamentos.map(a => `<li class="hist ${esc(a.status)}"><button type="button" class="linha" data-ag="${a.id}">
        <span><b>${esc(fmtCurta(a.data))}</b> ${esc(fmtHora(a.hora))}</span><span>${esc(S[a.servico] || "")}</span><span class="chip ${esc(a.status)}">${esc(t(a.status))}</span></button></li>`).join("");
    const d = janela(`${topoJanela(c.nome)}<div class="janela-corpo ficha">
      ${c.empresa ? `<p class="empresa">🏢 ${esc(c.empresa)}</p>` : ""}
      <p>📍 ${esc(c.endereco)}</p>
      ${c.telefone ? `<p>📞 ${esc(fmtTel(c.telefone))}</p>` : ""}
      <div class="acoes">${botoesContato(c)}</div>
      ${c.notas ? `<p class="notas">${esc(c.notas)}</p>` : ""}
      <dl class="resumo">
        <div><dt>${esc(t("ultima"))}</dt><dd>${esc(c.ultima ? fmtData(c.ultima, { day: "numeric", month: "short", year: "numeric" }) : t("nunca"))}</dd></div>
        <div><dt>${esc(t("proxima"))}</dt><dd>${esc(c.proxima ? fmtData(c.proxima, { day: "numeric", month: "short", year: "numeric" }) : "—")}</dd></div>
        <div><dt>${esc(t("lembrete"))}</dt><dd>${esc(c.lembrete_meses ? t("lembreteN")(c.lembrete_meses) : t("lembreteOff"))}${c.vence ? `<br><small>${esc(t("vence"))}: ${esc(fmtData(c.vence, { day: "numeric", month: "short", year: "numeric" }))}</small>` : ""}</dd></div>
      </dl>
      <h3>${esc(t("historico"))}</h3>
      <ul class="historico">${hist || `<li class="suave">${esc(t("semHistorico"))}</li>`}</ul>
    </div>
    <div class="janela-rodape"><button type="button" class="btn" id="editar">${esc(t("editar"))}</button><button type="button" class="btn primario" id="agendar">+ ${esc(t("agendar"))}</button></div>`);
    const recarregar = () => { d.close(); if (depois) depois(); };
    d.querySelector("#editar").addEventListener("click", () => { d.close(); formCliente(c, novoId => { if (novoId) fichaCliente(novoId, depois); if (depois) depois(); }); });
    d.querySelector("#agendar").addEventListener("click", () => { d.close(); formAgendamento({}, { cliente_id: c.id }, recarregar); });
    d.querySelectorAll("[data-ag]").forEach(b => b.addEventListener("click", () => {
      const a = r.agendamentos.find(x => x.id === Number(b.dataset.ag));
      d.close(); formAgendamento({ ...a, cliente_id: c.id }, {}, recarregar);
    }));
  }

  return { t, trocarIdioma, lang: () => lang, locale, api, esc, fmtData, fmtCurta, fmtHora, fmtTel, telLink, mapa, somaMin, somarDias, difDias, hojeFL, param, aviso, janela, montarTopo, atualizarSelo, formCliente, formAgendamento, fichaCliente, botoesContato };
})();
