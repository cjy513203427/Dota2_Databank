/**
 * Created by jonnyLee on 2016/9/7.
 */
Ext.define('Admin.store.resources.Resource', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Common.Config'
    ],

    storeId: 'resources.Resource',

    autoLoad:false,

    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('System', 'Resources', 'treelist')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});