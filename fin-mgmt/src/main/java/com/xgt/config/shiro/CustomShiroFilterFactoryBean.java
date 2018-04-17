package com.xgt.config.shiro;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.util.CollectionUtils;
import org.apache.shiro.util.Nameable;
import org.apache.shiro.util.StringUtils;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.filter.authc.AuthenticationFilter;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.apache.shiro.web.filter.mgt.DefaultFilterChainManager;
import org.apache.shiro.web.filter.mgt.FilterChainManager;

import javax.servlet.Filter;
import java.util.Map;

public class CustomShiroFilterFactoryBean extends ShiroFilterFactoryBean {

  @Override
  protected FilterChainManager createFilterChainManager() {
    DefaultFilterChainManager manager = new DefaultFilterChainManager();
    CustomAuthenticationFilter loginFilter = new CustomAuthenticationFilter();
    loginFilter.setName("authc");
    manager.getFilters().put("authc", loginFilter);
    Map<String, Filter> defaultFilters = manager.getFilters();
    defaultFilters.values().forEach(this::applyGlobalPropertiesIfNecessary);

    Map<String, Filter> filters = getFilters();
    if (!CollectionUtils.isEmpty(filters)) {
      for (Map.Entry<String, Filter> entry : filters.entrySet()) {
        String name = entry.getKey();
        Filter filter = entry.getValue();
        applyGlobalPropertiesIfNecessary(filter);
        if (filter instanceof Nameable) {
          ((Nameable) filter).setName(name);
        }
        manager.addFilter(name, filter, false);
      }
    }

    // build up the chains:
    Map<String, String> chains = getFilterChainDefinitionMap();
    if (!CollectionUtils.isEmpty(chains)) {
      for (Map.Entry<String, String> entry : chains.entrySet()) {
        String url = entry.getKey();
        String chainDefinition = entry.getValue();
        manager.createChain(url, chainDefinition);
      }
    }
    return manager;
  }

  private void applyGlobalPropertiesIfNecessary(Filter filter) {
    applyLoginUrlIfNecessary(filter);
    applySuccessUrlIfNecessary(filter);
    applyUnauthorizedUrlIfNecessary(filter);
  }

  private void applyLoginUrlIfNecessary(Filter filter) {
    String loginUrl = getLoginUrl();
    if (StringUtils.hasText(loginUrl)
        && (filter instanceof AccessControlFilter)) {
      AccessControlFilter acFilter = (AccessControlFilter) filter;
      // only apply the login url if they haven't explicitly configured
      // one already:
      String existingLoginUrl = acFilter.getLoginUrl();
      if (AccessControlFilter.DEFAULT_LOGIN_URL.equals(existingLoginUrl)) {
        acFilter.setLoginUrl(loginUrl);
      }
    }
  }

  private void applySuccessUrlIfNecessary(Filter filter) {
    String successUrl = getSuccessUrl();
    if (StringUtils.hasText(successUrl)
        && (filter instanceof AuthenticationFilter)) {
      AuthenticationFilter authcFilter = (AuthenticationFilter) filter;
      // only apply the successUrl if they haven't explicitly configured
      // one already:
      String existingSuccessUrl = authcFilter.getSuccessUrl();
      if (AuthenticationFilter.DEFAULT_SUCCESS_URL
          .equals(existingSuccessUrl)) {
        authcFilter.setSuccessUrl(successUrl);
      }
    }
  }

  private void applyUnauthorizedUrlIfNecessary(Filter filter) {
    String unauthorizedUrl = getUnauthorizedUrl();
    if (StringUtils.hasText(unauthorizedUrl)
        && (filter instanceof AuthorizationFilter)) {
      AuthorizationFilter authzFilter = (AuthorizationFilter) filter;
      // only apply the unauthorizedUrl if they haven't explicitly
      // configured one already:
      String existingUnauthorizedUrl = authzFilter.getUnauthorizedUrl();
      if (existingUnauthorizedUrl == null) {
        authzFilter.setUnauthorizedUrl(unauthorizedUrl);
      }
    }
  }

}