package com.xgt.service.bs;

import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.dao.bs.ExcelDao;
import com.xgt.dao.entity.bs.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/9/1.
 */
@Service
public class ExcelService {
    @Autowired
    private ExcelDao excelDao;

    public void insertPhotoFromExcel(PhotoBean photoBean){
        excelDao.insertPhotoFromExcel(photoBean);
    }

    public Integer countPhotoNumber(PhotoBean photoBean){
        return excelDao.countPhotoNumber(photoBean);
    }

    public void makeHistoricalEdition(PhotoBean photoBean){
        excelDao.makeHistoricalEdition(photoBean);
    }
}
