package com.fitadapt.controller;

import com.fitadapt.security.JwtService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    private final JwtService jwtService;

    public TestController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    /**
     * ENDPOINT PÚBLICO: Genera un token sin validar credenciales en BD.
     * Ejemplo: http://localhost:8080/api/auth/token-test?username=juan&role=ADMINISTRADOR
     */
    @GetMapping("/auth/token-test")
    public String getTestToken(@RequestParam String username, @RequestParam String role) {
        return jwtService.generateToken(username, role);
    }

    /**
     * ENDPOINTS PROTEGIDOS: Para verificar que los roles funcionen.
     */
    @GetMapping("/admin/test")
    public String testAdmin() {
        return "Conexión exitosa: Tienes rol de ADMINISTRADOR (Acceso a catálogo).";
    }

    @GetMapping("/planes/test")
    public String testProfesional() {
        return "Conexión exitosa: Tienes rol de PROFESIONAL (Acceso a creación de planes).";
    }

    @GetMapping("/historial/test")
    public String testUsuario() {
        return "Conexión exitosa: Tienes rol de USUARIO (Acceso a gamificación y puntos).";
    }
}

