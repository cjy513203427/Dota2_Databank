/**
 * Created by hasee on 2018/4/20.
 */
Ext.define('Admin.store.matchDetail.MatchDetail', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.matchDetail.MatchDetail'
    ],

    model: 'Admin.model.matchDetail.MatchDetail',

    storeId: 'matchDetail.MatchDetail',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Match', 'getMatchDetail')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});