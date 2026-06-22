package com.fitadapt.dto;

import java.util.List;

public record LesionesRequestDTO(
        Integer idUsuario,
        List<Integer> idsZonasLesionadas // El front enviará un arreglo como [1, 3]
) {}