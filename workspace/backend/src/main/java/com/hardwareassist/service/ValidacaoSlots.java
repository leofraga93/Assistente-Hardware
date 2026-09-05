package com.hardwareassist.service;

import com.hardwareassist.domain.Produto;
import com.hardwareassist.domain.TipoComponente;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Order(3)
public class ValidacaoSlots implements RegraCompatibilidade {

    @Override
    public Optional<String> validar(List<Produto> itens) {
        Produto placa = ItensMontagem.primeiroPorCategoria(itens, TipoComponente.PLACA_MAE);
        int usados = ItensMontagem.slotsRamUsados(itens);
        if (placa == null || usados <= 0) {
            return Optional.empty();
        }
        int fornecidos = placa.getSlotsRamFornecidos() != null ? placa.getSlotsRamFornecidos() : 0;
        if (fornecidos > 0 && usados > fornecidos) {
            return Optional.of("Limite de slots de memoria excedido: a configuracao usa "
                    + usados + " slots e a placa-mae fornece " + fornecidos + ".");
        }
        return Optional.empty();
    }
}
