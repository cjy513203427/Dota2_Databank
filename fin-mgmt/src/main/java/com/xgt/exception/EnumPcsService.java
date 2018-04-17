package com.xgt.exception;

/**
 * all service error code config
 */
public enum EnumPcsService {
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
    BUSINESS_TRADES_EXPORT_LIMIT(20005, "导出交易记录数据天数超过限制"),
    BUSINESS_USER_EXISTED(20006, "用户名已经存在"),
    BUSINESS_ROLE_EXISTED(20007, "角色名已经存在"),
    BUSINESS_VERSION_NOT_EXISTED(20008, "相应版本的app未上传"),
    BUSINESS_PRODUCT_NOT_EXISTED(20009, "相应产品的app未上传"),
    BUSINESS_PRODUCT_VERSION_NOT_VAILD(20010, "请确认上传的APP命名规范!"),
    BUSINESS_APK_PACK_FAIL(20012, "apk打包失败!"),
    BUSINESS_EXP_GOLD_EXPORT_LIMIT(20013, "导出体验金记录数据天数超过限制"),


    PARAM_NO_PRIVILEGE(40000, "未登录"),
    PARAM_PUBLIC_INVALID(40001, "公共参数无效"),
    PARAM_INVALID(40002, "参数无效"),
    PARAM_INVALID_EMPTY(40003, "参数不能为空"),
    PARAM_MISMATCH(40004, "参数类型不匹配"),
    PARAM_JSON_CONVERT_INVALID(40005, "JSON格式不正确"),
    PARAM_RESUBMIT(40006, "该记录已存在"),

    ERROR_SERVER(500, "服务器异常"),
    ERROR_OPERATE(501, "操作失败");
    
    private Integer code;
    
    private String desc;

    private EnumPcsService(Integer code, String desc) {
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
    public static EnumPcsService valueOf(Integer code) {
        for (EnumPcsService returnCode : values()) {
            if (code.equals(returnCode.code)) {
                return returnCode;
            }
        }
        throw new IllegalArgumentException("No matching constant for [" + code + "]");
    }

    public static boolean isBusinessError(EnumPcsService error) {
        return error.getCode() < 50000;
    }
}
