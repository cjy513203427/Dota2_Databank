/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.store.brand.Brand', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.brand.Brand'
    ],

    model: 'Admin.model.brand.Brand',

    storeId: 'brand.Brand',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Brand', 'queryAllBrand')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});