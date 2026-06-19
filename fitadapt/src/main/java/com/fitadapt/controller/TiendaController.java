package com.fitadapt.controller;

import com.fitadapt.model.Usuario;
import com.fitadapt.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tienda")
public class TiendaController {

    private final UsuarioRepository usuarioRepository;

    private static final int PRECIO_PROTECTOR = 400;

    public TiendaController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/comprar-protector/{idUsuario}")
    @Transactional
    public ResponseEntity<?> comprarProtectorRacha(@PathVariable Integer idUsuario) {

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        int puntosActuales = usuario.getPuntosTotales() != null ? usuario.getPuntosTotales() : 0;

        if (puntosActuales < PRECIO_PROTECTOR) {
            return ResponseEntity.badRequest().body("Saldo insuficiente. Tienes " + puntosActuales +
                    " puntos y necesitas " + PRECIO_PROTECTOR + ".");
        }

        usuario.setPuntosTotales(puntosActuales - PRECIO_PROTECTOR);

        int protectoresActuales = usuario.getProtectoresRacha() != null ? usuario.getProtectoresRacha() : 0;
        usuario.setProtectoresRacha(protectoresActuales + 1);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("¡Compra exitosa! Ahora tienes " + usuario.getProtectoresRacha() +
                " protectores de racha y tu saldo es de " + usuario.getPuntosTotales() + " puntos.");
    }
}