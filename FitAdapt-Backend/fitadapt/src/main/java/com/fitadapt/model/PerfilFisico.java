package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "PERFIL_FISICO")
@Getter
@Setter
public class PerfilFisico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPerfilFisico")
    private Integer idPerfilFisico;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "peso")
    private BigDecimal peso;

    @Column(name = "altura")
    private BigDecimal altura;

    @Column(name = "nivel_experiencia", length = 50)
    private String nivelExperiencia;

    @Column(name = "objetivo", length = 100)
    private String objetivo;
}