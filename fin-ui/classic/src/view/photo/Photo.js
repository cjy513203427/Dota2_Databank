/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.Photo', {
    extend: 'Ext.Panel',
    xtype: 'photo',
    title: '商品管理',
    requires: [
        'Admin.view.photo.PhotoController',
        'Ext.button.Button'
    ],
    controller: "photo",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'form',
        reference: 'form',
        defaultButton: 'btn_search',
        layout: 'column',
        defaults: {
            labelAlign: 'right'
        },
        items: [{
            xtype: 'datefield',
            name: 'startTime',
            reference:'startTime',
            fieldLabel: '起始时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        }, {
            xtype: 'datefield',
            name: 'endTime',
            reference:'endTime',
            fieldLabel: '结束时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        },{
            xtype: 'textfield',
            name: 'keyWord',
            reference:'keyWord',
            fieldLabel: '关键字',
            emptyText: '编号、品相、规格',
            margin: '15px 0px 0px 0px',
            labelWidth: 60
        },{
            xtype: 'combo',
            store: 'brand.UserBrand',
            name: 'brandId',
            margin: '15px 0px 0px 0px',
            fieldLabel: '品牌名称',
            valueField: 'id',
            displayField: 'name',
            emptyText: '请选择品牌名称'
        }]
    }, {
        xtype: 'grid',
        //sortableColumns: false,//控制升降序显示
        reference: 'grid',
        flex: 1,
        store: 'photo.Photo',
        columnLines: true,
        columns: [{
            xtype: 'rownumberer'
        },{
            text: '主键',
            dataIndex: 'id',
            width: 50,
            hidden: true
        },{
            text: '品牌名称',
            dataIndex: 'brandName',
            width: 100
        },{
            text: '模型',
            dataIndex: 'model',
            width: 50
        },{
            text: '类型',
            dataIndex: 'type',
            width: 50
        },{
            text: '编号',
            dataIndex: 'photoNumber',
            width: 100
        },{
            text: '品相',
            dataIndex: 'condition',
            width: 150
        },{
            text: '规格/型号',
            dataIndex: 'specification',
            width: 150
        },{
            text: '版本号',
            dataIndex: 'versionName',
            width: 100
        },{
            text: '商品名称',
            dataIndex: 'text',
            width: 100
        },{
            text: 'CAD下载',
            dataIndex: 'dwgUrl',
            width:100,
            renderer:function (v) {
                if (v == null || v == '') {
                    return '<a href="http://new3.ypxgt.com/' + v + '" target="_blank" >' +
                        '<img style="width: 75%;height: 75%;" title="未上传文件" alt="未上传文件" src="http://new3.ypxgt.com/' + v + '">'
                        + '</a>'
                } else {
                    return '<a href="http://new3.ypxgt.com/' + v + '" target="_blank" >' +
                        '<img style="width: 75%;height: 75%;" title="下载" alt="下载" src="http://new3.ypxgt.com/' + v + '">'
                        + '</a>'
                }
            }
        }, {
            text: '照片',
            dataIndex: 'photoUrl',
            width: 100,
            renderer: function (v) {
                if (v == null || v == '') {
                    return '<a href="http://new3.ypxgt.com/' + v + '" target="_blank" >' +
                        '<img style="width: 75%;height: 75%;" title="未上传文件" alt="未上传文件" src="http://new3.ypxgt.com/' + v + '">'
                        + '</a>'
                } else {
                    return '<a href="http://new3.ypxgt.com/' + v + '" target="_blank" >' +
                    '<img style="width: 120%;height: 100%;" title="下载" alt="下载" src="http://new3.ypxgt.com/' + v + '">'
                    + '</a>'
                }
            }
        },{
            text: '备注',
            dataIndex: 'description',
            width: 100
        },{
            text: '操作',
            xtype: 'actioncolumn',
            width: 100,
            items: [{
                tooltip: '编辑',
                icon: 'resources/images/icons/ic_edit.png',
                handler: 'modifyPhoto',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (!Common.permission.Permission.hasPermission("商品修改")) {
                        return true;
                    }
                    return false;
                }
            },'-',{
                tooltip: '商品的品牌修改',
                iconCls: 'x-fa fa-wrench',
                hidden: true,
                handler: 'modifyBrandId',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (!Common.permission.Permission.hasPermission("商品牌修")) {
                        return true;
                    }
                    return false;
                }
            },{
                tooltip: '删除',
                icon: 'resources/images/icons/red_cross.png',
                handler: 'deletePhoto',
                isDisabled: function (view, rowindex, colindex, item, record) {
                    if (!Common.permission.Permission.hasPermission("商品删除")) {
                        return true;
                    }
                    return false;
                }
            }]
        }],
        selModel: {
            selType: 'checkboxmodel'
        },
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: '商品添加',
                handler: "addPhoto",
                iconCls: 'fa fa-plus',
                hidden: true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("商品添加")){
                            b.show();
                        }
                    }
                }
            },{
                text: 'Excel导入',
                handler: "uploadExcel",
                iconCls: 'fa fa-upload',
                hidden: true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("Excel上传")){
                            b.show();
                        }
                    }
                }
            },{
                text: '图片批量上传',
                handler: "uploadMultiPicture",
                hidden: true,
                iconCls: 'fa fa-upload',
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("图片上传")){
                            b.show();
                        }
                    }
                }
            },{
                    text: 'CAD批量上传',
                    handler: "uploadMultiCAD",
                    iconCls: 'fa fa-upload',
                    hidden: true,
                    listeners:{
                         render:function (b) {
                            if(Common.permission.Permission.hasPermission("CAD上传")){
                                b.show();
                         }
                         }
                         }
            },{
                text: '公司配置上传',
                handler: "uploadSystemConfig",
                iconCls: 'fa fa-upload',
                hidden: true,
                 listeners:{
                 render:function (b) {
                 if(Common.permission.Permission.hasPermission("公司配置上传")){
                 b.show();
                 }
                 }
                 }
            },{
                text: '封面上传',
                handler: "uploadCover",
                hidden: true,
                iconCls: 'fa fa-arrow-circle-o-up',
                hidden: true,
                 listeners:{
                 render:function (b) {
                 if(Common.permission.Permission.hasPermission("封面上传")){
                 b.show();
                 }
                 }
                 }
            } ,'->', {
                text: '查询',
                iconCls: 'fa fa-search',
                reference: 'btn_search',
                handler: 'search'
            }
                , {
                    text: '清空条件',
                    iconCls: 'fa fa-search',
                    listeners: {
                        click: 'reset'
                    }
                }]
        }, {
            xtype: 'pagingtoolbar',
            store: 'photo.Photo',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search'
        }
    }]
});