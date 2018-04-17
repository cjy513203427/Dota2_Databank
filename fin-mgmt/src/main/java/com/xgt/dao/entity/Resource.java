package com.xgt.dao.entity;

import javax.ws.rs.FormParam;
import java.io.Serializable;
import java.util.List;

public class Resource implements Serializable {
    private static final long serialVersionUID = 1L;

    @FormParam("id")
    private long id;//主键.

    @FormParam("text")
    public String text;//名称.

    @FormParam("type")
    private String type;//资源类型，[menu|button]

    @FormParam("url")
    private String url;//资源路径.

    @FormParam("iconCls")
    private String iconCls;//icon样式

    private String rowCls="nav-tree-badge";//icon样式

    @FormParam("permission")
    private String permission; //权限字符串,menu例子：role:*，button例子：role:create,role:update,role:delete,role:view

    @FormParam("parentId")
    private Integer parentId; //父编号

    @FormParam("status")
    private Integer status ;
    // Add
    private List<Resource> children;// 子节点
    private boolean leaf = false;// 是否为叶子
    private boolean checked = false;// 角色是否已经拥有该权限

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }

    public String getRowCls() {
        return rowCls;
    }

    public void setRowCls(String rowCls) {
        this.rowCls = rowCls;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Resource> getChildren() {
        return children;
    }

    public void setChildren(List<Resource> children) {
        this.children = children;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    @Override
    public String toString() {
       return "Resource [id=" + id + ", text=" + text + ", type=" + type + ", url=" + url
              + ", permission=" + permission + ", parentId=" + parentId +  ", status="
              + status + "]";
    }
   
}