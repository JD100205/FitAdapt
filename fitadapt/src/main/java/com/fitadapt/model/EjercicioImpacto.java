package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "EJERCICIO_IMPACTO")
@Getter
@Setter
public class EjercicioImpacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idImpacto")
    private Integer idImpacto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idEjercicio", nullable = false)
    private Ejercicio ejercicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idZona", nullable = false)
    private ZonaCuerpo zona;

    @Column(name = "nivel_impacto", length = 50)
    private String nivelImpacto;
}