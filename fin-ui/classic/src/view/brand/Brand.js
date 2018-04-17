/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.brand.Brand', {
    extend: 'Ext.Panel',
    xtype: 'brand',
    title: '品牌管理',
    requires: [
        'Admin.view.brand.BrandController',
        'Ext.button.Button',
        'Ext.form.field.Date'
    ],
    controller: "brand",
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
        },{
            xtype: 'textfield',
            reference: 'brandName',
            fieldLabel: '品牌名称',
            margin: '15px 0px 0px 0px',
            name: 'brandName'
        }]
    }, {
        xtype: 'grid',
        sortableColumns: false,
        reference: 'grid',
        flex: 1,
        store: 'brand.Brand',
        columns: [{
            xtype: 'rownumberer'
        },{
            text: '名称',
            dataIndex: 'name',
            width: 100
        },{
            text: '操作',
            xtype: 'actioncolumn',
            width: 100,
            items: [{
                tooltip: '编辑',
                icon: 'resources/images/icons/ic_edit.png',
                handler: 'modifyBrand',
                columnWidth :25,
                isDisabled: function () {
                    if (!Common.permission.Permission.hasPermission("品牌修改")) {
                        return true;
                    }
                    return false;
                }
            },'-',{
                tooltip: '删除品牌',
                icon: 'resources/images/icons/red_cross.png',
                handler: 'deleteBrand',
                isDisabled: function () {
                    if (!Common.permission.Permission.hasPermission("删除品牌")) {
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
                text: '品牌添加',
                handler: "addBrand",
                iconCls: 'fa fa-plus',
                hidden: true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("品牌添加")){
                            b.show();
                        }
                    }
                }
            },'->', {
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
            store: 'brand.Brand',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }]
});