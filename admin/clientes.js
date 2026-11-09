// Clientes: busca, cadastro e ficha de cada cliente
"use strict";
(() => {
  const { t, esc, api, fmtData, fmtTel } = GM;
  GM.montarTopo();
  const $ = id => document.getElementById(id);
  $("titulo").textContent = t("clientes");
  $("novo").textContent = "+ " + t("novoCliente");
  $("busca").placeholder = t("buscar");
  $("busca").setAttribute("aria-label", t("buscar"));
  document.title = t("clientes") + " · GlassMaster";
  const curta = iso => fmtData(iso, { day: "numeric", month: "short", year: "numeric" });

  let pedido = 0;
  async function carregar() {
    const q = $("busca").value.trim();
    const meu = ++pedido;
    let r;
    try { r = await api("clientes" + (q ? "?q=" + encodeURIComponent(q) : "")); } catch (e) { GM.aviso(e.message, true); return; }
    if (meu !== pedido) return; // chegou resposta de uma busca antiga
    if (!q) $("total").textContent = t("totalClientes")(r.clientes.length);
    $("lista").innerHTML = r.clientes.map(c => {
      const atrasado = c.vence && !c.proxima && c.vence <= r.hoje;
      return `<li><button type="button" class="cli" data-id="${c.id}">
        <span class="cli-nome"><b>${esc(c.nome)}</b>${c.empresa ? ` <span class="suave">· ${esc(c.empresa)}</span>` : ""}</span>
        <span class="cli-end">📍 ${esc(c.endereco)}</span>
        ${c.telefone ? `<span class="cli-tel">📞 ${esc(fmtTel(c.telefone))}</span>` : ""}
        <span class="cli-datas">
          <span>${esc(t("ultima"))}: <b>${esc(c.ultima ? curta(c.ultima) : t("nunca"))}</b></span>
          ${c.proxima ? `<span class="chip ok">${esc(t("proxima"))}: ${esc(curta(c.proxima))}</span>` : ""}
          ${c.lembrete_meses ? `<span class="chip ${atrasado ? "alerta" : ""}">🔔 ${esc(t("lembreteN")(c.lembrete_meses))}${c.vence && !c.proxima ? " · " + esc(curta(c.vence)) : ""}</span>` : ""}
        </span>
      </button></li>`;
    }).join("") || `<li class="vazio grande">${esc(q ? t("nenhumAchado") : t("semClientes"))}</li>`;
    $("lista").querySelectorAll("[data-id]").forEach(b => b.addEventListener("click", () => GM.fichaCliente(b.dataset.id, carregar)));
  }

  let espera;
  $("busca").addEventListener("input", () => { clearTimeout(espera); espera = setTimeout(carregar, 250); });
  $("novo").addEventListener("click", () => GM.formCliente(null, id => { carregar(); if (id) GM.fichaCliente(id, carregar); }));
  carregar();
})();
