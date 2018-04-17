package com.xgt.util;

/**
 * Created by CC on 2017/3/30.
 */

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.params.ConnManagerParams;
import org.apache.http.conn.params.ConnPerRouteBean;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import javax.servlet.ServletContext;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.StringBody;
/**
 * 提供httpclient的基本方法
 *
 * @author liuqqing
 *
 */
public class HttpClientUtils {


    private static HttpClient httpClient = null;

    private static HttpParams httpParams;
    private static ClientConnectionManager connectionManager;
    public static ServletContext context;
    /**
     * 最大连接数
     */
    public final static int MAX_TOTAL_CONNECTIONS = 800;
    /**
     * 获取连接的最大等待时间
     */
    public final static int WAIT_TIMEOUT = 60000;
    /**
     * 每个路由最大连接数
     */
    public final static int MAX_ROUTE_CONNECTIONS = 400;
    /**
     * 连接超时时间
     */
    public final static int CONNECT_TIMEOUT = 10000;
    /**
     * 读取超时时间
     */
    public final static int READ_TIMEOUT = 10000;

    static {
        httpParams = new BasicHttpParams();
        // 设置最大连接数
        ConnManagerParams.setMaxTotalConnections(httpParams, MAX_TOTAL_CONNECTIONS);
        // 设置获取连接的最大等待时间
        ConnManagerParams.setTimeout(httpParams, WAIT_TIMEOUT);
        // 设置每个路由最大连接数
        ConnPerRouteBean connPerRoute = new ConnPerRouteBean(MAX_ROUTE_CONNECTIONS);
        ConnManagerParams.setMaxConnectionsPerRoute(httpParams,connPerRoute);
        // 设置连接超时时间
        HttpConnectionParams.setConnectionTimeout(httpParams, CONNECT_TIMEOUT);
        // 设置读取超时时间
        HttpConnectionParams.setSoTimeout(httpParams, READ_TIMEOUT);

        SchemeRegistry registry = new SchemeRegistry();
        registry.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
        registry.register(new Scheme("https", SSLSocketFactory.getSocketFactory(), 443));

        connectionManager = new ThreadSafeClientConnManager(httpParams, registry);
    }

    public static HttpClient getHttpClient() {
        if(httpClient!=null)
        {
            return httpClient;
        }else{
            return new DefaultHttpClient(connectionManager, httpParams);
        }
    }

    public static void setHttpClient(HttpClient client) {
        HttpClientUtils.httpClient = client;
    }

    /**
     * <pre>
     * 公用执行post/get请求方法
     * 返回请求页面的内容，地址错误或者网络问题返回空字符串
     * </pre>
     *
     * @param client
     * @param request
     *            httpGet或者httpPost
     * @return
     */
    public static  String executeMethod(HttpClient client, HttpUriRequest request) {
        String htmlText = "";
        try {
            HttpResponse response = client.execute(request);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                htmlText = EntityUtils.toString(entity);
            }
            request.abort();
        } catch (Exception e) {
            e.printStackTrace();
        }finally{

        }
        return htmlText;
    }

    /**
     * <pre>
     * 公用执行post/get请求方法
     * 返回请求页面的内容，地址错误或者网络问题返回空字符串
     * </pre>
     *
     * @param client
     * @param request
     *            httpGet或者httpPost
     * @return
     */
    public static String executeMethodEncoding(HttpClient client,
                                               HttpUriRequest request, String encoding) {
        String htmlText = "";
        try {
            HttpResponse response = client.execute(request);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                htmlText = EntityUtils.toString(entity, encoding);
            }
            request.abort();

        } catch (Exception e) {
            e.printStackTrace();
        }finally{
        }
        return htmlText;
    }

    private static int produceTaskSleepTime = 2;

    private static int produceTaskMaxNumber = 10;

    public static void execute() {
        // 构造一个线程池
        ThreadPoolExecutor threadPool = new ThreadPoolExecutor(2, 4, 3,
                TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(3),
                new ThreadPoolExecutor.DiscardOldestPolicy());

        for (int i = 1; i <= produceTaskMaxNumber; i++) {
            try {
                String task = "task@ " + i;
                System.out.println("创建任务并提交到线程池中：" + task);
                //   threadPool.execute(new ThreadPoolTask(task));

                Thread.sleep(produceTaskSleepTime);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 对于普通的form的参数填充
     *
     * @param request
     * @param po
     */
    public static void fullFillPostEntity(HttpPost request,
                                          Map<String, String> po) {
        try {
            if (po != null && po.size() > 0) {
                List<NameValuePair> qparams = new ArrayList<NameValuePair>();
                for (String key : po.keySet()) {
                    qparams.add(new BasicNameValuePair(key, po.get(key)));
                }
                request.setEntity(new UrlEncodedFormEntity(qparams, HTTP.UTF_8));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 对于普通的form的参数填充
     *
     * @param request
     * @param po
     */
    public static void fullFillPostEntity(HttpPost request,
                                          Map<String, String> po, String encoding) {
        try {
            if (po != null && po.size() > 0) {
                List<NameValuePair> qparams = new ArrayList<NameValuePair>();
                for (String key : po.keySet()) {
                    qparams.add(new BasicNameValuePair(key, po.get(key)));
                }
                request.setEntity(new UrlEncodedFormEntity(qparams, encoding));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 对于form enctype="multipart/form-data"的参数填充
     *
     * @param request
     * @param po
     */
    public static void fullFillMultipartPostEntity(HttpPost request,
                                                   Map<String, String> po) {
        MultipartEntity reqEntity = new MultipartEntity();
        try {
            if (po != null && po.size() > 0) {
                for (String key : po.keySet()) {
                    StringBody comment = new StringBody(po.get(key));
                    reqEntity.addPart(key, comment);
                }
                request.setEntity(reqEntity);
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    /**
     * 获得一个post请求
     *
     * @param newsUrl
     * @param po
     * @return
     */
    public static HttpPost getHttpPost(String newsUrl, Map<String, String> po) {
        HttpPost request = null;
        try {
            request = new HttpPost(newsUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }
        fullFillPostEntity(request, po);
        return request;
    }

    /**
     * 获得一个post请求
     *
     * @param newsUrl
     * @param po
     * @return
     */
    public static HttpPost getHttpPost(String newsUrl, Map<String, String> po,
                                       String Referer) {
        HttpPost request = null;
        try {
            request = new HttpPost(newsUrl);
            request.addHeader("Referer", Referer);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        fullFillPostEntity(request, po);
        return request;
    }

    public static HttpPost getHttpPost(String newsUrl, Map<String, String> po,
                                       String Referer, String encoding) {
        HttpPost request = null;
        try {
            request = new HttpPost(newsUrl);
            request.addHeader("Referer", Referer);
        } catch (Exception e) {
            e.printStackTrace();
        }
        fullFillPostEntity(request, po, encoding);
        return request;
    }

    /**
     * 获得一个get请求
     *
     * @param newsUrl
     * @return
     */
    public synchronized  static HttpGet getHttpGet(String newsUrl) {
		/*try {
			Thread.currentThread().sleep(300);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}*/
        HttpGet request = new HttpGet(newsUrl);
        HttpConnectionParams.setConnectionTimeout(request.getParams(), 5000);
        HttpConnectionParams.setLinger(request.getParams(), 5);
        return request;
    }

    /**
     * 获得一个get请求,针对那些验证哪个页面链接过来的服务器
     *
     * @param newsUrl
     * @return
     */
    public static HttpGet getHttpGet(String newsUrl, String Referer) {
        HttpGet request = new HttpGet(newsUrl);
        request.addHeader("Referer", Referer);
        return request;
    }

    /**
     * 获得一个 enctype="multipart/form-data的post请求
     *
     * @param newsUrl
     * @param po
     * @return
     */
    public static HttpPost getMultipartPost(String newsUrl,
                                            Map<String, String> po) {
        HttpPost request = new HttpPost(newsUrl);
        fullFillMultipartPostEntity(request, po);
        return request;
    }

    public static URI toURIStr(String urlStr) {
        try {
            URL url = new URL(urlStr);
            URI uri = new URI(url.getProtocol(), url.getAuthority(),
                    url.getHost(), url.getPort(), url.getPath(),
                    url.getQuery(), url.getRef());
            return uri;
        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //get init queue
    private HttpGet[] gets = new HttpGet[10];
    {
        for (int i = 0; i < gets.length; i++) {
            gets[i] = new HttpGet();
        }
    }

	/*private HttpGet getHttpGet() {
		for (HttpGet get : gets) {
			if(get.) {

			}
		}

		return null;
	}
	public static void main(String[] args) throws ClientProtocolException, IOException {
		HttpGet get = new HttpGet("http://www.baidu.com");
		HttpClient client = new DefaultHttpClient();
		System.out.println(client.execute(get));
		get.releaseConnection();
		get.setURI(URI.create("http://www.google.com"));
		System.out.println(client.execute(get));
	}*/
}
