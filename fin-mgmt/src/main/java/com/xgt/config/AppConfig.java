package com.xgt.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * A simple class to display read property files. If you DO NOT want to use <b>
 * {@link @Value} </b>annotation to inject configuration properties,you should
 * use <b> {@link @ConfigurationProperties} </b> annotion and provide getter and
 * setter method,and what's more the filed should be exist in property file!
 * <p>
 * <p>
 * 针对外部的配置文件（如类似/tmp/spring-extra.properties），可以用两种方式去读取配置文件内容。
 * <p>
 * 1）使用@PropertySource注解加载配置文件 但是此注解载入的配置文件的优先级较低，
 * 如果application.properties（或者通过@ConfigurationProperties加载的配置文件）
 * 中含有同名的属性，则使用的application
 * .properties中的属性。如果<b>加载的配置文件不存在，则在Spring在加载Bean时会报错！</b>
 * <p>
 * 2)通过@ConfigurationProperties注解配置文件
 * 此注解加载的配置文件的优先级是按照locations中设置的顺序来决定，靠前的文件优先级更高！如果加载的配置文件不存在，则在Spring在加载Bean时
 * 不会报错，但是获取的属性为空！
 */
@Component
@ConfigurationProperties(locations = {"classpath:application.properties"}, prefix = "app")
public class AppConfig {
	
	private static final Logger logger = LoggerFactory.getLogger(AppConfig.class);

    // We want to be VERY careful about using "profiles" to activate/deactivate system functions
    // Therefore we list all the profiles allowed here, and let's be VERY careful about expanding
    // this list.
	//开发、测试、预发布、生产环境
	static String [] envGroup = {"dev", "test", "prod","preprod"};
	//服务
	static String [] serGroup = {"user"};
	//代码、工程测试
	static String [] testGroup = {"aop", "tps"};
	
    private static final Set<String> allowedProfiles = new HashSet<String>();

    private String version;

    @Value("${spring.profiles.active}")
    private String springProfiles;

    @PostConstruct
    private void init() {
        // Display our current profiles, "warning" because app restart is
        // something we need to pay attention to
        logger.warn("===== App Started with Profiles: " + springProfiles + ", version = " + this.getVersion() + " =====");
        
        allowedProfiles.addAll(Arrays.asList(envGroup));
        allowedProfiles.addAll(Arrays.asList(serGroup));
        allowedProfiles.addAll(Arrays.asList(testGroup));
        
        for (String profile : springProfiles.split(",")) {
            profile = profile.trim();
            if (StringUtils.isEmpty(profile)) {
                return;
            }
            if (!allowedProfiles.contains(profile)) { // This is not an allowed profile
                String msg = "Profile not allowed: " + profile;
                logger.error(msg);
                throw new RuntimeException(msg);
            }
        }
    }


    public String getSpringProfiles() {
        return springProfiles;
    }

    public void setSpringProfiles(String springProfiles) {
        this.springProfiles = springProfiles;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
