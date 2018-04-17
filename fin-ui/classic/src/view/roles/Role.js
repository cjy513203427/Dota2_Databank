/**
 * Created by lb on 2016/9/3.
 */
Ext.define('Admin.view.roles.Role', {
    extend: 'Ext.grid.Panel',
    xtype: 'role',

    title: '角色管理',
    controller: 'role',
    requires: [
        'Admin.view.roles.RoleController'
    ],

    selModel: {selType: 'checkboxmodel'},
    sortableColumns: false,
    store: 'roles.Role',
    columns: [{
        xtype: 'rownumberer'
    }, {
        text: 'ID',
        dataIndex: 'id',
        width: 130
    }, {
        text: '名称',
        dataIndex: 'name',
        flex: 1
    }, {
        text: '添加时间',
        dataIndex: 'createTime',
        width: 130
    }, {
        text: '更新时间',
        dataIndex: 'updateTime',
        width: 130
    }, {
        text: '描述',
        dataIndex: 'description',
        width: 130
    }, {
        text: "操作",
        xtype: 'actioncolumn',
        width: 130,
        items: [{
            tooltip: '编辑',
            iconCls: 'x-fa fa-edit',
            handler: 'updateRole'
        }, {
            iconCls: '',
            tooltip: ''
        }, {
            tooltip: '删除',
            iconCls: 'x-fa fa-trash',
            handler: 'del'
        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: '添加',
            handler: "createRole",
            iconCls: 'fa fa-plus'
        }, {
            text: '批量删除',
            handler: "batchDel",
            iconCls: 'fa fa-trash'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: 'roles.Role',
        dock: 'bottom',
        displayInfo: true
    }],
    listeners: {
        beforerender: 'gridBeforeRender',
        render: 'search'
    }
});
