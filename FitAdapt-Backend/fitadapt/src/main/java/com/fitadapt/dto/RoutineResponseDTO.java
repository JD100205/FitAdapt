package com.fitadapt.dto;

import java.time.LocalDate;
import java.util.List;

public record RoutineResponseDTO(
        Integer idRutina,
        LocalDate fecha,
        String objetivo,
        List<ExerciseDetailDTO> ejercicios
) {}