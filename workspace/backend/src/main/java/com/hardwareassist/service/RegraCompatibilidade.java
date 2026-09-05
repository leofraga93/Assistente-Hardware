package com.hardwareassist.service;

import com.hardwareassist.domain.Produto;

import java.util.List;
import java.util.Optional;

public interface RegraCompatibilidade {

    Optional<String> validar(List<Produto> itens);
}
