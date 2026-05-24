CREATE DATABASE IF NOT EXISTS fitadapt_db;
USE fitadapt_db;

-- =========================================
-- TABLA ROL
-- =========================================

CREATE TABLE ROL (
    idRol INT PRIMARY KEY AUTO_INCREMENT,
    nombreRol VARCHAR(50) NOT NULL
);

-- =========================================
-- TABLA USUARIO
-- =========================================

CREATE TABLE USUARIO (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    estado VARCHAR(50),
    puntos_totales INT DEFAULT 0,
    idRol INT NOT NULL,

    CONSTRAINT FK_USUARIO_ROL
        FOREIGN KEY (idRol)
        REFERENCES ROL(idRol)
);

-- =========================================
-- TABLA CARGO
-- =========================================

CREATE TABLE CARGO (
    idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nombreCargo VARCHAR(100) NOT NULL
);

-- =========================================
-- TABLA PROFESIONAL
-- =========================================

CREATE TABLE PROFESIONAL (
    idProfesional INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    estado VARCHAR(50),
    idCargo INT NOT NULL,

    CONSTRAINT FK_PROFESIONAL_CARGO
        FOREIGN KEY (idCargo)
        REFERENCES CARGO(idCargo)
);

-- =========================================
-- TABLA PLAN_ENTRENAMIENTO
-- =========================================

CREATE TABLE PLAN_ENTRENAMIENTO (
    idPlan INT PRIMARY KEY AUTO_INCREMENT,
    fechaCreacion DATE,
    wanio VARCHAR(255), -- Se mantiene como objetivo/propósito en VARCHAR

    idProfesional INT NOT NULL,
    idUsuario INT NOT NULL,

    CONSTRAINT FK_PLAN_PROFESIONAL
        FOREIGN KEY (idProfesional)
        REFERENCES PROFESIONAL(idProfesional),

    CONSTRAINT FK_PLAN_USUARIO
        FOREIGN KEY (idUsuario)
        REFERENCES USUARIO(idUsuario)
);

ALTER TABLE PLAN_ENTRENAMIENTO CHANGE wanio objetivo VARCHAR(255);

-- =========================================
-- TABLA RUTINA
-- =========================================

CREATE TABLE RUTINA (
    idRutina INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    idUsuario INT NOT NULL,
    idPlan INT NULL,

    CONSTRAINT FK_RUTINA_USUARIO
        FOREIGN KEY (idUsuario)
        REFERENCES USUARIO(idUsuario),

    CONSTRAINT FK_RUTINA_PLAN
        FOREIGN KEY (idPlan)
        REFERENCES PLAN_ENTRENAMIENTO(idPlan)
);

-- =========================================
-- TABLA EJERCICIO
-- =========================================

CREATE TABLE EJERCICIO (
    idEjercicio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    nivel VARCHAR(50),
    tipo VARCHAR(50),
    duracion INT,
    calorias_base INT
);

-- =========================================
-- TABLA DETALLERUTINA
-- =========================================

CREATE TABLE DETALLERUTINA (
    idDetalleRutina INT PRIMARY KEY AUTO_INCREMENT,
    idRutina INT NOT NULL,
    idEjercicio INT NOT NULL,
    repeticiones INT,
    tiempo INT,
    intensidad VARCHAR(50),

    CONSTRAINT FK_DETALLE_RUTINA
        FOREIGN KEY (idRutina)
        REFERENCES RUTINA(idRutina),

    CONSTRAINT FK_DETALLE_EJERCICIO
        FOREIGN KEY (idEjercicio)
        REFERENCES EJERCICIO(idEjercicio)
);

-- =========================================
-- TABLA HISTORIAL
-- =========================================

CREATE TABLE HISTORIAL (
    idHistorial INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idEjercicio INT NOT NULL,
    fecha DATE,
    resultado VARCHAR(255),
    notas VARCHAR(255),
    tiempo_real INT,
    puntos_obtenidos INT,

    CONSTRAINT FK_HISTORIAL_USUARIO
        FOREIGN KEY (idUsuario)
        REFERENCES USUARIO(idUsuario),

    CONSTRAINT FK_HISTORIAL_EJERCICIO
        FOREIGN KEY (idEjercicio)
        REFERENCES EJERCICIO(idEjercicio)
);

-- =========================================
-- TABLA CATEGORIA
-- =========================================

CREATE TABLE CATEGORIA (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(100) NOT NULL
);

-- =========================================
-- TABLA EJERCICIO_CATEGORIA
-- =========================================

CREATE TABLE EJERCICIO_CATEGORIA (
    idRelacion INT PRIMARY KEY AUTO_INCREMENT,
    idEjercicio INT NOT NULL,
    idCategoria INT NOT NULL,

    CONSTRAINT FK_EJERCICIO_CATEGORIA_EJERCICIO
        FOREIGN KEY (idEjercicio)
        REFERENCES EJERCICIO(idEjercicio),

    CONSTRAINT FK_EJERCICIO_CATEGORIA_CATEGORIA
        FOREIGN KEY (idCategoria)
        REFERENCES CATEGORIA(idCategoria)
);

-- =========================================
-- TABLA PERFIL_FISICO
-- Relación 1:1 con USUARIO
-- =========================================

CREATE TABLE PERFIL_FISICO (
    idPerfilFisico INT PRIMARY KEY AUTO_INCREMENT,

    idUsuario INT NOT NULL UNIQUE,

    edad INT,
    peso DECIMAL(5,2),
    altura DECIMAL(5,2),

    nivel_experiencia VARCHAR(50),
    objetivo VARCHAR(100),

    CONSTRAINT FK_PERFIL_USUARIO
        FOREIGN KEY (idUsuario)
        REFERENCES USUARIO(idUsuario)
);

-- =========================================
-- TABLA ZONA_CUERPO
-- Catálogo maestro de lesiones/zonas
-- =========================================

CREATE TABLE ZONA_CUERPO (
    idZona INT PRIMARY KEY AUTO_INCREMENT,

    nombreZona VARCHAR(100) NOT NULL UNIQUE
);

-- =========================================
-- TABLA USUARIO_LESION
-- Relación N:M entre usuario y zona corporal
-- =========================================

CREATE TABLE USUARIO_LESION (
    idLesion INT PRIMARY KEY AUTO_INCREMENT,

    idUsuario INT NOT NULL,
    idZona INT NOT NULL,

    estado_recuperacion VARCHAR(50),

    CONSTRAINT FK_LESION_USUARIO
        FOREIGN KEY (idUsuario)
        REFERENCES USUARIO(idUsuario),

    CONSTRAINT FK_LESION_ZONA
        FOREIGN KEY (idZona)
        REFERENCES ZONA_CUERPO(idZona)
);

-- =========================================
-- TABLA EJERCICIO_IMPACTO
-- Relación N:M entre ejercicio y zona corporal
-- =========================================

CREATE TABLE EJERCICIO_IMPACTO (
    idImpacto INT PRIMARY KEY AUTO_INCREMENT,

    idEjercicio INT NOT NULL,
    idZona INT NOT NULL,

    nivel_impacto VARCHAR(50),

    CONSTRAINT FK_IMPACTO_EJERCICIO
        FOREIGN KEY (idEjercicio)
        REFERENCES EJERCICIO(idEjercicio),

    CONSTRAINT FK_IMPACTO_ZONA
        FOREIGN KEY (idZona)
        REFERENCES ZONA_CUERPO(idZona)
);
