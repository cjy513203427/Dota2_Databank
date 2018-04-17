package com.xgt.dao;

import com.xgt.bean.UserBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * copyright © 2008-2017 CTIM. All Right Reserved.
 * Created by CC on 2016/9/5.
 * Desc:
 */
@Repository
public class UserRoleDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;


    public void insertUserRole(UserBean userBean) {
        sqlSession.insert("financial.user.insertUserRole", userBean);
    }

    public void updateUserRole(UserBean userBean) {
        sqlSession.update("financial.user.updateUserRole", userBean);
    }

    /**
     *
     * @param userId
     * @return
     */
    public List<Integer> getUserRole(String userId) {
        return sqlSession.selectList("financial.user.getUserRole",userId);
    }

    public void deleteUserRole(UserBean userBean) {
        sqlSession.selectList("financial.user.deleteUserRole",userBean);
    }
}
