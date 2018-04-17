package com.xgt.bean.bs;

import javax.ws.rs.FormParam;

/**
 * Created by Administrator on 2017/9/7.
 */
public class VersionBean {
    private Integer id;

    @FormParam("accessToken")
    private String accessToken;

    private String versionUrl;
    @FormParam("versionName")
    private String versionName;

    private String createTime;

    private byte[] installationPackage;
    @FormParam("installationPackageName")
    private String installationPackageName;

    private byte[] configurationFile;

    private String configurationFileName;

    @FormParam("versionId")
    private Integer versionId;

    @FormParam("userId")
    private Integer userId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVersionUrl() {
        return versionUrl;
    }

    public void setVersionUrl(String versionUrl) {
        this.versionUrl = versionUrl;
    }

    public String getVersionName() {
        return versionName;
    }

    public void setVersionName(String versionName) {
        this.versionName = versionName;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public byte[] getInstallationPackage() {
        return installationPackage;
    }

    public void setInstallationPackage(byte[] installationPackage) {
        this.installationPackage = installationPackage;
    }

    public String getInstallationPackageName() {
        return installationPackageName;
    }

    public void setInstallationPackageName(String installationPackageName) {
        this.installationPackageName = installationPackageName;
    }

    public byte[] getConfigurationFile() {
        return configurationFile;
    }

    public void setConfigurationFile(byte[] configurationFile) {
        this.configurationFile = configurationFile;
    }

    public String getConfigurationFileName() {
        return configurationFileName;
    }

    public void setConfigurationFileName(String configurationFileName) {
        this.configurationFileName = configurationFileName;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Integer getVersionId() {
        return versionId;
    }

    public void setVersionId(Integer versionId) {
        this.versionId = versionId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
