package com.xgt.dao.bs;

import com.xgt.bean.UserBean;
import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.dao.entity.bs.Brand;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/8/18.
 */
@Repository
public class BrandDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public List<Brand> queryUserBrand(UserBean userBean){
        return sqlSession.selectList("bs.brand.queryUserBrand",userBean);
    }

    public List<Brand> queryUserBrandNotAllowed(UserBean userBean){
        return sqlSession.selectList("bs.brand.queryUserBrandNotAllowed",userBean);
    }

    public List<Brand> queryAllBrand(BrandBean brandBean){
        return sqlSession.selectList("bs.brand.queryAllBrand",brandBean);
    }

    public Integer countAllBrand(BrandBean brandBean){
        return sqlSession.selectOne("bs.brand.countAllBrand",brandBean);
    }

    public void brandApplication(BrandBean brandBean){
        sqlSession.insert("bs.brand.brandApplication",brandBean);
    }

    public void approveBrandApplication(BrandBean brandBean){
        sqlSession.update("bs.brand.approveBrandApplication",brandBean);
    }

    public void deleteBrand(BrandBean brandBean){
        sqlSession.delete("bs.brand.deleteBrand",brandBean);
    }

    public void addBrand(BrandBean brandBean){
        sqlSession.insert("bs.brand.addBrand",brandBean);
    }

    public Integer judugeAddBrand(BrandBean brandBean){
       return sqlSession.selectOne("bs.brand.judugeAddBrand",brandBean);
    }

    public void modifyBrand(BrandBean brandBean){
        sqlSession.update("bs.brand.modifyBrand",brandBean);
    }

    public void modifyBrandId(PhotoBean photoBean){
        sqlSession.update("bs.brand.modifyBrandId",photoBean);
    }

    public Integer gainBrandId(BrandBean brandBean){
        return sqlSession.selectOne("bs.brand.gainBrandId",brandBean);
    }
}
