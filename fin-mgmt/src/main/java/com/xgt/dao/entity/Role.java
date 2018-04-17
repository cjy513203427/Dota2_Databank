package com.xgt.dao.entity;

import java.io.Serializable;
import java.util.List;

public class Role implements Serializable {
    private static final long serialVersionUID = 1L;
    private int id; // 编号
    private String name; // 角色标识程序中判断使用,如"admin",这个是唯一的:
    private String description; // 角色描述,UI界面显示使用
    private Boolean available = Boolean.FALSE; // 是否可用,如果不可用将不会添加给用户
    //角色 -- 权限关系：多对多关系;
    private List<Resource> permissions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public List<Resource> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Resource> permissions) {
        this.permissions = permissions;
    }

    @Override
    public String toString() {
       return "Role [id=" + id + ", name=" + name + ", description=" + description + ", available=" + available
              + ", permissions=" + permissions + "]";
    }
}