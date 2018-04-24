package com.xgt.dao.entity.dota;

import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.List;

/**
 * Created by hasee on 2018/4/19.
 */
public class MatchDetail {
    List<Players> players;
    //Dictates the winner of the match, true for radiant; false for dire.
    private Boolean radiant_win;
    //The length of the match, in seconds since the match began.
    private Integer duration;

    private Integer pre_game_duration;
    //Unix timestamp of when the match began.
    private Long start_time;

    private String string_start_time;
    //The matches unique ID.
    private Long match_id;
    //A 'sequence number', representing the order in which matches were recorded.
    private Long match_seq_num;
    /**
     *
     A particular teams tower status is given as a 16-bit unsigned integer. The rightmost 11 bits represent individual towers belonging to that team; see below for a visual representation.

     ┌─┬─┬─┬─┬─────────────────────── Not used.
     │ │ │ │ │ ┌───────────────────── Ancient Bottom
     │ │ │ │ │ │ ┌─────────────────── Ancient Top
     │ │ │ │ │ │ │ ┌───────────────── Bottom Tier 3
     │ │ │ │ │ │ │ │ ┌─────────────── Bottom Tier 2
     │ │ │ │ │ │ │ │ │ ┌───────────── Bottom Tier 1
     │ │ │ │ │ │ │ │ │ │ ┌─────────── Middle Tier 3
     │ │ │ │ │ │ │ │ │ │ │ ┌───────── Middle Tier 2
     │ │ │ │ │ │ │ │ │ │ │ │ ┌─────── Middle Tier 1
     │ │ │ │ │ │ │ │ │ │ │ │ │ ┌───── Top Tier 3
     │ │ │ │ │ │ │ │ │ │ │ │ │ │ ┌─── Top Tier 2
     │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ ┌─ Top Tier 1
     │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │
     0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

     */
    private Integer tower_status_radiant;

    private Integer tower_status_dire;
    /**
     *
     A particular teams tower status is given as an 8-bit unsigned integer. The rightmost 6 bits represent the barracks belonging to that team; see below for a visual representation.

     ┌─┬───────────── Not used.
     │ │ ┌─────────── Bottom Ranged
     │ │ │ ┌───────── Bottom Melee
     │ │ │ │ ┌─────── Middle Ranged
     │ │ │ │ │ ┌───── Middle Melee
     │ │ │ │ │ │ ┌─── Top Ranged
     │ │ │ │ │ │ │ ┌─ Top Melee
     │ │ │ │ │ │ │ │
     0 0 0 0 0 0 0 0

     */
    private Integer barracks_status_radiant;

    private Integer barracks_status_dire;
    //The server cluster the match was played upon. Used for downloading replays of matches.
    private Integer cluster;
    //The time in seconds since the match began when first-blood occurred.
    private Long first_blood_time;
    /**
     *
     0 - Public matchmaking
     1 - Practise
     2 - Tournament
     3 - Tutorial
     4 - Co-op with bots.
     5 - Team match
     6 - Solo Queue
     7 - Ranked
     8 - 1v1 Mid
     */
    private Integer lobby_type;
    //The amount of human players within the match.
    private Integer human_players;
    //The league that this match was a part of. A list of league IDs can be found via the GetLeagueListing method.
    private Integer leagueid;
    //The number of thumbs-up the game has received by users.
    private Integer positive_votes;
    //The number of thumbs-down the game has received by users.
    private Integer negative_votes;
    /**
     *
     0 - None
     1 - All Pick
     2 - Captain's Mode
     3 - Random Draft
     4 - Single Draft
     5 - All Random
     6 - Intro
     7 - Diretide
     8 - Reverse Captain's Mode
     9 - The Greeviling
     10 - Tutorial
     11 - Mid Only
     12 - Least Played
     13 - New Player Pool
     14 - Compendium Matchmaking
     15 - Co-op vs Bots
     16 - Captains Draft
     18 - Ability Draft
     20 - All Random Deathmatch
     21 - 1v1 Mid Only
     22 - Ranked Matchmaking
     */
    private Integer game_mode;

    private Integer flags;

    private Integer engine;
    /**
     *
     0 - Source 1
     1 - Source 2
     */
    private Integer radiant_score;

    private Integer dire_score;

    public List<Players> getPlayers() {
        return players;
    }

    public void setPlayers(List<Players> players) {
        this.players = players;
    }

    public Boolean getRadiant_win() {
        return radiant_win;
    }

    public void setRadiant_win(Boolean radiant_win) {
        this.radiant_win = radiant_win;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getPre_game_duration() {
        return pre_game_duration;
    }

    public void setPre_game_duration(Integer pre_game_duration) {
        this.pre_game_duration = pre_game_duration;
    }

    public Long getStart_time() {
        return start_time;
    }

    public void setStart_time(Long start_time) {
        this.start_time = start_time;
    }

    public Long getMatch_id() {
        return match_id;
    }

    public void setMatch_id(Long match_id) {
        this.match_id = match_id;
    }

    public Long getMatch_seq_num() {
        return match_seq_num;
    }

    public void setMatch_seq_num(Long match_seq_num) {
        this.match_seq_num = match_seq_num;
    }

    public Integer getTower_status_radiant() {
        return tower_status_radiant;
    }

    public void setTower_status_radiant(Integer tower_status_radiant) {
        this.tower_status_radiant = tower_status_radiant;
    }

    public Integer getTower_status_dire() {
        return tower_status_dire;
    }

    public void setTower_status_dire(Integer tower_status_dire) {
        this.tower_status_dire = tower_status_dire;
    }

    public Integer getBarracks_status_radiant() {
        return barracks_status_radiant;
    }

    public void setBarracks_status_radiant(Integer barracks_status_radiant) {
        this.barracks_status_radiant = barracks_status_radiant;
    }

    public Integer getBarracks_status_dire() {
        return barracks_status_dire;
    }

    public void setBarracks_status_dire(Integer barracks_status_dire) {
        this.barracks_status_dire = barracks_status_dire;
    }

    public Integer getCluster() {
        return cluster;
    }

    public void setCluster(Integer cluster) {
        this.cluster = cluster;
    }

    public Long getFirst_blood_time() {
        return first_blood_time;
    }

    public void setFirst_blood_time(Long first_blood_time) {
        this.first_blood_time = first_blood_time;
    }

    public Integer getLobby_type() {
        return lobby_type;
    }

    public void setLobby_type(Integer lobby_type) {
        this.lobby_type = lobby_type;
    }

    public Integer getHuman_players() {
        return human_players;
    }

    public void setHuman_players(Integer human_players) {
        this.human_players = human_players;
    }

    public Integer getLeagueid() {
        return leagueid;
    }

    public void setLeagueid(Integer leagueid) {
        this.leagueid = leagueid;
    }

    public Integer getPositive_votes() {
        return positive_votes;
    }

    public void setPositive_votes(Integer positive_votes) {
        this.positive_votes = positive_votes;
    }

    public Integer getNegative_votes() {
        return negative_votes;
    }

    public void setNegative_votes(Integer negative_votes) {
        this.negative_votes = negative_votes;
    }

    public Integer getGame_mode() {
        return game_mode;
    }

    public void setGame_mode(Integer game_mode) {
        this.game_mode = game_mode;
    }

    public Integer getFlags() {
        return flags;
    }

    public void setFlags(Integer flags) {
        this.flags = flags;
    }

    public Integer getEngine() {
        return engine;
    }

    public void setEngine(Integer engine) {
        this.engine = engine;
    }

    public Integer getRadiant_score() {
        return radiant_score;
    }

    public void setRadiant_score(Integer radiant_score) {
        this.radiant_score = radiant_score;
    }

    public Integer getDire_score() {
        return dire_score;
    }

    public void setDire_score(Integer dire_score) {
        this.dire_score = dire_score;
    }

    public String getString_start_time() {
        return string_start_time;
    }

    public void setString_start_time(String string_start_time) {
        this.string_start_time = string_start_time;
    }
}
