# Especificação Técnica: Layout com Tema Claro Padrão e Alternância para Modo Escuro

- **ID:** SPEC-05
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React / Tailwind CSS)
- **Status:** Em Conformidade com Guia de Estilo e UX

---

## 1. Objetivo
Padronizar o **Modo Claro** (*Off-White*) como tema inicial e padrão da aplicação para evitar a impressão estética de "protótipo gerado por IA", mantendo a disponibilidade de um alternador no cabeçalho (*toggle*) para que o usuário possa chavear para o **Modo Escuro** (*Slate-950*) a qualquer momento.

---

## 2. Escopo
- Inicialização do estado de tema da aplicação como **Claro** por padrão (`darkMode = false`), respeitando preferência previamente salva em `localStorage` se houver.
- Botão de alternância posicionado no cabeçalho fixo com ícones técnicos:
  - Tema Claro ativo: exibe ícone de Lua (`faMoon`).
  - Tema Escuro ativo: exibe ícone de Sol (`faSun`).
- Mapeamento de estilos estruturais:
  - **Tema Claro (Padrão):**
    - Fundo principal: Off-White (`#F8FAFC` / `slate-50`).
    - Containers do Wizard, seções e cards: Lavanda Soft (`#EEF2FF` / `indigo-50`) e bordas suaves `border-indigo-100` / `border-slate-200`.
    - Textos principais e títulos: Grafite (`#020617` / `slate-950`).
    - Textos secundários: `text-slate-600`.
  - **Tema Escuro (Alternativo):**
    - Fundo principal: Grafite Profundo (`#020617` / `slate-950`).
    - Containers e cards: `bg-slate-900/90` com bordas `border-slate-800`.
    - Textos principais: `text-slate-100`.
    - Textos secundários: `text-slate-400`.

---

## 3. Fora de Escopo
- Carregar o modo escuro como padrão na primeira visita do usuário.
- Uso de cores de fundo cinza puras (#808080) ou branco puro brilhante (#FFFFFF) sem atenuação.

---

## 4. Critérios de Aceite
- Na primeira visita sem histórico de `localStorage`, o site é carregado imediatamente no Modo Claro com fundo `#F8FAFC` e texto `#020617`.
- Ao clicar no botão de alternância do cabeçalho, a classe `dark` é alternada no elemento raiz de forma instantânea e suave, sem piscar (*flash of unstyled content*).
- A preferência do usuário é persistida no `localStorage` sob a chave `assistente_tech_theme`.

---

## 5. Diretrizes de UX e Design
- O botão de alternância deve utilizar exclusivamente ícones Font Awesome 6 (SVG core), sendo estritamente proibido o uso de emojis.
- Contraste em conformidade com WCAG AA (mínimo de 4.5:1 para leitura de textos).

---

## 6. Validação PRD e Arquitetura
- Total conformidade com o Guia de Estilo e UX e as diretrizes globais do `AGENTS.md`.
