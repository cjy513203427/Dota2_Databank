package com.xgt.util;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.*;

import java.util.*;

/**
 * fastjson自定义序列化<br>
 * 
 * <br>
 *         参数模板参考如下: <br>
 *         <blockquote>
 *         <table border=0 cellspacing=3 cellpadding=0 summary="指定的序列化格式和参数的类型.">
 *         <tr bgcolor="#ccccff">
 *         <th align=left>格式化类型key</th>
 *         <th align=left>说明</th>
 *         <th align=left>参数格式</th>
 *         </t
 *         <td>serializeForDate</td>
 *         <td>对Date进行序列化格式</td>
 *         <td>map.put("serializeForDate","yyyy-MM-dd")</td>
 *         </tr>
 *         <tr>r>
 *         <tr>
 *         <td>serializeForPropertyFilter</td>
 *         <td>对指定的属性进行序列化格式</td>
 *         <td>
 *         map.put("serializeForPropertyFilter","new String[]{属性1,属性2,....}")</td>
 *         </tr>
 *         <tr>
 *         <td>serializeForAfterFilter</td>
 *         <td>在序列化完成后添加属性</td>
 *         <td>map.put("serializeForPropertyFilter",AfterFilter)</td>
 *         </tr>
 *         <tr>
 *         <td>serializeForValueFilter</td>
 *         <td>对Value值进行自定义序列化</td>
 *         <td>map.put("serializeForPropertyFilter",ValueFilter)</td>
 *         </tr>
 *         <tr>
 *         <td>serializeForNameFilter</td>
 *         <td>对key值进行自定义序列化</td>
 *         <td>map.put("serializeForPropertyFilter",NameFilter)[
 *         此方法和serializeForPropertyFilter同时使用时，将要被替换的key也写String[]中即可，不用将新值写在里面]
 *         </td>
 *         </tr>
 *         </table>
 * <br>
 *         使用步骤参考:<br>
 *         <table border=0 cellspacing=3 cellpadding=0 summary="指定的序列化格式和参数的类型.">
 *         <tr bgcolor="#ccccff">
 *         <td>1.创建Map<String,Object>,其中key为格式化的类型，参考下面;value为值<br>
 *         -| 1.1 指定key=METHOD_VALUE_FILTER（serializeForValueFilter）时，需要创建Filter
 *         实现接口 ValueFilter即可</td>
 *         </tr>
 *         <tr>
 *         <td>
 *         2.指定要参与属性过滤对象的clazz，不指定默认为null，在级联情况下全部对象都参与指定属性的过滤</td>
 *         </tr>
 *         <tr bgcolor="#ccccff">
 *         <td>
 *         3.转换为JSONObject或者JSONArray 调用parseToJSONObject parseToJSONArray</td>
 *         </tr>
 * 
 *         </blockquote>
 *
 */
// 基于FastJSON工具
public class JSONUtil {
	/**
	 * 指定要过滤的类型<br>
	 * <blockquote>
	 * <table border=0 cellspacing=3 cellpadding=0 summary="指定的序列化格式和参数的类型.">
	 * <tr bgcolor="#ccccff">
	 * <td>指定要属性过滤的对象类型，这样就避免了过滤的层次太深</td>
	 * </tr>
	 * <tr bgcolor="#ccccff">
	 * <td>例如，Order中Product，只需要过滤Order的属性，Product的不参与过滤的情况，指定clazz=Order.class</td>
	 * </tr>
	 * </table>
	 * </blockquote>
	 */

	/**
	 * 指定需要对Date进行序列化格式
	 */
	public static String METHOD_DATE = "serializeForDate";
	/**
	 * 指定需要对属性key进行序列化格式
	 */
	public static String METHOD_PROPERTY_FILTER = "serializeForPropertyFilter";
	/**
	 * 指定需要在序列化完成后添加属性
	 */
	public static String METHOD_AFTER_FILTER = "serializeForAfterFilter";
	/**
	 * 指定对Value值进行自定义序列化
	 */
	public static String METHOD_VALUE_FILTER = "serializeForValueFilter";
	/**
	 * 指定对key值进行自定义序列化
	 */
	public static String METHOD_NAME_FILTER = "serializeForNameFilter";

	/**
	 * 转换为JSONObject
	 * 
	 * @param object
	 * @param methodsParam
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static JSONObject parseToJSONObject(Object object,
											   Map<String, Object> methodsParam, Class clazz) {
		return JSONObject.parseObject(process(object, methodsParam,
				"jsonObject", clazz));
	}

	/**
	 * 转换为JSONArray
	 * 
	 * @param object
	 * @param methodsParam
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static JSONArray parseToJSONArray(Object object,
											 Map<String, Object> methodsParam, Class clazz) {
		return JSONArray.parseArray(process(object, methodsParam, "jsonArray",
				clazz));
	}

	/**
	 * 转换为JSONObject String
	 * 
	 * @param object
	 * @param methodsParam
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String parseToJSONObjectString(Object object,
			Map<String, Object> methodsParam, Class clazz) {
		return process(object, methodsParam, "jsonObject", clazz);
	}

	/**
	 * 转换为JSONArray String
	 * 
	 * @param object
	 * @param methodsParam
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String parseToJSONArrayString(Object object,
			Map<String, Object> methodsParam, Class clazz) {
		return process(object, methodsParam, "jsonArray", clazz);
	}

	/**
	 * 转换JSONObject String为LinkedHashMap对象
	 * 
	 * @param jsonString
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static LinkedHashMap parseJSONObjectStringToObject(String jsonString) {
		return JSONObject.parseObject(jsonString, LinkedHashMap.class);
	}

	/**
	 * 转换JSONArray字符串为List集合<br>
	 * 一般在JsonArray强转List的时候情况下使用，避免转换后key的顺序被打乱
	 * 
	 * @param jsonString
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static List<LinkedHashMap> parseJSONArrayStringToList(
			String jsonString) {
		return JSONArray.parseArray(jsonString, LinkedHashMap.class);
	}

	/**
	 * 判断JSON字符串是否为JSONArray
	 * 
	 * @param jsonString
	 * @return
	 */
	public static boolean isJSONArray(String jsonString) {
		if (jsonString != null && jsonString.length() > 1
				&& jsonString.indexOf("[") == 0) {
			return true;
		}
		return false;
	}

	/**
	 * 过滤出需要的属性
	 * @param obj
	 * @param clazz
	 * @return Object
	 */
	public static Object filterDateProperties(Object obj, Class<?> clazz) {
		Map<String, Object> map = new HashMap<>();
		map.put(METHOD_DATE, "yyyy-MM-dd HH:mm:ss");
		if (obj instanceof List) {
			List<Object> beanList = (List<Object>)obj;
			List<Object> list = new ArrayList<>();
			Object o;
			int size = beanList.size();
			for (int i = 0; i < size; i++) {
				o = parseToJSONObject(beanList.get(i),map,clazz);
				list.add(o);
			}
			return list;
		} else {
			return parseToJSONObject(obj,map,clazz);
		}
	}

	/**
	 * 过滤出需要的属性
	 * @param obj
	 * @param clazz
	 * @param properties
     * @return Object
     */
	public static Object filterIncludeProperties(Object obj, Class<?> clazz, String ...properties) {
		Map<String, Object> map = new HashMap<>();
		map.put(METHOD_PROPERTY_FILTER, properties);
		map.put(JSONUtil.METHOD_DATE, "yyyy-MM-dd HH:mm:ss");
		if (obj instanceof List) {
			List<Object> beanList = (List<Object>)obj;
			List<Object> list = new ArrayList<>();
			Object o;
			int size = beanList.size();
			for (int i = 0; i < size; i++) {
				o = parseToJSONObject(beanList.get(i),map,clazz);
				list.add(o);
			}
			return list;
		} else {
			return parseToJSONObject(obj,map,clazz);
		}
	}

	public static Map<String, Object> beanToMap(Object bean) throws Exception {
		Map<String, Object> map = new HashMap<>();
		JSONObject json = (JSONObject)bean;
		Set<String> keyset = json.keySet();
		for (String key : keyset) {
			map.put(key,json.get(key));
		}
		return map;
	}


	/**
	 * 通用转换方法
	 * 
	 * @param object
	 * @param methodsParam
	 * @param convertMethod
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private static String process(Object object,
			Map<String, Object> methodsParam, String convertMethod,
			final Class clazz) {
		// 存放Filter
		SerializeWriter out = new SerializeWriter();
		JSONSerializer serializer = new JSONSerializer(out);
		// 关闭引用检测和生成
		serializer.config(SerializerFeature.DisableCircularReferenceDetect,
				true);
		serializer.config(SerializerFeature.SortField, true);
		serializer.config(SerializerFeature.WriteMapNullValue, true);
		serializer.config(SerializerFeature.WriteNullNumberAsZero, true);
		serializer.config(SerializerFeature.WriteNullStringAsEmpty, true);
		Set<String> keySet = methodsParam.keySet();
		if (keySet.contains(METHOD_DATE)) {
			// 日期转换
			JSON.DEFFAULT_DATE_FORMAT = (String) methodsParam.get(METHOD_DATE);
			serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
		}
		if (keySet.contains(METHOD_NAME_FILTER)) {
			// 对返回值key进行修改
			serializer.getNameFilters().add(
					(NameFilter) methodsParam.get(METHOD_NAME_FILTER));
		}
		if (keySet.contains(METHOD_PROPERTY_FILTER)) {
			// 过滤属性
			final String[] keys = (String[]) methodsParam
					.get(METHOD_PROPERTY_FILTER);
			Arrays.sort(keys);// 使用binarySearch一定要先排序
			PropertyFilter filter = new PropertyFilter() {
				public boolean apply(Object source, String name, Object value) {
					if (source.getClass() == clazz || clazz == null) {
						if (Arrays.binarySearch(keys, name) >= 0) {
							return true;
						}
						return false;
					}
					return true;
				}
			};
			serializer.getPropertyFilters().add(filter);
		}
		if (keySet.contains(METHOD_AFTER_FILTER)) {
			// 序列化后添加新的值
			serializer.getAfterFilters().add(
					(AfterFilter) methodsParam.get(METHOD_AFTER_FILTER));
		}
		if (keySet.contains(METHOD_VALUE_FILTER)) {
			// 对返回值value进行修改
			serializer.getValueFilters().add(
					(ValueFilter) methodsParam.get(METHOD_VALUE_FILTER));
		}
		serializer.write(object);
		return out.toString();
	}
}
