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
| `img/pressure-washing.jpg` | Lavagem com alta pressão |
| `img/solar.jpg` | Limpeza de painéis solares (foto do Pexels, uso comercial livre) |
| `img/logo.png` | Logo redonda (topo e rodapé) |
| `img/logo-full.png` | Logo completa (reserva) |
| `img/work-1.jpg` a `img/work-23.jpg` | Galeria "Recent work" (ordem definida em `FOTOS.work`; work-11 a 13 são as fotos do Instagram que o cliente pediu, 28/out) |

As fotos de cada serviço aparecem na página e também no questionário de orçamento.

## Orçamento

O questionário monta uma mensagem com todas as respostas. O cliente envia por SMS (principal), WhatsApp ou e-mail com um toque. Não precisa de servidor.

## Privacidade nas fotos

Antes de publicar qualquer foto nova, conferir se aparece número de casa, placa de carro, rosto de cliente ou nome de empresa. Já foram borrados: os números das casas (pressure-washing.jpg e work-1.jpg) a placa na parede (work-2.jpg) e a placa da construtora "greydoor" (work-13.jpg). A logo do banco Amerant em commercial.jpg fica sem borrar, a pedido do Fellipe (28/out).

Site feito por [Fellipe Pinho](https://github.com/felliperobertopinhopires-tech) · PineWeb

## Inglês e espanhol

O site tem os dois idiomas na mesma página, com o botão EN/ES no topo. Sempre abre em inglês (pedido do Fellipe, 28/out). O espanhol só aparece quando a pessoa clica em ES ou abre um link com `?lang=es` (ex.: https://glassmaster.pages.dev/?lang=es).

- Textos fixos da página: o inglês fica no próprio HTML (marcado com `data-i18n`) e o espanhol no objeto `TEXT_ES` do script.
- Serviços e perguntas do orçamento: `SERVICES_EN` / `SERVICES_ES` e `CONTACT_Q_EN` / `CONTACT_Q_ES`. Ao mudar um serviço, mudar nos dois.
- Botões, avisos e a mensagem de orçamento: objeto `UI` (`en` e `es`). O pedido chega no idioma que o cliente usou.
- Privacidade: `privacy.html` (inglês) e `privacy-es.html` (espanhol). Se mudar uma, mudar a outra.

## Avaliações

Botão "Read our reviews on Google" na seção de trabalhos recentes, ligado ao perfil do Google GLASSMASTER GPM CORP (`CONFIG.reviews`). O site não mostra nota nem depoimento copiado: só o link para as avaliações reais no Google.
