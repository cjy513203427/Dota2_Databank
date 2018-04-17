/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.session.Session', {
    extend: 'Admin.model.Base',

    requires: [
        'Ext.data.validator.Email',
        'Ext.data.validator.Presence'
    ],

    idProperty: 'userId',

    fields: [
        {name: 'userId', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'qq', type: 'string'},
        {name: 'realname', type: 'string'},
        {name: 'workno', type: 'string'},
        {name: 'sex', type: 'int'},
        {name: 'createTime', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'userType', type: 'int'},
        {name: 'idNumber', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'idPath', type: 'string'},
        {name: 'entryformPath', type: 'string'},
        /**** extra  fields ****/
        {name: 'roleId', type: 'int'}
    ],

});