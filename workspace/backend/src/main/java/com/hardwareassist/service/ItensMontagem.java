package com.hardwareassist.service;

import com.hardwareassist.domain.Produto;
import com.hardwareassist.domain.TipoComponente;

import java.util.List;

final class ItensMontagem {

    private ItensMontagem() {
    }

    static Produto primeiroPorCategoria(List<Produto> itens, TipoComponente categoria) {
        return itens.stream()
                .filter(p -> p.getCategoria() == categoria)
                .findFirst()
                .orElse(null);
    }

    static int slotsRamUsados(List<Produto> itens) {
        return itens.stream()
                .filter(p -> p.getCategoria() == TipoComponente.RAM)
                .mapToInt(p -> p.getSlotsRamRequeridos() != null ? p.getSlotsRamRequeridos() : 0)
                .sum();
    }
}
