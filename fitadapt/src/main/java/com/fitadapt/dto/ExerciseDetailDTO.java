package com.fitadapt.dto;

public record ExerciseDetailDTO(
        Integer idEjercicio,
        String nombreEjercicio,
        String descripcion,
        Integer repeticiones,
        Integer tiempoEstimadoMinutos,
        String intensidad
) {}