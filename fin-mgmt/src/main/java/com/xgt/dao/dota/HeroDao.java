package com.xgt.dao.dota;

import com.xgt.bean.dota.HeroBean;
import com.xgt.dao.entity.dota.Hero;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by hasee on 2017/12/1.
 */
@Repository
public class HeroDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void addHeroFromSteamAPI(HeroBean heroBean){
        sqlSession.insert("dota.hero.addHeroFromSteamAPI",heroBean);
    }

    public void addHeadportraitPathFromDOTA2OfficalWebsite(HeroBean heroBean){
        sqlSession.update("dota.hero.addHeadportraitPathFromDOTA2OfficalWebsite",heroBean);
    }

    public void addHeroPathFromDOTA2OfficalWebsite(HeroBean heroBean){
        sqlSession.update("dota.hero.addHeroPathFromDOTA2OfficalWebsite",heroBean);
    }

    public Integer gainIdFromHeroByName(String name){
        return sqlSession.selectOne("dota.hero.gainIdFromHeroByName",name);
    }

    public List<Hero> queryHero(HeroBean heroBean){
        return sqlSession.selectList("dota.hero.queryHero",heroBean);
    }

    public Integer countQueryHero(HeroBean heroBean){
        return sqlSession.selectOne("dota.hero.countQueryHero",heroBean);
    }
}
