package com.xgt.controller;

import com.xgt.bean.bs.VersionBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.bs.VersionService;
import com.xgt.util.ConstantsUtil;
import com.xgt.util.OssUtil;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/9/19.
 */
@Controller
@Path("/configurationFileServer")
public class ConfigurationFileServerController extends BaseController {
    @Autowired
    private VersionService versionService;

    /**
     * 上传图片到服务器
     * @param input
     * @return
     */
    @POST
    @Path("/uploadConfigurationFile")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "configurationFileServer:uploadConfigurationFile")
    public PcsResult uploadInstallationPackage(MultipartFormDataInput input) {
        try {
            Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
            VersionBean version = convertMapAndUpload(uploadForm);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.ERROR_OPERATE.getCode()).setMessage(EnumPcsServiceError.ERROR_OPERATE.getDesc());
            result.setSuccess(false);
            return result;
        }
        return newResult(true);
    }

    /**
     * 数据摘取组装
     * @param uploadForm
     * @return
     * @throws IOException
     */
    private VersionBean convertMapAndUpload(Map<String, List<InputPart>> uploadForm) throws IOException {
        VersionBean version=new VersionBean();
        if(uploadForm!=null) {
            if (uploadForm.containsKey("configurationFile")) {
                List<InputPart> inputParts = uploadForm.get("configurationFile");
                for (InputPart inputPart : inputParts) {
                    MultivaluedMap<String, String> header = inputPart.getHeaders();
                    version.setInstallationPackageName(getFileName(header));
                    InputStream inputStream = inputPart.getBody(InputStream.class, null);
                    version.setInstallationPackage(IOUtils.toByteArray(inputStream));
                    if(version.getInstallationPackage().length>0){
                        // 上传到图片服务器
                        OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
                        //图片
                        String ConfigurationFileName = version.getInstallationPackageName();
                        oss.putObject(ConstantsUtil.Folder_SYSTEM_CONFIGURATION_PATH+ConstantsUtil.FILE_SEPARATOR
                                +ConfigurationFileName, version.getInstallationPackage());
                        version.setConfigurationFileName(ConstantsUtil.Folder_SYSTEM_CONFIGURATION_PATH+ConstantsUtil.FILE_SEPARATOR
                                +ConfigurationFileName);
                        versionService.insertSystemConfigurationFile(version);
                    }
                }
            }

        }
        return version;
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