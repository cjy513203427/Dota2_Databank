/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.store.brand.UserBrand', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.brand.Brand'
    ],

    model: 'Admin.model.brand.Brand',

    storeId: 'brand.UserBrand',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Brand', 'queryUserBrand')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});