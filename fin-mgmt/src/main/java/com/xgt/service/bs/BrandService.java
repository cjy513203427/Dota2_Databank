package com.xgt.service.bs;

import com.xgt.bean.UserBean;
import com.xgt.bean.bs.BrandBean;
import com.xgt.bean.bs.PhotoBean;
import com.xgt.dao.bs.BrandDao;
import com.xgt.dao.bs.UserBrandDao;
import com.xgt.dao.entity.bs.Brand;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/18.
 */
@Service
public class BrandService {
    @Autowired
    private BrandDao brandDao;

    @Autowired
    private UserBrandDao userBrandDao;

    public void brandApplication(BrandBean brandBean){
        brandDao.brandApplication(brandBean);
    }

    public void approveBrandApplication(BrandBean brandBean){
        brandDao.approveBrandApplication(brandBean);
    }

    public Map<String ,Object>queryAllBrand(BrandBean brandBean){
        Integer total;
        List<Brand> list = null;
        Map<String,Object> map = new HashedMap();
        total=brandDao.countAllBrand(brandBean);
        if (total>0){
            list=brandDao.queryAllBrand(brandBean);
        }
        map.put("list",list);
        map.put("total",total);
        return map;
    }

    public Map<String,Object> queryUserBrandNotAllowed(UserBean userBean){
        List<Brand> list = null;
        list=brandDao.queryUserBrandNotAllowed(userBean);
        Map<String ,Object> map = new HashedMap();
        map.put("list",list);
        return map;
    }

    public void updateUserBrand(BrandBean brandBean) {
        userBrandDao.deleteUserBrand(brandBean);
        if(brandBean.getBrandIds()!=null&&brandBean.getBrandIds().size()>0){
            userBrandDao.insertUserBrand(brandBean);
        }
    }

    public List<Brand> queryUserBrand(UserBean userBean){
       return brandDao.queryUserBrand(userBean);
    }

    public List<Integer> getUserBrand(String userId) {
        return userBrandDao.getUserBrand(userId);
    }

    public void deleteBrand(BrandBean brandBean){
        brandDao.deleteBrand(brandBean);
    }

    public void addBrand(BrandBean brandBean){
        Integer num = brandDao.judugeAddBrand(brandBean);
        Assert.isTrue(num==0,"不能重复添加");
        brandDao.addBrand(brandBean);
        Integer brandId = brandDao.gainBrandId(brandBean);
        brandBean.setBrandId(brandId);
        if (brandBean.getUserId() == 1) {
            userBrandDao.insertUserBrandDefalt(brandBean);
        }
    }

    public void modifyBrand(BrandBean brandBean){
        brandDao.modifyBrand(brandBean);
    }

    public void modifyBrandId(PhotoBean photoBean){
        brandDao.modifyBrandId(photoBean);
    }

    public Integer gainBrandId(BrandBean brandBean){
        return brandDao.gainBrandId(brandBean);
    }
}
