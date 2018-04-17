package com.xgt.controller.bs;

import com.xgt.bean.bs.VersionBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.bs.VersionService;
import com.xgt.util.ConstantsUtil;
import com.xgt.util.FileUtils;
import com.xgt.util.OssUtil;
import org.apache.commons.io.IOUtils;
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
 * Created by Administrator on 2017/9/14.
 */
@Controller
@Path("/configurationFileServerApi")
public class ConfigurationFileServerApiController extends BaseController {
    @Autowired
    private VersionService versionService;

    /**
     * 上传配置文件到服务器
     * @param accessToken
     * @param configurationFile
     * @param configurationFileName
     * @param userId
     * @return
     * @throws IOException
     */
    @POST
    @Path("/uploadConfigurationFile")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult uploadConfigurationFile(@FormParam("accessToken") String accessToken, @FormParam("configurationFile") String configurationFile
            , @FormParam("configurationFileName") String configurationFileName, @FormParam("userId") Integer userId) throws IOException {
        byte[] encodeBase64 =  FileUtils.getZip(configurationFile, configurationFileName);
        VersionBean versionBean = new VersionBean();
        versionBean.setAccessToken(accessToken);
        versionBean.setConfigurationFileName(configurationFileName);
        versionBean.setUserId(userId);
        versionBean.setConfigurationFile(encodeBase64);
        uploadFile(versionBean);
        return newResult(true);
    }

    private void uploadFile(VersionBean version) throws FileNotFoundException {
        if(version.getConfigurationFile().length>0){
            // 上传到图片服务器
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //图片
            String ConfigurationPackageName = version.getConfigurationFileName();
            oss.putObject(ConstantsUtil.Folder_CONFIGURATION_PATH+ConstantsUtil.FILE_SEPARATOR
                    +ConfigurationPackageName, version.getConfigurationFile());
            version.setConfigurationFileName(ConstantsUtil.Folder_CONFIGURATION_PATH+ConstantsUtil.FILE_SEPARATOR
                    +ConfigurationPackageName);
            versionService.insertConfigurationFile(version);
        }
    }

}