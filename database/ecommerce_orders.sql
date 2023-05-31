-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `SubTotal` decimal(10,2) NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  `Shipping` json NOT NULL,
  `Delivery_Status` varchar(255) DEFAULT 'pending',
  `Payment_Status` varchar(255) DEFAULT NULL,
  `Created_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OrderID`),
  KEY `order_UserFK_idx` (`UserID`),
  CONSTRAINT `order_UserFK` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1350000.00,1350000.00,'{\"name\": \"Duy\", \"email\": \"duyvu285num1@gmail.com\", \"phone\": \"+84913520526\", \"address\": {\"city\": \"HCM\", \"line1\": \"74/18\", \"line2\": null, \"state\": \"Thành phố Hồ Chí Minh\", \"country\": \"VN\", \"postal_code\": \"76000\"}, \"tax_ids\": [], \"tax_exempt\": \"none\"}','dispatched','paid','2023-04-24 04:16:00','2023-05-26 01:55:08'),(15,2,2550000.00,2550000.00,'{\"name\": \"Duy\", \"email\": \"duyvu285num1@gmail.com\", \"phone\": \"+84913520526\", \"address\": {\"city\": \"HCM\", \"line1\": \"74/18\", \"line2\": null, \"state\": \"Thành phố Hồ Chí Minh\", \"country\": \"VN\", \"postal_code\": \"76000\"}, \"tax_ids\": [], \"tax_exempt\": \"none\"}','pending','paid','2023-05-24 07:06:25','2023-05-24 07:06:25'),(16,2,2550000.00,2550000.00,'{\"name\": \"Duy\", \"email\": \"admin@gmail.com\", \"phone\": \"+84913520526\", \"address\": {\"city\": \"HCM\", \"line1\": \"74/18\", \"line2\": null, \"state\": \"Thành phố Hồ Chí Minh\", \"country\": \"VN\", \"postal_code\": \"76000\"}, \"tax_ids\": [], \"tax_exempt\": \"none\"}','pending','paid','2023-05-24 18:15:48','2023-05-24 18:15:48'),(17,4,1500000.00,1500000.00,'{\"name\": \"Duy\", \"email\": \"duyvu285num1@gmail.com\", \"phone\": \"+84913520526\", \"address\": {\"city\": \"HCM\", \"line1\": \"74/18\", \"line2\": null, \"state\": \"Thành phố Hồ Chí Minh\", \"country\": \"VN\", \"postal_code\": \"76000\"}, \"tax_ids\": [], \"tax_exempt\": \"none\"}','pending','paid','2023-05-25 18:17:56','2023-05-25 18:17:56'),(18,4,2400000.00,2400000.00,'{\"name\": \"Duy\", \"email\": \"zxc@gmail.com\", \"phone\": \"+84913520526\", \"address\": {\"city\": \"HCM\", \"line1\": \"74/18\", \"line2\": null, \"state\": \"Thành phố Hồ Chí Minh\", \"country\": \"VN\", \"postal_code\": \"76000\"}, \"tax_ids\": [], \"tax_exempt\": \"none\"}','pending','paid','2023-05-26 06:38:42','2023-05-26 06:38:42'),(19,2,3000000.00,3000000.00,'{\"name\": \"Duy\", \"email\": \"zxc@gmail.com\", \"phone\": \"+84913520526\", \"address\": {\"city\": \"HCM\", \"line1\": \"74/18\", \"line2\": null, \"state\": \"Thành phố Hồ Chí Minh\", \"country\": \"VN\", \"postal_code\": \"76000\"}, \"tax_ids\": [], \"tax_exempt\": \"none\"}','pending','paid','2023-05-26 07:30:43','2023-05-26 07:30:43');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-31 12:36:02
