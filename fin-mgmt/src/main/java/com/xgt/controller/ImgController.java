package com.xgt.controller;

import com.xgt.common.BaseController;
import org.springframework.stereotype.Controller;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by jonnyLee on 2016/10/10.
 * Desc:
 */
@Controller
@Path("img")
public class ImgController extends BaseController {

    @POST
    @Path("chart/download")
    @Produces(MediaType.APPLICATION_JSON)
    public void chartDownload(@Context HttpServletResponse response, @FormParam("data") String data,
                              @FormParam("filename") String filename,
                       @FormParam("version") String version) throws IOException {
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] img = decoder.decodeBuffer(data.substring(data.indexOf("base64,")+7, data.length()));
        for(int i=0;i<img.length;++i)
        {
            if(img[i]<0)
            {//调整异常数据
                img[i]+=256;
            }
        }
        response.setHeader("Content-disposition", "attachment;filename="+URLEncoder.encode(filename, "UTF-8")+".png");
        OutputStream outputStream  = response.getOutputStream();
        outputStream.write(img);
        outputStream.flush();
        outputStream.close();
    }

}
