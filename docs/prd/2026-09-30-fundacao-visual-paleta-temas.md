# PRD: Fundação visual — paleta e temas

- Estado: Entregue
- Data: 2026-09-30
- Specs relacionadas (preservadas):
  - `docs/specs/2026-09-20-paleta-cores-organica-5-tonalidades-frontend.md` (SPEC-06)
  - `docs/specs/2026-09-20-tema-claro-padrao-alternancia-modo-escuro-frontend.md` (SPEC-05)
- Posição no roadmap: `docs/prd/2026-09-29-ordem-execucao-specs.md`, Etapa 2

## Objetivo

Aplicar a paleta canônica e entregar tema claro como padrão com tema escuro alternável, mantendo
responsabilidades separadas para que a paleta não force nem remova um modo de tema.

## Decisão de escopo

- **SPEC-06 é dona da paleta:** define os cinco valores, seus papéis semânticos e aplicação visual
  em superfícies, texto, CTAs e preços. Ela pode mudar cores visíveis tanto no tema claro quanto
  no escuro, conforme os papéis e critérios descritos na spec.
- **SPEC-06 não é dona do estado do tema:** não decide o modo inicial, não cria o toggle, não muda
  a classe `dark` do elemento raiz e não persiste preferência.
- **SPEC-05 é dona do comportamento e da composição por modo:** define modo claro inicial,
  alternância claro/escuro, persistência em `localStorage`, prevenção de flash e mapeamento de
  componentes por modo. Os valores da paleta devem vir da SPEC-06, sem criar uma paleta paralela.
- Resultado pretendido conforme SPEC-05: primeira visita em tema claro; tema escuro continua
  disponível. Não remover o modo escuro existente nem tornar seus componentes ilegíveis.
- Implementar e validar as duas specs como uma iniciativa coordenada. A fundação de cores não deve
  ser entregue em estado intermediário que force o tema claro, apague o escuro ou deixe tokens
  divergentes entre os modos.

## Escopo

- Mapear as cores atuais e os tokens Tailwind existentes antes de alterá-los.
- Definir tokens/classes da paleta SPEC-06 e aplicá-los aos usos correspondentes.
- Adicionar o comportamento de tema descrito em SPEC-05 usando os mesmos tokens.
- Verificar contraste, preferência salva, alternância, persistência e renderização em ambos os
  modos em desktop e mobile.

## Fora de escopo

- Alterar, renomear ou reescrever SPEC-05 ou SPEC-06.
- Redesenhar layout, hero, navegação, mídia ou conteúdo de landing.
- Introduzir cores/domínios novos fora da paleta aprovada.

## Checklist e critérios

- [x] Confirmar o mapa entre tokens atuais e os cinco papéis cromáticos da SPEC-06.
- [x] Aplicar a paleta sem controlar o modo ativo a partir da SPEC-06.
- [x] Implementar o tema claro inicial, toggle e persistência somente conforme SPEC-05.
- [x] Verificar que os modos claro e escuro permanecem legíveis e sem flash de tema.
- [x] Validar build do frontend e estados visuais nos dois modos.
- [x] Registrar arquivos e resultados; atualizar este PRD e `ARCHITECTURE.md` na entrega.

## Validação de escopo

A SPEC-06 contém instruções de uso de cores específicas ao tema claro/escuro, portanto afeta a
aparência dos dois modos; ela não contém requisitos de estado inicial, alternância ou persistência.
Esses comportamentos pertencem exclusivamente à SPEC-05. Não editar as specs para resolver essa
fronteira; este PRD coordena sua implementação sem ampliar o escopo delas.

## Entrega

- Tokens Tailwind mode-aware adicionados em `workspace/frontend/tailwind.config.js` e definidos
  em `workspace/frontend/src/index.css` para Off-White, Grafite, Roxo Tech, Verde Valor e Lavanda
  Soft, com valores correspondentes para o tema escuro.
- Tema claro inicial, preferência `assistente_tech_theme`, classe `dark` aplicada antes do
  carregamento React e botão Lua/Sol no cabeçalho implementados em `index.html`, `App.jsx` e
  `components/Header.jsx`.
- Componentes ativos e legados migrados para cores adaptáveis; CTAs e estados selecionados usam
  grafite sobre Roxo Tech (contraste medido 4,52:1); preços e estados positivos usam Verde Valor
  com texto grafite (contraste medido 7,95:1). Gradientes ciano/cores fora da paleta removidos.
- Validação: `npm run build` passou (55 módulos); navegador local verificou carregamento claro,
  alternância, persistência após recarga e retorno ao claro; fluxo do wizard, opções e configurador
  funcionou em tema escuro; viewports mobile em 375px sem overflow; console sem erros.
- Specs SPEC-05 e SPEC-06 preservadas sem alterações.
- Próxima iniciativa: Etapa 3 do roadmap, estrutura da landing conforme SPEC-07.
