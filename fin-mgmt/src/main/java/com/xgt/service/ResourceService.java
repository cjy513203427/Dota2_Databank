package com.xgt.service;

import com.xgt.dao.ResourceDao;
import com.xgt.dao.entity.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Author: CC
 * Date: 2016/9/9
 * Desc:资源Service
 */
@Service
public class ResourceService {

    @Autowired
    private ResourceDao resourceDao;

    /**
     * 获取资源树
     * @return list
     */
    public List<Resource> getResources() {
        List<Resource> list = resourceDao.selectResource();
        return  buildResource(list);
    }

    /**
     * 获取资源树
     * @param roleId 角色id
     * @return list
     */
    public List<Resource> getResourcesTree(Integer roleId) {
        List<Resource> list = resourceDao.selectResource();
        if (roleId != null) {
            List<Resource> resources = resourceDao.selectResourceByRole(roleId);
            checkResource(resources,list);
        }
        return  buildResource(list);
    }

    /**
     * 构建资源数
     * @param list list
     * @return list
     */
    public List<Resource> buildResource(List<Resource> list) {
        List<Resource> target = new ArrayList<>();
        if (!list.isEmpty()) {
            // 根元素
            list.stream().filter(resource -> resource.getParentId() == 0).forEach(resource -> {// 根元素
                List<Resource> children = getChildren(resource, list);
                resource.setChildren(children);
                target.add(resource);
            });
        }
        return target;
    }

    private void checkResource(List<Resource> sources,List<Resource> targets) {
        for (Resource target : targets) {
            for (Resource source :sources) {
                if (target.getId()==source.getId()) {
                    target.setChecked(true);
                    break;
                }
            }
        }
    }

    private List<Resource> getChildren(Resource resource,List<Resource> list) {
        List<Resource> children = new ArrayList<>();
        if (!list.isEmpty()) {
            list.stream().filter(child -> resource.getId() == child.getParentId()).forEach(child -> {
                List<Resource> tmp = getChildren(child, list);
                child.setChildren(tmp);
                if (tmp.isEmpty()) {
                    child.setLeaf(true);
                }
                children.add(child);
            });
        }
        return children;
    }

    public List<Resource> getMenuResources() {
        List<Resource> list = resourceDao.selectMemuResource();
        return  buildResource(list);
    }

    public List<Resource> getButtonResources(Integer resourceId) {
        List<Resource> list = resourceDao.selectButtoResource(resourceId);
        return list;
    }

    public void insertResource(Resource resource) {
        resourceDao.insertResource(resource);
    }

    public void updateResource(Resource resource){
        resourceDao.updateResource(resource);
    }

    public void deleteResource(Integer resourceId){
        resourceDao.deleteResource(resourceId);
    }
}
