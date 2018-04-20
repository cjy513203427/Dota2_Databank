/**
 * Created by hasee on 2018/4/19.
 */
Ext.define('Admin.model.matchHistory.MatchHistory', {
    extend: 'Admin.model.Base',
    idProperty: 'match_id',
    fields: [
        {name: 'match_id', type: 'int'},
        {name: 'mat_seq_num', type: 'int'},
        {name: 'string_start_time', type: 'string'},
        {name: 'lobby_type', type: 'string'},
    ]
});

