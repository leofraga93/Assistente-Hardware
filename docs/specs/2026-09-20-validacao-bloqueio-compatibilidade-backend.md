# Especificação Técnica: Mecanismo de Validação e Bloqueio de Compatibilidade

- **ID:** SPEC-01
- **Data:** 2026-09-20
- **Parte do Sistema:** Backend (Spring Boot)
- **Status:** Entregue e Validado (12 testes de integração no backend)

---

## 1. Objetivo
Garantir em tempo real a integridade técnica do conjunto de hardware a cada troca ou inclusão de peça no configurador, impedindo que o usuário avance ou finalize montagens com peças incompatíveis entre si.

---

## 2. Escopo
- Execução da esteira de validação no Spring Boot através do endpoint:
  - `POST /api/configuracao/validar`
- Regras de validação técnica contempladas:
  1. **Compatibilidade de Socket:** Processador (CPU) vs. Placa-mãe (ex.: AMD AM4, AMD AM5, Intel LGA1700, Intel LGA1851).
  2. **Geração de Memória:** Verificação DDR4 vs. DDR5 entre processador, placa-mãe e pentes de RAM.
  3. **Limite de Slots de RAM:** Contagem do número de pentes selecionados em relação aos slots físicos disponíveis na placa-mãe.
  4. **Balanço Energético e Consumo:** Cálculo de consumo elétrico total em Watts dos componentes selecionados com aplicação de margem de segurança de 50W (`ConsumoMontagem.MARGEM_WATTS`), comparado à potência nominal da Fonte de Alimentação (PSU).
- Retorno detalhado de violações acumuladas para exibição no cliente.

---

## 3. Fora de Escopo
- Modificação automática ou substituição não autorizada das peças previamente selecionadas pelo usuário.
- Recomendações comerciais forçadas sem consentimento do usuário.

---

## 4. Critérios de Aceite
- **Caso Sucesso (100% Compatível):**
  - Retornar código HTTP `200 OK` com o payload:
    ```json
    {
      "valida": true,
      "problemas": []
    }
    ```
- **Caso Incompatibilidade:**
  - Retornar código HTTP `400 Bad Request` acumulando todas as violações identificadas:
    ```json
    {
      "valida": false,
      "mensagem": "Incompatibilidade detectada na configuração.",
      "problemas": [
        "Socket da CPU (LGA1700) incompatível com a placa-mãe (AM5).",
        "A fonte de 400W é insuficiente para a carga estimada de 480W (incluindo margem de 50W)."
      ]
    }
    ```
- **Frontend Feedback:** Exibir alertas visuais claros e amigáveis, apresentando opções de substituição conforme o design system.

---

## 5. Diretrizes de UX e Design
- Alertas visuais não intrusivos, utilizando a paleta oficial do sistema (sem emojis).
- Ícones em conformidade com Font Awesome SVG core.
- Mensagens explicativas e didáticas voltadas para o público leigo.

---

## 6. Validação PRD e Arquitetura
- Validado contra `ARCHITECTURE.md` (Sessão 3).
- Cobertura de 12 testes de integração passando com sucesso no backend.
