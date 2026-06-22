package com.fitadapt.dto;

public record RankingResponseDTO(
        Integer posicion,
        String nombreJugador,
        Integer puntosTotales,
        String ligaActual
) {}