package com.fitadapt.dto;

public record LoginResponseDTO(
        String token,
        Integer idUsuario,
        String nombre,
        Integer puntosTotales,
        Integer rachaActual,
        Integer protectoresRacha) {
}
