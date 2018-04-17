package com.xgt.dao;

import com.xgt.bean.RoleBean;
import com.xgt.dao.entity.Role;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: lb on 2016/8/26.
 * Date:2016-08-26-10:44
 * desc：获取用户角色
 */
@Repository
public class RoleDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public List<Role> selectRole() {
       return sqlSession.selectList("financial.role.selectRole");
    }

    public List<Role> selectRole(Integer userId) {
        return sqlSession.selectList("financial.role.selectRoleByUserId",userId);
    }

    public List<RoleBean> selectAllRole(Integer pageOffset,Integer pageSize){
        Map<String,Object> map = new HashMap<>();
        map.put("pageOffset",pageOffset);
        map.put("pageSize",pageSize);
        return  sqlSession.selectList("financial.role.selectAllRole",map);
    }

    public Integer countRole(){
        return sqlSession.selectOne("financial.role.countRole");
    }

    public void insertRole(RoleBean roleBean) {
        sqlSession.insert("financial.role.insertRole",roleBean);
    }

    public int updateRoleStatus(Integer status,Integer... roleIds){
        Map<String,Object> map = new HashMap<>();
        map.put("status", status);
        map.put("roleIds", roleIds);
        return sqlSession.delete("financial.role.updateRoleStatus",map);
    }

    public RoleBean selectSingleRole(RoleBean roleBean){
       return sqlSession.selectOne("financial.role.selectSingleRole",roleBean);
    }

    public void updateRole(RoleBean roleBean){
        sqlSession.update("financial.role.updateRole",roleBean);
    }

}