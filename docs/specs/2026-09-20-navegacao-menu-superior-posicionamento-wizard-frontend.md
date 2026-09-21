# Especificação Técnica: Estrutura de Navegação do Menu Superior e Posicionamento do Wizard

- **ID:** SPEC-08 (Revisada)
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React / Layout)
- **Status:** Aprovado e Alinhado com o Guia de Estilo e UX

---

## 1. Objetivo
Eliminar redundâncias na barra de navegação superior e reorganizar a composição espacial da Hero Section, desobstruindo a visualização da mídia temática de fundo e direcionando a caixa do Wizard para uma posição que valorize a experiência visual e a hierarquia de conteúdo.

---

## 2. Escopo
- **Revisão da Barra de Navegação:**
  - **Remoção definitiva** do link "Montar PC" da lista de links centrais do cabeçalho superior.
  - A lista de navegação conterá estritamente 3 links:
    1. "Grupo de Ofertas" (âncora `#ofertas`)
    2. "Blog & Guias" (âncora `#blog`)
    3. "Sobre Nós" (âncora `#sobre`)
  - Manutenção do botão CTA primário "Começar Agora" no canto direito da barra (com direcionamento para o Wizard).
- **Reposicionamento do Wizard na Hero Section:**
  - Deslocamento do container do Wizard para a metade inferior da primeira dobra / base da Hero Section.
  - Liberação do quadrante central e superior para livre contemplação do vídeo de fundo de hardware em alta definição.
  - Ajuste de espaçamento vertical e padding para entrada orgânica do fluxo de montagem.

---

## 3. Fora de Escopo
- Manter o link "Montar PC" concorrendo com o botão de CTA "Começar Agora" na barra superior.
- Ocultar ou remover o Wizard da Landing Page.

---

## 4. Critérios de Aceite
- O menu de navegação no cabeçalho deve renderizar com precisão os 3 links homologados: "Grupo de Ofertas", "Blog & Guias" e "Sobre Nós".
- A área superior da Hero Section deve evidenciar o vídeo em loop contínuo com título e subtítulo sem o bloqueio de containers maciços.
- O container do Wizard deve estar situado na parte inferior da primeira dobra, convidando visualmente o usuário a iniciar o preenchimento das etapas.

---

## 5. Diretrizes de UX e Design
- Todos os botões, links e menus em `Header.jsx` devem utilizar ícones Font Awesome sem uso de emojis.
- Hierarquia de leitura clássica em formato F/Z direcionando o olhar do vídeo -> proposta de valor -> configurador.

---

## 6. Validação PRD e Arquitetura
- Validação contra as diretrizes do `AGENTS.md` e conformidade estrutural com o `ARCHITECTURE.md`.
