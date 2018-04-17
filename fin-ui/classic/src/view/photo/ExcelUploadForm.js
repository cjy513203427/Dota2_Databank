/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.ExcelUploadForm', {
    extend: 'Ext.window.Window',
    xtype: 'exceluploadform',

    title: 'Excel上传',

    requires: [
        'Admin.view.photo.ExcelUploadFormController',
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

    controller: 'exceluploadform',


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
            name: 'excelPath',
            fieldLabel: '图片',
            labelWidth: 50,
            msgTarget: 'side',
            anchor: '100%',
            accept: 'xls/xlsx',
            buttonText: '选择Excel表格...',
            validator: function (value) {
                if(value==''){
                    return true;
                }
                var arr = value.split('.');
                if (arr[arr.length - 1] == 'xls' || arr[arr.length - 1] == 'xlsx') {
                    return true;
                } else {
                    return '必须选择xls或者xlsc格式的Excel！';
                }
            }
        }]
    }],
    buttons: [{
        text: '确定',
        handler: 'editExcel'
    }, {
        text: '取消',
        handler: 'closeWindow'
    }]
});
