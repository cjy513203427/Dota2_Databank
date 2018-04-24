/**
 * Created by hasee on 2018/4/21.
 */
Ext.define('Admin.store.players.Players', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.players.Players'
    ],

    model: 'Admin.model.players.Players',

    storeId: 'players.Players',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Match', 'getMatchDetailPlayers')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});