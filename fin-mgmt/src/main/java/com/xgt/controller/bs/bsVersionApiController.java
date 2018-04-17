package com.xgt.controller.bs;

import com.xgt.bean.bs.VersionBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.bs.Version;
import com.xgt.service.bs.VersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Administrator on 2017/9/7.
 */
@Controller
@Path("/bsVersionApi")
public class bsVersionApiController extends BaseController {
    @Autowired
    private VersionService versionService;

    @GET
    @Path("/queryVersionInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult queryVersionInfo(@QueryParam("accessToken") String accessToken) {
        List<Version> list= versionService.queryVersionInfo();
        if(list.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(list);
    }

    @GET
    @Path("/queryConfigurationFile")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult queryConfigurationFile(@QueryParam("accessToken") String accessToken,@QueryParam("userId") Integer userId) {
        VersionBean versionBean = new VersionBean();
        versionBean.setUserId(userId);
        List<Version> list = versionService.queryConfigurationFile(versionBean);
        return newResult(true).setData(list);
    }

    @GET
    @Path("/querySystemConfig")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult querySystemConfig(@QueryParam("accessToken") String accessToken) {
        VersionBean versionBean = new VersionBean();
        List<Version> list = versionService.querySystemConfig(versionBean);
        return newResult(true).setData(list);
    }

    @POST
    @Path("/insertVersion")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult insertVersion(@FormParam("accessToken") String accessToken,
                                            @FormParam("versionName") String versionName, @FormParam("versionUrl") String versionUrl) {
        try {
            VersionBean versionBean = new VersionBean();
            versionBean.setVersionName(versionName);
            versionBean.setVersionUrl(versionUrl);
            versionService.insertVersion(versionBean);
        }catch (Exception e){
            e.printStackTrace();
        }
        return newResult();
    }

}
