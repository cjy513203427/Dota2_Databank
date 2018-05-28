/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:26:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ct_role
-- ----------------------------
DROP TABLE IF EXISTS `ct_role`;
CREATE TABLE `ct_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '用色名',
  `description` text COMMENT '描述',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0：无效，1：有效',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ct_role
-- ----------------------------
INSERT INTO `ct_role` VALUES ('1', '超级管理员', '超级管理员12', '1', '2018-04-25 11:44:04', '2016-09-02 11:44:16');
INSERT INTO `ct_role` VALUES ('2', '管理员', '管理员', '0', '2017-03-12 22:07:12', '2016-09-02 11:44:18');
INSERT INTO `ct_role` VALUES ('23', '管理员2', '地方萨芬', '0', '2016-09-08 20:51:30', '2016-09-08 20:50:59');
INSERT INTO `ct_role` VALUES ('24', '擦擦', '', '0', '2016-09-08 20:53:42', '2016-09-08 20:53:27');
INSERT INTO `ct_role` VALUES ('25', '测试角色', '测试角色', '0', '2016-09-09 09:53:41', '2016-09-09 09:49:22');
INSERT INTO `ct_role` VALUES ('26', '表现师', '表现师的基础权限', '0', '2017-04-24 16:20:41', '2017-03-06 21:40:15');
INSERT INTO `ct_role` VALUES ('27', '客服', '客服的基础权限', '0', '2017-04-24 16:20:39', '2017-03-06 21:41:24');
INSERT INTO `ct_role` VALUES ('28', '客服经理', '', '0', '2017-04-24 16:20:36', '2017-03-06 21:42:27');
INSERT INTO `ct_role` VALUES ('29', 'ananymity', '匿名用户', '0', '2017-05-02 16:44:08', '2017-05-01 10:01:06');
INSERT INTO `ct_role` VALUES ('30', '设计师', '施工图', '0', '2017-10-02 11:16:19', '2017-08-25 15:45:17');
INSERT INTO `ct_role` VALUES ('31', '客服1', '客服1', '0', '2017-09-22 10:07:31', '2017-08-25 15:46:35');
INSERT INTO `ct_role` VALUES ('32', '一级管理', '一级管理者', '1', '2018-04-27 22:37:53', '2017-09-22 10:31:56');
INSERT INTO `ct_role` VALUES ('33', 'ddd', 'dddd', '0', '2017-10-18 18:04:56', '2017-10-18 18:04:47');
INSERT INTO `ct_role` VALUES ('34', '普通用户', '普通用户', '1', '2017-10-20 15:39:10', '2017-10-19 14:47:30');
DROP TRIGGER IF EXISTS `default_datetime_ct_role`;
DELIMITER ;;
CREATE TRIGGER `default_datetime_ct_role` BEFORE INSERT ON `ct_role` FOR EACH ROW if new.create_time = '0000-00-00 00:00:00' then
set new.create_time = now();
end if
;;
DELIMITER ;
