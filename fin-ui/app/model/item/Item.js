/**
 * Created by hasee on 2018/1/6.
 */
Ext.define('Admin.model.item.Item', {
    extend: 'Admin.model.Base',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'cost', type: 'int'},
        {name: 'secretShop', type: 'int'},
        {name: 'sideShop', type: 'int'},
        {name: 'recipe', type: 'int'},
        {name: 'localizedName', type: 'string'}
    ]
});

