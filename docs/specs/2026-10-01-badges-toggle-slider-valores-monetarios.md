# Spec: badges, switch de tema e apresentação de preços

- ID: SPEC-12
- Status: Planejada
- Data: 2026-10-01
- PRD: `docs/prd/2026-10-01-ajustes-identidade-e-estados-wizard.md`
- Specs relacionadas, preservadas: `2026-09-20-tema-claro-padrao-alternancia-modo-escuro-frontend.md` (SPEC-05) e `2026-09-20-paleta-cores-organica-5-tonalidades-frontend.md` (SPEC-06)

## Objetivo

Aplicar as preferências de interface registradas pelo usuário ao cabeçalho, seletor de tema,
valores monetários e modal de substituição, preservando os temas claro e escuro.

## Escopo

- Remover o badge "Simples para quem nao entende de hardware" do hero/wizard e o badge
  "Recomendacoes inteligentes" do cabeçalho, sem criar substitutos equivalentes.
- Converter o botão de tema em switch acessível com trilho e thumb deslizante animado; lua/sol
  indicam tema claro/escuro. Usar `role="switch"`, `aria-checked`, ativação por teclado e manter
  a preferência `assistente_tech_theme` e o tratamento sem flash existentes.
- Valores comuns: texto no tom cinza semântico do tema, contorno Roxo Tech e sem fundo verde.
- Valor explicitamente recomendado: texto Roxo Tech; sem fundo verde.
- Modal de substituição: substituir cápsulas verdes preenchidas de preço, "Validado pelo backend"
  e "Usar" por texto/campos neutros, contorno ou ação Roxo Tech, e status de compatibilidade
  claramente legível. Nenhuma cápsula verde preenchida para preço/ação/validação.
- Aplicar os estados claro e escuro sem mudar a persistência nem remover qualquer modo.

## Fora de escopo

- Alterar ou reescrever SPEC-05 ou SPEC-06.
- Filtrar a lista de jogos por objetivo ou modificar o modelo de dados.
- Redesenhar hero, navegação ou o restante das seções do site.

## Critérios de aceite

- Os dois badges exatos não são renderizados no site.
- O switch anima o thumb ao alternar; o estado anunciado por tecnologia assistiva corresponde ao
  tema ativo, clique/espaço/enter funcionam e a preferência continua após recarregar.
- Primeira visita sem preferência permanece clara; claro e escuro podem ser alternados sem flash.
- Valores comuns ficam cinza com contorno roxo; recomendados ficam com texto roxo; preços e ações
  do modal não usam fundos verdes preenchidos.
- Contraste de texto atende WCAG AA (4,5:1 para texto normal) em ambos os modos.
- Desktop e mobile sem overflow; build de produção passa.

## Decisão de compatibilidade com SPEC-06

A decisão posterior do usuário substitui a apresentação de preços da SPEC-06 nesta feature: valores
não recebem fundo verde. A spec existente permanece imutável; a regra vigente desta implementação
é a registrada neste arquivo e em seu PRD.
