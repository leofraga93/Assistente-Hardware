package com.hardwareassist;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RecomendacaoIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void catalogoCarregaDadosSeed() throws Exception {
        mockMvc.perform(get("/api/catalogo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.produtos").isArray())
                .andExpect(jsonPath("$.produtos.length()").isNumber())
                .andExpect(jsonPath("$.jogos.length()").value(8))
                .andExpect(jsonPath("$.receitas.length()").value(4));
    }

    @Test
    void recomendacaoMontaConfiguracaoCompleta() throws Exception {
        String body = """
                {"orcamento": 5000, "jogoIds": [1, 2], "marca": "AMD"}
                """;
        String resposta = mockMvc.perform(post("/api/recomendacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.itens.length()").value(7))
                .andReturn().getResponse().getContentAsString();

        JsonNode json = objectMapper.readTree(resposta);
        assertThat(json.get("total").decimalValue().doubleValue()).isGreaterThan(0);
        assertThat(json.get("pesoGeralCalculado").asInt()).isGreaterThan(0);
        assertThat(json.get("plataforma").asText()).startsWith("AMD");
    }

    @Test
    void recomendacaoRespeitaCompatibilidade() throws Exception {
        String body = """
                {"orcamento": 8000, "jogoIds": [4, 6]}
                """;
        String resposta = mockMvc.perform(post("/api/recomendacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        JsonNode json = objectMapper.readTree(resposta);
        String plataforma = json.get("plataforma").asText();

        JsonNode cpu = findItem(json, "CPU");
        JsonNode placa = findItem(json, "PLACA_MAE");
        JsonNode ram = findItem(json, "RAM");
        JsonNode fonte = findItem(json, "FONTE");

        assertThat(cpu.get("plataforma").asText()).isEqualTo(plataforma);
        assertThat(placa.get("plataforma").asText()).isEqualTo(plataforma);
        assertThat(ram.get("tipoMemoria").asText()).isEqualTo(placa.get("tipoMemoria").asText());
        assertThat(fonte.get("id").asLong()).isPositive();
    }

    @Test
    void orcamentoMuitoBaixoRetornaErro() throws Exception {
        String body = """
                {"orcamento": 200}
                """;
        mockMvc.perform(post("/api/recomendacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    private JsonNode findItem(JsonNode recomendacao, String categoria) {
        for (JsonNode item : recomendacao.get("itens")) {
            if (item.get("categoria").asText().equals(categoria)) {
                return item;
            }
        }
        throw new AssertionError("Item da categoria " + categoria + " nao encontrado");
    }
}
