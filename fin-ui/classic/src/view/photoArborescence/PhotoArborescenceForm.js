/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.view.photoArborescence.PhotoArborescenceForm', {
    extend: 'Ext.window.Window',
    xtype: 'photoArborescenceForm',

    title: '商品树添加',

    requires: [
        'Admin.view.photoArborescence.PhotoArborescenceFormController',
        'Admin.model.photoArborescence.PhotoArborescence',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    modal: true,
    height: 420,
    width: 500,

    controller: 'photoArborescenceForm',

    viewModel: {
        links: {
            thePhotoArborescence: {
                type: 'photoArborescence.PhotoArborescence',
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
            bind: '{thePhotoArborescence.id}'
        }, {
            xtype: 'textfield',
            name: 'parentId',
            fieldLabel: '父级Id',
            hidden: true,
            bind: '{thePhotoArborescence.parentId}'
        }, {
            xtype: 'textfield',
            name: 'parentName',
            fieldLabel: '父级',
            editable:false,
            bind: '{thePhotoArborescence.parentName}'
        }, {
            xtype: 'textfield',
            name: 'text',
            fieldLabel: '名称',
            emptyText: '请在父级目录为品牌下添加',
            bind: '{thePhotoArborescence.text}'
        }],
        buttons: [{
            text: '确定',
            handler: 'editPhotoArborescence'
        }, {
            text: '取消',
            handler: 'closePhotoArborescenceWindow'
        }]
    }
});
