package com.xgt.service.dota;

import com.xgt.bean.dota.TalentBean;
import com.xgt.dao.dota.TalentDao;
import com.xgt.dao.entity.dota.Talent;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by hasee on 2017/12/19.
 */
@Service
public class TalentService {
    @Autowired
    private TalentDao talentDao;

    public void addTalentFromDotafire(TalentBean talentBean){
        talentDao.addTalentFromDotafire(talentBean);
    }

    public Integer getHeroIdFromHero(String name){
        return talentDao.getHeroIdFromHero(name);
    }

    public void updateHeroId(Integer heroId){
        talentDao.updateHeroId(heroId);
    }

    public Map<String ,Object> queryTalent(TalentBean talentBean){
        Integer total;
        List<Talent> list = null;
        Map<String,Object> map = new HashedMap();
        total=talentDao.countQueryTalent(talentBean);
        if (total>0){
            list=talentDao.queryTalent(talentBean);
        }
        map.put("list",list);
        map.put("total",total);
        return map;
    }
}
