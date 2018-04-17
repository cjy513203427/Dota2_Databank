package com.xgt.generic;


import javax.ws.rs.QueryParam;
import java.util.List;

/**
 * Created by CC on 2017/2/21.
 */
public class PageQueryEntity {

    @QueryParam("pageIndex")
    private Integer pageIndex;

    @QueryParam("pageSize")
    private Integer pageSize;

    @QueryParam("pageOffset")
    private Integer pageOffset;

    /**
     * 用来查询部门人员的信息
     */
    private List<Integer> departmentUserIdList;

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageOffset() {
        return pageOffset;
    }

    public List<Integer> getDepartmentUserIdList() {
        return departmentUserIdList;
    }

    public void setDepartmentUserIdList(List<Integer> departmentUserIdList) {
        this.departmentUserIdList = departmentUserIdList;
    }

    @QueryParam("pageSize")
    public void setPageOffset(Integer pageSize) {
        if(pageSize!=null&&pageIndex!=null){
            this.pageOffset = pageSize * (pageIndex - 1);
        }
    }



}
