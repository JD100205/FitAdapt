package com.fitadapt.repository;

import com.fitadapt.model.EjercicioCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjercicioCategoriaRepository extends JpaRepository<EjercicioCategoria, Integer> {

    List<EjercicioCategoria> findByEjercicio_IdEjercicio(Integer idEjercicio);

    List<EjercicioCategoria> findByCategoria_IdCategoria(Integer idCategoria);

}