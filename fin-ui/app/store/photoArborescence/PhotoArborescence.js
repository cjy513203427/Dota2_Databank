/**
 * Created by Cjy on 2017/08/05.
 */
Ext.define('Admin.store.photoArborescence.PhotoArborescence', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Common.Config'
    ],

    storeId: 'photoArborescence.PhotoArborescence',

    root: {
        id: 0,
        text: '百胜'
    },
    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('Photo', 'queryPhotoArborescence')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});