/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.view.pictureType.PictureTypeForm', {
    extend: 'Ext.window.Window',
    xtype: 'pictureTypeForm',

    title: '报价添加',

    requires: [
        'Admin.view.pictureType.PictureTypeFormController',
        'Admin.model.pictureType.PictureType',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    modal: true,
    height: 420,
    width: 500,

    controller: 'pictureTypeForm',

    viewModel: {
        links: {
            thePicture: {
                type: 'pictureType.PictureType',
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
            bind: '{thePicture.id}'
        }, {
            xtype: 'textfield',
            name: 'parentId',
            fieldLabel: '父级Id',
            hidden: true,
            bind: '{thePicture.parentId}'
        }, {
            xtype: 'textfield',
            name: 'parentName',
            fieldLabel: '父级',
            disabled: true,
            bind: '{thePicture.parentName}'
        }, {
            xtype: 'textfield',
            name: 'text',
            fieldLabel: '名称',
            bind: '{thePicture.text}'
        }, {
            xtype: 'combo',
            fieldLabel: '是否删除',
            name: 'isDelete',
            displayField: 'label',
            valueField: 'value',
            editable: false,
            value: 1,
            store: {
                data: [{
                    label: '正常', value: 0
                }, {
                    label: '删除', value: 1
                }]
            },
            bind: '{thePicture.isDelete}'
        }],
        buttons: [{
            text: '确定',
            handler: 'editPicture'
        }, {
            text: '取消',
            handler: 'closePictureWindow'
        }]
    }
});
