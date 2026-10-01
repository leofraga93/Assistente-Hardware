# PRD: Preparação do backend para Railway

- Estado: Bloqueado por configuração externa
- Data: 2026-09-30
- PRD de origem: `docs/prd/2026-09-29-ordem-execucao-specs.md`, Etapa 1
- Spec relacionada: `docs/specs/2026-09-20-vercel-wizard-objetivo-sem-catalogo.md` (preservada)

## Objetivo

Preparar o Spring Boot para escutar a porta dinâmica do Railway e documentar a configuração
externa necessária para a Vercel consumir a API publicada.

## Escopo

- Usar `PORT` fornecida pelo host, mantendo `8080` como fallback local.
- Preservar o datasource H2 seedado para validar o fluxo público atual.
- Registrar configuração de Root Directory, domínio público, `VITE_API_BASE` e smoke tests.
- Validar localmente catálogo, recomendação e substituição.

## Fora de escopo

- Criar ou configurar serviço no painel Railway, domínio ou variáveis secretas externas.
- Alterar os arquivos existentes em `docs/specs/`.
- Migrar para PostgreSQL ou implementar CRUD administrativo.
- Modificar regras CORS; as rotas exercitadas agora são públicas e o backend já permite origem
  cruzada em `/api/**`.

## Critérios e checklist

- [x] Spring lê a variável `PORT` e mantém `8080` como padrão.
- [x] Testes do backend passam.
- [x] Execução local com `PORT` alternativo atende `/api/catalogo`.
- [x] Documentados os passos externos de deploy Railway e configuração Vercel.
- [ ] Após o usuário configurar os serviços, validar `/api/catalogo`, recomendação e substituição
      pelo domínio público Railway e pela Vercel.

## Estado/limites externos

- Backend no repositório: `workspace/backend`; configurar Railway Root Directory como
  `workspace/backend`.
- Vercel: definir `VITE_API_BASE` com o domínio público HTTPS do Railway, sem barra final, e
  executar novo deploy para incorporar a variável de build.
- O critério `/api/catalogo` não exige banco persistente: o H2 é recriado e preenchido por seed.
  Qualquer CRUD exige iniciativa separada para persistência durável.
- A validação pública final depende do usuário criar/publicar o serviço Railway e fornecer seu
  domínio público; não armazenar tokens/segredos no repositório ou na conversa.

## Entrega

- Arquivos: `workspace/backend/src/main/resources/application.yml` e este PRD.
- Validações: `mvn -q test`; execução com `PORT=18080`; `GET /api/catalogo` (44 produtos, 8
  jogos), `POST /api/receitas/recomendadas` (2 recomendações) e
  `POST /api/montagens/substitutas` (2 alternativas) responderam corretamente.
- Bloqueio restante: requer domínio público gerado pelo Railway e configuração da variável
  `VITE_API_BASE` no projeto Vercel para os smoke tests remotos.
