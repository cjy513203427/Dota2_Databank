package com.xgt.dao.entity.dota;

/**
 * Created by hasee on 2018/4/18.
 * Player for MatchHistory
 */
public class Player {
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

    private Integer hero_id;

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
}
