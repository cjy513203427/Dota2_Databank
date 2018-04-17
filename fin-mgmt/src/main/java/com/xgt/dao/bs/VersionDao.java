package com.xgt.dao.bs;

import com.xgt.bean.bs.CoverBean;
import com.xgt.bean.bs.VersionBean;
import com.xgt.dao.entity.bs.Version;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Administrator on 2017/9/7.
 */
@Repository
public class VersionDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void insertVersion(VersionBean versionBean){
         sqlSession.insert("bs.version.insertVersion",versionBean);
    }

    public List<Version> queryVersionInfo(){
        return sqlSession.selectList("bs.version.queryVersionInfo");
    }

    public void insertInstallationPackage(VersionBean versionBean){
        sqlSession.insert("bs.version.insertInstallationPackage",versionBean);
    }

    public void insertSystemConfigurationFile(VersionBean versionBean){
        sqlSession.insert("bs.version.insertSystemConfigurationFile",versionBean);
    }
    public void insertConfigurationFile(VersionBean versionBean){
        sqlSession.insert("bs.version.insertConfigurationFile",versionBean);
    }

    public List<Version> queryConfigurationFile(VersionBean versionBean){
        return sqlSession.selectList("bs.version.queryConfigurationFile",versionBean);
    }

    public List<Version> querySystemConfig(VersionBean versionBean){
        return sqlSession.selectList("bs.version.querySystemConfig",versionBean);
    }

    public Integer gainVersionId(VersionBean versionBean){
        return sqlSession.selectOne("bs.version.gainVersionId",versionBean);
    }

    public void insertCoverPath(CoverBean coverBean){
        sqlSession.insert("bs.version.insertCoverPath",coverBean);
    }
}
