package com.xgt.util;

import org.apache.shiro.crypto.hash.SimpleHash;

/**
 * Author: CC
 * Date: 2016/8/19
 * Desc:加密工具
 */
public class EncryptUtil {

    private static final String DEFAULT_SALT = "changtian";

    public static String md5(String target) {
        return encrpt("md5", target, DEFAULT_SALT, 2);
    }

    public static String md5(String target, String salt, int hashIterations) {
        return encrpt("md5", target, salt + DEFAULT_SALT, hashIterations);
    }

    private static String encrpt(String algorithmName, String target, String salt, int hashIterations) {
        SimpleHash hash = new SimpleHash(algorithmName, target, salt, hashIterations);
        return hash.toHex();
    }

    public static void main(String[] args) {
        System.out.println(md5("ctim123", "admin", 2));
    }

    public static String getDefaultSalt() {
        return DEFAULT_SALT;
    }
}
