package com.fitadapt.repository;

import com.fitadapt.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Integer> {

    List<Ejercicio> findByNivel(String nivel);
    List<Ejercicio> findByTipo(String tipo);
    List<Ejercicio> findByNombreContainingIgnoreCase(String nombre);

    /*@Query("SELECT e FROM Ejercicio e " +
            "WHERE e.nivel = :nivel " +
            "AND e.tipo = :tipo " +
            "AND NOT EXISTS (" +
            "    SELECT 1 FROM EjercicioImpacto ei " +
            "    JOIN UsuarioLesion ul ON ei.zonaCuerpo.idZona = ul.zonaCuerpo.idZona " +
            "    WHERE ei.ejercicio.idEjercicio = e.idEjercicio " +
            "    AND ul.usuario.idUsuario = :idUsuario " +
            "    AND ei.nivelImpacto IN ('Alto', 'Medio')" +
            ")")*/

    @Query("SELECT e FROM Ejercicio e " +
            "WHERE e.nivel = :nivel " +
            "AND e.tipo = :tipo " +
            "AND NOT EXISTS (" +
            "    SELECT 1 FROM EjercicioImpacto ei " +
            "    JOIN UsuarioLesion ul ON ei.zona.idZona = ul.zona.idZona " +
            "    WHERE ei.ejercicio.idEjercicio = e.idEjercicio " +
            "    AND ul.usuario.idUsuario = :idUsuario " +
            "    AND ei.nivelImpacto IN ('Alto', 'Medio')" +
            ")")
    List<Ejercicio> findEjerciciosSegurosParaUsuario(
            @Param("nivel") String nivel,
            @Param("tipo") String tipo,
            @Param("idUsuario") Integer idUsuario
    );

}