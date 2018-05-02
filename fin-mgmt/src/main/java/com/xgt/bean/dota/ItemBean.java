package com.xgt.bean.dota;

import com.xgt.generic.PageQueryEntity;

import javax.ws.rs.QueryParam;

/**
 * Created by hasee on 2017/12/4.
 */
public class ItemBean extends PageQueryEntity{
    private Integer id;

    private String name;

    private Integer cost;

    private Integer secretShop;

    private Integer sideShop;

    private Integer recipe;
    @QueryParam("upgratedItem")
    private Integer upgratedItem;
    @QueryParam("localizedName")
    private String localizedName;
    @QueryParam("chineseName")
    private String chineseName;

    private String itemPath;

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

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getSecretShop() {
        return secretShop;
    }

    public void setSecretShop(Integer secretShop) {
        this.secretShop = secretShop;
    }

    public Integer getSideShop() {
        return sideShop;
    }

    public void setSideShop(Integer sideShop) {
        this.sideShop = sideShop;
    }

    public Integer getRecipe() {
        return recipe;
    }

    public void setRecipe(Integer recipe) {
        this.recipe = recipe;
    }

    public Integer getUpgratedItem() {
        return upgratedItem;
    }

    public void setUpgratedItem(Integer upgratedItem) {
        this.upgratedItem = upgratedItem;
    }

    public String getLocalizedName() {
        return localizedName;
    }

    public void setLocalizedName(String localizedName) {
        this.localizedName = localizedName;
    }

    public String getChineseName() {
        return chineseName;
    }

    public void setChineseName(String chineseName) {
        this.chineseName = chineseName;
    }

    public String getItemPath() {
        return itemPath;
    }

    public void setItemPath(String itemPath) {
        this.itemPath = itemPath;
    }
}
