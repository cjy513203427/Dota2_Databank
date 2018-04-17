package com.xgt.dao.entity;

import com.xgt.dao.entity.bs.Brand;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer userId;//用户id;
   
    private String username;//账号.
   
    private String name;//名称（昵称或者真实姓名，不同系统不同定义）
   
    private String password; //密码;

    private String qq;// 邮箱

    private String phone;

    private String description;//描述.

    private String salt;//加密密码的盐

    private Date createTime;// 创建时间

    private Date updateTime;// 修改时间
   
    private Integer status;//用户状态,0:创建未认证（比如没有激活，没有输入验证码等等）--等待验证的用户 , 1:正常状态,2：用户被锁定.

    private String workno;

    private String realname;

    private String sex;

    private List<Role> roleList;// 一个用户具有多个角色

    private List<Resource> resourceList;//

    private List<Resource> buttonList;

    private String nowTime;

    private Integer officeLogin;

    private String openId;


    // ADD
    private Integer roleId;//角色id;

    private String roleName;//角色名;

    private String userType;

    //前端字典数据 登录的时候展示
    private List<Map> dicList;

    //字典配置
    private Map<String,Object> dicMap;

    /*
        身份证复印件文件
     */
    private String idPath;

    /*
        入职登记表文件
     */
    private String entryformPath;
    /*
        身份证号码
     */
    private String idNumber;

    /*
        是否有修改密码、第一次登录时使用
     */
    private Integer modifyPassword;

    public String getNowTime() {
        return nowTime;
    }

    public void setNowTime(String nowTime) {
        this.nowTime = nowTime;
    }


    public Integer getModifyPassword() {
        return modifyPassword;
    }

    public void setModifyPassword(Integer modifyPassword) {
        this.modifyPassword = modifyPassword;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     *   1.最高领导 ：集合为空  2.部门领导 ：集合为手下人员ID 3.普通员工 ：放入自己的ID
     */
    private List<Integer> departmentUserIdList;

    public List<Brand> allBrand;

    public List<Brand> userBrand;


    public List<Integer> getDepartmentUserIdList() {
        return departmentUserIdList;
    }

    public void setDepartmentUserIdList(List<Integer> departmentUserIdList) {
        this.departmentUserIdList = departmentUserIdList;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Map<String, Object> getDicMap() {
        return dicMap;
    }

    public void setDicMap(Map<String, Object> dicMap) {
        this.dicMap = dicMap;
    }

    public List<Resource> getButtonList() {
        return buttonList;
    }

    public void setButtonList(List<Resource> buttonList) {
        this.buttonList = buttonList;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }

    public List<Resource> getResourceList() {
        return resourceList;
    }

    public void setResourceList(List<Resource> resourceList) {
        this.resourceList = resourceList;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<Map> getDicList() {
        return dicList;
    }

    public void setDicList(List<Map> dicList) {
        this.dicList = dicList;
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

    public String getIdPath() {
        return idPath;
    }

    public void setIdPath(String idPath) {
        this.idPath = idPath;
    }

    public String getEntryformPath() {
        return entryformPath;
    }

    public void setEntryformPath(String entryformPath) {
        this.entryformPath = entryformPath;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Integer getOfficeLogin() {
        return officeLogin;
    }

    public void setOfficeLogin(Integer officeLogin) {
        this.officeLogin = officeLogin;
    }

    public List<Brand> getAllBrand() {
        return allBrand;
    }

    public void setAllBrand(List<Brand> allBrand) {
        this.allBrand = allBrand;
    }

    public List<Brand> getUserBrand() {
        return userBrand;
    }

    public void setUserBrand(List<Brand> userBrand) {
        this.userBrand = userBrand;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    /**
     * 密码盐.
     * @return
     */
    public String getCredentialsSalt(){
       return this.username+this.salt;
    }
 
    @Override
    public String toString() {
       return "User [userId=" + userId + ", username=" + username + ", name=" + name + ", password=" + password
              + ", salt=" + salt + ", status=" + status + "]";
    }
 
   
}