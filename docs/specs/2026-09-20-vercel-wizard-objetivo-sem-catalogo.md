# Spec: wizard Objetivo sem itens na Vercel

- Status: diagnosticada (correcao de deploy pendente)
- Data: 2026-09-20
- Checklist no PRD: secao 2 — "Publicar API /api/catalogo junto com o frontend na Vercel"

## Objetivo

Na producao (`https://assistente-hardware.vercel.app`), apos Avancar para o passo Objetivo,
os cards de objetivo nao aparecem. O passo Orcamento continua visivel porque e estatico.

## Causa confirmada

O `vercel.json` so instala e faz build do frontend (`workspace/frontend`). O frontend chama
`GET /api/catalogo` na mesma origem (`api.js`, `API_BASE = ''`).

Verificacao: a home da Vercel responde 200 (SPA). `GET /api/catalogo` na Vercel responde **404**.
O `App.jsx` captura o erro e define `catalogo` como `null`. Os objetivos vem de
`(catalogo?.jogos || []).filter(tipo === 'OBJETIVO')` — lista vazia. `ObjectiveStep` nao tem
estado vazio; so o titulo. O passo Jogos tem fallback de "Carregando...". Orcamento nao usa API.

O backend Spring Boot (`:8080`, seed H2) nao e publicado na Vercel. O proxy `/api` do Vite
existe so em `vite.config.js` (dev local). Versionamento do frontend na Vercel esta correto;
falta o servidor da API.

## Escopo da correcao (proxima entrega)

- Expor `GET /api/catalogo` (e demais rotas `/api/*` usadas pelo front) em producao.
- Fazer o frontend apontar para essa API (env `VITE_API_BASE` ou rewrites), sem inventar ENUMs.
- No passo Objetivo, mostrar estado vazio/erro quando o catalogo falhar (paridade com Jogos).
  Entregue na spec `2026-09-20-wizard-erro-amigavel-catalogo.md`.

## Fora de escopo desta spec

- Reescrever o algoritmo de recomendacao.
- Migrar persistencia para PostgreSQL gerenciado (so se o host da API exigir).

## Criterios de aceite (quando implementar)

- [ ] Na Vercel, `GET /api/catalogo` retorna 200 com jogos `tipo: OBJETIVO` e `tipo: JOGO`.
- [ ] Passo Objetivo renderiza os quatro cards do seed (Estudos, Trabalho, Lazer, Escritorio).
- [ ] Passo Jogos lista os titulos do catalogo.
- [x] Falha de API visivel no wizard, nao tela em branco
      (spec `2026-09-20-wizard-erro-amigavel-catalogo.md`).
