# Site da GlassMaster Cleaning

Site feito pela PineWeb. Arquivo único (`index.html`), publicado no Cloudflare Pages (ligado ao repositório do GitHub).

## Dados da empresa

No começo do `<script>`, no objeto `CONFIG`: telefone (como aparece e só os dígitos com o código do país, ex. `14075551234`), e-mail e área de atendimento.

## Fotos

Suba na pasta `img/` com o nome exato abaixo (`.jpg`, de preferência na horizontal). Enquanto a foto não existir, aparece um fundo azul.

| Arquivo | Onde aparece |
|---|---|
| `img/hero.jpg` | Topo do site no computador (horizontal) |
| `img/hero-mobile.jpg` | Topo do site no celular (vertical) |
| `img/residential.jpg` | Limpeza de vidros residenciais |
| `img/commercial.jpg` | Limpeza de vidros comerciais |
| `img/hard-water.jpg` | Remoção de manchas de água dura |
| `img/pressure-washing-before-after.jpg` | Lavagem com alta pressão (antes e depois do deck da piscina, escolhido pelo Fellipe em 7/nov) |
| `img/solar.jpg` | Limpeza de painéis solares (foto do Pexels, uso comercial livre) |
| `img/logo.png` | Logo redonda (topo e rodapé) |
| `img/logo-full.png` | Logo completa (reserva) |
| `img/work-1.jpg` a `img/work-9.jpg` e `img/work-11.jpg` a `img/work-33.jpg` (sem 17 e 32) | Galeria "Recent work" (ordem definida em `FOTOS.work`; work-11 a 13 são as fotos do Instagram que o cliente pediu e work-14 a 24 vêm da pasta Site-2 do cliente, 28/out; work-25 a 33 e as versões atuais de work-11 e 13 vêm das fotos que o cliente mandou por WhatsApp, 28/out) |
| `img/before-after/par1..par4-before.jpg` e `-after.jpg` | Seção "Before & after" (par3 deck da piscina e par4 corredor lateral, fotos de WhatsApp, 28/out) |

As fotos de cada serviço aparecem na página e também no questionário de orçamento.

## Orçamento

O questionário monta uma mensagem com todas as respostas. O cliente envia por SMS (principal), WhatsApp ou e-mail com um toque. Não precisa de servidor.

## Privacidade nas fotos

Regra do Fellipe (28/out): foto com sujeira no vidro ou no chão não entra na galeria, vai para o antes e depois. Antes de publicar qualquer foto nova, conferir se aparece número de casa, placa de carro, rosto de cliente ou nome de empresa. Já foram borrados: os números das casas (pressure-washing.jpg e work-1.jpg) a placa na parede (work-2.jpg) a placa da construtora "greydoor" (work-13.jpg) e os números das lojas "420" (work-16.jpg) e "15" (work-24.jpg). A logo do banco Amerant em commercial.jpg fica sem borrar, a pedido do Fellipe (28/out).

Site feito por [Fellipe Pinho](https://github.com/felliperobertopinhopires-tech) · PineWeb

## Inglês e espanhol

O site tem os dois idiomas na mesma página, com o botão EN/ES no topo. Sempre abre em inglês (pedido do Fellipe, 28/out). O espanhol só aparece quando a pessoa clica em ES ou abre um link com `?lang=es` (ex.: https://glassmastercleaning.com/?lang=es).

- Textos fixos da página: o inglês fica no próprio HTML (marcado com `data-i18n`) e o espanhol no objeto `TEXT_ES` do script.
- Serviços e perguntas do orçamento: `SERVICES_EN` / `SERVICES_ES` e `CONTACT_Q_EN` / `CONTACT_Q_ES`. Ao mudar um serviço, mudar nos dois.
- Botões, avisos e a mensagem de orçamento: objeto `UI` (`en` e `es`). O pedido chega no idioma que o cliente usou.
- Privacidade: `privacy.html` (inglês) e `privacy-es.html` (espanhol). Se mudar uma, mudar a outra.

## Avaliações

Botão "Read our reviews on Google" na seção de trabalhos recentes, ligado ao perfil do Google GLASSMASTER GPM CORP (`CONFIG.reviews`). O site não mostra nota nem depoimento copiado: só o link para as avaliações reais no Google.

## SEO local (padrão Pine Web, 31/out)

Segue o PDF "Padrão SEO Pine Web". O que já está no site, sem mudar o visual:
- title e meta description com serviço + região, Open Graph, Twitter card, canonical e hreflang (en-US na raiz, es-US em `?lang=es`, cada um com o próprio canonical);
- JSON-LD com a empresa (cidades e condados atendidos, catálogo dos 5 serviços, Instagram), o site e o FAQ (o texto do FAQPage tem que ser igual ao FAQ visível);
- H1 único: a linha pequena do topo ("Window cleaning & pressure washing in South Florida"); o slogan virou parágrafo com o mesmo estilo;
- links de SMS, WhatsApp, e-mail e Instagram escritos direto no HTML, com `title`;
- alt descritivo em todas as fotos (`PHOTO_ALT` no script, inglês e espanhol; foto nova na galeria precisa de alt novo lá);
- nome, serviço + região, telefone e e-mail como texto no rodapé (igual ao perfil do Google);
- `robots.txt` e `sitemap.xml`.
Domínio próprio no ar desde 1/nov/2026: https://glassmastercleaning.com (comprado na conta Cloudflare da PineWeb, registrante GLASSMASTER GPM CORP, vence 1/nov/2027, renovação automática). Canonical, Open Graph, JSON-LD, hreflang, robots.txt e sitemap.xml já usam o domínio. O endereço glassmaster.pages.dev continua abrindo o mesmo site.

## Painel do dono (/admin): agenda, clientes e lembretes

Sistema privado do Greg em https://glassmastercleaning.com/admin/ (pedido do Fellipe, 9/nov/2026). Funciona no celular como um app e tem português/inglês (menu **Mais**).

- **Agenda** (tela principal): lista dos próximos dias com o horário em destaque (hoje e amanhã sempre aparecem) ou calendário do mês. Cada visita mostra cliente, empresa, serviço, endereço (abre no mapa), botões Ligar/Mensagem e "Feito ✓". Avisa se dois horários batem.
- **Clientes**: cadastro por cliente com nome, empresa (opcional), telefone (opcional), endereço, observações e lembrete. Ficha com última limpeza, próxima marcada e histórico. Excluir cliente apaga todo o histórico dele (direito de exclusão).
- **Lembretes**: lembrete opcional por cliente (a cada 1, 2, 3, 4, 6 ou 12 meses, contado da última limpeza). Mostra quem está vencendo nos próximos 30 dias, com botão de agendar e de mandar mensagem pronta. Todo dia às 9h (Flórida) um e-mail vai para o Greg com os clientes que entram no prazo (cada cliente uma vez por ciclo).
- **Mais**: idioma, segurança (últimos acessos e "desconectar todos"), trocar senha, baixar planilha (CSV) e sair.

### Como funciona (tudo grátis no Cloudflare)

- `functions/api/[[rota]].js`: servidor (Pages Functions), tudo em `/api/admin/...`. `functions/_middleware.js` + `_routes.json` impedem baixar o código pelo site e deixam o resto do site estático.
- `lib/`: banco D1 (tabelas criadas sozinhas), senha/sessões (`acesso.js`) e clientes/agenda/lembretes (`dados.js`).
- `admin/`: telas (HTML + JS + CSS, sem nada inline nem de fora).
- `lembretes/`: Worker separado que roda todo dia (cron) e manda o e-mail pelo Cloudflare Email Routing.

### Segurança e proteção de dados

- Senha só no Cloudflare (segredo `ADMIN_SENHA`, mínimo 12 caracteres); depois de "Trocar senha" o banco guarda só o hash PBKDF2. Nada de senha no GitHub.
- Sessão: código aleatório de 256 bits em cookie `__Host-` HttpOnly, Secure, SameSite=Strict, 7 dias; o banco guarda só o hash. Sair invalida no servidor; "Desconectar todos" e trocar senha derrubam todas as sessões.
- Força bruta: 5 senhas erradas bloqueiam o IP por 15 min; 30 erradas em 1 hora (vários IPs) travam o login por 15 min.
- Registro de acessos (90 dias) na tela Segurança para o Greg ver se alguém tentou entrar.
- CSRF: pedido que muda dados só vale do próprio site (Origin + Sec-Fetch-Site) e só em JSON.
- XSS: tudo que vem do banco é escapado; CSP do `/admin` só aceita código do próprio site (`script-src 'self'`, sem inline).
- Validação no servidor de todo campo (tamanho, data real, hora, telefone EUA de 10 dígitos ou +país, opções fixas). SQL sempre com parâmetros.
- `/admin` com `noindex`, `no-store` e `no-referrer`. Planilha exportada protegida contra fórmula maliciosa.
- Dados: só o necessário (sem e-mail nem documento do cliente). Política de privacidade (EN/ES) explica o registro de clientes, prazo de 3 anos e pedido de exclusão.
- Camada extra opcional (recomendada): Cloudflare Zero Trust Access (grátis até 50 pessoas) na frente de `/admin/*` e `/api/admin/*`, pedindo código no e-mail do Greg antes da senha.

### Ligar no Cloudflare (uma vez só)

1. Storage & Databases > D1 > **Create database**, nome `glassmaster`.
2. Workers & Pages > projeto `glassmaster` > Settings > **Bindings** > Add > D1 database: variável `DB`, banco `glassmaster` (Production).
3. Settings > **Variables and Secrets** > Add > tipo *Secret*, nome `ADMIN_SENHA`, valor = senha forte (12+ caracteres, ex.: uma frase).
4. Deployments > **Retry deployment** (ou um push no `main`).
5. Abrir https://glassmastercleaning.com/admin/, entrar e usar **Mais > Trocar senha**.

E-mail diário (depois que o Email Routing do domínio estiver ligado e o Gmail do Greg verificado em *Destination addresses*):

6. Colar o ID do banco (D1 > glassmaster) em `lembretes/wrangler.toml` no lugar de `COLE_AQUI_O_ID_DO_BANCO`.
7. Workers & Pages > Create > **Import a repository** > `pineweb-studio/glassmaster`, *Root directory* `lembretes`. O cron (13:00 UTC) já vem do `wrangler.toml`.

### Testar no computador

`npx wrangler pages dev . --d1 DB=glassmaster` com um `.dev.vars` contendo `ADMIN_SENHA=uma-senha-de-teste-longa`. Abrir http://localhost:8788/admin/. Lembretes: `cd lembretes && npx wrangler dev --test-scheduled` e abrir `/__scheduled`.
