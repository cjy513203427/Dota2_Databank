package com.xgt.bean.bs;

/**
 * Created by Administrator on 2017/9/21.
 */
public class CoverBean {
    private Integer id;

    private String coverPathName;

    private byte[] coverPath;

    private String accessToken;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCoverPathName() {
        return coverPathName;
    }

    public void setCoverPathName(String coverPathName) {
        this.coverPathName = coverPathName;
    }

    public byte[] getCoverPath() {
        return coverPath;
    }

    public void setCoverPath(byte[] coverPath) {
        this.coverPath = coverPath;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
