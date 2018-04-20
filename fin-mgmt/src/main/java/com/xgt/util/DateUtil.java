package com.xgt.util;

import io.swagger.models.auth.In;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.util.StringUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * Author CC
 * Date: 2016年3月29日
 * Desc: 日期工具类
 */
public class DateUtil {

    /**
     * 根据输入格式获取日期字符串
     *
     * @return
     */
    public static String getStringDate() {
        return getStringDate("yyyy-MM-dd");
    }

    public static String getStringDate(String format) {
        return getStringDate(new Date(), format);
    }

    public static String getStringDate(Date d, String f) {
        if (d == null) return "";
        SimpleDateFormat sdf = new SimpleDateFormat(f);
        return sdf.format(d);
    }

    /**
     * 根据秒数获取时间
     *
     * @param date date
     * @return date
     */
    public static Long getTimeStamp(Date date) {
        if (date != null) {
            return date.getTime() / 1000;
        }
        return null;
    }


    /**
     * 根据秒数获取时间
     *
     * @param time 毫秒数
     * @return date
     */
    public static Date getTime(Long time) {
        if (time != null) {
            long Millis = Long.parseLong(time + "000");
            return new Date(Millis);
        }
        return null;
    }

    /**
     * 获得最近minute的开始时间
     * 如hour=0表示本小时的开始时间，如minute=-1表示上个分钟的开始时间，如minute=1表示下个分钟的开始时间
     *
     * @return Date
     */
    public static Date getCurrentHourStartTime(int minute) {
        SimpleDateFormat shortSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Calendar c = Calendar.getInstance();
        Date now = null;
        try {
            c.set(Calendar.MINUTE, c.get(Calendar.MINUTE) + minute);
            now = shortSdf.parse(shortSdf.format(c.getTime()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return now;
    }

    /**
     * 获得最近hour的开始时间
     * 如hour=0表示本小时的开始时间，如date=-1表示前一天的开始时间，如date=1表示下一天的开始时间
     *
     * @return Date
     */
    public static Date getCurrentDayStartTime(Date date, int day) {
        SimpleDateFormat shortSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        Date now = null;
        try {
            c.add(Calendar.DATE, day);
            now = shortSdf.parse(shortSdf.format(c.getTime()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return now;
    }

    /**
     * 获取传入日期相差天数
     *
     * @param start
     * @param end
     * @return
     */
    public static int diffDay(Date start, Date end) {
        return (int) ((
                DateUtils.truncate(end, Calendar.DAY_OF_MONTH).getTime() -
                        DateUtils.truncate(start, Calendar.DAY_OF_MONTH).getTime()
        ) / 86400000);
    }

    /*
    * 获取当前时间
    *  @return String
    * */
    public static String getCurrentTime() {
        Date date = new Date();
        DateFormat d2 = DateFormat.getDateTimeInstance();
        String time = d2.format(date);
        return time;
    }

    /**
     * 格式化日期
     *
     * @param dateStr
     * @param pattern
     * @return
     * @throws ParseException
     */
    public static Date formatDate(String dateStr, String pattern) throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        if (!StringUtils.isEmpty(dateStr)) {
            return new Date(df.parse(dateStr).getTime());
        }
        return null;
    }

    public static boolean getBeforeDate(String fdate, String ldate)
            throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date1 = sdf.parse(fdate);
        Date date2 = sdf.parse(ldate);
        return date1.before(date2);
    }

    /**
     * 获取传入日期的周
     *
     * @param date  当前日期
     * @param index 1.代表要获得周一 ，以此类推
     * @return
     */
    public static String getWeekDayTime(Date date, Integer index) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        // 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
        if (1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
        int day = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day + (index - 1));// 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        return sdf.format(cal.getTime());
    }
    /*
     * 将时间戳转换为时间
     */
    public static String stampToDate(String s){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long lt = new Long(s);
        Date date = new Date(lt);
        res = simpleDateFormat.format(date);
        return res;
    }

    public static void main(String[] args) throws ParseException {
        /*System.out.println(DateUtil.diffDay(new Date(), DateUtils.parseDate("2016-08-25 23:00:00", "yyyy-MM-dd HH:mm:ss")));
        System.out.println("time=="+DateUtil.getCurrentTime());
        System.out.println(getWeekTimeList(new Date()));*/
        System.out.println(TimeStamp2Date("1524055246"));
    }

    /**
     * 获取传入日期的周所有日期
     *
     * @param date 当前日期
     * @return
     */
    public static List<String> getWeekTimeList(Date date) {
        List<String> timeList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        // 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
        if (1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
        int day = cal.get(Calendar.DAY_OF_WEEK);
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);// 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        timeList.add(sdf.format(cal.getTime()));
        cal.add(Calendar.DATE, 1);
        timeList.add(sdf.format(cal.getTime()));
        cal.add(Calendar.DATE, 1);
        timeList.add(sdf.format(cal.getTime()));
        cal.add(Calendar.DATE, 1);
        timeList.add(sdf.format(cal.getTime()));
        cal.add(Calendar.DATE, 1);
        timeList.add(sdf.format(cal.getTime()));
        cal.add(Calendar.DATE, 1);
        timeList.add(sdf.format(cal.getTime()));
        cal.add(Calendar.DATE, 1);
        timeList.add(sdf.format(cal.getTime()));
        return timeList;
    }

    public static String getMonthFirstDay() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat datef = new SimpleDateFormat("yyyy-MM-dd");
        //当前月的第一天
        cal.set(GregorianCalendar.DAY_OF_MONTH, 1);
        Date beginTime = cal.getTime();
        return datef.format(beginTime) + " 00:00:00";
    }

    public static String getMonthLastDay() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat datef = new SimpleDateFormat("yyyy-MM-dd");
        //当前月的最后一天
        cal.set(Calendar.DATE, 1);
        cal.roll(Calendar.DATE, -1);
        Date endTime = cal.getTime();
        return datef.format(endTime) + " 23:59:59";
    }

    //Convert Unix timestamp to normal date style
    public static String TimeStamp2Date(String timestampString){
        Long timestamp = Long.parseLong(timestampString)*1000;
        String date = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date(timestamp));
        return date;
    }
}
