package com.xgt.dao.bs;

import com.xgt.bean.bs.PhotoBean;
import com.xgt.dao.entity.bs.Photo;
import org.jboss.resteasy.annotations.Query;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/8/21.
 */
@Repository
public class PhotoDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public List<Photo> queryPhoto(PhotoBean photoBean){
        return sqlSession.selectList("bs.photo.queryPhoto",photoBean);
    }

    public List<Photo> queryHistoryPhoto(PhotoBean photoBean){
        return sqlSession.selectList("bs.photo.queryHistoryPhoto",photoBean);
    }

    public Integer countQueryPhoto(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.countQueryPhoto",photoBean);
    }

    public Integer countQueryHistoryPhoto(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.countQueryHistoryPhoto",photoBean);
    }

    public void deletePhoto(PhotoBean photoBean){
        sqlSession.delete("bs.photo.deletePhoto",photoBean);
    }

    public void addPhoto(PhotoBean photoBean){
        sqlSession.insert("bs.photo.addPhoto",photoBean);
    }

    public void modifyPhoto(PhotoBean photoBean){
        sqlSession.update("bs.photo.modifyPhoto",photoBean);
    }

    public Integer judgeAddPhoto(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.judgeAddPhoto",photoBean);
    }

    public List<Photo> queryChildrenPhoto(PhotoBean photoBean){
        return sqlSession.selectList("bs.photo.queryChildrenPhoto",photoBean);
    }

    public void updatePhotoUrl(PhotoBean photo){
        sqlSession.update("bs.photo.updatePhotoUrl",photo);
    }

    public void updateCadUrl(PhotoBean photo){
        sqlSession.update("bs.photo.updateCadUrl",photo);
    }

    public Integer gainParentId(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.gainParentId",photoBean);
    }

    public void insertPhotoArborescence(PhotoBean photoBean){
        sqlSession.insert("bs.photoArborescence.insertPhotoArborescence",photoBean);
    }

    public void updatePhotoArborescence(PhotoBean photoBean){
        sqlSession.insert("bs.photoArborescence.updatePhotoArborescence",photoBean);
    }

    public Integer gainBrandId(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.gainBrandId",photoBean);
    }

    public Integer gainBrandIdForParentId0(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.gainBrandIdForParentId0",photoBean);
    }

    public Integer judgeAddPhotoArborescence(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.judgeAddPhotoArborescence",photoBean);
    }

    public Integer gainBrandIdForModel(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.gainBrandIdForModel",photoBean);
    }

    public Integer gainParentIdForModel(PhotoBean photoBean){
        return sqlSession.selectOne("bs.photo.gainParentIdForModel",photoBean);
    }

    public Integer countChildNodes(Integer parentId){
        return sqlSession.selectOne("bs.photo.countChildNodes",parentId);
    }
}
