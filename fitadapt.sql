CREATE DATABASE fitadapt_db;
USE fitadapt_db;


-- TABLA ROL


CREATE TABLE ROL (
    idRol INT PRIMARY KEY IDENTITY(1,1),
    nombreRol VARCHAR(50) NOT NULL
);
GO


-- TABLA USUARIO


CREATE TABLE USUARIO (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    estado VARCHAR(50),

    puntos_totales INT DEFAULT 0,

    idRol INT NOT NULL,

    CONSTRAINT FK_USUARIO_ROL
        FOREIGN KEY (idRol)
        REFERENCES ROL(idRol)
);
GO

-- TABLA CARGO

CREATE TABLE CARGO (
    idCargo INT PRIMARY KEY IDENTITY(1,1),
    nombreCargo VARCHAR(100) NOT NULL
);
GO

-- TABLA PROFESIONAL

CREATE TABLE PROFESIONAL (
    idProfesional INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    estado VARCHAR(50),

    idCargo INT NOT NULL,

    CONSTRAINT FK_PROFESIONAL_CARGO
        FOREIGN KEY (idCargo)
        REFERENCES CARGO(idCargo)
);
GO

-- TABLA PLAN

CREATE TABLE PLAN_ENTRENAMIENTO (
    idPlan INT PRIMARY KEY IDENTITY(1,1),
    fechaCreacion DATE,
    objetivo VARCHAR(255),

    idProfesional INT NOT NULL,
    idUsuario INT NOT NULL,

    CONSTRAINT FK_PLAN_PROFESIONAL
        FOREIGN KEY (idProfesional)
        REFERENCES PROFESIONAL(idProfesional),

    CONSTRAINT FK_PLAN_USUARIO
        FOREIGN KEY (idUsuario)
        REFERENCES USUARIO(idUsuario)
);
GO

-- TABLA RUTINA

CREATE TABLE RUTINA (
    idRutina INT PRIMARY KEY IDENTITY(1,1),
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
GO

-- TABLA EJERCICIO

CREATE TABLE EJERCICIO (
    idEjercicio INT PRIMARY KEY IDENTITY(1,1),

    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    nivel VARCHAR(50),
    tipo VARCHAR(50),

    duracion INT,
    calorias_base INT
);
GO


-- TABLA DETALLERUTINA

CREATE TABLE DETALLERUTINA (
    idDetalleRutina INT PRIMARY KEY IDENTITY(1,1),

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
GO

-- TABLA HISTORIAL

CREATE TABLE HISTORIAL (
    idHistorial INT PRIMARY KEY IDENTITY(1,1),

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
GO

-- TABLA CATEGORIA

CREATE TABLE CATEGORIA (
    idCategoria INT PRIMARY KEY IDENTITY(1,1),
    nombreCategoria VARCHAR(100) NOT NULL
);
GO

-- TABLA EJERCICIO_CATEGORIA

CREATE TABLE EJERCICIO_CATEGORIA (
    idRelacion INT PRIMARY KEY IDENTITY(1,1),

    idEjercicio INT NOT NULL,
    idCategoria INT NOT NULL,

    CONSTRAINT FK_EJERCICIO_CATEGORIA_EJERCICIO
        FOREIGN KEY (idEjercicio)
        REFERENCES EJERCICIO(idEjercicio),

    CONSTRAINT FK_EJERCICIO_CATEGORIA_CATEGORIA
        FOREIGN KEY (idCategoria)
        REFERENCES CATEGORIA(idCategoria)
);
GO

--PERFIL FISICO--
CREATE TABLE PERFIL_FISICO (
    idPerfilFisico INT PRIMARY KEY IDENTITY(1,1),

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
GO

--ZONA CUERPO--
CREATE TABLE ZONA_CUERPO (
    idZona INT PRIMARY KEY IDENTITY(1,1),

    nombreZona VARCHAR(100) NOT NULL UNIQUE
);
GO

--USUARIO LESION--
CREATE TABLE USUARIO_LESION (
    idLesion INT PRIMARY KEY IDENTITY(1,1),

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
GO

--EJERCICIO IMPACTO--
CREATE TABLE EJERCICIO_IMPACTO (
    idImpacto INT PRIMARY KEY IDENTITY(1,1),

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
GO



-- DATOS INICIALES

-- ROLES
INSERT INTO ROL (nombreRol)
VALUES
('Administrador'),
('Usuario'),
('Profesional');
GO

-- CARGOS
INSERT INTO CARGO (nombreCargo)
VALUES
('Fisioterapeuta'),
('Entrenador'),
('Nutricionista');
GO

-- CATEGORÍAS
INSERT INTO CATEGORIA (nombreCategoria)
VALUES
('Cardio'),
('Fuerza'),
('Rehabilitación'),
('Movilidad');
GO

--ver todas las tablas--
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

--usuario--
INSERT INTO USUARIO
(nombre, email, contraseña, estado, puntos_totales, idRol)
VALUES
('Diogo Guerrero', 'diogo@gmail.com', '123456', 'Activo', 150, 2);


--profesional--

INSERT INTO PROFESIONAL
(nombre, especialidad, estado, idCargo)
VALUES
('Carlos Pérez', 'Rehabilitación Física', 'Activo', 1);

--plan--
INSERT INTO PLAN_ENTRENAMIENTO
(fechaCreacion, objetivo, idProfesional, idUsuario)
VALUES
(GETDATE(), 'Mejorar movilidad y resistencia', 1, 1);


--rutina--
INSERT INTO RUTINA
(fecha, idUsuario, idPlan)
VALUES
(GETDATE(), 1, 1);


--ejericicio--
INSERT INTO EJERCICIO
(nombre, descripcion, nivel, tipo, duracion, calorias_base)
VALUES
('Sentadillas', 'Ejercicio de fuerza para piernas', 'Intermedio', 'Fuerza', 15, 50);

--Relación ejercicio-categoría--
INSERT INTO EJERCICIO_CATEGORIA
(idEjercicio, idCategoria)
VALUES
(1, 2);

--detalle rutina--
INSERT INTO DETALLERUTINA
(idRutina, idEjercicio, repeticiones, tiempo, intensidad)
VALUES
(1, 1, 20, 15, 'Media');


--historial--
INSERT INTO HISTORIAL
(idUsuario, idEjercicio, fecha, resultado, notas, tiempo_real, puntos_obtenidos)
VALUES
(1, 1, GETDATE(), 'Completado', 'Buen rendimiento', 14, 100);

--datos de prueba--
INSERT INTO ZONA_CUERPO (nombreZona)
VALUES
('Rodilla'),
('Hombro'),
('Espalda'),
('Tobillo');
GO

--perfil fisico--
INSERT INTO PERFIL_FISICO
(idUsuario, edad, peso, altura, nivel_experiencia, objetivo)
VALUES
(1, 19, 72.5, 1.75, 'Intermedio', 'Rehabilitación');
GO

--usuario lesion--
INSERT INTO USUARIO_LESION
(idUsuario, idZona, estado_recuperacion)
VALUES
(1, 1, 'En recuperación');
GO

--ejercicio impacto--
INSERT INTO EJERCICIO_IMPACTO
(idEjercicio, idZona, nivel_impacto)
VALUES
(1, 1, 'Bajo');
GO

-- =========================================
-- OPTIMIZACIÓN DE BASE DE DATOS
-- =========================================

CREATE INDEX IX_USUARIO_idRol
ON USUARIO(idRol);
GO

CREATE INDEX IX_PROFESIONAL_idCargo
ON PROFESIONAL(idCargo);
GO

CREATE INDEX IX_PLAN_idUsuario
ON PLAN_ENTRENAMIENTO(idUsuario);
GO

CREATE INDEX IX_PLAN_idProfesional
ON PLAN_ENTRENAMIENTO(idProfesional);
GO

CREATE INDEX IX_RUTINA_idUsuario
ON RUTINA(idUsuario);
GO

CREATE INDEX IX_RUTINA_idPlan
ON RUTINA(idPlan);
GO

CREATE INDEX IX_RUTINA_USUARIO_FECHA
ON RUTINA(idUsuario, fecha);
GO

CREATE INDEX IX_DETALLE_idRutina
ON DETALLERUTINA(idRutina);
GO

CREATE INDEX IX_DETALLE_idEjercicio
ON DETALLERUTINA(idEjercicio);
GO

CREATE INDEX IX_HISTORIAL_idUsuario
ON HISTORIAL(idUsuario);
GO

CREATE INDEX IX_HISTORIAL_idEjercicio
ON HISTORIAL(idEjercicio);
GO

CREATE INDEX IX_HISTORIAL_USUARIO_FECHA
ON HISTORIAL(idUsuario, fecha DESC);
GO

CREATE INDEX IX_HISTORIAL_PROGRESO
ON HISTORIAL(idUsuario, fecha)
INCLUDE (puntos_obtenidos, tiempo_real);
GO

CREATE INDEX IX_EJERCICIO_NOMBRE
ON EJERCICIO(nombre);
GO

CREATE INDEX IX_EJ_CAT_EJERCICIO
ON EJERCICIO_CATEGORIA(idEjercicio);
GO

CREATE INDEX IX_EJ_CAT_CATEGORIA
ON EJERCICIO_CATEGORIA(idCategoria);
GO

CREATE INDEX IX_LESION_USUARIO
ON USUARIO_LESION(idUsuario);
GO

CREATE INDEX IX_LESION_ZONA
ON USUARIO_LESION(idZona);
GO

CREATE INDEX IX_IMPACTO_EJERCICIO
ON EJERCICIO_IMPACTO(idEjercicio);
GO

CREATE INDEX IX_IMPACTO_ZONA
ON EJERCICIO_IMPACTO(idZona);
GO

-- =========================================
-- RESTRICCIONES DE INTEGRIDAD
-- =========================================

ALTER TABLE EJERCICIO_CATEGORIA
ADD CONSTRAINT UQ_EJERCICIO_CATEGORIA
UNIQUE(idEjercicio,idCategoria);
GO

ALTER TABLE EJERCICIO_IMPACTO
ADD CONSTRAINT UQ_EJERCICIO_IMPACTO
UNIQUE(idEjercicio,idZona);
GO

ALTER TABLE USUARIO_LESION
ADD CONSTRAINT UQ_USUARIO_LESION
UNIQUE(idUsuario,idZona);
GO

-- =========================================
-- VISTA HISTORIAL COMPLETO
-- =========================================

CREATE VIEW VW_HISTORIAL_COMPLETO
AS
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
GO

-- =========================================
-- VISTA PROGRESO USUARIO
-- =========================================

CREATE VIEW VW_PROGRESO_USUARIO
AS
SELECT
U.idUsuario,
U.nombre,
COUNT(H.idHistorial) AS TotalEjercicios,
ISNULL(SUM(H.puntos_obtenidos),0) AS PuntosGanados,
ISNULL(AVG(H.tiempo_real),0) AS TiempoPromedio
FROM USUARIO U
LEFT JOIN HISTORIAL H
ON U.idUsuario = H.idUsuario
GROUP BY
U.idUsuario,
U.nombre;
GO

-- =========================================
-- PROCEDIMIENTO HISTORIAL POR USUARIO
-- =========================================

CREATE PROCEDURE SP_HISTORIAL_USUARIO
@idUsuario INT
AS
BEGIN
SELECT
H.fecha,
E.nombre AS Ejercicio,
H.resultado,
H.tiempo_real,
H.puntos_obtenidos
FROM HISTORIAL H
INNER JOIN EJERCICIO E
ON H.idEjercicio = E.idEjercicio
WHERE H.idUsuario = @idUsuario
ORDER BY H.fecha DESC;
END;
GO


--ver usuarios con roles--
SELECT 
    U.idUsuario,
    U.nombre,
    U.email,
    R.nombreRol
FROM USUARIO U
INNER JOIN ROL R
ON U.idRol = R.idRol;

--ver ejercicios con categoria--

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

--ver planes con usuario y profesional--

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

--ver historial completo--
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

-- ver rutina detallada-- 
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
-- consulta para verificar puntos acumulados--
SELECT
    nombre,
    puntos_totales
FROM USUARIO;

--ver todas las fk detalladas--
SELECT
    fk.name AS ForeignKey,
    tp.name AS TablaPadre,
    tr.name AS TablaReferenciada
FROM sys.foreign_keys fk
INNER JOIN sys.tables tp
    ON fk.parent_object_id = tp.object_id
INNER JOIN sys.tables tr
    ON fk.referenced_object_id = tr.object_id;


--consultas--
SELECT * FROM VW_HISTORIAL_COMPLETO;
GO

SELECT * FROM VW_PROGRESO_USUARIO;
GO

EXEC SP_HISTORIAL_USUARIO 1;
GO

--Perfil completo del usuario--
SELECT
    U.idUsuario,
    U.nombre,
    U.email,
    U.puntos_totales,
    P.edad,
    P.peso,
    P.altura,
    P.nivel_experiencia,
    P.objetivo
FROM USUARIO U
INNER JOIN PERFIL_FISICO P
    ON U.idUsuario = P.idUsuario
WHERE U.idUsuario = 1;
--Lesiones registradas del usuario--
SELECT
    U.nombre,
    Z.nombreZona,
    UL.estado_recuperacion
FROM USUARIO_LESION UL
INNER JOIN USUARIO U
    ON UL.idUsuario = U.idUsuario
INNER JOIN ZONA_CUERPO Z
    ON UL.idZona = Z.idZona;

--Ejercicios compatibles con una lesión--
SELECT
    E.nombre,
    EI.nivel_impacto,
    Z.nombreZona
FROM EJERCICIO E
INNER JOIN EJERCICIO_IMPACTO EI
    ON E.idEjercicio = EI.idEjercicio
INNER JOIN ZONA_CUERPO Z
    ON EI.idZona = Z.idZona
WHERE Z.nombreZona = 'Rodilla'
AND EI.nivel_impacto = 'Bajo';

--Ranking de usuarios por puntos--
SELECT
    nombre,
    puntos_totales
FROM USUARIO
ORDER BY puntos_totales DESC;

--Total de puntos obtenidos por usuario--
SELECT
    U.nombre,
    SUM(H.puntos_obtenidos) AS TotalPuntos
FROM HISTORIAL H
INNER JOIN USUARIO U
    ON H.idUsuario = U.idUsuario
GROUP BY U.nombre;

--Ejercicios más realizados--
SELECT
    E.nombre,
    COUNT(*) AS VecesRealizado
FROM HISTORIAL H
INNER JOIN EJERCICIO E
    ON H.idEjercicio = E.idEjercicio
GROUP BY E.nombre
ORDER BY VecesRealizado DESC;

--Calorías potenciales por rutina--
SELECT
    R.idRutina,
    SUM(E.calorias_base) AS CaloriasEstimadas
FROM DETALLERUTINA D
INNER JOIN EJERCICIO E
    ON D.idEjercicio = E.idEjercicio
INNER JOIN RUTINA R
    ON D.idRutina = R.idRutina
GROUP BY R.idRutina;

--Planes asignados a cada profesional--
SELECT
    PR.nombre,
    COUNT(P.idPlan) AS TotalPlanes
FROM PROFESIONAL PR
LEFT JOIN PLAN_ENTRENAMIENTO P
    ON PR.idProfesional = P.idProfesional
GROUP BY PR.nombre;

--Dashboard general del sistema--
SELECT
    (SELECT COUNT(*) FROM USUARIO) AS TotalUsuarios,
    (SELECT COUNT(*) FROM PROFESIONAL) AS TotalProfesionales,
    (SELECT COUNT(*) FROM EJERCICIO) AS TotalEjercicios,
    (SELECT COUNT(*) FROM HISTORIAL) AS TotalHistoriales;