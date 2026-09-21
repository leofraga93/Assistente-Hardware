# Especificação Técnica: Paleta de Cores Orgânica de 5 Tonalidades

- **ID:** SPEC-06
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (Design System / Tailwind CSS)
- **Status:** Validado e Aprovado pelo Guia de Estilo e UX

---

## 1. Objetivo
Estabelecer a identidade visual única, sóbria e harmoniosa da marca através da aplicação cirúrgica e consistente de 5 cores orgânicas, garantindo diferenciação profissional frente a modelos genéricos.

---

## 2. Escopo
Definição das 5 tonalidades canônicas no Tailwind CSS e sua aplicação estruturada:

1. **Roxo Tech (`#6366F1` / `indigo-600`):**
   - **Uso:** Botões primários de chamada para ação (CTAs), logotipo da marca, destaques ativos no Wizard e estados hover primários.
2. **Grafite (`#020617` / `slate-950`):**
   - **Uso:** Cor primária de títulos e textos corridos no tema claro; fundo principal absoluto no tema escuro; fundo do rodapé institucional.
3. **Off-White (`#F8FAFC` / `slate-50`):**
   - **Uso:** Fundo principal de toda a página no tema claro, proporcionando luminosidade sem fadiga visual.
4. **Verde Valor (`#10B981` / `emerald-500`):**
   - **Uso:** Indicação de preços, selos de ofertas, badges de melhor custo-benefício e tags de compatibilidade confirmada.
5. **Lavanda Soft (`#EEF2FF` / `indigo-50`):**
   - **Uso:** Fundo de containers do Wizard, superfícies de cards no modo claro e divisores/bordas sutis (`#E0E7FF`).

---

## 3. Fora de Escopo
- Introdução de gradientes estridentes (arco-íris, ciano fluorescente em fundo preto).
- Utilização de cores arbitrárias fora da paleta homologada de 5 tonalidades.

---

## 4. Critérios de Aceite
- Todos os componentes React da interface devem herdar as 5 classes/variáveis sem estilos inline aleatórios.
- Botões primários devem renderizar em Roxo Tech com contraste verificado.
- Valores monetários (R$) e badges de desconto devem obrigatoriamente adotar a tonalidade Verde Valor (`#10B981`).
- Containers de formulários e cards no modo claro devem utilizar o fundo Lavanda Soft.

---

## 5. Diretrizes de UX e Design
- A proporção de área segue a regra de hierarquia visual: ~60% Neutros (Off-White/Grafite), ~30% Superfícies de apoio (Lavanda Soft) e ~10% Acentos (Roxo Tech e Verde Valor).
- Sem uso de emojis em badges e títulos.

---

## 6. Validação PRD e Arquitetura
- Totalmente compatível com a configuração Tailwind CSS em `workspace/frontend/` e validado contra o PRD `ARCHITECTURE.md`.
