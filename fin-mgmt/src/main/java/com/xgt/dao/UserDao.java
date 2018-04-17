package com.xgt.dao;

import com.xgt.bean.UserBean;
import com.xgt.dao.entity.User;
import com.xgt.dao.entity.bs.Brand;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: lb on 2016/8/23.
 * Date:2016-08-23-11:36
 * desc：获取用户信息
 */

@Repository
public class UserDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public User selectUser(String userName) {
        return sqlSession.selectOne("financial.user.selectUser", userName);
    }

    public User selectExistUser(UserBean userBean) {
        return sqlSession.selectOne("financial.user.selectExistUser", userBean);
    }

    public List<User> selectUser(UserBean userBean) {
        return sqlSession.selectList("financial.user.selectUserList", userBean);
    }

    public Integer countUser(UserBean userBean) {

        return sqlSession.selectOne("financial.user.countUser", userBean);
    }

    public void insertUser(UserBean userBean) {
        sqlSession.insert("financial.user.insertUser", userBean);
    }


    public int updateUserStatus(Integer status,Integer... userIds) {
        Map<String,Object> map = new HashMap<>();
        map.put("status", status);
        map.put("userIds", userIds);
        return sqlSession.update("financial.user.deleteUser",map);
    }

    public void updateUser(UserBean userBean) {
        sqlSession.update("financial.user.updateUser", userBean);
    }

    public void modifyUserPassword(Map map){sqlSession.update("financial.user.modifyPassword",map);}

    public List<User> selectUsernameListById(List<Integer> userIds){
        return  sqlSession.selectList("financial.user.selectUsernameListById",userIds);
    }

    public User getUserByOpenId(String open_id) {
        return  sqlSession.selectOne("financial.user.getUserByOpenId",open_id);
    }

    public Integer getUserIdByQq(String qq) {
        return  sqlSession.selectOne("financial.user.getUserIdByQq",qq);
    }

    public User getUserByUserId(String userid) {
        return  sqlSession.selectOne("financial.user.getUserByUserId",userid);
    }

    public List<User> queryPersonalSetting(UserBean userBean){
        return sqlSession.selectList("financial.user.queryPersonalSetting",userBean);
    }

    public Integer selectUserId(String username){
        return sqlSession.selectOne("financial.user.selectUserId",username);
    }
}
