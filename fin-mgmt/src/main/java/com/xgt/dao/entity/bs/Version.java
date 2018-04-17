package com.xgt.dao.entity.bs;

/**
 * Created by Administrator on 2017/9/7.
 */
public class Version {
    private Integer id;

    private String versionUrl;

    private String versionName;

    private String createTime;

    private byte[] installationPackage;

    private String installationPackageName;

    private byte[] configurationFile;

    private String configurationFileName;

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
}
