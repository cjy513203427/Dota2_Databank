package com.xgt.dao.dota;

import com.xgt.bean.dota.TalentBean;
import com.xgt.dao.entity.dota.Talent;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by hasee on 2017/12/19.
 */
@Repository
public class TalentDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void addTalentFromDotafire(TalentBean talentBean){
        sqlSession.insert("dota.talent.addTalentFromDotafire",talentBean);
    }

    public Integer getHeroIdFromHero(String name){
        return sqlSession.selectOne("dota.talent.getHeroIdFromHero",name);
    }

    public void updateHeroId(Integer heroId){
        sqlSession.update("dota.talent.updateHeroId",heroId);
    }

    public List<Talent> queryTalent(TalentBean talentBean){
        return sqlSession.selectList("dota.talent.queryTalent",talentBean);
    }

    public Integer countQueryTalent(TalentBean talentBean){
        return sqlSession.selectOne("dota.talent.countQueryTalent",talentBean);
    }

    public List<Talent> getTalentByHeroId(Integer heroId){
        return sqlSession.selectList("dota.talent.getTalentByHeroId",heroId);
    }
}
