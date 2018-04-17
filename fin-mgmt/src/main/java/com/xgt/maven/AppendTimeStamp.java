package com.xgt.maven;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.io.IOUtils;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by jonnyLee on 2016/9/20.
 * Desc:    配合senchaCmd打包
 *
 * app.json 配置了appCache，但是生成的文件不包含时间戳，生成请求地址却是有时间戳的，一直没有找到合适的方法来解决这个问题，
 * 固:
 *  通过maven来手工读取classic.json文件的时间戳，自己写入cache.appCache文件来做浏览器缓存
 */
public class AppendTimeStamp {
    private static final String CLASSIC = "/classic.json";
    private static final String APPCACHE = "/cache.appcache";


    public static void main(String[] args) throws IOException {
        String path = args[0];
        String json = IOUtils.toString(new FileInputStream(path + CLASSIC));
        JSONObject jsonObject = JSON.parseObject(json);
        JSONObject loader = jsonObject.getJSONObject("loader");
        String timeStamp = loader.getString("cache");
        String cacheParam = loader.getString("cacheParam");


        FileInputStream file = new FileInputStream(path + APPCACHE);
        String cacheStr = IOUtils.toString(file);
        file.close();

        cacheStr = cacheStr.replaceAll("(?<=.js)|(?<=.css)|(?<=.jpg)", "?" + cacheParam + "=" + timeStamp);
        FileWriter fileWriter = new FileWriter(path + APPCACHE, false);
        fileWriter.write(cacheStr);
        fileWriter.flush();
        fileWriter.close();

        System.out.println("---------   append timeStamp to cache.appcache success   -------------");
    }

}
