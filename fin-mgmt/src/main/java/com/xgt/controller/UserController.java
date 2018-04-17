package com.xgt.controller;

import com.xgt.bean.UserBean;
import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;
import com.xgt.dao.entity.Resource;
import com.xgt.dao.entity.User;
import com.xgt.enums.*;
import com.xgt.exception.EnumPcsServiceError;
import com.xgt.service.ResourceService;
import com.xgt.service.UserService;
import com.xgt.util.*;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jboss.resteasy.annotations.Query;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Author: CC
 * Date: 2016/8/29
 * Desc:
 */
@Controller
@Path("/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiResponses(value = { @ApiResponse(code = 400, message = "Invalid ID supplied"), @ApiResponse(code = 404, message = "Person not found") })
    public PcsResult info() throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        User user = (User) SecurityUtils.getSubject().getPrincipal();

        List<Resource> list = resourceService.buildResource(user.getResourceList());
        User newUser = (User) BeanUtils.cloneBean(user);
        newUser.setResourceList(list);
        newUser.setButtonList(user.getButtonList());
        Map<String,Object> dicMap =new HashedMap<>();
        dicMap.put("IMG_ADDRESS",imageAddress);
        newUser.setDicMap(dicMap);
        newUser.setNowTime(DateUtil.getStringDate("yyyy-MM-dd HH:mm:ss"));
        return newResult().setData(newUser);
    }

    @GET
    @Path("/menu")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiResponses(value = { @ApiResponse(code = 400, message = "Invalid ID supplied"), @ApiResponse(code = 404, message = "Person not found") })
    public PcsResult list() {
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        return newResult().setData(user);
    }

    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = {"user:list","department:addUser","quick:createOrder"},logical =  Logical.OR)
    public PcsResult userList(@Query UserBean userBean) {
        Map<String,Object> map = userService.getUsers(userBean);
        return newResult().setData(map);
    }

    @GET
    @Path("/getUserRole")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:changeRole")
    public PcsResult getUserRole(@QueryParam("userId") String userId) {
        List<Integer> roleList=userService.getUserRole(userId);
        return newResult().setData(roleList);
    }
    @POST
    @Path("/updateUserRole")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:changeRole")
    public PcsResult updateUserRole(@FormParam("userId") String userId,@FormParam("roleId") List<Integer> roleIdList) {
        Assert.isTrue(roleIdList!=null,"参数错误，请联系管理员");
        UserBean userBean=new UserBean();
        userBean.setRoleIds(roleIdList);
        userBean.setUserId(userId);
        userService.updateUserRole(userBean);
        return newResult();
    }


    @POST
    @Path("/create")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:create")
    public PcsResult createUser(MultipartFormDataInput input) throws IOException {
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        UserBean userBean=convertMap(uploadForm);
        uploadUserFile(userBean);
        userService.createUser(userBean);
        return newResult();
    }

    @POST
    @Path("/update")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:update")
    public PcsResult updateUser(MultipartFormDataInput input) throws IOException {
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        UserBean userBean=convertMap(uploadForm);
        uploadUserFile(userBean);
        userService.updateUser(userBean);
        return newResult();
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:disable")
    public PcsResult deleteUser(@FormParam("userIds") Integer[] userIds) {
        Assert.notNull(userIds,"用户ID不能为空");
        boolean ret = userService.deleteUser(userIds);
        return ret?newResult():failedResult(EnumPcsServiceError.ERROR_OPERATE);
    }

    @POST
    @Path("/active")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:disable")
    public PcsResult activeUser(@FormParam("userId") Integer userId) {
        Assert.notNull(userId,"用户ID不能为空");
        boolean ret = userService.activeUser(userId);
        return ret?newResult():failedResult(EnumPcsServiceError.ERROR_OPERATE);
    }

    @POST
    @Path("/modifypassword")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult modifypassword(@FormParam("password") String password) {
        Assert.notNull(password,"密码不能为空");
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        userService.modifyPassword(user.getUserId(),user.getUsername(),password);
        return newResult();

//        boolean ret = userService.activeUser(userId);
//        return ret?newResult():failedResult(EnumPcsServiceError.ERROR_OPERATE);
    }




    @POST
    @Path("/resetpassword")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions(value = "user:resetpassword")
    public PcsResult restpassword(@FormParam("userIds") Integer[] userIds) {
        Assert.notNull(userIds,"用户ID不能为空");
        userService.resetPassword(userIds);
        return  newResult();
    }

    @GET
    @Path("/getWeather")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult getWeather(@Context HttpServletRequest request) throws Exception {
        WeatherUtil weatherUtil =new WeatherUtil();
        return  newResult().setData(weatherUtil.getCityWeatherByIp(IpUtil.getIpAddr(request)));
    }

    private void uploadUserFile(UserBean userBean) throws FileNotFoundException {
        if(userBean.getIdPath().length>0){
            // 上传到图片服务器
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //身份证复印件
            String IDFileName = userBean.getIdPathName().substring(0,
                    userBean.getIdPathName().lastIndexOf(".")).toLowerCase();
            IDFileName = MD5Util.MD5(IDFileName+System.currentTimeMillis());
            String IDExtName = userBean.getIdPathName().substring(
                    userBean.getIdPathName().lastIndexOf("."), userBean.getIdPathName().length())
                    .toLowerCase();
            oss.putObject(ConstantsUtil.Folder_IDCARD_IMAGE+ConstantsUtil.FILE_SEPARATOR
                    +IDFileName+IDExtName, userBean.getIdPath());
            userBean.setIdPathName(ConstantsUtil.Folder_IDCARD_IMAGE+ConstantsUtil.FILE_SEPARATOR
                    +IDFileName+IDExtName);
        }

        if(userBean.getEntryformPath().length>0){
            OssUtil oss=new OssUtil(accessKeyId, accessKeySecret, endpoint,bucketName);
            //入职登记表
            String entryFormFileName = userBean.getEntryformPathName().substring(0,
                    userBean.getEntryformPathName().lastIndexOf(".")).toLowerCase();
            entryFormFileName = MD5Util.MD5(entryFormFileName+System.currentTimeMillis());
            String entryFormExtName = userBean.getEntryformPathName().substring(
                    userBean.getEntryformPathName().lastIndexOf("."), userBean.getEntryformPathName().length())
                    .toLowerCase();
            oss.putObject(ConstantsUtil.Folder_ENTRYFORM_IMAGE+ConstantsUtil.FILE_SEPARATOR
                    +entryFormFileName+entryFormExtName, userBean.getEntryformPath());
            userBean.setEntryformPathName(ConstantsUtil.Folder_ENTRYFORM_IMAGE+ConstantsUtil.FILE_SEPARATOR
                    +entryFormFileName+entryFormExtName);
        }
    }
    @GET
    @Path("/validateLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult validateLogin(@Context HttpServletRequest request) throws Exception {
        return  newResult().setData("GGsimida");
    }
    /**
     * 数据摘取组装
     * @param uploadForm
     * @return
     * @throws IOException
     */
    private UserBean convertMap(Map<String, List<InputPart>> uploadForm) throws IOException {
        UserBean userBean=new UserBean();
        if(uploadForm!=null) {
            if (uploadForm.containsKey("userId")) {
                InputPart inputPart = uploadForm.get("userId").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setUserId(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("username")) {
                InputPart inputPart = uploadForm.get("username").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setUsername(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("qq")) {
                InputPart inputPart = uploadForm.get("qq").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setQq(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("idNumber")) {
                InputPart inputPart = uploadForm.get("idNumber").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setIdNumber(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("workno")) {
                InputPart inputPart = uploadForm.get("workno").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setWorkno(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("realname")) {
                InputPart inputPart = uploadForm.get("realname").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setRealname(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("sex")) {
                InputPart inputPart = uploadForm.get("sex").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setSex(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("officeLogin")) {
                InputPart inputPart = uploadForm.get("officeLogin").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setOfficeLogin(Integer.parseInt(inputPart.getBodyAsString()));
            }
            if (uploadForm.containsKey("userType")) {
                InputPart inputPart = uploadForm.get("userType").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setUserType(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("description")) {
                InputPart inputPart = uploadForm.get("description").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setDescription(inputPart.getBodyAsString());
            }
            if (uploadForm.containsKey("phone")) {
                InputPart inputPart = uploadForm.get("phone").get(0);
                inputPart.setMediaType(MediaType.TEXT_PLAIN_TYPE);
                userBean.setPhone(inputPart.getBodyAsString());
            }

            if (uploadForm.containsKey("idPath")) {
                InputPart inputPart = uploadForm.get("idPath").get(0);
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                userBean.setIdPathName(getFileName(header));
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                userBean.setIdPath(IOUtils.toByteArray(inputStream));
            }
            if (uploadForm.containsKey("entryformPath")) {
                InputPart inputPart = uploadForm.get("entryformPath").get(0);
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                userBean.setEntryformPathName(getFileName(header));
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                userBean.setEntryformPath(IOUtils.toByteArray(inputStream));
            }

        }
        return userBean;
    }

    /**
     * 返回文件名
     * @param header
     * @return
     */
    private String getFileName(MultivaluedMap<String, String> header) {
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
                String[] name = filename.split("=");
                String finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }


}
