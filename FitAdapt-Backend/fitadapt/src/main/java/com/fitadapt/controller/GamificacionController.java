package com.fitadapt.controller;

import com.fitadapt.dto.RankingResponseDTO;
import com.fitadapt.model.PerfilFisico;
import com.fitadapt.model.Usuario;
import com.fitadapt.repository.PerfilFisicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/v1/gamificacion")
public class GamificacionController {

    private final PerfilFisicoRepository perfilFisicoRepository;

    public GamificacionController(PerfilFisicoRepository perfilFisicoRepository) {
        this.perfilFisicoRepository = perfilFisicoRepository;
    }

    @GetMapping("/ranking/{nivelExperiencia}")
    public ResponseEntity<List<RankingResponseDTO>> obtenerRankingPorNivel(@PathVariable String nivelExperiencia) {

        List<PerfilFisico> perfiles = perfilFisicoRepository.findByNivelExperiencia(nivelExperiencia);

        List<Usuario> usuariosOrdenados = perfiles.stream()
                .map(PerfilFisico::getUsuario)
                .sorted(Comparator.comparing(
                        (Usuario u) -> u.getPuntosTotales() != null ? u.getPuntosTotales() : 0
                ).reversed())
                .toList();

        List<RankingResponseDTO> ranking = new ArrayList<>();
        int posicion = 1;

        for (Usuario u : usuariosOrdenados) {
            int puntos = u.getPuntosTotales() != null ? u.getPuntosTotales() : 0;
            String liga = calcularLiga(puntos);

            ranking.add(new RankingResponseDTO(posicion, u.getNombre(), puntos, liga));
            posicion++;
        }

        return ResponseEntity.ok(ranking);
    }

    private String calcularLiga(int puntos) {
        if (puntos >= 8000) return "Challenger";
        if (puntos >= 5000) return "Diamante";
        if (puntos >= 3000) return "Oro";
        if (puntos >= 1500) return "Plata";
        if (puntos >= 500)  return "Bronce";
        return "Hierro";
    }
}