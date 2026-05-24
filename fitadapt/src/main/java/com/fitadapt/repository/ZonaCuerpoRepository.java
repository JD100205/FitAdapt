package com.fitadapt.repository;

import com.fitadapt.model.ZonaCuerpo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ZonaCuerpoRepository extends JpaRepository<ZonaCuerpo, Integer> {

    Optional<ZonaCuerpo> findByNombreZona(String nombreZona);
}