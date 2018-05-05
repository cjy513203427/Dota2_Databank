/**
 * Created by hasee on 2018/1/6.
 */
Ext.define('Admin.view.players.PlayersController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.players',

    requires: ['Admin.view.brand.BrandForm'],

    /**
     * grid的store加载
     */
    loadStore:function () {
        var me = this, grid = me.lookupReference('grid');
        grid.getStore().load({params:{match_id:this.getView().match_id}});
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
        //this.lookupReference('form').reset();
    }

});