package com.fitadapt.controller;

import com.fitadapt.dto.LesionesRequestDTO;
import com.fitadapt.model.Usuario;
import com.fitadapt.model.UsuarioLesion;
import com.fitadapt.model.ZonaCuerpo;
import com.fitadapt.repository.UsuarioLesionRepository;
import com.fitadapt.repository.UsuarioRepository;
import com.fitadapt.repository.ZonaCuerpoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lesiones")
public class LesionController {

    private final UsuarioLesionRepository usuarioLesionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ZonaCuerpoRepository zonaCuerpoRepository;

    public LesionController(UsuarioLesionRepository usuarioLesionRepository, UsuarioRepository usuarioRepository, ZonaCuerpoRepository zonaCuerpoRepository) {
        this.usuarioLesionRepository = usuarioLesionRepository;
        this.usuarioRepository = usuarioRepository;
        this.zonaCuerpoRepository = zonaCuerpoRepository;
    }

    @PostMapping("/usuario")
    public ResponseEntity<?> registrarLesiones(@RequestBody LesionesRequestDTO request) {
        Usuario usuario = usuarioRepository.findById(request.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<UsuarioLesion> nuevasLesiones = new ArrayList<>();
        for (Integer idZona : request.idsZonasLesionadas()) {
            ZonaCuerpo zona = zonaCuerpoRepository.findById(idZona)
                    .orElseThrow(() -> new RuntimeException("Zona de cuerpo no válida: ID " + idZona));

            UsuarioLesion lesion = new UsuarioLesion();
            lesion.setUsuario(usuario);
            lesion.setZona(zona);
            lesion.setEstadoRecuperacion("En tratamiento"); // Estado por defecto para el MVP

            nuevasLesiones.add(lesion);
        }

        usuarioLesionRepository.saveAll(nuevasLesiones);

        return ResponseEntity.ok("Lesiones registradas correctamente");
    }
}