package com.xgt.alibaba.idst.nls.demo;
import com.alibaba.idst.nls.protocol.NlsResponse;
import com.alibaba.idst.nls.NlsClient;
import com.alibaba.idst.nls.NlsFuture;
import com.alibaba.idst.nls.event.NlsEvent;
import com.alibaba.idst.nls.event.NlsListener;
import com.alibaba.idst.nls.protocol.NlsRequest;

import java.io.File;
import java.io.FileOutputStream;

public class TTSDemo implements NlsListener {
    private NlsClient client = new NlsClient();
    private String akId;
    private String akSecret;
    private String tts_text = "薄雾浓云愁永昼。瑞脑消金兽。佳节又重阳，玉枕纱厨，半夜凉初透。东篱把酒黄昏后。有暗香盈袖。莫道不消魂，帘卷西风，人比黄花瘦。";


    public TTSDemo(String akId, String akSecret) {
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


    public void startTTS() {
        File file = new File("tts.wav");
        if(!file.exists()) {
            try {
                file.createNewFile();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        NlsRequest req = new NlsRequest();
        String appkey = "nls-service";
        req.setAppKey(appkey); // 设置语音文件格式
        req.setTtsRequest(tts_text); //传入测试文本，返回语音结果
        req.setTtsEncodeType("wav");//返回语音数据格式，支持pcm,wav.alaw
        req.setTtsVolume(30);       //音量大小默认50，阈值0-100
        req.setTtsSpeechRate(0);    //语速，阈值-500~500
        req.setTtsBackgroundMusic(1,0);//背景音乐编号,偏移量
        req.authorize(akId, akSecret); // 请替换为用户申请到的Access Key ID和Access Key Secret
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            NlsFuture future = client.createNlsFuture(req, this); // 实例化请求,传入请求和监听器
            int total_len = 0;
            byte[] data ;
            while((data = future.read()) != null) {
                fileOutputStream.write(data, 0, data.length);
                total_len += data.length;
            }
            fileOutputStream.close();
            System.out.println("tts audio file size is :" + total_len);
            future.await(10000); // 设置服务端结果返回的超时时间

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessageReceived(NlsEvent e) {
        NlsResponse response = e.getResponse();
        String result = "";
		int statusCode = response.getStatus_code();
        if (response.getTts_ret() != null) {
            result += "\nget tts result: statusCode=[" + statusCode + "], " + response.getTts_ret();
        }

        if (result != null) {
            System.out.println(result);
        }
        else {
            System.out.println(response.jsonResults.toString());
        }
    }

    @Override
    public void onOperationFailed(NlsEvent e) {
    	//识别失败的回调
        System.out.print("on operation failed: ");
        System.out.println(e.getErrorMessage());
    }

    @Override
    public void onChannelClosed(NlsEvent e) {
    	//socket 连接关闭的回调
        System.out.println("on websocket closed.");
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        String akId = "LTAIIV1lcfs8rNdo";
        String akSecret = "P1bCQLVDJimyVkHQ6U36LKZidzqNf8";
        TTSDemo ttsDemo = new TTSDemo(akId, akSecret);
        ttsDemo.startTTS();
        ttsDemo.shutDown();
    }
}