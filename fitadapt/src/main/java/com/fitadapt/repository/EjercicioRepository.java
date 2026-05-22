package com.fitadapt.repository;

import com.fitadapt.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Integer> {

    List<Ejercicio> findByNivel(String nivel);

    List<Ejercicio> findByTipo(String tipo);

    List<Ejercicio> findByNombreContainingIgnoreCase(String nombre);

}