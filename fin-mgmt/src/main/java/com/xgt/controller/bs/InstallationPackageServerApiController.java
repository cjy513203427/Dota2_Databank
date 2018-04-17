package com.xgt.controller.bs;

import com.xgt.bean.bs.VersionBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.service.bs.VersionService;
import com.xgt.util.ConstantsUtil;
import com.xgt.util.FileUtils;
import com.xgt.util.OssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * Created by Administrator on 2017/9/14.
 */
@Controller
@Path("/installationPackageServerApi")
public class InstallationPackageServerApiController extends BaseController {
    @Autowired
    private VersionService versionService;

    /**
     * 上传安装包到服务器
     * @param installationPackage
     * @param installationPackageName
     * @return
     * @throws IOException
     */
    @POST
    @Path("/uploadInstallationPackage")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult uploadInstallationPackage(@FormParam("accessToken") String accessToken,@FormParam("installationPackage") String installationPackage
            , @FormParam("installationPackageName") String installationPackageName,@FormParam("versionName") String versionName) throws IOException {
        byte[] encodeBase64 =  FileUtils.getZip(installationPackage, installationPackageName);
        VersionBean versionBean = new VersionBean();
        versionBean.setAccessToken(accessToken);
        versionBean.setInstallationPackageName(installationPackageName);
        versionBean.setInstallationPackage(encodeBase64);
        versionBean.setVersionName(versionName);
        uploadFile(versionBean);
        return newResult(true);
    }


    private void uploadFile(VersionBean version) throws FileNotFoundException {
        if(version.getInstallationPackage().length>0){
            // 上传到图片服务器
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //图片
            String InstallationPackageName = version.getInstallationPackageName();
            oss.putObject(ConstantsUtil.Folder_PACKAGE_PATH+ConstantsUtil.FILE_SEPARATOR
                    +InstallationPackageName, version.getInstallationPackage());
            version.setInstallationPackageName(ConstantsUtil.Folder_PACKAGE_PATH+ConstantsUtil.FILE_SEPARATOR
                    +InstallationPackageName);
            versionService.insertVersion(version);
            Integer versionId = versionService.gainVersionId(version);
            version.setVersionId(versionId);
            versionService.insertInstallationPackage(version);
        }
    }

}