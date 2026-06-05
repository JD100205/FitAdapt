package com.fitadapt.dto;

public record HistorialResponseDTO(
        String estado,
        Integer puntosObtenidos,
        Integer puntosTotalesNuevos
) {}