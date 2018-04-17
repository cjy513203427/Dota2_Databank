
Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'login',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],

    title: Common.Config.business_name,
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
    initComponent: function() {
        var me=this;
        me.addCls('user-login-register-container');
        me.items=[
            {
                xtype: 'authdialog',
                defaultButton : 'loginButton',
                autoComplete: true,
                bodyPadding: '20 20',
                cls: 'auth-dialog-login',
                header: false,
                width: 415,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                defaults : {
                    margin : '5 0'
                },
                items: [
                    {
                        xtype: 'hidden',
                        name: 'roomcode',
                        value:'x193302mm'
                    },{
                        xtype: 'label',
                        text: '用户登录'
                    },
                    {
                        xtype: 'textfield',
                        name: 'username',
                        height: 55,
                        hideLabel: true,
                        allowBlank : false,
                        emptyText: '账号',
                        triggers: {
                            glyphed: {
                                cls: 'trigger-glyph-noop auth-email-trigger'
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        height: 55,
                        hideLabel: true,
                        emptyText: '密码',
                        inputType: 'password',
                        name: 'password',
                        allowBlank : false,
                        triggers: {
                            glyphed: {
                                cls: 'trigger-glyph-noop auth-password-trigger'
                            }
                        }
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                flex : 1,
                                cls: 'form-panel-font-color rememberMeCheckbox',
                                height: 30,
                                boxLabel: '记住我'
                            },
                            {
                                xtype: 'box',
                                html: '<a href="#passwordreset" class="link-forgot-password"> 忘记密码 ?</a>'
                            }
                        ],
                        hidden:true
                    },
                    {
                        xtype: 'button',
                        reference: 'loginButton',
                        scale: 'large',
                        ui: 'soft-green',
                        iconAlign: 'right',
                        iconCls: 'x-fa fa-angle-right',
                        text: '登&nbsp;&nbsp;&nbsp;&nbsp;录',
                        formBind: true,
                        listeners: {
                            click: 'onLoginButton'
                        }
                    }/*,  {
                        xtype: 'box',
                        html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                        margin: '10 0'
                    }, {
                        xtype: 'button',
                        scale: 'large',
                        ui: 'soft-blue',
                        iconAlign: 'right',
                        iconCls: 'x-fa fa-qq',
                        text: '使用企业QQ登录',
                        listeners: {
                            click: 'onQQLogin'
                        }
                    }*/
                ]
            }
        ];
        /*Common.util.Util.doAjax({
            url: Common.Config.requestPath('Security','Authentic', 'state'),
            method: 'get',
        }, function (data) {
            window.state=data.data;
        });*/
        me.callParent(arguments);
    }
});
