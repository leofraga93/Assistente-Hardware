# Especificação Técnica: Hero Section com Mídia Temática e Menu Fixo (Sticky)

- **ID:** SPEC-07
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React / Tailwind CSS)
- **Status:** Validado e Integrado com Specs 08 e 11

---

## 1. Objetivo
Garantir que a barra de navegação permaneça acessível durante toda a rolagem da Landing Page através de fixação com transparência vítrea, estruturando a Hero Section para suporte visual de alta qualidade com mídia temática.

---

## 2. Escopo
- **Cabeçalho com Posicionamento Fixo:**
  - Aplicação de `fixed top-0 left-0 w-full z-50` com efeito translúcido `backdrop-blur-md`.
  - Borda inferior sutil em conformidade com o tema ativo (`border-slate-800/50` no dark mode e `border-slate-200/80` no light mode).
  - Altura padrão de 64px (`h-16`) mantendo proporções harmônicas.
- **Estruturação da Hero Section:**
  - Espaçamento superior compensatório de segurança (`pt-28 md:pt-36`) para evitar sobreposição do conteúdo sob a barra fixa.
  - Camada de fundo preparada para receber mídia em vídeo contínuo (conforme SPEC-11) com sobreposição de gradientes para preservação de legibilidade.
  - Posicionamento z-index calibrado: vídeo e gradiente em `z-0`, conteúdo textual e interativo em `z-10`, e menu de navegação em `z-50`.

---

## 3. Fora de Escopo
- Desfixação ou desaparecimento do cabeçalho durante a rolagem da página.
- Menus suspensos invasivos que ocupem a tela inteira em desktop.

---

## 4. Critérios de Aceite
- Ao rolar a página verticalmente, a barra de navegação deve permanecer visível e estática no topo, sem saltos de layout (*jank* ou travamentos).
- Elementos gráficos e de texto devem rolar de forma fluida por baixo do cabeçalho translúcido.
- A sobreposição de profundidade (*z-index*) não deve permitir que nenhum componente da página cubra a barra fixa.

---

## 5. Diretrizes de UX e Design
- Preservação da legibilidade do logotipo e dos links de navegação mesmo sobre imagens e vídeos em movimento.
- Efeito *backdrop-blur* calibrado para equilíbrio entre estética moderna e desempenho em dispositivos de menor capacidade gráfica.

---

## 6. Validação PRD e Arquitetura
- Melhora o container visual que envelopa o fluxo do Wizard em `App.jsx`, alinhado às diretrizes de arquitetura.
