package com.xgt.service.bs;

import com.xgt.bean.bs.PhotoBean;
import com.xgt.dao.bs.BrandDao;
import com.xgt.dao.bs.PhotoDao;
import com.xgt.dao.entity.bs.Brand;
import com.xgt.dao.entity.bs.Photo;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/21.
 */
@Service
public class PhotoService {
    @Autowired
    private PhotoDao photoDao;
    @Autowired
    private BrandDao brandDao;

    private List<Photo> photoList;
    public List<Photo> queryPhotoArborescence(PhotoBean photoBean){
        photoList = photoDao.queryPhoto(photoBean);
        return buildPhoto();
    }

    public void deletePhoto(PhotoBean photoBean){
        photoDao.deletePhoto(photoBean);
    }

    public void addPhoto(PhotoBean photoBean){
        brandDao.modifyBrandId(photoBean);
        photoBean.setParentId(Integer.parseInt(photoBean.getText()));
        Integer num = photoDao.judgeAddPhoto(photoBean);
        Assert.isTrue(num==0,"不能重复添加");
        photoDao.addPhoto(photoBean);
    }

    public void modifyPhoto(PhotoBean photoBean){
        brandDao.modifyBrandId(photoBean);
        photoBean.setParentId(Integer.parseInt(photoBean.getText()));
        photoDao.modifyPhoto(photoBean);
    }

    public Map<String,Object> queryPhoto(PhotoBean photoBean){
        Integer total;
        List<Photo> list = null;
        Map<String,Object> map = new HashedMap();
        total=photoDao.countQueryPhoto(photoBean);
        if (total>0){
            list=photoDao.queryPhoto(photoBean);
        }
        map.put("list",list);
        map.put("total",total);
        return map;
    }

    public Map<String,Object> queryHistoryPhoto(PhotoBean photoBean){
        Integer total;
        List<Photo> list = null;
        Map<String,Object> map = new HashedMap();
        total=photoDao.countQueryHistoryPhoto(photoBean);
        if (total>0){
            list=photoDao.queryHistoryPhoto(photoBean);
        }
        map.put("list",list);
        map.put("total",total);
        return map;
    }

    public void updatePhotoUrl(PhotoBean photo){
        photoDao.updatePhotoUrl(photo);
    }

    public void updateCadUrl(PhotoBean photo){
        photoDao.updateCadUrl(photo);
    }

    public List<Photo> queryChildrenPhoto(PhotoBean photoBean){
        return photoDao.queryChildrenPhoto(photoBean);
    }

    public Integer gainParentId(PhotoBean photoBean){
        return photoDao.gainParentId(photoBean);
    }

    public Integer gainParentIdForModel(PhotoBean photoBean){
        return photoDao.gainParentIdForModel(photoBean);
    }

    public void insertPhotoArborescence(PhotoBean photoBean){
        if (photoBean.getParentId()==0){
            Integer brandId = photoDao.gainBrandIdForParentId0(photoBean);
            if(brandId!=null && brandId >0) {
                photoBean.setBrandId(brandId);
                Integer num = photoDao.judgeAddPhotoArborescence(photoBean);
                //Assert.isTrue(num==0,"不能重复添加");
                photoDao.insertPhotoArborescence(photoBean);
            }
        }else {
            Integer brandId = photoDao.gainBrandId(photoBean);
            if(brandId!=null && brandId >0) {
                photoBean.setBrandId(brandId);
                Integer num = photoDao.judgeAddPhotoArborescence(photoBean);
                //Assert.isTrue(num == 0, "不能重复添加");
                photoDao.insertPhotoArborescence(photoBean);
            }else{
                Integer brandIdModel = photoDao.gainBrandIdForModel(photoBean);
                photoBean.setBrandId(brandIdModel);
                Integer num = photoDao.judgeAddPhotoArborescence(photoBean);
                //Assert.isTrue(num == 0, "不能重复添加");
                photoDao.insertPhotoArborescence(photoBean);
            }
        }
    }

    public void updatePhotoArborescence(PhotoBean photoBean){
        photoDao.updatePhotoArborescence(photoBean);
    }
    /**
     * 构建资源数
     * @return list
     */
    public List<Photo> buildPhoto() {
        List<Photo> target = new ArrayList<>();
        if (!photoList.isEmpty()) {
            // 根元素
            photoList.stream().filter(photo -> photo.getParentId() == 0).forEach(photo -> {  // 根元素
                List<Photo> children = getChildren(photo);
                photo.setChildren(children);
                target.add(photo);
            });
        }
        return target;
    }

    private List<Photo> getChildren(Photo photo) {
        List<Photo> children = new ArrayList<>();
        if (!photoList.isEmpty()) {
            photoList.stream().filter(child -> photo.getId().equals(child.getParentId())).forEach(child -> {
                List<Photo> tmp = getChildren(child);
                child.setChildren(tmp);
                if (tmp.isEmpty()) {
                    child.setLeaf(true);
                }
                Boolean leaf = photo.getLeaf();
                Integer parentId = child.getParentId();
                if(leaf == null){
                    Integer childNodes = photoDao.countChildNodes(parentId);
                    if (photo.getText().indexOf("(")==-1) {
                        photo.setText(photo.getText() + "(" + childNodes + ")");
                    }
                }
                children.add(child);
            });
        }
        return children;
    }

}
