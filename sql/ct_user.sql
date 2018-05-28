/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:26:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ct_user
-- ----------------------------
DROP TABLE IF EXISTS `ct_user`;
CREATE TABLE `ct_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `realname` varchar(30) DEFAULT NULL COMMENT '真实姓名',
  `workno` varchar(30) DEFAULT NULL COMMENT '用户编号',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `sex` tinyint(1) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `qq` varchar(50) DEFAULT NULL COMMENT '邮箱地址',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0：无效，1：有效',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` datetime DEFAULT '0000-00-00 00:00:00',
  `description` varchar(500) DEFAULT NULL COMMENT '用户职能描述',
  `user_type` tinyint(1) DEFAULT NULL COMMENT '1.管理员 2.一级管理员 3.设计师',
  `id_number` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `id_path` varchar(255) DEFAULT NULL COMMENT '身份证复印件图片存放路径',
  `entryform_path` varchar(255) DEFAULT NULL COMMENT '入职登记表存放路径',
  `modify_password` tinyint(1) DEFAULT '1' COMMENT '是否修改过密码 0否 1是',
  `office_login` tinyint(1) DEFAULT '1' COMMENT '0,只能在办公室登录 1允许外地登录',
  `openid` varchar(100) DEFAULT NULL,
  `dingid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `INDEX_USER_USERNAME` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ct_user
-- ----------------------------
INSERT INTO `ct_user` VALUES ('1', 'admin', '刀塔管理员', '001', '78df65eb16dbb86a1383eaffad6480f2', '1', '13022222288', '222222', '1', '2018-04-27 23:05:49', '2016-08-29 14:53:33', '管理员用户：拥有删除添加用户的权限', '1', '32111113321321321321', 'User/Head_portrait/86879150A4F4D72ADFA745D0C77C3E07.jpg', null, '1', '1', null, '183665181218848');
INSERT INTO `ct_user` VALUES ('74', 'ceshi', '666', '001', 'dbbea771ee6f39222d7ca17a99701cff', '1', '13699969998', '123456', '1', '2017-10-18 20:43:17', '2017-09-22 10:06:49', '', '1', '122333333333333', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('75', 'ceshi2', '勺祥', '111', '173a4587fdad13f69ea0861b3b59737b', '1', '18895356321', '63420895', '1', '2017-10-18 20:43:17', '2017-09-22 10:16:49', '', '1', '34030215684236456', 'Personnel/ID_Card/6ACDF52DDC844C5703FF2DF37FBEBA18.png', 'Personnel/EntryForm/A92A98D6916934ECCB27E079F801A968.png', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('76', 'ceshi3', '阿豪', '121123', 'dafe45f679aa302c7de38bf1af30b6e2', '2', '18895352062', '634208959', '1', '2017-09-22 11:45:04', '2017-09-22 10:17:37', '', '3', '340302199601256587', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('77', '123', '555', '1', 'c323384aaf4a9a15c27565099ebd7144', '1', '5555', '123456', '1', '2017-09-25 15:41:37', '2017-09-22 14:28:29', '', '3', '340302199510120212', null, null, '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('78', '8888', '555', '1', 'a066903ecef5de2fb0864efb4f0b5e1a', '1', '15151515111', '123456', '1', '2017-10-06 15:46:37', '2017-09-25 15:41:54', '', '3', '362828199508111100', null, null, '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('79', 'q12', '设计师q123', '1234', '72b3195f4c9bdc31e79f017e5671df20', '1', '13669938997', '12345678', '1', '2017-10-16 09:56:38', '2017-09-27 11:35:58', '', '3', '365664996655897', null, null, '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('85', '1243', 'fdsaf', '34234', '4282bb290ff2d25adbd84c2df0feb616', '1', '18895358020', '566565', '0', '2017-10-30 14:34:04', '2017-10-06 16:05:12', '', null, '340302199510120212', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('86', 'fake', 'wewe', '58748578', '00b2aa12fd3160cc1a85420acdcdbf94', '2', '18895358096', '6565656', '1', '2017-10-19 11:07:54', '2017-10-07 09:47:09', '', null, '34030219979879121', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('87', 'xhgss', '小狗1', '1233', '84d1649dcc2e76cd86c71fba1076d461', '1', '18895358020', '123244', '1', '2017-10-16 09:58:23', '2017-10-16 09:57:49', '', null, '340302199510120212', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('88', 'ceshi4', '车呢', '111232323', 'f7813d18163d3ecfb268b7d131df5f43', '1', '13865884444', '928822', '1', '2017-10-30 14:34:09', '2017-10-18 17:57:52', '', null, '340302199510120213', '', '', '1', '0', null, null);
INSERT INTO `ct_user` VALUES ('89', 'shkdj', '上海肯德基', '11111', '5ec45e40653bc8f140a23848e0443378', '1', '18895358020', '1111111', '1', '2017-10-20 16:40:14', '2017-10-19 14:43:55', '', null, '340302199510120212', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('90', 'kf99012', 'cjy', '11111', '31feae7035af5c3d624a1ad3006b0672', '1', '18895358020', '656565', '1', '2017-10-24 11:51:15', '2017-10-24 11:51:15', '', null, '340302199510120212', '', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('91', 'ceshi5', '啛啛喳喳', '5454', 'a6a7cac900fed2d9c8e1fe5ebaed6ab6', '2', '18895358020', '634208959', '1', '2018-04-27 17:54:03', '2018-04-27 17:54:03', '', null, '3403021995101202125', 'Personnel/ID_Card/21CC87C78CDC564CDAD14C11E3085C0E.png', '', '1', '1', null, null);
INSERT INTO `ct_user` VALUES ('92', 'ceshi6', '是兄弟就来砍我', null, 'b70d62be3ddd2e9eedc1622703b802e8', null, '18895358020', '634208959', '0', '2018-05-04 09:40:44', '2018-04-27 22:27:53', '是', null, null, 'User/Head_portrait/077DE5105B93C31A4B060DA22C039465.jpg', null, '1', '1', null, null);
DROP TRIGGER IF EXISTS `default_datetime_ct_user`;
DELIMITER ;;
CREATE TRIGGER `default_datetime_ct_user` BEFORE INSERT ON `ct_user` FOR EACH ROW if new.create_time = '0000-00-00 00:00:00' then
set new.create_time = now();
end if
;;
DELIMITER ;
