/**
 * Created by Administrator on 2017/5/23.
 */
Ext.define('Admin.view.photoArborescence.PhotoArborescenceFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.photoArborescenceForm',


    /**菜单编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editPhotoArborescence: function () {
        var me = this,
            window = me.getView(),
            form = window.down('form');
        if (!form.isValid()) {
            return false;
        }
        var photoTree = window.photoTree, successMsg, requestUrl, appendNode;
        var formValues = form.getValues(),
            paramForm = form.getValues(),
            selNode = photoTree.selection || photoTree.getRootNode();
        if (window.action === 'create') {
            requestUrl = Common.Config.requestPath('Photo', 'insertPhotoArborescence');
            successMsg = '添加成功';
            Ext.apply(formValues, {
                leaf: true,
                children: []
            });
            appendNode = selNode.appendChild(formValues);
            delete paramForm.id;
        } else if (window.action === 'update') {
            requestUrl = Common.Config.requestPath('Photo', 'updatePhotoArborescence');
            successMsg = '修改成功';
            var record = me.getViewModel().getData().thePhotoArborescence;
            //var record = me.getViewModel().getData().theMenu;
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
            me.closePhotoArborescenceWindow();
            photoTree.getRootNode().reload();
            Common.util.Util.toast(successMsg);
        });
    },

    /**关闭 menuWindow
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closePhotoArborescenceWindow: function () {
        this.getView().close();
    }

});