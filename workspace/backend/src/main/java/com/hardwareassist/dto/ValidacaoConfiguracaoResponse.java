package com.hardwareassist.dto;

import java.util.List;

public record ValidacaoConfiguracaoResponse(
        boolean valida,
        List<String> problemas) {
}
