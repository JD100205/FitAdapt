package com.fitadapt.controller;

import com.fitadapt.dto.ValidateRehabRequestDTO;
import com.fitadapt.dto.ValidateRehabResponseDTO;
import com.fitadapt.service.RehabilitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rehabilitation")
public class RehabilitationController {

    private final RehabilitationService rehabilitationService;

    public RehabilitationController(RehabilitationService rehabilitationService) {
        this.rehabilitationService = rehabilitationService;
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidateRehabResponseDTO> validateExercise(@RequestBody ValidateRehabRequestDTO request) {
        ValidateRehabResponseDTO response = rehabilitationService.validarEjercicio(request.idUsuario(), request.idEjercicio());
        return ResponseEntity.ok(response);
    }
}