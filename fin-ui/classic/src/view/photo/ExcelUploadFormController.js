/**
 * Created by jonnyLee on 2016/9/5.
 */
Ext.define('Admin.view.photo.ExcelUploadFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.exceluploadform',



    /**Excel上传
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    editExcel: function () {
        var me = this,
            window = me.getView(),
            form = window.down('form');
        var store = window.store, successMsg,submitUrl;
        if (!form.isValid()) {
            return false;
        }

        if (window.action === 'uploadExcel') {
            successMsg = '上传成功';
            submitUrl=Common.Config.requestPath('Excel', 'uploadLocalExcel');
        } else {
            Ext.Msg.alert('温馨提示', '表单操作错误，请联系管理员');
            return;
        }

        form.submit({
            url: submitUrl,
            waitMsg: '正在上传Excel并导入，请稍等...',
            success: function(fp, o) {
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