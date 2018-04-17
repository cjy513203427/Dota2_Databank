/**
 * Created by jonnyLee on 2016/9/5.
 */
Ext.define('Admin.view.users.UserFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.userform',



    /**用户编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editUser: function () {
        var me = this,
            window = me.getView(),
            form = window.down('form');
        var store = window.store, successMsg,submitUrl;
        console.log(form);
        if (!form.isValid()) {
            return false;
        }
        if (window.action === 'create') {
            successMsg = '添加成功';
            submitUrl=Common.Config.requestPath('System', 'Users', 'create');
        } else if(window.action === 'update') {
            successMsg = '修改成功';
            submitUrl=Common.Config.requestPath('System', 'Users', 'update');
        } else {
            Ext.Msg.alert('温馨提示', '表单操作错误，请联系管理员');
            return;
        }
        form.submit({
            url: submitUrl,
            waitMsg: '请稍等...',
            success: function(fp, o) {
                store.loadPage(1);
                Common.util.Util.toast(successMsg);
                me.getView().close();
            },
            failure: function(form, action) {
                store.loadPage(1);
                Common.util.Util.toast(successMsg);
                me.getView().close();
            }
        });
    },

    /**关闭 userWindow
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closeUserWindow: function () {
         this.getView().close();
    }

});