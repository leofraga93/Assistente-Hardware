# Guia de continuidade e dicionário documental

Este arquivo é o índice curto para retomar trabalho entre sessões. Não substitui o PRD da
iniciativa nem a spec; aponta para eles e registra o estado da transição documental.

## Fonte de verdade por assunto

| Documento                             | Responsabilidade                                                                  | Alterar quando                                             |
| ------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `AGENTS.md`                           | Contrato estável: regras permanentes, arquitetura-base e restrições globais       | Somente por decisão explícita do usuário                   |
| `docs/prd/ARCHITECTURE.md`            | Arquitetura atual, modelo de dados, domínios, invariantes e checklist transversal | Mudança estrutural ou atualização do estado geral          |
| `docs/prd/AAAA-MM-DD-<iniciativa>.md` | Objetivo, escopo, estado, checklist e entrega de uma iniciativa                   | Ao planejar, iniciar, bloquear ou concluir a iniciativa    |
| `docs/specs/<spec-existente>.md`      | Contrato técnico e critérios do que deve ser implementado                         | Ler para implementar; não editar specs existentes          |
| Este guia                             | Mapa de documentos, regras de navegação e ponto de retomada                       | Ao mudar a organização documental ou o próximo passo ativo |

## Fluxo de trabalho

1. Leia `AGENTS.md` e este guia. Abra somente o PRD relacionado à solicitação e as seções
   relevantes de `docs/prd/ARCHITECTURE.md`.
2. Localize o PRD da iniciativa. Se não existir, crie-o em `docs/prd/` antes de implementar,
   com objetivo, escopo, fora de escopo, estado, checklist e links para specs existentes.
3. Consulte a spec existente relacionada. Se não houver spec aplicável, registre essa lacuna no
   PRD e crie spec somente para a iniciativa nova, antes de implementar.
4. Implemente apenas o escopo e os critérios definidos. Valide o modelo contra domínios, FKs e
   invariantes de `docs/prd/ARCHITECTURE.md` quando a mudança tocar essas áreas.
5. Na entrega, atualize o PRD original: marque os critérios/checklist concluídos, registre
   arquivos e validações e ajuste o estado da iniciativa. Não altere a spec existente.
6. Atualize o próximo passo neste guia apenas se a sessão deixar trabalho pendente ou bloqueado.
   Não faça commit sem solicitação explícita.

## Vocabulário de estado

- `Planejada`: escopo registrado, trabalho ainda não iniciado.
- `Em andamento`: implementação ou validação em curso.
- `Bloqueada`: depende de decisão, acesso ou entrega externa; registrar o bloqueio no PRD.
- `Entregue`: critérios aceitos, validação registrada e checklist atualizado no PRD.
- Checklist: `[ ]` pendente; `[x]` concluído. O PRD, não a spec, é a fonte atual do andamento.

## Inventário das specs existentes

As specs abaixo foram preservadas sem edição nesta migração. Algumas são referências legadas cujo
vínculo e estado ainda precisam ser consolidados em PRDs; não inferir que estão implementadas só
porque foram escritas ou aprovadas.

| Spec existente                                                         | Situação no registro PRD                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| `2026-09-20-autenticacao-admin-jwt-backend.md`                         | Vincular a PRD de iniciativa                                |
| `2026-09-20-hero-section-menu-sticky-frontend.md`                      | Vincular a PRD de iniciativa                                |
| `2026-09-20-modais-recomendacao-grupos-compra-frontend.md`             | Vincular a PRD de iniciativa                                |
| `2026-09-20-navegacao-menu-superior-posicionamento-wizard-frontend.md` | Vincular a PRD de iniciativa                                |
| `2026-09-20-painel-admin-cadastro-produtos-frontend.md`                | Vincular a PRD de iniciativa                                |
| `2026-09-20-paleta-cores-organica-5-tonalidades-frontend.md`           | Vincular a PRD de iniciativa                                |
| `2026-09-20-redirecionador-dinamico-links-afiliados-backend.md`        | Vincular a PRD de iniciativa                                |
| `2026-09-20-renderizacao-video-tematico-loop-frontend.md`              | Vincular a PRD de iniciativa                                |
| `2026-09-20-reorganizacao-docs-spec-first.md`                          | Entrega documental registrada em `docs/prd/ARCHITECTURE.md` |
| `2026-09-20-rodape-institucional-botao-voltar-ao-topo-frontend.md`     | Vincular a PRD de iniciativa                                |
| `2026-09-20-tema-claro-padrao-alternancia-modo-escuro-frontend.md`     | Vincular a PRD de iniciativa                                |
| `2026-09-20-validacao-bloqueio-compatibilidade-backend.md`             | Entrega funcional registrada; consolidar vínculo com PRD    |
| `2026-09-20-vercel-wizard-objetivo-sem-catalogo.md`                    | API de produção pendente em `docs/prd/ARCHITECTURE.md`      |
| `2026-09-20-wizard-erro-amigavel-catalogo.md`                          | Entrega funcional registrada em `docs/prd/ARCHITECTURE.md`  |

Não corrigir, renomear ou reescrever esse acervo como parte de uma implementação. Ao retomar uma
spec legada, criar/vincular seu PRD e refletir nele o estado real após conferir o código e os
critérios; preservar o arquivo da spec.

## Ponto de retomada

- Ordem oficial de execução das specs: `docs/prd/2026-09-29-ordem-execucao-specs.md`.
  Consultar antes de iniciar qualquer spec pendente; cada feature ainda precisa de PRD próprio.
- Migração atual: contrato estável em `AGENTS.md`, processo descrito aqui e registrado em
  `docs/prd/2026-09-29-governanca-documental.md`.
- Checklist transversal: `docs/prd/ARCHITECTURE.md`, seção 2.
- Iniciativa ativa: `docs/prd/2026-09-30-preparacao-backend-railway.md`. Backend já lê `PORT` e
  passou smoke tests locais em porta alternativa; próximo passo externo é configurar Root
  Directory `workspace/backend` no Railway, publicar, copiar o domínio público HTTPS para
  `VITE_API_BASE` no Vercel e então executar os testes remotos indicados no PRD. H2 atende ao
  catálogo seedado; decidir Postgres persistente antes de CRUD ou edição durável.
- Não alterar as specs existentes; confirmar critérios no código e registrar estado apenas no PRD.
- Alterações locais preexistentes observadas durante esta migração: pasta `.vscode/` não rastreada;
  preservar sem tocar.
