/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.brandApproval.BrandApproval', {
    extend: 'Admin.model.Base',
    //idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'userId', type: 'string'}
    ]
});