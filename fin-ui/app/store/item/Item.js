/**
 * Created by hasee on 2018/1/6.
 */
Ext.define('Admin.store.item.Item', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.item.Item'
    ],

    model: 'Admin.model.item.Item',

    storeId: 'item.Item',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Item', 'queryItem')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});