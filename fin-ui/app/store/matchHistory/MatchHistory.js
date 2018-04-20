/**
 * Created by hasee on 2018/4/19.
 */
Ext.define('Admin.store.matchHistory.MatchHistory', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.matchHistory.MatchHistory'
    ],

    model: 'Admin.model.matchHistory.MatchHistory',

    storeId: 'matchHistory.MatchHistory',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Match', 'getMatchHistory')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});