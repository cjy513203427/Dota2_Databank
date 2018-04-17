package com.xgt.exception;

/**
 * The base class to handle PCS exceptions.
 * 
 */
public class PcsRunTimeException extends RuntimeException {
    /**
     * Default UID.
     */
    private static final long serialVersionUID = 3306270148021281526L;
    
    /**
     * The error code.
     */
    private Integer errorCode = EnumPcsServiceError.ERROR_SERVER.getCode();
    
    /**
     * The description.
     */
    private String description = EnumPcsServiceError.ERROR_SERVER.getDesc();
    
    /**
     * The error.
     */
    private EnumPcsServiceError error = EnumPcsServiceError.ERROR_SERVER;

    /**
     * 传输的数据
     */
    private Object data;

    /**
     * 用于区别是否是客户端的原因（如参数不正确）导致异常的出现
     */
    private boolean isClientError = false;

    /**
     * Default constructor.
     */
    public PcsRunTimeException() {
        super();
    }

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param message the message
     */
    public PcsRunTimeException(String message) {
        super(message);
    }

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param message the message
     * @param cause the cause
     */
    public PcsRunTimeException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param throwable the throwable
     */
    public PcsRunTimeException(Throwable throwable) {
        super(throwable);
    }

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     */
    public PcsRunTimeException(EnumPcsServiceError code) {
        super();
        this.errorCode = code.getCode();
        this.description = code.getDesc();
        this.error = code;
    }

    public PcsRunTimeException(EnumPcsServiceError code, Object data) {
        super();
        this.errorCode = code.getCode();
        this.description = code.getDesc();
        this.error = code;
        this.data = data;
    }

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param isClientError client error or server error
     */
    public PcsRunTimeException(EnumPcsServiceError code, boolean isClientError) {
        this(code);
        this.isClientError = isClientError;
    }
    
    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param cause the cause
     */
    public PcsRunTimeException(EnumPcsServiceError code, Throwable cause) {
        super(cause);
        this.errorCode = code.getCode();
        this.description = code.getDesc();
        this.error = code;
    }
    
    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param cause the cause
     * @param isClientError client error or server error
     */
    public PcsRunTimeException(EnumPcsServiceError code, Throwable cause, boolean isClientError) {
        this(code, cause);
        this.isClientError = isClientError;
    }
    
    

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param message the message
     */
    public PcsRunTimeException(EnumPcsServiceError code, String message) {
        super(message);
        this.errorCode = code.getCode();
        this.description = code.getDesc();
        this.error = code;
    }

    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param message the message
     * @param isClientError client error or server error
     */
    public PcsRunTimeException(EnumPcsServiceError code, String message, boolean isClientError) {
        this(code, message);
        this.isClientError = isClientError;
    }
    
    
    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param message the message
     * @param cause the cause
     * @param isClientError client error or server error
     */
    public PcsRunTimeException(EnumPcsServiceError code, String message, Throwable cause, boolean isClientError) {
        this(code, message, cause);
        this.isClientError = isClientError;
    }
    
    
    /**
     * Instantiates a new pcs run time exception.
     *
     * @param code the code
     * @param message the message
     * @param cause the cause
     */
    public PcsRunTimeException(EnumPcsServiceError code, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = code.getCode();
        this.description = code.getDesc();
        this.error = code;
    }

    /**
     * Gets the error code.
     *
     * @return the error code
     */
    public Integer getErrorCode() {
        return errorCode;
    }

    /**
     * Sets the error code.
     *
     * @param errorCode the new error code
     */
    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * Gets the description.
     *
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the description.
     *
     * @param description the new description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets the error.
     *
     * @return the error
     */
    public EnumPcsServiceError getError() {
        return error;
    }

    /**
     * Sets the error.
     *
     * @param error the new error
     */
    public void setError(EnumPcsServiceError error) {
        this.error = error;
    }

    public boolean isClientError() {
        return isClientError;
    }

    public void setClientError(boolean isClientError) {
        this.isClientError = isClientError;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
