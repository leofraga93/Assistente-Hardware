# Especificação Técnica: Gerenciamento de Links de Afiliados e Redirecionador Dinâmico

- **ID:** SPEC-04
- **Data:** 2026-09-20
- **Parte do Sistema:** Backend (Spring Boot) / Roteamento
- **Status:** Pendente de Alinhamento de API (Adicionar rota na Seção 8 do PRD)

---

## 1. Objetivo
Anexar dinamicamente as tags e parâmetros de afiliados nos links de lojas parceiras e contabilizar métricas de acesso (cliques) antes do redirecionamento transparente do usuário para o e-commerce parceiro.

---

## 2. Escopo
- Endpoint de redirecionamento no Spring Boot:
  - `GET /api/redirect/{id}`
- Consulta da entidade `Produto` correspondente ao `{id}` no banco de dados.
- Resgate da URL base do produto armazenada na coluna `link_afiliado TEXT NOT NULL` da tabela `produtos` (Seção 6.3 do PRD).
- Resolução dinâmica da tag de afiliado de acordo com a loja parceira (ex.: Amazon Associates tag, KaBuM! tag, Terabyte, Pichau) via variáveis de ambiente/configuração.
- Registro assíncrono do evento de clique para métricas de conversão (data, produto ID, loja parceira, IP/User-Agent ofuscado).
- Retorno de resposta HTTP com status de redirecionamento `302 Found` apontando para a URL final formatada com a tag.

---

## 3. Fora de Escopo
- Armazenamento de URLs estáticas pré-formatadas com códigos de afiliados fixos diretamente no banco de dados.
- Interceptação de pagamentos ou transações comerciais de terceiros.

---

## 4. Critérios de Aceite
- Ao invocar `GET /api/redirect/{id}` com um ID válido:
  - A requisição responde imediatamente com HTTP `302 Found` e o cabeçalho `Location` preenchido com a URL de destino contendo a tag de afiliado correta.
  - O contador de cliques do produto é incrementado no sistema de métricas.
- Caso o ID não exista:
  - Retornar HTTP `404 Not Found` com mensagem amigável de produto não encontrado.
- O tempo de resposta do endpoint deve ser inferior a 150ms para evitar atrito no redirecionamento.

---

## 5. Diretrizes de UX e Design
- No frontend, o clique no botão de compra ("Ver oferta na loja") deve apresentar feedback visual ágil (micro-loading ou estado ativo suave) antes do redirecionamento.
- Abertura da loja externa em nova aba (`target="_blank"` e `rel="noopener noreferrer"`).

---

## 6. Validação PRD e Arquitetura
- A coluna `link_afiliado TEXT NOT NULL` já está presente na tabela `produtos` (Seção 6.3 do PRD).
- A rota `GET /api/redirect/{id}` deve ser formalmente inserida na Seção 8 de `ARCHITECTURE.md`.
