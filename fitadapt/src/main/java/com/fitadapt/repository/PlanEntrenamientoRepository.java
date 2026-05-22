package com.fitadapt.repository;

import com.fitadapt.model.PlanEntrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanEntrenamientoRepository extends JpaRepository<PlanEntrenamiento, Integer> {

    List<PlanEntrenamiento> findByUsuario_IdUsuario(Integer idUsuario);

    List<PlanEntrenamiento> findByProfesional_IdProfesional(Integer idProfesional);

}