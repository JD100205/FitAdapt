package com.fitadapt.repository;

import com.fitadapt.model.Profesional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfesionalRepository extends JpaRepository<Profesional, Integer> {

    List<Profesional> findByEstado(String estado);

    List<Profesional> findByEspecialidad(String especialidad);

}