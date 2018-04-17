/**
 * Created by lb on 2016/9/1.
 */
Ext.define('Admin.store.roles.Role', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.roles.Role'
    ],

    storeId: 'roles.Role',

    model: 'Admin.model.roles.Role',

    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('System','Roles', 'read')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});