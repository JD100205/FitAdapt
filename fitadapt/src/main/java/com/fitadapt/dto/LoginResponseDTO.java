package com.fitadapt.dto;

public record LoginResponseDTO(
        String token,
        Integer idUsuario,
        String nombre) {
}
