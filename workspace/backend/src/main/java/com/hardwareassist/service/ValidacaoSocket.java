package com.hardwareassist.service;

import com.hardwareassist.domain.ArquiteturaPlataforma;
import com.hardwareassist.domain.Produto;
import com.hardwareassist.domain.TipoComponente;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Order(1)
public class ValidacaoSocket implements RegraCompatibilidade {

    @Override
    public Optional<String> validar(List<Produto> itens) {
        Produto cpu = ItensMontagem.primeiroPorCategoria(itens, TipoComponente.CPU);
        Produto placa = ItensMontagem.primeiroPorCategoria(itens, TipoComponente.PLACA_MAE);
        if (cpu == null || placa == null) {
            return Optional.empty();
        }
        ArquiteturaPlataforma plataformaCpu = cpu.getPlataforma();
        ArquiteturaPlataforma plataformaPlaca = placa.getPlataforma();
        if (plataformaCpu != null && plataformaPlaca != null
                && plataformaCpu != plataformaPlaca) {
            return Optional.of("Socket incompativel: o processador usa a plataforma "
                    + nomeAmigavel(plataformaCpu) + " e a placa-mae usa "
                    + nomeAmigavel(plataformaPlaca) + ". Ambos devem ser identicos.");
        }
        return Optional.empty();
    }

    private String nomeAmigavel(ArquiteturaPlataforma plataforma) {
        return plataforma.name().replace('_', ' ');
    }
}
