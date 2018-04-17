/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.brandApproval.BrandApproval', {
    extend: 'Ext.Panel',
    xtype: 'brandApproval',
    title: '品牌申请审批',
    requires: [
        'Admin.view.brandApproval.BrandApprovalController',
        'Ext.button.Button'
    ],
    controller: "brandApproval",
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
        items: [{
            xtype: 'datefield',
            name: 'startTime',
            reference:'startTime',
            fieldLabel: '起始时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        }, {
            xtype: 'datefield',
            name: 'endTime',
            reference:'endTime',
            fieldLabel: '结束时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        }]
    }, {
        xtype: 'grid',
        sortableColumns: false,
        reference: 'grid',
        flex: 1,
        store: 'brandApproval.BrandApproval',
        columns: [{
            xtype: 'rownumberer'
        },{
            text: '主键',
            dataIndex: 'id',
            width: 50
        },{
            text: '名称',
            dataIndex: 'name',
            width: 100
        },{
            text: '用户id',
            dataIndex: 'userId',
            width: 50
        },{
            text: '操作',
            xtype: 'actioncolumn',
            width: 100,
            items: [{
                tooltip: '审批品牌申请',
                icon: 'resources/images/icons/ic_enable.png',
                handler: 'approveBrandApplication'
            }]
        }],
        selModel: {
            selType: 'checkboxmodel'
        },
        dockedItems: [{
            xtype: 'toolbar',
            items: [ '->', {
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
            store: 'brandApproval.BrandApproval',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }]
});