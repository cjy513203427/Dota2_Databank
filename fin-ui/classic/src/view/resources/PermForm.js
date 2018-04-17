/**
 * Created by jonnyLee on 2016/09/28.
 */
Ext.define('Admin.view.resources.PermForm', {
    extend: 'Ext.window.Window',
    xtype: 'permForm',

    title: '权限添加',

    requires: [
        'Admin.model.resources.Permission',
        'Admin.view.resources.PermFormController',
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

    controller: 'permForm',

    viewModel: {
        links: {
            thePerm: {
                type: 'resources.Permission',
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
            bind: '{thePerm.id}'
        },{
            xtype: 'textfield',
            name: 'parentId',
            reference: 'resourceId',
            fieldLabel: '父级Id',
            hidden: true,
            bind: '{thePerm.parentId}'
        },{
            xtype: 'textfield',
            name: 'type',
            fieldLabel: '类型',
            value: 'button',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'parentName',
            fieldLabel: '菜单',
            disabled: true,
            bind: '{thePerm.parentName}'
        }, {
            xtype: 'textfield',
            name: 'text',
            fieldLabel: '名称',
            bind: '{thePerm.text}'
        }, {
            xtype: 'textfield',
            name: 'permission',
            fieldLabel: '表达式',
            bind: '{thePerm.permission}'
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
                    label: '无效', value: 0
                }, {
                    label: '有效', value: 1
                }]
            },
            bind: '{thePerm.status}'
        }],
        buttons: [{
            text: '确定',
            handler: 'editPerm'
        }, {
            text: '取消',
            handler: 'closePermWindow'
        }]
    }
});
