package com.xgt.controller;

import com.xgt.bean.dota.PlayersBean;
import com.xgt.common.BaseController;
import com.xgt.dao.entity.dota.MatchDetail;
import com.xgt.dao.entity.dota.MatchHistory;
import com.xgt.dao.entity.dota.Players;
import com.xgt.service.dota.MatchDetailPlayersService;
import com.xgt.util.DateUtil;
import com.xgt.util.GsonUtil;
import com.xgt.util.URLUtil;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by hasee on 2018/4/18.
 */
@Controller
@Path("/match")
public class DOTA2MatchController extends BaseController{
    @Autowired
    MatchDetailPlayersService matchDetailPlayersService;

    @GET
    @Path("getMatchHistory")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="match:getMatchHistory")
    public Map<String,Object> getMatchHistory(@QueryParam("account_id") Long account_id) throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String jsonArray = "";
        if (account_id == null || account_id .equals("")) {
            jsonArray = URLUtil.getUrlForMatchHistory("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=" + steamKey + "&account_id=" + 191017855);
        }else{
            jsonArray = URLUtil.getUrlForMatchHistory("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=" + steamKey + "&account_id=" + account_id);
        }
        List<MatchHistory> matchHistories = GsonUtil.getObjectList(jsonArray,MatchHistory.class);
        for (MatchHistory matchHistory:matchHistories){
            String startTime = String.valueOf(matchHistory.getStart_time());
            String normalStartTime = DateUtil.TimeStamp2Date(startTime);
            matchHistory.setString_start_time(normalStartTime);
        }
        Map<String,Object> data = new HashedMap();
        modelMap.put("data",data);
        data.put("list",matchHistories);
        data.put("total",matchHistories.size());
        modelMap.put("success",true);
        return modelMap;
    }

    @GET
    @Path("getMatchDetail")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="match:getMatchDetails")
    public Map<String,Object> getMatchDetails(@QueryParam("match_id") Long match_id) throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String jsonArray = "";
        if (match_id == null || match_id .equals("")) {
            jsonArray = URLUtil.getUrlForMatchDetail("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=" + steamKey + "&match_id=" + "3839053706");
        }else{
            jsonArray = URLUtil.getUrlForMatchDetail("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=" + steamKey + "&match_id=" + match_id);
        }
        List<MatchDetail> matchDetails = GsonUtil.getObjectList(jsonArray,MatchDetail.class);
        for (MatchDetail matchDetail:matchDetails){
            String startTime = String.valueOf(matchDetail.getStart_time());
            String normalStartTime = DateUtil.TimeStamp2Date(startTime);
            matchDetail.setString_start_time(normalStartTime);
        }
        Map<String,Object> data = new HashedMap();
        modelMap.put("data",data);
        data.put("list",matchDetails);
        data.put("total",matchDetails.size());
        modelMap.put("success",true);
        return modelMap;
    }

    @GET
    @Path("getMatchDetailPlayers")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="match:getMatchDetailPlayers")
    public Map<String,Object> getMatchDetailPlayers(@QueryParam("match_id") Long match_id) throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String jsonArray = URLUtil.getUrlForMatchDetailPlayers("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=" + steamKey + "&match_id=" + match_id);

        List<Players> players = GsonUtil.getObjectList(jsonArray,Players.class);
        PlayersBean playersBean = new PlayersBean();

        if(matchDetailPlayersService.ifMatchIdExists(match_id)==0) {
        for(Players player:players){
            playersBean.setAccount_id(player.getAccount_id());
            playersBean.setPlayer_slot(player.getPlayer_slot());
            playersBean.setHero_id(player.getHero_id());
            if(player.getItem_0()==0){
                playersBean.setItem_0(1027);
            }else {
                playersBean.setItem_0(player.getItem_0());
            }
            if(player.getItem_1()==0){
                playersBean.setItem_1(1027);
            }else {
                playersBean.setItem_1(player.getItem_1());
            }
            if(player.getItem_2()==0){
                playersBean.setItem_2(1027);
            }else {
                playersBean.setItem_2(player.getItem_2());
            }
            if(player.getItem_3()==0){
                playersBean.setItem_3(1027);
            }else {
                playersBean.setItem_3(player.getItem_3());
            }
            if(player.getItem_4()==0){
                playersBean.setItem_4(1027);
            }else {
                playersBean.setItem_4(player.getItem_4());
            }
            if(player.getItem_5()==0){
                playersBean.setItem_5(1027);
            }else {
                playersBean.setItem_5(player.getItem_5());
            }
            playersBean.setBackpack_0(player.getBackpack_0());
            playersBean.setBackpack_1(player.getBackpack_1());
            playersBean.setBackpack_2(player.getBackpack_2());
            playersBean.setKills(player.getKills());
            playersBean.setDeaths(player.getDeaths());
            playersBean.setAssists(player.getAssists());
            playersBean.setLeaver_status(player.getLeaver_status());
            playersBean.setLast_hits(player.getLast_hits());
            playersBean.setDenies(player.getDenies());
            playersBean.setGold_per_min(player.getGold_per_min());
            playersBean.setXp_per_min(player.getXp_per_min());
            playersBean.setLevel(player.getLevel());
            playersBean.setHero_damage(player.getHero_damage());
            playersBean.setTower_damage(player.getTower_damage());
            playersBean.setHero_healing(player.getHero_healing());
            playersBean.setGold(player.getGold());
            playersBean.setGold_spent(player.getGold_spent());
            playersBean.setScaled_hero_damage(player.getScaled_hero_damage());
            playersBean.setScaled_tower_damage(player.getTower_damage());
            playersBean.setScaled_hero_healing(player.getScaled_hero_healing());
            playersBean.setMatch_id(match_id);

            matchDetailPlayersService.importMatchDetailPlayersFromSteamAPI(playersBean);
        }
        }
        Map<String,Object> data = new HashedMap();
        List<Players> newPlayers = matchDetailPlayersService.queryMatchDetailPlayers(match_id);
        modelMap.put("data",data);
        data.put("list",newPlayers);
        data.put("total",newPlayers.size());
        modelMap.put("success",true);
        return modelMap;
    }

}
