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

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `pid` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '玩家ID',
  `account` varchar(64) NOT NULL COMMENT '玩家账号',
  `password` varchar(20) DEFAULT NULL COMMENT '账号密码',
  `reg_time` datetime NOT NULL COMMENT '注册时间',
  `platform` tinyint(4) unsigned NOT NULL COMMENT '平台',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=1026 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `const_identity` */

DROP TABLE IF EXISTS `const_identity`;

CREATE TABLE `const_identity` (
  `identity_id` tinyint(3) unsigned NOT NULL COMMENT '身份ID',
  `identity_name` varchar(20) NOT NULL COMMENT '身份名称',
  PRIMARY KEY (`identity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `const_platform` */

DROP TABLE IF EXISTS `const_platform`;

CREATE TABLE `const_platform` (
  `platform_id` tinyint(3) unsigned NOT NULL COMMENT '平台ID',
  `platform_name` varchar(20) NOT NULL COMMENT '平台名称',
  PRIMARY KEY (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `const_prop` */

DROP TABLE IF EXISTS `const_prop`;

CREATE TABLE `const_prop` (
  `prop_id` smallint(5) unsigned NOT NULL COMMENT '道具ID',
  `prop_name` varchar(20) NOT NULL COMMENT '道具名称',
  PRIMARY KEY (`prop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `const_reason` */

DROP TABLE IF EXISTS `const_reason`;

CREATE TABLE `const_reason` (
  `reason_id` tinyint(3) unsigned NOT NULL COMMENT '原因ID',
  `reason_name` varchar(20) NOT NULL COMMENT '原因名称',
  PRIMARY KEY (`reason_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `frozen` */

DROP TABLE IF EXISTS `frozen`;

CREATE TABLE `frozen` (
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `end_time` datetime NOT NULL COMMENT '冻结截止时间',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `log_3king` */

DROP TABLE IF EXISTS `log_3king`;

CREATE TABLE `log_3king` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `cost_coin` bigint(20) NOT NULL COMMENT '花费军饷',
  `gain_coin` bigint(20) NOT NULL COMMENT '获得军饷',
  `result_coin` bigint(20) NOT NULL COMMENT '结果军饷',
  `action` tinyint(3) unsigned NOT NULL COMMENT '动作(1=魏,2=蜀,3=吴)',
  `round` bigint(20) unsigned NOT NULL COMMENT '轮次',
  `time` datetime NOT NULL COMMENT '时间',
  PRIMARY KEY (`log_id`),
  KEY `PID_TIME` (`pid`,`time`),
  KEY `TIME_PID` (`time`,`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=758 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `log_7power` */

DROP TABLE IF EXISTS `log_7power`;

CREATE TABLE `log_7power` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `cost_coin` bigint(20) NOT NULL COMMENT '花费军饷',
  `gain_coin` bigint(20) NOT NULL COMMENT '获得军饷',
  `result_coin` bigint(20) NOT NULL COMMENT '结果军饷',
  `role` tinyint(3) unsigned NOT NULL COMMENT '角色(0-6战国七雄)',
  `round` bigint(20) unsigned NOT NULL COMMENT '轮次',
  `time` datetime NOT NULL COMMENT '时间',
  PRIMARY KEY (`log_id`),
  KEY `PID_TIME` (`pid`,`time`),
  KEY `TIME_PID` (`time`,`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=867 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `log_impawn` */

DROP TABLE IF EXISTS `log_impawn`;

CREATE TABLE `log_impawn` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `cost_coin` bigint(20) NOT NULL COMMENT '花费军饷',
  `cost_subcoin` bigint(20) NOT NULL COMMENT '花费军粮',
  `gain_coin` bigint(20) NOT NULL COMMENT '获得军饷',
  `gain_subcoin` bigint(20) NOT NULL COMMENT '获得军粮',
  `result_coin` bigint(20) NOT NULL COMMENT '结果军饷',
  `result_subcoin` bigint(20) NOT NULL COMMENT '结果军粮',
  `object` tinyint(3) unsigned NOT NULL COMMENT '押分对象(0=汉,1=楚)',
  `round` bigint(20) unsigned NOT NULL COMMENT '轮次',
  `time` datetime NOT NULL COMMENT '时间',
  PRIMARY KEY (`log_id`),
  KEY `PID_TIME` (`pid`,`time`),
  KEY `TIME_PID` (`time`,`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=130196 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `log_login` */

DROP TABLE IF EXISTS `log_login`;

CREATE TABLE `log_login` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `ip` varchar(20) DEFAULT NULL COMMENT '登录ip',
  `guid` varchar(65) DEFAULT NULL COMMENT '唯一标识',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  `logout_time` datetime NOT NULL COMMENT '登出时间',
  PRIMARY KEY (`log_id`),
  KEY `PID_LOGINTIME` (`pid`,`login_time`),
  KEY `PID_LOGOUTTIME` (`pid`,`logout_time`)
) ENGINE=InnoDB AUTO_INCREMENT=262366 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `log_update` */

DROP TABLE IF EXISTS `log_update`;

CREATE TABLE `log_update` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `prop_id` smallint(5) unsigned NOT NULL COMMENT '道具ID',
  `update` bigint(20) NOT NULL COMMENT '更新数量',
  `result` bigint(20) NOT NULL COMMENT '结果数量',
  `reason_id` tinyint(3) unsigned NOT NULL COMMENT '原因ID',
  `time` datetime NOT NULL COMMENT '时间',
  `note` varchar(32) NOT NULL COMMENT '备注',
  PRIMARY KEY (`log_id`),
  KEY `PID_TIME` (`pid`,`time`),
  KEY `TIME_PID` (`time`,`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `player` */

DROP TABLE IF EXISTS `player`;

CREATE TABLE `player` (
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `nickname` varchar(32) NOT NULL COMMENT '玩家昵称',
  `identity` tinyint(3) unsigned NOT NULL COMMENT '玩家身份',
  `login_time` datetime NOT NULL COMMENT '最近登录时间',
  `logout_time` datetime NOT NULL COMMENT '最近登出时间',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `prop` */

DROP TABLE IF EXISTS `prop`;

CREATE TABLE `prop` (
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `prop_id` smallint(5) unsigned NOT NULL COMMENT '道具ID',
  `prop_count` bigint(20) NOT NULL COMMENT '道具数量',
  PRIMARY KEY (`pid`,`prop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Procedure structure for procedure `sp_alter_name` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_alter_name` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_alter_name`(
	IN p_pid BIGINT,	# 玩家ID
	IN p_name VARCHAR(32), 	# 昵称
	in p_cost bigint,	# 花费金额
	in p_result bigint	# 结果金额
    )
    MODIFIES SQL DATA
    COMMENT '修改昵称'
label:BEGIN
	DECLARE v_name varchar(32) default '';
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
	    ROLLBACK; SELECT 2 AS 'return';
	END;
	
	START TRANSACTION;
	
	select nickname into v_name from 37sport.`player` where pid = p_pid;
	
	IF EXISTS(SELECT * FROM 37sport.`player` WHERE nickname = p_name for update) THEN
		ROLLBACK; SELECT 1 AS 'return'; LEAVE label;
	END IF;
	IF EXISTS(SELECT * FROM 37sport.`account` WHERE account = p_name FOR UPDATE) THEN
		ROLLBACK; SELECT 1 AS 'return'; LEAVE label;
	END IF;
	
	update 37sport.`player` set nickname = p_name where pid = p_pid;
	if row_count() != 1 then
		ROLLBACK; SELECT 2 AS 'return'; LEAVE label;
	end if;
	update 37sport.`account` set account = p_name WHERE pid = p_pid;
	IF ROW_COUNT() != 1 THEN
		ROLLBACK; SELECT 2 AS 'return'; LEAVE label;
	END IF;
	
	call 37sport.`sp_log_update`(p_pid, 1, -p_cost, p_result, 10, now(), v_name);
	
	COMMIT;
	
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_get_record` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_get_record` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_get_record`(
	in p_pid bigint,		# 玩家ID
	in p_beginTime datetime,	# 起始时间
	IN p_endTime DATETIME		# 结束时间
    )
    READS SQL DATA
    COMMENT '查询记录'
label:BEGIN
	select * from 
	# 查询楚汉相争
	(select -4 as 'reason', cost_coin AS 'cost_coin', cost_subcoin AS 'cost_subcoin',
	gain_coin as 'gain_coin', gain_subcoin as 'gain_subcoin', 
	CONCAT(`round`, '-', object) as 'note', `time` as 'time' from 37sport.`log_impawn` 
	where `time` >= p_beginTime and `time` < p_endTime and pid = p_pid
	UNION ALL
	# 查询七雄争霸
	select -3, cost_coin, 0, gain_coin, 0, 
	CONCAT(`round`, '-', role), `time` from 37sport.`log_7power` 
	where `time` >= p_beginTime AND `time` < p_endTime AND pid = p_pid
	UNION ALL
	# 查询三国鼎立
	SELECT -2, cost_coin, 0, gain_coin, 0, 
	CONCAT(`round`, '-', `action`), `time` FROM 37sport.`log_3king` 
	WHERE `time` >= p_beginTime AND `time` < p_endTime AND pid = p_pid
	UNION ALL
	# 查询道具更新
	select reason_id, 0, 0,
	if(prop_id = 1, `update`, 0),
	IF(prop_id = 1025, `update`, 0), note, `time` from 37sport.`log_update` 
	WHERE `time` >= p_beginTime AND `time` < p_endTime AND pid = p_pid) A
	order by `time` desc;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_login` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_login` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_login`(
	in p_account varchar(64),	# 账号
	in p_password varchar(20),	# 密码，官方平台有效
	in p_platform_id tinyint	# 平台
    )
    MODIFIES SQL DATA
    COMMENT '登录'
label:BEGIN
	# 第一返回集：{return} (0:成功 1:账号不存在 2:密码错误 3:参数错误 4:账号冻结)
	# 第二返回集：玩家角色信息
	# 第三返回集：玩家道具列表
	
	DECLARE v_pid bigint DEFAULT 0;
	declare v_password varchar(20) default '';
	declare v_nickname varchar(32) default '';
	DECLARE v_frozen_time DATETIME default now();
	
	# 判断参数
	if p_account = '' or not exists(select * from 37sport.`const_platform` where platform_id = p_platform_id) then
		SELECT 3 AS 'return';
		LEAVE label;
	end if;
	
	# 获得角色信息
	SELECT pid, `password` into v_pid, v_password FROM 37sport.`account` 
	WHERE account = p_account and platform = p_platform_id limit 1;
	
	# 检查账号是否存在
	if v_pid = 0 then
		if p_platform_id = 2 then
			insert into 37sport.`account` values(NULL, p_account, '', now(), p_platform_id);
			set v_pid = LAST_INSERT_ID();
			set v_nickname = CONCAT('wx', HEX(v_pid), SUBSTRING(p_account, 1, 6));
			INSERT INTO 37sport.`player` VALUES(v_pid, v_nickname, 1, '1970-01-01', '1970-01-01');
			INSERT INTO 37sport.`prop` VALUE(v_pid, 1025, 1000000);
		else
			SELECT 1 AS 'return';
			LEAVE label;
		end if;
	end if;
	
	# 查询是否被冻结
	SELECT end_time into v_frozen_time FROM 37sport.`frozen` WHERE pid = v_pid;
	if v_frozen_time > now() then
		SELECT 4 AS 'return';
		LEAVE label;
	end if;
	
	# 检查密码是否正确
	if p_platform_id = 1 and v_password != p_password then
		select 2 as 'return';
		LEAVE label;
	end if;
	
	# 返回成功标识
	select 0 as 'return';
	
	# 返回角色信息
	select a.pid, a.account, a.password, b.nickname, b.identity, a.platform, a.reg_time, b.login_time, b.logout_time 
	from 37sport.`account` a inner join 37sport.`player` b on a.pid = b.pid
	where a.pid = v_pid;
	
	# 返回道具列表
	select prop_id, prop_count from 37sport.`prop` where pid = v_pid;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_log_3king` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_log_3king` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_log_3king`(
		in p_pid bigint,	# 玩家ID
		in p_cost_coin bigint,	# 消耗军饷
		in p_gain_coin BIGINT,	# 获得军饷
		in p_result_coin BIGINT,# 结果军饷
		in p_action tinyint,	# 动作
		IN p_round BIGINT,	# 轮次
		in p_time datetime	# 游戏时间
	)
    MODIFIES SQL DATA
    COMMENT '添加三国鼎立记录'
label:BEGIN
	INSERT INTO 37sport.`log_3king`(log_id, pid, cost_coin, gain_coin, result_coin, `action`, `round`, `time`) 
	value(null, p_pid, p_cost_coin, p_gain_coin, p_result_coin, p_action, p_round, p_time);
	IF ROW_COUNT() != 1 THEN
		SELECT 1 AS 'return';
		LEAVE label;
	END IF;
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_log_7power` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_log_7power` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_log_7power`(
		in p_pid bigint,	# 玩家ID
		in p_cost_coin bigint,	# 消耗军饷
		in p_gain_coin BIGINT,	# 获得军饷
		in p_result_coin BIGINT,# 结果军饷
		in p_role tinyint,	# 扮演角色
		IN p_round BIGINT,	# 轮次
		in p_time datetime	# 游戏时间
	)
    MODIFIES SQL DATA
    COMMENT '添加七雄争霸记录'
label:BEGIN
	INSERT INTO 37sport.`log_7power`(log_id, pid, cost_coin, gain_coin, result_coin, role, `round`, `time`) 
	value(null, p_pid, p_cost_coin, p_gain_coin, p_result_coin, p_role, p_round, p_time);
	IF ROW_COUNT() != 1 THEN
		SELECT 1 AS 'return';
		LEAVE label;
	END IF;
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_log_impawn` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_log_impawn` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_log_impawn`(
		in p_pid bigint,	# 玩家ID
		in p_cost_coin bigint,	# 消耗军饷
		IN p_cost_subcoin BIGINT,# 消耗军粮
		in p_gain_coin BIGINT,	# 获得军饷
		IN p_gain_subcoin BIGINT,# 获得军粮
		in p_result_coin BIGINT,# 结果军饷
		IN p_result_subcoin BIGINT,# 结果军粮
		in p_object tinyint,	# 押分对象
		IN p_round BIGINT,	# 轮次
		in p_time datetime	# 游戏时间
	)
    MODIFIES SQL DATA
    COMMENT '添加楚汉相争记录'
label:BEGIN
	INSERT INTO 37sport.`log_impawn`(log_id, pid, cost_coin, cost_subcoin, gain_coin, gain_subcoin, result_coin, result_subcoin, object, `round`, `time`) 
	value(null, p_pid, p_cost_coin, p_cost_subcoin, p_gain_coin, p_gain_subcoin, p_result_coin, p_result_subcoin, p_object, p_round, p_time);
	if row_count() != 1 then
		select 1 as 'return';
		LEAVE label;
	end if;
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_log_login` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_log_login` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_log_login`(
		in p_pid bigint,		# 玩家ID
		in p_ip varchar(15),		# 登录IP
		in p_guid varchar(64),		# 登录唯一标识
		in p_login_time datetime,	# 登录时间
		in p_logout_time datetime	# 登出时间
	)
    MODIFIES SQL DATA
    COMMENT '添加登录记录'
label:BEGIN
	INSERT INTO 37sport.`log_login`(log_id, pid, ip, guid, login_time, logout_time) 
	value(null, p_pid, p_ip, p_guid, p_login_time, p_logout_time);
	IF ROW_COUNT() != 1 THEN
		SELECT 1 AS 'return';
		LEAVE label;
	END IF;
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_log_update` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_log_update` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_log_update`(
		in p_pid bigint,	# 玩家ID
		in p_prop_id smallint,	# 道具ID
		in p_update BIGINT,	# 更新数量
		in p_result BIGINT,	# 结果数量
		in p_reason_id tinyint,	# 更新原因ID
		in p_time datetime,	# 更新时间
		in p_note varchar(32)	# 备注
	)
    MODIFIES SQL DATA
    COMMENT '添加道具更新记录'
label:BEGIN
	INSERT INTO 37sport.`log_update`(log_id, pid, prop_id, `update`, result, reason_id, `time`, note) 
	value(null, p_pid, p_prop_id, p_update, p_result, p_reason_id, p_time, p_note);
	IF ROW_COUNT() != 1 THEN
		SELECT 1 AS 'return';
		LEAVE label;
	END IF;
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_register` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_register` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_register`(
	IN p_nickname VARCHAR(32),	# 昵称
	IN p_password VARCHAR(20)	# 密码
    )
    MODIFIES SQL DATA
    COMMENT '官方平台注册'
label:BEGIN
	DECLARE v_pid BIGINT DEFAULT 0;
	DECLARE v_award BIGINT DEFAULT 1000000;
	
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
	    ROLLBACK; SELECT 2 AS 'return';
	END;
	
	START TRANSACTION;
	if p_nickname = '' or p_password = '' then
		ROLLBACK; SELECT 3 AS 'return'; LEAVE label;
	end if;
	
	IF EXISTS(SELECT * FROM 37sport.`player` WHERE nickname = p_nickname FOR UPDATE) THEN
		ROLLBACK; SELECT 1 AS 'return'; LEAVE label;
	END IF;
	IF EXISTS(SELECT * FROM 37sport.`account` WHERE account = p_nickname FOR UPDATE) THEN
		ROLLBACK; SELECT 1 AS 'return'; LEAVE label;
	END IF;
	
	INSERT INTO 37sport.`account` VALUES(NULL, p_nickname, p_password, NOW(), 1);
	SET v_pid = LAST_INSERT_ID();
	INSERT INTO 37sport.`player` VALUES(v_pid, p_nickname, 1, '1970-01-01', '1970-01-01');
	if v_pid <= 1600 then 
		INSERT INTO 37sport.`prop` VALUE(v_pid, 1025, v_award);
		CALL 37sport.`sp_log_update`(v_pid, 1025, v_award, v_award, 14, NOW(), '');
	end if;
	
	COMMIT;
	
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_test_register` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_test_register` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_test_register`()
    MODIFIES SQL DATA
    COMMENT '注册内部账户'
label:BEGIN
	DECLARE v_i int unsigned DEFAULT 1;
	declare v_pid bigint default 0;
	DECLARE v_account VARCHAR(20) DEFAULT '';
	DECLARE v_nickname VARCHAR(20) DEFAULT '';
	DECLARE v_account_title VARCHAR(20) DEFAULT 'zztest';
	DECLARE v_nickname_title VARCHAR(20) DEFAULT 'zz测试号';
	
	WHILE v_i <= 1000 DO
		set v_account = CONCAT(v_account_title, v_i);
		SET v_nickname = CONCAT(v_nickname_title, v_i);
		INSERT INTO 37sport.`account` VALUES (null, v_account, '37Zz123456', now(), 1);
		set v_pid = LAST_INSERT_ID();
		INSERT into 37sport.`player` values (v_pid, v_nickname, 1, now(), now());
		set v_i = v_i + 1;
	END WHILE;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_update_player` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_update_player` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_update_player`(
		in p_pid bigint,		# 玩家ID
		in p_prop_id varchar(50),	# 道具ID（'id,id,id,'）
		in p_prop_count VARCHAR(100),	# 道具数量（'count,count,count,'）
		in p_login_time datetime,	# 登录时间
		in p_logout_time datetime	# 登出时间
	)
    MODIFIES SQL DATA
    COMMENT '修改玩家信息'
label:BEGIN
	# 返回{return} 0:成功 1:玩家ID不存在 2:参数错误 3:执行错误
	
	DECLARE v_id_pos INT DEFAULT 0;
	DECLARE v_count_pos INT DEFAULT 0;
	DECLARE v_prop_id BIGINT DEFAULT 0;
	DECLARE v_prop_count BIGINT DEFAULT 0;
	
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
	    ROLLBACK; SELECT 3 AS 'return';
	END;
	
	# 判断玩家ID是否存在
	IF p_pid <= 0 OR NOT EXISTS(SELECT * FROM 37sport.`account` WHERE pid = p_pid) THEN
		SELECT 1 AS 'return'; LEAVE label;
	END IF;
	
	START TRANSACTION;
	while_label: BEGIN
	WHILE LENGTH(p_prop_id) > 0 and LENGTH(p_prop_count) > 0 DO
		set v_id_pos = POSITION(',' IN p_prop_id);
		SET v_count_pos = POSITION(',' IN p_prop_count);
		if (v_id_pos = 0 or v_count_pos = 0) then
			LEAVE while_label;
		end if;
		
		# 得到数据
		set v_prop_id = CAST(SUBSTRING(p_prop_id, 1, v_id_pos - 1) as SIGNED);
		set v_prop_count = CAST(SUBSTRING(p_prop_count, 1, v_count_pos - 1) AS SIGNED);
		set p_prop_id = SUBSTRING(p_prop_id, v_id_pos + 1, LENGTH(p_prop_id) - v_id_pos);
		SET p_prop_count = SUBSTRING(p_prop_count, v_count_pos + 1, LENGTH(p_prop_count) - v_count_pos);
	
		# 判断参数
		if not exists(SELECT * FROM 37sport.`const_prop` WHERE prop_id = v_prop_id) then
			ROLLBACK; SELECT 2 AS 'return'; LEAVE label;
		end if;
		
		# 修改道具数量
		INSERT INTO 37sport.`prop`(pid, prop_id, prop_count) value(p_pid, v_prop_id, v_prop_count)
		ON DUPLICATE KEY UPDATE prop_count = v_prop_count;
	END WHILE;
	END while_label;
	
	# 修改最近登录登出时间
	update 37sport.`player` set login_time = p_login_time, logout_time = p_logout_time where pid = p_pid;
	
	COMMIT;
	
	# 返回成功标识
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
