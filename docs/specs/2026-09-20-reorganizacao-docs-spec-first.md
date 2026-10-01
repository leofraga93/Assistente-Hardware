# Spec: reorganizacao de docs e fluxo spec-first

- Status: entregue
- Data: 2026-09-20
- Checklist no PRD: secao 2 — "Estrutura docs/prd + docs/specs e fluxo spec-first"

## Objetivo

Separar regras globais de mapa de produto. Cada implementacao futura deve ter spec curta
ligada a um item do checklist, para reduzir tokens e dar controle sobre o que entra no codigo.

## Escopo

- Manter `AGENTS.md` na raiz com regras globais (incluindo spec-first e proibicao de emoji).
- Mover o mapa/checklist para `docs/prd/ARCHITECTURE.md`.
- Criar `docs/specs/` e esta spec.
- Registrar no PRD a investigacao do wizard Objetivo vazio na Vercel (spec irma).

## Fora de escopo

- Hospedar o backend Spring Boot.
- Alterar o fluxo visual do wizard alem do que a spec irma exigir.

## Criterios de aceite

- [x] `AGENTS.md` aponta para `docs/prd/ARCHITECTURE.md` (nao mais para a raiz).
- [x] Regras globais (emoji/Font Awesome, spec-first, nao commitar sem pedido) estao em `AGENTS.md`.
- [x] PRD atualizado (caminhos, checklist, historico, causa Vercel).
- [x] Spec entregue marcada no checklist do PRD.
