package com.xgt.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.sql.SQLException;

@Configuration
@EnableTransactionManagement
public class DataBaseConfiguration implements EnvironmentAware {
	
	private static final Logger logger = LoggerFactory.getLogger(DataBaseConfiguration.class);

	private RelaxedPropertyResolver propertyResolver;

	public void setEnvironment(Environment env) {
		this.propertyResolver = new RelaxedPropertyResolver(env, "jdbc.");
	}
	
	@Bean(name="dataSource", destroyMethod = "close", initMethod="init")
	@Primary
	public DataSource dataSource() {
		long startTime = System.currentTimeMillis();
		DruidDataSource datasource = new DruidDataSource();
		setDBDriver(datasource);
		datasource.setUrl(propertyResolver.getProperty("url"));
		datasource.setUsername(propertyResolver.getProperty("username"));
		datasource.setPassword(propertyResolver.getProperty("password"));
		setDruidDataSource(datasource);
		logger.info("......configuring dataSource end time is:{}ms......", (System.currentTimeMillis()-startTime));
		return datasource;
	}

/*	@Bean(name="bsDataSource", destroyMethod = "close", initMethod="init")
	@Primary
	public DataSource bsDataSource() {
		long startTime = System.currentTimeMillis();
		DruidDataSource bsDataSource = new DruidDataSource();
		setDBDriver(bsDataSource);
		bsDataSource.setUrl(propertyResolver.getProperty("bs.url"));
		bsDataSource.setUsername(propertyResolver.getProperty("bs.username"));
		bsDataSource.setPassword(propertyResolver.getProperty("bs.password"));
		setDruidDataSource(bsDataSource);
		logger.info("......configuring dataSource end time is:{}ms......", (System.currentTimeMillis()-startTime));
		return bsDataSource;
	}*/


	private void setDBDriver(DruidDataSource datasource){
		datasource.setDriverClassName(propertyResolver.getProperty("mysql_driver"));
	}
	
	private void setDruidDataSource(DruidDataSource datasource){
		long startTime = System.currentTimeMillis();
		try {
			datasource.setInitialSize(Integer.parseInt(propertyResolver.getProperty("druid.initialSize")));
			datasource.setMinIdle(Integer.parseInt(propertyResolver.getProperty("druid.minIdle")));
			datasource.setMaxActive(Integer.parseInt(propertyResolver.getProperty("druid.maxActive")));
			datasource.setMaxWait(Long.parseLong(propertyResolver.getProperty("druid.maxWait")));
			datasource.setTimeBetweenEvictionRunsMillis(Long.parseLong(propertyResolver.getProperty("druid.timeBetweenEvictionRunsMillis")));
			datasource.setMinEvictableIdleTimeMillis(Long.parseLong(propertyResolver.getProperty("druid.minEvictableIdleTimeMillis")));
			datasource.setValidationQuery(propertyResolver.getProperty("druid.validationQuery"));
			datasource.setTestWhileIdle(Boolean.parseBoolean(propertyResolver.getProperty("druid.testWhileIdle")));
			datasource.setTestOnBorrow(Boolean.parseBoolean(propertyResolver.getProperty("druid.testOnBorrow")));
			datasource.setTestOnReturn(Boolean.parseBoolean(propertyResolver.getProperty("druid.testOnReturn")));
			datasource.setPoolPreparedStatements(Boolean.parseBoolean(propertyResolver.getProperty("druid.poolPreparedStatements")));
			datasource.setMaxPoolPreparedStatementPerConnectionSize(Integer.parseInt(propertyResolver.getProperty("druid.maxPoolPreparedStatementPerConnectionSize")));
			datasource.setRemoveAbandoned(Boolean.parseBoolean(propertyResolver.getProperty("druid.validationQuery")));
			datasource.setRemoveAbandonedTimeout(1800);
			datasource.setFilters(propertyResolver.getProperty("druid.filters"));
		} catch (SQLException e) {
			logger.error("......set druid datasource data is error......", e);
		}
		logger.info("......set druid datasource data end time is:{}ms......", (System.currentTimeMillis()-startTime));
	}

	@Bean
	public ServletRegistrationBean druidServlet() {
		ServletRegistrationBean registrationBean = new ServletRegistrationBean(new StatViewServlet(), "/druid/*");
		registrationBean.addInitParameter("loginUsername", propertyResolver.getProperty("druid.userName"));
		registrationBean.addInitParameter("loginPassword", propertyResolver.getProperty("druid.password"));
		return registrationBean;
	}
}