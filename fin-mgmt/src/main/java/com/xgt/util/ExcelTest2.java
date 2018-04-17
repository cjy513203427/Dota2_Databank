package com.xgt.util;

/**
 * Created by Administrator on 2017/9/11.
 */

import jxl.Workbook;
import jxl.write.*;

import java.io.*;

public class ExcelTest2 {
    public static void main(String[] args) {

        OutputStream os = null;
        WritableWorkbook wbook = null;
        InputStream is = null;

        try {
            //获取输入流
            is = new FileInputStream("E:\\upload\\object_collection_template.xls");
            //获取输出流
            os = new FileOutputStream("E:\\upload\\测试Excel.xls");
            //创建WritableWorkbook对象
            wbook = Workbook.createWorkbook(os, Workbook.getWorkbook(is));
            //获取sheet对象
            WritableSheet sheet = wbook.getSheet(0);
            for(int row=2;row<5;row++){
            //初始化行

            //初始化列
            int col = 0;
            col = 0;
            //图片文件
            /**
             * <span style="color:#ff0000;">注意：jxl里插入图片，图片必须为png格式</span>
             * （我这里图片比例为4:3, 图片那列，列宽是在1.xls里设置好的，行高在代码里设置）
             */
            File imgFile = new File("D:\\用户目录\\我的图片\\1.png");

            sheet.addCell(new Label(col++, row, "123456789"));
            sheet.addCell(new Label(col++, row, "张三"));
            sheet.addCell(new Label(col++, row, "男"));
            sheet.addCell(new Label(col++, row, "37053318580536451X"));
            sheet.addCell(new Label(col++, row, "李四"));
            sheet.addCell(new Label(col++, row, "鲁A99999"));
            sheet.addCell(new Label(col++, row, "18888888888"));
            sheet.addCell(new Label(col++, row, "2016-04-12 14:09:09"));
            sheet.addCell(new Label(col++, row, "2016-05-15 13:11:45"));
            sheet.addCell(new Label(col++, row, "来此厂参观"));


            /**WritableImage(double x,double y,double width,double height,java.io.File image)
             * x - the column number at which to position the image 图片左上角位置为多少列
             * y - the row number at which to position the image 图片左上角位置为多少行
             * width - the number of columns cells which the image spans 图片宽度在excel里占据多少列
             * height - the number of rows which the image spans 图片宽度在excel里占据多少行
             * image - the source image file 图片文件地址
             * */
            WritableImage image = new WritableImage(col++, row, 1, 1, imgFile);

            sheet.setRowView(row, 1700, false); //设置行高
            // 把图片插入到sheet
            sheet.addImage(image);
        }
//          如果需要插入多张图片，则按下面的方式继续添加
//          WritableImage image2 = new WritableImage(10, 2, 1, 1, imgFile);
//          sheet.addImage(image);
            //设置行高
            wbook.write();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (wbook != null) {
                    wbook.close();
                }
                if (os != null) {
                    os.flush();
                    os.close();
                }
            } catch (WriteException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}