/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:26:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ct_resource_role
-- ----------------------------
DROP TABLE IF EXISTS `ct_resource_role`;
CREATE TABLE `ct_resource_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `resource_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22405 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ct_resource_role
-- ----------------------------
INSERT INTO `ct_resource_role` VALUES ('28', '3', '8', '2016-09-07 20:46:51');
INSERT INTO `ct_resource_role` VALUES ('29', '4', '8', '2016-09-07 20:46:51');
INSERT INTO `ct_resource_role` VALUES ('30', '2', '11', '2016-09-08 10:49:53');
INSERT INTO `ct_resource_role` VALUES ('31', '2', '12', '2016-09-08 10:52:53');
INSERT INTO `ct_resource_role` VALUES ('37', '1', '14', '2016-09-08 11:46:12');
INSERT INTO `ct_resource_role` VALUES ('38', '2', '14', '2016-09-08 11:46:12');
INSERT INTO `ct_resource_role` VALUES ('39', '3', '14', '2016-09-08 11:46:12');
INSERT INTO `ct_resource_role` VALUES ('40', '4', '14', '2016-09-08 11:46:12');
INSERT INTO `ct_resource_role` VALUES ('41', '5', '14', '2016-09-08 11:46:12');
INSERT INTO `ct_resource_role` VALUES ('42', '2', '15', '2016-09-08 14:21:11');
INSERT INTO `ct_resource_role` VALUES ('43', '5', '15', '2016-09-08 14:21:11');
INSERT INTO `ct_resource_role` VALUES ('44', '3', '15', '2016-09-08 14:21:11');
INSERT INTO `ct_resource_role` VALUES ('45', '4', '15', '2016-09-08 14:21:11');
INSERT INTO `ct_resource_role` VALUES ('46', '6', '15', '2016-09-08 14:21:11');
INSERT INTO `ct_resource_role` VALUES ('47', '2', '16', '2016-09-08 14:25:00');
INSERT INTO `ct_resource_role` VALUES ('48', '5', '16', '2016-09-08 14:25:00');
INSERT INTO `ct_resource_role` VALUES ('49', '3', '16', '2016-09-08 14:25:00');
INSERT INTO `ct_resource_role` VALUES ('50', '4', '16', '2016-09-08 14:25:00');
INSERT INTO `ct_resource_role` VALUES ('51', '6', '16', '2016-09-08 14:25:00');
INSERT INTO `ct_resource_role` VALUES ('52', '1', '18', '2016-09-08 14:25:28');
INSERT INTO `ct_resource_role` VALUES ('53', '2', '18', '2016-09-08 14:25:28');
INSERT INTO `ct_resource_role` VALUES ('54', '3', '18', '2016-09-08 14:25:28');
INSERT INTO `ct_resource_role` VALUES ('55', '4', '18', '2016-09-08 14:25:28');
INSERT INTO `ct_resource_role` VALUES ('56', '5', '18', '2016-09-08 14:25:28');
INSERT INTO `ct_resource_role` VALUES ('57', '1', '19', '2016-09-08 14:26:16');
INSERT INTO `ct_resource_role` VALUES ('58', '2', '19', '2016-09-08 14:26:16');
INSERT INTO `ct_resource_role` VALUES ('59', '3', '19', '2016-09-08 14:26:16');
INSERT INTO `ct_resource_role` VALUES ('60', '4', '19', '2016-09-08 14:26:16');
INSERT INTO `ct_resource_role` VALUES ('61', '5', '19', '2016-09-08 14:26:16');
INSERT INTO `ct_resource_role` VALUES ('62', '1', '20', '2016-09-08 14:26:38');
INSERT INTO `ct_resource_role` VALUES ('63', '2', '20', '2016-09-08 14:26:38');
INSERT INTO `ct_resource_role` VALUES ('64', '1', '22', '2016-09-08 14:32:25');
INSERT INTO `ct_resource_role` VALUES ('65', '2', '22', '2016-09-08 14:32:25');
INSERT INTO `ct_resource_role` VALUES ('66', '5', '22', '2016-09-08 14:32:25');
INSERT INTO `ct_resource_role` VALUES ('67', '3', '22', '2016-09-08 14:32:25');
INSERT INTO `ct_resource_role` VALUES ('68', '4', '22', '2016-09-08 14:32:25');
INSERT INTO `ct_resource_role` VALUES ('69', '6', '22', '2016-09-08 14:32:25');
INSERT INTO `ct_resource_role` VALUES ('114', '1', '23', '2016-09-08 20:50:59');
INSERT INTO `ct_resource_role` VALUES ('115', '2', '23', '2016-09-08 20:50:59');
INSERT INTO `ct_resource_role` VALUES ('116', '5', '23', '2016-09-08 20:50:59');
INSERT INTO `ct_resource_role` VALUES ('117', '3', '23', '2016-09-08 20:50:59');
INSERT INTO `ct_resource_role` VALUES ('118', '4', '23', '2016-09-08 20:50:59');
INSERT INTO `ct_resource_role` VALUES ('119', '6', '23', '2016-09-08 20:50:59');
INSERT INTO `ct_resource_role` VALUES ('127', '1', '25', '2016-09-09 09:53:41');
INSERT INTO `ct_resource_role` VALUES ('128', '2', '25', '2016-09-09 09:53:41');
INSERT INTO `ct_resource_role` VALUES ('129', '5', '25', '2016-09-09 09:53:41');
INSERT INTO `ct_resource_role` VALUES ('130', '3', '25', '2016-09-09 09:53:41');
INSERT INTO `ct_resource_role` VALUES ('131', '4', '25', '2016-09-09 09:53:41');
INSERT INTO `ct_resource_role` VALUES ('132', '6', '25', '2016-09-09 09:53:41');
INSERT INTO `ct_resource_role` VALUES ('352', '1', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('353', '2', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('354', '5', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('355', '4', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('356', '6', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('357', '7', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('358', '9', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('359', '10', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('360', '11', '2', '2017-02-16 21:32:04');
INSERT INTO `ct_resource_role` VALUES ('886', '1', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('887', '68', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('888', '70', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('889', '71', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('890', '72', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('891', '77', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('892', '78', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('893', '79', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('894', '80', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('895', '7', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('896', '60', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('897', '61', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('898', '62', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('899', '63', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('900', '66', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('901', '67', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('902', '81', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('903', '82', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('904', '83', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('905', '84', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('906', '85', '27', '2017-03-06 21:45:55');
INSERT INTO `ct_resource_role` VALUES ('907', '1', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('908', '68', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('909', '70', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('910', '71', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('911', '72', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('912', '77', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('913', '78', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('914', '79', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('915', '80', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('916', '5', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('917', '3', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('918', '4', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('919', '56', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('920', '57', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('921', '58', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('922', '7', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('923', '60', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('924', '61', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('925', '62', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('926', '63', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('927', '64', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('928', '66', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('929', '67', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('930', '81', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('931', '82', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('932', '83', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('933', '84', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('934', '85', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('935', '86', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('936', '87', '28', '2017-03-06 21:46:08');
INSERT INTO `ct_resource_role` VALUES ('1159', '1', '26', '2017-03-12 22:05:53');
INSERT INTO `ct_resource_role` VALUES ('1160', '69', '26', '2017-03-12 22:05:53');
INSERT INTO `ct_resource_role` VALUES ('1161', '71', '26', '2017-03-12 22:05:53');
INSERT INTO `ct_resource_role` VALUES ('1162', '78', '26', '2017-03-12 22:05:53');
INSERT INTO `ct_resource_role` VALUES ('1163', '7', '26', '2017-03-12 22:05:53');
INSERT INTO `ct_resource_role` VALUES ('1755', '7', '29', '2017-05-01 10:01:06');
INSERT INTO `ct_resource_role` VALUES ('3654', '7', '30', '2017-10-01 11:16:30');
INSERT INTO `ct_resource_role` VALUES ('3694', '163', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3695', '168', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3696', '169', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3697', '170', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3698', '171', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3699', '172', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3700', '173', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3701', '174', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3702', '175', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3703', '176', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3704', '178', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3705', '179', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3706', '180', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3707', '181', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3708', '213', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3709', '214', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3710', '215', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3711', '216', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3712', '177', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3713', '217', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3714', '218', '33', '2017-10-18 18:04:47');
INSERT INTO `ct_resource_role` VALUES ('3727', '163', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3728', '174', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3729', '175', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3730', '176', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3731', '178', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3732', '179', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3733', '180', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3734', '181', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3735', '213', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3736', '214', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3737', '215', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('3738', '216', '34', '2017-10-20 15:39:11');
INSERT INTO `ct_resource_role` VALUES ('22228', '163', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22229', '168', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22230', '169', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22231', '170', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22232', '171', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22233', '172', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22234', '173', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22235', '174', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22236', '175', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22237', '176', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22238', '178', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22239', '179', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22240', '180', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22241', '181', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22242', '213', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22243', '214', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22244', '215', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22245', '216', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22246', '177', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22247', '217', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22248', '218', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22249', '221', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22250', '222', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22251', '223', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22252', '224', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22253', '225', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22254', '226', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22255', '227', '36', '2018-02-09 16:17:04');
INSERT INTO `ct_resource_role` VALUES ('22359', '2', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22360', '5', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22361', '3', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22362', '4', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22363', '56', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22364', '57', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22365', '58', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22366', '97', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22367', '6', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22368', '8', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22369', '7', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22370', '223', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22371', '224', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22372', '229', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22373', '230', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22374', '226', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22375', '231', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22376', '227', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22377', '232', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22378', '228', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22379', '233', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22380', '234', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22381', '235', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22382', '236', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22383', '237', '1', '2018-04-25 11:44:04');
INSERT INTO `ct_resource_role` VALUES ('22384', '2', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22385', '5', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22386', '6', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22387', '8', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22388', '7', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22389', '163', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22390', '223', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22391', '224', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22392', '229', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22393', '230', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22394', '225', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22395', '226', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22396', '231', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22397', '227', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22398', '232', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22399', '228', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22400', '233', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22401', '234', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22402', '235', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22403', '236', '32', '2018-04-27 22:37:53');
INSERT INTO `ct_resource_role` VALUES ('22404', '237', '32', '2018-04-27 22:37:53');
DROP TRIGGER IF EXISTS `default_datetime_ct_resource_role`;
DELIMITER ;;
CREATE TRIGGER `default_datetime_ct_resource_role` BEFORE INSERT ON `ct_resource_role` FOR EACH ROW if new.create_time = '0000-00-00 00:00:00' then
set new.create_time = now();
end if
;;
DELIMITER ;
