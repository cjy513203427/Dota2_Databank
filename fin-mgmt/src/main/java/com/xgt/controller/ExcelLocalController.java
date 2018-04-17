package com.xgt.controller;

import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.exception.IncorrectOfficeException;
import com.xgt.service.bs.BrandService;
import com.xgt.service.bs.ExcelService;
import com.xgt.service.bs.PhotoService;
import com.xgt.util.MD5Util;
import com.xgt.util.ReadExcelUtils;
import io.swagger.models.auth.In;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.*;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/28.
 * 上传Excel到本地
 */
@Controller
@Path("/excellocal")
public class ExcelLocalController extends BaseController{
    @Autowired
    private ExcelService excelService;
    @Autowired
    private BrandService brandService;
    @Autowired
    private PhotoService photoService;

    private final String UPLOADED_FILE_PATH = "C:\\Baisheng_Model\\upload\\";
    @POST
    @Path("/uploadExcel")
    @Consumes(MediaType.MULTIPART_FORM_DATA )
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("excellocal:uploadExcel")
    public PcsResult uploadFile(MultipartFormDataInput input) {
        String fileName = "";
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        List<InputPart> inputParts = uploadForm.get("excelPath");
        for (InputPart inputPart : inputParts) {
            try {
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                fileName = getFileName(header);
                fileName = MD5Util.MD5(fileName+System.currentTimeMillis());
                fileName = fileName+".xlsx";
                //convert the uploaded file to inputstream
                InputStream inputStream = inputPart.getBody(InputStream.class,null);
                byte [] bytes = IOUtils.toByteArray(inputStream);
                //constructs upload file path
                fileName = UPLOADED_FILE_PATH + fileName;
                writeFile(bytes,fileName);
                try {
                    ReadExcelUtils excelReader = new ReadExcelUtils(fileName);
                    Map<Integer, Map<Integer,Object>> map = excelReader.readExcelContent();
                    PhotoBean photoBean = new PhotoBean();
                    BrandBean brandBean = new BrandBean();
                    for (int i = 2; i <= map.size(); i++) {
                        brandBean.setName(String.valueOf(map.get(i).get(0)));
                        photoBean.setModel(String.valueOf(map.get(i).get(1)));
                        photoBean.setType(String.valueOf(map.get(i).get(2)));
                        photoBean.setPhotoNumber(String.valueOf(map.get(i).get(3)));
                        photoBean.setText(brandBean.getName()+"_"+photoBean.getModel()+"_"+photoBean.getPhotoNumber());
                        photoBean.setCondition(String.valueOf(map.get(i).get(4)));
                        photoBean.setSpecification(String.valueOf(map.get(i).get(5)));
                        Integer brandId = brandService.gainBrandId(brandBean);
                        photoBean.setBrandId(brandId);
                        Integer type = photoService.gainParentId(photoBean);
                        if(type == null){
                            Assert.isTrue(type!=null,"导入数据中类型没有权限");
                        }

                        Integer parentIdForModel = photoService.gainParentIdForModel(photoBean);
                        if (parentIdForModel != null) {
                            photoBean.setParentId(parentIdForModel);
                        }else{
                            Assert.isTrue(parentIdForModel!=null,"导入数据中模型没有权限");
                            //throw new IllegalArgumentException("导入数据中品牌没有权限");
                            //return newResult(false).setCode(5000).setMessage("导入数据中品牌没有权限");
                        }

                        photoBean.setVersionName(String.valueOf(map.get(i).get(6)));
                        BigDecimal db = new BigDecimal(photoBean.getVersionName());
                        String versionName = db.toPlainString();
                        photoBean.setVersionName(versionName);
                        if(versionName==null) {
                            Calendar cal = Calendar.getInstance();
                            Date date = cal.getTime();
                            photoBean.setVersionName("VER_" + new SimpleDateFormat("yyyy/MM/dd HH:mm:ss:SSS").format(date));
                        }
                        Integer num = excelService.countPhotoNumber(photoBean);
                        if(num>0) {
                            excelService.makeHistoricalEdition(photoBean);
                        }

                        excelService.insertPhotoFromExcel(photoBean);
                    }
                } catch (FileNotFoundException e) {
                    System.out.println("未找到指定路径的文件!");
                    e.printStackTrace();
                }catch (Exception e) {
                    e.printStackTrace();
                }
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
