/**
 * Created by lb on 2016/9/9.
 */
Ext.define('Admin.view.account.Account', {
    extend: 'Ext.form.Panel',
    xtype: 'account',

    requires: [
        'Admin.view.roles.RoleController',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],

    config: {
        title: '账号管理'
    },

    defaults: {
        padding: 20
    },

    items: [{
        xtype: 'box',
        html: '<span style="color: green;">密码必须包含大小写字母以及数字，且长度在6-18之间</span>'
    },{
        xtype: 'textfield',
        reference: 'password',
        vtype: 'password',
        name: 'password',
        inputType: 'password',
        fieldLabel: '输入密码',
        allowBlank: false
    }, {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: '重复密码',
        allowBlank: false,
        vtype: 'repetition',  //指定repetition验证类型
        repetition: {   //配置repetition验证，提供目标组件（表单）name
           target: 'password'
        }
    },{
        xtype: 'button',
        text: "确认修改",
        formBind: true,
        scale: "large",
        style : 'margin-left:170px',
        handler: function () {
            var me = this, form = me.up('form');
            Common.util.Util.doAjax({
                url: Common.Config.requestPath('System', 'Users', 'modifypassword'),
                method: 'post',
                params: form.getValues()
            }, function (data) {
                if (data.code === '0') {
                    form.reset();
                    Common.util.Util.toast("密码修改成功");
                }
            });
        }
    }]


});