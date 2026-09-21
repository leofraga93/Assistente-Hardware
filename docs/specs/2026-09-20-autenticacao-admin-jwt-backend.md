# Especificação Técnica: Autenticação Admin via JWT (JSON Web Token)

- **ID:** SPEC-02
- **Data:** 2026-09-20
- **Parte do Sistema:** Backend (Spring Security) / Integração Frontend
- **Status:** Nova Funcionalidade (Pendente de inclusão na Seção 8 do PRD)

---

## 1. Objetivo
Restringir e proteger o acesso aos endpoints administrativos de gestão do catálogo de produtos e configurações através de uma arquitetura de autenticação *stateless* com Spring Security e emissão de tokens JWT.

---

## 2. Escopo
- Endpoint de autenticação administrativo:
  - `POST /api/auth/login`
- Validação de credenciais de acesso (e-mail e senha com hash seguro BCrypt).
- Emissão de token JWT assinado criptograficamente contendo:
  - Subject (identificador/e-mail do administrador).
  - Claims de autorização (ex.: `ROLE_ADMIN`).
  - Tempo de expiração definido.
- Middleware/Filtro de segurança Spring Security (`OncePerRequestFilter`) para validação do cabeçalho:
  - `Authorization: Bearer <token>`
- Proteção de rotas restritas de mutação de catálogo (`POST`, `PUT`, `DELETE` em `/api/produtos/**` e configurações de afiliados).

---

## 3. Fora de Escopo
- Exigência de autenticação ou criação de conta para usuários finais/visitantes que estejam apenas montando computadores no configurador.
- Fluxo público de auto-cadastro de novos administradores (administradores criados via seed seguro ou rotina interna).

---

## 4. Critérios de Aceite
- **Credenciais Válidas:**
  - Retornar HTTP `200 OK` acompanhado do token JWT e metadados de sessão:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
      "tipo": "Bearer",
      "expiracao": 86400
    }
    ```
- **Credenciais Inválidas:**
  - Retornar HTTP `401 Unauthorized` com mensagem de erro genérica e segura.
- **Acesso a Rotas Protegidas:**
  - Requisição sem token ou com token expirado/inválido deve retornar imediatamente HTTP `401 Unauthorized` ou HTTP `403 Forbidden`.
  - Requisições com token válido recebem autorização para executar a operação.

---

## 5. Diretrizes de UX e Design
- Formulário de login administrativo integrado visualmente ao padrão do site, respeitando o tema Off-White/Grafite e componentes limpos.
- Feedback de credenciais inválidas em notificações suaves, sem emojis.

---

## 6. Validação PRD e Arquitetura
- Requer atualização prévia do PRD (`ARCHITECTURE.md`) incluindo as rotas de autenticação na Tabela de API da Seção 8 antes da codificação.
