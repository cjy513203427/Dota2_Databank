/**
 * Created by hasee on 2018/4/19.
 */
Ext.define('Admin.view.matchHistory.MatchHistoryController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.matchHistory',

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
        //console.log(grid.getStore())
        grid.getStore().reload();
    },

    gridBeforeRenderDetail: function () {
        var me = this,
            form = me.lookupReference('form'),
            grid = me.lookupReference('gridDetail');

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
    },

    /**
     * 选择一场比赛 加载 比赛的详细信息
     */
    dblclickSelected: function(dataview, record, item, index, e) {
        var me = this, gridDetail = me.lookupReference('gridDetail');
        if (record.match_id !== 0) {
            gridDetail.getStore().load({
                params: {
                    match_id: record.get('match_id')
                }
            });
        } else {
            gridDetail.getStore().removeAll();
        }
    },

    dblclickWindow: function(chart, item, event, eOpt) {
        var rec = item;
        /**
         * 描述，在window上添加其他的组件，并且对组件进行相关的操作
         */
        Ext.create('Admin.view.players.Players', {
            viewModel: {
                links: {
                    thePlayers: {
                        type: 'players.Players',
                        create: rec.data
                    }
                }
            }
        }).show();
    }

});