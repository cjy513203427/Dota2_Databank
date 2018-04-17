package com.xgt.common;

import com.xgt.dao.entity.User;
import com.xgt.exception.EnumPcsServiceError;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Base controller which contains common methods for other controllers.
 */
public class BaseController {

    @Value("${default.pageSize}")
    private int defPageSize;


    @Value("${default.maxPageSize}")
    private int defMaxPageSize;


    @Value("${aliyunOSS.accessKeyId}")
    protected String accessKeyId;

    @Value("${aliyunOSS.accessKeySecret}")
    protected String accessKeySecret;

    @Value("${aliyunOSS.uploadUrl}")
    protected String endpoint;

    @Value("${aliyunOSS.bucketname}")
    protected String bucketName;

    @Value("${aliyunOSS.imageAddress}")
    protected String imageAddress;

    /**
     * Generate new PcsResult object, default with "SUCCESS" code.
     *
     * @return PcsResult result.
     */
    protected PcsResult newResult() {
        PcsResult result = new PcsResult();
        result.setCode(EnumPcsServiceError.SUCCESS.getCode()).setMessage(EnumPcsServiceError.SUCCESS.getDesc());
        return result;
    }
    /**
     * Generate new PcsResult object, default with "SUCCESS" code.
     *
     * @return PcsResult result.
     */
    protected PcsResult newResult(Boolean success) {
        PcsResult result = new PcsResult();
        result.setSuccess(success);
        result.setCode(EnumPcsServiceError.SUCCESS.getCode()).setMessage(EnumPcsServiceError.SUCCESS.getDesc());

        return result;
    }


    protected PcsResult failedResult(EnumPcsServiceError error) {
        PcsResult result = new PcsResult();
        result.setCode(error.getCode()).setMessage(error.getDesc());
        return result;
    }

    @SuppressWarnings("unused")
    protected PcsResult validateFailedResult(Integer errorCode, String description) {
        PcsResult result = new PcsResult();
        result.setCode(errorCode).setMessage(description);
        return result;
    }

    @SuppressWarnings("unused")
    protected PcsResult validateFailedResult(EnumPcsServiceError error) {
        PcsResult result = new PcsResult();
        result.setCode(error.getCode()).setMessage(error.getDesc());
        return result;
    }

    protected Integer getLoginUserId(){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        return user.getUserId();
    }

    protected List<Integer> getDepartmentUserIdList(){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        return user.getDepartmentUserIdList();
    }


    /**
     * 构建 分页 页数
     * @param page 页
     * @return int
     */
    protected int getCurPage(Integer page) {
        if (page==null || page<1) {
            return 1;
        }
        return page;
    }
    /**
     * 构建 分页 每页显示条数
     * @param pageSize 每页显示条数
     * @return int
     */
    protected int getPageSize(Integer pageSize) {
        if (pageSize==null || pageSize<1) {
            return defPageSize;
        }
        if (pageSize>defMaxPageSize) {
            return defMaxPageSize;
        }
        return pageSize;
    }

}
