/**
 * Created by jonnyLee on 2016/9/28.
 */
Ext.define('Admin.view.resources.PermFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.permForm',



    /**权限编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editPerm: function () {
        var me = this,
            window = me.getView(),
            form = window.down('form');
        if (!form.isValid()) {
            return false;
        }
        var formValues = form.getValues();
        var store = window.store, successMsg, requestUrl;
        if (window.action === 'create') {
            requestUrl = Common.Config.requestPath('System', 'Resources', 'insert');
            successMsg = '添加成功';
            delete formValues.id;
        } else if(window.action === 'update') {
            requestUrl = Common.Config.requestPath('System', 'Resources', 'update');
            successMsg = '修改成功';
            var record = me.getViewModel().getData().thePerm;
            if (!record.dirty) {
                Common.util.Util.toast('没有修改操作');
                return;
            }
            var tmpSubmitValues={};
            for(var i in record.modified) {
                tmpSubmitValues[i] = formValues[i];
            }
            formValues = Ext.apply(tmpSubmitValues, {
                id: record.get('id')
            });
        } else {
            Ext.Msg.alert('温馨提示', '表单操作错误，请联系管理员');
            return;
        }

        Common.util.Util.doAjax({
            url: requestUrl,
            params: formValues
        }, function () {
            store.load({
                params: {
                    resourceId: me.lookupReference('resourceId').getValue()
                }
            });
            me.closePermWindow();
            Common.util.Util.toast(successMsg);
        });
    },

    /**关闭 permWindow
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closePermWindow: function () {
         this.getView().close();
    }

});