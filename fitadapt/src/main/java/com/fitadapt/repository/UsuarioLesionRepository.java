package com.fitadapt.repository;

import com.fitadapt.model.UsuarioLesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioLesionRepository extends JpaRepository<UsuarioLesion, Integer> {

    List<UsuarioLesion> findByUsuario_IdUsuario(Integer idUsuario);

    List<UsuarioLesion> findByEstadoRecuperacion(String estadoRecuperacion);
}