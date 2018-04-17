/**
 * Created by jonnyLee on 2016/9/27.
 */
Ext.define('Admin.store.picture.PictureInfo', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.picture.Picture'
    ],

    model: 'Admin.model.picture.Picture',

    storeId: 'picture.PictureInfo',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Picture', 'info')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});