/**
 * Created by hasee on 2017/12/26.
 */
Ext.define('Admin.model.hero.Hero', {
    extend: 'Admin.model.Base',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'localizedName', type: 'string'},
        {name: 'headpotraitPath', type: 'string'},
        {name: 'heroPath', type: 'string'}
    ]
});

