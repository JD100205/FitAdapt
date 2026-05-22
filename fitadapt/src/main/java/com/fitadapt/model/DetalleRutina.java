package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DETALLERUTINA")
@Getter
@Setter
public class DetalleRutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDetalleRutina")
    private Integer idDetalleRutina;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idRutina", nullable = false)
    private Rutina rutina;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idEjercicio", nullable = false)
    private Ejercicio ejercicio;

    @Column(name = "repeticiones")
    private Integer repeticiones;

    @Column(name = "tiempo")
    private Integer tiempo;

    @Column(name = "intensidad", length = 50)
    private String intensidad;
}