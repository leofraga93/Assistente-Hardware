# PRD: Governança documental e continuidade de trabalho

- Estado: Entregue
- Data: 2026-09-29
- Documento de arquitetura relacionado: `docs/prd/ARCHITECTURE.md`
- Guia de retomada: `docs/prd/GUIA_CONTINUIDADE.md`

## Objetivo

Separar regras permanentes, planejamento/andamento e especificação de implementação, com um
registro curto que permita retomar o trabalho sem reler todo o histórico.

## Escopo

- Fixar `AGENTS.md` como contrato estável, alterável somente por decisão explícita do usuário.
- Usar PRDs em `docs/prd/` como fonte de escopo, estado, checklist e registro de entrega.
- Manter specs em `docs/specs/` como contratos do que implementar, sem editar as specs existentes.
- Criar dicionário de documentos e ponto de retomada para sessões futuras.

## Fora de escopo

- Implementar as funcionalidades descritas nas specs existentes.
- Reescrever, renomear ou atualizar o status dentro das specs existentes.
- Publicar a API Java ou alterar o comportamento do produto.

## Critérios e checklist

- [x] `AGENTS.md` contém regras permanentes e instrução para não alterá-lo sem decisão explícita.
- [x] O fluxo define PRD como dono do andamento/checklist e spec como contrato de implementação.
- [x] O guia lista onde registrar cada informação e como retomar a sessão.
- [x] As specs existentes foram mantidas sem edição.
- [x] `ARCHITECTURE.md` registra a governança e o trabalho de triagem restante.

## Entrega

- Arquivos atualizados/criados: `AGENTS.md`, `docs/prd/ARCHITECTURE.md`, este PRD e
  `docs/prd/GUIA_CONTINUIDADE.md`.
- Validação: revisão de consistência documental e `git diff --check`.
- Próximo passo documental: usar `docs/prd/2026-09-29-ordem-execucao-specs.md` como fila e
  vincular cada spec legada ao PRD da iniciativa quando ela for iniciada, sem modificar as specs.
