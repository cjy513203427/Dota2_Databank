package com.xgt.controller;

import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.service.bs.ExcelService;
import com.xgt.util.MD5Util;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/28.
 * 上传Excel到本地
 */
@Controller
@Path("/cadlocal")
public class CADLocalController extends BaseController{
    @Autowired
    private ExcelService excelService;


    private final String UPLOADED_FILE_PATH = "e:\\upload\\";
    @POST
    @Path("/uploadLocalCAD")
    @Consumes(MediaType.MULTIPART_FORM_DATA )
    @Produces(MediaType.APPLICATION_JSON)
    //@RequiresPermissions("picturelocal:uploadPicture")
    public PcsResult uploadFile(MultipartFormDataInput input) {
        String fileName = "";
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        List<InputPart> inputParts = uploadForm.get("fileselect[]");
        for (InputPart inputPart : inputParts) {
            try {
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                fileName = getFileName(header);
                fileName = MD5Util.MD5(fileName+System.currentTimeMillis());
                fileName = fileName+".dwg";
                //convert the uploaded file to inputstream
                InputStream inputStream = inputPart.getBody(InputStream.class,null);
                byte [] bytes = IOUtils.toByteArray(inputStream);
                //constructs upload file path
                fileName = UPLOADED_FILE_PATH + fileName;
                writeFile(bytes,fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return newResult(true);

    }

    private String getFileName(MultivaluedMap<String, String> header) {
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
                String[] name = filename.split("=");
                String finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }

    //save to somewhere
    private void writeFile(byte[] content, String filename) throws IOException {
        File file = new File(filename);
        if (!file.exists()) {
            file.createNewFile();
        }
        FileOutputStream fop = new FileOutputStream(file);
        fop.write(content);
        fop.flush();
        fop.close();
    }
}
