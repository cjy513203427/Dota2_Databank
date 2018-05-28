/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:27:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `secret_shop` tinyint(4) DEFAULT NULL COMMENT '0否，1是',
  `side_shop` tinyint(4) DEFAULT NULL COMMENT '0否，1是',
  `recipe` tinyint(4) DEFAULT NULL COMMENT '0否，1是',
  `upgrated_item` tinyint(4) DEFAULT '0' COMMENT '升级物品，0否，1是',
  `item_path` varchar(255) DEFAULT NULL,
  `localized_name` varchar(255) DEFAULT NULL,
  `chinese_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('1', 'item_blink', '2250', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/blink_lg.png?3', 'Blink Dagger', '闪烁匕首');
INSERT INTO `item` VALUES ('2', 'item_blades_of_attack', '420', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/blades_of_attack_lg.png?3', 'Blades of Attack', '攻击之爪');
INSERT INTO `item` VALUES ('3', 'item_broadsword', '1200', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/broadsword_lg.png?3', 'Broadsword', '阔剑');
INSERT INTO `item` VALUES ('4', 'item_chainmail', '550', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/chainmail_lg.png?3', 'Chainmail', '锁子甲');
INSERT INTO `item` VALUES ('5', 'item_claymore', '1400', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/claymore_lg.png?3', 'Claymore', '大剑');
INSERT INTO `item` VALUES ('6', 'item_helm_of_iron_will', '900', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/helm_of_iron_will_lg.png?3', 'Helm of Iron Will', '铁意头盔');
INSERT INTO `item` VALUES ('7', 'item_javelin', '1100', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/javelin_lg.png?3', 'Javelin', '标枪');
INSERT INTO `item` VALUES ('8', 'item_mithril_hammer', '1600', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/mithril_hammer_lg.png?3', 'Mithril Hammer', '秘银锤');
INSERT INTO `item` VALUES ('9', 'item_platemail', '1400', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/platemail_lg.png?3', 'Platemail', '板甲');
INSERT INTO `item` VALUES ('10', 'item_quarterstaff', '875', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/quarterstaff_lg.png?3', 'Quarterstaff', '短棍');
INSERT INTO `item` VALUES ('11', 'item_quelling_blade', '200', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/quelling_blade_lg.png?3', 'Quelling Blade', '压制之刃');
INSERT INTO `item` VALUES ('12', 'item_ring_of_protection', '175', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ring_of_protection_lg.png?3', 'Ring of Protection', '守护指环');
INSERT INTO `item` VALUES ('13', 'item_gauntlets', '135', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/gauntlets_lg.png?3', 'Gauntlets of Strength', '力量手套');
INSERT INTO `item` VALUES ('14', 'item_slippers', '135', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/slippers_lg.png?3', 'Slippers of Agility', '敏捷便鞋');
INSERT INTO `item` VALUES ('15', 'item_mantle', '135', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/mantle_lg.png?3', 'Mantle of Intelligence', '智力斗篷');
INSERT INTO `item` VALUES ('16', 'item_branches', '50', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/branches_lg.png?3', 'Iron Branch', '铁树枝干');
INSERT INTO `item` VALUES ('17', 'item_belt_of_strength', '450', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/belt_of_strength_lg.png?3', 'Belt of Strength', '力量腰带');
INSERT INTO `item` VALUES ('18', 'item_boots_of_elves', '450', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/boots_of_elves_lg.png?3', 'Band of Elvenskin', '精灵布带');
INSERT INTO `item` VALUES ('19', 'item_robe', '450', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/robe_lg.png?3', 'Robe of the Magi', '法师长袍');
INSERT INTO `item` VALUES ('20', 'item_circlet', '165', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/circlet_lg.png?3', 'Circlet', '圆环');
INSERT INTO `item` VALUES ('21', 'item_ogre_axe', '1000', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ogre_axe_lg.png?3', 'Ogre Axe', '食人魔之斧');
INSERT INTO `item` VALUES ('22', 'item_blade_of_alacrity', '1000', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/blade_of_alacrity_lg.png?3', 'Blade of Alacrity', '欢欣之刃');
INSERT INTO `item` VALUES ('23', 'item_staff_of_wizardry', '1000', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/staff_of_wizardry_lg.png?3', 'Staff of Wizardry', '魔力法杖');
INSERT INTO `item` VALUES ('24', 'item_ultimate_orb', '2150', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ultimate_orb_lg.png?3', 'Ultimate Orb', '极限法球');
INSERT INTO `item` VALUES ('25', 'item_gloves', '500', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/gloves_lg.png?3', 'Gloves of Haste', '加速手套');
INSERT INTO `item` VALUES ('26', 'item_lifesteal', '1100', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/lifesteal_lg.png?3', 'Morbid Mask', '吸血面具');
INSERT INTO `item` VALUES ('27', 'item_ring_of_regen', '300', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ring_of_regen_lg.png?3', 'Ring of Regen', '回复戒指');
INSERT INTO `item` VALUES ('28', 'item_sobi_mask', '325', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/sobi_mask_lg.png?3', 'Sage\'s Mask', '贤者面罩');
INSERT INTO `item` VALUES ('29', 'item_boots', '400', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/boots_lg.png?3', 'Boots of Speed', '速度之靴');
INSERT INTO `item` VALUES ('30', 'item_gem', '900', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/gem_lg.png?3', 'Gem of True Sight', '真视宝石');
INSERT INTO `item` VALUES ('31', 'item_cloak', '550', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/cloak_lg.png?3', 'Cloak', '抗魔斗篷');
INSERT INTO `item` VALUES ('32', 'item_talisman_of_evasion', '1450', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/talisman_of_evasion_lg.png?3', 'Talisman of Evasion', '闪避护符');
INSERT INTO `item` VALUES ('33', 'item_cheese', '1000', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/cheese.png', 'Cheese', '奶酪');
INSERT INTO `item` VALUES ('34', 'item_magic_stick', '200', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/magic_stick_lg.png?3', 'Magic Stick', '魔棒');
INSERT INTO `item` VALUES ('35', 'item_recipe_magic_wand', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Magic Wand', null);
INSERT INTO `item` VALUES ('36', 'item_magic_wand', '400', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/magic_wand_lg.png?3', 'Magic Wand', '魔杖');
INSERT INTO `item` VALUES ('37', 'item_ghost', '1500', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ghost_lg.png?3', 'Ghost Scepter', '幽魂权杖');
INSERT INTO `item` VALUES ('38', 'item_clarity', '50', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/clarity_lg.png?3', 'Clarity', '净化药水');
INSERT INTO `item` VALUES ('39', 'item_flask', '110', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/flask_lg.png?3', 'Healing Salve', '治疗药膏');
INSERT INTO `item` VALUES ('40', 'item_dust', '180', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/dust_lg.png?3', 'Dust of Appearance', '显影之尘');
INSERT INTO `item` VALUES ('41', 'item_bottle', '650', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/bottle_lg.png?3', 'Bottle', '魔瓶');
INSERT INTO `item` VALUES ('42', 'item_ward_observer', '80', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ward_observer_lg.png?3', 'Observer Ward', '侦查守卫');
INSERT INTO `item` VALUES ('43', 'item_ward_sentry', '100', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ward_sentry_lg.png?3', 'Sentry Ward', '岗哨守卫');
INSERT INTO `item` VALUES ('44', 'item_tango', '150', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/tango_lg.png?3', 'Tango', '树之祭祀');
INSERT INTO `item` VALUES ('45', 'item_courier', '200', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/courier_lg.png?3', 'Animal Courier', '动物信使');
INSERT INTO `item` VALUES ('46', 'item_tpscroll', '50', '0', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/tpscroll_lg.png?3', 'Town Portal Scroll', '回城卷轴');
INSERT INTO `item` VALUES ('47', 'item_recipe_travel_boots', '2000', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Boots of Travel', '远行鞋卷轴');
INSERT INTO `item` VALUES ('48', 'item_travel_boots', '2400', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/travel_boots_lg.png?3', 'Boots of Travel', '远行鞋');
INSERT INTO `item` VALUES ('49', 'item_recipe_phase_boots', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Phase Boots', null);
INSERT INTO `item` VALUES ('50', 'item_phase_boots', '1240', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/phase_boots_lg.png?3', 'Phase Boots', '相位鞋');
INSERT INTO `item` VALUES ('51', 'item_demon_edge', '2200', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/demon_edge_lg.png?3', 'Demon Edge', '恶魔刀锋');
INSERT INTO `item` VALUES ('52', 'item_eagle', '3200', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/eagle_lg.png?3', 'Eaglesong', '鹰歌弓');
INSERT INTO `item` VALUES ('53', 'item_reaver', '3000', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/reaver_lg.png?3', 'Reaver', '掠夺者之斧');
INSERT INTO `item` VALUES ('54', 'item_relic', '3800', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/relic_lg.png?3', 'Sacred Relic', '圣者遗物');
INSERT INTO `item` VALUES ('55', 'item_hyperstone', '2000', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/hyperstone_lg.png?3', 'Hyperstone', '振奋宝石');
INSERT INTO `item` VALUES ('56', 'item_ring_of_health', '850', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/ring_of_health_lg.png?3', 'Ring of Health', '治疗指环');
INSERT INTO `item` VALUES ('57', 'item_void_stone', '850', '1', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/void_stone_lg.png?3', 'Void Stone', '虚无宝石');
INSERT INTO `item` VALUES ('58', 'item_mystic_staff', '2700', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/mystic_staff_lg.png?3', 'Mystic Staff', '神秘法杖');
INSERT INTO `item` VALUES ('59', 'item_energy_booster', '900', '1', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/energy_booster_lg.png?3', 'Energy Booster', '能量之球');
INSERT INTO `item` VALUES ('60', 'item_point_booster', '1200', '1', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/point_booster_lg.png?3', 'Point Booster', '精气之球');
INSERT INTO `item` VALUES ('61', 'item_vitality_booster', '1100', '1', '1', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/vitality_booster_lg.png?3', 'Vitality Booster', '活力之球');
INSERT INTO `item` VALUES ('62', 'item_recipe_power_treads', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Power Treads', null);
INSERT INTO `item` VALUES ('63', 'item_power_treads', '1350', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/power_treads_lg.png?3', 'Power Treads', '动力鞋');
INSERT INTO `item` VALUES ('64', 'item_recipe_hand_of_midas', '1650', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Hand of Midas', '迈达斯之手卷轴');
INSERT INTO `item` VALUES ('65', 'item_hand_of_midas', '2150', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/hand_of_midas_lg.png?3', 'Hand of Midas', '迈达斯之手');
INSERT INTO `item` VALUES ('66', 'item_recipe_oblivion_staff', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Oblivion Staff', null);
INSERT INTO `item` VALUES ('67', 'item_oblivion_staff', '1650', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/oblivion_staff_lg.png?3', 'Oblivion Staff', '空明杖');
INSERT INTO `item` VALUES ('68', 'item_recipe_pers', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Perseverance', null);
INSERT INTO `item` VALUES ('69', 'item_pers', '1700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/pers_lg.png?3', 'Perseverance', '坚韧球');
INSERT INTO `item` VALUES ('70', 'item_recipe_poor_mans_shield', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Poor Man\'s Shield', null);
INSERT INTO `item` VALUES ('71', 'item_poor_mans_shield', '0', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/poor_mans_shield_lg.png?3', 'Poor Man\'s Shield', null);
INSERT INTO `item` VALUES ('72', 'item_recipe_bracer', '165', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Bracer', '护腕卷轴');
INSERT INTO `item` VALUES ('73', 'item_bracer', '465', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/bracer_lg.png?3', 'Bracer', '护腕');
INSERT INTO `item` VALUES ('74', 'item_recipe_wraith_band', '165', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Wraith Band', '怨灵系带卷轴');
INSERT INTO `item` VALUES ('75', 'item_wraith_band', '465', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/wraith_band_lg.png?3', 'Wraith Band', '怨灵系带');
INSERT INTO `item` VALUES ('76', 'item_recipe_null_talisman', '165', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Null Talisman', '空灵挂件卷轴');
INSERT INTO `item` VALUES ('77', 'item_null_talisman', '465', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/null_talisman_lg.png?3', 'Null Talisman', '空灵挂件');
INSERT INTO `item` VALUES ('78', 'item_recipe_mekansm', '900', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Mekansm', '梅肯斯姆卷轴');
INSERT INTO `item` VALUES ('79', 'item_mekansm', '2350', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/mekansm_lg.png?3', 'Mekansm', '梅肯斯姆');
INSERT INTO `item` VALUES ('80', 'item_recipe_vladmir', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Vladmir\'s Offering', null);
INSERT INTO `item` VALUES ('81', 'item_vladmir', '2250', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/vladmir_lg.png?3', 'Vladmir\'s Offering', '弗拉迪米尔的祭品');
INSERT INTO `item` VALUES ('85', 'item_recipe_buckler', '200', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Buckler', '玄冥盾牌卷轴');
INSERT INTO `item` VALUES ('86', 'item_buckler', '800', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/buckler_lg.png?3', 'Buckler', '玄冥盾牌');
INSERT INTO `item` VALUES ('87', 'item_recipe_ring_of_basilius', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Ring of Basilius', null);
INSERT INTO `item` VALUES ('88', 'item_ring_of_basilius', '500', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/ring_of_basilius_lg.png?3', 'Ring of Basilius', '王者之戒');
INSERT INTO `item` VALUES ('89', 'item_recipe_pipe', '800', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Pipe of Insight', '洞察烟斗卷轴');
INSERT INTO `item` VALUES ('90', 'item_pipe', '3150', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/pipe_lg.png?3', 'Pipe of Insight', '洞察烟斗');
INSERT INTO `item` VALUES ('91', 'item_recipe_urn_of_shadows', '310', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Urn of Shadows', '影之灵龛卷轴');
INSERT INTO `item` VALUES ('92', 'item_urn_of_shadows', '875', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/urn_of_shadows_lg.png?3', 'Urn of Shadows', '影之灵龛');
INSERT INTO `item` VALUES ('93', 'item_recipe_headdress', '300', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Headdress', '恢复头巾卷轴');
INSERT INTO `item` VALUES ('94', 'item_headdress', '650', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/headdress_lg.png?3', 'Headdress', '恢复头巾');
INSERT INTO `item` VALUES ('95', 'item_recipe_sheepstick', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Scythe of Vyse', null);
INSERT INTO `item` VALUES ('96', 'item_sheepstick', '5700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/sheepstick_lg.png?3', 'Scythe of Vyse', '邪恶镰刀');
INSERT INTO `item` VALUES ('97', 'item_recipe_orchid', '775', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Orchid Malevolence', '紫苑卷轴');
INSERT INTO `item` VALUES ('98', 'item_orchid', '4075', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/orchid_lg.png?3', 'Orchid Malevolence', '紫苑');
INSERT INTO `item` VALUES ('99', 'item_recipe_cyclone', '650', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Eul\'s Scepter of Divinity', 'Eul的神圣法杖卷轴');
INSERT INTO `item` VALUES ('100', 'item_cyclone', '2750', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/cyclone_lg.png?3', 'Eul\'s Scepter of Divinity', 'Eul的神圣法杖');
INSERT INTO `item` VALUES ('101', 'item_recipe_force_staff', '400', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Force Staff', '原力法杖卷轴');
INSERT INTO `item` VALUES ('102', 'item_force_staff', '2250', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/force_staff_lg.png?3', 'Force Staff', '原力法杖');
INSERT INTO `item` VALUES ('103', 'item_recipe_dagon', '1250', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Dagon', '达贡之神力卷轴');
INSERT INTO `item` VALUES ('104', 'item_dagon', '2715', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/dagon_lg.png?3', 'Dagon', '达贡之神力');
INSERT INTO `item` VALUES ('105', 'item_recipe_necronomicon', '1300', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Necronomicon', '死灵书卷轴');
INSERT INTO `item` VALUES ('106', 'item_necronomicon', '2400', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/necronomicon_lg.png?3', 'Necronomicon', '死灵书');
INSERT INTO `item` VALUES ('107', 'item_recipe_ultimate_scepter', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Aghanim\'s Scepter', null);
INSERT INTO `item` VALUES ('108', 'item_ultimate_scepter', '4200', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/ultimate_scepter_lg.png?3', 'Aghanim\'s Scepter', '阿哈利姆神杖');
INSERT INTO `item` VALUES ('109', 'item_recipe_refresher', '1800', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Refresher Orb', '刷新球卷轴');
INSERT INTO `item` VALUES ('110', 'item_refresher', '5200', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/refresher_lg.png?3', 'Refresher Orb', '刷新球');
INSERT INTO `item` VALUES ('111', 'item_recipe_assault', '1300', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Assault Cuirass', '强袭胸甲卷轴');
INSERT INTO `item` VALUES ('112', 'item_assault', '5250', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/assault_lg.png?3', 'Assault Cuirass', '强袭胸甲');
INSERT INTO `item` VALUES ('113', 'item_recipe_heart', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Heart of Tarrasque', null);
INSERT INTO `item` VALUES ('114', 'item_heart', '5200', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/heart_lg.png?3', 'Heart of Tarrasque', '恐鳌之心');
INSERT INTO `item` VALUES ('115', 'item_recipe_black_king_bar', '1375', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Black King Bar', '黑皇杖卷轴');
INSERT INTO `item` VALUES ('116', 'item_black_king_bar', '3975', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/black_king_bar_lg.png?3', 'Black King Bar', '黑皇杖');
INSERT INTO `item` VALUES ('117', 'item_aegis', '0', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/aegis-of-the-immortal.png', 'Aegis of the Immortal', '不朽之守护');
INSERT INTO `item` VALUES ('118', 'item_recipe_shivas_guard', '650', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Shiva\'s Guard', '希瓦的守护卷轴');
INSERT INTO `item` VALUES ('119', 'item_shivas_guard', '4750', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/shivas_guard_lg.png?3', 'Shiva\'s Guard', '希瓦的守护');
INSERT INTO `item` VALUES ('120', 'item_recipe_bloodstone', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Bloodstone', null);
INSERT INTO `item` VALUES ('121', 'item_bloodstone', '4900', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/bloodstone_lg.png?3', 'Bloodstone', '血精石');
INSERT INTO `item` VALUES ('122', 'item_recipe_sphere', '1000', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Linken\'s Sphere', '林肯法球卷轴');
INSERT INTO `item` VALUES ('123', 'item_sphere', '4850', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/sphere_lg.png?3', 'Linken\'s Sphere', '林肯法球');
INSERT INTO `item` VALUES ('124', 'item_recipe_vanguard', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Vanguard', null);
INSERT INTO `item` VALUES ('125', 'item_vanguard', '2150', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/vanguard_lg.png?3', 'Vanguard', '先锋盾');
INSERT INTO `item` VALUES ('126', 'item_recipe_blade_mail', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Blade Mail', null);
INSERT INTO `item` VALUES ('127', 'item_blade_mail', '2200', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/blade_mail_lg.png?3', 'Blade Mail', '刃甲');
INSERT INTO `item` VALUES ('128', 'item_recipe_soul_booster', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Soul Booster', '振魂石卷轴');
INSERT INTO `item` VALUES ('129', 'item_soul_booster', '3200', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/soul_booster_lg.png?3', 'Soul Booster', '振魂石');
INSERT INTO `item` VALUES ('130', 'item_recipe_hood_of_defiance', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Hood of Defiance', null);
INSERT INTO `item` VALUES ('131', 'item_hood_of_defiance', '1700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/hood_of_defiance_lg.png?3', 'Hood of Defiance', '挑战头巾');
INSERT INTO `item` VALUES ('132', 'item_recipe_rapier', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Divine Rapier', null);
INSERT INTO `item` VALUES ('133', 'item_rapier', '6000', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/rapier_lg.png?3', 'Divine Rapier', '圣剑');
INSERT INTO `item` VALUES ('134', 'item_recipe_monkey_king_bar', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Monkey King Bar', null);
INSERT INTO `item` VALUES ('135', 'item_monkey_king_bar', '4200', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/monkey_king_bar_lg.png?3', 'Monkey King Bar', '金箍棒');
INSERT INTO `item` VALUES ('136', 'item_recipe_radiance', '1350', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Radiance', '辉耀卷轴');
INSERT INTO `item` VALUES ('137', 'item_radiance', '5150', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/radiance_lg.png?3', 'Radiance', '辉耀');
INSERT INTO `item` VALUES ('138', 'item_recipe_butterfly', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Butterfly', null);
INSERT INTO `item` VALUES ('139', 'item_butterfly', '5525', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/butterfly_lg.png?3', 'Butterfly', '蝴蝶');
INSERT INTO `item` VALUES ('140', 'item_recipe_greater_crit', '1000', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Daedalus', '代达罗斯之殇');
INSERT INTO `item` VALUES ('141', 'item_greater_crit', '5320', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/greater_crit_lg.png?3', 'Daedalus', '代达罗斯之殇');
INSERT INTO `item` VALUES ('142', 'item_recipe_basher', '1150', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Skull Basher', '碎颅锤卷轴');
INSERT INTO `item` VALUES ('143', 'item_basher', '2700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/basher_lg.png?3', 'Skull Basher', '碎颅锤');
INSERT INTO `item` VALUES ('144', 'item_recipe_bfury', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Battle Fury', null);
INSERT INTO `item` VALUES ('145', 'item_bfury', '4100', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/bfury_lg.png?3', 'Battle Fury', '狂战斧');
INSERT INTO `item` VALUES ('146', 'item_recipe_manta', '900', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Manta Style', null);
INSERT INTO `item` VALUES ('147', 'item_manta', '5000', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/manta_lg.png?3', 'Manta Style', '幻影斧');
INSERT INTO `item` VALUES ('148', 'item_recipe_lesser_crit', '500', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Crystalys', '水晶剑卷轴');
INSERT INTO `item` VALUES ('149', 'item_lesser_crit', '2120', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/lesser_crit_lg.png?3', 'Crystalys', '水晶剑');
INSERT INTO `item` VALUES ('150', 'item_recipe_armlet', '550', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Armlet of Mordiggian', '莫尔迪基安的臂章卷轴');
INSERT INTO `item` VALUES ('151', 'item_armlet', '2370', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/armlet_lg.png?3', 'Armlet of Mordiggian', '莫尔迪基安的臂章');
INSERT INTO `item` VALUES ('152', 'item_invis_sword', '2700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/invis_sword_lg.png?3', 'Shadow Blade', '影刃');
INSERT INTO `item` VALUES ('153', 'item_recipe_sange_and_yasha', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Sange and Yasha', '散夜对剑卷轴');
INSERT INTO `item` VALUES ('154', 'item_sange_and_yasha', '3900', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/sange_and_yasha_lg.png?3', 'Sange and Yasha', '散夜对剑');
INSERT INTO `item` VALUES ('155', 'item_recipe_satanic', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Satanic', null);
INSERT INTO `item` VALUES ('156', 'item_satanic', '5500', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/satanic_lg.png?3', 'Satanic', '撒旦之邪力');
INSERT INTO `item` VALUES ('157', 'item_recipe_mjollnir', '900', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Mjollnir', '雷神之锤卷轴');
INSERT INTO `item` VALUES ('158', 'item_mjollnir', '5700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/mjollnir_lg.png?3', 'Mjollnir', '雷神之锤');
INSERT INTO `item` VALUES ('159', 'item_recipe_skadi', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Eye of Skadi', null);
INSERT INTO `item` VALUES ('160', 'item_skadi', '5500', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/skadi_lg.png?3', 'Eye of Skadi', '斯嘉蒂之眼');
INSERT INTO `item` VALUES ('161', 'item_recipe_sange', '500', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Sange', '散华卷轴');
INSERT INTO `item` VALUES ('162', 'item_sange', '1950', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/sange_lg.png?3', 'Sange', '散华');
INSERT INTO `item` VALUES ('163', 'item_recipe_helm_of_the_dominator', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Helm of the Dominator', null);
INSERT INTO `item` VALUES ('164', 'item_helm_of_the_dominator', '2000', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/helm_of_the_dominator_lg.png?3', 'Helm of the Dominator', '支配头盔');
INSERT INTO `item` VALUES ('165', 'item_recipe_maelstrom', '700', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Maelstrom', '漩涡卷轴');
INSERT INTO `item` VALUES ('166', 'item_maelstrom', '2800', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/maelstrom_lg.png?3', 'Maelstrom', '漩涡');
INSERT INTO `item` VALUES ('167', 'item_recipe_desolator', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Desolator', '暗灭卷轴');
INSERT INTO `item` VALUES ('168', 'item_desolator', '3500', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/desolator_lg.png?3', 'Desolator', '暗灭');
INSERT INTO `item` VALUES ('169', 'item_recipe_yasha', '500', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Yasha', '夜叉卷轴');
INSERT INTO `item` VALUES ('170', 'item_yasha', '1950', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/yasha_lg.png?3', 'Yasha', '夜叉');
INSERT INTO `item` VALUES ('171', 'item_recipe_mask_of_madness', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Mask of Madness', '疯狂面具卷轴');
INSERT INTO `item` VALUES ('172', 'item_mask_of_madness', '1975', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/mask_of_madness_lg.png?3', 'Mask of Madness', '疯狂面具');
INSERT INTO `item` VALUES ('173', 'item_recipe_diffusal_blade', '700', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Diffusal Blade', '净魂之刃卷轴');
INSERT INTO `item` VALUES ('174', 'item_diffusal_blade', '3150', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/diffusal_blade_lg.png?3', 'Diffusal Blade', '净魂之刃');
INSERT INTO `item` VALUES ('175', 'item_recipe_ethereal_blade', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Ethereal Blade', null);
INSERT INTO `item` VALUES ('176', 'item_ethereal_blade', '4700', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/ethereal_blade_lg.png?3', 'Ethereal Blade', '虚灵之刃');
INSERT INTO `item` VALUES ('177', 'item_recipe_soul_ring', '185', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Soul Ring', '灵魂之戒卷轴');
INSERT INTO `item` VALUES ('178', 'item_soul_ring', '755', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/soul_ring_lg.png?3', 'Soul Ring', '灵魂之戒');
INSERT INTO `item` VALUES ('179', 'item_recipe_arcane_boots', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Arcane Boots', null);
INSERT INTO `item` VALUES ('180', 'item_arcane_boots', '1300', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/arcane_boots_lg.png?3', 'Arcane Boots', '奥术鞋');
INSERT INTO `item` VALUES ('181', 'item_orb_of_venom', '275', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/orb_of_venom_lg.png?3', 'Orb of Venom', '淬毒之珠');
INSERT INTO `item` VALUES ('182', 'item_stout_shield', '200', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/stout_shield_lg.png?3', 'Stout Shield', '圆盾');
INSERT INTO `item` VALUES ('183', 'item_recipe_invis_sword', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Shadow Blade', null);
INSERT INTO `item` VALUES ('184', 'item_recipe_ancient_janggo', '575', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Drum of Endurance', '韧鼓卷轴');
INSERT INTO `item` VALUES ('185', 'item_ancient_janggo', '1615', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/ancient_janggo_lg.png?3', 'Drum of Endurance', '韧鼓');
INSERT INTO `item` VALUES ('186', 'item_recipe_medallion_of_courage', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Medallion of Courage', null);
INSERT INTO `item` VALUES ('187', 'item_medallion_of_courage', '1175', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/medallion_of_courage_lg.png?3', 'Medallion of Courage', '勇气勋章');
INSERT INTO `item` VALUES ('188', 'item_smoke_of_deceit', '80', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/smoke_of_deceit_lg.png?3', 'Smoke of Deceit', '诡计之雾');
INSERT INTO `item` VALUES ('189', 'item_recipe_veil_of_discord', '500', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Veil of Discord', '纷争面纱卷轴');
INSERT INTO `item` VALUES ('190', 'item_veil_of_discord', '2330', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/veil_of_discord_lg.png?3', 'Veil of Discord', '纷争面纱');
INSERT INTO `item` VALUES ('191', 'item_recipe_necronomicon_2', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Necronomicon', null);
INSERT INTO `item` VALUES ('192', 'item_recipe_necronomicon_3', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Necronomicon', null);
INSERT INTO `item` VALUES ('193', 'item_necronomicon_2', '3700', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/necronomicon.png', 'Necronomicon', '死灵书2');
INSERT INTO `item` VALUES ('194', 'item_necronomicon_3', '5000', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/necronomicon.png', 'Necronomicon', '死灵书3');
INSERT INTO `item` VALUES ('197', 'item_recipe_dagon_2', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Dagon', '达贡之神力2卷轴');
INSERT INTO `item` VALUES ('198', 'item_recipe_dagon_3', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Dagon', '达贡之神力3卷轴');
INSERT INTO `item` VALUES ('199', 'item_recipe_dagon_4', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Dagon', '达贡之神力4卷轴');
INSERT INTO `item` VALUES ('200', 'item_recipe_dagon_5', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Dagon', '达贡之神力5卷轴');
INSERT INTO `item` VALUES ('201', 'item_dagon_2', '3965', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/dagon-2.png', 'Dagon', '达贡之神力2');
INSERT INTO `item` VALUES ('202', 'item_dagon_3', '5215', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/dagon-3.png', 'Dagon', '达贡之神力3');
INSERT INTO `item` VALUES ('203', 'item_dagon_4', '6465', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/dagon-4.png', 'Dagon', '达贡之神力4');
INSERT INTO `item` VALUES ('204', 'item_dagon_5', '7715', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/dagon-5.png', 'Dagon', '达贡之神力5');
INSERT INTO `item` VALUES ('205', 'item_recipe_rod_of_atos', '1100', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Rod of Atos', '阿托斯之棍卷轴');
INSERT INTO `item` VALUES ('206', 'item_rod_of_atos', '3030', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/rod_of_atos_lg.png?3', 'Rod of Atos', '阿托斯之棍');
INSERT INTO `item` VALUES ('207', 'item_recipe_abyssal_blade', '1550', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Abyssal Blade', '深渊之刃卷轴');
INSERT INTO `item` VALUES ('208', 'item_abyssal_blade', '6400', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/abyssal_blade_lg.png?3', 'Abyssal Blade', '深渊之刃');
INSERT INTO `item` VALUES ('209', 'item_recipe_heavens_halberd', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Heaven\'s Halberd', null);
INSERT INTO `item` VALUES ('210', 'item_heavens_halberd', '3400', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/heavens_halberd_lg.png?3', 'Heaven\'s Halberd', '天堂之戟');
INSERT INTO `item` VALUES ('211', 'item_recipe_ring_of_aquila', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Ring of Aquila', null);
INSERT INTO `item` VALUES ('212', 'item_ring_of_aquila', '965', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/ring_of_aquila_lg.png?3', 'Ring of Aquila', '天鹰之戒');
INSERT INTO `item` VALUES ('213', 'item_recipe_tranquil_boots', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Tranquil Boots', null);
INSERT INTO `item` VALUES ('214', 'item_tranquil_boots', '950', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/tranquil_boots_lg.png?3', 'Tranquil Boots', '静谧之鞋');
INSERT INTO `item` VALUES ('215', 'item_shadow_amulet', '1300', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/shadow_amulet_lg.png?3', 'Shadow Amulet', '暗影护符');
INSERT INTO `item` VALUES ('216', 'item_enchanted_mango', '100', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/enchanted_mango_lg.png?3', 'Enchanted Mango', '魔法芒果');
INSERT INTO `item` VALUES ('217', 'item_recipe_ward_dispenser', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Observer and Sentry Wards', null);
INSERT INTO `item` VALUES ('218', 'item_ward_dispenser', '180', '0', '0', '0', '0', null, 'Observer and Sentry Wards', null);
INSERT INTO `item` VALUES ('219', 'item_recipe_travel_boots_2', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Boots of Travel', null);
INSERT INTO `item` VALUES ('220', 'item_travel_boots_2', '4400', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/boots-of-travel-2.png', 'Boots of Travel', '远行鞋2');
INSERT INTO `item` VALUES ('221', 'item_recipe_lotus_orb', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Lotus Orb', null);
INSERT INTO `item` VALUES ('222', 'item_recipe_meteor_hammer', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Meteor Hammer', null);
INSERT INTO `item` VALUES ('223', 'item_meteor_hammer', '2625', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/meteor_hammer_lg.png?3', 'Meteor Hammer', '陨星锤');
INSERT INTO `item` VALUES ('224', 'item_recipe_nullifier', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Nullifier', null);
INSERT INTO `item` VALUES ('225', 'item_nullifier', '4700', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/nullifier_lg.png?3', 'Nullifier', '否决挂饰');
INSERT INTO `item` VALUES ('226', 'item_lotus_orb', '4000', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/lotus_orb_lg.png?3', 'Lotus Orb', '清莲宝珠');
INSERT INTO `item` VALUES ('227', 'item_recipe_solar_crest', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Solar Crest', null);
INSERT INTO `item` VALUES ('228', 'item_recipe_octarine_core', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Octarine Core', null);
INSERT INTO `item` VALUES ('229', 'item_solar_crest', '2625', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/solar_crest_lg.png?3', 'Solar Crest', '炎阳纹章');
INSERT INTO `item` VALUES ('230', 'item_recipe_guardian_greaves', '1700', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Guardian Greaves', '卫士胫甲卷轴');
INSERT INTO `item` VALUES ('231', 'item_guardian_greaves', '5350', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/guardian_greaves_lg.png?3', 'Guardian Greaves', '卫士胫甲');
INSERT INTO `item` VALUES ('232', 'item_aether_lens', '2350', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/aether_lens_lg.png?3', 'Aether Lens', '以太之镜');
INSERT INTO `item` VALUES ('233', 'item_recipe_aether_lens', '600', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Aether Lens', null);
INSERT INTO `item` VALUES ('234', 'item_recipe_dragon_lance', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Dragon Lance', null);
INSERT INTO `item` VALUES ('235', 'item_octarine_core', '5900', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/octarine_core_lg.png?3', 'Octarine Core', '玲珑心');
INSERT INTO `item` VALUES ('236', 'item_dragon_lance', '1900', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/dragon_lance_lg.png?3', 'Dragon Lance', '魔龙枪');
INSERT INTO `item` VALUES ('237', 'item_faerie_fire', '70', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/faerie_fire_lg.png?3', 'Faerie Fire', '仙灵之火');
INSERT INTO `item` VALUES ('238', 'item_recipe_iron_talon', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Iron Talon Recipe', null);
INSERT INTO `item` VALUES ('239', 'item_iron_talon', '0', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/iron_talon_lg.png?3', 'Iron Talon', null);
INSERT INTO `item` VALUES ('240', 'item_blight_stone', '300', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/blight_stone_lg.png?3', 'Blight Stone', '枯萎之石');
INSERT INTO `item` VALUES ('241', 'item_tango_single', '30', '0', '0', '0', '0', 'https://www.dotafire.com/images/item/tango.png', 'Tango (Shared)', '树之祭祀共享');
INSERT INTO `item` VALUES ('242', 'item_crimson_guard', '3550', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/crimson_guard_lg.png?3', 'Crimson Guard', '赤红甲');
INSERT INTO `item` VALUES ('243', 'item_recipe_crimson_guard', '600', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Crimson Guard', '赤红甲卷轴');
INSERT INTO `item` VALUES ('244', 'item_wind_lace', '250', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/wind_lace_lg.png?3', 'Wind Lace', '风灵之纹');
INSERT INTO `item` VALUES ('245', 'item_recipe_bloodthorn', '1000', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Bloodthorn', null);
INSERT INTO `item` VALUES ('246', 'item_recipe_moon_shard', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Moon Shard', null);
INSERT INTO `item` VALUES ('247', 'item_moon_shard', '4000', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/moon_shard_lg.png?3', 'Moon Shard', '银月之晶');
INSERT INTO `item` VALUES ('248', 'item_recipe_silver_edge', '700', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Silver Edge', '白银之锋卷轴');
INSERT INTO `item` VALUES ('249', 'item_silver_edge', '5550', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/silver_edge_lg.png?3', 'Silver Edge', '白银之锋');
INSERT INTO `item` VALUES ('250', 'item_bloodthorn', '7195', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/bloodthorn_lg.png?3', 'Bloodthorn', '血辣');
INSERT INTO `item` VALUES ('251', 'item_recipe_echo_sabre', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Echo Sabre', '回音战刃卷轴');
INSERT INTO `item` VALUES ('252', 'item_echo_sabre', '2650', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/echo_sabre_lg.png?3', 'Echo Sabre', '回音战刃');
INSERT INTO `item` VALUES ('253', 'item_recipe_glimmer_cape', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Glimmer Cape', null);
INSERT INTO `item` VALUES ('254', 'item_glimmer_cape', '1850', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/glimmer_cape_lg.png?3', 'Glimmer Cape', '微光披风');
INSERT INTO `item` VALUES ('255', 'item_recipe_aeon_disk', '1600', '0', '0', '1', '1', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Aeon Disk', '永恒之盘卷轴');
INSERT INTO `item` VALUES ('256', 'item_aeon_disk', '3600', '0', '0', '0', '1', 'https://www.dotafire.com/images/item/aeon-disk.png', 'Aeon Disk', '永恒之盘');
INSERT INTO `item` VALUES ('257', 'item_tome_of_knowledge', '150', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/tome_of_knowledge_lg.png?3', 'Tome of Knowledge', '知识之书');
INSERT INTO `item` VALUES ('258', 'item_recipe_kaya', '500', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Kaya', '慧光卷轴');
INSERT INTO `item` VALUES ('259', 'item_kaya', '1950', '0', '0', '0', '1', 'https://www.dotafire.com/images/item/kaya.png', 'Kaya', '慧光');
INSERT INTO `item` VALUES ('260', 'item_refresher_shard', '1000', '0', '0', '0', '0', null, 'Refresher Shard', null);
INSERT INTO `item` VALUES ('262', 'item_recipe_hurricane_pike', '0', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Hurricane Pike', null);
INSERT INTO `item` VALUES ('263', 'item_hurricane_pike', '4615', '0', '0', '0', '1', 'http://cdn.dota2.com/apps/dota2/images/items/hurricane_pike_lg.png?3', 'Hurricane Pike', '飓风长戟');
INSERT INTO `item` VALUES ('265', 'item_infused_raindrop', '225', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/infused_raindrop_lg.png?3', 'Infused Raindrops', '凝魂之露');
INSERT INTO `item` VALUES ('266', 'item_recipe_spirit_vessel', '600', '0', '0', '1', '0', 'http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png', 'Recipe: Spirit Vessel', '魂之灵龛卷轴');
INSERT INTO `item` VALUES ('267', 'item_spirit_vessel', '2825', '0', '0', '0', '1', 'https://www.dotafire.com/images/item/spirit-vessel.png', 'Spirit Vessel', '魂之灵龛');
INSERT INTO `item` VALUES ('275', 'item_trident', '0', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/trident_lg.png?3', 'DOTA_Tooltip_Ability_item_trident', null);
INSERT INTO `item` VALUES ('276', 'item_combo_breaker', '0', '0', '0', '0', '0', 'http://cdn.dota2.com/apps/dota2/images/items/combo_breaker_lg.png?3', 'DOTA_Tooltip_Ability_item_combo_breaker', null);
INSERT INTO `item` VALUES ('1021', 'item_river_painter', '0', '0', '0', '0', '0', null, 'River Vial: Chrome', null);
INSERT INTO `item` VALUES ('1022', 'item_river_painter2', '0', '0', '0', '0', '0', null, 'River Vial: Dry', null);
INSERT INTO `item` VALUES ('1023', 'item_river_painter3', '0', '0', '0', '0', '0', null, 'River Vial: Slime', null);
INSERT INTO `item` VALUES ('1024', 'item_river_painter4', '0', '0', '0', '0', '0', null, 'River Vial: Oil', null);
INSERT INTO `item` VALUES ('1025', 'item_river_painter5', '0', '0', '0', '0', '0', null, 'River Vial: Electrified', null);
INSERT INTO `item` VALUES ('1026', 'item_river_painter6', '0', '0', '0', '0', '0', null, 'River Vial: Potion', null);
INSERT INTO `item` VALUES ('1027', 'item_river_painter7', '0', '0', '0', '0', '0', null, 'River Vial: Blood', null);
