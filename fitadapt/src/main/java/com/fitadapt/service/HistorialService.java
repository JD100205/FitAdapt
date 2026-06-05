package com.fitadapt.service;

import com.fitadapt.dto.HistorialRequestDTO;
import com.fitadapt.dto.HistorialResponseDTO;
import com.fitadapt.model.Ejercicio;
import com.fitadapt.model.Historial;
import com.fitadapt.model.Usuario;
import com.fitadapt.repository.EjercicioRepository;
import com.fitadapt.repository.HistorialRepository;
import com.fitadapt.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class HistorialService {

    private final HistorialRepository historialRepository;
    private final UsuarioRepository usuarioRepository;
    private final EjercicioRepository ejercicioRepository;

    public HistorialService(HistorialRepository historialRepository, UsuarioRepository usuarioRepository, EjercicioRepository ejercicioRepository) {
        this.historialRepository = historialRepository;
        this.usuarioRepository = usuarioRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    @Transactional
    public HistorialResponseDTO registrarFinalizacion(HistorialRequestDTO request) {

        Usuario usuario = usuarioRepository.findById(request.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Ejercicio ejercicio = ejercicioRepository.findById(request.idEjercicio())
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        int tiempoEstimado = ejercicio.getDuracion();
        int tiempoReal = request.tiempoReal();

        double cumplimiento = ((double) tiempoReal / tiempoEstimado) * 100;

        String estado;
        int puntosCalculados = ejercicio.getCaloriasBase();

        if (cumplimiento < 30.0) {
            estado = "Esfuerzo insuficiente (Sospecha de fraude)";
            puntosCalculados = 0;
        } else if (cumplimiento < 85.0) {
            estado = "Completado con advertencia";
            puntosCalculados = puntosCalculados / 2;
        } else {
            estado = "Completado exitosamente";
        }

        Historial historial = new Historial();
        historial.setUsuario(usuario);
        historial.setEjercicio(ejercicio);
        historial.setFecha(LocalDate.now());
        historial.setResultado(estado);
        historial.setNotas("Cumplimiento del margen de esfuerzo: " + String.format("%.2f", cumplimiento) + "%");
        historial.setTiempoReal(tiempoReal);
        historial.setPuntosObtenidos(puntosCalculados);

        historialRepository.save(historial);

        int puntosActuales = usuario.getPuntosTotales() != null ? usuario.getPuntosTotales() : 0;
        usuario.setPuntosTotales(puntosActuales + puntosCalculados);
        usuarioRepository.save(usuario);

        return new HistorialResponseDTO(estado, puntosCalculados, usuario.getPuntosTotales());
    }
}