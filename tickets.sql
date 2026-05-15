-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: bacson_gps
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `groupId` bigint NOT NULL,
  `unitID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `truckNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meterNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (3,0,'DE000020',NULL,NULL,NULL,'install',NULL,NULL,'',''),(4,2,'DE000020',NULL,NULL,'4115 St Lawrence Dr, New Port Richey','Transfer','2021-11-27 18:10:09','2021-11-27 18:10:09','',''),(5,2,'DE000020',NULL,NULL,'4115 St Lawrence Dr, New Port Richey','Install','2021-11-27 18:24:52','2021-11-27 18:24:52','',''),(6,15,'DE0000b8',NULL,NULL,NULL,'Transfer','2022-01-18 12:32:44','2022-01-18 12:32:44','',''),(7,3,'DE000014',NULL,NULL,'7937 Daetwyler Dr, Orlando','Transfer','2022-01-24 18:05:02','2022-01-24 18:05:02','',''),(8,3,'DE000014','1234','5678','7937 Daetwyler Dr, Orlando','Transfer','2022-01-24 18:06:02','2022-01-24 18:06:02','',''),(9,3,'DE000014','1234','5678','7937 Daetwyler Dr, Orlando','Install','2022-01-24 18:07:45','2022-01-24 18:07:45','',''),(10,3,'DE000014',NULL,NULL,'WCF5+VC Lake Wales, FL','Transfer','2022-01-25 13:09:40','2022-01-25 13:09:40','',''),(11,5,'DE000051','8803','7977633','9FV8+J6 Lake Buena Vista, FL','Transfer','2022-05-19 00:00:45','2022-05-19 00:00:45','',''),(12,5,'DE000051','8803','7977633','9FV8+J6 Lake Buena Vista, FL','Transfer','2022-05-19 00:01:37','2022-05-19 00:01:37','',''),(13,5,'DE00005a','8803','8214908','8036 Jozee Cir, Orlando','Transfer','2022-05-20 21:58:01','2022-05-20 21:58:01','',''),(14,5,'DE000055','8803','4335840','6557 Conroy Rd, Orlando','Transfer','2022-05-24 16:18:19','2022-05-24 16:18:19','',''),(15,23,'DE00013a','18805',NULL,'2166 Palmetto St, Clearwater','Transfer','2022-05-25 20:21:10','2022-05-25 20:21:10','',''),(16,23,'DE00013a',NULL,NULL,'2166 Palmetto St, Clearwater','Transfer','2022-05-25 20:21:54','2022-05-25 20:21:54','',''),(17,23,'DE00013a',NULL,NULL,'2166 Palmetto St, Clearwater','Transfer','2022-05-25 20:22:06','2022-05-25 20:22:06','',''),(18,23,'DE00014c','31439','4146226','1940 Arvis Cir E, Clearwater','Transfer','2022-06-01 19:55:32','2022-06-01 19:55:32','',''),(19,23,'DE00014c',NULL,NULL,'1940 Arvis Cir E, Clearwater','Transfer','2022-06-01 19:55:39','2022-06-01 19:55:39','',''),(20,23,'DE00014c',NULL,NULL,'1940 Arvis Cir E, Clearwater','Install','2022-06-01 19:55:49','2022-06-01 19:55:49','',''),(21,5,'DE000055','8803',NULL,'11467 S Orange Blossom Trl, Orlando','Transfer','2022-06-21 17:45:33','2022-06-21 17:45:33','',''),(22,5,'DE000055','8803',NULL,'11467 S Orange Blossom Trl, Orlando','Transfer','2022-06-21 18:09:19','2022-06-21 18:09:19','',''),(23,5,'DE000055',NULL,NULL,'11467 S Orange Blossom Trl, Orlando','Transfer','2022-06-21 18:09:26','2022-06-21 18:09:26','',''),(24,5,'DE000055',NULL,NULL,'11467 S Orange Blossom Trl, Orlando','Transfer','2022-06-21 18:09:33','2022-06-21 18:09:33','','');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-13 18:17:58
