package com.fitadapt.repository;

import com.fitadapt.model.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Integer> {

    Optional<Rutina> findFirstByUsuario_IdUsuarioAndFecha(Integer idUsuario, LocalDate fecha);
    List<Rutina> findByUsuario_IdUsuario(Integer idUsuario);

    List<Rutina> findByFecha(LocalDate fecha);

}