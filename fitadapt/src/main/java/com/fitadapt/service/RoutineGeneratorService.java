package com.fitadapt.service;

import com.fitadapt.dto.ExerciseDetailDTO;
import com.fitadapt.dto.RoutineResponseDTO;
import com.fitadapt.model.*;
import com.fitadapt.repository.EjercicioRepository;
import com.fitadapt.repository.PerfilFisicoRepository;
import org.springframework.stereotype.Service;
import com.fitadapt.repository.RutinaRepository;
import com.fitadapt.repository.DetalleRutinaRepository;
import com.fitadapt.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class RoutineGeneratorService {

    private final EjercicioRepository ejercicioRepository;
    private final PerfilFisicoRepository perfilFisicoRepository;
    private final RutinaRepository rutinaRepository;
    private final DetalleRutinaRepository detalleRutinaRepository;
    private final UsuarioRepository usuarioRepository;

    public RoutineGeneratorService(EjercicioRepository ejercicioRepository,PerfilFisicoRepository perfilFisicoRepository, RutinaRepository rutinaRepository, DetalleRutinaRepository detalleRutinaRepository, UsuarioRepository usuarioRepository) {
        this.ejercicioRepository = ejercicioRepository;
        this.perfilFisicoRepository = perfilFisicoRepository;
        this.rutinaRepository = rutinaRepository;
        this.detalleRutinaRepository = detalleRutinaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public RoutineResponseDTO generarRutinaAutomatica(Integer idUsuario) {
        PerfilFisico perfil = perfilFisicoRepository.findByUsuario_IdUsuario(idUsuario)
                .orElseThrow(() -> new RuntimeException("Perfil físico no encontrado para el usuario ID: " + idUsuario));

        String nivel = perfil.getNivelExperiencia();
        String objetivo = perfil.getObjetivo();

        List<Ejercicio> ejerciciosFuerza = ejercicioRepository.findEjerciciosSegurosParaUsuario(nivel, "Fuerza", idUsuario);
        List<Ejercicio> ejerciciosCardio = ejercicioRepository.findEjerciciosSegurosParaUsuario(nivel, "Cardio", idUsuario);


        List<Ejercicio> rutinaSeleccionada = ensamblarEjercicios(ejerciciosFuerza, ejerciciosCardio, objetivo);

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Rutina nuevaRutina = new Rutina();
        nuevaRutina.setFecha(LocalDate.now());
        nuevaRutina.setUsuario(usuario);

        nuevaRutina = rutinaRepository.save(nuevaRutina);

        List<ExerciseDetailDTO> ejerciciosDto = new ArrayList<>();

        for (Ejercicio ej : rutinaSeleccionada) {

            ExerciseDetailDTO dto = calcularDetallesEjercicio(ej, nivel);
            ejerciciosDto.add(dto);

            DetalleRutina detalle = new DetalleRutina();
            detalle.setRutina(nuevaRutina);
            detalle.setEjercicio(ej);
            detalle.setRepeticiones(dto.repeticiones());
            detalle.setTiempo(dto.tiempoEstimadoMinutos());
            detalle.setIntensidad(dto.intensidad());
            detalleRutinaRepository.save(detalle);
        }

        return new RoutineResponseDTO(
                nuevaRutina.getIdRutina(),
                nuevaRutina.getFecha(),
                objetivo,
                ejerciciosDto
        );
    }


    private List<Ejercicio> ensamblarEjercicios(List<Ejercicio> fuerza, List<Ejercicio> cardio, String objetivo) {
        List<Ejercicio> seleccion = new ArrayList<>();

        Collections.shuffle(fuerza);
        Collections.shuffle(cardio);

        if ("Bajar de peso".equalsIgnoreCase(objetivo)) {

            seleccion.addAll(cardio.stream().limit(3).toList());
            seleccion.addAll(fuerza.stream().limit(2).toList());
        } else if ("Ganar masa".equalsIgnoreCase(objetivo)) {

            seleccion.addAll(fuerza.stream().limit(4).toList());
            seleccion.addAll(cardio.stream().limit(1).toList());
        } else {

            seleccion.addAll(fuerza.stream().limit(2).toList());
            seleccion.addAll(cardio.stream().limit(2).toList());
        }

        return seleccion;
    }

    private ExerciseDetailDTO calcularDetallesEjercicio(Ejercicio ej, String nivel) {
        int repeticiones;
        String intensidad;

        switch (nivel.toLowerCase()) {
            case "avanzado":
                repeticiones = 20;
                intensidad = "Alta";
                break;
            case "intermedio":
                repeticiones = 15;
                intensidad = "Media";
                break;
            default: // Novato
                repeticiones = 10;
                intensidad = "Baja";
                break;
        }

        return new ExerciseDetailDTO(
                ej.getIdEjercicio(),
                ej.getNombre(),
                ej.getDescripcion(),
                repeticiones,
                ej.getDuracion(), // Usamos la duración base de la BD
                intensidad
        );
    }
}