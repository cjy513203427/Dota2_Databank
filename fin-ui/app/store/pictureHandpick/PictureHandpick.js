/**
 * Created by Cjy on 2017/6/1.
 */
Ext.define('Admin.store.pictureHandpick.PictureHandpick', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.pictureHandpick.PictureHandpick'
    ],

    model: 'Admin.model.pictureHandpick.PictureHandpick',

    storeId: 'pictureHandpick.PictureHandpick',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('PictureHandpick', 'pictureList')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});