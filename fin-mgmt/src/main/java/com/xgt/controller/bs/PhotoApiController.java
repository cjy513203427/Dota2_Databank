package com.xgt.controller.bs;

import com.xgt.bean.bs.PhotoBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.bs.Photo;
import com.xgt.service.bs.PhotoService;
import org.jboss.resteasy.annotations.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Administrator on 2017/8/21.
 */
@Controller
@Path("/photoApi")
public class PhotoApiController extends BaseController{
    @Autowired
    private PhotoService photoService;

    @GET
    @Path("/queryPhotoArborescence")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult queryPhotoArborescence(@QueryParam("accessToken") String accessToken,@QueryParam("keyWord") String keyWord
                                            ,@QueryParam("userId") Integer userId) {
        PhotoBean photoBean = new PhotoBean();
        photoBean.setAccessToken(accessToken);
        photoBean.setKeyWord(keyWord);
        photoBean.setUserId(userId);
        List<Photo> list = photoService.queryPhotoArborescence(photoBean);
        if(list.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(list);
    }

    @GET
    @Path("/queryChildrenPhoto")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult queryChildrenPhoto(@QueryParam("accessToken") String accessToken,@QueryParam("keyWord") String keyWord,
    @QueryParam("parentId") Integer parentId) {
        PhotoBean photoBean = new PhotoBean();
        photoBean.setAccessToken(accessToken);
        photoBean.setParentId(parentId);
        photoBean.setKeyWord(keyWord);
        List<Photo> list = photoService.queryChildrenPhoto(photoBean);
        if(list.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(list);
    }

}
