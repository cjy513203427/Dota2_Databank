/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.PhotoForm', {
    extend: 'Ext.window.Window',
    xtype: 'photoform',

    title: '商品添加',

    requires: [
        'Admin.view.photo.PhotoFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit',
        'Ext.ux.TreePicker'
    ],

    layout: 'fit',

    modal: true,
    height: 620,
    width: 370,

    controller: 'photoform',

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
            xtype: 'treepicker',
            fieldLabel: '父目录',
            useArrows: true,
            emptyText: '父目录与类型对应',
            width: 300,
            labelWidth: 50,
            scrollable:'y',
            maxPickerHeight: 500,
            margin: '0 0 0 0',
            displayField: 'text',
            name: 'text',//这里传的不是string类型的text,而是int类型的parentId
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    id: 0,
                    text: '百胜'
                },
                proxy: {
                    type: 'ajax',
                    api: {
                        read: Common.Config.requestPath('Photo', 'queryPhotoArborescence')
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),
            bind: '{thePhoto.type}'
        },{
            xtype: 'combo',
            store: 'brand.UserBrand',
            name: 'brandId',
            fieldLabel: '品牌名称',
            valueField: 'id',
            displayField: 'name',
            emptyText: '请选择品牌名称'
        },{
            xtype: 'textfield',
            name: 'id',
            fieldLabel: '商品id',
            hidden: true,
            bind: '{thePhoto.id}'
        },{
            xtype: 'textfield',
            name: 'model',
            fieldLabel: '模型',
            bind: '{thePhoto.model}'
        },{
            xtype: 'textfield',
            name: 'type',
            fieldLabel: '类型',
            bind: '{thePhoto.type}'
        },{
            xtype: 'filefield',
            name: 'photoUrl',
            fieldLabel: '图片Url',
            labelWidth: 50,
            msgTarget: 'side',
            anchor: '100%',
            accept: 'png',
            buttonText: '选择PNG图片...',
            bind: '{thePhoto.photoUrl}',
            validator: function (value) {
                if(value==''){
                    return true;
                }
                var arr = value.split('.');
                if (arr[arr.length - 1] == 'png' || arr[arr.length - 1] == 'PNG') {
                    return true;
                } else {
                    return '必须选择png格式的图片！';
                }
            }
        },{
            xtype: 'filefield',
            name: 'dwgUrl',
            fieldLabel: 'CADUrl',
            labelWidth: 50,
            msgTarget: 'side',
            anchor: '100%',
            accept: 'dwg',
            buttonText: '选择dwg文件...',
            bind: '{thePhoto.dwgUrl}',
            validator: function (value) {
                if(value==''){
                    return true;
                }
                var arr = value.split('.');
                if (arr[arr.length - 1] == 'dwg' || arr[arr.length - 1] == 'DWG') {
                    return true;
                } else {
                    return '必须选择dwg格式的文件！';
                }
            }
        },{
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '商品名称',
            bind: '{thePhoto.text}'
        },{
            xtype: 'textfield',
            name: 'photoNumber',
            fieldLabel: '编号',
            bind: '{thePhoto.photoNumber}'
        },{
            xtype: 'textfield',
            name: 'condition',
            fieldLabel: '品相',
            bind: '{thePhoto.condition}'
        },{
            xtype: 'textfield',
            name: 'specification',
            fieldLabel: '规格',
            bind: '{thePhoto.specification}'
        },{
            xtype: 'textfield',
            name: 'versionName',
            fieldLabel: '版本名称',
            bind: '{thePhoto.versionName}'
        }]
    }],
    buttons: [{
        text: '确定',
        handler: 'editPhoto'
    }, {
        text: '取消',
        handler: 'closeWindow'
    }]
});
