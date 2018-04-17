/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.store.pictureHandpick.PictureHandpickInfo', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.pictureHandpick.PictureHandpick'
    ],

    model: 'Admin.model.pictureHandpick.PictureHandpick',

    storeId: 'pictureHandpick.PictureHandpickInfo',

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