/**
 * Created by jonnyLee on 2016/9/28.
 */
Ext.define('Admin.model.resources.Menu', {
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
        iconCls: {type:'presence', message: 'icon样式不能为空'},
        url:  {type:'presence', message: '地址不能为空'}
    }


});