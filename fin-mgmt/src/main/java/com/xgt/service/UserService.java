package com.xgt.service;

import com.xgt.bean.UserBean;
import com.xgt.bean.bs.BrandBean;
import com.xgt.dao.*;
import com.xgt.dao.bs.BrandDao;
import com.xgt.dao.entity.Resource;
import com.xgt.dao.entity.Role;
import com.xgt.dao.entity.User;
import com.xgt.dao.entity.bs.Brand;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.exception.PcsRunTimeException;
import com.xgt.util.EncryptUtil;
import com.xgt.util.JSONUtil;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * User: CC on 2016/8/26.
 * Date:2016-08-26-11:41
 * desc：
 */
@Service
public class UserService {


    public static void main(String[] args) {
        System.out.println(EncryptUtil.md5("asd042mT881xM", "tjxgt", 2));
    }
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private ResourceDao resourceDao;

    @Autowired
    private UserRoleDao userRoleDao;

    @Autowired
    private BrandDao brandDao;

    @Value("${user.default.password}")
    private String defaultPwd;

    public User getUserInfo(String userName) {
        return userDao.selectUser(userName);
    }

    public List<Resource> getResourceInfo(Integer userId,String type) {
        return resourceDao.selectResourceByUserId(userId,type);
    }

    public List<Role> getRoleInfo(Integer userId) {
        return roleDao.selectRole(userId);
    }



    public Map<String, Object> getUsers(UserBean userBean) {
        Integer total ;
        List<User> list = null;
        Map<String, Object> map = new HashMap<>();
        // 第一页时,查询总记录数，翻页时不查询，由客户端保存总数
        total = userDao.countUser(userBean);
        if (total!=null && total>0) {
            list =userDao.selectUser(userBean);
        }

        map.put("list", JSONUtil.filterDateProperties(list, User.class));
        map.put("total", total);

        return map;
    }

    /**
     * 添加用户
     * @param userBean userBean
     */
    public void createUser(UserBean userBean) {
        if(userDao.selectExistUser(userBean)!=null) {
            User list = userDao.selectExistUser(userBean);
            throw new PcsRunTimeException(EnumPcsServiceError.BUSINESS_USER_EXISTED);
        } //用户
        userBean.setPassword(EncryptUtil.md5(defaultPwd, userBean.getUsername(), 2));
        userDao.insertUser(userBean);
        Integer userId = userDao.selectUserId(userBean.getUsername());
        Integer roleId = 32;
        List <Integer> roleIds = new ArrayList<>();
        roleIds.add(roleId);
        userBean.setRoleIds(roleIds);
        userBean.setUserId(String.valueOf(userId));
        userRoleDao.insertUserRole(userBean);
    }

    /**
     * 百胜登录逻辑
     * @param userBean
     */
    public void createUserForBaisheng(UserBean userBean) {
        if(userDao.selectExistUser(userBean)!=null) {
            User list = userDao.selectExistUser(userBean);
            throw new PcsRunTimeException(EnumPcsServiceError.BUSINESS_USER_EXISTED);
        } //用户
        userBean.setPassword(EncryptUtil.md5(userBean.getPassword(), userBean.getUsername(), 2));
        userDao.insertUser(userBean);
    }
    /**
     * 禁用用户
     * @param userIds 用户id数组
     */
    public boolean deleteUser(Integer[] userIds) {
        int ret = userDao.updateUserStatus(0,userIds);
        return ret>0;
    }

    /**
     * 激活用户
     * @param userId 用户id
     */
    public boolean activeUser(Integer userId) {
        int ret = userDao.updateUserStatus(1,userId);
        return ret>0;
    }

    /**
     * 修改用户
     * @param userBean
     */
    public void updateUser(UserBean userBean) {
        /*if(userDao.selectExistUser(userBean)!=null) {
            throw new PcsRunTimeException(EnumPcsServiceError.BUSINESS_USER_EXISTED);
        }*/
        userDao.updateUser(userBean);
    }

    /*
    *  重置密码
    * */
    public void resetPassword(Integer[] userIdsArr){
        String password=null;
        List<Integer> userIds=new ArrayList<>();
        Collections.addAll(userIds,userIdsArr);

        List<User> list=userDao.selectUsernameListById(userIds);
         for(User user:list){
             Map map=new HashMap<>();
             map.put("id",user.getUserId());
             password=EncryptUtil.md5(defaultPwd, user.getUsername(), 2);
             map.put("password",password);
             userDao.modifyUserPassword(map);
         }
    }


    /*
     *  修改密码
    * */
    public void modifyPassword(Integer userId,String username,String password){
        //List<Map> list=new ArrayList<>();
        String target=EncryptUtil.md5(password,username,2);
            Map map=new HashMap<>();
            map.put("id",userId);
            map.put("password",target);
            //list.add(map);
        userDao.modifyUserPassword(map);
    }



    public List<Integer> getUserRole(String userId) {
        return userRoleDao.getUserRole(userId);
    }

    public void updateUserRole(UserBean userBean) {
        userRoleDao.deleteUserRole(userBean);
        if(userBean.getRoleIds()!=null&&userBean.getRoleIds().size()>0){
            userRoleDao.insertUserRole(userBean);
        }
    }

    public User getUserByOpenId(String open_id) {
        return userDao.getUserByOpenId(open_id);
    }

    public Integer getUserIdByQq(String qq) {
        return userDao.getUserIdByQq(qq);
    }

    public User getUserByUserId(String userid) {
        return userDao.getUserByUserId(userid);
    }

    public List<User> queryPersonalSettings(UserBean userBean){
        //List<Brand> AllBrand = brandDao.queryAllBrand();
        List<Brand> UserBrand = brandDao.queryUserBrand(userBean);
        List<User> users = userDao.queryPersonalSetting(userBean);
        for(User user: users){
            user.setUserBrand(UserBrand);
        }
        return users;
    }

    public Integer selectUserId(String username){
        return userDao.selectUserId(username);
    }
}
