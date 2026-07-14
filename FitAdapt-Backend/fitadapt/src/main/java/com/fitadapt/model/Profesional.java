package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PROFESIONAL")
@Getter
@Setter
public class Profesional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProfesional")
    private Integer idProfesional;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "especialidad", length = 100)
    private String especialidad;

    @Column(name = "estado", length = 50)
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCargo", nullable = false)
    private Cargo cargo;
}