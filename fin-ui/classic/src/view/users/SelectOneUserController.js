/**
 * Created by jonnyLee on 2016/9/5.
 */
Ext.define('Admin.view.users.SelectOneUserController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.selectOneUser',

    search: function () {
        var me = this,
            grid = me.lookupReference('grid');
        grid.getStore().loadPage(1);
    },

    /**选择客户
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    selectedUser: function () {
        var me = this,
            grid = me.lookupReference('grid'),
            selMod  = grid.getSelectionModel(),
            records = selMod.getSelection();
        if (records==undefined || records.length<=0){
            Ext.Msg.alert('提醒','请勾选相关记录！');
            return;
        }
        this.getView().callback(records[0].get('userId'),records[0].get('workno'));
        this.getView().close();
    },
    /** grid 渲染之前 初始化操作
     * add beforeload listener to grid store
     * @param {Ext.Component} component
     */
    gridBeforeRender: function () {
        var me = this,
            grid = me.lookupReference('grid');
        grid.getStore().addListener({
            'beforeload': function (store) {
                var viewModel=Ext.getCmp('selectOneUserWindow').getViewModel();
                var values={
                    departmentId:viewModel.getData().departmentId
                };
                if(Ext.getCmp('userSelect_workno').getValue().length>0){
                    values.workno=Ext.getCmp('userSelect_workno').getValue();
                }
                if(Ext.getCmp('userSelect_realname').getValue().length>0){
                    values.realname=Ext.getCmp('userSelect_realname').getValue();
                }
                Ext.apply(store.getProxy().extraParams,values);
                return true;
            },
            'load': function (store) {
                store.getProxy().extraParams = {};
            }
        });
    }

});