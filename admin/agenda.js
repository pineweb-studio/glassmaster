// Agenda: lista dos próximos dias (principal) e calendário do mês
"use strict";
(() => {
  const { t, esc, api, fmtData, fmtHora, somaMin, somarDias, hojeFL } = GM;
  GM.montarTopo();
  const $ = id => document.getElementById(id);
  const S = () => t("servicos");
  let hoje = hojeFL(), inicioLista = hoje, mesAtual = hoje.slice(0, 7), diaSel = null;
  let vista = "lista";
  try { if (localStorage.getItem("gm_vista") === "mes") vista = "mes"; } catch {}

  $("titulo").textContent = t("agenda");
  $("novo").textContent = "+ " + t("agendar");
  $("aba-lista").textContent = t("proximos");
  $("aba-mes").textContent = t("mes");
  document.title = t("agenda") + " · GlassMaster";
  const pintarHoje = () => { $("hoje-txt").textContent = t("hojeE") + " " + fmtData(hoje, { weekday: "long", day: "numeric", month: "long" }); };
  pintarHoje();

  function nomeDia(iso) {
    if (iso === hoje) return t("hoje") + " · " + fmtData(iso);
    if (iso === somarDias(hoje, 1)) return t("amanha") + " · " + fmtData(iso);
    return fmtData(iso, { weekday: "long", day: "numeric", month: "short" });
  }

  function cartao(a) {
    const fim = somaMin(a.hora, a.duracao);
    const fone = a.telefone ? GM.telLink(a.telefone) : "";
    return `<article class="ag ${esc(a.status)}">
      <button type="button" class="ag-hora" data-editar="${a.id}" aria-label="${esc(t("editar"))}: ${esc(a.nome)} ${esc(fmtHora(a.hora))}">
        <b>${esc(fmtHora(a.hora))}</b><small>${esc(t("ate"))} ${esc(fmtHora(fim))}</small>
      </button>
      <div class="ag-corpo">
        <button type="button" class="ag-nome" data-ficha="${a.cliente_id}">${esc(a.nome)}${a.empresa ? ` <span class="suave">· ${esc(a.empresa)}</span>` : ""}</button>
        <p class="ag-serv"><span class="chip">${esc(S()[a.servico] || a.servico)}</span>${a.status !== "marcado" ? ` <span class="chip ${esc(a.status)}">${esc(t(a.status))}</span>` : ""}</p>
        <a class="ag-end" href="${esc(GM.mapa(a.endereco))}" target="_blank" rel="noopener noreferrer">📍 ${esc(a.endereco)}</a>
        ${a.notas ? `<p class="ag-notas">${esc(a.notas)}</p>` : ""}
        <div class="acoes">
          ${fone ? `<a class="btn mini" href="tel:${esc(fone)}">📞 ${esc(t("ligar"))}</a><a class="btn mini" href="sms:${esc(fone)}">💬 ${esc(t("sms"))}</a>` : ""}
          ${a.status === "marcado" && a.data <= hoje ? `<button type="button" class="btn mini ok" data-feito="${a.id}">${esc(t("marcarFeito"))}</button>` : ""}
        </div>
      </div>
    </article>`;
  }

  let cache = [];
  function ligarCartoes(raiz) {
    raiz.querySelectorAll("[data-editar]").forEach(b => b.addEventListener("click", () => {
      const a = cache.find(x => x.id === Number(b.dataset.editar));
      GM.formAgendamento(a, {}, recarregar);
    }));
    raiz.querySelectorAll("[data-ficha]").forEach(b => b.addEventListener("click", () => GM.fichaCliente(b.dataset.ficha, recarregar)));
    raiz.querySelectorAll("[data-feito]").forEach(b => b.addEventListener("click", async () => {
      b.disabled = true;
      try { await api("agenda/status", { id: Number(b.dataset.feito), status: "feito" }); GM.aviso(t("salvo")); recarregar(); }
      catch (e) { GM.aviso(e.message, true); b.disabled = false; }
    }));
  }

  /* ----- Lista (principal) ----- */
  async function lista() {
    const el = $("vista-lista");
    const ate = somarDias(hoje, 60);
    let r;
    try { r = await api(`agenda?de=${inicioLista}&ate=${ate}`); } catch (e) { el.innerHTML = `<p class="erro-msg">${esc(e.message)}</p>`; return; }
    hoje = r.hoje; pintarHoje();
    cache = r.agendamentos;
    const porDia = {};
    r.agendamentos.forEach(a => (porDia[a.data] = porDia[a.data] || []).push(a));
    // Hoje e amanhã aparecem sempre (mesmo vazios); os outros dias só se tiverem algo
    [hoje, somarDias(hoje, 1)].forEach(d => { porDia[d] = porDia[d] || []; });
    const dias = Object.keys(porDia).sort();
    el.innerHTML = (inicioLista === hoje ? `<button type="button" class="btn link anteriores" id="anteriores">↑ ${esc(t("verAnteriores"))}</button>` : "") +
      dias.map(d => `<section class="dia${d === hoje ? " hoje" : ""}${d < hoje ? " passado" : ""}">
        <div class="dia-topo"><h2>${esc(nomeDia(d))}</h2><button type="button" class="btn mini" data-novo-dia="${d}" aria-label="${esc(t("agendarDia"))} ${esc(fmtData(d))}">+</button></div>
        ${porDia[d].length ? porDia[d].map(cartao).join("") : `<p class="vazio">${esc(t("diaLivre"))}</p>`}
      </section>`).join("") +
      (r.agendamentos.filter(a => a.data > somarDias(hoje, 1)).length ? "" : `<p class="vazio grande">${esc(t("nadaMarcado"))}</p>`);
    const ant = $("anteriores");
    if (ant) ant.addEventListener("click", () => { inicioLista = somarDias(hoje, -30); lista(); });
    el.querySelectorAll("[data-novo-dia]").forEach(b => b.addEventListener("click", () => GM.formAgendamento({}, { data: b.dataset.novoDia }, recarregar)));
    ligarCartoes(el);
  }

  /* ----- Mês ----- */
  async function mes() {
    const [a, m] = mesAtual.split("-").map(Number);
    const primeiro = `${mesAtual}-01`;
    const ultimoDia = new Date(Date.UTC(a, m, 0)).getUTCDate();
    const ultimo = `${mesAtual}-${String(ultimoDia).padStart(2, "0")}`;
    $("mes-nome").textContent = fmtData(primeiro, { month: "long", year: "numeric" });
    let r;
    try { r = await api(`agenda?de=${primeiro}&ate=${ultimo}`); } catch (e) { $("calendario").innerHTML = `<p class="erro-msg">${esc(e.message)}</p>`; return; }
    hoje = r.hoje; cache = r.agendamentos;
    const porDia = {};
    r.agendamentos.forEach(x => (porDia[x.data] = porDia[x.data] || []).push(x));
    const semana = [];
    for (let i = 0; i < 7; i++) semana.push(fmtData(somarDias("2026-11-01", i), { weekday: "short" })); // 1/nov/2026 é domingo
    const offset = new Date(primeiro + "T12:00:00Z").getUTCDay();
    let html = semana.map(s => `<div class="sem" aria-hidden="true">${esc(s)}</div>`).join("");
    for (let i = 0; i < offset; i++) html += `<div class="vazio-cel"></div>`;
    for (let d = 1; d <= ultimoDia; d++) {
      const iso = `${mesAtual}-${String(d).padStart(2, "0")}`;
      const itens = (porDia[iso] || []).filter(x => x.status !== "cancelado");
      html += `<button type="button" class="cel${iso === hoje ? " hoje" : ""}${iso === diaSel ? " sel" : ""}${iso < hoje ? " passado" : ""}" data-dia="${iso}" aria-label="${esc(fmtData(iso, { weekday: "long", day: "numeric", month: "long" }))}: ${itens.length}">
        <span class="num">${d}</span>
        ${itens.slice(0, 3).map(x => `<span class="mini-ag ${esc(x.status)}"><b>${esc(fmtHora(x.hora))}</b> ${esc(x.nome.split(" ")[0])}</span>`).join("")}
        ${itens.length > 3 ? `<span class="mais">+${itens.length - 3}</span>` : ""}
        ${itens.length ? `<span class="pontos" aria-hidden="true">${"•".repeat(Math.min(itens.length, 4))}</span>` : ""}
      </button>`;
    }
    $("calendario").innerHTML = html;
    $("calendario").querySelectorAll("[data-dia]").forEach(b => b.addEventListener("click", () => { diaSel = b.dataset.dia; mes(); }));
    const ds = $("dia-escolhido");
    if (diaSel && diaSel.startsWith(mesAtual)) {
      const itens = porDia[diaSel] || [];
      ds.innerHTML = `<section class="dia"><div class="dia-topo"><h2>${esc(nomeDia(diaSel))}</h2></div>
        ${itens.length ? itens.map(cartao).join("") : `<p class="vazio">${esc(t("diaLivre"))}</p>`}
        <button type="button" class="btn" id="agendar-dia">${esc(t("agendarDia"))}</button></section>`;
      $("agendar-dia").addEventListener("click", () => GM.formAgendamento({}, { data: diaSel }, recarregar));
      ligarCartoes(ds);
    } else ds.innerHTML = "";
  }

  function mostrar(v) {
    vista = v;
    try { localStorage.setItem("gm_vista", v); } catch {}
    $("aba-lista").setAttribute("aria-selected", v === "lista");
    $("aba-mes").setAttribute("aria-selected", v === "mes");
    $("vista-lista").hidden = v !== "lista";
    $("vista-mes").hidden = v !== "mes";
    recarregar(false);
  }

  async function faixa() {
    const r = await GM.atualizarSelo();
    if (!r) return;
    const n = r.devidos.filter(c => c.vence <= somarDias(r.hoje, 7)).length;
    $("faixa").hidden = !n;
    if (n) $("faixa").textContent = "🔔 " + t("bannerLembretes")(n) + " →";
  }

  function recarregar(comFaixa = true) {
    if (vista === "lista") lista(); else mes();
    if (comFaixa) faixa();
  }

  $("aba-lista").addEventListener("click", () => mostrar("lista"));
  $("aba-mes").addEventListener("click", () => mostrar("mes"));
  $("mes-ant").addEventListener("click", () => { const [a, m] = mesAtual.split("-").map(Number); const d = new Date(Date.UTC(a, m - 2, 1)); mesAtual = d.toISOString().slice(0, 7); mes(); });
  $("mes-prox").addEventListener("click", () => { const [a, m] = mesAtual.split("-").map(Number); const d = new Date(Date.UTC(a, m, 1)); mesAtual = d.toISOString().slice(0, 7); mes(); });
  $("novo").addEventListener("click", () => GM.formAgendamento({}, { data: vista === "mes" && diaSel ? diaSel : hoje }, recarregar));

  mostrar(vista);
  faixa();
  // Ao voltar para o app (celular), atualiza
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { hoje = hojeFL(); recarregar(); } });
})();
