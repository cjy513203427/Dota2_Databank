 package com.xgt.service.dota;

/**
 * Created by Administrator on 2017/10/11.
 */
import com.xgt.dao.entity.dota.LinkTypeData;
import com.xgt.dao.entity.dota.Rule;
import com.xgt.exception.RuleException;
import com.xgt.util.TextUtil;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author zhy
 *
 */
@Service
public class ExtractService
{
    /**
     * @param rule
     * @return
     */
    public static List<LinkTypeData> extract(Rule rule,String tagName,String attributeKey)
    {

        // 进行对rule的必要校验
        validateRule(rule);

        List<LinkTypeData> datas = new ArrayList<LinkTypeData>();
        LinkTypeData data = null;
        try
        {
            /**
             * 解析rule
             */
            String url = rule.getUrl();
            String[] params = rule.getParams();
            String[] values = rule.getValues();
            String resultTagName = rule.getResultTagName();
            int type = rule.getType();
            int requestType = rule.getRequestMoethod();

            Connection conn = Jsoup.connect(url);
            // 设置查询参数

            if (params != null)
            {
                for (int i = 0; i < params.length; i++)
                {
                    conn.data(params[i], values[i]);
                }
            }

            // 设置请求类型
            Document doc = null;
            switch (requestType)
            {
                case Rule.GET:
                    //doc = conn.timeout(100000).get();  //按照文档上的，在一些网站上会遇到问题，所以改成下面的内容
                    doc = Jsoup.connect(url).ignoreContentType(true).userAgent("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.15)").timeout(10000).get();
                    break;
                case Rule.POST:
                    doc = conn.timeout(100000).post();
                    break;
            }

            //处理返回数据
            Elements results = new Elements();
            switch (type)
            {
                case Rule.CLASS:
                    results = doc.getElementsByClass(resultTagName);
                    break;
                case Rule.ID:
                    Element result = doc.getElementById(resultTagName);
                    results.add(result);
                    break;
                case Rule.TAG:
                    results = doc.getElementsByTag(resultTagName);
                case Rule.SELECTION:
                    results = doc.select(resultTagName);
                    break;
                default:
                    //当resultTagName为空时默认去body标签
                    if (TextUtil.isEmpty(resultTagName))
                    {
                        results = doc.getElementsByTag("body");
                    }
            }

            for (Element result : results)
            {
                Elements links = result.getElementsByTag(tagName);

                for (Element link : links)
                {
                    //必要的筛选
                    String imgSrc = link.attr(attributeKey);
                    String linkText = link.text();

                    data = new LinkTypeData();
                    data.setImgSrc(imgSrc);
                    data.setLinkText(linkText);

                    datas.add(data);
                }
            }

        } catch (IOException e)
        {
            e.printStackTrace();
        }

        return datas;
    }

    /**
     * 对传入的参数进行必要的校验
     */
    private static void validateRule(Rule rule)
    {
        String url = rule.getUrl();
        if (TextUtil.isEmpty(url))
        {
            throw new RuleException("url不能为空！");
        }
        if (!url.startsWith("http://")&&!url.startsWith("https://"))
        {
            throw new RuleException("url的格式不正确！");
        }

        if (rule.getParams() != null && rule.getValues() != null)
        {
            if (rule.getParams().length != rule.getValues().length)
            {
                throw new RuleException("参数的键值对个数不匹配！");
            }
        }

    }


}