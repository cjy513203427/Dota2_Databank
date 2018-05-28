/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:26:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ct_user_role
-- ----------------------------
DROP TABLE IF EXISTS `ct_user_role`;
CREATE TABLE `ct_user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ct_user_role
-- ----------------------------
INSERT INTO `ct_user_role` VALUES ('1', '1', '1', '2016-09-06 16:57:39');
INSERT INTO `ct_user_role` VALUES ('16', '15', '2', '2016-09-06 18:09:01');
INSERT INTO `ct_user_role` VALUES ('17', '16', '2', '2016-09-06 18:13:38');
INSERT INTO `ct_user_role` VALUES ('18', '17', '1', '2016-09-06 18:45:58');
INSERT INTO `ct_user_role` VALUES ('19', '18', '2', '2016-09-06 18:54:26');
INSERT INTO `ct_user_role` VALUES ('20', '20', '1', '2016-09-07 17:01:47');
INSERT INTO `ct_user_role` VALUES ('21', '21', '2', '2016-09-07 17:03:14');
INSERT INTO `ct_user_role` VALUES ('22', '23', '1', '2016-09-07 17:15:02');
INSERT INTO `ct_user_role` VALUES ('23', '24', '1', '2016-09-08 20:54:20');
INSERT INTO `ct_user_role` VALUES ('24', '25', '1', '2016-09-08 20:57:47');
INSERT INTO `ct_user_role` VALUES ('25', '26', '1', '2016-09-08 21:00:25');
INSERT INTO `ct_user_role` VALUES ('26', '27', '1', '2016-09-08 21:10:47');
INSERT INTO `ct_user_role` VALUES ('27', '28', '2', '2016-09-18 10:43:37');
INSERT INTO `ct_user_role` VALUES ('28', '29', '2', '2016-09-18 10:52:03');
INSERT INTO `ct_user_role` VALUES ('29', '30', '1', '2016-09-26 09:31:58');
INSERT INTO `ct_user_role` VALUES ('30', '31', '1', '2016-09-26 18:42:41');
INSERT INTO `ct_user_role` VALUES ('31', '32', '1', '2016-09-27 11:19:44');
INSERT INTO `ct_user_role` VALUES ('32', '33', '1', '2016-09-27 11:51:46');
INSERT INTO `ct_user_role` VALUES ('33', '34', '1', '2016-09-27 14:36:02');
INSERT INTO `ct_user_role` VALUES ('34', '35', '2', '2017-02-16 21:26:01');
INSERT INTO `ct_user_role` VALUES ('35', '36', '2', '2017-02-16 21:30:32');
INSERT INTO `ct_user_role` VALUES ('36', '37', '2', '2017-02-16 21:32:54');
INSERT INTO `ct_user_role` VALUES ('37', '38', '2', '2017-02-16 21:39:23');
INSERT INTO `ct_user_role` VALUES ('38', '39', '1', '2017-02-20 22:38:25');
INSERT INTO `ct_user_role` VALUES ('39', '40', '1', '2017-02-27 21:39:44');
INSERT INTO `ct_user_role` VALUES ('40', '41', '26', '2017-03-06 14:47:10');
INSERT INTO `ct_user_role` VALUES ('41', '42', '2', '2017-03-06 21:30:31');
INSERT INTO `ct_user_role` VALUES ('42', '43', '27', '2017-03-06 21:42:09');
INSERT INTO `ct_user_role` VALUES ('43', '44', '1', '2017-03-12 14:59:25');
INSERT INTO `ct_user_role` VALUES ('48', '46', '26', '2017-03-12 20:36:41');
INSERT INTO `ct_user_role` VALUES ('49', '47', '26', '2017-03-12 22:02:45');
INSERT INTO `ct_user_role` VALUES ('79', '75', '1', '2017-10-01 14:24:06');
INSERT INTO `ct_user_role` VALUES ('80', '75', '32', '2017-10-01 14:24:06');
INSERT INTO `ct_user_role` VALUES ('81', '77', '32', '2017-10-01 14:28:00');
INSERT INTO `ct_user_role` VALUES ('87', '78', '32', '2017-10-02 16:49:10');
INSERT INTO `ct_user_role` VALUES ('88', '74', '1', '2017-10-06 15:27:52');
INSERT INTO `ct_user_role` VALUES ('92', '76', '32', '2017-10-06 15:35:01');
INSERT INTO `ct_user_role` VALUES ('101', '88', '32', '2017-10-18 18:03:10');
INSERT INTO `ct_user_role` VALUES ('112', '79', '32', '2017-10-26 14:26:11');
INSERT INTO `ct_user_role` VALUES ('113', '79', '1', '2017-10-26 14:26:11');
INSERT INTO `ct_user_role` VALUES ('114', '85', '32', '2017-10-30 14:33:51');
INSERT INTO `ct_user_role` VALUES ('115', '85', '34', '2017-10-30 14:33:51');
INSERT INTO `ct_user_role` VALUES ('116', '91', '32', '2018-04-27 17:54:03');
INSERT INTO `ct_user_role` VALUES ('117', '92', '32', '2018-04-27 22:27:53');
DROP TRIGGER IF EXISTS `default_datetime_ct_user_role`;
DELIMITER ;;
CREATE TRIGGER `default_datetime_ct_user_role` BEFORE INSERT ON `ct_user_role` FOR EACH ROW if new.create_time = '0000-00-00 00:00:00' then
set new.create_time = now();
end if
;;
DELIMITER ;
