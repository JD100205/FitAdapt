package com.fitadapt.repository;

import com.fitadapt.model.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Integer> {

    List<Rutina> findByUsuario_IdUsuario(Integer idUsuario);

    List<Rutina> findByFecha(LocalDate fecha);

}