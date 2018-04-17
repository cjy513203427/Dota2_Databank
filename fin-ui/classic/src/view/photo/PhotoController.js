/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.photo.PhotoController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.photo',

    requires: ['Admin.view.photo.PhotoBrandForm'],
    search: function () {
        var me = this,
            grid = me.lookupReference('grid'),
            form = me.lookupReference('form');
        if (!form.isValid()) {
            return false;
        }
        grid.getStore().loadPage(1);
    },


    /** grid 渲染之前 初始化操作
     * add beforeload listener to grid store
     * @param {Ext.Component} component
     */
    gridBeforeRender: function () {
        var me = this,
            form = me.lookupReference('form'),
            grid = me.lookupReference('grid');

        grid.getStore().addListener({
            'beforeload': function (store) {
                grid.getScrollTarget().scrollTo(0, 0);      //每次加载之前 scrolly to 0
                Ext.apply(store.getProxy().extraParams, form.getValues(false, true));
                return true;
            },
            'load': function (store) {
                store.getProxy().extraParams = {};
            },
            'beginupdate': function () {
                grid.setHeight(grid.getHeight());   //设置grid height，如果不这样则一页显示数据多了则不显示scrolly  估计是extjs6的bug
                return true;
            }
        });
        grid.getStore().reload();
    },
    /**
     * 审批品牌申请
     */
    deletePhoto: function (grid,rowIndex) {
        Ext.Msg.confirm(
            "请确认"
            , "确定删除吗？"
            , function (button, text) {
                if (button == 'yes') {
                    var rec = grid.getStore().getAt(rowIndex);
                    Common.util.Util.doAjax({
                        url: Common.Config.requestPath('Photo', 'deletePhoto'),
                        method: 'post',
                        params: {
                            id:rec.get('id')
                        }
                    }, function (data) {
                        grid.getStore().reload();
                        Common.util.Util.toast("删除成功");
                    });
                }
            }, this);

    },


    addPhoto: function () {
        Ext.create('Admin.view.photo.PhotoForm', {
            action: 'create',
            height: 620,
            width: 370
        }).show();
    },

    modifyPhoto: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.create('Admin.view.photo.PhotoForm', {
            action: 'update',
            title: '商品修改',
            store: this.lookupReference('grid').getStore(),
            viewModel: {
                links: {
                    thePhoto: {
                        type: 'photo.Photo',
                        create: rec.data
                    }
                }
            }
        }).show();
    },

    modifyBrandId: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.create('Admin.view.photo.PhotoBrandForm', {
            action: 'update',
            title: '商品品牌修改',
            store: this.lookupReference('grid').getStore(),
            viewModel: {
                links: {
                    thePhoto: {
                        type: 'photo.Photo',
                        create: rec.data
                    }
                }
            }
        }).show();
    },

    uploadExcel: function () {
        Ext.create('Admin.view.photo.ExcelUploadForm', {
            action: 'uploadExcel',
            height: 200,
            width: 370
        }).show();
    },

    uploadMultiPicture: function () {
        Ext.create('Admin.view.photo.PictureMultiUploadForm', {
            action: 'uploadMultiPicture',
            height: 570,
            width: 670
        }).show();
    },

    uploadMultiCAD: function () {
        Ext.create('Admin.view.photo.CADMultiUploadForm', {
            action: 'uploadMultiCAD',
            height: 570,
            width: 670
        }).show();
    },
    uploadSystemConfig: function () {
        Ext.create('Admin.view.photo.SystemConfigForm', {
            action: 'uploadSystemConfig',
            height: 200,
            width: 370
        }).show();
    },

    uploadCover: function () {
        Ext.create('Admin.view.photo.CoverUploadForm', {
            action: 'uploadCover',
            height: 200,
            width: 370
        }).show();
    },
    /**
     * 关闭窗口
     */
    closeWindow: function () {
        this.getView().close();
    },
    /** 清除 查询 条件
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    reset: function () {
        this.lookupReference('form').reset();
    }

});