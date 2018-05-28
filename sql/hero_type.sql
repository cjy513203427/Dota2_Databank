/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:27:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hero_type
-- ----------------------------
DROP TABLE IF EXISTS `hero_type`;
CREATE TABLE `hero_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT NULL COMMENT '0 正常 1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hero_type
-- ----------------------------
INSERT INTO `hero_type` VALUES ('1', '力量英雄', '0', '0');
INSERT INTO `hero_type` VALUES ('2', '智力英雄', '0', '0');
INSERT INTO `hero_type` VALUES ('3', '敏捷英雄', '0', '0');
