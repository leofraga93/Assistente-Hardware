# Spec: erro amigavel quando o catalogo nao carrega

- Status: entregue
- Data: 2026-09-20
- Checklist no PRD: secao 2 — "Wizard mostra erro amigavel se GET /api/catalogo falhar"

## Objetivo

Se a API estiver fora (Vercel sem Spring Boot, backend local parado, 404, rede), o usuario
entende o problema e pode tentar de novo. Nao fica tela de Objetivo/Jogos em branco nem
"Carregando..." eterno.

## Escopo

- Distinguir carregando, sucesso e falha no `App.jsx`.
- Mensagem clara nos passos Objetivo e Jogos (icone Font Awesome, texto, botao tentar novamente).
- Banner no wizard quando a API falhar, inclusive no passo 1 e 4.
- `VITE_API_BASE` em `api.js` para, depois, apontar o front da Vercel a um host Java.
- Nao alterar ENUMs, seed nem publicar o backend.

## Fora de escopo

- Deploy do Spring Boot (continua na spec `2026-09-20-vercel-wizard-objetivo-sem-catalogo.md`).
- Mock de catalogo no frontend.

## Criterios de aceite

- [x] Com API no ar, Objetivo e Jogos seguem listando o catalogo (`OBJETIVO` / `JOGO`).
- [x] Sem API, Objetivo e Jogos mostram erro amigavel (nao grid vazio nem loading infinito).
- [x] Ha acao de tentar novamente que refaz `GET /api/catalogo`.
- [x] `api.js` usa `import.meta.env.VITE_API_BASE` (vazio = mesma origem, proxy local).
