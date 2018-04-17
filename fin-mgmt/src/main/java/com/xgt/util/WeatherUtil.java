package com.xgt.util;


import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/**
 *  根据IP地址获取详细的地域信息
 *  @project:personGocheck
 *  @class:AddressUtils.java
 *  @author:heguanhua E-mail:37809893@qq.com
 *  @date：Nov 14, 2012 6:38:25 PM
 */
public class WeatherUtil {
    /**
     *
     * @param content
     *            请求的参数 格式为：name=xxx&pwd=xxx
     * @param encodingString
     *            服务器端请求编码。如GBK,UTF-8等
     * @return
     * @throws UnsupportedEncodingException
     */
    public Weather getWeather(String content, String encodingString)
            throws UnsupportedEncodingException {
        // 这里调用pconline的接口
        String urlStr = "http://php.weather.sina.com.cn/xml.php";
        // 从http://whois.pconline.com.cn取得IP所在的省市区信息
        String returnStr = this.getResult(urlStr, content, encodingString);
        if (returnStr != null) {
            // 处理返回的省市区信息
            returnStr=returnStr.replace("<Profiles>","");
            returnStr=returnStr.replace("</Profiles>","");
            Weather weather= (Weather) XMLUtil.convertXmlStrToObject(Weather.class,returnStr);
                    /*String[] temp = returnStr.split(",");
            if(temp.length<3){
                return "0";//无效IP，局域网测试
            }
            String region = (temp[7].split(":"))[1].replaceAll("\"", "");
            region = decodeUnicode(region);// 省份
            *//**
             * String country = ""; String area = ""; String region = ""; String
             * city = ""; String county = ""; String isp = ""; for(int i=0;i<temp.length;i++){
             * switch(i){ case 1:country =
             * (temp[i].split(":"))[2].replaceAll("\"", ""); country =
             * decodeUnicode(country);//国家 break; case 3:area =
             * (temp[i].split(":"))[1].replaceAll("\"", ""); area =
             * decodeUnicode(area);//地区 break; case 5:region =
             * (temp[i].split(":"))[1].replaceAll("\"", ""); region =
             * decodeUnicode(region);//省份 break; case 7:city =
             * (temp[i].split(":"))[1].replaceAll("\"", ""); city =
             * decodeUnicode(city);//市区 break; case 9:county =
             * (temp[i].split(":"))[1].replaceAll("\"", ""); county =
             * decodeUnicode(county);//地区 break; case 11:isp =
             * (temp[i].split(":"))[1].replaceAll("\"", ""); isp =
             * decodeUnicode(isp);//ISP公司 break; } }
             *//*
            // System.out.println(country+"="+area+"="+region+"="+city+"="+county+"="+isp);
            return region;*/
            return weather;
        }
        return null;
    }
    /**
     * @param urlStr
     *            请求的地址
     * @param content
     *            请求的参数 格式为：name=xxx&pwd=xxx
     * @param encoding
     *            服务器端请求编码。如GBK,UTF-8等
     * @return
     */
    private String getResult(String urlStr, String content, String encoding) {
        URL url = null;
        HttpURLConnection connection = null;
        try {
            url = new URL(urlStr);
            connection = (HttpURLConnection) url.openConnection();// 新建连接实例
            connection.setConnectTimeout(5000);// 设置连接超时时间，单位毫秒
            connection.setReadTimeout(5000);// 设置读取数据超时时间，单位毫秒
            connection.setDoOutput(true);// 是否打开输出流 true|false
            connection.setDoInput(true);// 是否打开输入流true|false
            connection.setRequestMethod("POST");// 提交方法POST|GET
            connection.setUseCaches(false);// 是否缓存true|false
            connection.connect();// 打开连接端口
            DataOutputStream out = new DataOutputStream(connection
                    .getOutputStream());// 打开输出流往对端服务器写数据
            out.writeBytes(content);// 写数据,也就是提交你的表单 name=xxx&pwd=xxx
            out.flush();// 刷新
            out.close();// 关闭输出流
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream(), encoding));// 往对端写完数据对端服务器返回数据
            // ,以BufferedReader流来读取
            StringBuffer buffer = new StringBuffer();
            String line = "";
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            reader.close();
            return buffer.toString();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();// 关闭连接
            }
        }
        return null;
    }

    public Weather getCityWeatherByIp(String ip){
        IpUtil ipUtil = new IpUtil();
        Weather weather=new Weather();
        try {
            String cityName=ipUtil.getAddresses("ip="+ip, "utf-8");
            if(cityName!=null&&cityName.length()>0){
                cityName=cityName.replace("市","");
            }else{
                cityName="合肥";
            }
            WeatherUtil weatherUtil = new WeatherUtil();
            weather = weatherUtil.getWeather("city="+ URLEncoder.encode(cityName, "GB2312")
                    +"&password=DJOYnieT8234jlsK&day=0", "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return weather;
    }
    // 测试
    public static void main(String[] args) throws UnsupportedEncodingException {
        IpUtil ipUtil = new IpUtil();
        System.out.println(ipUtil.getAddresses("ip="+"36.7.134.52", "utf-8"));
    }
}