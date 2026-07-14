-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: fitadapt_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CARGO`
--

DROP TABLE IF EXISTS `CARGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CARGO` (
  `idCargo` int NOT NULL AUTO_INCREMENT,
  `nombreCargo` varchar(100) NOT NULL,
  PRIMARY KEY (`idCargo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CARGO`
--

LOCK TABLES `CARGO` WRITE;
/*!40000 ALTER TABLE `CARGO` DISABLE KEYS */;
INSERT INTO `CARGO` VALUES (1,'Entrenador'),(2,'Nutricionista');
/*!40000 ALTER TABLE `CARGO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORIA`
--

DROP TABLE IF EXISTS `CATEGORIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIA` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(100) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIA`
--

LOCK TABLES `CATEGORIA` WRITE;
/*!40000 ALTER TABLE `CATEGORIA` DISABLE KEYS */;
INSERT INTO `CATEGORIA` VALUES (1,'Piernas'),(2,'Pecho'),(3,'Cardio'),(4,'Abdominales'),(5,'Espalda');
/*!40000 ALTER TABLE `CATEGORIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLERUTINA`
--

DROP TABLE IF EXISTS `DETALLERUTINA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DETALLERUTINA` (
  `idDetalleRutina` int NOT NULL AUTO_INCREMENT,
  `idRutina` int NOT NULL,
  `idEjercicio` int NOT NULL,
  `repeticiones` int DEFAULT NULL,
  `tiempo` int DEFAULT NULL,
  `intensidad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idDetalleRutina`),
  KEY `FK_DETALLE_RUTINA` (`idRutina`),
  KEY `FK_DETALLE_EJERCICIO` (`idEjercicio`),
  CONSTRAINT `FK_DETALLE_EJERCICIO` FOREIGN KEY (`idEjercicio`) REFERENCES `EJERCICIO` (`idEjercicio`),
  CONSTRAINT `FK_DETALLE_RUTINA` FOREIGN KEY (`idRutina`) REFERENCES `RUTINA` (`idRutina`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLERUTINA`
--

LOCK TABLES `DETALLERUTINA` WRITE;
/*!40000 ALTER TABLE `DETALLERUTINA` DISABLE KEYS */;
INSERT INTO `DETALLERUTINA` VALUES (1,1,9,15,12,'Media'),(2,1,3,15,8,'Media'),(3,1,6,15,15,'Media'),(4,2,9,15,12,'Media'),(5,2,3,15,8,'Media'),(6,2,6,15,15,'Media'),(7,3,9,15,12,'Media'),(8,3,3,15,8,'Media'),(9,3,6,15,15,'Media'),(10,4,3,15,8,'Media'),(11,4,9,15,12,'Media'),(12,4,8,15,10,'Media'),(13,5,3,15,8,'Media'),(14,5,9,15,12,'Media'),(15,5,6,15,15,'Media'),(16,6,5,10,20,'Baja'),(17,6,2,10,10,'Baja'),(18,6,10,10,15,'Baja'),(19,7,5,10,20,'Baja'),(20,7,10,10,15,'Baja'),(21,7,2,10,10,'Baja'),(22,8,5,10,20,'Baja'),(23,8,2,10,10,'Baja'),(24,8,10,10,15,'Baja'),(25,9,5,10,20,'Baja'),(26,9,2,10,10,'Baja'),(27,9,10,10,15,'Baja'),(28,10,5,10,20,'Baja'),(29,10,2,10,10,'Baja'),(30,10,10,10,15,'Baja'),(31,11,5,10,20,'Baja'),(32,11,10,10,15,'Baja'),(33,11,2,10,10,'Baja'),(34,12,5,10,20,'Baja'),(35,12,10,10,15,'Baja'),(36,12,2,10,10,'Baja'),(37,13,5,10,20,'Baja'),(38,13,2,10,10,'Baja'),(39,13,10,10,15,'Baja'),(40,14,5,10,20,'Baja'),(41,14,10,10,15,'Baja'),(42,14,2,10,10,'Baja'),(43,15,1,10,15,'Baja'),(44,15,2,10,10,'Baja'),(45,15,10,10,15,'Baja'),(46,15,5,10,20,'Baja'),(47,16,6,15,15,'Media'),(48,16,8,15,10,'Media'),(49,16,3,15,8,'Media'),(50,16,9,15,12,'Media'),(51,17,3,15,8,'Media'),(52,17,9,15,12,'Media'),(53,17,6,15,15,'Media'),(54,17,8,15,10,'Media');
/*!40000 ALTER TABLE `DETALLERUTINA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EJERCICIO`
--

DROP TABLE IF EXISTS `EJERCICIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EJERCICIO` (
  `idEjercicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `nivel` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `calorias_base` int DEFAULT NULL,
  PRIMARY KEY (`idEjercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EJERCICIO`
--

LOCK TABLES `EJERCICIO` WRITE;
/*!40000 ALTER TABLE `EJERCICIO` DISABLE KEYS */;
INSERT INTO `EJERCICIO` VALUES (1,'Sentadillas','Ejercicio de piernas','Novato','Fuerza',15,120),(2,'Flexiones','Ejercicio de pecho','Novato','Fuerza',10,100),(3,'Plancha','Trabajo abdominal','Intermedio','Fuerza',8,80),(4,'Burpees','Ejercicio completo','Avanzado','Cardio',12,200),(5,'Trote','Cardio moderado','Novato','Cardio',20,180),(6,'Saltos','Cardio intenso','Intermedio','Cardio',15,170),(7,'Peso muerto','Trabajo de espalda','Avanzado','Fuerza',20,220),(8,'Mountain climbers','Cardio abdominal','Intermedio','Cardio',10,160),(9,'Press militar','Trabajo de hombros','Intermedio','Fuerza',12,140),(10,'Zancadas','Trabajo de piernas','Novato','Fuerza',15,130);
/*!40000 ALTER TABLE `EJERCICIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EJERCICIO_CATEGORIA`
--

DROP TABLE IF EXISTS `EJERCICIO_CATEGORIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EJERCICIO_CATEGORIA` (
  `idRelacion` int NOT NULL AUTO_INCREMENT,
  `idEjercicio` int NOT NULL,
  `idCategoria` int NOT NULL,
  PRIMARY KEY (`idRelacion`),
  KEY `FK_EJERCICIO_CATEGORIA_EJERCICIO` (`idEjercicio`),
  KEY `FK_EJERCICIO_CATEGORIA_CATEGORIA` (`idCategoria`),
  CONSTRAINT `FK_EJERCICIO_CATEGORIA_CATEGORIA` FOREIGN KEY (`idCategoria`) REFERENCES `CATEGORIA` (`idCategoria`),
  CONSTRAINT `FK_EJERCICIO_CATEGORIA_EJERCICIO` FOREIGN KEY (`idEjercicio`) REFERENCES `EJERCICIO` (`idEjercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EJERCICIO_CATEGORIA`
--

LOCK TABLES `EJERCICIO_CATEGORIA` WRITE;
/*!40000 ALTER TABLE `EJERCICIO_CATEGORIA` DISABLE KEYS */;
INSERT INTO `EJERCICIO_CATEGORIA` VALUES (1,1,1),(2,2,2),(3,4,3),(4,3,4),(5,7,5);
/*!40000 ALTER TABLE `EJERCICIO_CATEGORIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EJERCICIO_IMPACTO`
--

DROP TABLE IF EXISTS `EJERCICIO_IMPACTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EJERCICIO_IMPACTO` (
  `idImpacto` int NOT NULL AUTO_INCREMENT,
  `idEjercicio` int NOT NULL,
  `idZona` int NOT NULL,
  `nivel_impacto` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idImpacto`),
  KEY `FK_IMPACTO_EJERCICIO` (`idEjercicio`),
  KEY `FK_IMPACTO_ZONA` (`idZona`),
  CONSTRAINT `FK_IMPACTO_EJERCICIO` FOREIGN KEY (`idEjercicio`) REFERENCES `EJERCICIO` (`idEjercicio`),
  CONSTRAINT `FK_IMPACTO_ZONA` FOREIGN KEY (`idZona`) REFERENCES `ZONA_CUERPO` (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EJERCICIO_IMPACTO`
--

LOCK TABLES `EJERCICIO_IMPACTO` WRITE;
/*!40000 ALTER TABLE `EJERCICIO_IMPACTO` DISABLE KEYS */;
INSERT INTO `EJERCICIO_IMPACTO` VALUES (1,1,1,'Alto'),(2,2,3,'Medio'),(3,3,2,'Bajo'),(4,4,1,'Alto'),(5,7,2,'Alto'),(6,9,3,'Medio');
/*!40000 ALTER TABLE `EJERCICIO_IMPACTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HISTORIAL`
--

DROP TABLE IF EXISTS `HISTORIAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HISTORIAL` (
  `idHistorial` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idEjercicio` int NOT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `resultado` varchar(255) DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL,
  `tiempo_real` int DEFAULT NULL,
  `puntos_obtenidos` int DEFAULT NULL,
  PRIMARY KEY (`idHistorial`),
  KEY `FK_HISTORIAL_USUARIO` (`idUsuario`),
  KEY `FK_HISTORIAL_EJERCICIO` (`idEjercicio`),
  CONSTRAINT `FK_HISTORIAL_EJERCICIO` FOREIGN KEY (`idEjercicio`) REFERENCES `EJERCICIO` (`idEjercicio`),
  CONSTRAINT `FK_HISTORIAL_USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HISTORIAL`
-- ru  

LOCK TABLES `HISTORIAL` WRITE;
/*!40000 ALTER TABLE `HISTORIAL` DISABLE KEYS */;
INSERT INTO `HISTORIAL` VALUES (1,1,1,'2026-06-04 00:00:00','Completado con advertencia','Cumplimiento del margen de esfuerzo: 33.33%',5,60),(2,1,1,'2026-06-16 00:00:00','Completado con advertencia','Cumplimiento del margen de esfuerzo: 33.33%',5,60),(3,1,1,'2026-06-16 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 6.67%',1,0),(4,1,1,'2026-06-16 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 13.33%',2,0),(5,1,1,'2026-06-16 00:00:00','Completado con advertencia','Cumplimiento del margen de esfuerzo: 66.67%',10,60),(6,1,1,'2026-06-16 00:00:00','Completado exitosamente','Cumplimiento del margen de esfuerzo: 333.33%',50,120),(7,1,1,'2026-06-16 00:00:00','Completado exitosamente','Cumplimiento del margen de esfuerzo: 100.00%',15,120),(8,1,1,'2026-06-18 00:00:00','Completado con advertencia','Cumplimiento del margen de esfuerzo: 80.00%',12,60),(9,1,1,'2026-06-18 00:00:00','Completado exitosamente','Cumplimiento del margen de esfuerzo: 100.00%',15,120),(10,1,1,'2026-06-18 00:00:00','Completado exitosamente','Cumplimiento del margen de esfuerzo: 2000.00%',300,120),(11,2,6,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(12,2,9,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(13,2,3,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(14,1,10,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(15,1,2,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(16,1,5,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(17,1,5,'2026-06-18 00:00:00','Esfuerzo insuficiente (Sospecha de fraude)','Cumplimiento del margen de esfuerzo: 0.00%',0,0),(18,8,3,'2026-06-19 19:07:54','Completado exitosamente','Cumplimiento del margen de esfuerzo: 125.00%',10,80),(19,8,3,'2026-06-19 19:12:19','Completado exitosamente','Cumplimiento del margen de esfuerzo: 125.00%',10,80),(20,8,3,'2026-06-19 19:12:54','Completado exitosamente','Cumplimiento del margen de esfuerzo: 125.00%',10,80),(21,8,3,'2026-06-19 19:13:40','Completado exitosamente','Cumplimiento del margen de esfuerzo: 125.00%',10,80),(22,8,3,'2026-06-19 19:18:48','Completado exitosamente','Cumplimiento del margen de esfuerzo: 125.00%',10,80);
/*!40000 ALTER TABLE `HISTORIAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PERFIL_FISICO`
--

DROP TABLE IF EXISTS `PERFIL_FISICO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PERFIL_FISICO` (
  `idPerfilFisico` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `edad` int DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `altura` decimal(5,2) DEFAULT NULL,
  `nivel_experiencia` varchar(50) DEFAULT NULL,
  `objetivo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPerfilFisico`),
  UNIQUE KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `FK_PERFIL_USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PERFIL_FISICO`
--

LOCK TABLES `PERFIL_FISICO` WRITE;
/*!40000 ALTER TABLE `PERFIL_FISICO` DISABLE KEYS */;
INSERT INTO `PERFIL_FISICO` VALUES (1,1,22,75.50,1.75,'Novato','Bajar de peso'),(2,2,28,82.00,1.80,'Intermedio','Ganar masa'),(3,3,21,70.50,1.50,'Novato','Bajar de peso'),(4,4,28,82.00,1.80,'Intermedio','Ganar masa'),(6,5,25,75.50,1.75,'Novato','Ganar masa'),(7,8,28,80.00,1.80,'Intermedio','Bajar de peso');
/*!40000 ALTER TABLE `PERFIL_FISICO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PLAN_ENTRENAMIENTO`
--

DROP TABLE IF EXISTS `PLAN_ENTRENAMIENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PLAN_ENTRENAMIENTO` (
  `idPlan` int NOT NULL AUTO_INCREMENT,
  `fechaCreacion` date DEFAULT NULL,
  `objetivo` varchar(255) DEFAULT NULL,
  `idProfesional` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idPlan`),
  KEY `FK_PLAN_PROFESIONAL` (`idProfesional`),
  KEY `FK_PLAN_USUARIO` (`idUsuario`),
  CONSTRAINT `FK_PLAN_PROFESIONAL` FOREIGN KEY (`idProfesional`) REFERENCES `PROFESIONAL` (`idProfesional`),
  CONSTRAINT `FK_PLAN_USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PLAN_ENTRENAMIENTO`
--

LOCK TABLES `PLAN_ENTRENAMIENTO` WRITE;
/*!40000 ALTER TABLE `PLAN_ENTRENAMIENTO` DISABLE KEYS */;
INSERT INTO `PLAN_ENTRENAMIENTO` VALUES (1,'2026-06-05','Pérdida de grasa',1,1);
/*!40000 ALTER TABLE `PLAN_ENTRENAMIENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROFESIONAL`
--

DROP TABLE IF EXISTS `PROFESIONAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PROFESIONAL` (
  `idProfesional` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `idCargo` int NOT NULL,
  PRIMARY KEY (`idProfesional`),
  KEY `FK_PROFESIONAL_CARGO` (`idCargo`),
  CONSTRAINT `FK_PROFESIONAL_CARGO` FOREIGN KEY (`idCargo`) REFERENCES `CARGO` (`idCargo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROFESIONAL`
--

LOCK TABLES `PROFESIONAL` WRITE;
/*!40000 ALTER TABLE `PROFESIONAL` DISABLE KEYS */;
INSERT INTO `PROFESIONAL` VALUES (1,'Carlos Trainer','Musculación','ACTIVO',1),(2,'Ana Nutri','Nutrición deportiva','ACTIVO',2);
/*!40000 ALTER TABLE `PROFESIONAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROL`
--

DROP TABLE IF EXISTS `ROL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ROL` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(50) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROL`
--

LOCK TABLES `ROL` WRITE;
/*!40000 ALTER TABLE `ROL` DISABLE KEYS */;
INSERT INTO `ROL` VALUES (1,'ADMIN'),(2,'CLIENTE'),(3,'ENTRENADOR');
/*!40000 ALTER TABLE `ROL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RUTINA`
--

DROP TABLE IF EXISTS `RUTINA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RUTINA` (
  `idRutina` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `idUsuario` int NOT NULL,
  `idPlan` int DEFAULT NULL,
  PRIMARY KEY (`idRutina`),
  KEY `FK_RUTINA_USUARIO` (`idUsuario`),
  KEY `FK_RUTINA_PLAN` (`idPlan`),
  CONSTRAINT `FK_RUTINA_PLAN` FOREIGN KEY (`idPlan`) REFERENCES `PLAN_ENTRENAMIENTO` (`idPlan`),
  CONSTRAINT `FK_RUTINA_USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RUTINA`
--

LOCK TABLES `RUTINA` WRITE;
/*!40000 ALTER TABLE `RUTINA` DISABLE KEYS */;
INSERT INTO `RUTINA` VALUES (1,'2026-06-18',2,NULL),(2,'2026-06-18',2,NULL),(3,'2026-06-18',2,NULL),(4,'2026-06-18',2,NULL),(5,'2026-06-18',2,NULL),(6,'2026-06-18',1,NULL),(7,'2026-06-18',1,NULL),(8,'2026-06-18',1,NULL),(9,'2026-06-18',1,NULL),(10,'2026-06-18',1,NULL),(11,'2026-06-18',1,NULL),(12,'2026-06-18',1,NULL),(13,'2026-06-18',1,NULL),(14,'2026-06-18',1,NULL),(15,'2026-06-19',5,NULL),(16,'2026-06-19',8,NULL),(17,'2026-06-19',8,NULL);
/*!40000 ALTER TABLE `RUTINA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `puntos_totales` int DEFAULT '0',
  `idRol` int NOT NULL,
  `protectores_racha` int DEFAULT '0',
  `racha_actual` int DEFAULT '0',
  `ultima_fecha_entrenamiento` date DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_USUARIO_ROL` (`idRol`),
  CONSTRAINT `FK_USUARIO_ROL` FOREIGN KEY (`idRol`) REFERENCES `ROL` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'Maria Fernandez','mariaF@test.com','123456','ACTIVO',670,2,1,0,NULL),(2,'Mario Ramos','mario@test.com','123456','ACTIVO',50,2,0,0,NULL),(3,'Juan Perez','juan@test.com','123456','ACTIVO',100,2,0,0,NULL),(4,'Maria Lopez','maria@test.com','123456','ACTIVO',50,2,0,0,NULL),(5,'Usuario Prueba','prueba1@fitadapt.com','12345','ACTIVO',0,2,0,0,NULL),(6,'Usuario Prueba','prueba1@fitadaptaa.com','12345','ACTIVO',0,2,0,0,NULL),(7,'Atleta Final','atleta@fitadapt.com','12345','ACTIVO',0,2,0,0,NULL),(8,'Atleta Final 2','atleta@fitadapt.comm','12345','ACTIVO',400,2,0,1,'2026-06-19');
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO_LESION`
--

DROP TABLE IF EXISTS `USUARIO_LESION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO_LESION` (
  `idLesion` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idZona` int NOT NULL,
  `estado_recuperacion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idLesion`),
  KEY `FK_LESION_USUARIO` (`idUsuario`),
  KEY `FK_LESION_ZONA` (`idZona`),
  CONSTRAINT `FK_LESION_USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`),
  CONSTRAINT `FK_LESION_ZONA` FOREIGN KEY (`idZona`) REFERENCES `ZONA_CUERPO` (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO_LESION`
--

LOCK TABLES `USUARIO_LESION` WRITE;
/*!40000 ALTER TABLE `USUARIO_LESION` DISABLE KEYS */;
INSERT INTO `USUARIO_LESION` VALUES (1,1,1,'En recuperación'),(2,2,2,'Leve'),(3,3,3,'En recuperación'),(4,7,1,'En tratamiento'),(5,8,1,'En tratamiento');
/*!40000 ALTER TABLE `USUARIO_LESION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ZONA_CUERPO`
--

DROP TABLE IF EXISTS `ZONA_CUERPO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ZONA_CUERPO` (
  `idZona` int NOT NULL AUTO_INCREMENT,
  `nombreZona` varchar(100) NOT NULL,
  PRIMARY KEY (`idZona`),
  UNIQUE KEY `nombreZona` (`nombreZona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ZONA_CUERPO`
--

LOCK TABLES `ZONA_CUERPO` WRITE;
/*!40000 ALTER TABLE `ZONA_CUERPO` DISABLE KEYS */;
INSERT INTO `ZONA_CUERPO` VALUES (4,'Cuello'),(2,'Espalda'),(3,'Hombro'),(1,'Rodilla'),(5,'Tobillo');
/*!40000 ALTER TABLE `ZONA_CUERPO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-19 19:39:38
