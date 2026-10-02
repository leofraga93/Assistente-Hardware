# PRD: Ajustes de identidade e estados visuais do wizard

- Estado: Em andamento
- Data: 2026-10-01
- Specs novas: `docs/specs/2026-10-01-badges-toggle-slider-valores-monetarios.md`
- Specs relacionadas preservadas: SPEC-05 e SPEC-06
- Posição no roadmap: antes da Etapa 3 em `docs/prd/2026-09-29-ordem-execucao-specs.md`

## Objetivo

Ajustar sinais visuais do cabeçalho/wizard, tornar o seletor de tema claramente interativo e
refinar a apresentação de preços e opções no claro/escuro conforme a decisão atual do usuário.

## Decisões aprovadas

- Remover do produto os badges "Simples para quem nao entende de hardware" (hero/wizard) e
  "Recomendacoes inteligentes" (cabeçalho); não substituir por badges equivalentes.
- O controle de tema passa a ser um switch deslizante: trilho e thumb animado comunicam a mudança;
  lua/sol indicam o estado. Manter teclado, acessibilidade, persistência `assistente_tech_theme` e
  tema sem flash.
- Valores monetários deixam de usar fundo verde preenchido. Valores comuns usam texto cinza
  semântico e contorno Roxo Tech; valores explicitamente recomendados usam texto Roxo Tech. No
  modal de substituição, preço, validação e ação deixam de ser cápsulas verdes preenchidas e
  passam a controles neutros com contorno/realce roxo coerente. Manter fundo sem preenchimento.
- Esta decisão substitui, para apresentação de preços e cápsulas de compra/validação desta
  iniciativa, a apresentação verde prevista na SPEC-06. A SPEC-06 permanece preservada; este PRD e
  a spec nova registram a decisão posterior do usuário. Verde pode continuar em outros estados
  positivos se não formar as cápsulas rejeitadas.
- O tema claro permanece padrão e o tema escuro continua disponível. Ambos devem receber os
  ajustes de preço e switch sem perda de legibilidade.

## Escopo

- Remover os dois badges identificados das superfícies descritas.
- Substituir o botão atual do tema por switch animado que atualiza o modo no clique e mantém estado
  claro/escuro, `aria-checked`, navegação por teclado e preferência persistida.
- Atualizar preço, preço recomendado, selo de compatibilidade e ação "Usar" no modal de substituição
  nos dois temas, eliminando os fundos verdes preenchidos.
- Verificar layout e contraste em desktop e mobile.

## Fora de escopo

- Editar as specs existentes SPEC-05/SPEC-06.
- Alterar valores ou papéis semânticos dos tokens globais da paleta fora das apresentações acima.
- Implementar filtragem dinâmica de jogos por objetivo nesta iniciativa.

## Observação futura: jogos por objetivo

Atualmente `App.jsx` lista todos os registros com `tipo === 'JOGO'`; a escolha do objetivo só é
combinada com os jogos selecionados ao solicitar recomendação. A entidade `Jogo` não contém uma
relação/campo objetivo→jogo. Antes de uma futura alteração do passo Objetivo, Jogos, catálogo ou
modelo de dados, revisar se os jogos devem ser filtrados pelo objetivo selecionado. Registrar a
regra de negócio desejada e sua fonte de dados no PRD antes de implementar; não inventar FK, enum,
array de categorias ou associação. Esta revisão não bloqueia nem entra no escopo desta iniciativa.

## Checklist e aceite

- [x] Remover os dois badges sem introduzir badges equivalentes.
- [x] Switch deslizante alterna tema, comunica o estado com lua/sol, suporta teclado e persiste a
      preferência sem flash.
- [x] Valores comuns em cinza com contorno Roxo Tech; valores recomendados com texto Roxo Tech.
- [x] Modal substitui cápsulas verdes preenchidas por layout neutro/roxo e mantém compatibilidade
      visível.
- [ ] Tema claro e escuro permanecem legíveis; sem overflow em mobile.
- [ ] Build e verificações visuais registrados na entrega.

## Direção visual mais recente

Em 2026-10-01, o usuário pediu que os campos de orçamento retornassem à referência visual enviada:
valor atual em destaque sem cápsula, opções sugeridas com contorno neutro e a opção ativa preenchida
em roxo. Aplicar contraste minimalista nos temas claro e escuro. Esta instrução posterior prevalece
para o seletor de orçamento; manter a spec existente preservada.

Em 2026-10-01, o usuário também solicitou uma alternância de tema mais suave. Durante 480 ms,
cores, fundos, bordas, sombras e movimento do thumb devem interpolar em conjunto; o tema e a
preferência persistida continuam mudando imediatamente. Respeitar `prefers-reduced-motion`.

Em 2026-10-01, o usuário pediu que o alerta de orçamento deixasse de ficar fixo sobre a lista e que
as peças fossem reorganizadas para não cortar em telas mobile. Apresentar o alerta no fluxo normal e
usar cards responsivos para as listas de montagem e resultado abaixo do breakpoint desktop.

## Entrega

Implementação funcional em andamento; revisão visual manual ainda pendente. Arquivos: `workspace/frontend/src/App.jsx`, `workspace/frontend/src/components/Header.jsx`, `workspace/frontend/src/components/OpcoesReceitas.jsx`, `workspace/frontend/src/components/SubstitutionModal.jsx`, `workspace/frontend/src/components/Resultado.jsx`, `workspace/frontend/src/components/BudgetStep.jsx`, `workspace/frontend/src/components/AlertBanner.jsx`, `workspace/frontend/src/components/Configurator.jsx` e `workspace/frontend/src/index.css`. Build de produção (`npm run build`) passou após os ajustes. Validar o alerta e as listas em desktop/mobile antes de marcar a iniciativa como entregue.
