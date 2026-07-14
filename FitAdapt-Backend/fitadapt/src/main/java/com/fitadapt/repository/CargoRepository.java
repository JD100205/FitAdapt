package com.fitadapt.repository;

import com.fitadapt.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Integer> {

    Optional<Cargo> findByNombreCargo(String nombreCargo);

}