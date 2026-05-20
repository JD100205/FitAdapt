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
-- DATOS INICIALES
-- =========================================

-- ROLES
INSERT INTO ROL (nombreRol)
VALUES
('ADMINISTRADOR'),
('USUARIO'),
('PROFESIONAL');

-- CARGOS
INSERT INTO CARGO (nombreCargo)
VALUES
('Fisioterapeuta'),
('Entrenador'),
('Nutricionista');

-- CATEGORÍAS
INSERT INTO CATEGORIA (nombreCategoria)
VALUES
('Cardio'),
('Fuerza'),
('Rehabilitación'),
('Movilidad');

-- ver todas las tablas --
SELECT * FROM ROL;
SELECT * FROM USUARIO;
SELECT * FROM CARGO;
SELECT * FROM PROFESIONAL;
SELECT * FROM PLAN_ENTRENAMIENTO;
SELECT * FROM RUTINA;
SELECT * FROM EJERCICIO;
SELECT * FROM DETALLERUTINA;
SELECT * FROM HISTORIAL;
SELECT * FROM CATEGORIA;
SELECT * FROM EJERCICIO_CATEGORIA;

-- usuario --
INSERT INTO USUARIO
(nombre, email, contrasenia, estado, puntos_totales, idRol)
VALUES
('Diogo Guerrero', 'diogo@gmail.com', '123456', 'Activo', 150, 2);

-- profesional --
INSERT INTO PROFESIONAL
(nombre, especialidad, estado, idCargo)
VALUES
('Carlos Pérez', 'Rehabilitación Física', 'Activo', 1);

-- plan --
INSERT INTO PLAN_ENTRENAMIENTO
(fechaCreacion, objetivo, idProfesional, idUsuario)
VALUES
(NOW(), 'Mejorar movilidad y resistencia', 1, 1);

-- rutina --
INSERT INTO RUTINA
(fecha, idUsuario, idPlan)
VALUES
(NOW(), 1, 1);

-- ejercicio --
INSERT INTO EJERCICIO
(nombre, descripcion, nivel, tipo, duracion, calorias_base)
VALUES
('Sentadillas', 'Ejercicio de fuerza para piernas', 'Intermedio', 'Fuerza', 15, 50);

-- Relación ejercicio-categoría --
INSERT INTO EJERCICIO_CATEGORIA
(idEjercicio, idCategoria)
VALUES
(1, 2);

-- detalle rutina --
INSERT INTO DETALLERUTINA
(idRutina, idEjercicio, repeticiones, tiempo, intensidad)
VALUES
(1, 1, 20, 15, 'Media');

-- historial --
INSERT INTO HISTORIAL
(idUsuario, idEjercicio, fecha, resultado, notas, tiempo_real, puntos_obtenidos)
VALUES
(1, 1, NOW(), 'Completado', 'Buen rendimiento', 14, 100);

-- ver usuarios con roles --
SELECT 
    U.idUsuario,
    U.nombre,
    U.email,
    R.nombreRol
FROM USUARIO U
INNER JOIN ROL R
ON U.idRol = R.idRol;

-- ver ejercicios con categoria --
SELECT
    E.nombre AS Ejercicio,
    C.nombreCategoria AS Categoria,
    E.duracion,
    E.calorias_base
FROM EJERCICIO E
INNER JOIN EJERCICIO_CATEGORIA EC
    ON E.idEjercicio = EC.idEjercicio
INNER JOIN CATEGORIA C
    ON EC.idCategoria = C.idCategoria;

-- ver planes con usuario y profesional --
SELECT
    P.idPlan,
    U.nombre AS Usuario,
    PR.nombre AS Profesional,
    P.objetivo,
    P.fechaCreacion
FROM PLAN_ENTRENAMIENTO P
INNER JOIN USUARIO U
    ON P.idUsuario = U.idUsuario
INNER JOIN PROFESIONAL PR
    ON P.idProfesional = PR.idProfesional;

-- ver historial completo --
SELECT
    H.idHistorial,
    U.nombre AS Usuario,
    E.nombre AS Ejercicio,
    H.fecha,
    H.resultado,
    H.tiempo_real,
    H.puntos_obtenidos
FROM HISTORIAL H
INNER JOIN USUARIO U
    ON H.idUsuario = U.idUsuario
INNER JOIN EJERCICIO E
    ON H.idEjercicio = E.idEjercicio;

-- ver rutina detallada -- 
SELECT
    R.idRutina,
    U.nombre AS Usuario,
    E.nombre AS Ejercicio,
    D.repeticiones,
    D.tiempo,
    D.intensidad
FROM DETALLERUTINA D
INNER JOIN RUTINA R
    ON D.idRutina = R.idRutina
INNER JOIN EJERCICIO E
    ON D.idEjercicio = E.idEjercicio
INNER JOIN USUARIO U
    ON R.idUsuario = U.idUsuario;

-- consulta para verificar puntos acumulados --
SELECT
    nombre,
    puntos_totales
FROM USUARIO;

-- ver todas las fk detalladas (Adaptado a MySQL 8) --
SELECT 
    CONSTRAINT_NAME AS ForeignKey, 
    TABLE_NAME AS TablaPadre, 
    REFERENCED_TABLE_NAME AS TablaReferenciada 
FROM 
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE 
    TABLE_SCHEMA = 'fitadapt_db' 
    AND REFERENCED_TABLE_NAME IS NOT NULL;