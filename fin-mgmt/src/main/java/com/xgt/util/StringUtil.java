package com.xgt.util;

import java.util.StringTokenizer;

/**
 * User: lb on 2016/9/7.
 * Date:2016-09-07-20:39
 * desc：
 */
public class StringUtil {

    public static String[] stringAnalytical(String string, String divisionChar)
    {
        int i = 0;
        StringTokenizer tokenizer = new StringTokenizer(string, divisionChar);

        String[] str = new String[tokenizer.countTokens()];

        while (tokenizer.hasMoreTokens())
        {
            str[i] = new String();
            str[i] = tokenizer.nextToken();
            i++;
        }

        return str;
    }
}
