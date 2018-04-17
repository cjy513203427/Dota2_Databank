/**
 * Created by jonnyLee on 2016/9/27.
 */
Ext.define('Admin.store.resources.Menu', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Common.Config'
    ],

    alias: 'store.resourcesMenu',

    storeId: 'resources.Menu',

    autoLoad:false,

    root: {
        id: 0,
        text: '业务管理系统'
    },

    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('System', 'Resources', 'menu'),
            delete: Common.Config.requestPath('System', 'Resources', 'delete')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});