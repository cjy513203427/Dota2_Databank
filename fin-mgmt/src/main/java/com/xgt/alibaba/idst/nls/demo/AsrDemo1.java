package com.xgt.alibaba.idst.nls.demo;

import java.io.InputStream;

import com.alibaba.idst.nls.NlsClient;
import com.alibaba.idst.nls.NlsFuture;
import com.alibaba.idst.nls.event.NlsEvent;
import com.alibaba.idst.nls.event.NlsListener;
import com.alibaba.idst.nls.protocol.NlsRequest;
import com.alibaba.idst.nls.protocol.NlsResponse;


public class AsrDemo1 implements NlsListener {
	private static NlsClient client = new NlsClient();
	private String akId;
	private String akSecret;

	public AsrDemo1(String akId, String akSecret) {
		System.out.println("init Nls client...");
		this.akId = akId;
		this.akSecret = akSecret;
		// 初始化NlsClient
		client.init();
	}

	public void shutDown() {
		System.out.println("close NLS client");
		// 关闭客户端并释放资源
		client.close();
		System.out.println("demo done");
	}

	public void startAsr() {
		//开始发送语音
		System.out.println("open audio file...");
        InputStream fis = null;
        try {
            fis = this.getClass().getClassLoader().getResourceAsStream("sample.pcm");
        } catch (Exception e) {
            e.printStackTrace();
        }


        if (fis != null) {
			System.out.println("create NLS future");
			try {
				NlsRequest req = new NlsRequest();
				req.setAppKey("nls-service"); // appkey请从 "快速开始" 帮助页面的appkey列表中获取
                req.setAsrFormat("pcm"); // 设置语音文件格式为pcm,我们支持16k 16bit 的无头的pcm文件。

				/*热词相关配置*/
				//req.setAsrVocabularyId("热词词表id");//热词词表id
				/*热词相关配置*/


				req.authorize(akId, akSecret); // 请替换为用户申请到的Access Key ID和Access Key
				// Secret
				NlsFuture future = client.createNlsFuture(req, this); // 实例化请求,传入请求和监听器
				System.out.println("call NLS service");
				byte[] b = new byte[8000];
				int len = 0;
				while ((len = fis.read(b)) > 0) {
					future.sendVoice(b, 0, len); // 发送语音数据
					Thread.sleep(50);
				}
				future.sendFinishSignal(); // 语音识别结束时，发送结束符
				System.out.println("main thread enter waiting for less than 10s.");
				future.await(10000); // 设置服务端结果返回的超时时间
			} catch (Exception e) {
				e.printStackTrace();
			}
			System.out.println("calling NLS service end");
		}
	}

	@Override
	public void onMessageReceived(NlsEvent e) {
		//识别结果的回调
		NlsResponse response = e.getResponse();
		String result = "";
		int statusCode = response.getStatus_code();
		if (response.getAsr_ret() != null) {
			result += "\nget asr result: statusCode=[" + statusCode + "], " + response.getAsr_ret();
		}
		if (result != null) {
			System.out.println(result);
		} else {
			System.out.println(response.jsonResults.toString());
		}
	}

	@Override
	public void onOperationFailed(NlsEvent e) {
		//识别失败的回调
		String result = "";
		result += "on operation failed: statusCode=[" + e.getResponse().getStatus_code() + "], " + e.getErrorMessage();
		System.out.println(result);
	}

	@Override
	public void onChannelClosed(NlsEvent e) {
		//socket 连接关闭的回调
		System.out.println("on websocket closed.");
	}

	public static void main(String[] args) {
		String akId = "LTAIIV1lcfs8rNdo";
		String akSecret = "P1bCQLVDJimyVkHQ6U36LKZidzqNf8";
		AsrDemo1 asrDemo1 = new AsrDemo1(akId, akSecret);
		asrDemo1.startAsr();
		asrDemo1.shutDown();
	}
}
