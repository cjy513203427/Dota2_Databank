/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.CoverUploadForm', {
    extend: 'Ext.window.Window',
    xtype: 'coveruploadform',

    title: '封面上传',

    requires: [
        'Admin.view.photo.CoverUploadFormController',
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

    controller: 'coveruploadform',


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
            xtype: 'filefield',
            name: 'coverPath',
            fieldLabel: '封面文件',
            labelWidth: 50,
            msgTarget: 'side',
            anchor: '100%',
            accept: 'image/jpeg,image/png',
            buttonText: '选择图片...',
            emptyText: 'jpg或者png格式',
            validator: function (value) {
                if(value==''){
                    return true;
                }
                var arr = value.split('.');
                if (arr[arr.length - 1] == 'jpg' || arr[arr.length - 1] == 'jpeg'
                    || arr[arr.length - 1] == 'JPG' || arr[arr.length - 1] == 'JPEG' || arr[arr.length - 1] == 'PNG' || arr[arr.length - 1] == 'png'
                ||arr[arr.length - 1] == 'gif' || arr[arr.length - 1] == 'GIF') {
                    return true;
                } else {
                    return '必须选择JPG、PNG、GIF格式的图片！';
                }
            }
        }]
    }],
    buttons: [{
        text: '确定',
        handler: 'editCover'
    },{
        text: '取消',
        handler: 'closeWindow'
    }]
});
