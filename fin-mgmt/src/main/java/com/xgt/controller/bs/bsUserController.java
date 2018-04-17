package com.xgt.controller.bs;

import com.xgt.bean.UserBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.config.shiro.OfficeUsernamePasswordToken;
import com.xgt.dao.entity.User;
import com.xgt.dao.entity.bs.Brand;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.exception.IncorrectOfficeException;
import com.xgt.service.UserService;
import com.xgt.service.bs.BrandService;
import io.swagger.models.auth.In;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.jboss.resteasy.annotations.Query;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

/**
 * Created by 888 on 2017/8/12.
 */
@Controller
@Path("/bsUser")
public class bsUserController extends BaseController {

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(bsUserController.class);

    @Autowired
    private UserService userService;
    @Autowired
    private BrandService brandService;

    /**
     * 用户注册
     * @param username
     * @param password
     * @return
     */
    @POST
    @Path("register")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult register(@FormParam("accessToken") String accessToken,
            @FormParam("username") String username, @FormParam("password") String password) {
        PcsResult pcsResult = newResult();
        try {
            UserBean userBean = new UserBean();
            userBean.setUsername(username);
            userBean.setPassword(password);
            userBean.setWorkno("1");
            userBean.setSex("1");
            userBean.setPhone("654321654");
            userBean.setStatus(1);
            userBean.setRealname("谷阿莫");
            userBean.setQq("123456");//qq
            userBean.setRealname("设计师"+username);
            userService.createUserForBaisheng(userBean);
        } catch (Exception e) {
            e.printStackTrace();
            PcsResult result = new PcsResult();
            result.setCode(EnumPcsServiceError.ERROR_REGISTER.getCode()).setMessage(EnumPcsServiceError.ERROR_REGISTER.getDesc());
            result.setSuccess(false);
            return result;
        }

        return newResult(true);
    }


    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    // 此方法不处理登录成功,由shiro进行处理.
    public PcsResult login(@FormParam("accessToken") String accessToken,@FormParam("username") String username,
                           @FormParam("password") String password, @FormParam("roomcode")String roomcode) throws Exception {
        PcsResult result = new PcsResult();
        Subject subject = SecurityUtils.getSubject();
        OfficeUsernamePasswordToken token=new OfficeUsernamePasswordToken(username,password,roomcode);
        Integer userId = userService.selectUserId(username);
        try {
            subject.login(token);
        } catch (AuthenticationException exception) {
            // 登录失败从request中获取shiro处理的异常信息。
            // shiroLoginFailure:就是shiro异常类的全类名.
            EnumPcsServiceError msg = EnumPcsServiceError.BUSINESS_DATA_NONE;
            if (exception != null) {
                if (exception instanceof UnknownAccountException) {// 账号不存在
                    msg = EnumPcsServiceError.BUSINESS_USER_NONE;
                    logger.warn("login failed, account not existed. account={}", username);
                } else if (exception instanceof IncorrectCredentialsException) {// 密码不正确
                    msg = EnumPcsServiceError.BUSINESS_USER_PASSWORD_ERROR;
                    logger.warn("login failed, password not correct. account={}", username);
                } else if (exception instanceof ExcessiveAttemptsException) {// 登录失败多次
                    msg = EnumPcsServiceError.BUSINESS_USER_LOGIN_ERROR;
                    logger.warn("login failed, login failed times too much. account={}", username);
                } else if ("kaptchaValidateFailed".equals(exception)) {// 验证码错误
                    msg = EnumPcsServiceError.BUSINESS_USER_VERIFYCODE_ERROR;
                }else if (exception instanceof IncorrectOfficeException) {
                    msg = EnumPcsServiceError.BUSINESS_ROOM_EXISTED;
                    logger.warn("login failed, login failed not in office. account={}", username);
                }
            }
            result.setCode(msg.getCode()).setMessage(msg.getDesc()).setSuccess(false);
            result.setSuccess(false);
            return result;
        }
        return newResult(true).setData(userId);
    }

    @GET
    @Path("/queryPersonalSettings")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult queryPersonalSettings(@QueryParam("accessToken") String accessToken,@QueryParam("userId") String userId) {
        UserBean userBean = new UserBean();
        userBean.setUserId(userId);
        userBean.setAccessToken(accessToken);
        List<User> list= userService.queryPersonalSettings(userBean);
        if(list.size()==0){
            return newResult(false);
        }
        return newResult(true).setData(list);
    }

    @POST
    @Path("/modifypassword")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult modifypassword(@FormParam("accessToken") String accessToken,
            @FormParam("password") String password,@FormParam("userId") Integer userId
    ,@FormParam("userName") String userName) {
        userService.modifyPassword(userId, userName, password);
        return newResult();
    }

    @GET
    @Path("/modifyPersonalSettings")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult modifyPersonalSettings(@QueryParam("accessToken") String accessToken,
                                            @QueryParam("realname") String realname, @QueryParam("phone") String phone,
                                            @QueryParam("userId") String userId) throws UnsupportedEncodingException {
        UserBean userBean = new UserBean();
        userBean.setRealname(realname);
        userBean.setPhone(phone);
        userBean.setUserId(userId);
        userService.updateUser(userBean);
        return newResult();
    }


}
