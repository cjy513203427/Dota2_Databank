package com.xgt.controller;

import com.xgt.bean.dota.TalentBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.dota.TalentService;
import org.jboss.resteasy.annotations.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Map;

/**
 * Created by hasee on 2018/1/27.
 */
@Controller
@Path("talent")
public class TalentController extends BaseController{
    @Autowired
    TalentService talentService;

    /**
     * 遍历所有
     * @return
     */
    @GET
    @Path("queryTalent")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="hero:queryHero")
    public PcsResult queryTalent(@Query TalentBean talentBean){
        Map map = talentService.queryTalent(talentBean);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }
}
