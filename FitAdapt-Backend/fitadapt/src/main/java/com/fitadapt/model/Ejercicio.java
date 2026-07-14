package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "EJERCICIO")
@Getter
@Setter
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEjercicio")
    private Integer idEjercicio;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "nivel", length = 50)
    private String nivel;

    @Column(name = "tipo", length = 50)
    private String tipo;

    @Column(name = "duracion")
    private Integer duracion;

    @Column(name = "calorias_base")
    private Integer caloriasBase;
}