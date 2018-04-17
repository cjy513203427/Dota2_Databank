/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.users.User', {
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
        {name: 'userType', type: 'string'},
        {name: 'idNumber', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'idPath', type: 'string'},
        {name: 'entryformPath', type: 'string'},
        {name: 'officeLogin', type: 'int'},
        /**** extra  fields ****/
        {name: 'roleId', type: 'int'}
    ],

    validators: {
        username: {type:'presence', message: '用户名不能为空'},

        qq: {type:'presence', message:'qq不能为空'},

        phone: {type:'presence', message:'手机号不能为空'},

        idNumber: {type:'presence', message:'身份证号码不能为空'},

        //roleId:  {type:'presence', message: '角色不能为空'},

        //userType:  {type:'presence', message: '用户类型必选'},

        workno:  {type:'presence', message: '员工编号不能为空'},

        realname:  {type:'presence', message: '真实姓名不能为空'},

        sex:  {type:'presence', message: '性别必选'}

    }


});