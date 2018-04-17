/**
 * Created by lb on 2016/9/5.
 */
Ext.define('Admin.view.roles.RoleFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.roleform',

    /** 角色编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    edit: function (component, e) {
        var me = this,
            window = me.getView(),
            form = me.lookupReference('form'),
            tree = me.lookupReference('tree');
        if (!form.isValid()) {
            return false;
        }
        var formValues = form.getValues(), permissionAry= [];
        var checkedAry = tree.getChecked(), url, message;
        for(var i=0; i<checkedAry.length; i++) {
            permissionAry.push(checkedAry[i].get('id'));
        }
        if (window.action === 'create') {
            message = '添加成功';
            url = Common.Config.requestPath('System', 'Roles', 'create');
            Ext.apply(formValues, {
                permissions: permissionAry.join(',')
            });
        } else if (window.action === 'update') {
            message = '修改成功';
            url = Common.Config.requestPath('System', 'Roles', 'update');
            var roleModel = me.getViewModel().getData().theRole,
                tmpSubmitValues={};
            for(var i in roleModel.modified) {
                tmpSubmitValues[i] = formValues[i];
            }
            formValues = Ext.apply(tmpSubmitValues, {
                id: roleModel.get('id'),
                permissions: permissionAry.join(',')
            });
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
            Common.util.Util.toast(message);
            me.closeWindow();
        });

    },


    /**关闭 roleForm window
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closeWindow: function () {
        this.getView().close();
    }


});
