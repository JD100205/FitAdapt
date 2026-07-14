package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USUARIO_LESION")
@Getter
@Setter
public class UsuarioLesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idLesion")
    private Integer idLesion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idZona", nullable = false)
    private ZonaCuerpo zona;

    @Column(name = "estado_recuperacion", length = 50)
    private String estadoRecuperacion;
}