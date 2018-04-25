package com.xgt.controller;

import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.dota.HeroBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.dota.HeroService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.annotations.Form;
import org.jboss.resteasy.annotations.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
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

    @POST
    @Path("modifyHero")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "hero:modifyHero")
    public PcsResult modifyHero(@FormParam("id") Integer id,@FormParam("localizedName") String localizedName) {
        try {
            HeroBean heroBean = new HeroBean();
            heroBean.setId(id);
            heroBean.setLocalizedName(localizedName);
            heroService.modifyHero(heroBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.PARAM_INVALID.getCode()).setMessage(EnumPcsServiceError.PARAM_INVALID.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

}
