/**
 * Created by lb on 2016/9/5.
 */
Ext.define('Admin.view.roles.RoleForm', {
    extend: 'Ext.window.Window',

    xtype: 'roleform',

    requires: [
        'Admin.view.roles.RoleFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'Ext.ux.tree.CheckTree'
    ],

    controller: 'roleform',

    config: {
        width: 800,
        minHeight: 500,
        modal: true
    },

    layout: 'hbox',

    userCls: 'role-form',


    initComponent: function () {
        var me = this;
        if (me.action === 'create') {
            me.header = {
                html: '<span class="role-title">角色添加</span><span class="permission-title">权限选择</span>'
            };
        } else if (me.action === 'update') {
            me.header = {
                html: '<span class="role-title">角色修改</span><span class="permission-title">权限修改</span>'
            };
        } else {
            me.title = '角色管理';
            console.error('roleForm action not match');
        }
        me.callParent(arguments);
    },

    viewModel: {
        links: {
            theRole: {
                type: 'roles.Role',
                create: true
            }
        }
    },

    items: [{
        flex: 1,
        xtype: 'form',
        reference: 'form',
        modelValidation: true,
        defaults: {
            labelAlign: 'left',
            margin: 10,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '用户名',
            bind: '{theRole.name}'
        }, {
            xtype: 'combo',
            fieldLabel: '状态',
            name: 'status',
            displayField: 'label',
            valueField: 'value',
            editable: false,
            store: {
                data: [{
                    label: '已删除', value: 0
                }, {
                    label: '正常', value: 1
                }]
            },
            bind: '{theRole.status}'
        }, {
            xtype: 'textareafield',
            fieldLabel: '描述',
            name: 'description',
            anchor: '100%',
            bind: '{theRole.description}'
        }]
    }, {
        flex: 1,
        xtype: 'checktree',
        frame: true,
        reference: 'tree',
        height: '100%',
        rootVisible: false,
        useArrows: true,
        store: 'resources.Resource',
        listeners:{

        }
    }],

    buttons: [{
        text: '确定',
        handler: 'edit'
    }, {
        text: '取消',
        handler: 'closeWindow'
    }]

});
