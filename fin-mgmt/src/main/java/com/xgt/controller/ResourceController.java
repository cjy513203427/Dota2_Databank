package com.xgt.controller;

import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.Resource;
import com.xgt.service.ResourceService;
import com.xgt.util.JSONUtil;
import org.jboss.resteasy.annotations.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Author: CC
 * Date: 2016/9/9
 * Desc:
 */
@Controller
@Path("resource")
public class ResourceController extends BaseController {

    @Autowired
    private ResourceService resourceService;

    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult resourceList() {
        List<Resource> list = resourceService.getResources();
        return newResult().setData(list);
    }


    @GET
    @Path("treelist")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult resourceTreeList(@QueryParam("roleId") Integer roleId) {
        List<Resource> list = resourceService.getResourcesTree(roleId);
        return newResult().setData(list);
    }

    @GET
    @Path("menu")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult menuList() {
        List<Resource> list = resourceService.getMenuResources();
        return newResult().setData(JSONUtil.filterIncludeProperties(list, Resource.class,
                "id", "text", "type", "url", "iconCls", "iconCls", "parentId", "status", "leaf", "children"));
    }

    @GET
    @Path("button")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult buttonList(@QueryParam("resourceId")Integer resourceId) {
        Assert.notNull(resourceId,"resourceId不能为空");
        List<Resource> list = resourceService.getButtonResources(resourceId);
        return newResult().setData(list);
    }

    @POST
    @Path("insert")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult insert(@Form Resource resource) {
        resourceService.insertResource(resource);
        return newResult().setData(resource);
    }

    @POST
    @Path("update")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult update(@Form Resource resource) {
        resourceService.updateResource(resource);
        return newResult();
    }

    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult insert(@FormParam("resourceId") Integer resourceId) {
        Assert.notNull(resourceId,"resourceId不能为空");
        resourceService.deleteResource(resourceId);
        return newResult();
    }


}
