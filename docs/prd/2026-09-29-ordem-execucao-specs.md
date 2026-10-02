# PRD: Ordem de execução das specs existentes

- Estado: Planejada
- Data: 2026-09-29
- PRD transversal relacionado: `docs/prd/ARCHITECTURE.md`
- Guia documental: `docs/prd/GUIA_CONTINUIDADE.md`
- Specs de origem: arquivos preservados em `docs/specs/` e listados neste documento

## Objetivo

Definir uma ordem de implementação orientada por dependências e separar entregas concluídas,
trabalho pendente e decisões que precisam ser resolvidas antes de codificar.

## Regras de execução

- Esta ordem é um roteiro, não autorização para implementar tudo em lote.
- Antes de iniciar cada feature, criar seu PRD de iniciativa com estado, checklist e o link da
  spec de origem. Atualizar esse PRD no início, em bloqueios e na entrega.
- Não editar, renomear ou reescrever as specs existentes. PRDs passam a ser a fonte do andamento.
- Status "aprovado", "validado" ou "em conformidade" na spec não significa que a feature esteja
  implementada. Confirmar critérios no código e registrar o resultado no PRD da iniciativa.
- Não introduzir campos, entidades, rotas ou domínios que não estejam aprovados no modelo canônico.

## Fila recomendada

### Etapa 0 — Concluídas; não reimplementar

- `docs/specs/2026-09-20-reorganizacao-docs-spec-first.md` — estrutura documental inicial.
- `docs/specs/2026-09-20-validacao-bloqueio-compatibilidade-backend.md` — validação de
  compatibilidade no backend; 12 testes já registrados.
- `docs/specs/2026-09-20-wizard-erro-amigavel-catalogo.md` — estados de erro/carregamento e
  `VITE_API_BASE` no frontend.
- Build do frontend no Vercel: ajuste operacional já registrado em
  `docs/prd/ARCHITECTURE.md`; não confundir com publicar a API Java.

### Etapa 1 — Desbloquear o catálogo em produção

1. `docs/specs/2026-09-20-vercel-wizard-objetivo-sem-catalogo.md`
   - **Host recomendado: Railway** para este MVP Java/Spring, principalmente pela tentativa já
     iniciada e pelo fluxo documentado de deploy Spring Boot. Configurar Root Directory do serviço
     como `workspace/backend` (ou comandos de build/start equivalentes), publicar o serviço e
     validar `GET /api/catalogo` diretamente no domínio público Railway.
   - O Railway injeta `PORT`; Spring está preparado para escutá-la usando `${PORT:8080}` e manter
     8080 como padrão local (implementação registrada em
     `docs/prd/2026-09-30-preparacao-backend-railway.md`).
   - Na Vercel, definir `VITE_API_BASE` com a URL pública HTTPS completa da API, sem barra final;
     é variável de build, portanto salvar/alterar exige novo deploy frontend. Manter chamadas
     browser → API Spring (`/api/catalogo`, `/api/receitas/recomendadas`,
     `/api/montagens/substitutas`) → repository → banco. Nunca conectar o browser diretamente ao
     Postgres nem expor credenciais de banco no frontend.
   - Para o critério atual de catálogo seedado e leitura/recomendação, H2 em memória basta para
     provar o deploy: o `DataSeeder` recria catálogo ao iniciar. Isso não preserva alterações
     administrativas entre reinícios; usar Postgres gerenciado antes de implementar CRUD admin.
   - CORS já permite `*` em `/api/**`. Para a API pública atual funciona, mas revisar e restringir
     a origem à Vercel quando houver autenticação/rotas privadas.
   - Aceite operacional: testar `/api/catalogo` na URL Railway e na URL Vercel; testar também os
     dois POST públicos do wizard. Verificar resposta 2xx, corpo esperado, CORS e cold start.
   - Estado em 2026-09-30: etapa concluída e exercitada no navegador publicado; resultados e
     limites de persistência estão em `docs/prd/2026-09-30-preparacao-backend-railway.md`.
   - Comparação de hospedagem consultada em 2026-09-30 (preços mudam; estimar na conta/região
     antes de escolher):
     - Railway: melhor encaixe e menor atrito para este Spring Boot. Plano Free inclui US$ 1/mês
       em uso e limites baixos; Hobby custa US$ 5/mês e inclui US$ 5 de créditos de uso. CPU,
       memória, banco e tráfego podem ultrapassar o crédito; conferir uso real no painel.
     - Render: simples para Java/Docker, mas Free dorme após 15 minutos sem tráfego e pode levar
       cerca de um minuto para voltar; Postgres Free expira após 30 dias. Serve para experimento,
       não como opção durável sempre disponível.
     - Cloud Run: escala a zero e tem franquia mensal de requests/CPU/RAM, então pode ser barato
       para tráfego baixo; Cloud SQL é cobrado à parte mesmo quando a API está ociosa e adiciona
       configuração operacional. Alternativa se aceitar a complexidade GCP.
     - Fly.io: tecnicamente possível, mas custo de VM/volume depende da região e configuração;
       não há aqui uma vantagem de preço comprovada sobre Railway para este caso.
     - Supabase/Neon: alternativas de Postgres, não substitutos diretos do serviço Spring Boot.
       Supabase Free tem 500 MB e pausa projetos após uma semana inativos; bom para protótipo,
       não para disponibilidade contínua. A aplicação Java continuaria hospedada separadamente.
   - Opção sem CORS: configurar rewrite `/api/*` na Vercel apontando para o domínio Railway. Isso
     só encaminha a chamada; não hospeda o Spring nem elimina a necessidade de uma API ativa.
   - A solução mais barata para **catálogo estritamente estático** seria um JSON público no build
     do frontend, mas não substituiria os endpoints POST de recomendação/substituição e duplicaria
     a fonte do catálogo. Não recomendada como correção principal.

   Fontes oficiais consultadas em 2026-09-30: [Railway pricing](https://railway.com/pricing),
   [Railway Spring Boot](https://docs.railway.com/guides/spring-boot),
   [Railway PostgreSQL](https://docs.railway.com/databases/postgresql),
   [Railway PORT/healthchecks](https://docs.railway.com/deployments/healthchecks),
   [Render pricing](https://render.com/pricing), [Render free limits](https://render.com/docs/free),
   [Cloud Run pricing](https://cloud.google.com/run/pricing),
   [Cloud SQL pricing](https://cloud.google.com/sql/pricing) e
   [Supabase pricing](https://supabase.com/pricing).

### Etapa 2 — Fundação visual

2. `docs/specs/2026-09-20-paleta-cores-organica-5-tonalidades-frontend.md` (SPEC-06).
3. `docs/specs/2026-09-20-tema-claro-padrao-alternancia-modo-escuro-frontend.md` (SPEC-05),
   dependente da paleta e de seus tokens/classes.

As duas specs devem ser implementadas como uma iniciativa coordenada, registrada em
`docs/prd/2026-09-30-fundacao-visual-paleta-temas.md`. A SPEC-06 define valores e papéis da paleta,
mas não controla o modo ativo; default claro, alternância, classe `dark` e persistência pertencem
à SPEC-05. A paleta pode alterar as cores visíveis em ambos os modos, portanto validar os dois e
não entregar um estado intermediário que force o modo claro ou prejudique o escuro.

- Estado em 2026-10-01: Etapa entregue; resultados e validações registrados em
  `docs/prd/2026-09-30-fundacao-visual-paleta-temas.md`.

### Refinamento de interface antes da landing

- Iniciativa priorizada pelo usuário antes da Etapa 3: `docs/prd/2026-10-01-ajustes-identidade-e-estados-wizard.md`.
- Implementar a nova SPEC-12 (`docs/specs/2026-10-01-badges-toggle-slider-valores-monetarios.md`):
  remover os dois badges vetados, tornar o toggle um switch deslizante e ajustar preços/modal ao
  padrão cinza + contorno Roxo Tech, com texto Roxo Tech para valores recomendados.
- Preservar SPEC-05/06. A decisão específica de apresentação monetária deste PRD prevalece sobre
  a instrução verde da SPEC-06, sem reescrever o arquivo de spec.

### Etapa 3 — Estrutura da landing page

4. `docs/specs/2026-09-20-hero-section-menu-sticky-frontend.md` (SPEC-07): header fixo e
   estrutura de hero preparada para mídia.
5. `docs/specs/2026-09-20-renderizacao-video-tematico-loop-frontend.md` (SPEC-11): inserir mídia
   e poster na estrutura da hero; depende da etapa 4.
6. `docs/specs/2026-09-20-navegacao-menu-superior-posicionamento-wizard-frontend.md` (SPEC-08):
   aplicar links e posição final do wizard sobre a hero; depende da estrutura e mídia das etapas
   4 e 5.

### Etapa 4 — Backend de afiliados e autenticação (podem avançar em paralelo após decisões)

7. `docs/specs/2026-09-20-redirecionador-dinamico-links-afiliados-backend.md` (SPEC-04):
   redirecionamento público e medição de cliques. Atualizar contrato de API e modelo de métricas
   no PRD antes da implementação. Se configurações de afiliados forem editáveis pelo painel,
   proteger as operações administrativas com a autenticação da etapa 8.
8. `docs/specs/2026-09-20-autenticacao-admin-jwt-backend.md` (SPEC-02): autenticação admin,
   emissão/validação JWT e proteção das rotas de mutação. Pode ser desenvolvida em paralelo com a
   rota pública de redirecionamento, mas deve preceder o painel admin.

### Etapa 5 — Conteúdo e navegação complementar

9. `docs/specs/2026-09-20-rodape-institucional-botao-voltar-ao-topo-frontend.md` (SPEC-10):
   completar o rodapé após a estrutura de navegação; combinar a entrada administrativa com a
   rota de login definida pela SPEC-02.
10. `docs/specs/2026-09-20-modais-recomendacao-grupos-compra-frontend.md` (SPEC-09): criar cards
    e modais de ofertas depois da landing (etapas 2–3); integrar links afiliados com SPEC-04.

### Etapa 6 — Operação administrativa do catálogo

11. `docs/specs/2026-09-20-painel-admin-cadastro-produtos-frontend.md` (SPEC-03): implementar
    login/painel somente após autenticação (SPEC-02), entrada do rodapé (SPEC-10), API CRUD,
    persistência durável e contrato aprovado dos campos do produto.

## Dependências e decisões obrigatórias antes de codificar

- **Persistência:** o backend atual usa H2 em memória com `create-drop`. Definir banco persistente
  e migração antes de aceitar cadastro/edição de catálogo em produção.
- **Contrato do produto:** SPEC-03 cita TDP, frequência, capacidade e loja parceira; comparar com
  `Produto` e o PRD canônico. Esses campos não podem ser adicionados por inferência. Resolver no
  PRD antes de construir formulário ou CRUD.
- **Métricas de clique:** SPEC-04 exige data, produto, loja e IP/User-Agent ofuscado, mas o modelo
  atual não possui entidade/tabela de eventos. Definir retenção, anonimização e persistência no
  PRD; não registrar dados pessoais brutos.
- **Credencial admin/JWT:** definir armazenamento/seed seguro de administrador, segredo via
  variável de ambiente, expiração e recuperação/rotação sem incluir segredo no repositório.
- **Ativos e conteúdo:** aprovar arquivo/licença do vídeo e poster (SPEC-11), URLs reais de
  redes/institucional (SPEC-10), produtos/fotos e destinos de ofertas (SPEC-09).
- **Acessibilidade/performance:** respeitar movimento reduzido, carregamento responsivo e fallback
  do vídeo; as specs atuais não detalham completamente esses estados.
- **Jogos por objetivo:** antes da próxima iniciativa que altere ObjectiveStep, GamesStep, catálogo
  ou modelo, rever se a lista deve depender dos objetivos. Hoje o front lista todos os registros
  `tipo === 'JOGO'` e a entidade `Jogo` não contém relação objetivo→jogo. Documentar a regra e sua
  fonte de dados primeiro; não inventar associação, FK ou domínio.
- **Design:** a iniciativa coordenada SPEC-05/06 registra a decisão de preservar ambos os modos,
  usar a paleta da SPEC-06 e manter em SPEC-05 o comportamento do tema. Seguir
  `docs/prd/2026-09-30-fundacao-visual-paleta-temas.md`; não alterar as specs existentes.

## Checklist de acompanhamento

- [x] Inventariar as 14 specs originais e distinguir entregues de pendentes; registrar SPEC-12
      como nova iniciativa de refinamento.
- [x] Definir dependências, etapas paralelizáveis e decisões que bloqueiam trabalho seguro.
- [x] Preservar os arquivos de spec existentes.
- [ ] Criar/vincular PRD de iniciativa para cada feature antes de sua implementação.
- [ ] Executar as etapas conforme prioridade e atualizar os PRDs de cada entrega.

## Registro

- O checklist funcional transversal e a posição do produto permanecem em
  `docs/prd/ARCHITECTURE.md`.
- A lista curta de retomada fica em `docs/prd/GUIA_CONTINUIDADE.md`.
- Nenhuma feature de produto foi implementada por este roteiro.
