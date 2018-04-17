package com.xgt.controller;

import com.xgt.bean.bs.ExcelBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.util.ConstantsUtil;
import com.xgt.util.MD5Util;
import com.xgt.util.OssUtil;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.stereotype.Controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/31.
 * 上传Excel到服务器
 */
@Controller
@Path("/excelserver")
public class ExcelServerController extends BaseController{

    @POST
    @Path("/uploadExcel")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult uploadExcel(MultipartFormDataInput input) {
        try {
            Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
            ExcelBean excelBean = convertMap(uploadForm);
            uploadExcelFile(excelBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    private void uploadExcelFile(ExcelBean excelBean) throws FileNotFoundException {
        if(excelBean.getExcelPath().length>0){
            // 上传到图片服务器
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //图片
            String EXCELFileName = excelBean.getExcelPathName().substring(0,
                    excelBean.getExcelPathName().lastIndexOf(".")).toLowerCase();
            EXCELFileName = MD5Util.MD5(EXCELFileName+System.currentTimeMillis());
            String EXCELExtName = excelBean.getExcelPathName().substring(
                    excelBean.getExcelPathName().lastIndexOf("."), excelBean.getExcelPathName().length())
                    .toLowerCase();
            oss.putObject(ConstantsUtil.Folder_EXCEL_CHART+ConstantsUtil.FILE_SEPARATOR
                    +EXCELFileName+EXCELExtName, excelBean.getExcelPath());
            excelBean.setExcelPathName(ConstantsUtil.Folder_EXCEL_CHART+ConstantsUtil.FILE_SEPARATOR
                    +EXCELFileName+EXCELExtName);
        }
    }

    /**
     * 数据摘取组装
     * @param uploadForm
     * @return
     * @throws IOException
     */
    private ExcelBean convertMap(Map<String, List<InputPart>> uploadForm) throws IOException {
        ExcelBean excelBean=new ExcelBean();
        if(uploadForm!=null) {
            if (uploadForm.containsKey("excelPathName")) {
                InputPart inputPart = uploadForm.get("excelPathName").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                excelBean.setExcelPathName(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("excelPath")) {
                InputPart inputPart = uploadForm.get("excelPath").get(0);
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                excelBean.setExcelPathName(getFileName(header));
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                excelBean.setExcelPath(IOUtils.toByteArray(inputStream));
            }

        }
        return excelBean;
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

}
