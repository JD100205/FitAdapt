package com.fitadapt.repository;

import com.fitadapt.model.Historial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HistorialRepository extends JpaRepository<Historial, Integer> {

    List<Historial> findByUsuario_IdUsuario(Integer idUsuario);

    List<Historial> findByEjercicio_IdEjercicio(Integer idEjercicio);

    List<Historial> findByFechaHora(LocalDateTime fechaHora);

    Optional<Historial> findFirstByUsuario_IdUsuarioOrderByFechaHoraDesc(Integer idUsuario);

}