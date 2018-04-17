package com.xgt.config.shiro;

import io.undertow.servlet.spec.HttpServletRequestImpl;
import io.undertow.util.HttpString;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * Author: CC
 * Date: 2016-08-16
 * Desc: 解决shiro跳转问题（direct->forward）
 */
public class CustomAuthenticationFilter extends FormAuthenticationFilter {

    private static final Logger log = LoggerFactory.getLogger(FormAuthenticationFilter.class);


    public static final String ROOM_CODE_URL = "roomcode";


    protected String getRoomCode(ServletRequest request) {
        return WebUtils.getCleanParam(request,ROOM_CODE_URL);
    }

    protected AuthenticationToken createToken(
            ServletRequest request, ServletResponse response) {
        String username = getUsername(request);
        String password = getPassword(request);
        String roomcode = getRoomCode(request);
        boolean rememberMe = isRememberMe(request);
        String host = getHost(request);
        return new OfficeUsernamePasswordToken(
                username, password.toCharArray(), rememberMe, host,roomcode);
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {

        if (this.isLoginRequest(request, response)) {
            if (this.isLoginSubmission(request, response)) {
                if (log.isTraceEnabled()) {
                    log.trace("Login submission detected.  Attempting to execute login.");
                }
                return this.executeLogin(request, response);
            } else {
                if (log.isTraceEnabled()) {
                    log.trace("Login page view.");
                }
                return true;
            }
        } else {
            if (log.isTraceEnabled()) {
                log.trace("Attempting to access a path which requires authentication.  Forwarding to the Authentication url [" + this.getLoginUrl() + "]");
            }
            this.saveRequest(request);
            String loginUrl = this.getLoginUrl();
            // 设置GET方式来请求
            HttpServletRequestImpl myRequest = (HttpServletRequestImpl) ((ShiroHttpServletRequest) request).getRequest();
            String noUrl=WebUtils.getPathWithinApplication((HttpServletRequest)request);
            RequestDispatcher dispatcher = request.getRequestDispatcher(loginUrl);
            if(noUrl.indexOf("index/")>0||noUrl.indexOf("api/")>0||noUrl.indexOf("dingding/")>0||noUrl.indexOf("/bs")>0
            ||noUrl.indexOf("brandApi/")>0||noUrl.indexOf("photoApi/")>0||noUrl.indexOf("brand/")>0
            ||noUrl.indexOf("photo/")>0||noUrl.indexOf("picturetype/")>0||noUrl.indexOf("picturelocal/")>0|| noUrl.indexOf("cadlocal/")>0
            ||noUrl.indexOf("bsVersionApi/")>0||noUrl.indexOf("excelserver/")>0||noUrl.indexOf("pictureserver/")>0||noUrl.indexOf("cadserver/")>0
            ||noUrl.indexOf("installationPackageServerApi/")>0||noUrl.indexOf("configurationFileServerApi/")>0||noUrl.indexOf("configurationFileServer/")>0
            ||noUrl.indexOf("coverServer/")>0||noUrl.indexOf("hero/")>0||noUrl.indexOf("item/")>0||noUrl.indexOf("talent/")>0){
                dispatcher = request.getRequestDispatcher(noUrl);
            }else{
                myRequest.getExchange().setRequestMethod(HttpString.tryFromString("GET"));
            }
            dispatcher.forward(request, response);
            return false;
        }
    }

    @Override
    protected void issueSuccessRedirect(ServletRequest request, ServletResponse response) throws Exception {
        // 设置GET方式来请求
        HttpServletRequestImpl myRequest = (HttpServletRequestImpl) ((ShiroHttpServletRequest) request).getRequest();
        myRequest.getExchange().setRequestMethod(HttpString.tryFromString("GET"));
        RequestDispatcher dispatcher = request.getRequestDispatcher(this.getSuccessUrl());
        dispatcher.forward(request, response);
        //  默认通过redirect方式跳转
        // WebUtils.redirectToSavedRequest(request, response, this.getSuccessUrl());
    }
}