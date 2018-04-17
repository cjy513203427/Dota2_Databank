Ext.define('Admin.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'main',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.list.Tree',
        'Ext.toolbar.Fill'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },


    initComponent: function () {
        var me = this, boxData = {}, record = {}, modifyPassword = 1;
        Common.util.Util.doAjax({
            url: Common.Config.requestPath('System', 'Users', 'info'),
            method: 'get',
            async: false
        }, function (data) {
            record = data.data;
            boxData.realname = record.realname;
            boxData.userId=record.userId;
            modifyPassword = record.modifyPassword;
            Common.permission.Permission.server_permcollections = record.buttonList;
            Common.Config.user.userid = record.userId;
            Common.Config.IMAGE_ADDRESS=record.dicMap.IMG_ADDRESS;
            /* clock.setHtml(record.nowTime);  //定期更新时间
             Ext.TaskMgr.start({
             run: function(){
             Ext.fly(clock.getEl()).update();
             },
             interval: 1000
             });*/
        });

        //construct navigationTree store data
        if (record.resourceList.length > 0) {
            record.resourceList.splice(0, 0, {
                text: '首页',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                url: 'admindashboard',
                leaf: true
            })
        } else {
            record.resourceList = [{
                text: '首页',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                url: 'admindashboard',
                leaf: true
            }]
        }

        me.items = [{
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [{
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo" style="'+Common.Config.business_css+'"><img src="resources/images/dota2.jpg" style="'+Common.Config.business_image_css+'">' + Common.Config.business_name + '</div>',
                width: 250
            }, {
                margin: '0 0 0 8',
                ui: 'header',
                iconCls: 'x-fa fa-navicon',
                id: 'main-navigation-btn',
                handler: 'onToggleNavigationSize'
            }, '->', {
                xtype: 'box',
                reference: 'profile',
                tpl: '欢迎：{realname}',
                data: boxData
            }, {
                xtype: 'button',
                text: '退出',
                handler: 'logout'
            }]
        }, {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: {
                        fields: [{
                            name: 'text'
                        }],
                        root: {
                            expanded: true,
                            children: record.resourceList
                        }
                    },
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }];
        //第一次登录需要修改密码
        if(modifyPassword==0) {
            var modifyPasswordWindow = Ext.create('Ext.window.Window', {
                title: '首次登录修改密码',
                modal: true,
                layout: 'fit',
                closable:false,
                width: 300,
                height: 200,
                items: [
                    {
                        xtype: 'form',
                        items: [{xtype: 'hidden', name: 'userId', value: boxData.userId},{
                            xtype: 'box',
                            html: '<span style="color: green;">密码必须包含大小写字母以及数字，且长度在6-18之间</span>'
                        }, {
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
                            }],
                        buttons: [{
                            text: '确定',
                            formBind: true,
                            handler: function () {
                                var me = this,
                                    form = me.up('form');
                                var formValues = form.getValues();
                                if (!form.isValid()) {
                                    return false;
                                }
                                Common.util.Util.doAjax({
                                    url: Common.Config.requestPath('System', 'Users', 'modifypassword'),
                                    method: 'post',
                                    params: formValues
                                }, function (data) {
                                    modifyPasswordWindow.close();
                                    Ext.Msg.alert('密码修改成功，请重新登录');
                                    Common.util.Util.doAjax({
                                        url: Common.Config.requestPath('Security','Authentic', 'logout')
                                    }, function (data) {
                                        Common.Config.storage.removeItem(Common.Config.LOGINFLAG);
                                        window.location.href = window.location.origin+window.location.search;
                                    });
                                });
                            }
                        }]
                    }
                ]
            });
            modifyPasswordWindow.show();
        }

        this.callParent(arguments);
    }
});
