package com.xgt.config;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

@Configuration
@ConditionalOnClass({ EnableTransactionManagement.class, EntityManager.class })
@AutoConfigureAfter({ DataBaseConfiguration.class })
public class MybatisConfiguration implements EnvironmentAware{

	private static final Logger logger = LoggerFactory.getLogger(MybatisConfiguration.class);

	@SuppressWarnings("unused")
	private RelaxedPropertyResolver propertyResolver;

	public void setEnvironment(Environment environment) {
		//this.propertyResolver = new RelaxedPropertyResolver(environment,"mybatis.");
	}

    @Bean(name="sqlSession")
    public SqlSessionTemplate sqlSessionFactoryBean(@Qualifier("dataSource")DataSource dataSource) throws Exception {
    	long startTime = System.currentTimeMillis();
    	SqlSessionTemplate sqlSession = null;
    	try {
	        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
	        sessionFactory.setDataSource(dataSource);
	        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
			Resource[]  hcdResources = resolver.getResources("classpath:maps/financial/*.xml");
			Resource[]  commResources = resolver.getResources("classpath:maps/common/*.xml");
			Resource[]  bsResources = resolver.getResources("classpath:maps/bs/*.xml");
			Resource[]  dotaResources = resolver.getResources("classpath:maps/dota/*.xml");
			Resource[] resources = ArrayUtils.addAll(hcdResources,commResources);
			resources=ArrayUtils.addAll(resources,bsResources);
			resources=ArrayUtils.addAll(resources,dotaResources);
	        sessionFactory.setMapperLocations(resources);
	        SqlSessionFactory factory = sessionFactory.getObject();
	        sqlSession = new SqlSessionTemplate(factory);
    	} catch (Exception ex){
    		logger.error("......configruing sqlsession is error......", ex);
    	}
        logger.info("......configruing sqlsession end time is:{}ms......", (System.currentTimeMillis()-startTime));
        return sqlSession;
    }


/*
	@Bean(name="bsSqlSession")
	public SqlSessionTemplate bsSqlSessionFactoryBean(@Qualifier("bsDataSource")DataSource dataSource) throws Exception {
		long startTime = System.currentTimeMillis();
		SqlSessionTemplate sqlSession = null;
		try {
			SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
			sessionFactory.setDataSource(dataSource);
			PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
			Resource[]  hcdResources = resolver.getResources("classpath:maps/bs*/
/*.xml");
			Resource[]  commResources = resolver.getResources("classpath:maps/common*/
/*.xml");
			Resource[] resources = ArrayUtils.addAll(hcdResources,commResources);
			sessionFactory.setMapperLocations(resources);
			SqlSessionFactory factory = sessionFactory.getObject();
			sqlSession = new SqlSessionTemplate(factory);
		} catch (Exception ex){
			logger.error("......configruing sqlsession is error......", ex);
		}
		logger.info("......configruing sqlsession end time is:{}ms......", (System.currentTimeMillis()-startTime));
		return sqlSession;
	}
*/






	@Bean(name="transactionManager")
	public DataSourceTransactionManager transactionManager(@Qualifier("dataSource")DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}
}