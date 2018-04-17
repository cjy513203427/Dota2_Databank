/**
 * Created by jonnyLee on 2016/9/27.
 */
Ext.define('Admin.store.picture.Picture', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.picture.Picture'
    ],

    model: 'Admin.model.picture.Picture',

    storeId: 'picture.Picture',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Picture', 'list')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});