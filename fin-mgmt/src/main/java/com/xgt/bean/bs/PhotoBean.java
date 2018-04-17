package com.xgt.bean.bs;

import com.xgt.generic.PageQueryEntity;

import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;

/**
 * Created by Administrator on 2017/8/21.
 */
public class PhotoBean extends PageQueryEntity{
    @QueryParam("accessToken")
    private String accessToken;
    @FormParam("id")
    private String id;
    @FormParam("name")
    private String name;//图片名称
    @FormParam("text")
    private String text;//查询所用图片名称
    @FormParam("photoUrl")
    private String photoUrl;
    @FormParam("dwgUrl")
    private String dwgUrl;
    @FormParam("number")
    private Integer number;
    @FormParam("parentId")
    private Integer parentId;
    @FormParam("photoNumber")
    private String photoNumber;
    @FormParam("description")
    private String description;
    @FormParam("condition")
    private String condition;
    @FormParam("specification")
    private String specification;
    @FormParam("versionName")
    private String versionName;
    @FormParam("brandId")
    private Integer brandId;
    @FormParam("brandName")
    private String brandName;
    @FormParam("parentName")
    private String parentName;//实际上是brandName
    private String addTime;
    @QueryParam("startTime")
    private String startTime;
    @QueryParam("endTime")
    private String endTime;

    private String modifyTime;
    @QueryParam("keyWord")
    private String keyWord;
    @FormParam("bubId")
    private Integer bubId;
    @FormParam("type")
    private String type;
    @FormParam("model")
    private String model;
    @QueryParam("userId")
    private Integer userId;

    private byte[] cadPath;

    private String cadPathName;

    private byte[] picturePath;

    private String picturePathName;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getDwgUrl() {
        return dwgUrl;
    }

    public void setDwgUrl(String dwgUrl) {
        this.dwgUrl = dwgUrl;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    public String getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(String modifyTime) {
        this.modifyTime = modifyTime;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getPhotoNumber() {
        return photoNumber;
    }

    public void setPhotoNumber(String photoNumber) {
        this.photoNumber = photoNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getVersionName() {
        return versionName;
    }

    public void setVersionName(String versionName) {
        this.versionName = versionName;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getBubId() {
        return bubId;
    }

    public void setBubId(Integer bubId) {
        this.bubId = bubId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public byte[] getCadPath() {
        return cadPath;
    }

    public void setCadPath(byte[] cadPath) {
        this.cadPath = cadPath;
    }

    public String getCadPathName() {
        return cadPathName;
    }

    public void setCadPathName(String cadPathName) {
        this.cadPathName = cadPathName;
    }

    public byte[] getPicturePath() {
        return picturePath;
    }

    public void setPicturePath(byte[] picturePath) {
        this.picturePath = picturePath;
    }

    public String getPicturePathName() {
        return picturePathName;
    }

    public void setPicturePathName(String picturePathName) {
        this.picturePathName = picturePathName;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
