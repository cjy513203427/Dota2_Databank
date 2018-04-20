package com.xgt.dao.dota;

import com.xgt.bean.dota.ItemBean;
import com.xgt.dao.entity.dota.Item;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by hasee on 2017/12/4.
 */
@Repository
public class ItemDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void addGameItemFromSteamAPI(ItemBean itemBean){
        sqlSession.insert("dota.item.addGameItemFromSteamAPI",itemBean);
    }

    public void addItemPathFromDOTA2OfficalWebsite(ItemBean itemBean){
        sqlSession.update("dota.item.addItemPathFromDOTA2OfficalWebsite",itemBean);
    }

    public Integer gainIdFromItemByName(String name){
        return sqlSession.selectOne("dota.item.gainIdFromItemByName",name);
    }

    public List<Item> queryItem(ItemBean itemBean){
        return sqlSession.selectList("dota.item.queryItem",itemBean);
    }

    public Integer countQueryItem(ItemBean itemBean){
        return sqlSession.selectOne("dota.item.countQueryItem",itemBean);
    }

    public List<Item> queryChineseNameItem(Integer upgratedItem){
        return sqlSession.selectList("dota.item.queryChineseNameItem",upgratedItem);
    }

    public List<Item> queryItemCompound(Integer itemId){
        return sqlSession.selectList("dota.item.queryItemCompound",itemId);
    }

    public List<Item> queryItemFather(Integer itemId){
        return sqlSession.selectList("dota.item.queryItemFather",itemId);
    }

    public List<Item> getItemById(Integer itemId){
        return sqlSession.selectList("dota.item.getItemById",itemId);
    }
}
