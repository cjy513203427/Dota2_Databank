package com.xgt.util;

import com.alibaba.druid.support.json.JSONUtils;
import org.apache.http.*;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Author:wwei
 * DESC:HttpClient工具类
 */
public class HttpClientUtil {


	private static final Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

	public static String doGet(String url) {
		// 创建HttpClientBuilder
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		String tempTitle = null;
		try {
			HttpGet httpGet = new HttpGet(url);
			// 执行get请求
			HttpResponse httpResponse;
			httpResponse = closeableHttpClient.execute(httpGet);
			// 获取响应消息实体
			HttpEntity entity = httpResponse.getEntity();
			// 判断响应实体是否为空
			if (entity != null) {
				return EntityUtils.toString(entity, "UTF-8");
			} else {
				return null;
			}
		} catch (Exception e) {
			logger.error(tempTitle);
			logger.error(e.toString());
		} finally {
			try {
				// 关闭流并释放资源
				closeableHttpClient.close();
			} catch (IOException e) {
				logger.error(e.toString());
			}
		}
		return null;
	}


	public static String doGet(String url, Map<String, Object> params) {
		if(!StringUtils.hasText(url)){
			return "";
		}
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		try {
			if (params != null && !params.isEmpty()) {
				List<NameValuePair> pairs = new ArrayList<NameValuePair>(params.size());
				for (String key : params.keySet()) {
					pairs.add(new BasicNameValuePair(key, params.get(key).toString()));
				}
				url += "?" + EntityUtils.toString(new UrlEncodedFormEntity(pairs, "UTF-8"));
			}
			HttpGet httpGet = new HttpGet(url);
			CloseableHttpResponse response = closeableHttpClient.execute(httpGet);
			HttpEntity entity = response.getEntity();
			// 判断响应实体是否为空
			if (entity != null) {
				return EntityUtils.toString(entity, "UTF-8");
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭流并释放资源
				closeableHttpClient.close();
			} catch (IOException e) {
				logger.error(e.toString());
			}
		}
		return null;
	}


	public static String doPost(RequestObject object) {
		// 创建HttpClientBuilder
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		String tempTitle = null;
		try {
			HttpPost httpPost = new HttpPost(object.toUrl());
			// 执行get请求
			HttpResponse httpResponse;
			httpResponse = closeableHttpClient.execute(httpPost);

			// 获取响应消息实体
			HttpEntity entity = httpResponse.getEntity();
			// 判断响应实体是否为空
			if (entity != null) {
				return EntityUtils.toString(entity, "UTF-8");
			} else {
				return null;
			}
		} catch (Exception e) {
			logger.error(tempTitle);
			logger.error(e.toString());
		} finally {
			try {
				// 关闭流并释放资源
				closeableHttpClient.close();
			} catch (IOException e) {
				logger.error(e.toString());
			}
		}
		return null;
	}

	public static String doPost(String url,Map<String,String> map,String charset){
		HttpClient httpClient = null;
		HttpPost httpPost = null;
		String result = null;
		try{
			httpClient = new SSLClient();
			httpPost = new HttpPost(url);
			httpPost.addHeader("Content-Type", "application/json");
			httpPost.addHeader("Authorization", "Basic YWRtaW46");
			//设置参数

			StringEntity entity = new StringEntity(JSONUtils.toJSONString(map), "utf-8");
			entity.setContentEncoding(new BasicHeader("Content-Type",
					                     "application/json"));
			httpPost.setEntity(entity);
			HttpResponse response = httpClient.execute(httpPost);
			if(response != null){
				HttpEntity resEntity = response.getEntity();
				if(resEntity != null){
					result = EntityUtils.toString(resEntity,charset);
				}
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return result;
	}


}
