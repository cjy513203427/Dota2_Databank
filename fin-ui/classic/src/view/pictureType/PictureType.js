/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.view.pictureType.PictureType', {
    extend: 'Ext.container.Container',

    xtype: 'pictureType',

    requires: [
        'Ext.tree.Panel',
        'Admin.view.pictureType.PictureTypeController'
    ],

    controller: 'pictureType',

    layout: 'fit',

    listeners: {
        beforerender: 'pictureBeforeRender'
    },

    defaults: {
        height: '100%'
    },
    autoHeight : true,// 自动高度，默认false
    animate : true,// 展开动画
    enableDrag : true,// 是否可以拖动(效果上)
    enableDD : true,// 不进可以拖动，还可以改变节点层次结构
    enableDrop : false,// 仅仅drop
    rootVisible : true,// 是否显示根节点，默认true
    height : 150,

    items: [{
        title: '自主报价管理',
        xtype: 'treepanel',
        reference: 'pictureTree',
        useArrows: true,
        autoScroll:true,
        height:1150,
        store: 'pictureType.PictureType',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '添加',
                handler: "createPicture",
                iconCls: 'fa fa-plus'
            }, {
                text: '修改',
                handler: "updatePicture",
                iconCls: 'fa fa-pencil-square-o'
            }, {
                text: '删除',
                reference: 'delPicture',
                 disabled: true,
                handler: "deletePicture",
                iconCls: 'fa fa-times'
            }]
        }]
    }]
});