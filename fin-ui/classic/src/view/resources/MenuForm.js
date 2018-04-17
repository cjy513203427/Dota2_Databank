/**
 * Created by jonnyLee on 2016/09/27.
 */
Ext.define('Admin.view.resources.MenuForm', {
    extend: 'Ext.window.Window',
    xtype: 'menuForm',

    title: '菜单添加',

    requires: [
        'Admin.model.resources.Menu',
        'Admin.view.resources.MenuFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    modal: true,
    height: 420,
    width: 500,

    controller: 'menuForm',

    viewModel: {
        links: {
            theMenu: {
                type: 'resources.Menu',
                create: true
            }
        }
    },

    items: {
        xtype: 'form',
        modelValidation: true,
        defaults: {
            labelAlign: 'left',
            margin: 10,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'textfield',
            name: 'id',
            fieldLabel: 'Id',
            hidden: true,
            bind: '{theMenu.id}'
        }, {
            xtype: 'textfield',
            name: 'parentId',
            fieldLabel: '父级Id',
            hidden: true,
            bind: '{theMenu.parentId}'
        }, {
            xtype: 'textfield',
            name: 'type',
            fieldLabel: '类型',
            value: 'menu',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'parentName',
            fieldLabel: '父级',
            disabled: true,
            bind: '{theMenu.parentName}'
        }, {
            xtype: 'textfield',
            name: 'text',
            fieldLabel: '名称',
            bind: '{theMenu.text}'
        }, {
            xtype: 'textfield',
            name: 'iconCls',
            fieldLabel: '图标',
            bind: '{theMenu.iconCls}'
        }, {
            xtype: 'textfield',
            name: 'url',
            fieldLabel: '地址',
            bind: '{theMenu.url}'
        }, {
            xtype: 'combo',
            fieldLabel: '状态',
            name: 'status',
            displayField: 'label',
            valueField: 'value',
            editable: false,
            value: 1,
            store: {
                data: [{
                    label: '禁用', value: 0
                }, {
                    label: '正常', value: 1
                }]
            },
            bind: '{theMenu.status}'
        }],
        buttons: [{
            text: '确定',
            handler: 'editMenu'
        }, {
            text: '取消',
            handler: 'closeMenuWindow'
        }]
    }
});
