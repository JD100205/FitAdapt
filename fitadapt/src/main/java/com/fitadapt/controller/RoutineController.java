package com.fitadapt.controller;

import com.fitadapt.dto.RoutineResponseDTO;
import com.fitadapt.service.RoutineGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rutinas")
public class RoutineController {

    private final RoutineGeneratorService routineGeneratorService;

    public RoutineController(RoutineGeneratorService routineGeneratorService) {
        this.routineGeneratorService = routineGeneratorService;
    }

    @GetMapping("/hoy/{idUsuario}")
    public ResponseEntity<RoutineResponseDTO> obtenerRutinaHoy(@PathVariable Integer idUsuario) {
        RoutineResponseDTO rutina = routineGeneratorService.obtenerRutinaDeHoy(idUsuario);

        if (rutina == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(rutina);
    }

    // TU ENDPOINT POST ORIGINAL (Intacto)
    @PostMapping("/generar/{idUsuario}")
    public ResponseEntity<RoutineResponseDTO> generarRutina(@PathVariable Integer idUsuario) {
        RoutineResponseDTO nuevaRutina = routineGeneratorService.generarRutinaAutomatica(idUsuario);
        return ResponseEntity.ok(nuevaRutina);
    }
}