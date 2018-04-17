package com.xgt.config;

import com.alibaba.druid.util.Utils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by jonnyLee on 2016/8/25.
 * Desc:
 */
public class UploadServlet extends HttpServlet{
    private static final long serialVersionUID = -8082982326078915362L;

    protected final String resourcePath = "fin-upload";



    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String contextPath = request.getContextPath();
        String servletPath = request.getServletPath();
        String requestURI = request.getRequestURI();
        response.setCharacterEncoding("utf-8");
        if(contextPath == null) {
            contextPath = "";
        }

        String uri = contextPath + servletPath;
        String path = requestURI.substring(contextPath.length() + servletPath.length());

        this.returnResourceFile(path, uri, response);
    }

    protected String getFilePath(String fileName) {
        return this.resourcePath + fileName;
    }


    protected void returnResourceFile(String fileName, String uri, HttpServletResponse response) throws ServletException, IOException {
        String filePath = this.getFilePath(fileName);
        if(filePath.endsWith(".html")) {
            response.setContentType("text/html; charset=utf-8");
        }
        if(fileName.endsWith(".png")||fileName.endsWith(".jpg")) {
            response.setContentType("Content-Type:image/jpeg");
            byte[] bytes = Utils.readByteArrayFromResource(filePath);
            if(bytes != null) {
                response.getOutputStream().write(bytes);
            }
        }else  if(filePath.endsWith(".jsp")) {
            response.sendRedirect(uri + fileName);
        } else if (fileName.endsWith(".ttf") || fileName.endsWith(".woff2")) {
            byte[] bytes = Utils.readByteArrayFromResource(filePath);
            if(bytes != null) {
                response.getOutputStream().write(bytes);
            }
        } else {
            String text = Utils.readFromResource(filePath);
            if(text == null || fileName.equals("")|| fileName.equals("/")) {
                response.sendRedirect(uri + "/index.html");
            } else {
                if(fileName.endsWith(".css")) {
                    response.setContentType("text/css;charset=utf-8");
                } else if(fileName.endsWith(".js")) {
                    response.setContentType("text/javascript;charset=utf-8");
                }

                response.getWriter().write(text);
            }
        }
    }
}
