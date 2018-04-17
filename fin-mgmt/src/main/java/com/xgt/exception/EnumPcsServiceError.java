package com.xgt.exception;

/**
 * all service error code config
 */
public enum EnumPcsServiceError {
    /**
     * sys enum config
     */
    SUCCESS(0, "成功"),

    ACCESS_TOKEN_INVALID(10000, "未登录"),
    ACCESS_UNAUTHORIZED(10001, "没有权限访问"),

    BUSINESS_DATA_NONE(20000, "未找到相关信息"),
    BUSINESS_USER_NONE(20001, "账号不存在"),
    BUSINESS_USER_PASSWORD_ERROR(20002, "密码错误"),
    BUSINESS_USER_VERIFYCODE_ERROR(20003, "验证码错误"),
    BUSINESS_USER_LOGIN_ERROR(20004, "登录失败超过限制"),
    BUSINESS_EXPORT_LIMIT(20005, "导出数据天数超过限制"),
    BUSINESS_USER_EXISTED(20006, "用户名已经存在"),
    BUSINESS_ROLE_EXISTED(20007, "角色名已经存在"),
    BUSINESS_ROOM_EXISTED(20008, "请在办公室登录"),
    BUSINESS_CUSTOMER_EXISTED(20009, "客户已经存在"),


    PARAM_NO_PRIVILEGE(40000, "未登录"),
    PARAM_PUBLIC_INVALID(40001, "公共参数无效"),
    PARAM_INVALID(40002, "参数无效"),
    PARAM_INVALID_EMPTY(40003, "参数不能为空"),
    PARAM_MISMATCH(40004, "参数类型不匹配"),
    PARAM_JSON_CONVERT_INVALID(40005, "JSON格式不正确"),

    ERROR_SERVER(500, "服务器异常"),
    ERROR_OPERATE(501, "操作失败"),

    ERROR_REGISTER(100,"注册失败"),
    ERROR_LOGIN(101,"登录失败");
    
    private Integer code;
    
    private String desc;

    private EnumPcsServiceError(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    /**
     * 
     * @param code
     * @return enum pcs
     */
    public static EnumPcsServiceError valueOf(Integer code) {
        for (EnumPcsServiceError returnCode : values()) {
            if (code.equals(returnCode.code)) {
                return returnCode;
            }
        }
        throw new IllegalArgumentException("No matching constant for [" + code + "]");
    }

    public static boolean isBusinessError(EnumPcsServiceError error) {
        return error.getCode() < 50000;
    }
}
