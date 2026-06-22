package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "HISTORIAL")
@Getter
@Setter
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idHistorial")
    private Integer idHistorial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idEjercicio", nullable = false)
    private Ejercicio ejercicio;

    // Reemplaza el 'private LocalDate fecha;' por esto:
    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    @Column(name = "resultado", length = 255)
    private String resultado;

    @Column(name = "notas", length = 255)
    private String notas;

    @Column(name = "tiempo_real")
    private Integer tiempoReal;

    @Column(name = "puntos_obtenidos")
    private Integer puntosObtenidos;
}