package com.xgt.controller;

import com.xgt.bean.bs.PhotoBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.bs.Photo;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.bs.PhotoService;
import com.xgt.util.ConstantsUtil;
import com.xgt.util.MD5Util;
import com.xgt.util.OssUtil;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.annotations.Form;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/28.
 */
@Controller
@Path("/photo")
public class PhotoController extends BaseController{
    @Autowired
    private PhotoService photoService;

    /**
     * 商品管理
     * @param keyWord
     * @param startTime
     * @param endTime
     * @return
     */
    @GET
    @Path("/queryPhoto")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "photo:queryPhoto")
    public PcsResult queryPhoto(@QueryParam("keyWord") String keyWord,@QueryParam("startTime") String startTime
    ,@QueryParam("endTime") String endTime,@QueryParam("pageIndex") Integer pageIndex,
     @QueryParam("pageSize") Integer pageSize,@QueryParam("brandId") Integer brandId,@QueryParam("userId") Integer userId) {
        PhotoBean photoBean = new PhotoBean();
        photoBean.setKeyWord(keyWord);
        photoBean.setStartTime(startTime);
        photoBean.setEndTime(endTime);
        photoBean.setPageIndex(pageIndex);
        photoBean.setPageSize(pageSize);
        photoBean.setPageOffset(pageSize);
        photoBean.setBrandId(brandId);
        if (photoBean.getUserId()==null) {
            photoBean.setUserId(getLoginUserId());
        }else{
            photoBean.setUserId(userId);
        }
        Map<String,Object> map = photoService.queryPhoto(photoBean);
        if(map.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(map);
    }

    /**
     * 查询历史版本
     * @param keyWord
     * @param startTime
     * @param endTime
     * @return
     */
    @GET
    @Path("/queryHistoryPhoto")
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value = "photo:queryHistoryPhoto")
    public PcsResult queryHistoryPhoto(@QueryParam("keyWord") String keyWord,@QueryParam("startTime") String startTime
            ,@QueryParam("endTime") String endTime,@QueryParam("pageIndex") Integer pageIndex,
                                @QueryParam("pageSize") Integer pageSize,@QueryParam("brandId") Integer brandId,@QueryParam("userId") Integer userId) {
        PhotoBean photoBean = new PhotoBean();
        photoBean.setKeyWord(keyWord);
        photoBean.setStartTime(startTime);
        photoBean.setEndTime(endTime);
        photoBean.setPageIndex(pageIndex);
        photoBean.setPageSize(pageSize);
        photoBean.setPageOffset(pageSize);
        photoBean.setBrandId(brandId);
        if (photoBean.getUserId()==null) {
            photoBean.setUserId(getLoginUserId());
        }else{
            photoBean.setUserId(userId);
        }
        Map<String,Object> map = photoService.queryHistoryPhoto(photoBean);
        if(map.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(map);
    }

    /**
     * 遍历商品树状结构
     * @param keyWord
     * @return
     */
    @GET
    @Path("/queryPhotoArborescence")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult queryPhotoArborescence(@QueryParam("keyWord") String keyWord,@QueryParam("userId") Integer userId) {
        PhotoBean photoBean = new PhotoBean();
        photoBean.setKeyWord(keyWord);
        if (photoBean.getUserId()==null) {
            photoBean.setUserId(getLoginUserId());
        }else{
            photoBean.setUserId(userId);
        }
        List<Photo> list = photoService.queryPhotoArborescence(photoBean);
        if(list.size()==0){
            return newResult(false);
    }
        return newResult(true).setData(list);
    }


    /**
     * 删除商品
     * @param id
     * @return
     */
    @POST
    @Path("deletePhoto")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "photo:deletePhoto")
    public PcsResult deletePhoto(@FormParam("id") String id) {
        try {
            PhotoBean photoBean = new PhotoBean();
            photoBean.setId(id);
            photoService.deletePhoto(photoBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.PARAM_INVALID.getCode()).setMessage(EnumPcsServiceError.PARAM_INVALID.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }


    @POST
    @Path("addPhoto")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "photo:addPhoto")
    public PcsResult addPhoto(MultipartFormDataInput input) {
        try {
            Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
            PhotoBean photoBean = convertMap(uploadForm);
            uploadPhotoFile(photoBean);
            uploadCADFile(photoBean);
            photoService.addPhoto(photoBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    @POST
    @Path("modifyPhoto")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "photo:modifyPhoto")
    public PcsResult modifyPhoto(MultipartFormDataInput input) {
        try {
            Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
            PhotoBean photoBean = convertMap(uploadForm);
            uploadPhotoFile(photoBean);
            uploadCADFile(photoBean);
            photoService.modifyPhoto(photoBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    private void uploadCADFile(PhotoBean photoBean) throws FileNotFoundException {
        if(photoBean.getCadPath().length>0){
            // 上传到图片服务器
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //图片
            String EXCELFileName = photoBean.getCadPathName().substring(0,
                    photoBean.getCadPathName().lastIndexOf(".")).toLowerCase();
            EXCELFileName = MD5Util.MD5(EXCELFileName+System.currentTimeMillis());
            String EXCELExtName = photoBean.getCadPathName().substring(
                    photoBean.getCadPathName().lastIndexOf("."), photoBean.getCadPathName().length())
                    .toLowerCase();
            oss.putObject(ConstantsUtil.Folder_CAD_PATH+ConstantsUtil.FILE_SEPARATOR
                    +EXCELFileName+EXCELExtName, photoBean.getCadPath());
            photoBean.setCadPathName(ConstantsUtil.Folder_CAD_PATH+ConstantsUtil.FILE_SEPARATOR
                    +EXCELFileName+EXCELExtName);
        }
    }

    private void uploadPhotoFile(PhotoBean photoBean) throws FileNotFoundException {
        if(photoBean.getPicturePath().length>0){
            // 上传到图片服务器
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //图片
            String EXCELFileName = photoBean.getPicturePathName().substring(0,
                    photoBean.getPicturePathName().lastIndexOf(".")).toLowerCase();
            EXCELFileName = MD5Util.MD5(EXCELFileName+System.currentTimeMillis());
            String EXCELExtName = photoBean.getPicturePathName().substring(
                    photoBean.getPicturePathName().lastIndexOf("."), photoBean.getPicturePathName().length())
                    .toLowerCase();
            oss.putObject(ConstantsUtil.Folder_PICTURE_PATH+ConstantsUtil.FILE_SEPARATOR
                    +EXCELFileName+EXCELExtName, photoBean.getPicturePath());
            photoBean.setPicturePathName(ConstantsUtil.Folder_PICTURE_PATH+ConstantsUtil.FILE_SEPARATOR
                    +EXCELFileName+EXCELExtName);
        }
    }

    /**
     * 数据摘取组装
     * @param uploadForm
     * @return
     * @throws IOException
     */
    private PhotoBean convertMap(Map<String, List<InputPart>> uploadForm) throws IOException {
        PhotoBean photoBean=new PhotoBean();
        if(uploadForm!=null) {
            if (uploadForm.containsKey("text")) {
                InputPart inputPart = uploadForm.get("text").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setText(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("brandId")) {
                InputPart inputPart = uploadForm.get("brandId").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setBrandId(Integer.parseInt(inputPart.getBodyAsString()));
            }
            if (uploadForm.containsKey("id")) {
                InputPart inputPart = uploadForm.get("id").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setId(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("model")) {
                InputPart inputPart = uploadForm.get("model").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setModel(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("type")) {
                InputPart inputPart = uploadForm.get("type").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setType(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("name")) {
                InputPart inputPart = uploadForm.get("name").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setName(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("photoNumber")) {
                InputPart inputPart = uploadForm.get("photoNumber").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setPhotoNumber(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("condition")) {
                InputPart inputPart = uploadForm.get("condition").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setCondition(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("specification")) {
                InputPart inputPart = uploadForm.get("specification").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setSpecification(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("versionName")) {
                InputPart inputPart = uploadForm.get("versionName").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                photoBean.setVersionName(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("photoUrl")) {
                InputPart inputPart = uploadForm.get("photoUrl").get(0);
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                photoBean.setPicturePathName(getFileName(header));
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                photoBean.setPicturePath(IOUtils.toByteArray(inputStream));
            }
            if (uploadForm.containsKey("dwgUrl")) {
                InputPart inputPart = uploadForm.get("dwgUrl").get(0);
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                photoBean.setCadPathName(getFileName(header));
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                photoBean.setCadPath(IOUtils.toByteArray(inputStream));
            }

        }
        return photoBean;
    }


    /**
     * 返回文件名
     * @param header
     * @return
     */
    private String getFileName(MultivaluedMap<String, String> header) {
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
                String[] name = filename.split("=");
                String finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }

    /**
     * 添加商品树
     * @param photoBean
     * @return
     */
    @POST
    @Path("insertPhotoArborescence")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "photo:insertPhotoArborescence")
    public PcsResult insertPhotoArborescence(@Form PhotoBean photoBean) {
        photoService.insertPhotoArborescence(photoBean);
        return newResult(true);
    }

    /**
     * 修改商品树
     * @param photoBean
     * @return
     */
    @POST
    @Path("updatePhotoArborescence")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "photo:updatePhotoArborescence")
    public PcsResult updatePhotoArborescence(@Form PhotoBean photoBean) {
        photoService.updatePhotoArborescence(photoBean);
        return newResult(true);
    }

}
