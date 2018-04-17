package com.xgt.alibaba.idst.nls.demo;
import java.io.File;
import java.io.FileInputStream;
import com.alibaba.idst.nls.NlsClient;
import com.alibaba.idst.nls.NlsFuture;
import com.alibaba.idst.nls.event.NlsEvent;
import com.alibaba.idst.nls.event.NlsListener;
import com.alibaba.idst.nls.protocol.NlsRequest;
import com.alibaba.idst.nls.protocol.NlsResponse;
public class AsrDemo implements NlsListener {
    private static NlsClient client = new NlsClient();
    public AsrDemo() {
        System.out.println("init Nls client...");
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
        FileInputStream fis = null;
        try {
            String filePath = "E:\\idea_project\\Dota2_Databank\\fin-mgmt\\src\\main\\resources\\jar\\recording_1522627808878.pcm";
            File file = new File(filePath);
            fis = new FileInputStream(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (fis != null) {
            System.out.println("create NLS future");
            try {
                NlsRequest req = new NlsRequest();
                req.setAppKey("nls-service"); // appkey请从 "快速开始" 帮助页面的appkey列表中获取
                req.setAsrFormat("pcm"); // 设置语音文件格式为pcm,我们支持8000HZ 16bit 的无头的pcm文件。
                    /*热词相关配置*/
                //req.setAsrVocabularyId("Vocabulary_id");//热词词表id
                    /*热词相关配置*/
                req.authorize("LTAIIV1lcfs8rNdo", "P1bCQLVDJimyVkHQ6U36LKZidzqNf8"); // 请替换为用户申请到的Access Key ID和Access Key Secret
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
    public void onMessageReceived(NlsEvent e) {
        //识别结果的回调
        NlsResponse response = e.getResponse();
        String result = "";
        int statusCode = response.getStatus_code();
        if (response.getAsr_ret() != null) {
            result += "\nget asr result: statusCode=[" + statusCode + "], " + response.getAsr_ret(); //识别结果
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
        AsrDemo asrDemo = new AsrDemo();
        asrDemo.startAsr();
        asrDemo.shutDown();
    }
}