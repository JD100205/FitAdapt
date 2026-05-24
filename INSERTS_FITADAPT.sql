USE fitadapt_db
INSERT INTO ROL (nombreRol) VALUES
('ADMIN'),
('CLIENTE'),
('ENTRENADOR');

INSERT INTO CARGO (nombreCargo) VALUES
('Entrenador'),
('Nutricionista');

INSERT INTO ZONA_CUERPO (nombreZona) VALUES
('Rodilla'),
('Espalda'),
('Hombro'),
('Cuello'),
('Tobillo');

INSERT INTO CATEGORIA (nombreCategoria) VALUES
('Piernas'),
('Pecho'),
('Cardio'),
('Abdominales'),
('Espalda');

INSERT INTO USUARIO
(nombre, email, contrasenia, estado, puntos_totales, idRol)
VALUES
('Juan Perez', 'juan@test.com', '123456', 'ACTIVO', 100, 2),
('Maria Lopez', 'maria@test.com', '123456', 'ACTIVO', 50, 2);

INSERT INTO PROFESIONAL
(nombre, especialidad, estado, idCargo)
VALUES
('Carlos Trainer', 'Musculación', 'ACTIVO', 1),
('Ana Nutri', 'Nutrición deportiva', 'ACTIVO', 2);

INSERT INTO EJERCICIO
(nombre, descripcion, nivel, tipo, duracion, calorias_base)
VALUES
('Sentadillas', 'Ejercicio de piernas', 'Novato', 'Fuerza', 15, 120),
('Flexiones', 'Ejercicio de pecho', 'Novato', 'Fuerza', 10, 100),
('Plancha', 'Trabajo abdominal', 'Intermedio', 'Fuerza', 8, 80),
('Burpees', 'Ejercicio completo', 'Avanzado', 'Cardio', 12, 200),
('Trote', 'Cardio moderado', 'Novato', 'Cardio', 20, 180),
('Saltos', 'Cardio intenso', 'Intermedio', 'Cardio', 15, 170),
('Peso muerto', 'Trabajo de espalda', 'Avanzado', 'Fuerza', 20, 220),
('Mountain climbers', 'Cardio abdominal', 'Intermedio', 'Cardio', 10, 160),
('Press militar', 'Trabajo de hombros', 'Intermedio', 'Fuerza', 12, 140),
('Zancadas', 'Trabajo de piernas', 'Novato', 'Fuerza', 15, 130);

INSERT INTO PERFIL_FISICO
(idUsuario, edad, peso, altura, nivel_experiencia, objetivo)
VALUES
(1, 22, 75.50, 1.75, 'Novato', 'Bajar de peso'),
(2, 28, 82.00, 1.80, 'Intermedio', 'Ganar masa');

INSERT INTO PLAN_ENTRENAMIENTO
(fechaCreacion, objetivo, idProfesional, idUsuario)
VALUES
(CURDATE(), 'Pérdida de grasa', 1, 1);

INSERT INTO USUARIO_LESION
(idUsuario, idZona, estado_recuperacion)
VALUES
(1, 1, 'En recuperación'),
(2, 2, 'Leve');

INSERT INTO EJERCICIO_IMPACTO
(idEjercicio, idZona, nivel_impacto)
VALUES
(1, 1, 'Alto'),   -- Sentadillas impactan Rodilla
(2, 3, 'Medio'),  -- Flexiones impactan Hombro
(3, 2, 'Bajo'),   -- Plancha impacta Espalda
(4, 1, 'Alto'),   -- Burpees impactan Rodilla
(7, 2, 'Alto'),   -- Peso muerto impacta Espalda
(9, 3, 'Medio');  -- Press militar impacta Hombro

INSERT INTO EJERCICIO_CATEGORIA
(idEjercicio, idCategoria)
VALUES
(1, 1),
(2, 2),
(4, 3),
(3, 4),
(7, 5);


SELECT * 
FROM EJERCICIO
WHERE nivel = 'Novato'
AND tipo = 'Cardio';

SELECT *
FROM EJERCICIO
WHERE nivel = 'Novato'
AND tipo = 'Fuerza';

SELECT * FROM RUTINA;
SELECT * FROM DETALLERUTINA;