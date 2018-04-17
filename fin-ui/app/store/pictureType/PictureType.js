/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.store.pictureType.PictureType', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Common.Config'
    ],

    storeId: 'pictureType.PictureType',

    autoLoad:false,
    root: {
        id: 0,
        text: '效果图'
    },
    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('PictureType', 'picturelist')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});