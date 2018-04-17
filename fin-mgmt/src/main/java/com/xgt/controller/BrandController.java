package com.xgt.controller;

import com.xgt.bean.UserBean;
import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.User;
import com.xgt.dao.entity.bs.Brand;
import com.xgt.dao.entity.bs.Photo;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.bs.BrandService;
import io.swagger.models.auth.In;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.annotations.Form;
import org.jboss.resteasy.annotations.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/21.
 */
@Controller
@Path("/brand")
public class BrandController extends BaseController {
    @Autowired
    BrandService brandService;

    /**
     * 品牌申请（已废弃）
     * @param userId
     * @return
     */
    @POST
    @Path("approveBrandApplication")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "brand:approveBrandApplication")
    public PcsResult approveBrandApplication(@FormParam("userId") Integer userId) {
        try {
            BrandBean brandBean = new BrandBean();
            brandBean.setUserId(userId);
            brandService.approveBrandApplication(brandBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.PARAM_INVALID.getCode()).setMessage(EnumPcsServiceError.PARAM_INVALID.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    /**
     * 遍历未被批准的品牌
     * 品牌申请时使用，已废弃
     * @param userId
     * @return
     */

    @GET
    @Path("queryUserBrandNotAllowed")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value="brand:queryUserBrandNotAllowed")
    public PcsResult queryPersonalSettings(@QueryParam("userId") String userId) {
        UserBean userBean = new UserBean();
        userBean.setUserId(userId);
        Map map= brandService.queryUserBrandNotAllowed(userBean);
        if(map.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(map);
    }

    /**
     * 查询用户已分配的品牌
     * @param userId
     * @return
     */
    @GET
    @Path("queryUserBrand")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="brand:queryUserBrand")
    public PcsResult queryUserBrand(@QueryParam("userId") String userId) {
        UserBean userBean = new UserBean();
        userBean.setUserId(String.valueOf(getLoginUserId()));
        List<Brand> list= brandService.queryUserBrand(userBean);
        if(list.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(list);
    }

    /**
     * 遍历所有品牌
     * @param brandBean
     * @return
     */
    @GET
    @Path("queryAllBrand")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value="brand:queryAllBrand")
    public PcsResult queryAllBrand(@Query BrandBean brandBean) {
        Map map= brandService.queryAllBrand(brandBean);
        if(map.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(map);
    }

    /**
     * 分配品牌
     * @param userId
     * @param brandId
     * @return
     */
    @POST
    @Path("distributeBrand")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value = "brand:distributeBrand")
    public PcsResult distributeBrand(@FormParam("userId") Integer userId,@FormParam("brandId") Integer brandId) {
        try {
            BrandBean brandBean = new BrandBean();
            brandBean.setUserId(userId);
            brandBean.setBrandId(brandId);
            brandService.approveBrandApplication(brandBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.PARAM_INVALID.getCode()).setMessage(EnumPcsServiceError.PARAM_INVALID.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    /**
     * 获取userId的所有brandId
     * @param userId
     * @return
     */
    @GET
    @Path("/getUserBrand")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value = "brand:getUserBrand")
    public PcsResult getUserBrand(@QueryParam("userId") String userId) {
        List<Integer> brandList=brandService.getUserBrand(userId);
        return newResult().setData(brandList);
    }

    /**
     * 更新user_brand表
     * @param userId
     * @param brandIdList
     * @return
     */
    @POST
    @Path("/updateUserBrand")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "brand:updateUserBrand")
    public PcsResult updateUserRole(@FormParam("userId") Integer userId,@FormParam("brandId") List<Integer> brandIdList) {
        Assert.notNull(userId,"参数错误，请联系管理员");
        BrandBean brandBean=new BrandBean();
        brandBean.setBrandIds(brandIdList);
        brandBean.setUserId(userId);
        brandService.updateUserBrand(brandBean);
        return newResult();
    }

    /**
     * 删除品牌
     * @param id
     * @return
     */
    @POST
    @Path("/deleteBrand")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "brand:deleteBrand")
    public PcsResult deleteBrand(@FormParam("id") Integer id) {
        Assert.notNull(id,"参数错误，请联系管理员");
        BrandBean brandBean=new BrandBean();
        brandBean.setId(id);
        brandService.deleteBrand(brandBean);
        return newResult();
    }

    @POST
    @Path("/addBrand")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "brand:addBrand")
    public PcsResult addBrand(@FormParam("name") String name) {
        Assert.notNull(name,"参数错误，请联系管理员");
        BrandBean brandBean=new BrandBean();
        brandBean.setName(name);
        brandBean.setUserId(getLoginUserId());
        brandService.addBrand(brandBean);
        return newResult();
    }

    @POST
    @Path("/modifyBrand")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "brand:modifyBrand")
    public PcsResult modifyBrand(@FormParam("id") Integer id,@FormParam("name") String name) {
        Assert.notNull(id,"参数错误，请联系管理员");
        BrandBean brandBean=new BrandBean();
        brandBean.setId(id);
        brandBean.setName(name);
        brandService.modifyBrand(brandBean);
        return newResult();
    }

    @POST
    @Path("/modifyBrandId")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "brand:modifyBrandId")
    public PcsResult modifyBrandId(@FormParam("id") Integer id,@FormParam("brandId") Integer brandId) {
        Assert.notNull(id,"参数错误，请联系管理员");
        PhotoBean photoBean=new PhotoBean();
        photoBean.setId(String.valueOf(id));
        photoBean.setBrandId(brandId);
        brandService.modifyBrandId(photoBean);
        return newResult();
    }

}
