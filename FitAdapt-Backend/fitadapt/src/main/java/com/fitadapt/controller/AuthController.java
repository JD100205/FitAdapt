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

import java.util.Optional;

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
        // FIX: antes, si el email no existía se lanzaba una RuntimeException sin capturar,
        // que Spring traduce en un 500 genérico -> el front mostraba "Error al conectar
        // con el servidor" en lugar de un mensaje de credenciales inválidas.
        // Ahora "email no existe" y "contraseña incorrecta" devuelven ambos 401 con el
        // mismo mensaje genérico (no se revela cuál de los dos datos falló, por seguridad
        // y para que el front los trate de forma consistente).
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.email());

        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getContrasenia().equals(request.contrasenia())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        Usuario usuario = usuarioOpt.get();
        String token = jwtService.generateToken(usuario.getEmail(), "USUARIO");

        // FIX: el login no devolvía puntosTotales/rachaActual/protectoresRacha, aunque
        // el frontend (LoginPage) ya los esperaba en la respuesta. Esto hacía que, justo
        // después de iniciar sesión, el balance/racha/protectores se vieran en 0 hasta
        // que el usuario completara alguna acción que sí actualizara el contexto.
        return ResponseEntity.ok(new LoginResponseDTO(
                token,
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getPuntosTotales(),
                usuario.getRachaActual(),
                usuario.getProtectoresRacha()
        ));
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
