package com.fitadapt.controller;

import com.fitadapt.dto.RoutineResponseDTO;
import com.fitadapt.service.RoutineGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rutinas")
public class RoutineController {

    private final RoutineGeneratorService routineGeneratorService;

    public RoutineController(RoutineGeneratorService routineGeneratorService) {
        this.routineGeneratorService = routineGeneratorService;
    }

    @PostMapping("/generar/{idUsuario}")
    public ResponseEntity<RoutineResponseDTO> generarRutina(@PathVariable Integer idUsuario) {
        RoutineResponseDTO nuevaRutina = routineGeneratorService.generarRutinaAutomatica(idUsuario);
        return ResponseEntity.ok(nuevaRutina);
    }
}