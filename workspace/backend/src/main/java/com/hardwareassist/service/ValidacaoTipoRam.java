package com.hardwareassist.service;

import com.hardwareassist.domain.Produto;
import com.hardwareassist.domain.TipoComponente;
import com.hardwareassist.domain.TipoRam;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Order(2)
public class ValidacaoTipoRam implements RegraCompatibilidade {

    @Override
    public Optional<String> validar(List<Produto> itens) {
        Produto placa = ItensMontagem.primeiroPorCategoria(itens, TipoComponente.PLACA_MAE);
        Produto ram = ItensMontagem.primeiroPorCategoria(itens, TipoComponente.RAM);
        if (placa == null || ram == null) {
            return Optional.empty();
        }
        TipoRam suportado = placa.getTipoMemoria();
        TipoRam selecionado = ram.getTipoMemoria();
        if (suportado != null && selecionado != null && suportado != selecionado) {
            return Optional.of("Memoria incompativel: a placa-mae suporta " + suportado
                    + " e a memoria selecionada e " + selecionado + ".");
        }
        return Optional.empty();
    }
}
