# AGENTS.md — Regras globais para agentes de IA

Leia este arquivo no início de cada sessão. Regras daqui valem para qualquer tarefa.
Detalhe de produto, ENUMs, fluxos e checklist vivem em `docs/prd/ARCHITECTURE.md`, não aqui.

## Contexto obrigatório (ordem de leitura)

1. Este arquivo (`AGENTS.md`).
2. `docs/prd/ARCHITECTURE.md` — mapa do produto, checklist, modelo de dados e histórico.
3. A spec da interação em `docs/specs/` (criar ou abrir antes de implementar).

Atualize `docs/prd/ARCHITECTURE.md` ao final de cada interação (histórico, posição atual e
checklist) para servir de contexto persistente e indicador de próximo passo.

## Fluxo Spec-first (obrigatório)

Toda implementação a partir de 2026-09-20 segue spec, para reduzir tokens e manter controle:

1. Antes de codificar, criar ou atualizar um arquivo em `docs/specs/` com objetivo, escopo,
   fora de escopo, critérios de aceite e o **item do checklist** em `docs/prd/ARCHITECTURE.md`
   ao qual a spec se refere.
2. Implementar somente o que a spec descreve. Sem a spec, não implementar.
3. Ao entregar, marcar o item correspondente do checklist como concluído e registrar a spec
   como entregue (status + data). Spec sem item de checklist não é entregue.
4. Specs são curtas e objetivas. Não copiar o PRD inteiro para a spec.

## Validação obrigatória antes de implementar

Validar a proposta contra `docs/prd/ARCHITECTURE.md`:

1. ENUMs e domínios da seção 6 (nenhum valor inventado).
2. Chaves estrangeiras e relacionamentos da seção 6.
3. Invariantes da seção 7.
4. Estado e checklist das seções 2 a 5.

Se divergir, ajustar a proposta ou atualizar o PRD **antes** de implementar.

A regra de ouro detalhada permanece na seção 1 do PRD.

## Regras transversais

- Não usar emoji em nenhuma circunstância: respostas, arquivos, UI, commits, docs ou código.
  Ícones somente via Font Awesome (SVG core + `FontAwesomeIcon`), conforme seção 10 do PRD.
  Separadores de texto (`&middot;`, `\u00B7`, `\u2014`) não são ícones.
- Não comentar código sem necessidade.
- Manter textos em português seguindo o padrão existente em cada parte do código.
- Não commitar sem pedido explícito do usuário.
