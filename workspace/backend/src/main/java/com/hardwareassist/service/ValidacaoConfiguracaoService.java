package com.hardwareassist.service;

import com.hardwareassist.domain.Produto;
import com.hardwareassist.dto.ValidacaoConfiguracaoResponse;
import com.hardwareassist.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class ValidacaoConfiguracaoService {

    private final ProdutoRepository produtoRepository;
    private final List<RegraCompatibilidade> regras;

    public ValidacaoConfiguracaoService(ProdutoRepository produtoRepository,
                                        List<RegraCompatibilidade> regras) {
        this.produtoRepository = produtoRepository;
        this.regras = regras;
    }

    public ValidacaoConfiguracaoResponse validar(List<Long> produtoIds) {
        Set<Long> unicos = new LinkedHashSet<>(produtoIds);
        if (unicos.size() != produtoIds.size()) {
            return new ValidacaoConfiguracaoResponse(false,
                    List.of("A configuracao nao pode conter produtos duplicados."));
        }
        List<Produto> itens = produtoRepository.findAllById(produtoIds);
        if (itens.size() != produtoIds.size()) {
            return new ValidacaoConfiguracaoResponse(false,
                    List.of("Um ou mais produtos informados nao foram encontrados no catalogo."));
        }
        List<String> problemas = new ArrayList<>();
        for (RegraCompatibilidade regra : regras) {
            regra.validar(itens).ifPresent(problemas::add);
        }
        return new ValidacaoConfiguracaoResponse(problemas.isEmpty(), problemas);
    }
}
