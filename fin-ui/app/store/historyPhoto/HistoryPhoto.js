/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.store.historyPhoto.HistoryPhoto', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.historyPhoto.HistoryPhoto'
    ],

    model: 'Admin.model.historyPhoto.HistoryPhoto',

    storeId: 'historyPhoto.HistoryPhoto',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Photo', 'queryHistoryPhoto')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});