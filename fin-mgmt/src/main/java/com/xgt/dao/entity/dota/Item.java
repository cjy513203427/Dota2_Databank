package com.xgt.dao.entity.dota;

/**
 * Created by hasee on 2017/12/4.
 */
public class Item {
    private Integer id;

    private String name;

    private Integer cost;

    private Integer secretShop;

    private Integer sideShop;

    private Integer recipe;

    private String localizedName;

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
