/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.brand.Brand', {
    extend: 'Admin.model.Base',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'}
    ]
});

