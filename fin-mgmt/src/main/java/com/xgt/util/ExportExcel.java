package com.xgt.util;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;


/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by jonnyLee on 2016/8/22.
 * Desc:
 */
public class ExportExcel<T> {


    public byte[] exportExcel(String title, String[] headers, Collection<T> dataset) throws IOException {
        return this.exportExcel(title, headers, null, dataset, "yyyy-MM-dd", false);
    }

    /**
     * 这是一个通用的方法，利用了JAVA的反射机制，可以将放置在JAVA集合中并且符号一定条件的数据以EXCEL 的形式输出到指定IO设备上
     *
     * @param title   表格标题名
     * @param headers 表格属性列名数组
     * @param dataset 需要显示的数据集合,集合中一定要放置符合javabean风格的类的对象。此方法支持的
     *                javabean属性的数据类型有基本数据类型及String,Date,byte[](图片数据)
     *                //     * @param out     与输出设备关联的流对象，可以将EXCEL文档导出到本地文件或者网络中
     * @param pattern 如果有时间数据，设定输出格式。默认为"yyy-MM-dd"
     * @param haveSeq 是否包含序号列
     */
    @SuppressWarnings("unchecked")
    public byte[] exportExcel(String title, String[] headers, String[] columns,
                              Collection<T> dataset, String pattern, boolean haveSeq) throws IOException {
        // 声明一个工作薄
        SXSSFWorkbook workbook = new SXSSFWorkbook();
        // 生成一个表格
        SXSSFSheet sheet = workbook.createSheet(title);

        // 设置表格默认列宽度为15个字节
        sheet.setDefaultColumnWidth((short) 30);

        // 声明一个画图的顶级管理器
        Drawing patriarch = sheet.createDrawingPatriarch();

        // 产生表格标题行
        SXSSFRow row = sheet.createRow(0);

        // Create a new font and alter it.
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 11); //设置字号
        // Fonts are set into a style so create a new one to use.
        CellStyle style = workbook.createCellStyle();
        style.setFont(font);


        if (haveSeq) {      //有序列
            headers = ArrayUtils.add(headers, 0, "序号");
        }
        for (int i = 0; i < headers.length; i++) {
            SXSSFCell cell = row.createCell(i);
            cell.setCellStyle(style);
            cell.setCellValue(headers[i]);
        }

        // 遍历集合数据，产生数据行
        Iterator<T> it = dataset.iterator();
        int index = 0;
        while (it.hasNext()) {
            index++;
            row = sheet.createRow(index);
            T t = it.next();

            Field[] fields = t.getClass().getDeclaredFields();      // 利用反射，根据javabean属性的先后顺序，动态调用getXxx()方法得到属性值
            int celNum = haveSeq ? 1 : 0;
            if (haveSeq) {      //有序列
                row.createCell(0).setCellValue(Integer.valueOf(index));
            }
            if (columns == null) {
                for (short i = 0; i < fields.length; i++) {
                    Field field = fields[i];
                    String fieldName = field.getName();
                    if (fieldName.equals("serialVersionUID")) {
                        continue;
                    }
                    SXSSFCell cell = row.createCell(celNum++);
                    cell.setCellStyle(style);
                    String getMethodName = "get"
                            + fieldName.substring(0, 1).toUpperCase()
                            + fieldName.substring(1);
                    try {
                        Class tCls = t.getClass();
                        Method getMethod = tCls.getMethod(getMethodName, new Class[]{});
                        this.writeCell(t, getMethod, pattern, row, sheet, index, patriarch, workbook, cell, i);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            } else {
                for (short i = 0; i < columns.length; i++) {
                    SXSSFCell cell = row.createCell(celNum++);
                    cell.setCellStyle(style);
                    Class tCls = t.getClass();
                    String getMethodName = "get"
                            + columns[i].substring(0, 1).toUpperCase()
                            + columns[i].substring(1);
                    try {
                        Method getMethod = tCls.getMethod(getMethodName, new Class[]{});
                        this.writeCell(t, getMethod, pattern, row, sheet, index, patriarch, workbook, cell, i);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }
        ByteArrayOutputStream excelOutput = new ByteArrayOutputStream();
        workbook.write(excelOutput);
        return excelOutput.toByteArray();
    }


    private void writeCell(T t, Method getMethod, String datePattern, SXSSFRow row, SXSSFSheet sheet,
                           int index, Drawing patriarch, SXSSFWorkbook workbook, SXSSFCell cell, short i)
            throws InvocationTargetException, IllegalAccessException {
        Object value = getMethod.invoke(t, new Object[]{});
        // 判断值的类型后进行强制类型转换
        if (value instanceof Integer) {
            cell.setCellValue(Integer.valueOf(String.valueOf(value)));
        } else if (value instanceof BigDecimal) {
            cell.setCellValue(Double.valueOf(new DecimalFormat("#.##").format(value)));
        } else if (value instanceof Date) {
            Date date = (Date) value;
            SimpleDateFormat sdf = new SimpleDateFormat(datePattern);
            cell.setCellValue(sdf.format(date));
        } else {        // 其它数据类型都当作字符串简单处理
            cell.setCellValue(String.valueOf(value));
        }
    }


}
