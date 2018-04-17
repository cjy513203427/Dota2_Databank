/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.CADMultiUploadForm', {
    extend: 'Ext.window.Window',
    xtype: 'cadmultiuploadform',

    title: 'CAD上传',

    requires: [
        'Admin.view.photo.CADMultiUploadFormController',
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

    controller: 'cadmultiuploadform',


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
            xtype: 'panel',
            html:'<iframe frameborder=0 width=660 height=570 marginheight=0 marginwidth=0 scrolling=no src="http://106.14.213.208:8889/multiUploadCAD.html">' +
            '</iframe>'
        }]
    }],
    buttons: [{
        text: '取消',
        handler: 'closeWindow'
    }]
});
