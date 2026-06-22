package com.fitadapt.controller;

import com.fitadapt.dto.HistorialRequestDTO;
import com.fitadapt.dto.HistorialResponseDTO;
import com.fitadapt.service.HistorialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/historial")
public class HistorialController {

    private final HistorialService historialService;

    public HistorialController(HistorialService historialService) {
        this.historialService = historialService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarEjercicio(@RequestBody HistorialRequestDTO request) {
        try {
            HistorialResponseDTO response = historialService.registrarFinalizacion(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}