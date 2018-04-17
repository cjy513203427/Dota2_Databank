package com.xgt.dao;

import com.xgt.bean.RoleBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

/**
 * User: lb on 2016/9/6.
 * Date:2016-09-06-18:18
 * desc：
 */

@Repository
public class RoleResourceDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void insertRoleResource(RoleBean roleBean) {
        sqlSession.insert("financial.role.insertRoleResource",roleBean);
    }

    public void deleteRoleResource(RoleBean roleBean){
        sqlSession.delete("financial.role.deleteRoleResource",roleBean);
    }

}
