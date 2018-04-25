/**
 * Created by hasee on 2018/4/24.
 */
Ext.define('Admin.view.hero.HeroFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.heroForm',



    /**用户编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editHero: function () {
        var me = this,
            window = me.getView(),
            form = me.lookupReference('form'),
            tree = me.lookupReference('tree');
        if (!form.isValid()) {
            return false;
        }
        var formValues = form.getValues();
        if (window.action === 'create') {
            successMsg = '添加成功';
            url=Common.Config.requestPath('Brand', 'addBrand');
        } else if(window.action === 'update') {
            successMsg = '修改成功';
            url=Common.Config.requestPath('Hero', 'modifyHero');
        } else {
            Ext.Msg.alert('温馨提示', '表单操作错误，请联系管理员');
            return;
        }

        Common.util.Util.doAjax({
            url: url,
            params: formValues,
            callback: function() {
                window.store.loadPage(1);
            }
        }, function () {
            Common.util.Util.toast(successMsg);
            me.closeWindow();
        });
    },

    /**关闭 userWindow
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closeWindow: function () {
        this.getView().close();
    }

});