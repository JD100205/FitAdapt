package com.fitadapt.repository;

import com.fitadapt.model.PerfilFisico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Importante
import java.util.Optional;

@Repository
public interface PerfilFisicoRepository extends JpaRepository<PerfilFisico, Integer> {

    Optional<PerfilFisico> findByUsuario_IdUsuario(Integer idUsuario);

    List<PerfilFisico> findByNivelExperiencia(String nivelExperiencia);
}