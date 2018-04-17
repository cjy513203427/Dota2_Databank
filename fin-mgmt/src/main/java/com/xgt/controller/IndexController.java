package com.xgt.controller;


import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.config.shiro.OfficeUsernamePasswordToken;
import com.xgt.exception.EnumPcsService;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.exception.IncorrectOfficeException;
import com.xgt.service.UserService;
import com.xgt.util.HttpClientUtils;
import io.swagger.annotations.Api;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * Author: CC
 * Date: 2016/8/18
 * Desc:首页
 */
@Controller
@Path("/index")
@Api(value = "/index", produces = MediaType.APPLICATION_JSON, consumes = MediaType.APPLICATION_JSON)
public class IndexController extends BaseController{

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private SecurityManager securityManager;

    @Autowired
    private UserService userService;


    @Value("${qq.app_id}")
    protected String appId;
    @Value("${qq.app_secret}")
    protected String appSecret;
    @Value("${qq.redirect_uri}")
    protected String redirectUri;
    @Value("${qq.redirect_open_uri}")
    protected String redirectOpenUri;




    @GET
    @Path(value="/")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult index(){// 第一次调用登陆接口是，会走该接口
        return newResult();
    }

    @GET
    @Path(value="/login")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult login(){
        PcsResult result = new PcsResult();
        result.setCode(EnumPcsServiceError.ACCESS_TOKEN_INVALID.getCode()).setMessage(EnumPcsServiceError.ACCESS_TOKEN_INVALID.getDesc());
        return result;
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    // 此方法不处理登录成功,由shiro进行处理.
    public PcsResult login(@Context HttpServletRequest request,@FormParam("username") String username,
                           @FormParam("password") String password,@FormParam("roomcode")String roomcode) throws Exception {
        PcsResult result = new PcsResult();
        SecurityUtils.setSecurityManager(securityManager);
        Subject subject = SecurityUtils.getSubject();
        OfficeUsernamePasswordToken token=new OfficeUsernamePasswordToken(username,password,roomcode);
        try {
            subject.login(token);
        } catch (AuthenticationException exception) {
            // 登录失败从request中获取shiro处理的异常信息。
            // shiroLoginFailure:就是shiro异常类的全类名.
            EnumPcsServiceError msg = EnumPcsServiceError.BUSINESS_DATA_NONE;
            if (exception != null) {
                if (exception instanceof UnknownAccountException) {// 账号不存在
                    msg = EnumPcsServiceError.BUSINESS_USER_NONE;
                    logger.warn("login failed, account not existed. account={}", username);
                } else if (exception instanceof IncorrectCredentialsException) {// 密码不正确
                    msg = EnumPcsServiceError.BUSINESS_USER_PASSWORD_ERROR;
                    logger.warn("login failed, password not correct. account={}", username);
                } else if (exception instanceof ExcessiveAttemptsException) {// 登录失败多次
                    msg = EnumPcsServiceError.BUSINESS_USER_LOGIN_ERROR;
                    logger.warn("login failed, login failed times too much. account={}", username);
                } else if ("kaptchaValidateFailed".equals(exception)) {// 验证码错误
                    msg = EnumPcsServiceError.BUSINESS_USER_VERIFYCODE_ERROR;
                }else if (exception instanceof IncorrectOfficeException) {
                    msg = EnumPcsServiceError.BUSINESS_ROOM_EXISTED;
                    logger.warn("login failed, login failed not in office. account={}", username);
                }
            }
            result.setCode(msg.getCode()).setMessage(msg.getDesc());
        }
        return result;
    }


    private EnumPcsService doLogin(String username) throws ServletException, IOException {
        SecurityUtils.setSecurityManager(securityManager);
        Subject subject = SecurityUtils.getSubject();
        OfficeUsernamePasswordToken token=new OfficeUsernamePasswordToken(username,"cc0421CHEN233.","0421CC520ZYH");
        EnumPcsService msg= EnumPcsService.SUCCESS;
        try {
            subject.login(token);
        } catch (AuthenticationException exception) {
            // 登录失败从request中获取shiro处理的异常信息。
            // shiroLoginFailure:就是shiro异常类的全类名.
            msg = EnumPcsService.ERROR_OPERATE;
        }
        return msg;
    }


    /**
     * 企业QQ登录所需state 防止CSRF http://open.b.qq.com/wiki/oauth:login
     *
     * @return
     * @throws Exception
     */
    @GET
    @Path("/generateStateCode")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult generateStateCode(@Context HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        String state = UUID.randomUUID().toString();
        session.setAttribute(session.getId(), state);
        return newResult().setData(state);
    }


    @POST
    @Path("/logout")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult logout() {
        SecurityUtils.getSubject().logout();
        return newResult();
    }

    /**
     * Post 请求企业QQ 开放平台api
     *
     * @param url
     * @param params
     * @return
     */
    private JsonObject requestApi(String url, Map params) {
        HttpPost httpPost = HttpClientUtils.getHttpPost(url, params);
        HttpClient httpClient = HttpClientUtils.getHttpClient();
        String result = HttpClientUtils.executeMethod(httpClient, httpPost);
        JsonParser p = new JsonParser();
        JsonObject jsonObj = p.parse(result).getAsJsonObject();
        return jsonObj;
    }
}
