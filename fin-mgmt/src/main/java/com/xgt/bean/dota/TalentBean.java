package com.xgt.bean.dota;

import com.xgt.generic.PageQueryEntity;

import javax.ws.rs.QueryParam;

/**
 * Created by hasee on 2017/12/19.
 */
public class TalentBean extends PageQueryEntity{
    private Integer id;
    @QueryParam("text")
    private String text;

    private Integer heroId;

    private Integer isDelete;

    private Integer grade;

    private Integer type;

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

    public Integer getHeroId() {
        return heroId;
    }

    public void setHeroId(Integer heroId) {
        this.heroId = heroId;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
