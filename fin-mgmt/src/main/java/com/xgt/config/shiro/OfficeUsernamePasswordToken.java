package com.xgt.config.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

/**
 * Created by CC on 2017/3/28.
 */
public class OfficeUsernamePasswordToken  extends UsernamePasswordToken {
    private static final long serialVersionUID = -836680140621002621L;
    private String roomcode;

    public String getRoomcode() {
        return roomcode;
    }

    public void setRoomcode(String roomcode) {
        this.roomcode = roomcode;
    }

    public OfficeUsernamePasswordToken() {
        super();
    }
    public OfficeUsernamePasswordToken(final String username, final String password,String roomcode) {
        super(username,password.toCharArray());
        this.roomcode=roomcode;
    }
    public OfficeUsernamePasswordToken(String username,char[] password,
                                        boolean rememberMe, String host,String roomcode) {
        super(username, password, rememberMe, host);
        this.roomcode = roomcode;
    }

}
