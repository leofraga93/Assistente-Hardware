# ARCHITECTURE.md — Contexto, Escopo e Posição do Projeto

> Mapa e checklist do **Hardware Assistant** (assistente de montagem de PC).
> Caminho: `docs/prd/ARCHITECTURE.md`. Regras globais de agente ficam em `AGENTS.md` na raiz.
> Specs de implementação: `docs/specs/`. Cada spec deve apontar um item deste checklist;
> ao entregar, marcar o item como concluído.
> Lido no início de cada sessão e **atualizado ao final** de qualquer interação que altere
> código, fluxo, modelo de dados, docs ou decisão de arquitetura.

---

## 1. Regra de ouro (mandato obrigatório)

Ao gerar **qualquer implementação** (código, migração de dados, DTO, nova tabela, nova tela,
novo endpoint), a IA DEVE validar que a estrutura proposta:

1. Respeita os **ENUMs/domínios** declarados na seção 6 (valores exatos, sem valores inventados);
2. Respeita as **chaves estrangeiras e relacionamentos** declarados na seção 6;
3. Respeita as **regras de integridade de negócio** (invariantes) da seção 7;
4. É coerente com o **estado e o checklist** (seções 2 a 5) — se divergir, ajustar a proposta
   ou atualizar este documento antes de implementar;
5. Em caso de mudança estrutural (novo ENUM, novo campo, novo relacionamento, novo fluxo),
   este documento deve ser atualizado na mesma entrega;
6. Existe spec em `docs/specs/` ligada a um item das seções 2 ou 3; implementação sem spec
   não entra. Entrega marca o item do checklist e o status da spec.

Nenhuma implementação pode introduzir valor de enum fora da lista canônica nem relacionamento
sem declarar as chaves aqui.

---

## 2. Posição atual do projeto (leia primeiro)

**Fase atual:** Produto funcional ponta a ponta em **dev local** (wizard → opções AMD/Intel →
configurador → substituição). Interface 100% Font Awesome. Esteira de validação e fallback
GPU-first no backend. Docs reorganizados (`AGENTS.md` + `docs/prd` + `docs/specs`).
**Produção Vercel:** apenas o frontend estático; `/api/catalogo` retorna 404. O wizard agora
explica a falha da API (nao mais passo Objetivo em branco). Falta publicar o Spring Boot.

- [x] Backend Spring Boot 3 + H2 (modo PostgreSQL) com seed de catálogo
- [x] API de catálogo, recomendação por marca e substituição de peças
- [x] Frontend React + Vite + Tailwind com fluxo em 3 fases (wizard/opcoes/config)
- [x] Migração de ícones `lucide-react` → Font Awesome em todo o frontend
- [x] Build de produção passando; servidores dev/preview ativos
- [x] AGENTS.md (regras globais) + PRD em `docs/prd/ARCHITECTURE.md` + pasta `docs/specs/`
- [x] Estrutura docs/prd + docs/specs e fluxo spec-first
      (spec `docs/specs/2026-09-20-reorganizacao-docs-spec-first.md`)
- [x] Esteira `POST /api/configuracao/validar` (socket, tipo RAM, slots, fonte) + margem 50W
- [x] Fallback de orcamento reduz GPU primeiro preservando CPU/RAM
- [x] Código `workspace/backend/` e `workspace/frontend/` versionados no git
- [x] Wizard mostra erro amigavel se GET /api/catalogo falhar
      (spec `docs/specs/2026-09-20-wizard-erro-amigavel-catalogo.md`)
- [ ] Publicar API `/api/catalogo` em host Java (Render, Railway, Fly, Cloud Run ou similar)
      e apontar o front com `VITE_API_BASE`
      (spec `docs/specs/2026-09-20-vercel-wizard-objetivo-sem-catalogo.md`)
- [ ] Definir/limpar pastas vazias: `frontend/src/data/` e `scripts/` (decidir uso ou solicitar remoção)
- [ ] (Opcional) Avaliar upgrade `@fortawesome/react-fontawesome` 0.2.x → 3.1.1
      (0.2.x emite aviso de depreciação no install; validar API antes)

---

## 3. Checklist de escopo funcional (indicador de entregas)

Estado de cada módulo e onde ele vive.

| Módulo | Onde | Estado |
|---|---|---|
| Catálogo de produtos/jogos/receitas (seed) | `backend/.../bootstrap/DataSeeder.java` | Entregue |
| Endpoint `GET /api/catalogo` | `web/AssistenteController` | Entregue |
| Recomendação única `POST /api/recomendacoes` | `service/MontagemService#recomendar` | Entregue |
| Recomendações por marca `POST /api/receitas/recomendadas` | `MontagemService#recomendarPorMarca` | Entregue |
| Substituição `POST /api/montagens/substitutas` | `MontagemService#substitutos` | Entregue |
| Validação `POST /api/configuracao/validar` | `service/ValidacaoConfiguracaoService` + regras `Validacao*` | Entregue |
| Tratamento de erros (`{mensagem}` + HTTP) | `AssistenteController` | Entregue |
| Testes de integração (12) | `backend/src/test/.../RecomendacaoIntegrationTest.java` | Entregue |
| Fluxo wizard 4 passos | `frontend/src/App.jsx` + componentes em `components/` | Entregue |
| Tela de opções (AMD/Intel) | `components/OpcoesReceitas.jsx` | Entregue |
| Configurador + modal de substituição | `components/Configurator.jsx`, `SubstitutionModal.jsx` | Entregue |
| Ícones (sem lucide/emoji) | Todos os `.jsx` — ver mapa na seção 10 | Entregue |
| Proxy dev `/api` → `:8080` e preview | `frontend/vite.config.js` | Entregue (só local) |
| Deploy Vercel do frontend | `vercel.json` | Entregue (estático) |
| Erro amigável se catálogo falhar | `CatalogoStatus.jsx` + `App.jsx` | Entregue |
| `VITE_API_BASE` | `frontend/src/api.js` | Entregue (vazio = mesma origem) |
| API em produção (host Java) | Render / Railway / Fly / Cloud Run + env Vercel | Pendente |

Componentes legados sem importação ativa (mantidos migrados, candidatos a remoção sob aprovação):
`ReceitasSection.jsx`, `Resultado.jsx`, `StepJogos.jsx`, `StepMarca.jsx`, `BudgetStep.jsx`/`StepOrcamento.jsx`
(variantes antigas do wizard — nenhum é importado por `App.jsx` hoje).

---

## 4. Repositório e convenções

- Raiz do git: repositório `Assistente-Hardware`. Código em `workspace/backend/` e
  `workspace/frontend/`. Docs: `AGENTS.md` (raiz), `docs/prd/ARCHITECTURE.md`, `docs/specs/`.
- Idiomas: código/UI em português sem acentos na maior parte (`components/` e backend),
  com exceções pontuais preservadas (ex.: subtítulo do `Header` usa acento). Não "corrigir" textos sem pedido.
- Backend: Java 17, Spring Boot 3.3.5, Maven, Lombok, Spring Data JPA.
  Persistência em runtime: **H2 em memória com `MODE=PostgreSQL`, `ddl-auto: create-drop`**
  (Hibernate gera as tabelas; o ENUM Java é persistido como `VARCHAR` via `@Enumerated(EnumType.STRING)`).
  `resources/db/schema.sql` documenta o modelo de referência PostgreSQL.
- Frontend: React 18 + Vite 5 + Tailwind 3 + Font Awesome 6 (SVG core). Sem webfont CSS importado:
  os ícones são `<svg>` com cor `currentColor`; o tamanho vem das classes Tailwind `h-*/w-*`.
- Proibição de emoji e comentários desnecessários: regra global em `AGENTS.md`.

---

## 5. Arquitetura e fluxos

### 5.1 Fluxo do usuário (frontend)

```
GET /api/catalogo (monta lista de objetivos, jogos e produtos)
        |
        v
fase=wizard  PassoBar (1..4)
   1 PeripheralsStep : incluiPerifericos? (Torre | Kit Completo)
   2 ObjectiveStep   : objetivos (Jogo.tipo='OBJETIVO') multi-selecao
   3 GamesStep       : jogos (Jogo.tipo='JOGO') multi-selecao
   4 BudgetStep      : orcamento (slider, default 4000)
        |
        v  gerarOpcoes()
POST /api/receitas/recomendadas {orcamento, jogoIds:[objetivos+jogos], incluiPerifericos}
        |
        v
fase=opcoes  OpcoesReceitas: cards "Recomendado AMD" e "Recomendado Intel"
        |
        v  selecionarBuild(op)
fase=config  Configurator (tabela de pecas, resumo CPU/GPU/RAM, AlertBanner de orcamento)
        |
        v  "Substituir por mais barata" -> modal
POST /api/montagens/substitutas {produtoId, montagemIds:[ids atuais]}
        -> alternativas mais baratas compativeis
        -> substituicao atualiza build e total (recalculado no front)
```

### 5.2 Algoritmo de recomendação (backend `MontagemService`)

```
recomendarPorMarca -> para AMD e INTEL: melhorPorMarcas
  calcularPesos: pesos CPU/GPU/RAM = max(1, peso dos jogos/objetivos escolhidos)
  montar(plataforma, orcamento, wCpu, wGpu, wRam, incluiPerifericos):
    1. distribui orcamento por categoria (percentuais; com perifericos reduz CPU/GPU)
    2. placa-mae por plataforma -> determina TipoRam da build
    3. CPU por plataforma (mesma ArquiteturaPlataforma da placa)
    4. GPU (categoria solta), RAM (TipoRam = da placa; slots ok)
    5. fonte >= consumo; gabinete, armazenamento (monitor/acessorios se incluiPerifericos)
  apos montar: ajustarOrcamento (baratear) -> tentarUpgrade (melhorar) ->
               corrigirFonte (se consumo > potencia) -> preencherObservacoes
```

`ajustarOrcamento` (quando a montagem estoura o orcamento) aplica reducoes na ordem
`prioridadeReducao` (GPU=0, demais exceto PLACA_MAE=1, CPU/RAM=2 como último recurso):
**GPU primeiro**, preservando CPU e RAM; PLACA_MAE nunca é trocada por barateamento.

### 5.4 Validação da configuração corrente (backend)

Esteira disparada a cada troca de peça (`POST /api/configuracao/validar`, recebe `produtoIds` da
configuração atual). É uma cadeia (`List<RegraCompatibilidade>` auto-injetada em ordem `@Order`):

```
ValidacaoSocket (ordem 1)  -> plataforma CPU == plataforma PLACA_MAE (ex.: ambos AMD_AM4)
ValidacaoTipoRam (ordem 2) -> tipo_memoria RAM == tipo_memoria PLACA_MAE (ex.: ambos DDR5)
ValidacaoSlots (ordem 3)   -> soma(slots_ram_requeridos) <= slots_ram_fornecidos da PLACA_MAE
ValidacaoFonte (ordem 4)   -> soma(consumo_watts) + slots_ram*10 + 50W <= potencia_watts_fornecida
```

Regras adicionais do serviço: sem produtos duplicados; todos os ids devem existir no catálogo.
Problemas acumulam (violações múltiplas aparecem juntas). HTTP 200 `{valida:true, problemas:[]}`
ou HTTP 400 `{mensagem}`. Regra de monitor/`isMonitor` não participa da cadeia (persiste como em 5.1).

### 5.3 Deploy/preview

- Frontend dev: `:5173` (host true) com proxy `/api` → `http://localhost:8080` (sem CORS).
- Backend: `:8080`.
- Vercel (`https://assistente-hardware.vercel.app`): só o React. Sem Java, `/api/catalogo` = 404.
  O wizard mostra `CatalogoStatus` (erro amigável + tentar novamente).
- Produção do front: `VITE_API_BASE` (build-time) aponta para a URL pública do Spring Boot,
  sem barra final. Vazio = mesma origem (dev com proxy Vite).
- Hosts no estilo Vercel (git push, HTTPS) para **Java**: Render, Railway, Fly.io, Google Cloud Run,
  Azure Container Apps. A Vercel não substitui esses para o JAR/Maven atual.
- CORS do backend (`allowedOrigins *`) cobre o front na Vercel quando a API estiver em outro domínio.

---

## 6. Modelo de dados — FONTE DE VERDADE (ENUMs, tabelas e FKs)

### 6.1 ENUMs canônicos (Java, persistidos como texto)

`TipoComponente` — coluna `produtos.categoria` (máx 20 chars):

| Valor | Rótulo (backend/frontend) |
|---|---|
| `CPU` | Processador |
| `GPU` | Placa de video |
| `RAM` | Memoria RAM |
| `PLACA_MAE` | Placa-mae |
| `FONTE` | Fonte de alimentacao |
| `GABINETE` | Gabinete |
| `ARMAZENAMENTO` | Armazenamento |
| `PERIFERICO` | Periferico |

`ArquiteturaPlataforma` — coluna `produtos.plataforma`:
`AMD_AM4`, `AMD_AM5`, `INTEL_LGA1700`, `INTEL_LGA1851`.

`TipoRam` — coluna `produtos.tipo_memoria`: `DDR4`, `DDR5`.

### 6.2 Domínios por string (NÃO são enum Java — valores livres devem ser evitados)

- `jogos.tipo`: somente `'OBJETIVO'` (passo 2) ou `'JOGO'` (passo 3). Padrão `'JOGO'`.
- `receitas_base.arquitetura_marca`: somente `'AMD'` ou `'INTEL'`.
- `RecomendacaoRequest.marca` (opcional): vazio/`TODAS`/`QUALQUER` = todas; `AMD`; `INTEL`.

### 6.3 Tabelas

`produtos` (entidade `Produto`)
| coluna | tipo/domínio | observações |
|---|---|---|
| id | SERIAL PK | `@GeneratedValue(IDENTITY)` |
| nome | VARCHAR(255) NOT NULL | |
| categoria | `TipoComponente` NOT NULL | |
| preco | DECIMAL(10,2) NOT NULL | `BigDecimal` |
| link_afiliado | TEXT NOT NULL | |
| plataforma | `ArquiteturaPlataforma` (nullable) | somente CPU e PLACA_MAE têm valor |
| tipo_memoria | `TipoRam` (nullable) | somente PLACA_MAE e RAM têm valor |
| slots_ram_requeridos | INT default 0 | kits de RAM (ex.: 2 para 2x8GB) |
| slots_ram_fornecidos | INT default 0 | slots da placa-mãe |
| consumo_watts | INT default 0 | componentes que consomem |
| potencia_watts_fornecida | INT default 0 | somente FONTE |
| peso_desempenho | INT NOT NULL `1..4` | usado p/ escolher a melhor peça |

`jogos` (entidade `Jogo`)
| coluna | tipo/domínio |
|---|---|
| id | SERIAL PK |
| nome | VARCHAR(100) NOT NULL |
| imagem_url | TEXT (nullable) |
| tipo | VARCHAR(10) NOT NULL = `'JOGO'`/`'OBJETIVO'` |
| peso_cpu / peso_gpu / peso_ram | INT NOT NULL `1..4` |

`receitas_base` (entidade `ReceitaBase`)
| coluna | tipo/domínio |
|---|---|
| id | SERIAL PK |
| nome | VARCHAR(150) NOT NULL |
| arquitetura_marca | VARCHAR(10) NOT NULL `'AMD'`/`'INTEL'` |
| peso_geral_calculado | INT NOT NULL |

### 6.4 Relacionamentos e CHAVES ESTRANGEIRAS

Único relacionamento físico do modelo:

- `ReceitaBase 1 --< itens_receita >-- N Produto` (ManyToMany via tabela associativa)
  - Tabela associativa **`itens_receita`**:
    - `receita_id` → FK para `receitas_base(id)` (on delete a definir; hoje sem cascade explícito)
    - `produto_id` → FK para `produtos(id)`
    - PK composta `(receita_id, produto_id)`
- Mapeado em `ReceitaBase.itens` (`@JoinTable(name="itens_receita")`).
- **Não existem** colunas FK em `produtos`/`jogos`. Montagens não são persistidas (só em memória/response).
- Qualquer novo relacionamento (ex.: persistir montagens, usuário, pedido) DEVE declarar aqui suas FKs.

---

## 7. Regras de integridade de negócio (invariantes)

Qualquer feature DEVE preservar:

1. **Orçamento mínimo**: `orcamento >= 300` no request (validação Bean Validation; abaixo → 400).
2. **Pesos 1..4**: `peso_desempenho`, `peso_cpu`, `peso_gpu`, `peso_ram`.
3. **Plataforma casada**: CPU e PLACA_MAE da montagem usam a mesma `ArquiteturaPlataforma`.
4. **RAM casada**: `tipo_memoria` da RAM igual ao da PLACA_MAE;
   `slots_ram_requeridos` da RAM <= `slots_ram_fornecidos` da PLACA_MAE (<=0 = ignora limite).
5. **Fonte suficiente**: `potencia_watts_fornecida` >= consumo total calculado
   (consumo = soma de `consumo_watts` + `slots_ram_requeridos * 10` + margem de `50W`
   — constante única `ConsumoMontagem.MARGEM_WATTS`; usada pela montagem e pela esteira).
6. **Um item por categoria** em cada montagem (exceto `PERIFERICO`, que pode conter
   "Monitor" e "Acessorios" simultaneamente quando `incluiPerifericos`).
7. **Detecção de monitor**: `categoria == 'PERIFERICO' && nome.startsWith("Monitor")`
   — regra DUPLICADA entre backend (`MontagemService`) e frontend (`src/labels.js#isMonitor`).
   Alterações devem manter as duas em sincronia.
8. **Substituição**: alternativa deve ser da mesma categoria, compativel com a build e
   **mais barata** que a peça atual (ordenada da mais cara para a mais barata).
9. **Idempotência do seed**: `DataSeeder` só roda se `produtoRepository.count() == 0`.

---

## 8. API pública (contrato)

Todas as respostas de erro usam corpo `{"mensagem": "..."}`.

| Método/rota | Payload | Resposta |
|---|---|---|
| `GET /api/catalogo` | — | `{produtos:[ProdutoDTO], jogos:[JogoDTO], receitas:[ReceitaDTO]}` |
| `POST /api/recomendacoes` | `RecomendacaoRequest` | `RecomendacaoResponse` única (melhor entre AMD e Intel) |
| `POST /api/receitas/recomendadas` | `RecomendacaoRequest` | `[RecomendacaoResponse]` — até 2 (AMD e Intel) |
| `POST /api/montagens/substitutas` | `SubstituicaoRequest` | `{substitutos:[ProdutoDTO]}` |
| `POST /api/configuracao/validar` | `ConfiguracaoValidacaoRequest` | 200 `{valida, problemas[]}` ou 400 `{mensagem}` |

`RecomendacaoRequest`: `orcamento` (BigDecimal, obrigatorio, >=300), `jogoIds` (lista Long),
`marca` (string opcional), `incluiPerifericos` (bool).

`RecomendacaoResponse`: `plataforma` (ex. `AMD_AM4`), `receitaNome` (ou null),
`itens[]` `{id, nome, categoria, preco, linkAfiliado, plataforma, tipoMemoria, destaque}`,
`total`, `pesoGeralCalculado`, `observacoes[]`.

`ConfiguracaoValidacaoRequest`: `produtoIds` (lista Long, obrigatoria, sem duplicados).
`ValidacaoConfiguracaoResponse` (200): `valida` (bool) e `problemas` (lista de strings).
Erro (400) segue o padrão `{"mensagem": ...}` acumulando as violações da cadeia da seção 5.4.

Campos auxiliares do frontend:
- `CATEGORIA_LABEL` (frontend `src/labels.js`) espelha o rótulo por categoria da seção 6.1;
- `destaque` nos itens de resposta usa esse rótulo (o front recria `destaque` ao substituir peça).

---

## 9. Como rodar e validar

```bash
# Backend (porta 8080)
cd workspace/backend && mvn -q spring-boot:run

# Testes de integracao (12)
cd workspace/backend && mvn -q test

# Frontend (porta 5173)
cd workspace/frontend && npm install --no-audit --no-fund
cd workspace/frontend && npm run dev
cd workspace/frontend && npm run build

# Smoke test E2E
curl -s http://localhost:8080/api/catalogo
curl -s -X POST http://localhost:8080/api/receitas/recomendadas \
  -H 'Content-Type: application/json' \
  -d '{"orcamento":4000,"jogoIds":[],"incluiPerifericos":false}'

# Smoke test da esteira de validacao (caso valido -> 200; invalidos -> 400 {mensagem})
curl -s -X POST http://localhost:8080/api/configuracao/validar \
  -H 'Content-Type: application/json' -d '{"produtoIds":[1,12,20,24,32]}'
curl -s -X POST http://localhost:8080/api/configuracao/validar \
  -H 'Content-Type: application/json' -d '{"produtoIds":[1,12,20,26,32]}'
```

Após qualquer mudança de frontend, validar `npm run build`; após mudança de backend, `mvn test`.
Smoke em produção Vercel: `GET https://assistente-hardware.vercel.app/api/catalogo` deve ser 200
quando a API estiver publicada (hoje 404).

---

## 10. Ícones — Font Awesome (padrão atual, não usar outros)

Pacotes instalados: `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`,
`@fortawesome/react-fontawesome`. Uso: `import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'`
+ `import { faX } from '@fortawesome/free-solid-svg-icons'`; render `<FontAwesomeIcon icon={faX} className="h-* w-* ..." />`.
Tamanho SEMPRE por classe Tailwind (sem CSS webfont); cor por `currentColor`/`text-*`.

Mapeamento canônico por categoria (`CategoriaIcon.jsx` — validar aqui antes de trocar):

| Categoria/contexto | Ícone |
|---|---|
| CPU / processador | `faMicrochip` |
| GPU / placa de video | `faVideo` |
| RAM / memoria | `faMemory` |
| PLACA_MAE | `faServer` |
| FONTE | `faBolt` |
| GABINETE | `faBox` |
| ARMAZENAMENTO | `faHardDrive` |
| PERIFERICO (geral) | `faKeyboard` |
| PERIFERICO c/ nome iniciando em "Monitor" | `faDisplay` |
| Categoria desconhecida | `faCircleQuestion` |

Mapa usado na migração (lucide → Font Awesome free-solid), p/ referência:

| lucide | FA | | lucide | FA |
|---|---|---|---|---|
| ArrowLeft / ArrowRight | faArrowLeft / faArrowRight | | Cpu | faMicrochip |
| Loader2 | faSpinner + `animate-spin` | | Gauge | faGaugeHigh |
| MonitorSmartphone | faDesktop | | CheckCircle2 | faCircleCheck |
| PcCase | faComputer | | BadgeCheck | faShieldHalved |
| MonitorPlay | faVideo | | RefreshCcw / RotateCcw | faRotateLeft |
| MemoryStick | faMemory | | X | faXmark |
| CircuitBoard | faServer | | ExternalLink | faArrowUpRightFromSquare |
| Zap | faBolt | | HelpCircle | faCircleQuestion |
| Box | faBox | | Monitor | faDisplay |
| HardDrive | faHardDrive | | Sparkles | faWandMagicSparkles |
| Keyboard | faKeyboard | | AlertTriangle | faTriangleExclamation |
| Gamepad2 | faGamepad | | Award | faAward |
| Target | faBullseye | | BookOpen | faBookOpen |
| Wallet | faWallet | | Briefcase | faBriefcase |
| Check | faCheck | | LayoutGrid | faTableCellsLarge |
| Wrench | faWrench | | Clapperboard | faClapperboard |

Regras: `faSpinner` anima com Tailwind `animate-spin` (não usar `spin` do FA, pois não há CSS FA importado);
mantiveram-se `&middot;` / `\u00B7` / `\u2014` como separadores de texto (não são ícones).

---

## 11. Histórico de interações (log vivo — atualizar a cada sessão)

### Sessão 1 — Migração de ícones lucide → Font Awesome (2026-09-03)

- Verificou-se ausência de emojis Unicode e de glifos literais usados como ícones no frontend/backend.
- Decidido: remover `lucide-react`; adotar Font Awesome 6.7.2 (SVG core + free-solid + react-fontawesome).
- `frontend/package.json`: removido `lucide-react`; adicionados os 3 pacotes `@fortawesome/*`.
- Migrados 15 arquivos: `App.jsx`, `AlertBanner`, `CategoriaIcon`, `Configurator`, `GamesStep`,
  `Header`, `ObjectiveStep`, `OpcoesReceitas`, `PassoBar`, `PeripheralsStep`, `SubstitutionModal`
  e legados `ReceitasSection`, `Resultado`, `StepJogos`, `StepMarca`.
- Substituicoes por inexistencia no free-solid: `faCpu`→`faMicrochip`, `faTarget`→`faBullseye`,
  `faMonitor`→`faDisplay`, `faBadgeCheck`→`faShieldHalved`. Glifos `\u25CF`/`\u25CB` (StepJogos)
  → `faCircleCheck`/`faCircle`; `&rarr;` (ReceitasSection) → `faArrowRight`.
- Validações: todos os nomes conferidos contra o pacote instalado; `npm run build` OK (54 módulos);
  SSR do `App` renderiza sem erro; módulos do dev server respondem 200; endpoints de catalogo,
  recomendacao e substituicao OK; preview 200.

### Sessão 2 — Documentacao de contexto/arquitetura (2026-09-03)

- Levantado o modelo de dados real (ENUMs, colunas, FKs, invariantes) a partir do código.
- Criados `ARCHITECTURE.md` (este arquivo) e `AGENTS.md` na raiz.
- Estabelecida a regra de ouro: implementacoes devem validar ENUMs/FKs/invariantes e atualizar este doc.

### Sessão 3 — Esteira de validação de configuração + fallback GPU-first (2026-09-04)

- Registrada a especificação do usuário como seção canônica-alvo e implementada na mesma entrega
  (decisão "Registrar e implementar no backend").
- Novos arquivos em `backend/src/main/java/com/hardwareassist/`:
  - `dto/ConfiguracaoValidacaoRequest.java` (record `produtoIds` com Bean Validation);
  - `dto/ValidacaoConfiguracaoResponse.java` (record `valida` + `problemas`);
  - `service/RegraCompatibilidade.java` (interface da cadeia), `ValidacaoSocket`, `ValidacaoTipoRam`,
    `ValidacaoSlots`, `ValidacaoFonte` (regras `@Order` 1..4), `ValidacaoConfiguracaoService`,
    `ItensMontagem` (helpers) e `ConsumoMontagem` (constante `MARGEM_WATTS = 50`).
- `AssistenteController`: novo `POST /api/configuracao/validar` — 200 `{valida, problemas}` ou
  400 `{mensagem}` acumulando violações.
- `MontagemService`: folga de consumo alterada de `60W` fixa para `ConsumoMontagem.MARGEM_WATTS`
  (50W) nos 3 pontos (montagem, `consumoDaBuild`, `recalcularConsumo`); `ajustarOrcamento` agora
  reduz **GPU primeiro** (`prioridadeReducao`: GPU=0, demais exceto PLACA_MAE=1, CPU/RAM=2),
  preservando CPU/RAM e nunca trocando PLACA_MAE por barateamento.
- Testes: `RecomendacaoIntegrationTest` estendido de 6 para 12 casos (cadeia valida + socket,
  tipo RAM, excesso de slots, fonte insuficiente, duplicado e id inexistente) — todos passando.
- Validação: `mvn -q test` verde (12/12); smoke via curl no backend reiniciado (`:8080`): casos
  valido → 200 e invalidos → 400 com as mensagens esperadas; `POST /api/recomendacoes` segue OK.
- Nenhuma mudança de frontend nesta sessão; servidores dev/preview seguem ativos (backend reiniciado).

### Sessão 4+

- (Adicionar entradas a cada nova interacao: o que foi pedido, o que foi feito, validacoes, estado final.)

### Sessão 5 — Docs spec-first + diagnóstico Vercel (2026-09-20)

- `AGENTS.md` na raiz: regras globais (spec-first, ENUM/FK via PRD, zero emoji / só Font Awesome).
- `ARCHITECTURE.md` movido para `docs/prd/ARCHITECTURE.md` (mapa e checklist).
- Pasta `docs/specs/` criada. Specs desta sessão:
  - `2026-09-20-reorganizacao-docs-spec-first.md` (entregue, checklist marcado).
  - `2026-09-20-vercel-wizard-objetivo-sem-catalogo.md` (diagnosticada, correção pendente).
- Causa do wizard Objetivo vazio na Vercel: frontend estático sem backend; `/api/catalogo` = 404;
  `App.jsx` zera o catálogo; `ObjectiveStep` não renderiza cards. Orçamento não usa API.
- Nenhuma mudança de código de produto nesta sessão.

### Sessão 6 — Erro amigável do catálogo + `VITE_API_BASE` (2026-09-20)

- Spec `docs/specs/2026-09-20-wizard-erro-amigavel-catalogo.md` entregue.
- `CatalogoStatus.jsx`: carregando / erro (Font Awesome) / conteudo; botao tentar novamente.
- `App.jsx` distingue status do catalogo; banner de erro nos passos 1 e 4; "Ver minhas opcoes"
  desabilitado sem catalogo.
- `api.js`: `VITE_API_BASE` + mensagem unica se fetch/404 falhar. `.env.example` no frontend.
- Deploy do Spring Boot permanece pendente.

---

## 12. Próximo passo sugerido (indicador)

Publicar o Spring Boot em um host Java (Render, Railway, Fly ou Cloud Run), definir
`VITE_API_BASE` no build da Vercel, e marcar a spec
`docs/specs/2026-09-20-vercel-wizard-objetivo-sem-catalogo.md`.
