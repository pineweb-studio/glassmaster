// Tela de login do painel
"use strict";
(() => {
  const { t } = GM;
  const $ = id => document.getElementById(id);
  $("olho").textContent = t("areaDono");
  $("titulo").textContent = t("tituloEntrar");
  $("rot-senha").textContent = t("senha");
  $("entrar").textContent = t("entrar");
  $("voltar").textContent = t("voltarSite");
  $("idioma").textContent = t("idioma");
  $("idioma").addEventListener("click", GM.trocarIdioma);
  document.title = t("entrar") + " · GlassMaster";

  // Só volta para páginas do próprio painel (evita redirecionar para site de fora)
  const destino = () => {
    const v = GM.param("voltar") || "";
    return /^\/admin\/[a-z]+(\.html)?$/.test(v) ? v : "agenda";
  };
  fetch("/api/admin/sessao", { credentials: "same-origin", cache: "no-store" }).then(r => { if (r.ok) location.replace(destino()); }).catch(() => {});

  $("form").addEventListener("submit", async ev => {
    ev.preventDefault();
    const bt = $("entrar"), erro = $("erro");
    bt.disabled = true; erro.textContent = "";
    try {
      await GM.api("login", { senha: $("senha").value });
      location.replace(destino());
    } catch (e) { erro.textContent = e.message; bt.disabled = false; $("senha").select(); }
  });
})();
