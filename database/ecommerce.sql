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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `CartID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `ProductID` int DEFAULT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`CartID`),
  KEY `cart_User_idx` (`UserID`),
  KEY `cart_Product_idx` (`ProductID`),
  CONSTRAINT `cart_Product` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE,
  CONSTRAINT `cart_User` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=389 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (54,1,1,2),(379,4,1,4),(380,4,2,1),(387,2,1,4),(388,2,2,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `CategoryID_UNIQUE` (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Men','Products for men','https://res.cloudinary.com/dwpgfdxl5/image/upload/v1684253660/Men_Category_phlnxa.webp'),(2,'Women','Products for Women','https://res.cloudinary.com/dwpgfdxl5/image/upload/v1684254590/Women-category_fm6h2n.jpg'),(3,'NewArrivals','New Products','https://res.cloudinary.com/dwpgfdxl5/image/upload/v1684254590/Women-category_fm6h2n.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_contains`
--

DROP TABLE IF EXISTS `category_contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_contains` (
  `CategoryID` int NOT NULL,
  `ProductID` int NOT NULL,
  PRIMARY KEY (`CategoryID`,`ProductID`),
  KEY `CategoryCon_ProductID_idx` (`ProductID`),
  CONSTRAINT `CategoryCon_CategoryID` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`),
  CONSTRAINT `CategoryCon_ProductID` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_contains`
--

LOCK TABLES `category_contains` WRITE;
/*!40000 ALTER TABLE `category_contains` DISABLE KEYS */;
INSERT INTO `category_contains` VALUES (1,1),(2,1),(1,2),(3,4);
/*!40000 ALTER TABLE `category_contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `OrderConID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int DEFAULT '1',
  PRIMARY KEY (`OrderConID`),
  KEY `order_products_ibfk_1` (`OrderID`),
  CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES (1,1,1,3),(2,1,2,1),(3,15,1,3),(4,15,2,2),(5,16,1,3),(6,16,2,2),(7,17,1,2),(8,17,2,1),(9,18,1,4),(10,18,2,1),(11,19,1,4),(12,19,2,2);
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  UNIQUE KEY `ProductID_UNIQUE` (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'shirt 1','Brown',450000,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1683780211/goods_32_456746_rrhlrq.webp'),(2,'shirt 2','Black',600000,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1683780211/goods_457419_sub14_uqksdq.webp'),(3,'shirt 3','Blue',700000,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1683780211/goods_458639_sub14_1_s4jjl9.webp'),(4,'shirt 4','Pink',570000,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1684412039/nam_12_sc1bh1.webp'),(9,'pants','brown',400000,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1685037215/OnlineShop/ealhibemtw2sljm5vltb.webp'),(10,'shirt 5','deep blue',123123,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1685037418/OnlineShop/hnye7szqgcmsgclr8mcp.webp'),(12,'hoodie','light brown',230000,'https://res.cloudinary.com/dwpgfdxl5/image/upload/v1685083159/OnlineShop/dtdygylxwb2anh56hszg.webp');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Role` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idUser_UNIQUE` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asd','asd@gmail.com','$2b$10$XV3DDXIfxj1xeyFlGowf4epGvR.ZeRlM6IK1Kb7ES6Ra4hvV3uLZW','User','2023-05-25 10:26:43','2023-05-26 06:39:55'),(2,'qwe','qwe1@gmail.com','$2b$10$VXnQFPP2tFRBFKLiVPew8uHIGn0rOeqTBTDjmKgMyBumEvBeifzeS','User','2023-04-25 10:26:43','2023-05-26 04:26:37'),(4,'admin','admin@gmail.com','$2b$10$3nQOKU6Vy5rclA/xWchJzOFVv2oUdTGfpqRKAvqjPNraOJsZ/uYoW','Admin','2023-05-25 10:26:43','2023-05-25 10:26:43'),(7,'zxc','zxc@gmail.com','$2b$10$uL5wx6BeSomj4yiCB8siB.R6wSkH7RIELilkn35PL/EJG6T0WAEsC','User','2023-05-26 06:56:57','2023-05-26 06:56:57'),(8,'asdf','asdf@gmail.com','$2b$10$ghUyj0eragZNMZrIZuqlwOfV/maTUl4NgWFAbWj/VRjjNPivzlItq','User','2023-05-26 07:14:30','2023-05-26 07:14:30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-31 12:36:30
