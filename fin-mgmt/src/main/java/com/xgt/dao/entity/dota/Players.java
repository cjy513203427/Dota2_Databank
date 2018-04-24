package com.xgt.dao.entity.dota;

/**
 * Created by hasee on 2018/4/20.
 * players for matchDetail
 */
public class Players {
    //Dota2 Steam id
    private Long account_id;
    /**
     *
     ┌─────────────── Team (false if Radiant, true if Dire).
     │ ┌─┬─┬─┬─────── Not used.
     │ │ │ │ │ ┌─┬─┬─ The position of a player within their team (0-4).
     │ │ │ │ │ │ │ │
     0 0 0 0 0 0 0 0
     */
    private Integer player_slot;
    //The hero's unique ID. A list of hero IDs can be found via the GetHeroes method.
    private Integer hero_id;
    //ID of the top-left inventory item.
    private Integer item_0;
    //ID of the top-center inventory item.
    private Integer item_1;
    //ID of the top-right inventory item.
    private Integer item_2;
    //ID of the bottom-left inventory item.
    private Integer item_3;
    //ID of the bottom-center inventory item.
    private Integer item_4;
    //ID of the bottom-right inventory item.
    private Integer item_5;

    private String heroPath;

    private String itemPath0;

    private String itemPath1;

    private String itemPath2;

    private String itemPath3;

    private String itemPath4;

    private String itemPath5;
    //背包
    private Integer backpack_0;

    private Integer backpack_1;

    private Integer backpack_2;

    private Integer kills;

    private Integer deaths;

    private Integer assists;
    /**
     *
     0 - NONE - finished match, no abandon.
     1 - DISCONNECTED - player DC, no abandon.
     2 - DISCONNECTED_TOO_LONG - player DC > 5min, abandoned.
     3 - ABANDONED - player DC, clicked leave, abandoned.
     4 - AFK - player AFK, abandoned.
     5 - NEVER_CONNECTED - player never connected, no abandon.
     6 - NEVER_CONNECTED_TOO_LONG - player took too long to connect, no abandon.
     */
    private Integer leaver_status;
    //The amount of last-hits the player got during the match.
    private Integer last_hits;
    //The amount of denies the player got during the match.
    private Integer denies;

    private Integer gold_per_min;

    private Integer xp_per_min;

    private Integer level;

    private Integer hero_damage;

    private Integer tower_damage;

    private Integer hero_healing;

    private Integer gold;

    private Integer gold_spent;

    private Integer scaled_hero_damage;

    private Integer scaled_tower_damage;

    private Integer scaled_hero_healing;

    public Long getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Long account_id) {
        this.account_id = account_id;
    }

    public Integer getPlayer_slot() {
        return player_slot;
    }

    public void setPlayer_slot(Integer player_slot) {
        this.player_slot = player_slot;
    }

    public Integer getHero_id() {
        return hero_id;
    }

    public void setHero_id(Integer hero_id) {
        this.hero_id = hero_id;
    }

    public Integer getItem_0() {
        return item_0;
    }

    public void setItem_0(Integer item_0) {
        this.item_0 = item_0;
    }

    public Integer getItem_1() {
        return item_1;
    }

    public void setItem_1(Integer item_1) {
        this.item_1 = item_1;
    }

    public Integer getItem_2() {
        return item_2;
    }

    public void setItem_2(Integer item_2) {
        this.item_2 = item_2;
    }

    public Integer getItem_3() {
        return item_3;
    }

    public void setItem_3(Integer item_3) {
        this.item_3 = item_3;
    }

    public Integer getItem_4() {
        return item_4;
    }

    public void setItem_4(Integer item_4) {
        this.item_4 = item_4;
    }

    public Integer getItem_5() {
        return item_5;
    }

    public void setItem_5(Integer item_5) {
        this.item_5 = item_5;
    }

    public Integer getBackpack_0() {
        return backpack_0;
    }

    public void setBackpack_0(Integer backpack_0) {
        this.backpack_0 = backpack_0;
    }

    public Integer getBackpack_1() {
        return backpack_1;
    }

    public void setBackpack_1(Integer backpack_1) {
        this.backpack_1 = backpack_1;
    }

    public Integer getBackpack_2() {
        return backpack_2;
    }

    public void setBackpack_2(Integer backpack_2) {
        this.backpack_2 = backpack_2;
    }

    public Integer getKills() {
        return kills;
    }

    public void setKills(Integer kills) {
        this.kills = kills;
    }

    public Integer getDeaths() {
        return deaths;
    }

    public void setDeaths(Integer deaths) {
        this.deaths = deaths;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getLeaver_status() {
        return leaver_status;
    }

    public void setLeaver_status(Integer leaver_status) {
        this.leaver_status = leaver_status;
    }

    public Integer getLast_hits() {
        return last_hits;
    }

    public void setLast_hits(Integer last_hits) {
        this.last_hits = last_hits;
    }

    public Integer getDenies() {
        return denies;
    }

    public void setDenies(Integer denies) {
        this.denies = denies;
    }

    public Integer getGold_per_min() {
        return gold_per_min;
    }

    public void setGold_per_min(Integer gold_per_min) {
        this.gold_per_min = gold_per_min;
    }

    public Integer getXp_per_min() {
        return xp_per_min;
    }

    public void setXp_per_min(Integer xp_per_min) {
        this.xp_per_min = xp_per_min;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getHero_damage() {
        return hero_damage;
    }

    public void setHero_damage(Integer hero_damage) {
        this.hero_damage = hero_damage;
    }

    public Integer getTower_damage() {
        return tower_damage;
    }

    public void setTower_damage(Integer tower_damage) {
        this.tower_damage = tower_damage;
    }

    public Integer getHero_healing() {
        return hero_healing;
    }

    public void setHero_healing(Integer hero_healing) {
        this.hero_healing = hero_healing;
    }

    public Integer getGold() {
        return gold;
    }

    public void setGold(Integer gold) {
        this.gold = gold;
    }

    public Integer getGold_spent() {
        return gold_spent;
    }

    public void setGold_spent(Integer gold_spent) {
        this.gold_spent = gold_spent;
    }

    public Integer getScaled_hero_damage() {
        return scaled_hero_damage;
    }

    public void setScaled_hero_damage(Integer scaled_hero_damage) {
        this.scaled_hero_damage = scaled_hero_damage;
    }

    public Integer getScaled_tower_damage() {
        return scaled_tower_damage;
    }

    public void setScaled_tower_damage(Integer scaled_tower_damage) {
        this.scaled_tower_damage = scaled_tower_damage;
    }

    public Integer getScaled_hero_healing() {
        return scaled_hero_healing;
    }

    public void setScaled_hero_healing(Integer scaled_hero_healing) {
        this.scaled_hero_healing = scaled_hero_healing;
    }

    public String getItemPath0() {
        return itemPath0;
    }

    public void setItemPath0(String itemPath0) {
        this.itemPath0 = itemPath0;
    }

    public String getItemPath1() {
        return itemPath1;
    }

    public void setItemPath1(String itemPath1) {
        this.itemPath1 = itemPath1;
    }

    public String getItemPath2() {
        return itemPath2;
    }

    public void setItemPath2(String itemPath2) {
        this.itemPath2 = itemPath2;
    }

    public String getItemPath3() {
        return itemPath3;
    }

    public void setItemPath3(String itemPath3) {
        this.itemPath3 = itemPath3;
    }

    public String getItemPath4() {
        return itemPath4;
    }

    public void setItemPath4(String itemPath4) {
        this.itemPath4 = itemPath4;
    }

    public String getItemPath5() {
        return itemPath5;
    }

    public void setItemPath5(String itemPath5) {
        this.itemPath5 = itemPath5;
    }

    public String getHeroPath() {
        return heroPath;
    }

    public void setHeroPath(String heroPath) {
        this.heroPath = heroPath;
    }
}
