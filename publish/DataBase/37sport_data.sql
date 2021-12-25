/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 10.3.11-MariaDB : Database - 37sport
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`37sport` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `37sport`;

/*Data for the table `const_identity` */

insert  into `const_identity`(`identity_id`,`identity_name`) values (1,'玩家'),(2,'管理员'),(3,'高级GM'),(4,'Admin');

/*Data for the table `const_platform` */

insert  into `const_platform`(`platform_id`,`platform_name`) values (1,'官方'),(2,'微信小游戏');

/*Data for the table `const_prop` */

insert  into `const_prop`(`prop_id`,`prop_name`) values (1,'军饷'),(1025,'军粮');

/*Data for the table `const_reason` */

insert  into `const_reason`(`reason_id`,`reason_name`) values (1,'查看静态广告'),(2,'查看动态广告'),(3,'查看记录'),(4,'商城充值'),(5,'三国鼎立解锁'),(6,'七雄争霸解锁'),(7,'三国鼎立退款'),(8,'七雄争霸退款'),(9,'楚汉相争退款'),(10,'修改昵称'),(11,'发送红包'),(12,'兑换军饷'),(13,'签到领奖'),(14,'系统奖励');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
