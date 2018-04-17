/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.store.photo.Photo', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.photo.Photo'
    ],

    model: 'Admin.model.photo.Photo',

    storeId: 'photo.Photo',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Photo', 'queryPhoto')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});