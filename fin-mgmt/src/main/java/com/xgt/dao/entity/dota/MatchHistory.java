package com.xgt.dao.entity.dota;

import java.util.List;

/**
 * Created by hasee on 2018/4/18.
 */
public class MatchHistory {
    //The matches unique ID.
    private long match_id;
    //A 'sequence number', representing the order in which matches were recorded.
    private long match_seq_num;
    //Unix timestamp of when the match began.
    private long start_time;

    private String string_start_time;
    /**
     * -
     0 - Public matchmaking
     1 - Practise
     2 - Tournament
     3 - Tutorial
     4 - Co-op with bots.
     5 - Team match
     6 - Solo Queue
     7 - Ranked Matchmaking
     8 - 1v1 Solo Mid
     */
    private Integer lobby_type;

    private Integer radiant_team_id;

    private Integer dire_team_id;

    private List<Player> players;

    public long getMatch_id() {
        return match_id;
    }

    public void setMatch_id(long match_id) {
        this.match_id = match_id;
    }

    public Long getMatch_seq_num() {
        return match_seq_num;
    }

    public void setMatch_seq_num(Long match_seq_num) {
        this.match_seq_num = match_seq_num;
    }

    public long getStart_time() {
        return start_time;
    }

    public void setStart_time(long start_time) {
        this.start_time = start_time;
    }

    public Integer getLobby_type() {
        return lobby_type;
    }

    public void setLobby_type(Integer lobby_type) {
        this.lobby_type = lobby_type;
    }

    public Integer getRadiant_team_id() {
        return radiant_team_id;
    }

    public void setRadiant_team_id(Integer radiant_team_id) {
        this.radiant_team_id = radiant_team_id;
    }

    public Integer getDire_team_id() {
        return dire_team_id;
    }

    public void setDire_team_id(Integer dire_team_id) {
        this.dire_team_id = dire_team_id;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public void setMatch_seq_num(long match_seq_num) {
        this.match_seq_num = match_seq_num;
    }

    public String getString_start_time() {
        return string_start_time;
    }

    public void setString_start_time(String string_start_time) {
        this.string_start_time = string_start_time;
    }
}
