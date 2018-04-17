package com.xgt.dao.bs;

import com.xgt.bean.UserBean;
import com.xgt.bean.bs.BrandBean;
import com.xgt.dao.entity.bs.Brand;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/8/25.
 */
@Repository
public class UserBrandDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void insertUserBrand(BrandBean brandBean) {
        sqlSession.insert("bs.userBrand.insertUserBrand", brandBean);
    }

    public List<Integer> getUserBrand(String userId) {
        return sqlSession.selectList("bs.userBrand.getUserBrand",userId);
    }

    public void deleteUserBrand(BrandBean brandBean) {
        sqlSession.selectList("bs.userBrand.deleteUserBrand",brandBean);
    }

    public void insertUserBrandDefalt(BrandBean brandBean){
        sqlSession.insert("bs.userBrand.insertUserBrandDefalt",brandBean);
    }

}
