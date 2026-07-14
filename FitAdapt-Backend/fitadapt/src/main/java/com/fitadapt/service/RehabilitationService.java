package com.fitadapt.service;

import com.fitadapt.dto.ValidateRehabResponseDTO;
import com.fitadapt.model.UsuarioLesion;
import com.fitadapt.model.EjercicioImpacto;
import com.fitadapt.repository.UsuarioLesionRepository;
import com.fitadapt.repository.EjercicioImpactoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RehabilitationService {

    private final UsuarioLesionRepository usuarioLesionRepository;
    private final EjercicioImpactoRepository ejercicioImpactoRepository;

    public RehabilitationService(UsuarioLesionRepository usuarioLesionRepository, EjercicioImpactoRepository ejercicioImpactoRepository) {
        this.usuarioLesionRepository = usuarioLesionRepository;
        this.ejercicioImpactoRepository = ejercicioImpactoRepository;
    }

    public ValidateRehabResponseDTO validarEjercicio(Integer idUsuario, Integer idEjercicio) {
        List<UsuarioLesion> lesiones = usuarioLesionRepository.findByUsuario_IdUsuario(idUsuario);

        if (lesiones.isEmpty()) {
            return new ValidateRehabResponseDTO(true, "El usuario no reporta lesiones. Ejercicio 100% seguro.");
        }

        List<EjercicioImpacto> impactos = ejercicioImpactoRepository.findByEjercicio_IdEjercicio(idEjercicio);

        boolean impactoBajoDetectado = false;
        String zonaConImpactoBajo = "";

        for (UsuarioLesion lesion : lesiones) {
            for (EjercicioImpacto impacto : impactos) {
                if (lesion.getZona().getIdZona().equals(impacto.getZona().getIdZona())) {

                    if ("Alto".equalsIgnoreCase(impacto.getNivelImpacto()) || "Medio".equalsIgnoreCase(impacto.getNivelImpacto())) {
                        String msj = String.format("Advertencia: El ejercicio tiene impacto %s en una zona lesionada (%s).",
                                impacto.getNivelImpacto(), lesion.getZona().getNombreZona());
                        return new ValidateRehabResponseDTO(false, msj);
                    }

                    else if ("Bajo".equalsIgnoreCase(impacto.getNivelImpacto())) {
                        impactoBajoDetectado = true;
                        zonaConImpactoBajo = lesion.getZona().getNombreZona();
                    }
                }
            }
        }

        if (impactoBajoDetectado) {
            return new ValidateRehabResponseDTO(true,
                    "El ejercicio involucra una zona lesionada (" + zonaConImpactoBajo + ") pero su impacto es Bajo. Procede con precaución.");
        }

        return new ValidateRehabResponseDTO(true, "El ejercicio no afecta ninguna de tus zonas lesionadas. Totalmente seguro.");
    }
}