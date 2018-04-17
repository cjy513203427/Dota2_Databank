/**
 * Created by jonnyLee on 2016/9/5.
 */
Ext.define('Admin.view.photo.PhotoFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.photoform',



    /**商品编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editPhoto: function () {
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
            url=Common.Config.requestPath('Photo', 'addPhoto');
        } else if(window.action === 'update') {
            successMsg = '修改成功';
            url=Common.Config.requestPath('Photo', 'modifyPhoto');
        } else {
            Ext.Msg.alert('温馨提示', '表单操作错误，请联系管理员');
            return;
        }

        form.submit({
            url: url,
            waitMsg: '正在提交，请稍等...',
            success: function(fp, o) {
                store.loadPage(1);
                Common.util.Util.toast(successMsg);
                me.getView().close();
            },
            failure: function(form, action) {
                Common.util.Util.toast(successMsg);
                me.getView().close();
            }
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