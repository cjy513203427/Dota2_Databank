package com.xgt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.listing.ApiListingResource;
import io.swagger.jaxrs.listing.SwaggerSerializers;

@Configuration
public class SwaggerConfigs {
	
	@Bean
	public BeanConfig swaggerConfig() {		
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0.0");
        beanConfig.setResourcePackage("com.xgt.controller");
        beanConfig.setScan(true);
        beanConfig.setBasePath("/rest");
        return beanConfig;
    }

	
	@Bean
	public ApiListingResource apiListingResource() {
        return new ApiListingResource();
    }
    
    @Bean
    public SwaggerSerializers swaggerSerializers() {
        return new SwaggerSerializers();
    }

}