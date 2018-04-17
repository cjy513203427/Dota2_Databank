package com.xgt.service;

import com.xgt.bean.RoleBean;
import com.xgt.dao.RoleDao;
import com.xgt.dao.RoleResourceDao;
import com.xgt.dao.entity.User;
import com.xgt.util.JSONUtil;
import com.xgt.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: lb on 2016/9/6.
 * Date:2016-09-06-18:17
 * desc：
 */
@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private RoleResourceDao roleResourceDao;

    /**
     * 添加角色
     * @param roleBean roleBean
     */
    public void addRole(RoleBean roleBean) {
        roleDao.insertRole(roleBean);
        String[] permissions= StringUtil.stringAnalytical(roleBean.getPermissions(),",");
        List<Integer> resourceIdList=new ArrayList();

        for(int i=0;i<permissions.length;i++) {
            resourceIdList.add(Integer.parseInt(permissions[i]));
        }
        if(!resourceIdList.isEmpty()){
            roleBean.setResourceIdList(resourceIdList);
            roleResourceDao.insertRoleResource(roleBean);
        }
    }

    /*
    * 判断用户是否存在
    * @param roleBean roleBean
    * */
    public RoleBean isExistRole(RoleBean roleBean){
        return  roleDao.selectSingleRole(roleBean);
    }


    /*
    * 查找所有角色列表
    * @param pageIndex,pageSize
    * */
    public Map<String, Object> selectAllRole(Integer pageIndex, Integer pageSize) {
        Integer total ;
        List<RoleBean> list = null;
        Map<String, Object> map = new HashMap<>();
        // 偏移量
        int pageOffset = pageSize * (pageIndex - 1);
        // 第一页时,查询总记录数，翻页时不查询，由客户端保存总数
        total = roleDao.countRole();
        if (total!=null && total>0) {
            list =roleDao.selectAllRole(pageOffset,pageSize);
        }
        map.put("list", JSONUtil.filterDateProperties(list, User.class));
        map.put("total", total);
        return map;
    }


    /**
     * 删除角色
     * @param roleIds roleIds
     */
    public boolean deleteRole(Integer[] roleIds){
        int ret=roleDao.updateRoleStatus(0,roleIds);
        return ret>0;
    }

    public void updateRole(RoleBean roleBean) {
        roleDao.updateRole(roleBean);
        String[] permissions= StringUtil.stringAnalytical(roleBean.getPermissions(),",");
        List<Integer> resourceIdList=new ArrayList();
        roleResourceDao.deleteRoleResource(roleBean);
        for(int i=0;i<permissions.length;i++) {
            resourceIdList.add(Integer.parseInt(permissions[i]));
        }
        if(!resourceIdList.isEmpty()){
            roleBean.setResourceIdList(resourceIdList);

            roleResourceDao.insertRoleResource(roleBean);
        }
    }

}
