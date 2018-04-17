package com.xgt.bean;

import com.xgt.dao.entity.bs.Brand;
import com.xgt.generic.PageQueryEntity;
import org.jboss.resteasy.annotations.Form;

import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import java.io.Serializable;
import java.util.List;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by jonnyLee on 2016/9/5.
 * Desc:
 */
public class UserBean extends PageQueryEntity implements Serializable {
    private static final long serialVersionUID = 5811115520224025437L;
    @QueryParam("accessToken")
    private String accessToken;
    @QueryParam("userId")
    private String userId;
    @QueryParam("username")
    private String username;
    @FormParam("password")
    private String password;
    @FormParam("qq")
    private String qq;
    @QueryParam("phone")
    private String phone;
    /*
        身份证复印件文件
     */
    private byte[] idPath;

    private String idPathName;

    /*
        入职登记表文件
     */
    private byte[]  entryformPath;

    private String entryformPathName;
    /*
        身份证号码
     */
    private String idNumber;

    private Integer status;

    private String description;

    private Integer roleId;

    private String updateTime;

    private String createTime;

    private List<Integer> roleIds;

    private Integer officeLogin;

    @QueryParam("userType")
    private String userType;

    @QueryParam("workno")
    private String workno;

    @QueryParam("realname")
    private String realname;

    @QueryParam("departmentId")
    private String departmentId;

    private String sex;

    public List<Brand> AllBrand;

    public List<Brand> UserBrand;

    public List<Integer> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<Integer> roleIds) {
        this.roleIds = roleIds;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public byte[]  getIdPath() {
        return idPath;
    }

    public void setIdPath(byte[]  idPath) {
        this.idPath = idPath;
    }

    public byte[]  getEntryformPath() {
        return entryformPath;
    }

    public void setEntryformPath(byte[]  entryformPath) {
        this.entryformPath = entryformPath;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }


    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getWorkno() {
        return workno;
    }

    public void setWorkno(String workno) {
        this.workno = workno;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getIdPathName() {
        return idPathName;
    }

    public void setIdPathName(String idPathName) {
        this.idPathName = idPathName;
    }

    public String getEntryformPathName() {
        return entryformPathName;
    }

    public void setEntryformPathName(String entryformPathName) {
        this.entryformPathName = entryformPathName;
    }

    public Integer getOfficeLogin() {
        return officeLogin;
    }

    public void setOfficeLogin(Integer officeLogin) {
        this.officeLogin = officeLogin;
    }

    public List<Brand> getAllBrand() {
        return AllBrand;
    }

    public void setAllBrand(List<Brand> allBrand) {
        AllBrand = allBrand;
    }

    public List<Brand> getUserBrand() {
        return UserBrand;
    }

    public void setUserBrand(List<Brand> userBrand) {
        UserBrand = userBrand;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
