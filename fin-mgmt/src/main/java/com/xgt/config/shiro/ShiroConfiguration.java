package com.xgt.config.shiro;

import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Author: CC
 * Date: 2016/8/18
 * Desc:配置
 */
@Configuration
public class ShiroConfiguration {

    /**
     * ShiroFilterFactoryBean 处理拦截资源文件问题。
     * 注意：单独一个ShiroFilterFactoryBean配置是或报错的，以为在
     * 初始化ShiroFilterFactoryBean的时候需要注入：SecurityManager
     *
     Filter Chain定义说明
     1、一个URL可以配置多个Filter，使用逗号分隔
     2、当设置多个过滤器时，全部验证通过，才视为通过
     3、部分过滤器可指定参数，如perms，roles
     *
     */
    @Bean
    public CustomShiroFilterFactoryBean shirFilter(@Qualifier("securityManager") SecurityManager securityManager,
                                                   @Qualifier("kickoutSessionControlFilter") AccessControlFilter kickoutSessionControlFilter){
        CustomShiroFilterFactoryBean shiroFilterFactoryBean  = new CustomShiroFilterFactoryBean();

        // 必须设置 SecurityManager
        shiroFilterFactoryBean.setSecurityManager(securityManager);

        //拦截器.
        Map<String,String> filterChainDefinitionMap = new LinkedHashMap<>();

        //配置退出过滤器,其中的具体的退出代码Shiro已经替我们实现了
        filterChainDefinitionMap.put("/logout", "logout");

        //<!-- 过滤链定义，从上向下顺序执行，一般将 /**放在最为下边
        //<!-- authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问-->
        filterChainDefinitionMap.put("/rest/*/**", "authc");
        filterChainDefinitionMap.put("/rest/*/**", "kickout");
        filterChainDefinitionMap.put("/rest/index/**", "anon");
        filterChainDefinitionMap.put("/rest/api/**", "anon");
        filterChainDefinitionMap.put("/rest/bs/**", "anon");

        // 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
        shiroFilterFactoryBean.setLoginUrl("/rest/index/login");
        // 登录成功后要跳转的链接
        shiroFilterFactoryBean.setSuccessUrl("/rest/index");
        //未授权界面;
        shiroFilterFactoryBean.setUnauthorizedUrl("/403");

        Map<String, Filter> filters=new HashMap<>();
        filters.put("kickout",kickoutSessionControlFilter);
        shiroFilterFactoryBean.setFilters(filters);
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        return shiroFilterFactoryBean;
    }



    /**
     * 身份认证realm;
     * (这个需要自己写，账号密码校验；权限等)
     * @return MyShiroRealm
     */
    @Bean(name="myShiroRealm")
    public MyShiroRealm myShiroRealm(@Qualifier("hashedCredentialsMatcher") HashedCredentialsMatcher hashedCredentialsMatcher){
        MyShiroRealm myShiroRealm = new MyShiroRealm();
        myShiroRealm.setCredentialsMatcher(hashedCredentialsMatcher);
        return myShiroRealm;
    }


    @Bean(name="securityManager")
    public SecurityManager securityManager(@Qualifier("myShiroRealm")MyShiroRealm myShiroRealm,
                                           @Qualifier("ehCacheManager") EhCacheManager ehCacheManager,DefaultWebSessionManager sessionManager){
        DefaultWebSecurityManager securityManager =  new DefaultWebSecurityManager();
        //设置realm.
        securityManager.setRealm(myShiroRealm);
        //注入缓存管理器;
        securityManager.setCacheManager(ehCacheManager);//这个如果执行多次，也是同样的一个对象;
        securityManager.setSessionManager(sessionManager);
        return securityManager;
    }

    /**
     * 凭证匹配器
     * （由于我们的密码校验交给Shiro的SimpleAuthenticationInfo进行处理了
     *  所以我们需要修改下doGetAuthenticationInfo中的代码;
     * ）
     * @return HashedCredentialsMatcher
     */
    @Bean(name="hashedCredentialsMatcher")
    public HashedCredentialsMatcher hashedCredentialsMatcher(@Qualifier("ehCacheManager") EhCacheManager ehCacheManager){
//        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        RetryLimitCredentialsMatcher hashedCredentialsMatcher = new RetryLimitCredentialsMatcher(ehCacheManager);
        hashedCredentialsMatcher.setHashAlgorithmName("md5");//散列算法:这里使用MD5算法;
        hashedCredentialsMatcher.setHashIterations(2);//散列的次数，比如散列两次，相当于 md5(md5(""));

        return hashedCredentialsMatcher;
    }

    /**
     *  开启shiro aop注解支持.
     *  使用代理方式;所以需要开启代码支持;
     * @param securityManager securityManager
     * @return AuthorizationAttributeSourceAdvisor
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(@Qualifier("securityManager") SecurityManager securityManager){
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

    @Bean(name="sessionManager")
    public DefaultWebSessionManager defaultWebSessionManager() {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.setGlobalSessionTimeout(3600000*3);// 3小时（默认值也为30分钟）
        return sessionManager;
    }

    /**
     * shiro缓存管理器;
     * 需要注入对应的其它的实体类中：
     * 1、安全管理器：securityManager
     * 可见securityManager是整个shiro的核心；
     * @return EhCacheManager
     */
    @Bean(name="ehCacheManager")
    public EhCacheManager ehCacheManager(){
        EhCacheManager cacheManager = new EhCacheManager();
        cacheManager.setCacheManagerConfigFile("classpath:ehcache-shiro.xml");
        return cacheManager;
    }

    @Bean(name="sessionDao")
    public SessionDAO sessionDAO(){
        SessionDAO sessionDAO=new EnterpriseCacheSessionDAO();
        return sessionDAO;
    }


    @Bean(name = "kickoutSessionControlFilter")
    public AccessControlFilter kickoutSessionControlFilter(@Qualifier("sessionManager") DefaultWebSessionManager sessionManager,
                                                           @Qualifier("ehCacheManager") EhCacheManager ehCacheManager) {
        KickoutSessionControlFilter kickoutSessionControlFilter = new KickoutSessionControlFilter();
        kickoutSessionControlFilter.setSessionManager(sessionManager);
        kickoutSessionControlFilter.setCacheManager(ehCacheManager);
        kickoutSessionControlFilter.setMaxSession(1);
        kickoutSessionControlFilter.setKickoutAfter(false);
        kickoutSessionControlFilter.setKickoutUrl("../login.html");
        return kickoutSessionControlFilter;
    }
}
