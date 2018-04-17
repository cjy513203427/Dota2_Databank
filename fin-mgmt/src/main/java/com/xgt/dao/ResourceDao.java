package com.xgt.dao;

import com.xgt.dao.entity.Resource;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: lb on 2016/8/26.
 * Date:2016-08-26-13:57
 * desc：
 */
@Repository
public class ResourceDao {

    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public List<Resource> selectResourceByUserId(Integer userId,String type) {
        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("type",type);
        return sqlSession.selectList("financial.resource.selectResourceByUserId",map);
    }

    public List<Resource> selectResource() {
        return sqlSession.selectList("financial.resource.selectResource");
    }

    public List<Resource> selectResourceByRole(Integer roleId) {
        return sqlSession.selectList("financial.resource.selectResourceByRole",roleId);
    }

    public List<Resource> selectMemuResource() {
        return sqlSession.selectList("financial.resource.selectMenuResource");
    }

    public List<Resource> selectButtoResource(Integer resourceId){
        return sqlSession.selectList("financial.resource.selectButtonResource",resourceId);
    }

    public void insertResource(Resource resource){
        sqlSession.insert("financial.resource.insertResource",resource);
    }

    public void updateResource(Resource resource){
        sqlSession.update("financial.resource.updateResource",resource);
    }

    public void deleteResource(Integer resourceId){
        sqlSession.insert("financial.resource.deleteResource",resourceId);
    }

}
