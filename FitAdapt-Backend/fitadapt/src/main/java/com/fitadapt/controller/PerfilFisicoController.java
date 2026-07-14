package com.fitadapt.controller;

import com.fitadapt.dto.PerfilFisicoRequestDTO;
import com.fitadapt.model.PerfilFisico;
import com.fitadapt.model.Usuario;
import com.fitadapt.repository.PerfilFisicoRepository;
import com.fitadapt.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/perfiles")
public class PerfilFisicoController {

    private final PerfilFisicoRepository perfilFisicoRepository;
    private final UsuarioRepository usuarioRepository;

    public PerfilFisicoController(PerfilFisicoRepository perfilFisicoRepository, UsuarioRepository usuarioRepository) {
        this.perfilFisicoRepository = perfilFisicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<?> guardarPerfilFisico(@RequestBody PerfilFisicoRequestDTO request) {
        Usuario usuario = usuarioRepository.findById(request.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        PerfilFisico perfil = perfilFisicoRepository.findByUsuario_IdUsuario(usuario.getIdUsuario())
                .orElse(new PerfilFisico());

        perfil.setUsuario(usuario);
        perfil.setEdad(request.edad());
        perfil.setPeso(request.peso());
        perfil.setAltura(request.altura());
        perfil.setNivelExperiencia(request.nivelExperiencia());
        perfil.setObjetivo(request.objetivo());

        perfilFisicoRepository.save(perfil);

        return ResponseEntity.ok("Perfil físico guardado exitosamente");
    }
}