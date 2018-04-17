/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.store.brandApproval.BrandApproval', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.brandApproval.BrandApproval'
    ],

    model: 'Admin.model.brandApproval.BrandApproval',

    storeId: 'brandApproval.BrandApproval',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Brand', 'queryUserBrandNotAllowed')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list'
        }
    }
});