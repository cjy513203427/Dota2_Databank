package com.xgt.config;

import com.xgt.config.shiro.KickoutSessionControlFilter;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by CC on 2016/9/9.
 * Desc:
 */
@Configuration
public class WebConfig {


    @Bean
    public ServletRegistrationBean finUiServlet() {
        return new ServletRegistrationBean(new FinUiServlet(), "/*");
    }

    @Bean
    public ServletRegistrationBean uploadServlet() {
        return new ServletRegistrationBean(new UploadServlet(), "/upload/*");
    }

    @Bean
    public ServletRegistrationBean systemInitServlet() {
        ServletRegistrationBean systemInitServlet = new ServletRegistrationBean(new SystemInitServlet());
        systemInitServlet.setLoadOnStartup(1);
        return systemInitServlet;
    }

    @Bean
    public FilterRegistrationBean corsFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new SimpleCORSFilter());
        filterRegistrationBean.setName("corsFilter");
        filterRegistrationBean.addUrlPatterns("/rest/*");
        return filterRegistrationBean;
    }

    @Profile("prod")
    @Bean
    public FilterRegistrationBean ApiFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new ApiCORSFilter());
        filterRegistrationBean.setName("ApiFilter");
        filterRegistrationBean.addUrlPatterns("/rest/api/*");
        return filterRegistrationBean;
    }

}
