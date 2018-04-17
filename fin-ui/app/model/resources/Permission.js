/**
 * Created by jonnyLee on 2016/09/26.
 */
Ext.define('Admin.model.resources.Permission', {
    extend: 'Admin.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'iconCls', type: 'string'},
        {name: 'parentId', type: 'int'},
        {name: 'parentName', type: 'string'},
        {name: 'permission', type: 'string'},
        {name: 'url', type: 'string'}
    ],

    validators: {
        text: {type:'presence', message: '名称不能为空'},

        permission:  {type:'presence', message: '表达式不能为空'}
    }

});