package com.xgt.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.util.TextUtils;
import sun.misc.BASE64Decoder;

import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class FileUtils {
	public static final String FILEPATH = "Permanent_Data";

	// json写入文件
	public synchronized static void write2File(Object json, String fileName) {
		BufferedWriter writer = null;
		File filePath = new File(FILEPATH);
		JSONObject eJSON = null;
		
		if (!filePath.exists() && !filePath.isDirectory()) {
			filePath.mkdirs();
		}

		File file = new File(FILEPATH + File.separator + fileName + ".xml");
		System.out.println("path:" + file.getPath() + " abs path:" + file.getAbsolutePath());
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (Exception e) {
				System.out.println("createNewFile，出现异常:");
				e.printStackTrace();
			}
		} else {
			eJSON = (JSONObject) read2JSON(fileName);
		}

		try {
			writer = new BufferedWriter(new FileWriter(file));

			if (eJSON==null) {
				writer.write(json.toString());
			} else {
				Object[] array = ((JSONObject) json).keySet().toArray();
				for(int i=0;i<array.length;i++){
					eJSON.put(array[i].toString(), ((JSONObject) json).get(array[i].toString()));
				}

				writer.write(eJSON.toString());
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (writer != null) {
					writer.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	// 读文件到json
	public static JSONObject read2JSON(String fileName) {
		File file = new File(FILEPATH + File.separator + fileName + ".xml");
		if (!file.exists()) {
			return null;
		}

		BufferedReader reader = null;
		String laststr = "";
		try {
			reader = new BufferedReader(new FileReader(file));
			String tempString = null;
			while ((tempString = reader.readLine()) != null) {
				laststr += tempString;
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return (JSONObject) JSON.parse(laststr);
	}

	// 通过key值获取文件中的value
	public static Object getValue(String fileName, String key) {
		JSONObject eJSON = null;
		eJSON = (JSONObject) read2JSON(fileName);
		if (null != eJSON && eJSON.containsKey(key)) {
			@SuppressWarnings("unchecked")
			Map<String, Object> values = JSON.parseObject(eJSON.toString(), Map.class);
			return values.get(key);
		} else {
			return null;
		}
	}
   public static HashMap<Long, Long> toHashMap(JSONObject js)
   {  
	   if(js == null){
		   return null;
	   }
       HashMap<Long, Long> data = new HashMap<Long, Long>();  
       // 将json字符串转换成jsonObject  
       Set<String> set = js.keySet();
       // 遍历jsonObject数据，添加到Map对象  
       Iterator<String>  it = set.iterator();
       while (it.hasNext())  
       {  
           String key = String.valueOf(it.next());
           Long keyLong = Long.valueOf(key);
           
           String value = js.getString(key);
           Long valueLong;
           if(TextUtils.isEmpty(value)){
        	  valueLong = js.getLong(key);
           }else{
	          valueLong = Long.valueOf(value);
           }
           data.put(keyLong, valueLong);  
       }  
       return data;  
   }

	public static  byte[] getZip(String zipFile, String installationPackageName) throws IOException {
		installationPackageName = installationPackageName.toLowerCase();
		if (installationPackageName.indexOf(".zip") > 0 ) {
			zipFile = zipFile.replaceAll("data:file/zip;base64,", "");
		}

		BASE64Decoder decoder = new BASE64Decoder();
		// Base64解码
		byte[] zipByte = null;

		zipByte = decoder.decodeBuffer(zipFile);
		for (int i = 0; i < zipByte.length; ++i) {
			if (zipByte[i] < 0) {// 调整异常数据
				zipByte[i] += 256;
			}
		}
		return zipByte;
	}

	public static  byte[] getImage(String coverPath, String coverPathName) throws IOException {
		coverPathName = coverPathName.toLowerCase();
		if (coverPathName.indexOf(".jpg") > 0 || coverPathName.indexOf(".jpeg") > 0) {
			coverPath = coverPath.replaceAll("data:image/jpeg;base64,", "");
		} else if (coverPathName.indexOf(".png") > 0) {
			coverPath = coverPath.replaceAll("data:image/png;base64,", "");
		} else if (coverPathName.indexOf(".gif") > 0) {
			coverPath = coverPath.replaceAll("data:image/gif;base64,", "");
		}

		BASE64Decoder decoder = new BASE64Decoder();
		// Base64解码
		byte[] coverByte = null;

		coverByte = decoder.decodeBuffer(coverPath);
		for (int i = 0; i < coverByte.length; ++i) {
			if (coverByte[i] < 0) {// 调整异常数据
				coverByte[i] += 256;
			}
		}
		return coverByte;
	}

}
