/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:27:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for item_compound
-- ----------------------------
DROP TABLE IF EXISTS `item_compound`;
CREATE TABLE `item_compound` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `compound_item_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item_compound
-- ----------------------------
INSERT INTO `item_compound` VALUES ('1', '36', '16');
INSERT INTO `item_compound` VALUES ('2', '36', '16');
INSERT INTO `item_compound` VALUES ('3', '36', '34');
INSERT INTO `item_compound` VALUES ('4', '36', '216');
INSERT INTO `item_compound` VALUES ('5', '158', '166');
INSERT INTO `item_compound` VALUES ('6', '158', '55');
INSERT INTO `item_compound` VALUES ('7', '158', '157');
INSERT INTO `item_compound` VALUES ('8', '88', '28');
INSERT INTO `item_compound` VALUES ('9', '88', '12');
INSERT INTO `item_compound` VALUES ('10', '254', '215');
INSERT INTO `item_compound` VALUES ('11', '254', '31');
INSERT INTO `item_compound` VALUES ('12', '131', '56');
INSERT INTO `item_compound` VALUES ('13', '131', '31');
INSERT INTO `item_compound` VALUES ('14', '131', '27');
INSERT INTO `item_compound` VALUES ('15', '149', '3');
INSERT INTO `item_compound` VALUES ('16', '149', '2');
INSERT INTO `item_compound` VALUES ('17', '149', '148');
INSERT INTO `item_compound` VALUES ('18', '236', '21');
INSERT INTO `item_compound` VALUES ('19', '236', '18');
INSERT INTO `item_compound` VALUES ('20', '236', '18');
INSERT INTO `item_compound` VALUES ('21', '77', '20');
INSERT INTO `item_compound` VALUES ('22', '77', '15');
INSERT INTO `item_compound` VALUES ('23', '77', '76');
INSERT INTO `item_compound` VALUES ('24', '94', '27');
INSERT INTO `item_compound` VALUES ('25', '94', '16');
INSERT INTO `item_compound` VALUES ('26', '94', '93');
INSERT INTO `item_compound` VALUES ('27', '190', '6');
INSERT INTO `item_compound` VALUES ('28', '190', '77');
INSERT INTO `item_compound` VALUES ('29', '190', '189');
INSERT INTO `item_compound` VALUES ('30', '125', '56');
INSERT INTO `item_compound` VALUES ('31', '125', '61');
INSERT INTO `item_compound` VALUES ('32', '125', '182');
INSERT INTO `item_compound` VALUES ('33', '151', '6');
INSERT INTO `item_compound` VALUES ('34', '151', '25');
INSERT INTO `item_compound` VALUES ('35', '151', '2');
INSERT INTO `item_compound` VALUES ('36', '151', '150');
INSERT INTO `item_compound` VALUES ('37', '162', '21');
INSERT INTO `item_compound` VALUES ('38', '162', '17');
INSERT INTO `item_compound` VALUES ('39', '162', '161');
INSERT INTO `item_compound` VALUES ('40', '75', '20');
INSERT INTO `item_compound` VALUES ('41', '75', '14');
INSERT INTO `item_compound` VALUES ('42', '75', '74');
INSERT INTO `item_compound` VALUES ('43', '86', '4');
INSERT INTO `item_compound` VALUES ('44', '86', '16');
INSERT INTO `item_compound` VALUES ('45', '86', '85');
INSERT INTO `item_compound` VALUES ('46', '232', '59');
INSERT INTO `item_compound` VALUES ('47', '232', '57');
INSERT INTO `item_compound` VALUES ('48', '232', '231');
INSERT INTO `item_compound` VALUES ('49', '127', '3');
INSERT INTO `item_compound` VALUES ('50', '127', '2');
INSERT INTO `item_compound` VALUES ('51', '127', '19');
INSERT INTO `item_compound` VALUES ('52', '223', '21');
INSERT INTO `item_compound` VALUES ('53', '223', '23');
INSERT INTO `item_compound` VALUES ('54', '223', '27');
INSERT INTO `item_compound` VALUES ('55', '223', '28');
INSERT INTO `item_compound` VALUES ('56', '170', '22');
INSERT INTO `item_compound` VALUES ('57', '170', '18');
INSERT INTO `item_compound` VALUES ('58', '170', '169');
INSERT INTO `item_compound` VALUES ('59', '73', '20');
INSERT INTO `item_compound` VALUES ('60', '73', '13');
INSERT INTO `item_compound` VALUES ('61', '73', '72');
INSERT INTO `item_compound` VALUES ('62', '92', '265');
INSERT INTO `item_compound` VALUES ('63', '92', '20');
INSERT INTO `item_compound` VALUES ('64', '92', '12');
INSERT INTO `item_compound` VALUES ('65', '92', '91');
INSERT INTO `item_compound` VALUES ('66', '102', '23');
INSERT INTO `item_compound` VALUES ('67', '102', '56');
INSERT INTO `item_compound` VALUES ('68', '102', '101');
INSERT INTO `item_compound` VALUES ('69', '129', '61');
INSERT INTO `item_compound` VALUES ('70', '129', '59');
INSERT INTO `item_compound` VALUES ('71', '129', '60');
INSERT INTO `item_compound` VALUES ('72', '152', '215');
INSERT INTO `item_compound` VALUES ('73', '152', '5');
INSERT INTO `item_compound` VALUES ('74', '252', '21');
INSERT INTO `item_compound` VALUES ('75', '252', '67');
INSERT INTO `item_compound` VALUES ('76', '252', '251');
INSERT INTO `item_compound` VALUES ('77', '178', '27');
INSERT INTO `item_compound` VALUES ('78', '178', '13');
INSERT INTO `item_compound` VALUES ('79', '178', '13');
INSERT INTO `item_compound` VALUES ('80', '178', '177');
INSERT INTO `item_compound` VALUES ('81', '259', '23');
INSERT INTO `item_compound` VALUES ('82', '259', '19');
INSERT INTO `item_compound` VALUES ('83', '259', '258');
INSERT INTO `item_compound` VALUES ('84', '214', '29');
INSERT INTO `item_compound` VALUES ('85', '214', '244');
INSERT INTO `item_compound` VALUES ('86', '214', '27');
INSERT INTO `item_compound` VALUES ('87', '106', '28');
INSERT INTO `item_compound` VALUES ('88', '106', '28');
INSERT INTO `item_compound` VALUES ('89', '106', '17');
INSERT INTO `item_compound` VALUES ('90', '106', '105');
INSERT INTO `item_compound` VALUES ('91', '242', '125');
INSERT INTO `item_compound` VALUES ('92', '242', '86');
INSERT INTO `item_compound` VALUES ('93', '242', '243');
INSERT INTO `item_compound` VALUES ('94', '143', '13');
INSERT INTO `item_compound` VALUES ('95', '143', '7');
INSERT INTO `item_compound` VALUES ('96', '143', '142');
INSERT INTO `item_compound` VALUES ('97', '172', '26');
INSERT INTO `item_compound` VALUES ('98', '172', '10');
INSERT INTO `item_compound` VALUES ('99', '50', '29');
INSERT INTO `item_compound` VALUES ('100', '50', '2');
INSERT INTO `item_compound` VALUES ('101', '50', '2');
INSERT INTO `item_compound` VALUES ('102', '212', '75');
INSERT INTO `item_compound` VALUES ('103', '212', '88');
INSERT INTO `item_compound` VALUES ('104', '229', '187');
INSERT INTO `item_compound` VALUES ('105', '229', '32');
INSERT INTO `item_compound` VALUES ('106', '256', '61');
INSERT INTO `item_compound` VALUES ('107', '256', '59');
INSERT INTO `item_compound` VALUES ('108', '256', '255');
INSERT INTO `item_compound` VALUES ('109', '145', '51');
INSERT INTO `item_compound` VALUES ('110', '145', '69');
INSERT INTO `item_compound` VALUES ('111', '145', '11');
INSERT INTO `item_compound` VALUES ('112', '164', '13');
INSERT INTO `item_compound` VALUES ('113', '164', '94');
INSERT INTO `item_compound` VALUES ('114', '164', '56');
INSERT INTO `item_compound` VALUES ('115', '63', '29');
INSERT INTO `item_compound` VALUES ('116', '63', '13');
INSERT INTO `item_compound` VALUES ('117', '63', '17');
INSERT INTO `item_compound` VALUES ('118', '187', '4');
INSERT INTO `item_compound` VALUES ('119', '187', '28');
INSERT INTO `item_compound` VALUES ('120', '187', '240');
INSERT INTO `item_compound` VALUES ('121', '104', '23');
INSERT INTO `item_compound` VALUES ('122', '104', '77');
INSERT INTO `item_compound` VALUES ('123', '104', '103');
INSERT INTO `item_compound` VALUES ('124', '116', '21');
INSERT INTO `item_compound` VALUES ('125', '116', '8');
INSERT INTO `item_compound` VALUES ('126', '116', '115');
INSERT INTO `item_compound` VALUES ('127', '135', '55');
INSERT INTO `item_compound` VALUES ('128', '135', '7');
INSERT INTO `item_compound` VALUES ('129', '135', '7');
INSERT INTO `item_compound` VALUES ('130', '67', '10');
INSERT INTO `item_compound` VALUES ('131', '67', '28');
INSERT INTO `item_compound` VALUES ('132', '67', '19');
INSERT INTO `item_compound` VALUES ('133', '180', '29');
INSERT INTO `item_compound` VALUES ('134', '180', '59');
INSERT INTO `item_compound` VALUES ('135', '100', '23');
INSERT INTO `item_compound` VALUES ('136', '100', '57');
INSERT INTO `item_compound` VALUES ('137', '100', '244');
INSERT INTO `item_compound` VALUES ('138', '100', '99');
INSERT INTO `item_compound` VALUES ('139', '226', '69');
INSERT INTO `item_compound` VALUES ('140', '226', '9');
INSERT INTO `item_compound` VALUES ('141', '226', '59');
INSERT INTO `item_compound` VALUES ('142', '176', '52');
INSERT INTO `item_compound` VALUES ('143', '176', '37');
INSERT INTO `item_compound` VALUES ('144', '166', '8');
INSERT INTO `item_compound` VALUES ('145', '166', '8');
INSERT INTO `item_compound` VALUES ('146', '166', '165');
INSERT INTO `item_compound` VALUES ('147', '69', '56');
INSERT INTO `item_compound` VALUES ('148', '69', '57');
INSERT INTO `item_compound` VALUES ('149', '185', '28');
INSERT INTO `item_compound` VALUES ('150', '185', '73');
INSERT INTO `item_compound` VALUES ('151', '185', '244');
INSERT INTO `item_compound` VALUES ('152', '185', '184');
INSERT INTO `item_compound` VALUES ('153', '206', '23');
INSERT INTO `item_compound` VALUES ('154', '206', '73');
INSERT INTO `item_compound` VALUES ('155', '206', '73');
INSERT INTO `item_compound` VALUES ('156', '206', '205');
INSERT INTO `item_compound` VALUES ('157', '119', '9');
INSERT INTO `item_compound` VALUES ('158', '119', '58');
INSERT INTO `item_compound` VALUES ('159', '119', '118');
INSERT INTO `item_compound` VALUES ('160', '137', '54');
INSERT INTO `item_compound` VALUES ('161', '137', '136');
INSERT INTO `item_compound` VALUES ('162', '174', '22');
INSERT INTO `item_compound` VALUES ('163', '174', '22');
INSERT INTO `item_compound` VALUES ('164', '174', '19');
INSERT INTO `item_compound` VALUES ('165', '174', '173');
INSERT INTO `item_compound` VALUES ('166', '65', '13');
INSERT INTO `item_compound` VALUES ('167', '65', '64');
INSERT INTO `item_compound` VALUES ('168', '81', '94');
INSERT INTO `item_compound` VALUES ('169', '81', '88');
INSERT INTO `item_compound` VALUES ('170', '81', '26');
INSERT INTO `item_compound` VALUES ('171', '98', '67');
INSERT INTO `item_compound` VALUES ('172', '98', '67');
INSERT INTO `item_compound` VALUES ('173', '98', '97');
INSERT INTO `item_compound` VALUES ('174', '263', '75');
INSERT INTO `item_compound` VALUES ('175', '263', '102');
INSERT INTO `item_compound` VALUES ('176', '263', '236');
INSERT INTO `item_compound` VALUES ('177', '141', '149');
INSERT INTO `item_compound` VALUES ('178', '141', '51');
INSERT INTO `item_compound` VALUES ('179', '141', '140');
INSERT INTO `item_compound` VALUES ('180', '210', '162');
INSERT INTO `item_compound` VALUES ('181', '210', '32');
INSERT INTO `item_compound` VALUES ('182', '48', '29');
INSERT INTO `item_compound` VALUES ('183', '48', '47');
INSERT INTO `item_compound` VALUES ('184', '79', '94');
INSERT INTO `item_compound` VALUES ('185', '79', '86');
INSERT INTO `item_compound` VALUES ('186', '79', '78');
INSERT INTO `item_compound` VALUES ('187', '108', '60');
INSERT INTO `item_compound` VALUES ('188', '108', '23');
INSERT INTO `item_compound` VALUES ('189', '108', '21');
INSERT INTO `item_compound` VALUES ('190', '108', '22');
INSERT INTO `item_compound` VALUES ('191', '123', '24');
INSERT INTO `item_compound` VALUES ('192', '123', '69');
INSERT INTO `item_compound` VALUES ('193', '123', '122');
INSERT INTO `item_compound` VALUES ('194', '139', '52');
INSERT INTO `item_compound` VALUES ('195', '139', '32');
INSERT INTO `item_compound` VALUES ('196', '139', '10');
INSERT INTO `item_compound` VALUES ('197', '168', '8');
INSERT INTO `item_compound` VALUES ('198', '168', '8');
INSERT INTO `item_compound` VALUES ('199', '168', '240');
INSERT INTO `item_compound` VALUES ('200', '247', '55');
INSERT INTO `item_compound` VALUES ('201', '247', '55');
INSERT INTO `item_compound` VALUES ('202', '267', '92');
INSERT INTO `item_compound` VALUES ('203', '267', '61');
INSERT INTO `item_compound` VALUES ('204', '267', '244');
INSERT INTO `item_compound` VALUES ('205', '267', '266');
INSERT INTO `item_compound` VALUES ('206', '255', '6');
INSERT INTO `item_compound` VALUES ('207', '255', '54');
INSERT INTO `item_compound` VALUES ('208', '121', '69');
INSERT INTO `item_compound` VALUES ('209', '121', '129');
INSERT INTO `item_compound` VALUES ('210', '249', '152');
INSERT INTO `item_compound` VALUES ('211', '249', '24');
INSERT INTO `item_compound` VALUES ('212', '249', '248');
INSERT INTO `item_compound` VALUES ('213', '154', '170');
INSERT INTO `item_compound` VALUES ('214', '154', '162');
INSERT INTO `item_compound` VALUES ('215', '90', '131');
INSERT INTO `item_compound` VALUES ('216', '90', '94');
INSERT INTO `item_compound` VALUES ('217', '90', '89');
INSERT INTO `item_compound` VALUES ('218', '110', '69');
INSERT INTO `item_compound` VALUES ('219', '110', '69');
INSERT INTO `item_compound` VALUES ('220', '110', '109');
INSERT INTO `item_compound` VALUES ('221', '147', '170');
INSERT INTO `item_compound` VALUES ('222', '147', '24');
INSERT INTO `item_compound` VALUES ('223', '147', '146');
INSERT INTO `item_compound` VALUES ('224', '133', '54');
INSERT INTO `item_compound` VALUES ('225', '133', '51');
INSERT INTO `item_compound` VALUES ('226', '160', '24');
INSERT INTO `item_compound` VALUES ('227', '160', '24');
INSERT INTO `item_compound` VALUES ('228', '160', '60');
INSERT INTO `item_compound` VALUES ('229', '231', '79');
INSERT INTO `item_compound` VALUES ('230', '231', '180');
INSERT INTO `item_compound` VALUES ('231', '231', '230');
INSERT INTO `item_compound` VALUES ('232', '96', '58');
INSERT INTO `item_compound` VALUES ('233', '96', '24');
INSERT INTO `item_compound` VALUES ('234', '96', '57');
INSERT INTO `item_compound` VALUES ('235', '114', '53');
INSERT INTO `item_compound` VALUES ('236', '114', '61');
INSERT INTO `item_compound` VALUES ('237', '114', '61');
INSERT INTO `item_compound` VALUES ('238', '208', '143');
INSERT INTO `item_compound` VALUES ('239', '208', '125');
INSERT INTO `item_compound` VALUES ('240', '208', '207');
INSERT INTO `item_compound` VALUES ('241', '156', '26');
INSERT INTO `item_compound` VALUES ('242', '156', '5');
INSERT INTO `item_compound` VALUES ('243', '156', '53');
INSERT INTO `item_compound` VALUES ('244', '235', '58');
INSERT INTO `item_compound` VALUES ('245', '235', '129');
INSERT INTO `item_compound` VALUES ('246', '112', '9');
INSERT INTO `item_compound` VALUES ('247', '112', '55');
INSERT INTO `item_compound` VALUES ('248', '112', '4');
INSERT INTO `item_compound` VALUES ('249', '112', '111');
INSERT INTO `item_compound` VALUES ('250', '250', '98');
INSERT INTO `item_compound` VALUES ('251', '250', '149');
