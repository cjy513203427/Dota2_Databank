/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.view.photoArborescence.PhotoArborescence', {
    extend: 'Ext.container.Container',

    xtype: 'photoArborescence',

    requires: [
        'Ext.tree.Panel',
        'Admin.view.photoArborescence.PhotoArborescenceController'
    ],

    controller: 'photoArborescence',

    layout: 'fit',

    listeners: {
        beforerender: 'photoArborescenceBeforeRender'
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
        title: '商品树管理',
        xtype: 'treepanel',
        reference: 'photoTree',
        useArrows: true,
        autoScroll:true,
        height:1150,
        store: 'photoArborescence.PhotoArborescence',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '添加',
                handler: "createPhotoArborescence",
                iconCls: 'fa fa-plus',
                hidden: true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("商品树添加")){
                            b.show();
                        }
                    }
                }
            }, {
                text: '修改',
                handler: "updatePhotoArborescence",
                iconCls: 'fa fa-pencil-square-o',
                hidden: true,
                listeners:{
                    render:function (b) {
                        if(Common.permission.Permission.hasPermission("商品树修改")){
                            b.show();
                        }
                    }
                }
            },{
                text: '删除',
                handler: "deletePhotoArborescence",
                iconCls: 'fa fa-times'
            },{
                text: '刷新',
                handler: "photoArborescenceBeforeRender",
                iconCls: 'fa fa-refresh'
            }]
        }]
    }]
});