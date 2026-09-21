# Especificação Técnica: Modais de Recomendação de Produtos e Grupos de Compra

- **ID:** SPEC-09
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React / Componentes)
- **Status:** Em Conformidade com Guia de Estilo e UX

---

## 1. Objetivo
Disponibilizar seções ricas de apoio na Landing Page dedicadas a periféricos recomendados, computadores pré-montados e canais de ofertas de hardware, complementadas por modais interativos com especificações detalhadas e atalhos rápidos de aquisição.

---

## 2. Escopo
- **Cards Interativos na Landing Page:**
  1. *Periféricos Recomendados:* Monitores, mouses e teclados custo-benefício.
  2. *PCs Pré-Montados de Fábrica:* Configurações prontas de parceiros com garantia montada.
  3. *Comunidade e Ofertas:* Canais exclusivos (Telegram/WhatsApp) com alertas de quedas de preço.
- **Sistema de Modais Informativos:**
  - Acionamento ao clicar em qualquer um dos cards ou nos botões de detalhe.
  - Exibição de ficha técnica resumida, foto do produto/grupo, selo de melhor valor e link de redirecionamento com afiliado.
  - Mecanismo de fechamento via tecla `Escape`, clique no backdrop escuro ou botão dedicado de fechamento.
  - Bloqueio de rolagem do body (`overflow-hidden`) enquanto o modal estiver aberto.

---

## 3. Fora de Escopo
- Substituição do fluxo do configurador de peças individualizado.
- Carrinho de compras próprio ou checkout interno (as compras ocorrem nas lojas parceiras).

---

## 4. Critérios de Aceite
- O clique em cada um dos três cards deve abrir o modal correspondente sem atraso perceptível.
- O modal deve renderizar as especificações técnicas, preço de referência em Verde Valor (`#10B981`) e botão de ação primário em Roxo Tech (`#6366F1`).
- O modal fecha corretamente ao pressionar `Escape` ou clicar no botão fechar.

---

## 5. Diretrizes de UX e Design
- Estrutura dos modais com bordas arredondadas harmônicas (`rounded-2xl`), fundo em Lavanda Soft no modo claro ou Grafite Profundo no modo escuro, com bordas suaves.
- Ícones em conformidade com Font Awesome 6 (SVG core), sem uso de emojis.

---

## 6. Validação PRD e Arquitetura
- Reutiliza o padrão de comportamento e acessibilidade já estabelecido no componente `SubstitutionModal.jsx` do projeto.
