# Especificação Técnica: Renderização do Vídeo Temático de Fundo em Loop

- **ID:** SPEC-11 (Nova Spec do Guia de UX)
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React / Mídia e Performance)
- **Status:** Validado e Integrado à Hero Section

---

## 1. Objetivo
Inserir um vídeo de alta qualidade focado em componentes de hardware e montagem tecnológica em reprodução contínua (*loop*) no plano de fundo da Hero Section, potencializando o apelo visual do portal e o engajamento imediato dos visitantes.

---

## 2. Escopo
- **Integração de Mídia Nativa:**
  - Utilização da tag `<video>` do HTML5 no componente React com atributos obrigatórios para autoplay cross-browser:
    - `autoPlay`: Início imediato sem necessidade de intervenção do usuário.
    - `loop`: Repetição perpétua sem pausas ou recarregamentos visíveis.
    - `muted`: Áudio silenciado na camada de mídia para permitir autoplay irrestrito pelos navegadores modernos.
    - `playsInline`: Suporte nativo em dispositivos móveis (evitando abertura forçada em tela cheia no iOS/Android).
  - Imagem poster de alta qualidade pré-carregada para evitar telas pretas durante o carregamento inicial.
  - Enquadramento responsivo com `w-full h-full object-cover object-center pointer-events-none`.
- **Camada de Contraste e Legibilidade (Overlay):**
  - Aplicação de gradiente vertical escuro/translúcido (`bg-gradient-to-b from-slate-950/60 via-slate-950/85 to-slate-950`) sobre o elemento de vídeo.
  - Garantia de que a taxa de contraste sobre títulos, subtítulos e formulários permaneça acima do padrão WCAG AA.
- **Adaptação Responsiva:**
  - Quebra e adaptação proporcional da visualização do vídeo em telas móveis, tablets e monitores ultrawide sem causar vazamento de rolagem horizontal (*horizontal overflow*).

---

## 3. Fora de Escopo
- Vídeos pesados sem compressão ou fontes externas que causem lentidão no carregamento inicial.
- Reprodução com áudio ativado ou controles manuais visíveis (play/pause/barra de progresso).

---

## 4. Critérios de Aceite
- O vídeo deve iniciar a reprodução automaticamente sem som em todos os navegadores modernos (Chrome, Firefox, Safari, Edge) tanto em desktop quanto em mobile.
- A reprodução contínua em loop não deve ocasionar congelamento da interface nem elevação desproporcional do consumo de CPU/GPU.
- Os textos informativos dispostos sobre a Hero Section devem ser lidos com total nitidez e conforto visual.
- A mídia não deve bloquear eventos de clique ou interação dos elementos situados acima dela (`pointer-events-none`).

---

## 5. Diretrizes de UX e Design
- Opacidade da camada de vídeo calibrada entre 25% e 35% combinada ao gradiente para manter a atmosfera tecnológica sem sobrecarregar a visão do usuário.
- Ausência total de emojis na interface sobreposta.

---

## 6. Validação PRD e Arquitetura
- Integra-se diretamente à reestruturação da Hero Section descrita na SPEC-08 e ao layout principal no `ARCHITECTURE.md`.
