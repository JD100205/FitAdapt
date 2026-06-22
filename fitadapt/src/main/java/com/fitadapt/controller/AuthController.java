package com.fitadapt.controller;

import com.fitadapt.dto.LoginRequestDTO;
import com.fitadapt.dto.LoginResponseDTO;
import com.fitadapt.dto.RegistroRequestDTO;
import com.fitadapt.model.Rol;
import com.fitadapt.model.Usuario;
import com.fitadapt.repository.RolRepository;
import com.fitadapt.repository.UsuarioRepository;
import com.fitadapt.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository usuarioRepository, RolRepository rolRepository, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginReal(@RequestBody LoginRequestDTO request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getContrasenia().equals(request.contrasenia())) {
            return ResponseEntity.status(401).body("Contraseña incorrecta");
        }
        String token = jwtService.generateToken(usuario.getEmail(), "USUARIO");

        return ResponseEntity.ok(new LoginResponseDTO(token, usuario.getIdUsuario(), usuario.getNombre()));
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroRequestDTO request) {
        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        Rol rolUsuario = rolRepository.findByNombreRol("CLIENTE")
                .orElseThrow(() -> new RuntimeException("Error crítico: Rol 'USUARIO' no existe en la BD"));

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(request.nombre());
        nuevoUsuario.setEmail(request.email());
        nuevoUsuario.setContrasenia(request.contrasenia());
        nuevoUsuario.setEstado("ACTIVO");
        nuevoUsuario.setPuntosTotales(0);
        nuevoUsuario.setRol(rolUsuario);

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}