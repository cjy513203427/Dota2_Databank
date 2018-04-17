package com.xgt.util;

/**
 * Created by CC on 2017/3/13.
 */

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 *
 * @author Steven
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
// XML文件中的根标识
@XmlRootElement(name = "Weather")
// 控制JAXB 绑定类中属性和字段的排序
@XmlType(propOrder = {
        "city",
        "figure1",
        "figure2",
        "temperature1",
        "temperature2",
        "pollution_l",
        "status1",
        "status2"
})
public class Weather {
    private String status1;

    private String status2;

    private String city;

    private String figure1;

    private String figure2;

    private String temperature1;

    private String temperature2;

    private String pollution_l;

    public String getStatus1() {
        return status1;
    }

    public void setStatus1(String status1) {
        this.status1 = status1;
    }

    public String getStatus2() {
        return status2;
    }

    public void setStatus2(String status2) {
        this.status2 = status2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getFigure1() {
        return figure1;
    }

    public void setFigure1(String figure1) {
        this.figure1 = figure1;
    }

    public String getFigure2() {
        return figure2;
    }

    public void setFigure2(String figure2) {
        this.figure2 = figure2;
    }

    public String getTemperature1() {
        return temperature1;
    }

    public void setTemperature1(String temperature1) {
        this.temperature1 = temperature1;
    }

    public String getTemperature2() {
        return temperature2;
    }

    public void setTemperature2(String temperature2) {
        this.temperature2 = temperature2;
    }

    public String getPollution_l() {
        return pollution_l;
    }

    public void setPollution_l(String pollution_l) {
        this.pollution_l = pollution_l;
    }
}
