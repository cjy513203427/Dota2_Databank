package com.xgt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

import javax.ws.rs.ApplicationPath;

/**
 * Author: CC
 * Date: 2016-08-16
 * Desc: 启动
 */
@Configuration
@EnableAutoConfiguration  //启用自动配置
@ComponentScan({"com.xgt"})
@ApplicationPath("/rest/")/*
@ImportResource({"classpath:applicationElastic.xml"})*/
public class FinancialApplication extends javax.ws.rs.core.Application
{
    public static void main(String[] args )
    {
        Object source = FinancialApplication.class;
        SpringApplication springApplication = new SpringApplication( new Object[] { source });
        springApplication.run(args);
    }
}
