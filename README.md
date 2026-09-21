# Assistente Hardware

Aplicação web que ajuda a montar uma configuração de computador de acordo com o
objetivo de uso, os jogos selecionados e o orçamento disponível. O sistema
recomenda configurações AMD e Intel, verifica a compatibilidade das peças e
permite substituir componentes por alternativas mais baratas.

## Funcionalidades

- Wizard em quatro etapas: periféricos, objetivos, jogos e orçamento.
- Recomendações de configurações AMD e Intel.
- Catálogo de produtos, jogos e receitas-base.
- Validação de socket, memória RAM, slots e fonte de alimentação.
- Ajuste automático de orçamento priorizando a redução da GPU.
- Substituição de peças por alternativas compatíveis e mais baratas.
- Interface responsiva com React, Tailwind CSS e Font Awesome.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 18, Vite 5, Tailwind CSS 3 e Font Awesome 6 |
| Backend | Java 17, Spring Boot 3.3, Spring Web e Spring Data JPA |
| Persistência | H2 em memória, compatível com o modo PostgreSQL |
| Testes | JUnit e Spring Boot Test |

## Estrutura do projeto

```text
workspace/
├── backend/     # API REST, regras de recomendação e validação
└── frontend/    # Aplicação React e fluxo do configurador
```

`ARCHITECTURE.md` contém o modelo de dados canônico, os domínios aceitos, as
regras de integridade e o contrato detalhado da API.

## Pré-requisitos

- Java 17 ou superior
- Maven 3.9 ou superior
- Node.js 18 ou superior
- npm

## Como executar

Abra dois terminais na raiz do repositório.

### Backend

No Windows:

```powershell
cd workspace\backend
mvn spring-boot:run
```

No Linux ou macOS:

```bash
cd workspace/backend
mvn spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

### Frontend

No Windows:

```powershell
cd workspace\frontend
npm install
npm run dev
```

No Linux ou macOS:

```bash
cd workspace/frontend
npm install
npm run dev
```

A interface ficará disponível em `http://localhost:5173`. Durante o
desenvolvimento, o Vite encaminha as chamadas `/api` para o backend na porta
8080.

## Testes e build

Para executar os testes de integração do backend:

```bash
cd workspace/backend
mvn test
```

Para gerar o build de produção do frontend:

```bash
cd workspace/frontend
npm run build
```

## API principal

Todas as respostas de erro usam o formato `{"mensagem":"..."}`.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/catalogo` | Lista produtos, jogos e receitas |
| `POST` | `/api/recomendacoes` | Retorna a melhor recomendação |
| `POST` | `/api/receitas/recomendadas` | Retorna recomendações AMD e Intel |
| `POST` | `/api/montagens/substitutas` | Lista substitutos compatíveis e mais baratos |
| `POST` | `/api/configuracao/validar` | Valida a configuração atual |

Exemplo de recomendação:

```bash
curl -X POST http://localhost:8080/api/receitas/recomendadas \
  -H "Content-Type: application/json" \
  -d '{"orcamento":4000,"jogoIds":[],"incluiPerifericos":false}'
```

## Regras importantes

- O orçamento mínimo aceito é `300`.
- CPU e placa-mãe devem usar a mesma plataforma.
- RAM e placa-mãe devem usar o mesmo tipo de memória.
- A quantidade de slots de RAM deve ser compatível com a placa-mãe.
- A fonte deve suportar o consumo da configuração com margem de 50 W.
- Cada montagem possui um item por categoria, exceto periféricos.

## Licença

Este projeto é distribuído sob a licença definida em [LICENSE](LICENSE).
