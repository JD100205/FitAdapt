package com.fitadapt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ZONA_CUERPO")
@Getter
@Setter
public class ZonaCuerpo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idZona")
    private Integer idZona;

    @Column(name = "nombreZona", length = 100, nullable = false, unique = true)
    private String nombreZona;
}