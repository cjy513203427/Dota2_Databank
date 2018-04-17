package com.xgt.bean.bs;

import com.xgt.generic.PageQueryEntity;

import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import java.util.List;

/**
 * Created by Administrator on 2017/8/21.
 */
public class BrandBean extends PageQueryEntity{
    @FormParam("accessToken")
    private String accessToken;
    @FormParam("id")
    private Integer id;
    @FormParam("name")
    private String name;
    @QueryParam("brandName")
    private String brandName;//查询参数专用名称
    @FormParam("brandId")
    private Integer brandId;
    @FormParam("brandIds")
    private List<Integer> brandIds;
    @FormParam("userId")
    private Integer userId;
    @FormParam("isApproved")
    private Integer isApproved;
    @QueryParam("startTime")
    private String startTime;
    @QueryParam("endTime")
    private String endTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Integer getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Integer isApproved) {
        this.isApproved = isApproved;
    }

    public List<Integer> getBrandIds() {
        return brandIds;
    }

    public void setBrandIds(List<Integer> brandIds) {
        this.brandIds = brandIds;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
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
}
