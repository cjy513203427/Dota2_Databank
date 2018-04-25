package com.xgt.config;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * 解决跨域问题
 */
public class SimpleCORSFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        /**
         两种方法都可以使用，第一种更简便些
         */
        /*HttpServletResponse response  = (HttpServletResponse) res;
        String []  allowDomain= {"http://127.0.0.1:1841","http://localhost:1234"};
        Set<String> allowedOrigins= new HashSet<String>(Arrays.asList(allowDomain));
        String originHeader=((HttpServletRequest) req).getHeader("Origin");
        if (allowedOrigins.contains(originHeader)) {
            response.setHeader("Access-Control-Allow-Origin", originHeader);
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "content-type, x-requested-with");
            response.setHeader("Access-Control-Allow-Credentials", "true");
        }
        chain.doFilter(req, res);*/

        HttpServletResponse response  = (HttpServletResponse) res;
        String originHeader=((HttpServletRequest) req).getHeader("Origin");
        if ("http://127.0.0.1:1841".equals(originHeader)) {
            response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:1841");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "content-type, x-requested-with");
            response.setHeader("Access-Control-Allow-Credentials", "true");
        }else if("http://localhost:1234".equals(originHeader)){
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "content-type, x-requested-with");
            response.setHeader("Access-Control-Allow-Credentials", "true");
        }else if("http://127.0.0.1:8889".equals(originHeader)){
            response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8889");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "content-type, x-requested-with");
            response.setHeader("Access-Control-Allow-Credentials", "true");
        }else if(originHeader==null){
            chain.doFilter(req,res);
        }
        chain.doFilter(req, res);
    }

    public void init(FilterConfig filterConfig) {}

    public void destroy() {}

}