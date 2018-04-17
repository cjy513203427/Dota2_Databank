/**
 * Created by jonnyLee on 2016/9/27.
 */
Ext.define('Admin.view.resources.MenuFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.menuForm',


    /**菜单编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editMenu: function () {
        var me = this,
            window = me.getView(),
            form = window.down('form');
        if (!form.isValid()) {
            return false;
        }
        var menuTree = window.menuTree, successMsg, requestUrl, appendNode;
        var formValues = form.getValues(),
            paramForm = form.getValues(),
            selNode = menuTree.selection || menuTree.getRootNode();
        if (window.action === 'create') {
            requestUrl = Common.Config.requestPath('System', 'Resources', 'insert');
            successMsg = '添加成功';
            Ext.apply(formValues, {
                leaf: true,
                children: []
            });
            appendNode = selNode.appendChild(formValues);
            delete paramForm.id;
        } else if (window.action === 'update') {
            requestUrl = Common.Config.requestPath('System', 'Resources', 'update');
            successMsg = '修改成功';
            var record = me.getViewModel().getData().theMenu;
            if (!record.dirty) {
                Common.util.Util.toast('没有修改操作');
                return;
            }
            selNode.set(formValues);
            var tmpSubmitValues={};
            for(var i in record.modified) {
                tmpSubmitValues[i] = formValues[i];
            }
            paramForm = Ext.apply(tmpSubmitValues, {
                id: record.get('id')
            });
        } else {
            Ext.Msg.alert('温馨提示', '表单操作错误，请联系管理员');
            return;
        }

        Common.util.Util.doAjax({
            url: requestUrl,
            params: paramForm
        }, function (res) {
            if (window.action === 'create') {
                appendNode.set('id', res.data.id);
                window.delMenuBtn.setDisabled(true);
            }
            me.closeMenuWindow();
            Common.util.Util.toast(successMsg);
        });
    },

    /**关闭 menuWindow
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closeMenuWindow: function () {
        this.getView().close();
    }

});