/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.brand.BrandController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.brand',

    requires: ['Admin.view.brand.BrandForm'],
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
     *
     * @param grid
     * @param rowIndex
     */
    deleteBrand: function (grid,rowIndex) {
        Ext.Msg.confirm(
            "请确认"
            , "要删除该品牌吗？"
            , function (button, text) {
                if (button == 'yes') {
                    var rec = grid.getStore().getAt(rowIndex);
                    Common.util.Util.doAjax({
                        url: Common.Config.requestPath('Brand', 'deleteBrand'),
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
    /**
     *添加品牌
     */
    addBrand: function () {
        Ext.create('Admin.view.brand.BrandForm', {
            action: 'create',
            store: this.lookupReference('grid').getStore()
        }).show();
    },

    /**
     * 修改品牌
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    modifyBrand: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.create('Admin.view.brand.BrandForm', {
            action: 'update',
            title: '品牌修改',
            store: this.lookupReference('grid').getStore(),
            viewModel: {
                links: {
                    theBrand: {
                        type: 'brand.Brand',
                        create: rec.data
                    }
                }
            }
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