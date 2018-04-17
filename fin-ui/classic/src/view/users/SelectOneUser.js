/**
 * 用来选择单一用户
 * Created by cc on 2016/9/1.
 */
Ext.define('Admin.view.users.SelectOneUser', {
    extend: 'Ext.window.Window',
    xtype: 'selectOneUser',
    title: '用户列表',
    requires: [
        'Admin.view.users.SelectOneUserController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    modal: true,
    height: 420,
    width: 500,
    controller: 'selectOneUser',
    id:'selectOneUserWindow',
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
            fieldLabel: '用户编号',
            name: 'workno',
            id:'userSelect_workno'
        },{
            xtype: 'textfield',
            fieldLabel: '真实姓名',
            name: 'realname',
            id:'userSelect_realname'
        }]
    },{
        xtype: 'grid',
        sortableColumns: false,
        reference: 'grid',
        flex: 1,
        store: 'users.User',
        columns: [{
            xtype: 'rownumberer'
        }, {
            text: '用户编号',
            dataIndex: 'workno',
            width: 100
        }, {
            text: '真实姓名',
            dataIndex: 'realname',
            flex: 1
        }, {
            text: '用户类型',
            dataIndex: 'userType',
            flex: 1,
            renderer:function (v) {
                if(v==1){
                    return '管理员'
                }else if(v==2){
                    return '客服'
                }else if(v==3){
                    return '表现师'
                }else{
                    return '异常'
                }
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: '选择',
                handler: "selectedCustomer",
                iconCls: 'fa fa-plus'
            }, '->', {
                text: '查询',
                iconCls: 'fa fa-search',
                reference: 'btn_search',
                handler: 'search'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: 'users.User',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search',
            rowdblclick:'selectedUser'
        }
    }]
});
