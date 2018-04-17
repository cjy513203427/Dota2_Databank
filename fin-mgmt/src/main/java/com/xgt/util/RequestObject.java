package com.xgt.util;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.Map;

/**
 * Date: 2015年9月23日
 * Author: wwei
 * DESC:http请求
 */
public class RequestObject {
	// 参数集
	private ArrayList<NameValuePair> params = new ArrayList<>();
	
	// 访问路径
	private String path;


	public RequestObject(String url) {
		this.path = url;
	}

	public String toUrl() {
		StringBuilder builder = new StringBuilder();

		if (this.path != null) {
			builder.append(this.path);
		}
		if(builder.indexOf("?")<=0){
			builder.append("?");
		}else{
			builder.append("&");
		}
		int paramSize = this.params.size();
		if (this.params != null && paramSize>0) {
			for (int i = 0; i < paramSize - 1; i++) {
				builder.append((this.params.get(i)).getName())
						.append("=")
						.append(( this.params.get(i)).getValue())
						.append("&");
			}
			builder.append(
					( this.params.get(paramSize - 1)).getName())
					.append("=")
					.append((this.params.get(paramSize - 1))
							.getValue());
		}

		return builder.toString();
	}

	public RequestObject putParam(String name, String value) {
		this.params.add(new BasicNameValuePair(name, value));
		return this;
	}
	public RequestObject putParam(Map<String, String> map) {
		for (String key: map.keySet()) {
			this.params.add(new BasicNameValuePair(key, map.get(key)));
		}
		return this;
	}


	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
}