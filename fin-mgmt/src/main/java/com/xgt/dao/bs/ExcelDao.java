package com.xgt.dao.bs;

import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.dao.entity.bs.Photo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/9/1.
 */
@Repository
public class ExcelDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void insertPhotoFromExcel(PhotoBean photoBean){
        sqlSession.insert("bs.excel.insertPhotoFromExcel",photoBean);
    }

    public Integer countPhotoNumber(PhotoBean photoBean){
        return sqlSession.selectOne("bs.excel.countPhotoNumber",photoBean);
    }

    public void makeHistoricalEdition(PhotoBean photoBean){
        sqlSession.update("bs.excel.makeHistoricalEdition",photoBean);
    }
}
