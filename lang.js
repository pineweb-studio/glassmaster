/* the Spanish version (?lang=es) is its own canonical page */
if (new URLSearchParams(location.search).get("lang") === "es") { document.getElementById("canonical").href = "https://glassmastercleaning.com/?lang=es"; document.documentElement.lang = "es"; }
