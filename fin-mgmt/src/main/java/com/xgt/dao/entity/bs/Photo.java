package com.xgt.dao.entity.bs;

import java.util.List;

/**
 * Created by Administrator on 2017/8/21.
 */
public class Photo {
    private Integer id;

    private String text;//图片名称

    private String brandName;//品牌名称

    private String photoUrl;

    private String dwgUrl;

    private String number;//图片数量

    private String addTime;

    private String modifyTime;

    private String price;

    private String photoNumber;//编号

    private String company;

    private List<Photo> children;

    private Boolean leaf;

    private Integer parentId;

    private String description;

    private String condition;

    private String specification;

    private String versionName;

    private Integer brandId;

    private byte[] cadPath;

    private String cadPathName;

    private byte[] picturePath;

    private String picturePathName;

    private String model;

    private String type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public List<Photo> getChildren() {
        return children;
    }

    public void setChildren(List<Photo> children) {
        this.children = children;
    }

    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
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
}
