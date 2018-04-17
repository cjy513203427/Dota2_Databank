package com.xgt.util;

/**
 * Created by Administrator on 2017/10/11.
 */
public class TextUtil {
    public static boolean isEmpty(Object obj){
        if("".equals(obj)||obj==null){
            return true;
        }
        return false;
    }
}