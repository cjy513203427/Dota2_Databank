/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.SystemConfigForm', {
    extend: 'Ext.window.Window',
    xtype: 'systemconfigform',

    title: '系统配置上传',

    requires: [
        'Admin.view.photo.SystemConfigFormController',
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

    controller: 'systemconfigform',


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
            name: 'configurationFile',
            fieldLabel: '配置文件',
            labelWidth: 80,
            msgTarget: 'side',
            anchor: '100%',
            accept: 'zip',
            buttonText: '选择配置文件...',
            emptyText: 'zip格式文件',
            validator: function (value) {
                if(value==''){
                    return true;
                }
                var arr = value.split('.');
                if (arr[arr.length - 1] == 'zip') {
                    return true;
                } else {
                    return '必须选择zip格式的压缩文件！';
                }
            }
        }]
    }],
    buttons: [{
        text: '确定',
        handler: 'editSystemConfig'
    }, {
        text: '取消',
        handler: 'closeWindow'
    }]
});
