package com.xgt.service.dota;

import com.xgt.bean.dota.PlayersBean;
import com.xgt.bean.dota.SteamAccountBean;
import com.xgt.dao.dota.matchDetailPlayersDao;
import com.xgt.dao.entity.dota.Item;
import com.xgt.dao.entity.dota.Players;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by hasee on 2018/4/23.
 */
@Service
public class MatchDetailPlayersService {
    @Autowired
    private matchDetailPlayersDao matchDetailPlayersDao;

    public void importMatchDetailPlayersFromSteamAPI(PlayersBean playersBean){
        matchDetailPlayersDao.importMatchDetailPlayersFromSteamAPI(playersBean);
    }

    public void importSteamAccountsFromSteamAPI(SteamAccountBean steamAccountBean){
        matchDetailPlayersDao.importSteamAccountsFromSteamAPI(steamAccountBean);
    }

    public Integer ifMatchIdExists(Long match_id){
        return matchDetailPlayersDao.ifMatchIdExists(match_id);
    }

    public Integer ifSteamAccountExists(Long steamid){
        return matchDetailPlayersDao.ifSteamAccountExists(steamid);
    }

    public List<Players> queryMatchDetailPlayers(Long match_id){
        List<Players> list = null;
        list=matchDetailPlayersDao.queryMatchDetailPlayers(match_id);
        return list;
    }
}
