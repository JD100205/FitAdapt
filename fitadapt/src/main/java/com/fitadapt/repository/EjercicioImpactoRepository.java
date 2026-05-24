package com.fitadapt.repository;

import com.fitadapt.model.EjercicioImpacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjercicioImpactoRepository extends JpaRepository<EjercicioImpacto, Integer> {

    List<EjercicioImpacto> findByEjercicio_IdEjercicio(Integer idEjercicio);

    List<EjercicioImpacto> findByZona_IdZona(Integer idZona);

    List<EjercicioImpacto> findByNivelImpacto(String nivelImpacto);
}