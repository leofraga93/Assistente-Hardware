# AGENTS.md — Instruções para agentes de IA

Leia este arquivo no início de cada sessão.

## Contexto obrigatório

- Antes de qualquer tarefa, leia `ARCHITECTURE.md` na raiz do repositório. Ele contém:
  - a regra de ouro e o mandato de validação de ENUMs e chaves estrangeiras;
  - o estado atual do projeto, o checklist de escopo e o histórico de interações;
  - o modelo de dados canônico (ENUMs, domínios, tabelas, relacionamentos) e as invariantes.
- **Atualize `ARCHITECTURE.md` ao final de cada interação** (seção "Histórico de interações",
  posição atual e checklist) para que sirva de contexto persistente e indicador de próximo passo.

## Validação obrigatória antes de implementar

Ao propor qualquer implementação, valide a estrutura contra:
1. Os ENUMs e domínios declarados em `ARCHITECTURE.md` seção 6 (nenhum valor inventado);
2. As chaves estrangeiras/relacionamentos declarados na seção 6;
3. As regras de integridade de negócio da seção 7;
4. O estado e o checklist das seções 2 a 5.

Se a proposta divergir, ajuste a proposta ou atualize o documento antes de implementar.

## Regras transversais do ambiente

- Não usar emoji em respostas nem em arquivos.
- Não comentar código sem necessidade.
- Manter textos em português seguindo o padrão existente em cada parte do código.
- Não commitar sem pedido explícito do usuário.
