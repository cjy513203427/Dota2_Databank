/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.brand.BrandForm', {
    extend: 'Ext.window.Window',
    xtype: 'brandform',

    title: '品牌添加',

    requires: [
        'Admin.view.brand.BrandFormController',
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

    controller: 'brandform',

    viewModel: {
        links: {
            theBrand: {
                type: 'brand.Brand',
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
            fieldLabel: '品牌id',
            hidden: true,
            bind: '{theBrand.id}'
        },{
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '品牌名称',
            bind: '{theBrand.name}'
        }]
    }],
        buttons: [{
            text: '确定',
            handler: 'editBrand'
        }, {
            text: '取消',
            handler: 'closeWindow'
        }]
});
