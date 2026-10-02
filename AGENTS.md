# AGENTS.md — Contrato estável do projeto

Este arquivo é o contrato permanente para agentes. Não o altere durante tarefas comuns;
mudanças exigem decisão explícita do usuário. Mantenha-o curto para reutilização entre sessões.

## Regras de negócio e arquitetura

- Não inventar ENUMs, domínios, relacionamentos, chaves estrangeiras ou invariantes. A fonte
  canônica e detalhada é `docs/prd/ARCHITECTURE.md`.
- Preservar compatibilidade de plataforma CPU/placa-mãe, tipo e slots de RAM, potência da fonte,
  orçamento e demais invariantes definidos no PRD.
- Frontend: React + Vite + Tailwind. Ícones exclusivamente Font Awesome via SVG core e
  `FontAwesomeIcon`; nunca usar emoji como ícone ou conteúdo.
- Não voltar a exibir badges de proposta de valor no hero/wizard (`Simples para quem nao entende
de hardware`) nem no cabeçalho (`Recomendacoes inteligentes`); não criar equivalentes com a mesma
  função promocional nesses locais.
- Controle de tema do cabeçalho deve ser switch deslizante com estado visível, não botão estático
  somente com ícone.
- Backend: Java 17 + Spring Boot. O deploy Vercel é apenas do frontend; a API exige host próprio.
- Não adicionar comentários de código sem necessidade. Manter o idioma e estilo já usados na
  área modificada. Não commitar sem pedido explícito.

## Governança da documentação

- Para retomar contexto, leia `docs/prd/GUIA_CONTINUIDADE.md`; ele aponta o PRD e a spec exatos.
- PRDs em `docs/prd/` são a fonte do escopo, estado, checklist e registro de entrega. Atualize o
  PRD relacionado ao iniciar e concluir uma iniciativa.
- Specs em `docs/specs/` descrevem o que implementar e seus critérios de aceite. Implemente
  somente o escopo da spec vinculada ao PRD.
- Specs existentes são preservadas: não editar, renomear nem reescrever durante a implementação.
  Registrar progresso e conclusão no PRD. Criar spec apenas para iniciativa nova sem spec válida.
- Antes de implementar, consulte apenas o PRD e a spec relacionados, além das seções canônicas
  de arquitetura necessárias. Não releia toda a documentação sem necessidade.
- Ao concluir, atualizar o checklist/estado do PRD, anotar arquivos e validações e deixar o
  próximo passo claro no guia de continuidade quando houver trabalho em andamento.
