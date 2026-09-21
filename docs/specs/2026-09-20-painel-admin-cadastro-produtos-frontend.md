# Especificação Técnica: Acesso Restrito no Rodapé e Painel Admin de Cadastro

- **ID:** SPEC-03
- **Data:** 2026-09-20
- **Parte do Sistema:** Frontend (React) / Suporte Backend
- **Status:** Pendente Frontend/Backend (Respeitar Seção 6.1 do PRD)

---

## 1. Objetivo
Disponibilizar uma interface gráfica administrativa segura e intuitiva para cadastro, atualização e remoção de produtos de hardware, especificações técnicas, preços e links de afiliados, eliminando a necessidade de execução manual de scripts SQL no banco de dados.

---

## 2. Escopo
- **Ponto de Entrada:** Link discreto "Acesso Restrito" posicionado no rodapé institucional da aplicação.
- **Tela de Login Administrativo:** Rota `/login` ou modal de autenticação integrado que captura e-mail/senha e salva o token JWT em armazenamento seguro de sessão.
- **Painel de Gestão:** Rota `/admin/produtos` no React com:
  - Tabela listando os produtos cadastrados com paginação e busca por nome/categoria.
  - Formulário para criação e edição com validação estrita contra os ENUMs canônicos do sistema:
    - `TipoComponente`: `CPU`, `GPU`, `RAM`, `PLACA_MAE`, `FONTE`, `GABINETE`, `ARMAZENAMENTO`, `PERIFERICO`
    - `ArquiteturaPlataforma`: `AMD_AM4`, `AMD_AM5`, `INTEL_LGA1700`, `INTEL_LGA1851`
    - `TipoRam`: `DDR4`, `DDR5`
  - Campos numéricos validados: TDP (Watts), frequência, capacidade, preço base e loja parceira.
  - Ação de exclusão com confirmação.

---

## 3. Fora de Escopo
- Alterações diretas no banco de dados PostgreSQL via CLI ou console para a operação rotineira do catálogo.
- Customização livre de novos tipos de componentes sem o suporte dos ENUMs correspondentes no backend.

---

## 4. Critérios de Aceite
- Usuário sem autenticação que acessar `/admin/produtos` deve ser redirecionado para a tela de login.
- Usuário com token JWT válido consegue cadastrar um novo componente com sucesso, recebendo confirmação visual.
- O formulário deve impedir submissões com campos em branco ou tipos inválidos, validando obrigatoriamente contra os ENUMs descritos na Seção 6.1 do PRD.
- Ao atualizar o preço ou link de afiliado de um produto, o catálogo público reflete a alteração sem necessidade de reinício da aplicação.

---

## 5. Diretrizes de UX e Design
- Tabela de gestão com layout limpo, espaçamentos generosos e badges de status utilizando a paleta oficial (Lavanda Soft `#EEF2FF`, Verde Valor `#10B981` e Roxo Tech `#6366F1`).
- Ícones exclusivamente Font Awesome 6 (SVG core), proibição estrita de emojis em botões e labels.

---

## 6. Validação PRD e Arquitetura
- O formulário e a tipagem devem aderir estritamente à Seção 6.1 de `ARCHITECTURE.md` sem inventar valores de domínios ou novos componentes não previstos no modelo relacional.
