/**
 * Created by hasee on 2017/12/27.
 */
Ext.define('Admin.view.hero.Hero', {
    extend: 'Ext.Panel',
    xtype: 'hero',
    title: '英雄管理',
    requires: [
        'Admin.view.hero.HeroController',
        'Ext.button.Button',
        'Ext.form.field.Date'
    ],
    controller: "hero",
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
            fieldLabel: '英雄名称',
            margin: '15px 0px 0px 0px',
            name: 'localizedName'
        }]
    }, {
        xtype: 'grid',
        sortableColumns: true,
        reference: 'grid',
        flex: 1,
        store: 'hero.Hero',
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
            text: '英雄头像',
            dataIndex: 'headportraitPath',
            width: 200,
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
            text: '英雄图片',
            dataIndex: 'heroPath',
            width: 108,
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
            items: [{
                tooltip: '编辑',
                icon: 'resources/images/icons/ic_edit.png',
                handler: 'modifyHero',
                columnWidth :25,
                isDisabled: function () {
                    if (!Common.permission.Permission.hasPermission("英雄修改")) {
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
            store: 'hero.Hero',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }]
});