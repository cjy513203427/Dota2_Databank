/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:26:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ct_resource
-- ----------------------------
DROP TABLE IF EXISTS `ct_resource`;
CREATE TABLE `ct_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL COMMENT '类型 ：menu|button',
  `icon` varchar(50) DEFAULT NULL COMMENT '资源图标',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父资源',
  `permission` varchar(100) NOT NULL DEFAULT '' COMMENT '权限:add,update',
  `url` varchar(50) NOT NULL DEFAULT '' COMMENT '资源链接地址',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0：无效，1：有效',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ct_resource
-- ----------------------------
INSERT INTO `ct_resource` VALUES ('2', '系统设置', 'menu', 'x-fa fa-gear', '0', '', '', '1', '2016-08-29 11:52:42', '2016-08-29 11:52:52');
INSERT INTO `ct_resource` VALUES ('3', '用户添加', 'button', '', '5', 'user:create', '', '1', '2016-08-29 11:52:45', '2016-08-29 11:52:50');
INSERT INTO `ct_resource` VALUES ('4', '用户禁用', 'button', '', '5', 'user:disable', '', '1', '2016-08-29 11:52:47', '2016-08-29 11:52:55');
INSERT INTO `ct_resource` VALUES ('5', '用户管理', 'menu', 'x-fa fa-user', '2', '', 'user', '1', null, '2016-09-07 15:40:29');
INSERT INTO `ct_resource` VALUES ('6', '角色管理', 'menu', 'x-fa fa-bookmark', '2', '', 'role', '1', null, '2016-09-07 15:37:23');
INSERT INTO `ct_resource` VALUES ('7', '账号管理', 'menu', 'x-fa fa-user', '0', '', 'account', '1', '2016-09-09 15:28:53', '2016-09-09 15:28:53');
INSERT INTO `ct_resource` VALUES ('8', '权限管理', 'menu', 'x-fa fa-reorder', '2', '', 'resource', '1', '2016-09-09 15:33:55', '2016-09-09 15:33:55');
INSERT INTO `ct_resource` VALUES ('52', '2', 'button', null, '51', '2adf', '', '1', '2016-09-29 15:08:23', '2016-09-29 15:08:23');
INSERT INTO `ct_resource` VALUES ('56', '用户修改', 'button', null, '5', 'user:update', '', '1', '2017-02-17 10:37:40', '2017-02-17 10:37:40');
INSERT INTO `ct_resource` VALUES ('57', '用户查询', 'button', null, '5', 'user:list', '', '1', '2017-02-17 10:40:07', '2017-02-17 10:40:07');
INSERT INTO `ct_resource` VALUES ('58', '重置密码', 'button', null, '5', 'user:resetpassword', '', '1', '2017-02-17 11:00:43', '2017-02-17 11:00:43');
INSERT INTO `ct_resource` VALUES ('61', '查看客户', 'button', null, '60', 'customer:list', '', '1', '2017-02-17 14:22:03', '2017-02-17 14:22:03');
INSERT INTO `ct_resource` VALUES ('62', '添加客户', 'button', null, '60', 'customer:create', '', '1', '2017-02-17 14:22:34', '2017-02-17 14:22:34');
INSERT INTO `ct_resource` VALUES ('63', '修改客户', 'button', null, '60', 'customer:update', '', '1', '2017-02-17 14:22:57', '2017-02-17 14:22:57');
INSERT INTO `ct_resource` VALUES ('64', '删除客户', 'button', null, '60', 'customer:delete', '', '1', '2017-02-20 23:53:13', '2017-02-20 23:53:13');
INSERT INTO `ct_resource` VALUES ('68', '客服操作', 'button', null, '1', 'CustomerService', '', '1', '2017-02-24 15:00:51', '2017-02-24 15:00:51');
INSERT INTO `ct_resource` VALUES ('69', '表现师操作', 'button', null, '1', 'PlottingUser', '', '1', '2017-02-24 15:01:32', '2017-02-24 15:01:32');
INSERT INTO `ct_resource` VALUES ('70', '订单统计', 'button', null, '1', 'order:statistics', '', '1', '2017-02-24 20:36:22', '2017-02-24 20:36:22');
INSERT INTO `ct_resource` VALUES ('71', '订单查询', 'button', null, '1', 'order:list', '', '1', '2017-02-24 20:36:45', '2017-02-24 20:36:45');
INSERT INTO `ct_resource` VALUES ('72', '订单详情', 'button', null, '1', 'order:getInfo', '', '1', '2017-02-26 17:07:58', '2017-02-26 17:07:58');
INSERT INTO `ct_resource` VALUES ('74', '字典查询', 'button', null, '73', 'dictionary:list', '', '1', '2017-03-02 14:39:30', '2017-03-02 14:39:30');
INSERT INTO `ct_resource` VALUES ('75', '字典添加', 'button', null, '73', 'dictionary:create', '', '1', '2017-03-02 14:39:48', '2017-03-02 14:39:48');
INSERT INTO `ct_resource` VALUES ('76', '字典修改', 'button', null, '73', 'dictionary:update', '', '1', '2017-03-02 14:40:08', '2017-03-02 14:40:08');
INSERT INTO `ct_resource` VALUES ('77', '订单支付', 'button', null, '1', 'order:pay', '', '1', '2017-03-04 14:12:29', '2017-03-04 14:12:29');
INSERT INTO `ct_resource` VALUES ('78', '订单操作历史', 'button', null, '1', 'order:historyList', '', '1', '2017-03-04 22:16:14', '2017-03-04 22:16:14');
INSERT INTO `ct_resource` VALUES ('79', '订单删除', 'button', null, '1', 'order:delete', '', '1', '2017-03-04 23:00:15', '2017-03-04 23:00:15');
INSERT INTO `ct_resource` VALUES ('80', '订单修改', 'button', null, '1', 'order:update', '', '1', '2017-03-05 14:32:39', '2017-03-05 14:32:39');
INSERT INTO `ct_resource` VALUES ('83', '汇款查询', 'button', null, '82', 'remit:list', '', '1', '2017-03-05 15:55:28', '2017-03-05 15:55:28');
INSERT INTO `ct_resource` VALUES ('84', '汇款添加', 'button', null, '82', 'remit:create', '', '1', '2017-03-05 15:55:42', '2017-03-05 15:55:42');
INSERT INTO `ct_resource` VALUES ('85', '汇款认领', 'button', null, '82', 'remit:claim', '', '1', '2017-03-05 15:56:20', '2017-03-05 15:56:20');
INSERT INTO `ct_resource` VALUES ('86', '汇款作废', 'button', null, '82', 'remit:void', '', '1', '2017-03-05 16:40:38', '2017-03-05 16:40:38');
INSERT INTO `ct_resource` VALUES ('87', '汇款统计', 'button', null, '82', 'remit:statistics', '', '1', '2017-03-05 22:13:36', '2017-03-05 22:13:36');
INSERT INTO `ct_resource` VALUES ('89', '部门列表', 'button', null, '88', 'department:treelist', '', '1', '2017-03-06 21:59:06', '2017-03-06 21:59:06');
INSERT INTO `ct_resource` VALUES ('90', '部门添加', 'button', null, '88', 'department:insert', '', '1', '2017-03-06 21:59:25', '2017-03-06 21:59:25');
INSERT INTO `ct_resource` VALUES ('91', '部门修改', 'button', null, '88', 'department:update', '', '1', '2017-03-06 21:59:46', '2017-03-06 21:59:46');
INSERT INTO `ct_resource` VALUES ('92', '部门删除', 'button', null, '88', 'department:delete', '', '1', '2017-03-06 22:01:29', '2017-03-06 22:01:29');
INSERT INTO `ct_resource` VALUES ('93', '部门人员列表', 'button', null, '88', 'department:readUser', '', '1', '2017-03-07 13:41:43', '2017-03-07 13:41:43');
INSERT INTO `ct_resource` VALUES ('94', '部门人员删除', 'button', null, '88', 'department:deleteUser', '', '1', '2017-03-07 13:42:07', '2017-03-07 13:42:07');
INSERT INTO `ct_resource` VALUES ('95', '部门人员添加', 'button', null, '88', 'department:adduser', '', '1', '2017-03-07 19:51:41', '2017-03-07 19:51:41');
INSERT INTO `ct_resource` VALUES ('96', '部门指定领导', 'button', null, '88', 'department:updateLeader', '', '1', '2017-03-07 19:52:06', '2017-03-07 19:52:06');
INSERT INTO `ct_resource` VALUES ('97', '用户角色分配', 'button', null, '5', 'user:changeRole', '', '1', '2017-03-12 10:21:00', '2017-03-12 10:21:00');
INSERT INTO `ct_resource` VALUES ('98', '订单查看付款明细', 'button', null, '1', 'order:seePaid', '', '1', '2017-03-25 20:05:55', '2017-03-25 20:05:55');
INSERT INTO `ct_resource` VALUES ('122', '查看', 'button', null, '121', 'visitor:getVisitor', '', '1', '2017-05-08 11:08:05', '2017-05-08 11:08:05');
INSERT INTO `ct_resource` VALUES ('124', '查看', 'button', null, '123', 'picturetype:picturelist', '', '1', '2017-05-23 17:29:56', '2017-05-23 17:29:56');
INSERT INTO `ct_resource` VALUES ('126', '查看图库', 'button', null, '125', 'picture:list', '', '1', '2017-05-24 15:34:20', '2017-05-24 15:34:20');
INSERT INTO `ct_resource` VALUES ('130', '查看图库', 'button', null, '129', 'picturehandpick:list', '', '1', '2017-06-01 14:47:48', '2017-06-01 14:47:48');
INSERT INTO `ct_resource` VALUES ('131', '删除图库', 'button', null, '129', 'picturehandpick:deletePictureHandpick', '', '1', '2017-06-05 11:48:25', '2017-06-05 11:48:25');
INSERT INTO `ct_resource` VALUES ('133', '上传', 'button', null, '132', 'fileupload:upload', '', '1', '2017-07-12 10:04:01', '2017-07-12 10:04:01');
INSERT INTO `ct_resource` VALUES ('166', '查询未批准的品牌', 'button', null, '164', 'brand:queryUserBrandNotAllowed', '', '1', '2017-08-24 18:49:32', '2017-08-24 18:49:32');
INSERT INTO `ct_resource` VALUES ('167', '审批品牌申请', 'button', null, '164', 'brand:approveBrandApplication', '', '1', '2017-08-24 18:50:18', '2017-08-24 18:50:18');
INSERT INTO `ct_resource` VALUES ('169', '品牌遍历', 'button', null, '168', 'brand:queryAllBrand', '', '1', '2017-08-25 11:30:42', '2017-08-25 11:30:42');
INSERT INTO `ct_resource` VALUES ('170', '分配品牌', 'button', null, '168', 'brand:updateUserBrand', '', '1', '2017-08-25 18:50:31', '2017-08-25 18:50:31');
INSERT INTO `ct_resource` VALUES ('171', '删除品牌', 'button', null, '168', 'brand:deleteBrand', '', '1', '2017-08-28 10:30:38', '2017-08-28 10:30:38');
INSERT INTO `ct_resource` VALUES ('172', '品牌添加', 'button', null, '168', 'brand:addBrand', '', '1', '2017-08-28 11:54:01', '2017-08-28 11:54:01');
INSERT INTO `ct_resource` VALUES ('173', '品牌修改', 'button', null, '168', 'brand:modifyBrand', '', '1', '2017-08-28 14:25:05', '2017-08-28 14:25:05');
INSERT INTO `ct_resource` VALUES ('175', '商品遍历', 'button', null, '174', 'photo:queryPhoto', '', '1', '2017-11-10 09:33:51', '2017-08-28 18:46:39');
INSERT INTO `ct_resource` VALUES ('176', '商品删除', 'button', null, '174', 'photo:deletePhoto', '', '1', '2017-08-28 18:55:26', '2017-08-28 18:55:26');
INSERT INTO `ct_resource` VALUES ('178', '商品修改', 'button', null, '174', 'photo:modifyPhoto', '', '1', '2017-08-31 09:32:38', '2017-08-31 09:32:38');
INSERT INTO `ct_resource` VALUES ('179', '商品添加', 'button', null, '174', 'photo:addPhoto', '', '1', '2017-08-31 09:34:57', '2017-08-31 09:34:57');
INSERT INTO `ct_resource` VALUES ('180', 'Excel上传', 'button', null, '174', 'excellocal:uploadExcel', '', '1', '2017-09-01 14:26:12', '2017-09-01 14:26:12');
INSERT INTO `ct_resource` VALUES ('181', '商品牌修', 'button', null, '174', 'brand:modifyBrandId', '', '1', '2017-09-12 17:14:23', '2017-09-12 17:14:23');
INSERT INTO `ct_resource` VALUES ('213', '图片上传', 'button', null, '174', 'pictureserver:uploadServerPicture', '', '1', '2017-09-24 15:15:37', '2017-09-24 15:15:37');
INSERT INTO `ct_resource` VALUES ('214', 'CAD上传', 'button', null, '174', 'cadserver:uploadServerCAD', '', '1', '2017-09-24 15:16:53', '2017-09-24 15:16:53');
INSERT INTO `ct_resource` VALUES ('215', '公司配置上传', 'button', null, '174', 'configurationFileServer:uploadConfigurationFile', '', '1', '2017-09-24 15:17:55', '2017-09-24 15:17:55');
INSERT INTO `ct_resource` VALUES ('216', '封面上传', 'button', null, '174', 'coverServer:uploadCover', '', '1', '2017-09-24 15:18:43', '2017-09-24 15:18:43');
INSERT INTO `ct_resource` VALUES ('217', '商品树添加', 'button', null, '177', 'photo:insertPhotoArborescence', '', '1', '2017-09-24 15:29:51', '2017-09-24 15:29:51');
INSERT INTO `ct_resource` VALUES ('218', '商品树修改', 'button', null, '177', 'photo:updatePhotoArborescence', '', '1', '2017-09-24 15:30:04', '2017-09-24 15:30:04');
INSERT INTO `ct_resource` VALUES ('222', '查询', 'button', null, '221', 'photo:queryHistoryPhoto', '', '1', '2017-10-26 10:54:28', '2017-10-26 10:54:28');
INSERT INTO `ct_resource` VALUES ('223', '刀塔', 'menu', 'x-fa fa-steam', '0', '', '', '1', '2017-12-27 11:54:53', '2017-12-27 11:54:21');
INSERT INTO `ct_resource` VALUES ('224', '英雄管理', 'menu', 'x-fa fa-child', '223', '', 'hero', '1', '2017-12-27 11:58:00', '2017-12-27 11:57:32');
INSERT INTO `ct_resource` VALUES ('226', '物品管理', 'menu', 'x-fa fa-ge', '223', '', 'item', '1', '2018-01-06 15:04:11', '2018-01-06 15:04:11');
INSERT INTO `ct_resource` VALUES ('227', '天赋管理', 'menu', 'x-fa fa-gift', '223', '', 'talent', '1', '2018-01-27 22:12:27', '2018-01-27 22:11:49');
INSERT INTO `ct_resource` VALUES ('228', '战绩信息', 'menu', ' x-fa fa-steam-square', '223', '', 'matchHistory', '1', '2018-04-25 11:47:48', '2018-04-19 10:04:53');
INSERT INTO `ct_resource` VALUES ('229', '英雄查询', 'button', null, '224', 'hero:queryHero', '', '1', '2018-04-24 18:58:34', '2018-04-24 18:58:34');
INSERT INTO `ct_resource` VALUES ('230', '英雄修改', 'button', null, '224', 'hero:modifyHero', '', '1', '2018-04-24 18:58:50', '2018-04-24 18:58:50');
INSERT INTO `ct_resource` VALUES ('231', '物品查询', 'button', null, '226', 'item:queryItem', '', '1', '2018-04-25 10:52:48', '2018-04-25 10:52:48');
INSERT INTO `ct_resource` VALUES ('232', '天赋查询', 'button', null, '227', 'talent:queryTalent', '', '1', '2018-04-25 10:53:42', '2018-04-25 10:53:42');
INSERT INTO `ct_resource` VALUES ('233', '比赛历史查询', 'button', null, '228', 'match:getMatchHistory', '', '1', '2018-04-25 10:54:31', '2018-04-25 10:54:31');
INSERT INTO `ct_resource` VALUES ('234', '比赛详情查询', 'button', null, '228', 'match:getMatchDetails', '', '1', '2018-04-25 10:54:41', '2018-04-25 10:54:41');
INSERT INTO `ct_resource` VALUES ('235', '比赛详情玩家查询', 'button', null, '228', 'match:getMatchDetailPlayers', '', '1', '2018-04-25 10:55:02', '2018-04-25 10:55:02');
INSERT INTO `ct_resource` VALUES ('236', '物品模拟', 'menu', ' x-fa fa-video-camera', '223', '', 'itemSimulation', '1', '2018-04-25 11:16:26', '2018-04-25 11:16:26');
INSERT INTO `ct_resource` VALUES ('237', '天赋模拟', 'menu', 'x-fa fa-file-photo-o', '223', '', 'talentSimulation', '1', '2018-04-25 11:17:08', '2018-04-25 11:17:08');
DROP TRIGGER IF EXISTS `default_datetime_ct_resource`;
DELIMITER ;;
CREATE TRIGGER `default_datetime_ct_resource` BEFORE INSERT ON `ct_resource` FOR EACH ROW if new.create_time = '0000-00-00 00:00:00' then
set new.create_time = now();
end if
;;
DELIMITER ;
