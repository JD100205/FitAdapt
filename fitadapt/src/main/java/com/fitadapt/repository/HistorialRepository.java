package com.fitadapt.repository;

import com.fitadapt.model.Historial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistorialRepository extends JpaRepository<Historial, Integer> {

    List<Historial> findByUsuario_IdUsuario(Integer idUsuario);

    List<Historial> findByEjercicio_IdEjercicio(Integer idEjercicio);

    List<Historial> findByFecha(LocalDate fecha);

}