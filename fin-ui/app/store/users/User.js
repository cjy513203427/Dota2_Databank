/**
 * Created by Wwei on 2016/9/2.
 */
Ext.define('Admin.store.users.User', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.users.User'
    ],

    model: 'Admin.model.users.User',

    storeId: 'users.User',

    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('System', 'Users', 'read'),
            create: Common.Config.requestPath('System', 'Users', 'create'),
            update: Common.Config.requestPath('System', 'Users', 'update')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});