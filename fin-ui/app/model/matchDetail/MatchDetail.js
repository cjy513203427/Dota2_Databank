/**
 * Created by hasee on 2018/4/20.
 */
Ext.define('Admin.model.matchDetail.MatchDetail', {
    extend: 'Admin.model.Base',
    idProperty: 'match_id',
    fields: [
        {name: 'radiant_win', type: 'boolean'},
        {name: 'duration', type: 'int'},
        {name: 'pre_game_duration', type: 'int'},
        {name: 'string_start_time', type: 'string'},
        {name: 'match_id', type: 'int'},
        {name: 'match_seq_num', type: 'int'},
        {name: 'tower_status_radiant', type: 'int'},
        {name: 'tower_status_dire', type: 'int'},
        {name: 'barracks_status_radiant', type: 'int'},
        {name: 'barracks_status_dire', type: 'int'},
        {name: 'cluster', type: 'int'},
        {name: 'first_blood_time', type: 'int'},
        {name: 'lobby_type', type: 'int'},
        {name: 'human_players', type: 'int'},
        {name: 'positive_votes', type: 'int'},
        {name: 'negative_votes', type: 'int'},
        {name: 'game_mode', type: 'int'},
        {name: 'engine', type: 'int'},
        {name: 'radiant_score', type: 'int'},
        {name: 'dire_score', type: 'int'},
    ]
});

