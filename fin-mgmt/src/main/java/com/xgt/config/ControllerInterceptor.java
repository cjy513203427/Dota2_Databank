
package com.xgt.config;


import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.util.IpUtil;
import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;


/**
 * 拦截器：记录用户接口操作次数
 * @author cc
 */

@Aspect
@Component
public class ControllerInterceptor extends BaseController {
    private static final Logger logger = LoggerFactory.getLogger(ControllerInterceptor.class);

    @Value("${spring.profiles.active}")
    private String env;


/**
     * 定义拦截规则：拦截com.xgt.controller.bs包下面的所有类中
     */

    @Pointcut("execution(* com.xgt.controller.bs..*.*(..))")
    public void controllerMethodPointcut(){}


/**
     * 拦截器具体实现
     * @param pjp
     * @return JsonResult（被拦截方法的执行结果，或需要登录的错误提示。）
     */

    @Around("controllerMethodPointcut()") //指定拦截器规则；也可以直接把“execution(* com.xjj.........)”写进这里
    public PcsResult Interceptor(ProceedingJoinPoint pjp){
        Object[] paramValues = pjp.getArgs();

        String accessToken = "";
        for(int i=0;i<paramValues.length;i++){
            if(accessToken!=null) {
                accessToken = paramValues[0].toString();
            }
        }


        Object result = null;
        try {
            String accessTokenKey="yipin888_BaishengModel";
            if(!accessToken.equals(accessTokenKey)){
                return newResult(false).setMessage("参数错误");
            }
            int requestCount=0;
            if(StringUtils.isNotEmpty(accessTokenKey)){
                requestCount++;
                if(requestCount>100){
                    return newResult(false).setMessage("请求的太快啦，休息一会再试试");
                }
            }
            if(result == null){
                // 一切正常的情况下，继续执行被拦截的方法
                result = pjp.proceed();
                requestCount++;
            }
        } catch (Throwable e) {
            logger.error("exception: ", e);
            return newResult(false).setMessage(""+e.getMessage());
        }
        return (PcsResult) result;
    }



}
