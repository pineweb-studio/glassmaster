// Lembretes de limpeza: quem está chegando no prazo (2 a 3 meses depois da última limpeza)
"use strict";
(() => {
  const { t, esc, api, fmtData, difDias } = GM;
  GM.montarTopo();
  const $ = id => document.getElementById(id);
  $("titulo").textContent = t("lembretes");
  $("olho").textContent = t("lembretesOlho");
  $("ajuda").textContent = t("precisamAjuda");
  $("nota-email").textContent = "✉️ " + t("avisoEmail");
  document.title = t("lembretes") + " · GlassMaster";
  const curta = iso => fmtData(iso, { day: "numeric", month: "short", year: "numeric" });

  async function carregar() {
    let r;
    try { r = await api("lembretes"); } catch (e) { $("devidos").innerHTML = `<p class="erro-msg">${esc(e.message)}</p>`; return; }
    GM.atualizarSelo();
    $("devidos").innerHTML = `<h2>${esc(t("precisam"))}</h2>` + (r.devidos.map(c => {
      const dias = difDias(r.hoje, c.vence);
      const prazo = dias <= 0 ? t("vencidoHa")(-dias) : t("venceEm")(dias);
      const primeiro = c.nome.split(" ")[0];
      const fone = c.telefone ? GM.telLink(c.telefone) : "";
      const sms = fone ? `sms:${fone}${/iPhone|iPad|Mac/.test(navigator.userAgent) ? "&" : "?"}body=${encodeURIComponent(t("sms_texto")(primeiro, c.lembrete_meses))}` : "";
      return `<article class="lem ${dias <= 0 ? "atrasado" : ""}">
        <div class="lem-topo"><button type="button" class="ag-nome" data-ficha="${c.id}">${esc(c.nome)}${c.empresa ? ` <span class="suave">· ${esc(c.empresa)}</span>` : ""}</button>
          <span class="chip ${dias <= 0 ? "alerta" : ""}">${esc(prazo)}</span></div>
        <p class="suave">${esc(t("ultima"))}: <b>${esc(curta(c.ultima))}</b> · ${esc(t("lembreteN")(c.lembrete_meses))}</p>
        <p class="suave">📍 ${esc(c.endereco)}</p>
        <div class="acoes">
          <button type="button" class="btn mini primario" data-agendar="${c.id}">+ ${esc(t("agendar"))}</button>
          ${sms ? `<a class="btn mini" href="${esc(sms)}">💬 ${esc(t("sms"))}</a><a class="btn mini" href="tel:${esc(fone)}">📞 ${esc(t("ligar"))}</a>` : ""}
          <button type="button" class="btn mini link" data-desligar="${c.id}">${esc(t("desligarLembrete"))}</button>
        </div>
      </article>`;
    }).join("") || `<p class="vazio grande">${esc(t("nenhumDevido"))}</p>`);

    $("sem-limpeza").innerHTML = r.sem_limpeza.length ? `<h2>${esc(t("semLimpeza"))}</h2><p class="suave">${esc(t("semLimpezaAjuda"))}</p>
      <ul class="simples">${r.sem_limpeza.map(c => `<li><button type="button" class="btn link" data-ficha="${c.id}">${esc(c.nome)}${c.empresa ? " · " + esc(c.empresa) : ""}</button></li>`).join("")}</ul>` : "";

    document.querySelectorAll("[data-ficha]").forEach(b => b.addEventListener("click", () => GM.fichaCliente(b.dataset.ficha, carregar)));
    document.querySelectorAll("[data-agendar]").forEach(b => b.addEventListener("click", () => GM.formAgendamento({}, { cliente_id: Number(b.dataset.agendar) }, carregar)));
    document.querySelectorAll("[data-desligar]").forEach(b => b.addEventListener("click", async () => {
      try { await api("clientes/lembrete", { id: Number(b.dataset.desligar), lembrete_meses: 0 }); GM.aviso(t("lembreteDesligado")); carregar(); }
      catch (e) { GM.aviso(e.message, true); }
    }));
  }
  carregar();
})();
