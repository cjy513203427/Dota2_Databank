package com.xgt.controller;

import com.xgt.bean.dota.ItemBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.dota.Item;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.dota.ItemService;
import org.jboss.resteasy.annotations.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Map;

/**
 * Created by hasee on 2018/1/4.
 */
@Controller
@Path("/item")
public class ItemController extends BaseController{
    @Autowired
    ItemService itemService;

    /**
     * 遍历所有
     * @return
     */
    @GET
    @Path("queryItem")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="item:queryItem")
    public PcsResult queryHero(@Query ItemBean itemBean){
        Map map = itemService.queryItem(itemBean);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }

    @GET
    @Path("queryChineseNameItem")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="item:queryChineseNameItemForUpgrated")
    public PcsResult queryChineseNameItemForUpgrated(@QueryParam("upgratedItem") Integer upgratedItem){
        Map map = itemService.queryChineseNameItem(upgratedItem);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }

    @GET
    @Path("queryItemCompound")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="item:queryItemCompound")
    public PcsResult queryItemCompound(@QueryParam("itemId") Integer itemId){
        Map map = itemService.queryItemCompound(itemId);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }

    @GET
    @Path("queryItemFather")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="item:queryItemFather")
    public PcsResult queryItemFather(@QueryParam("itemId") Integer itemId){
        Map map = itemService.queryItemFather(itemId);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }

    @GET
    @Path("getItemById")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="item:getItemById")
    public PcsResult getItemById(@QueryParam("itemId") Integer itemId){
        Map map = itemService.getItemById(itemId);
        if(map.size()==0){
            return newResult(false).setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
        }else {
            return newResult(true).setData(map);
        }
    }


}
