/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : dota2_databank

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-05 15:26:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hero
-- ----------------------------
DROP TABLE IF EXISTS `hero`;
CREATE TABLE `hero` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `localized_name` varchar(255) DEFAULT NULL,
  `headportrait_path` varchar(255) DEFAULT NULL COMMENT '选择英雄时的图像',
  `hero_path` varchar(255) DEFAULT NULL COMMENT '英雄大图',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hero
-- ----------------------------
INSERT INTO `hero` VALUES ('1', 'npc_dota_hero_antimage', 'Anti-Mage', 'http://www.dota2.com.cn/images/heroes/antimage_full.png', 'http://www.dota2.com.cn/images/heroes/antimage_vert.jpg');
INSERT INTO `hero` VALUES ('2', 'npc_dota_hero_axe', 'Axe', 'http://www.dota2.com.cn/images/heroes/axe_full.png', 'http://www.dota2.com.cn/images/heroes/axe_vert.jpg');
INSERT INTO `hero` VALUES ('3', 'npc_dota_hero_bane', 'Bane', 'http://www.dota2.com.cn/images/heroes/bane_full.png', 'http://www.dota2.com.cn/images/heroes/bane_vert.jpg');
INSERT INTO `hero` VALUES ('4', 'npc_dota_hero_bloodseeker', 'Bloodseeker', 'http://www.dota2.com.cn/images/heroes/bloodseeker_full.png', 'http://www.dota2.com.cn/images/heroes/bloodseeker_vert.jpg');
INSERT INTO `hero` VALUES ('5', 'npc_dota_hero_crystal_maiden', 'Crystal Maiden', 'http://www.dota2.com.cn/images/heroes/crystal_maiden_full.png', 'http://www.dota2.com.cn/images/heroes/crystal_maiden_vert.jpg');
INSERT INTO `hero` VALUES ('6', 'npc_dota_hero_drow_ranger', 'Drow Ranger', 'http://www.dota2.com.cn/images/heroes/drow_ranger_full.png', 'http://www.dota2.com.cn/images/heroes/drow_ranger_vert.jpg');
INSERT INTO `hero` VALUES ('7', 'npc_dota_hero_earthshaker', 'Earthshaker', 'http://www.dota2.com.cn/images/heroes/earthshaker_full.png', 'http://www.dota2.com.cn/images/heroes/earthshaker_vert.jpg');
INSERT INTO `hero` VALUES ('8', 'npc_dota_hero_juggernaut', 'Juggernaut', 'http://www.dota2.com.cn/images/heroes/juggernaut_full.png', 'http://www.dota2.com.cn/images/heroes/juggernaut_vert.jpg');
INSERT INTO `hero` VALUES ('9', 'npc_dota_hero_mirana', 'Mirana', 'http://www.dota2.com.cn/images/heroes/mirana_full.png', 'http://www.dota2.com.cn/images/heroes/mirana_vert.jpg');
INSERT INTO `hero` VALUES ('10', 'npc_dota_hero_morphling', 'Morphling', 'http://www.dota2.com.cn/images/heroes/morphling_full.png', 'http://www.dota2.com.cn/images/heroes/morphling_vert.jpg');
INSERT INTO `hero` VALUES ('11', 'npc_dota_hero_nevermore', 'Shadow Fiend', 'http://www.dota2.com.cn/images/heroes/nevermore_full.png', 'http://www.dota2.com.cn/images/heroes/nevermore_vert.jpg');
INSERT INTO `hero` VALUES ('12', 'npc_dota_hero_phantom_lancer', 'Phantom Lancer', 'http://www.dota2.com.cn/images/heroes/phantom_lancer_full.png', 'http://www.dota2.com.cn/images/heroes/phantom_lancer_vert.jpg');
INSERT INTO `hero` VALUES ('13', 'npc_dota_hero_puck', 'Puck', 'http://www.dota2.com.cn/images/heroes/puck_full.png', 'http://www.dota2.com.cn/images/heroes/puck_vert.jpg');
INSERT INTO `hero` VALUES ('14', 'npc_dota_hero_pudge', 'Pudge', 'http://www.dota2.com.cn/images/heroes/pudge_full.png', 'http://www.dota2.com.cn/images/heroes/pudge_vert.jpg');
INSERT INTO `hero` VALUES ('15', 'npc_dota_hero_razor', 'Razor', 'http://www.dota2.com.cn/images/heroes/razor_full.png', 'http://www.dota2.com.cn/images/heroes/razor_vert.jpg');
INSERT INTO `hero` VALUES ('16', 'npc_dota_hero_sand_king', 'Sand King', 'http://www.dota2.com.cn/images/heroes/sand_king_full.png', 'http://www.dota2.com.cn/images/heroes/sand_king_vert.jpg');
INSERT INTO `hero` VALUES ('17', 'npc_dota_hero_storm_spirit', 'Storm Spirit', 'http://www.dota2.com.cn/images/heroes/storm_spirit_full.png', 'http://www.dota2.com.cn/images/heroes/storm_spirit_vert.jpg');
INSERT INTO `hero` VALUES ('18', 'npc_dota_hero_sven', 'Sven', 'http://www.dota2.com.cn/images/heroes/sven_full.png', 'http://www.dota2.com.cn/images/heroes/sven_vert.jpg');
INSERT INTO `hero` VALUES ('19', 'npc_dota_hero_tiny', 'Tiny', 'http://www.dota2.com.cn/images/heroes/tiny_full.png', 'http://www.dota2.com.cn/images/heroes/tiny_vert.jpg');
INSERT INTO `hero` VALUES ('20', 'npc_dota_hero_vengefulspirit', 'Vengeful Spirit', 'http://www.dota2.com.cn/images/heroes/vengefulspirit_full.png', 'http://www.dota2.com.cn/images/heroes/vengefulspirit_vert.jpg');
INSERT INTO `hero` VALUES ('21', 'npc_dota_hero_windrunner', 'Windranger', 'http://www.dota2.com.cn/images/heroes/windrunner_full.png', 'http://www.dota2.com.cn/images/heroes/windrunner_vert.jpg');
INSERT INTO `hero` VALUES ('22', 'npc_dota_hero_zeus', 'Zeus', 'http://www.dota2.com.cn/images/heroes/zuus_full.png', 'http://www.dota2.com.cn/images/heroes/zuus_vert.jpg');
INSERT INTO `hero` VALUES ('23', 'npc_dota_hero_kunkka', 'Kunkka', 'http://www.dota2.com.cn/images/heroes/kunkka_full.png', 'http://www.dota2.com.cn/images/heroes/kunkka_vert.jpg');
INSERT INTO `hero` VALUES ('25', 'npc_dota_hero_lina', 'Lina', 'http://www.dota2.com.cn/images/heroes/lina_full.png', 'http://www.dota2.com.cn/images/heroes/lina_vert.jpg');
INSERT INTO `hero` VALUES ('26', 'npc_dota_hero_lion', 'Lion', 'http://www.dota2.com.cn/images/heroes/lion_full.png', 'http://www.dota2.com.cn/images/heroes/lion_vert.jpg');
INSERT INTO `hero` VALUES ('27', 'npc_dota_hero_shadow_shaman', 'Shadow Shaman', 'http://www.dota2.com.cn/images/heroes/shadow_shaman_full.png', 'http://www.dota2.com.cn/images/heroes/shadow_shaman_vert.jpg');
INSERT INTO `hero` VALUES ('28', 'npc_dota_hero_slardar', 'Slardar', 'http://www.dota2.com.cn/images/heroes/slardar_full.png', 'http://www.dota2.com.cn/images/heroes/slardar_vert.jpg');
INSERT INTO `hero` VALUES ('29', 'npc_dota_hero_tidehunter', 'Tidehunter', 'http://www.dota2.com.cn/images/heroes/tidehunter_full.png', 'http://www.dota2.com.cn/images/heroes/tidehunter_vert.jpg');
INSERT INTO `hero` VALUES ('30', 'npc_dota_hero_witch_doctor', 'Witch Doctor', 'http://www.dota2.com.cn/images/heroes/witch_doctor_full.png', 'http://www.dota2.com.cn/images/heroes/witch_doctor_vert.jpg');
INSERT INTO `hero` VALUES ('31', 'npc_dota_hero_lich', 'Lich', 'http://www.dota2.com.cn/images/heroes/lich_full.png', 'http://www.dota2.com.cn/images/heroes/lich_vert.jpg');
INSERT INTO `hero` VALUES ('32', 'npc_dota_hero_riki', 'Riki', 'http://www.dota2.com.cn/images/heroes/riki_full.png', 'http://www.dota2.com.cn/images/heroes/riki_vert.jpg');
INSERT INTO `hero` VALUES ('33', 'npc_dota_hero_enigma', 'Enigma', 'http://www.dota2.com.cn/images/heroes/enigma_full.png', 'http://www.dota2.com.cn/images/heroes/enigma_vert.jpg');
INSERT INTO `hero` VALUES ('34', 'npc_dota_hero_tinker', 'Tinker', 'http://www.dota2.com.cn/images/heroes/tinker_full.png', 'http://www.dota2.com.cn/images/heroes/tinker_vert.jpg');
INSERT INTO `hero` VALUES ('35', 'npc_dota_hero_sniper', 'Sniper', 'http://www.dota2.com.cn/images/heroes/sniper_full.png', 'http://www.dota2.com.cn/images/heroes/sniper_vert.jpg');
INSERT INTO `hero` VALUES ('36', 'npc_dota_hero_necrolyte', 'Necrophos', 'http://www.dota2.com.cn/images/heroes/necrolyte_full.png', 'http://www.dota2.com.cn/images/heroes/necrolyte_vert.jpg');
INSERT INTO `hero` VALUES ('37', 'npc_dota_hero_warlock', 'Warlock', 'http://www.dota2.com.cn/images/heroes/warlock_full.png', 'http://www.dota2.com.cn/images/heroes/warlock_vert.jpg');
INSERT INTO `hero` VALUES ('38', 'npc_dota_hero_beastmaster', 'Beastmaster', 'http://www.dota2.com.cn/images/heroes/beastmaster_full.png', 'http://www.dota2.com.cn/images/heroes/beastmaster_vert.jpg');
INSERT INTO `hero` VALUES ('39', 'npc_dota_hero_queenofpain', 'Queen of Pain', 'http://www.dota2.com.cn/images/heroes/queenofpain_full.png', 'http://www.dota2.com.cn/images/heroes/queenofpain_vert.jpg');
INSERT INTO `hero` VALUES ('40', 'npc_dota_hero_venomancer', 'Venomancer', 'http://www.dota2.com.cn/images/heroes/venomancer_full.png', 'http://www.dota2.com.cn/images/heroes/venomancer_vert.jpg');
INSERT INTO `hero` VALUES ('41', 'npc_dota_hero_faceless_void', 'Faceless Void', 'http://www.dota2.com.cn/images/heroes/faceless_void_full.png', 'http://www.dota2.com.cn/images/heroes/faceless_void_vert.jpg');
INSERT INTO `hero` VALUES ('42', 'npc_dota_hero_skeleton_king', 'Wraith King', 'http://www.dota2.com.cn/images/heroesskeleton_king_full.png', 'http://www.dota2.com.cn/images/heroes/skeleton_king_vert.jpg');
INSERT INTO `hero` VALUES ('43', 'npc_dota_hero_death_prophet', 'Death Prophet', 'http://www.dota2.com.cn/images/heroes/death_prophet_full.png', 'http://www.dota2.com.cn/images/heroes/death_prophet_vert.jpg');
INSERT INTO `hero` VALUES ('44', 'npc_dota_hero_phantom_assassin', 'Phantom Assassin', 'http://www.dota2.com.cn/images/heroes/phantom_assassin_full.png', 'http://www.dota2.com.cn/images/heroes/phantom_assassin_vert.jpg');
INSERT INTO `hero` VALUES ('45', 'npc_dota_hero_pugna', 'Pugna', 'http://www.dota2.com.cn/images/heroes/pugna_full.png', 'http://www.dota2.com.cn/images/heroes/pugna_vert.jpg');
INSERT INTO `hero` VALUES ('46', 'npc_dota_hero_templar_assassin', 'Templar Assassin', 'http://www.dota2.com.cn/images/heroes/templar_assassin_full.png', 'http://www.dota2.com.cn/images/heroes/templar_assassin_vert.jpg');
INSERT INTO `hero` VALUES ('47', 'npc_dota_hero_viper', 'Viper', 'http://www.dota2.com.cn/images/heroes/viper_full.png', 'http://www.dota2.com.cn/images/heroes/viper_vert.jpg');
INSERT INTO `hero` VALUES ('48', 'npc_dota_hero_luna', 'Luna', 'http://www.dota2.com.cn/images/heroes/luna_full.png', 'http://www.dota2.com.cn/images/heroes/luna_vert.jpg');
INSERT INTO `hero` VALUES ('49', 'npc_dota_hero_dragon_knight', 'Dragon Knight', 'http://www.dota2.com.cn/images/heroes/dragon_knight_full.png', 'http://www.dota2.com.cn/images/heroes/dragon_knight_vert.jpg');
INSERT INTO `hero` VALUES ('50', 'npc_dota_hero_dazzle', 'Dazzle', 'http://www.dota2.com.cn/images/heroes/dazzle_full.png', 'http://www.dota2.com.cn/images/heroes/dazzle_vert.jpg');
INSERT INTO `hero` VALUES ('51', 'npc_dota_hero_rattletrap', 'Clockwerk', 'http://www.dota2.com.cn/images/heroes/rattletrap_full.png', 'http://www.dota2.com.cn/images/heroes/rattletrap_vert.jpg');
INSERT INTO `hero` VALUES ('52', 'npc_dota_hero_leshrac', 'Leshrac', 'http://www.dota2.com.cn/images/heroes/leshrac_full.png', 'http://www.dota2.com.cn/images/heroes/leshrac_vert.jpg');
INSERT INTO `hero` VALUES ('53', 'npc_dota_hero_furion', 'Nature\'s Prophet', 'http://www.dota2.com.cn/images/heroes/furion_full.png', 'http://www.dota2.com.cn/images/heroes/furion_vert.jpg');
INSERT INTO `hero` VALUES ('54', 'npc_dota_hero_life_stealer', 'Lifestealer', 'http://www.dota2.com.cn/images/heroes/life_stealer_full.png', 'http://www.dota2.com.cn/images/heroes/life_stealer_vert.jpg');
INSERT INTO `hero` VALUES ('55', 'npc_dota_hero_dark_seer', 'Dark Seer', 'http://www.dota2.com.cn/images/heroes/dark_seer_full.png', 'http://www.dota2.com.cn/images/heroes/dark_seer_vert.jpg');
INSERT INTO `hero` VALUES ('56', 'npc_dota_hero_clinkz', 'Clinkz', 'http://www.dota2.com.cn/images/heroes/clinkz_full.png', 'http://www.dota2.com.cn/images/heroes/clinkz_vert.jpg');
INSERT INTO `hero` VALUES ('57', 'npc_dota_hero_omniknight', 'Omniknight', 'http://www.dota2.com.cn/images/heroes/omniknight_full.png', 'http://www.dota2.com.cn/images/heroes/omniknight_vert.jpg');
INSERT INTO `hero` VALUES ('58', 'npc_dota_hero_enchantress', 'Enchantress', 'http://www.dota2.com.cn/images/heroes/enchantress_full.png', 'http://www.dota2.com.cn/images/heroes/enchantress_vert.jpg');
INSERT INTO `hero` VALUES ('59', 'npc_dota_hero_huskar', 'Huskar', 'http://www.dota2.com.cn/images/heroes/huskar_full.png', 'http://www.dota2.com.cn/images/heroes/huskar_vert.jpg');
INSERT INTO `hero` VALUES ('60', 'npc_dota_hero_night_stalker', 'Night Stalker', 'http://www.dota2.com.cn/images/heroes/night_stalker_full.png', 'http://www.dota2.com.cn/images/heroes/night_stalker_vert.jpg');
INSERT INTO `hero` VALUES ('61', 'npc_dota_hero_broodmother', 'Broodmother', 'http://www.dota2.com.cn/images/heroes/broodmother_full.png', 'http://www.dota2.com.cn/images/heroes/broodmother_vert.jpg');
INSERT INTO `hero` VALUES ('62', 'npc_dota_hero_bounty_hunter', 'Bounty Hunter', 'http://www.dota2.com.cn/images/heroes/bounty_hunter_full.png', 'http://www.dota2.com.cn/images/heroes/bounty_hunter_vert.jpg');
INSERT INTO `hero` VALUES ('63', 'npc_dota_hero_weaver', 'Weaver', 'http://www.dota2.com.cn/images/heroes/weaver_full.png', 'http://www.dota2.com.cn/images/heroes/weaver_vert.jpg');
INSERT INTO `hero` VALUES ('64', 'npc_dota_hero_jakiro', 'Jakiro', 'http://www.dota2.com.cn/images/heroes/jakiro_full.png', 'http://www.dota2.com.cn/images/heroes/jakiro_vert.jpg');
INSERT INTO `hero` VALUES ('65', 'npc_dota_hero_batrider', 'Batrider', 'http://www.dota2.com.cn/images/heroes/batrider_full.png', 'http://www.dota2.com.cn/images/heroes/batrider_vert.jpg');
INSERT INTO `hero` VALUES ('66', 'npc_dota_hero_chen', 'Chen', 'http://www.dota2.com.cn/images/heroes/chen_full.png', 'http://www.dota2.com.cn/images/heroes/chen_vert.jpg');
INSERT INTO `hero` VALUES ('67', 'npc_dota_hero_spectre', 'Spectre', 'http://www.dota2.com.cn/images/heroes/spectre_full.png', 'http://www.dota2.com.cn/images/heroes/spectre_vert.jpg');
INSERT INTO `hero` VALUES ('68', 'npc_dota_hero_ancient_apparition', 'Ancient Apparition', 'http://www.dota2.com.cn/images/heroes/ancient_apparition_full.png', 'http://www.dota2.com.cn/images/heroes/ancient_apparition_vert.jpg');
INSERT INTO `hero` VALUES ('69', 'npc_dota_hero_doom_bringer', 'Doom', 'http://www.dota2.com.cn/images/heroes/doom_bringer_full.png', 'http://www.dota2.com.cn/images/heroes/doom_bringer_vert.jpg');
INSERT INTO `hero` VALUES ('70', 'npc_dota_hero_ursa', 'Ursa', 'http://www.dota2.com.cn/images/heroes/ursa_full.png', 'http://www.dota2.com.cn/images/heroes/ursa_vert.jpg');
INSERT INTO `hero` VALUES ('71', 'npc_dota_hero_spirit_breaker', 'Spirit Breaker', 'http://www.dota2.com.cn/images/heroes/spirit_breaker_full.png', 'http://www.dota2.com.cn/images/heroes/spirit_breaker_vert.jpg');
INSERT INTO `hero` VALUES ('72', 'npc_dota_hero_gyrocopter', 'Gyrocopter', 'http://www.dota2.com.cn/images/heroes/gyrocopter_full.png', 'http://www.dota2.com.cn/images/heroes/gyrocopter_vert.jpg');
INSERT INTO `hero` VALUES ('73', 'npc_dota_hero_alchemist', 'Alchemist', 'http://www.dota2.com.cn/images/heroes/alchemist_full.png', 'http://www.dota2.com.cn/images/heroes/alchemist_vert.jpg');
INSERT INTO `hero` VALUES ('74', 'npc_dota_hero_invoker', 'Invoker', 'http://www.dota2.com.cn/images/heroes/invoker_full.png', 'http://www.dota2.com.cn/images/heroes/invoker_vert.jpg');
INSERT INTO `hero` VALUES ('75', 'npc_dota_hero_silencer', 'Silencer', 'http://www.dota2.com.cn/images/heroes/silencer_full.png', 'http://www.dota2.com.cn/images/heroes/silencer_vert.jpg');
INSERT INTO `hero` VALUES ('76', 'npc_dota_hero_obsidian_destroyer', 'Outworld Devourer', 'http://www.dota2.com.cn/images/heroes/obsidian_destroyer_full.png', 'http://www.dota2.com.cn/images/heroes/obsidian_destroyer_vert.jpg');
INSERT INTO `hero` VALUES ('77', 'npc_dota_hero_lycan', 'Lycan', 'http://www.dota2.com.cn/images/heroes/lycan_full.png', 'http://www.dota2.com.cn/images/heroes/lycan_vert.jpg');
INSERT INTO `hero` VALUES ('78', 'npc_dota_hero_brewmaster', 'Brewmaster', 'http://www.dota2.com.cn/images/heroes/brewmaster_full.png', 'http://www.dota2.com.cn/images/heroes/brewmaster_vert.jpg');
INSERT INTO `hero` VALUES ('79', 'npc_dota_hero_shadow_demon', 'Shadow Demon', 'http://www.dota2.com.cn/images/heroes/shadow_demon_full.png', 'http://www.dota2.com.cn/images/heroes/shadow_demon_vert.jpg');
INSERT INTO `hero` VALUES ('80', 'npc_dota_hero_lone_druid', 'Lone Druid', 'http://www.dota2.com.cn/images/heroes/lone_druid_full.png', 'http://www.dota2.com.cn/images/heroes/lone_druid_vert.jpg');
INSERT INTO `hero` VALUES ('81', 'npc_dota_hero_chaos_knight', 'Chaos Knight', 'http://www.dota2.com.cn/images/heroes/chaos_knight_full.png', 'http://www.dota2.com.cn/images/heroes/chaos_knight_vert.jpg');
INSERT INTO `hero` VALUES ('82', 'npc_dota_hero_meepo', 'Meepo', 'http://www.dota2.com.cn/images/heroes/meepo_full.png', 'http://www.dota2.com.cn/images/heroes/meepo_vert.jpg');
INSERT INTO `hero` VALUES ('83', 'npc_dota_hero_treant', 'Treant Protector', 'http://www.dota2.com.cn/images/heroes/treant_full.png', 'http://www.dota2.com.cn/images/heroes/treant_vert.jpg');
INSERT INTO `hero` VALUES ('84', 'npc_dota_hero_ogre_magi', 'Ogre Magi', 'http://www.dota2.com.cn/images/heroes/ogre_magi_full.png', 'http://www.dota2.com.cn/images/heroes/ogre_magi_vert.jpg');
INSERT INTO `hero` VALUES ('85', 'npc_dota_hero_undying', 'Undying', 'http://www.dota2.com.cn/images/heroes/undying_full.png', 'http://www.dota2.com.cn/images/heroes/undying_vert.jpg');
INSERT INTO `hero` VALUES ('86', 'npc_dota_hero_rubick', 'Rubick', 'http://www.dota2.com.cn/images/heroes/rubick_full.png', 'http://www.dota2.com.cn/images/heroes/rubick_vert.jpg');
INSERT INTO `hero` VALUES ('87', 'npc_dota_hero_disruptor', 'Disruptor', 'http://www.dota2.com.cn/images/heroes/disruptor_full.png', 'http://www.dota2.com.cn/images/heroes/disruptor_vert.jpg');
INSERT INTO `hero` VALUES ('88', 'npc_dota_hero_nyx_assassin', 'Nyx Assassin', 'http://www.dota2.com.cn/images/heroes/nyx_assassin_full.png', 'http://www.dota2.com.cn/images/heroes/nyx_assassin_vert.jpg');
INSERT INTO `hero` VALUES ('89', 'npc_dota_hero_naga_siren', 'Naga Siren', 'http://www.dota2.com.cn/images/heroes/naga_siren_full.png', 'http://www.dota2.com.cn/images/heroes/naga_siren_vert.jpg');
INSERT INTO `hero` VALUES ('90', 'npc_dota_hero_keeper_of_the_light', 'Keeper of the Light', 'http://www.dota2.com.cn/images/heroes/keeper_of_the_light_full.png', 'http://www.dota2.com.cn/images/heroes/keeper_of_the_light_vert.jpg');
INSERT INTO `hero` VALUES ('91', 'npc_dota_hero_wisp', 'Io', 'http://www.dota2.com.cn/images/heroes/wisp_full.png', 'http://www.dota2.com.cn/images/heroes/wisp_vert.jpg');
INSERT INTO `hero` VALUES ('92', 'npc_dota_hero_visage', 'Visage', 'http://www.dota2.com.cn/images/heroes/visage_full.png', 'http://www.dota2.com.cn/images/heroes/visage_vert.jpg');
INSERT INTO `hero` VALUES ('93', 'npc_dota_hero_slark', 'Slark', 'http://www.dota2.com.cn/images/heroes/slark_full.png', 'http://www.dota2.com.cn/images/heroes/slark_vert.jpg');
INSERT INTO `hero` VALUES ('94', 'npc_dota_hero_medusa', 'Medusa', 'http://www.dota2.com.cn/images/heroes/medusa_full.png', 'http://www.dota2.com.cn/images/heroes/medusa_vert.jpg');
INSERT INTO `hero` VALUES ('95', 'npc_dota_hero_troll_warlord', 'Troll Warlord', 'http://www.dota2.com.cn/images/heroes/troll_warlord_full.png', 'http://www.dota2.com.cn/images/heroes/troll_warlord_vert.jpg');
INSERT INTO `hero` VALUES ('96', 'npc_dota_hero_centaur', 'Centaur Warrunner', 'http://www.dota2.com.cn/images/heroes/centaur_full.png', 'http://www.dota2.com.cn/images/heroes/centaur_vert.jpg');
INSERT INTO `hero` VALUES ('97', 'npc_dota_hero_magnataur', 'Magnus', 'http://www.dota2.com.cn/images/heroes/magnataur_full.png', 'http://www.dota2.com.cn/images/heroes/magnataur_vert.jpg');
INSERT INTO `hero` VALUES ('98', 'npc_dota_hero_shredder', 'Timbersaw', 'http://www.dota2.com.cn/images/heroes/shredder_full.png', 'http://www.dota2.com.cn/images/heroes/shredder_vert.jpg');
INSERT INTO `hero` VALUES ('99', 'npc_dota_hero_bristleback', 'Bristleback', 'http://www.dota2.com.cn/images/heroes/bristleback_full.png', 'http://www.dota2.com.cn/images/heroes/bristleback_vert.jpg');
INSERT INTO `hero` VALUES ('100', 'npc_dota_hero_tusk', 'Tusk', 'http://www.dota2.com.cn/images/heroes/tusk_full.png', 'http://www.dota2.com.cn/images/heroes/tusk_vert.jpg');
INSERT INTO `hero` VALUES ('101', 'npc_dota_hero_skywrath_mage', 'Skywrath Mage', 'http://www.dota2.com.cn/images/heroes/skywrath_mage_full.png', 'http://www.dota2.com.cn/images/heroes/skywrath_mage_vert.jpg');
INSERT INTO `hero` VALUES ('102', 'npc_dota_hero_abaddon', 'Abaddon', 'http://www.dota2.com.cn/images/heroes/abaddon_full.png', 'http://www.dota2.com.cn/images/heroes/abaddon_vert.jpg');
INSERT INTO `hero` VALUES ('103', 'npc_dota_hero_elder_titan', 'Elder Titan', 'http://www.dota2.com.cn/images/heroes/elder_titan_full.png', 'http://www.dota2.com.cn/images/heroes/elder_titan_vert.jpg');
INSERT INTO `hero` VALUES ('104', 'npc_dota_hero_legion_commander', 'Legion Commander', 'http://www.dota2.com.cn/images/heroes/legion_commander_full.png', 'http://www.dota2.com.cn/images/heroes/legion_commander_vert.jpg');
INSERT INTO `hero` VALUES ('105', 'npc_dota_hero_techies', 'Techies', 'http://www.dota2.com.cn/images/heroes/techies_full.png', 'http://www.dota2.com.cn/images/heroes/techies_vert.jpg');
INSERT INTO `hero` VALUES ('106', 'npc_dota_hero_ember_spirit', 'Ember Spirit', 'http://www.dota2.com.cn/images/heroes/ember_spirit_full.png', 'http://www.dota2.com.cn/images/heroes/ember_spirit_vert.jpg');
INSERT INTO `hero` VALUES ('107', 'npc_dota_hero_earth_spirit', 'Earth Spirit', 'http://www.dota2.com.cn/images/heroes/earth_spirit_full.png', 'http://www.dota2.com.cn/images/heroes/earth_spirit_vert.jpg');
INSERT INTO `hero` VALUES ('108', 'npc_dota_hero_abyssal_underlord', 'Underlord', 'http://www.dota2.com.cn/images/heroes/abyssal_underlord_full.png', 'http://www.dota2.com.cn/images/heroes/abyssal_underlord_vert.jpg');
INSERT INTO `hero` VALUES ('109', 'npc_dota_hero_terrorblade', 'Terrorblade', 'http://www.dota2.com.cn/images/heroes/terrorblade_full.png', 'http://www.dota2.com.cn/images/heroes/terrorblade_vert.jpg');
INSERT INTO `hero` VALUES ('110', 'npc_dota_hero_phoenix', 'Phoenix', 'http://www.dota2.com.cn/images/heroes/phoenix_full.png', 'http://www.dota2.com.cn/images/heroes/phoenix_vert.jpg');
INSERT INTO `hero` VALUES ('111', 'npc_dota_hero_oracle', 'Oracle', 'http://www.dota2.com.cn/images/heroes/oracle_full.png', 'http://www.dota2.com.cn/images/heroes/oracle_vert.jpg');
INSERT INTO `hero` VALUES ('112', 'npc_dota_hero_winter_wyvern', 'Winter Wyvern', 'http://www.dota2.com.cn/images/heroes/winter_wyvern_full.png', 'http://www.dota2.com.cn/images/heroes/winter_wyvern_vert.jpg');
INSERT INTO `hero` VALUES ('113', 'npc_dota_hero_arc_warden', 'Arc Warden', 'http://www.dota2.com.cn/images/heroes/arc_warden_full.png', 'http://www.dota2.com.cn/images/heroes/arc_warden_vert.jpg');
INSERT INTO `hero` VALUES ('114', 'npc_dota_hero_monkey_king', 'Monkey King', 'http://www.dota2.com.cn/images/heroes/monkey_king_full.png', 'http://www.dota2.com.cn/images/heroes/monkey_king_vert.jpg');
INSERT INTO `hero` VALUES ('119', 'npc_dota_hero_dark_willow', 'Dark Willow', 'http://www.dota2.com.cn/images/heroes/dark_willow_full.png', 'http://www.dota2.com.cn/images/heroes/dark_willow_vert.jpg');
INSERT INTO `hero` VALUES ('120', 'npc_dota_hero_pangolier', 'Pangolier', 'http://www.dota2.com.cn/images/heroes/pangolier_full.png', 'http://www.dota2.com.cn/images/heroes/pangolier_vert.jpg');
