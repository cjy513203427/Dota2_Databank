/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.PhotoBrandForm', {
    extend: 'Ext.window.Window',
    xtype: 'photobrandform',

    title: '品牌添加',

    requires: [
        'Admin.view.photo.PhotoBrandFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    modal: true,
    height: 200,
    width: 370,

    controller: 'photobrandform',

    viewModel: {
        links: {
            thePhoto: {
                type: 'photo.Photo',
                create: true
            }
        },
        data: {
            roleComboQueryMode: 'remote'
        }
    },

    items: [{
        flex: 1,
        xtype: 'form',
        reference: 'form',
        modelValidation: true,
        defaults: {
            labelAlign: 'left',
            margin: 10,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'textfield',
            name: 'id',
            fieldLabel: '商品id',
            hidden: true,
            bind: '{thePhoto.id}'
        },{
            xtype: 'combo',
            store: 'brand.UserBrand',
            name: 'brandId',
            fieldLabel: '品牌名称',
            valueField: 'id',
            displayField: 'name',
            emptyText: '请选择品牌名称'
        }]
    }],
    buttons: [{
        text: '确定',
        handler: 'editPhotoBrand'
    }, {
        text: '取消',
        handler: 'closeWindow'
    }]
});
