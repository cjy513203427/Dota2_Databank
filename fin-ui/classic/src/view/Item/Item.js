/**
 * Created by hasee on 2018/1/6.
 */
Ext.define('Admin.view.item.Item', {
    extend: 'Ext.Panel',
    xtype: 'item',
    title: '物品管理',
    requires: [
        'Admin.view.item.ItemController',
        'Ext.button.Button',
        'Ext.form.field.Date'
    ],
    controller: "item",
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
            reference: 'localizedName',
            fieldLabel: '物品名称',
            margin: '15px 0px 0px 0px',
            name: 'localizedName'
        }]
    }, {
        xtype: 'grid',
        sortableColumns: true,
        reference: 'grid',
        flex: 1,
        store: 'item.Item',
        columns: [{
            xtype: 'rownumberer'
        },{
            text: 'id',
            dataIndex: 'id',
            width: 30
        },{
            text: '标准名称',
            dataIndex: 'name',
            width: 150
        },{
            text: '本地化名称',
            dataIndex: 'localizedName',
            width: 150
        },{
            text: '中文名',
            dataIndex: 'chineseName',
            width: 150
        },{
            text: '所需金钱',
            dataIndex: 'cost',
            width: 150
        },{
            text: '神秘商店',
            dataIndex: 'secretShop',
            width: 80,
            renderer: function (secretShop) {
                if (secretShop == 0) {
                    return "否";
                } else if (secretShop == 1) {
                    return "是";
                }
            }
        },{
            text: '路边商店',
            dataIndex: 'sideShop',
            width: 80,
            renderer: function (sideShop) {
                if (sideShop == 0) {
                    return "否";
                } else if (sideShop == 1) {
                    return "是";
                }
            }
        },{
            text: '卷轴',
            dataIndex: 'recipe',
            width: 150,
            renderer: function (recipe) {
                if (recipe == 0) {
                    return "否";
                } else if (recipe == 1) {
                    return "是";
                }
            }
        },{
            text: '物品图片',
            dataIndex: 'itemPath',
            width: 126,
            renderer:function (v) {
                if (v == null || v == '') {
                    return '<a href="' + v + '" target="_blank" >' +
                        '<img style="width: 75%;height: 75%;" title="未上传文件" alt="未上传文件" src="' + v + '">'
                        + '</a>'
                } else {
                    return '<a href="' + v + '" target="_blank" >' +
                        '<img style="width: 75%;height: 75%;" title="下载" alt="下载" src="' + v + '">'
                        + '</a>'
                }
            }
        },{
            text: '操作',
            xtype: 'actioncolumn',
            width: 100,
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
            store: 'item.Item',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }]
});