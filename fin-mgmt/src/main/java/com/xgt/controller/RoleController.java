package com.xgt.controller;

import com.xgt.bean.RoleBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.RoleService;
import com.xgt.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Map;

/**
 * User: lb on 2016/9/2.
 * Date:2016-09-02-15:23
 * desc：
 */
@Controller
@Path("/role")
public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;

    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult roleList(@QueryParam("pageIndex") Integer pageIndex, @QueryParam("pageSize") Integer pageSize) {
        Map<String, Object> map = roleService.selectAllRole(pageIndex, pageSize);
        return newResult().setData(map);
    }

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult addRole(@FormParam("name") String name,@FormParam("status") Integer status,
                             @FormParam("description")String description,@FormParam("permissions")String permissions) {
        RoleBean roleBean=new RoleBean();
        roleBean.setName(name);
        roleBean.setDescription(description);
        roleBean.setStatus(status);
        roleBean.setPermissions(permissions);
        roleBean.setCreateTime(DateUtil.getCurrentTime());
        RoleBean role=roleService.isExistRole(roleBean);
        if(role!=null){
            return failedResult(EnumPcsServiceError.BUSINESS_ROLE_EXISTED);
        }
        roleService.addRole(roleBean);
        return newResult();
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult deleteRole(@FormParam("roleIds") Integer[] roleIds) {
        Assert.notNull(roleIds,"用户ID不能为空");
        roleService.deleteRole(roleIds);
        return newResult();
    }

    @POST
    @Path("/update")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult updateRole(@FormParam("name") String name,@FormParam("status") Integer status,
                                @FormParam("description")String description,@FormParam("permissions")String permissions,
                                @FormParam("id") String id) {
        Assert.notNull(id,"用户ID不能为空");
        if(name!=null&& (!name.equals(""))){
            RoleBean role=new RoleBean();
            role.setName(name);
            RoleBean role2=roleService.isExistRole(role);
            if(role2!=null){
                return failedResult(EnumPcsServiceError.BUSINESS_ROLE_EXISTED);
            }
        }
        RoleBean roleBean=new RoleBean();
        roleBean.setName(name);
        roleBean.setDescription(description);
        roleBean.setStatus(status);
        roleBean.setPermissions(permissions);
        roleBean.setId(id);
        roleService.updateRole(roleBean);
        return newResult();
    }


}
