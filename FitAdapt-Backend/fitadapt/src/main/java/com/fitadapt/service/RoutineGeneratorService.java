package com.fitadapt.service;

import com.fitadapt.dto.ExerciseDetailDTO;
import com.fitadapt.dto.RoutineResponseDTO;
import com.fitadapt.model.*;
import com.fitadapt.repository.EjercicioRepository;
import com.fitadapt.repository.HistorialRepository;
import com.fitadapt.repository.PerfilFisicoRepository;
import com.fitadapt.repository.UsuarioLesionRepository; // ¡NUEVO IMPORT!
import org.springframework.stereotype.Service;
import com.fitadapt.repository.RutinaRepository;
import com.fitadapt.repository.DetalleRutinaRepository;
import com.fitadapt.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class RoutineGeneratorService {

    private final EjercicioRepository ejercicioRepository;
    private final PerfilFisicoRepository perfilFisicoRepository;
    private final RutinaRepository rutinaRepository;
    private final DetalleRutinaRepository detalleRutinaRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioLesionRepository usuarioLesionRepository; // ¡NUEVO!
    private final HistorialRepository historialRepository;

    public RoutineGeneratorService(EjercicioRepository ejercicioRepository, PerfilFisicoRepository perfilFisicoRepository, RutinaRepository rutinaRepository, DetalleRutinaRepository detalleRutinaRepository, UsuarioRepository usuarioRepository, UsuarioLesionRepository usuarioLesionRepository, HistorialRepository historialRepository) {
        this.ejercicioRepository = ejercicioRepository;
        this.perfilFisicoRepository = perfilFisicoRepository;
        this.rutinaRepository = rutinaRepository;
        this.detalleRutinaRepository = detalleRutinaRepository;
        this.usuarioRepository = usuarioRepository;
        this.usuarioLesionRepository = usuarioLesionRepository;
        this.historialRepository = historialRepository;
    }

    public RoutineResponseDTO generarRutinaAutomatica(Integer idUsuario, String volumen) {
        PerfilFisico perfil = perfilFisicoRepository.findByUsuario_IdUsuario(idUsuario)
                .orElseThrow(() -> new RuntimeException("Perfil físico no encontrado para el usuario ID: " + idUsuario));

        String nivel = perfil.getNivelExperiencia();
        String objetivo = perfil.getObjetivo();

        List<Ejercicio> ejerciciosFuerza = ejercicioRepository.findEjerciciosSegurosParaUsuario(nivel, "Fuerza", idUsuario);
        List<Ejercicio> ejerciciosCardio = ejercicioRepository.findEjerciciosSegurosParaUsuario(nivel, "Cardio", idUsuario);

        List<Ejercicio> rutinaSeleccionada = ensamblarEjercicios(ejerciciosFuerza, ejerciciosCardio, objetivo, volumen);

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean tieneLesiones = !usuarioLesionRepository.findByUsuario_IdUsuario(idUsuario).isEmpty();

        Rutina nuevaRutina = new Rutina();
        nuevaRutina.setFecha(LocalDate.now());
        nuevaRutina.setUsuario(usuario);
        nuevaRutina = rutinaRepository.save(nuevaRutina);

        List<ExerciseDetailDTO> ejerciciosDto = new ArrayList<>();

        for (Ejercicio ej : rutinaSeleccionada) {
            ExerciseDetailDTO dto = calcularDetallesEjercicio(ej, nivel, tieneLesiones, false);
            ejerciciosDto.add(dto);

            DetalleRutina detalle = new DetalleRutina();
            detalle.setRutina(nuevaRutina);
            detalle.setEjercicio(ej);
            detalle.setRepeticiones(dto.repeticiones());
            detalle.setTiempo(dto.tiempoEstimadoMinutos());
            detalle.setIntensidad(dto.intensidad());
            detalleRutinaRepository.save(detalle);
        }

        return new RoutineResponseDTO(nuevaRutina.getIdRutina(), nuevaRutina.getFecha(), objetivo, ejerciciosDto);
    }

    public RoutineResponseDTO obtenerRutinaDeHoy(Integer idUsuario) {
        Optional<Rutina> rutinaOpt = rutinaRepository.findFirstByUsuario_IdUsuarioAndFechaOrderByIdRutinaDesc(idUsuario, LocalDate.now());
        if (rutinaOpt.isEmpty()) return null;
        Rutina rutina = rutinaOpt.get();
        List<DetalleRutina> detalles = detalleRutinaRepository.findByRutina_IdRutina(rutina.getIdRutina());
        String objetivo = perfilFisicoRepository.findByUsuario_IdUsuario(idUsuario)
                .map(PerfilFisico::getObjetivo).orElse("General");

        // FIX: se agrega el flag "completado" por ejercicio, calculado a partir del
        // Historial del día. Antes el frontend no tenía forma de saber qué ejercicios
        // de la rutina de hoy ya se habían registrado, así que al volver a "Entrenar"
        // siempre se mostraba todo como pendiente (permitiendo re-registrar el mismo
        // ejercicio y sumar puntos otra vez), y el Dashboard nunca ofrecía la opción
        // de elegir intensidad para una sesión nueva una vez terminada la de hoy.
        java.time.LocalDateTime inicioDia = LocalDate.now().atStartOfDay();
        java.time.LocalDateTime finDia = inicioDia.plusDays(1);
        java.util.Set<Integer> idsCompletadosHoy = historialRepository
                .findByUsuario_IdUsuarioAndFechaHoraBetween(idUsuario, inicioDia, finDia)
                .stream()
                .map(h -> h.getEjercicio().getIdEjercicio())
                .collect(java.util.stream.Collectors.toSet());

        List<ExerciseDetailDTO> ejerciciosDto = detalles.stream().map(d -> new ExerciseDetailDTO(
                d.getEjercicio().getIdEjercicio(), d.getEjercicio().getNombre(),
                d.getEjercicio().getDescripcion(), d.getRepeticiones(), d.getTiempo(), d.getIntensidad(),
                idsCompletadosHoy.contains(d.getEjercicio().getIdEjercicio())
        )).toList();
        return new RoutineResponseDTO(rutina.getIdRutina(), rutina.getFecha(), objetivo, ejerciciosDto);
    }

    private List<Ejercicio> ensamblarEjercicios(List<Ejercicio> fuerza, List<Ejercicio> cardio, String objetivo, String volumen) {
        List<Ejercicio> seleccion = new ArrayList<>();
        Collections.shuffle(fuerza);
        Collections.shuffle(cardio);

        int totalFuerza = 0;
        int totalCardio = 0;

        if ("Corta".equalsIgnoreCase(volumen)) {
            if ("Bajar de peso".equalsIgnoreCase(objetivo)) { totalCardio = 2; totalFuerza = 1; }
            else if ("Ganar masa".equalsIgnoreCase(objetivo)) { totalFuerza = 2; totalCardio = 1; }
            else { totalFuerza = 2; totalCardio = 1; }
        } else if ("Intensa".equalsIgnoreCase(volumen)) {
            if ("Bajar de peso".equalsIgnoreCase(objetivo)) { totalCardio = 6; totalFuerza = 3; }
            else if ("Ganar masa".equalsIgnoreCase(objetivo)) { totalFuerza = 7; totalCardio = 2; }
            else { totalFuerza = 5; totalCardio = 4; }
        } else { // Normal
            if ("Bajar de peso".equalsIgnoreCase(objetivo)) { totalCardio = 4; totalFuerza = 2; }
            else if ("Ganar masa".equalsIgnoreCase(objetivo)) { totalFuerza = 5; totalCardio = 1; }
            else { totalFuerza = 3; totalCardio = 3; }
        }

        seleccion.addAll(fuerza.stream().limit(totalFuerza).toList());
        seleccion.addAll(cardio.stream().limit(totalCardio).toList());

        return seleccion;
    }

    private ExerciseDetailDTO calcularDetallesEjercicio(Ejercicio ej, String nivel, boolean tieneLesiones, boolean completado) {
        int repeticiones;
        String intensidad;
        String descripcion = ej.getDescripcion();

        switch (nivel.toLowerCase()) {
            case "avanzado": repeticiones = 20; intensidad = "Alta"; break;
            case "intermedio": repeticiones = 15; intensidad = "Media"; break;
            default: repeticiones = 10; intensidad = "Baja"; break;
        }

        if (tieneLesiones) {
            if ("Alta".equals(intensidad)) {
                intensidad = "Media";
                repeticiones = 15;
            }
            descripcion = descripcion + " [ ALERTA MÉDICA: Este ejercicio es de bajo impacto para tu lesión, pero realízalo con extrema precaución. Detente si hay dolor.]";
        }

        return new ExerciseDetailDTO(
                ej.getIdEjercicio(), ej.getNombre(), descripcion, repeticiones, ej.getDuracion(), intensidad, completado
        );
    }
}