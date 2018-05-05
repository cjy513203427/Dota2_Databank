/**
 * Created by hasee on 2018/1/27.
 */
Ext.define('Admin.view.talent.Talent', {
    extend: 'Ext.Panel',
    xtype: 'talent',
    title: '天赋管理',
    requires: [
        'Admin.view.talent.TalentController',
        'Ext.button.Button',
        'Ext.form.field.Date'
    ],
    controller: "talent",
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
            hidden:true,
            fieldLabel: '起始时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        }, {
            xtype: 'datefield',
            name: 'endTime',
            reference:'endTime',
            hidden:true,
            fieldLabel: '结束时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        },{
            xtype: 'textfield',
            reference: 'text',
            fieldLabel: '天赋名称',
            margin: '15px 0px 0px 0px',
            name: 'text'
        }]
    }, {
        xtype: 'grid',
        sortableColumns: true,
        reference: 'grid',
        flex: 1,
        store: 'talent.Talent',
        columns: [{
            xtype: 'rownumberer'
        },{
            text: 'id',
            dataIndex: 'id',
            width: 30
        },{
            text: '天赋名称',
            dataIndex: 'text',
            width: 245
        },{
            text: '中文名',
            dataIndex: 'chineseName',
            width: 245
        },{
            text: '英雄id',
            dataIndex: 'heroId',
            width: 150
        },{
            text: '所需等级',
            dataIndex: 'grade',
            width: 150
        },{
            text: '类型',
            dataIndex: 'type',
            width: 150
        },{
            text: '操作',
            xtype: 'actioncolumn',
            width: 100,
            hidden:true,
            items: []
        }],
        selModel: {
            selType: 'checkboxmodel'
        },
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: '查询',
                iconCls: 'fa fa-search',
                reference: 'btn_search',
                handler: 'search'
            }, {
                text: '清空条件',
                iconCls: 'fa fa-search',
                listeners: {
                    click: 'reset'
                }
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: 'talent.Talent',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }]
});