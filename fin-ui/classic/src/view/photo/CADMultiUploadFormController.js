/**
 * Created by jonnyLee on 2016/9/5.
 */
Ext.define('Admin.view.photo.CADMultiUploadFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.cadmultiuploadform',


    /**关闭 Window
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    closeWindow: function () {
        this.getView().close();
    }

});