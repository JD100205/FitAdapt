package com.fitadapt.dto;

public record HistorialRequestDTO(
        Integer idUsuario,
        Integer idEjercicio,
        Integer tiempoReal
) {}