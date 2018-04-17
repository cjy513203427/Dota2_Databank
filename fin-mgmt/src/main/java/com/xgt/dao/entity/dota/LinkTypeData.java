package com.xgt.dao.entity.dota;

/**
 * Created by Administrator on 2017/10/11.
 */
public class LinkTypeData
{
    private int id;
    /**
     * 链接的地址
     */
    private String linkHref;
    /**
     * 链接的标题
     */
    private String linkText;
    /**
     * 摘要
     */
    private String summary;
    /**
     * 图片路径
     */
    private String imgSrc;
    /**
     * 内容
     */
    private String content;
    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
        this.id = id;
    }
    public String getLinkHref()
    {
        return linkHref;
    }
    public void setLinkHref(String linkHref)
    {
        this.linkHref = linkHref;
    }
    public String getLinkText()
    {
        return linkText;
    }
    public void setLinkText(String linkText)
    {
        this.linkText = linkText;
    }
    public String getSummary()
    {
        return summary;
    }
    public void setSummary(String summary)
    {
        this.summary = summary;
    }
    public String getContent()
    {
        return content;
    }
    public void setContent(String content)
    {
        this.content = content;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }
}