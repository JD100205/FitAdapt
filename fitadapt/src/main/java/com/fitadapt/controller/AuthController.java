package com.fitadapt.controller;

import com.fitadapt.dto.LoginRequestDTO;
import com.fitadapt.dto.LoginResponseDTO;
import com.fitadapt.model.Usuario;
import com.fitadapt.repository.UsuarioRepository;
import com.fitadapt.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository usuarioRepository, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
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
}