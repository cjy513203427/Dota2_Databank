/**
 * Created by Administrator on 2017/5/23.
 */
Ext.define('Admin.view.pictureType.PictureTypeFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.pictureTypeForm',


    /**菜单编辑  添加/修改
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editPicture: function () {
        var me = this,
            window = me.getView(),
            form = window.down('form');
        if (!form.isValid()) {
            return false;
        }
        var pictureTree = window.pictureTree, successMsg, requestUrl, appendNode;
        var formValues = form.getValues(),
            paramForm = form.getValues(),
            selNode = pictureTree.selection || pictureTree.getRootNode();
        if (window.action === 'create') {
            requestUrl = Common.Config.requestPath('PictureType', 'insertPicture');
            successMsg = '添加成功';
            Ext.apply(formValues, {
                leaf: true,
                children: []
            });
            appendNode = selNode.appendChild(formValues);
            delete paramForm.id;
        } else if (window.action === 'update') {
            requestUrl = Common.Config.requestPath('PictureType', 'updatePicture');
            successMsg = '修改成功';
            var record = me.getViewModel().getData().thePicture;
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
            if (window.action === 'create') {
                console.log("create");
                appendNode.set('id', res.data.id);
                window.delPicture.setDisabled(true);
            }
            console.log("function res end");
            me.closePictureWindow();
            Common.util.Util.toast(successMsg);
        });
    },

    /**关闭 menuWindow
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closePictureWindow: function () {
        this.getView().close();
    }

});