package com.xgt.util;

/**
 * Created by hasee on 2018/5/4.
 */
public class WeatherInfo {
    //天气
    private String text;
    //天气现象代码
    private Integer code;

    private Integer temperature;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }
}
