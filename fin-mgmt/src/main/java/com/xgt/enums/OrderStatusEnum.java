package com.xgt.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: lb on 2016/11/30.
 * Date:2016-11-30-9:18
 * desc：订单状态
 */
public enum OrderStatusEnum {

    Service_Confirmation(1,"客服确认"),
    Mark_Confirmation(2,"表现师确认"),
    Upload_SmallImage(3,"上传小图"),
    Upload_BigImage(4,"上传大图"),
    Upload_Model(5,"上传模型"),
    UNKONW(-1,"未知");


    private int code;
    private String value;

    OrderStatusEnum(int code, String value) {
        this.code = code;
        this.value = value;
    }

    public static OrderStatusEnum convert(int code){
        for(OrderStatusEnum orderStatus: OrderStatusEnum.values()){
            if(orderStatus.code==code){
                return orderStatus;
            }
        }
        return UNKONW;
    }

    public static Map<String,Object> toList(){
        Map<String,Object> result=new HashMap<>();
        List<Object[]> list=new ArrayList<>();
        for(OrderStatusEnum orderStatusEnum: OrderStatusEnum.values()){
            if(orderStatusEnum.code!=-1) {
                Object[] o = {orderStatusEnum.code, orderStatusEnum.value};
                list.add(o);
            }
        }
        result.put("items",list);
        result.put("name","ORDER_STATUS");
        return result;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
