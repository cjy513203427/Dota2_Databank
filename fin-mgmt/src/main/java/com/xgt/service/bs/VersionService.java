package com.xgt.service.bs;

import com.xgt.bean.bs.CoverBean;
import com.xgt.bean.bs.VersionBean;
import com.xgt.dao.bs.VersionDao;
import com.xgt.dao.entity.bs.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/9/7.
 */
@Service
public class VersionService {
    @Autowired
    private VersionDao versionDao;

    public void insertVersion(VersionBean versionBean){
        versionDao.insertVersion(versionBean);
    }

    public List<Version> queryVersionInfo(){
        return versionDao.queryVersionInfo();
    }

    public void insertInstallationPackage(VersionBean versionBean){
        versionDao.insertInstallationPackage(versionBean);
    }

    public void insertSystemConfigurationFile(VersionBean versionBean){
        versionDao.insertSystemConfigurationFile(versionBean);
    }

    public void insertConfigurationFile(VersionBean versionBean){
        versionDao.insertConfigurationFile(versionBean);
    }

    public List<Version> queryConfigurationFile(VersionBean versionBean){
        return versionDao.queryConfigurationFile(versionBean);
    }

    public List<Version> querySystemConfig(VersionBean versionBean){
        return versionDao.querySystemConfig(versionBean);
    }

    public Integer gainVersionId(VersionBean versionBean){
        return versionDao.gainVersionId(versionBean);
    }

    public void insertCoverPath(CoverBean coverBean){
        versionDao.insertCoverPath(coverBean);
    }
}
