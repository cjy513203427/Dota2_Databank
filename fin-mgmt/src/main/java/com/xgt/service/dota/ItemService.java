package com.xgt.service.dota;

import com.xgt.bean.dota.ItemBean;
import com.xgt.dao.dota.ItemDao;
import com.xgt.dao.entity.dota.Item;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by hasee on 2017/12/4.
 */
@Service
public class ItemService {
    @Autowired
    private ItemDao itemDao;

    public void addGameItemFromSteamAPI(ItemBean itemBean){
        itemDao.addGameItemFromSteamAPI(itemBean);
    }

    public void addItemPathFromDOTA2OfficalWebsite(ItemBean itemBean){
        itemDao.addItemPathFromDOTA2OfficalWebsite(itemBean);
    }

    public Integer gainIdFromItemByName(String name){
        return itemDao.gainIdFromItemByName(name);
    }

    public Map<String,Object> queryItem(ItemBean itemBean){
        Integer total;
        List<Item> list = null;
        Map<String,Object> map = new HashedMap();
        total=itemDao.countQueryItem(itemBean);
        if (total>0){
            list=itemDao.queryItem(itemBean);
        }
        map.put("list",list);
        map.put("total",total);
        return map;
    }

    public Map<String,Object> queryChineseNameItem(Integer upgratedItem){
        Integer total;
        List<Item> list = null;
        Map<String,Object> map = new HashedMap();
            list=itemDao.queryChineseNameItem(upgratedItem);
        map.put("list",list);
        return map;
    }

    public Map<String,Object> queryItemCompound(Integer itemId){
        Integer total;
        List<Item> list = null;
        Map<String,Object> map = new HashedMap();
        list=itemDao.queryItemCompound(itemId);
        map.put("list",list);
        return map;
    }

    public Map<String,Object> queryItemFather(Integer itemId){
        Integer total;
        List<Item> list = null;
        Map<String,Object> map = new HashedMap();
        list=itemDao.queryItemFather(itemId);
        map.put("list",list);
        return map;
    }

    public Map<String,Object> getItemById(Integer itemId){
        Integer total;
        List<Item> list = null;
        Map<String,Object> map = new HashedMap();
        list=itemDao.getItemById(itemId);
        map.put("list",list);
        return map;
    }
}
