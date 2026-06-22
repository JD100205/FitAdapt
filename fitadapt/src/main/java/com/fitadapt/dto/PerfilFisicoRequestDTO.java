package com.fitadapt.dto;

import java.math.BigDecimal;

public record PerfilFisicoRequestDTO(
        Integer idUsuario,
        Integer edad,
        BigDecimal peso,
        BigDecimal altura,
        String nivelExperiencia,
        String objetivo
) {}