/**
 * Created by Wwei on 2016/9/9.
 */
Ext.define('Admin.view.resources.Resource', {
    extend: 'Ext.container.Container',

    xtype: 'resource',

    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.HBox',
        'Ext.tree.Panel',
        'Admin.view.resources.ResourceController'
    ],

    controller: 'resource',

    layout: 'hbox',

    listeners: {
        beforerender: 'resourceBeforeRender'
    },

    defaults: {
        height: '100%'
    },

    items: [{
        title: '菜单管理',
        flex: 1,
        xtype: 'treepanel',
        reference: 'menuTree',
        useArrows: true,
        store: 'resources.Menu',
        listeners: {
            select: 'onMenuTreeSelected'
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '添加',
                handler: "createMenu",
                iconCls: 'fa fa-plus'
            }, {
                text: '修改',
                handler: "updateMenu",
                iconCls: 'fa fa-pencil-square-o'
            }, {
                text: '删除',
                reference: 'delMenuBtn',
                disabled: true,
                handler: "deleteMenu",
                iconCls: 'fa fa-times'
            }]
        }]
    }, {
        flex: 1,
        frame: true,
        title: '权限管理',
        xtype: 'grid',
        reference: 'permGrid',
        columns: [{
            xtype: 'rownumberer'
        }, {
            text: '名称',
            dataIndex: 'text',
            width: 150
        }, {
            text: '表达式',
            dataIndex: 'permission',
            flex: 1
        }, {
            text: '名称',
            dataIndex: 'status',
            width: 150,
            renderer: function (v) {
                return v == 1 ? '有效' : '无效';
            }
        }],
        store: 'resources.Permission',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '添加',
                handler: "createPermission",
                iconCls: 'fa fa-plus'
            }, {
                text: '修改',
                handler: "updatePermission",
                iconCls: 'fa fa-pencil-square-o'
            }, {
                text: '删除',
                handler: "deletePermission",
                iconCls: 'fa fa-times',
                bind: {
                    disabled: '{!permGrid.selection}'
                }
            }]
        }]
    }]
});