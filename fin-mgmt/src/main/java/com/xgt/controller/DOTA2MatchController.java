package com.xgt.controller;

import com.xgt.common.BaseController;
import com.xgt.dao.entity.dota.MatchDetail;
import com.xgt.dao.entity.dota.MatchHistory;
import com.xgt.util.DateUtil;
import com.xgt.util.GsonUtil;
import com.xgt.util.URLUtil;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
    @GET
    @Path("getMatchHistory")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="match:getMatchHistory")
    public Map<String,Object> getMatchHistory() throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String jsonArray = URLUtil.getUrlForMatchHistory("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key="+steamKey);
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
    public Map<String,Object> getMatchDetails() throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String jsonArray = URLUtil.getUrlForMatchDetail("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=B914590BCC453C590109B381504042A7&match_id=3838937304");
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

}
