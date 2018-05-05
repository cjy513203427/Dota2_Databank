package com.xgt.util;

/**
 * Created by hasee on 2018/5/3.
 */
public class SteamUtil {
    /**
     * 将32位steamId转成64位
     * @param steamId32
     * @return
     */
    public static Long generateSTEAMID64(Long steamId32) {
        Long STEAMID32= Long.valueOf(steamId32);
        Long STEAMID64 = null;
        Long middle = 76561197960265728L;
        STEAMID64 = STEAMID32 + middle ;
        return STEAMID64;
    }
}
