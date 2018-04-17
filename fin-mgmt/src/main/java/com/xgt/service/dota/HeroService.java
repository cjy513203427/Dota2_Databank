package com.xgt.service.dota;

import com.xgt.bean.dota.HeroBean;
import com.xgt.dao.dota.HeroDao;
import com.xgt.dao.entity.dota.Hero;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by hasee on 2017/12/1.
 */
@Service
public class HeroService {
    @Autowired
    private HeroDao heroDao;

    public void addHeroFromSteamAPI(HeroBean heroBean){
        heroDao.addHeroFromSteamAPI(heroBean);
    }

    public void addHeadportraitPathFromDOTA2OfficalWebsite(HeroBean heroBean){
        heroDao.addHeadportraitPathFromDOTA2OfficalWebsite(heroBean);
    }

    public void addHeroPathFromDOTA2OfficalWebsite(HeroBean heroBean){
        heroDao.addHeroPathFromDOTA2OfficalWebsite(heroBean);
    }

    public Integer gainIdFromHeroByName(String name){
        return heroDao.gainIdFromHeroByName(name);
    }

    public Map<String ,Object>queryHero(HeroBean heroBean){
        Integer total;
        List<Hero> list = null;
        Map<String,Object> map = new HashedMap();
        total=heroDao.countQueryHero(heroBean);
        if (total>0){
            list=heroDao.queryHero(heroBean);
        }
        map.put("list",list);
        map.put("total",total);
        return map;
    }
}
