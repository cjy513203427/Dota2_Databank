/**
 * Created by lb on 2016/9/7.
 */
Ext.define('Admin.model.roles.Role', {
    extend: 'Admin.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'status', type: 'int', defaultValue: 1},
        {name: 'updateTime', type: 'string'},
        {name: 'createTime', type: 'string'},
        {name: 'description', type: 'string'}

    ],

    validators: {
        name: {type:'presence', message: '用户名不能为空'},

        status:  {type:'presence', message: '状态不能为空'}
    }


});
