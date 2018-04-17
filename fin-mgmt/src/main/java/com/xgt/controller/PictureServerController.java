package com.xgt.controller;

import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.bs.Photo;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.bs.BrandService;
import com.xgt.service.bs.PhotoService;
import com.xgt.util.ConstantsUtil;
import com.xgt.util.OssUtil;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/9/12.
 */
@Controller
@Path("/pictureserver")
public class PictureServerController extends BaseController {
    @Autowired
    private PhotoService photoService;
    @Autowired
    private BrandService brandService;
    /**
     * 上传图片到服务器
     * @param input
     * @return
     */
    @POST
    @Path("/uploadServerPicture")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions(value = "pictureserver:uploadServerPicture")
    public PcsResult uploadServerPicture(MultipartFormDataInput input, @Context HttpServletResponse response) {
        try {
            Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
            PhotoBean photoBean = convertMapAndUpload(uploadForm);
            response.sendRedirect("http://106.14.213.208:8889/Success.html");
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        URLDecoder.decode("111","UTF-8");
    }

    /**
     * 数据摘取组装
     * @param uploadForm
     * @return
     * @throws IOException
     */
    private PhotoBean convertMapAndUpload(Map<String, List<InputPart>> uploadForm) throws IOException {
        PhotoBean photoBean=new PhotoBean();
        if(uploadForm!=null) {
            if (uploadForm.containsKey("picturePathName")) {
                List<InputPart> inputPartss = uploadForm.get("picturePathName");
                for (InputPart inputPart : inputPartss) {
                    inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                    photoBean.setPicturePathName(inputPart.getBodyAsString());
                }
            }
            if (uploadForm.containsKey("picturePath")) {
                List<InputPart> inputParts = uploadForm.get("picturePath");
                for (InputPart inputPart : inputParts) {
                    MultivaluedMap<String, String> header = inputPart.getHeaders();
                    photoBean.setName(photoBean.getPicturePathName().substring(0,photoBean.getPicturePathName().lastIndexOf(".")));

                    InputStream inputStream = inputPart.getBody(InputStream.class, null);
                    photoBean.setPicturePath(IOUtils.toByteArray(inputStream));
                    if(photoBean.getPicturePath().length>0){
                        // 上传到图片服务器
                        OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
                        //图片
                        String PictureFileName = photoBean.getPicturePathName();
                        oss.putObject(ConstantsUtil.Folder_PICTURE_PATH+ConstantsUtil.FILE_SEPARATOR
                                +PictureFileName, photoBean.getPicturePath());
                        photoBean.setPicturePathName(ConstantsUtil.Folder_PICTURE_PATH+ConstantsUtil.FILE_SEPARATOR
                                +PictureFileName);
                        photoService.updatePhotoUrl(photoBean);
                    }
                }
            }

        }
        return photoBean;
    }

    /**
     * 返回文件名
     * @param header
     * @return
     */
    /*private String getFileName(MultivaluedMap<String, String> header) throws UnsupportedEncodingException {
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
                String[] name = filename.split("=");
                String finalFileName = name[1].trim().replaceAll("\"", "");
                finalFileName = new String(finalFileName.getBytes("ISO-8859-1"),"UTF-8");
                return finalFileName;
            }
        }
        return "unknown";
    }*/

}