package com.hardwareassist.service;

import com.hardwareassist.domain.Produto;
import com.hardwareassist.domain.TipoComponente;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Order(4)
public class ValidacaoFonte implements RegraCompatibilidade {

    @Override
    public Optional<String> validar(List<Produto> itens) {
        Produto fonte = ItensMontagem.primeiroPorCategoria(itens, TipoComponente.FONTE);
        int consumo = consumoTotal(itens);
        if (fonte == null) {
            return Optional.empty();
        }
        int potencia = fonte.getPotenciaWattsFornecida() != null
                ? fonte.getPotenciaWattsFornecida() : 0;
        if (consumo > potencia) {
            return Optional.of("Fonte insuficiente: o consumo estimado da configuracao ("
                    + consumo + "W, ja com a margem de "
                    + ConsumoMontagem.MARGEM_WATTS + "W) ultrapassa os " + potencia
                    + "W fornecidos pela fonte selecionada.");
        }
        return Optional.empty();
    }

    private int consumoTotal(List<Produto> itens) {
        int consumo = 0;
        for (Produto p : itens) {
            if (p.getConsumoWatts() != null) {
                consumo += p.getConsumoWatts();
            }
        }
        int slotsRam = ItensMontagem.slotsRamUsados(itens);
        return consumo + slotsRam * 10 + ConsumoMontagem.MARGEM_WATTS;
    }
}
