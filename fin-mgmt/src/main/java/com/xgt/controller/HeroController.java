package com.xgt.controller;

import com.xgt.bean.dota.HeroBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.dota.HeroService;
import org.jboss.resteasy.annotations.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Map;


/**
 * Created by Administrator on 2017/8/21.
 */
@Controller
@Path("/hero")
public class HeroController extends BaseController {
    @Autowired
    HeroService heroService;

    /**
     * 遍历所有
     * @return
     */
    @GET
    @Path("queryHero")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="hero:queryHero")
    public PcsResult queryHero(@Query HeroBean heroBean){
        Map map = heroService.queryHero(heroBean);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }

}
