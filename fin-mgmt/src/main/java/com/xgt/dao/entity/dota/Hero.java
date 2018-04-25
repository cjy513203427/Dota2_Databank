package com.xgt.dao.entity.dota;

/**
 * Created by hasee on 2017/12/1.
 */
public class Hero {
    private Integer id;

    private String name;

    private String localizedName;

    private String headportraitPath;

    private String heroPath;

    private String chineseName;

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

    public String getLocalizedName() {
        return localizedName;
    }

    public void setLocalizedName(String localizedName) {
        this.localizedName = localizedName;
    }

    public String getHeadportraitPath() {
        return headportraitPath;
    }

    public void setHeadportraitPath(String headportraitPath) {
        this.headportraitPath = headportraitPath;
    }

    public String getHeroPath() {
        return heroPath;
    }

    public void setHeroPath(String heroPath) {
        this.heroPath = heroPath;
    }

    public String getChineseName() {
        return chineseName;
    }

    public void setChineseName(String chineseName) {
        this.chineseName = chineseName;
    }
}
