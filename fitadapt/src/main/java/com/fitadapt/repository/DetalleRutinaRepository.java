package com.fitadapt.repository;

import com.fitadapt.model.DetalleRutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleRutinaRepository extends JpaRepository<DetalleRutina, Integer> {

    List<DetalleRutina> findByRutina_IdRutina(Integer idRutina);

    List<DetalleRutina> findByEjercicio_IdEjercicio(Integer idEjercicio);

}