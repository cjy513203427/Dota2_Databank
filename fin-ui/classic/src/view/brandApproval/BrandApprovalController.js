/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.brandApproval.BrandApprovalController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.brandApproval',

    requires: [],
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
    approveBrandApplication: function (grid,rowIndex) {
        Ext.Msg.confirm(
            "请确认"
            , "确定审批吗？"
            , function (button, text) {
                if (button == 'yes') {
                    var rec = grid.getStore().getAt(rowIndex);
                    Common.util.Util.doAjax({
                        url: Common.Config.requestPath('Brand', 'approveBrandApplication'),
                        method: 'post',
                        params: {
                            userId:rec.get('userId')
                        }
                    }, function (data) {
                        grid.getStore().reload();
                        Common.util.Util.toast("审批通过");
                        console.log(rec.get('userId'));
                    });
                }
            }, this);

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