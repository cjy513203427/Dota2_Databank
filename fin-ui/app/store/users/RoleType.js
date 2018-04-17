/**
 * Created by Wwei on 2016/9/2.
 */
Ext.define('Admin.store.users.RoleType', {
    extend: 'Admin.store.Base',
    storeId: 'users.RoleType',

    fields: ['name', 'id'],
    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('System','Roles', 'read')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list'
        }
    }
});