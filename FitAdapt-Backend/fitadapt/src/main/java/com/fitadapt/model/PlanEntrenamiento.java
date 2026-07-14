package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "PLAN_ENTRENAMIENTO")
@Getter
@Setter
public class PlanEntrenamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPlan")
    private Integer idPlan;

    @Column(name = "fechaCreacion")
    private LocalDate fechaCreacion;

    @Column(name = "objetivo", length = 255)
    private String objetivo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProfesional", nullable = false)
    private Profesional profesional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;
}