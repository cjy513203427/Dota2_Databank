package com.xgt.dao.dota;

import com.xgt.bean.dota.PlayersBean;
import com.xgt.bean.dota.SteamAccountBean;
import com.xgt.dao.entity.dota.Players;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by hasee on 2018/4/23.
 */
@Repository
public class matchDetailPlayersDao {
    @Autowired
    @Qualifier("sqlSession")
    private SqlSessionTemplate sqlSession;

    public void importMatchDetailPlayersFromSteamAPI(PlayersBean playersBean){
        sqlSession.insert("dota.matchDetailPlayers.importMatchDetailPlayersFromSteamAPI",playersBean);
    }

    public void importSteamAccountsFromSteamAPI(SteamAccountBean steamAccountBean){
        sqlSession.insert("dota.matchDetailPlayers.importSteamAccountsFromSteamAPI",steamAccountBean);
    }

    public Integer ifMatchIdExists(Long match_id){
        return sqlSession.selectOne("dota.matchDetailPlayers.ifMatchIdExists",match_id);
    }

    public Integer ifSteamAccountExists(Long steamid){
        return sqlSession.selectOne("dota.matchDetailPlayers.ifSteamAccountExists",steamid);
    }

    public List<Players> queryMatchDetailPlayers(Long match_id){
        return sqlSession.selectList("dota.matchDetailPlayers.queryMatchDetailPlayers",match_id);
    }
}
