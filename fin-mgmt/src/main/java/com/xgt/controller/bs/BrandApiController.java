package com.xgt.controller.bs;

import com.xgt.bean.UserBean;
import com.xgt.bean.bs.BrandBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.User;
import com.xgt.dao.entity.bs.Brand;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.bs.BrandService;
import io.swagger.models.auth.In;
import org.jboss.resteasy.annotations.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Administrator on 2017/8/21.
 */
@Controller
@Path("/brandApi")
public class BrandApiController extends BaseController {
    @Autowired
    BrandService brandService;

    /**
     * 品牌申请，未使用
     * @param accessToken
     * @param brandId
     * @param userId
     * @return
     */
    @POST
    @Path("brandApplication")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult brandApplication(@FormParam("accessToken") String accessToken, @FormParam("brandId") Integer brandId,
                              @FormParam("userId") Integer userId) {
        try {
            BrandBean brandBean = new BrandBean();
            brandBean.setAccessToken(accessToken);
            brandBean.setBrandId(brandId);
            brandBean.setUserId(userId);
            brandService.brandApplication(brandBean);
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
