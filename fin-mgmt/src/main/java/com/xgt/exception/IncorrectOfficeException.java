package com.xgt.exception;


import org.apache.shiro.authc.AuthenticationException;

/**
 * Created by CC on 2017/3/28.
 */
public class IncorrectOfficeException extends AuthenticationException {
    private static final long serialVersionUID = 4534659919444676048L;

    public IncorrectOfficeException() {
        super();
    }
    public IncorrectOfficeException(String message, Throwable cause) {
        super(message, cause);
    }
    public IncorrectOfficeException(String message) {
        super(message);
    }
    public IncorrectOfficeException(Throwable cause) {
        super(cause);
    }

}
