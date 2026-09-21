# Especificação Técnica: Rodapé Institucional e Botão Voltar ao Topo

- **ID:** SPEC-10
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React / Layout)
- **Status:** Validado e Aprovado

---

## 1. Objetivo
Oferecer um rodapé institucional abrangente e estruturado (inspirado nos grandes portais de hardware) com atalhos de navegação, conformidade jurídica e links sociais, juntamente com um botão flutuante inteligente para retorno rápido e suave ao topo da página.

---

## 2. Escopo
- **Rodapé Institucional (5 Colunas em Desktop):**
  1. *Redes Sociais e Comunidade:* Atalhos estilizados para Twitter/X, Instagram, Facebook e Discord.
  2. *Institucional e Legal:* "Sobre nós", "Termos de uso", "Política de privacidade" e "Divulgação de Afiliados".
  3. *Navegação Geral:* "Home", "Monte seu PC", "Pré-montados", "Blog & Artigos".
  4. *Categorias de Hardware:* Processadores, Placas de Vídeo, Placas-mãe, Memórias RAM, Fontes.
  5. *Periféricos e Acessórios:* Monitores, Mouses, Teclados, Fones de Ouvido, link "Acesso Restrito" para o painel administrativo.
  - Faixa inferior de copyright, ano dinâmico e aviso de transparência sobre links de afiliados.
- **Botão Flutuante "Voltar ao Topo":**
  - Monitoramento contínuo da posição do scroll da janela (`window.scrollY`).
  - Visibilidade condicionada a ultrapassar 50% da altura visível da tela (`window.innerHeight * 0.5`).
  - Animação de entrada suave e pulso/bounce discreto.
  - Ação de rolagem suave programada: `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## 3. Fora de Escopo
- Exibir o botão de voltar ao topo fixado logo no primeiro carregamento antes do scroll do usuário.
- Inclusão de scripts de rastreamento invasivos de terceiros no rodapé.

---

## 4. Critérios de Aceite
- O rodapé deve renderizar em todas as resoluções (2 colunas em mobile e 5 colunas a partir de `md:grid-cols-5`).
- O botão flutuante deve surgir na tela exclusivamente após a rolagem atingir mais de 50% da visualização inicial.
- Ao clicar no botão flutuante, a página deve retornar de maneira fluida e suave ao topo sem travamentos.

---

## 5. Diretrizes de UX e Design
- Fundo do rodapé padronizado em Grafite (`#020617` / `slate-900`) com divisores sutis em `border-slate-800`.
- O botão flutuante deve utilizar obrigatoriamente o ícone `faArrowUp` da biblioteca Font Awesome (SVG core), sendo estritamente proibido o uso de emojis ou imagens externas.

---

## 6. Validação PRD e Arquitetura
- Total alinhamento com as regras de conformidade e acessibilidade do `AGENTS.md` e `ARCHITECTURE.md`.
