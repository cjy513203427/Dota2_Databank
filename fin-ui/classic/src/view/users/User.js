/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.users.User', {
    extend: 'Ext.Panel',
    xtype: 'user',
    title: '用户管理',

    requires: [
        'Admin.view.users.UserController',
        'Ext.button.Button'
    ],
    controller: "user",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'form',
        reference: 'form',
        defaultButton: 'btn_search',
        layout: 'column',
        defaults: {
            labelAlign: 'right'
        },
        style: {
            margin: '12px 0px 0px -28px'
        },
        items: [{
            xtype: 'textfield',
            reference: 'username',
            fieldLabel: '用户名',
            name: 'username'
        },{
            xtype: 'textfield',
            reference: 'workno',
            fieldLabel: '员工编号',
            name: 'workno'
        },{
            xtype: 'textfield',
            reference: 'realname',
            fieldLabel: '真实姓名',
            name: 'realname'
        }, {
            xtype: 'combo',
            fieldLabel: '用户类型',
            name: 'userType',
            valueField: "id",
            displayField: "name",
            editable: false,
            store: 'users.RoleType'
        }]
    }, {
        xtype: 'grid',
        sortableColumns: false,
        reference: 'grid',
        flex: 1,
        store: 'users.User',
        columns: [{
            xtype: 'rownumberer'
        },{
            text: '用户名',
            dataIndex: 'username',
            width: 100
        },{
            text: '员工编号',
            dataIndex: 'workno',
            width: 100
        },{
            text: '真实姓名',
            dataIndex: 'realname',
            width: 100
        },{
            text: '手机号码',
            dataIndex: 'phone',
            width: 100
        }, {
            text: '用户类型',
            dataIndex: 'userType',
            width: 90
        },{
            text: '状态',
            dataIndex: 'status',
            width: 60,
            renderer: function (status) {
                if (status == 0) {
                    return "已禁用";
                } else if (status == 1) {
                    return "正常";
                }
            }
        },  {
            text: '创建时间',
            dataIndex: 'createTime',
            width: 150
        }, {
            text: '更新时间',
            dataIndex: 'updateTime',
            width: 150
        }, {
            text: '操作',
            xtype: 'actioncolumn',
            width: 200,
            items: [{
                tooltip: '编辑',
                icon: 'resources/images/icons/ic_edit.png',
                handler: 'updateUser',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (!Common.permission.Permission.hasPermission("用户修改")) {
                        return true;
                    }
                    return false;
                }
            },'-',{
                iconCls: 'x-fa fa-child',
                tooltip: '用户的角色分配',
                handler: 'changeUserRole',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (!Common.permission.Permission.hasPermission("用户角色分配")) {
                        return true;
                    }
                    return false;
                }
            },'-',{
                tooltip: '启用',
                icon: 'resources/images/icons/ic_enable.png',
                handler: 'activeUser',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (record.data['status'] == 1||!Common.permission.Permission.hasPermission("用户禁用")) {
                        return true;
                    }
                    return false;
                }
            },'-',{
                tooltip: '禁用',
                icon: 'resources/images/icons/ic_disable.png',
                handler: 'disableUser',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (record.data['status'] == 0||!Common.permission.Permission.hasPermission("用户禁用")) {
                        return true;
                    }
                    return false;
                }
            },'-',{
                tooltip: '分配品牌',
                iconCls: 'x-fa fa-edit',
                handler: 'distributeBrand',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (!Common.permission.Permission.hasPermission("分配品牌")) {
                        return true;
                    }
                    return false;
                }
            }]
        }],
        selModel: {
            selType: 'checkboxmodel'
        },
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: '添加',
                handler: "createUser",
                iconCls: 'fa fa-plus',
                hidden:true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("用户添加")){
                            b.show();
                        }
                    }
                }
            }, {
                text: '批量禁用',
                handler: "disableUsers",
                iconCls: 'fa fa-ban',
                hidden:true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("用户禁用")){
                            b.show();
                        }
                    }
                }
            }, {
                text: '重置密码',
                iconCls: 'fa fa-eraser',
                handler: "resetpassword",
                hidden:true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("重置密码")){
                            b.show();
                        }
                    }
                }
            }, '->', {
                text: '查询',
                iconCls: 'fa fa-search',
                reference: 'btn_search',
                handler: 'search'
            }
                , {
                    text: '清空条件',
                    iconCls: 'fa fa-search',
                    listeners: {
                        click: 'reset'
                    }
                }]
        }, {
            xtype: 'pagingtoolbar',
            store: 'users.User',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }
    ]
});