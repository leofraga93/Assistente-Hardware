package com.hardwareassist.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record ConfiguracaoValidacaoRequest(
        @NotEmpty
        List<Long> produtoIds) {
}
