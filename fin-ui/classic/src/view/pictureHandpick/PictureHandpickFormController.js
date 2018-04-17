/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.view.pictureHandpick.PictureHandpickFormController', {
    extend: 'Admin.view.BaseViewController',

    alias: 'controller.pictureFormHandpick',


    search: function () {
        var me = this,
            dataview = me.lookupReference('dataview');
        dataview.getStore().reload({
            params: {
                orderNumber: me.getViewModel().data.orderNumber
            }
        });
    },
    deletePictureHandpick:function () {
        var me = this,
            dataview = me.lookupReference('dataview');
        Common.util.Util.doAjax({
            url: Common.Config.requestPath('PictureHandpick', 'deletePictureHandpick'),
            method: 'post',
            params: {
                orderNumber: me.getViewModel().data.orderNumber
            }
        }, function (data) {
            if (data.code === '0') {
                dataview.getStore().loadData(data.data, true);
                Common.util.Util.toast('从精选库中删除成功');
                me.closePictureWindow();
            }
        });

    },

    /** dataview 渲染之前 初始化操作
     * add beforeload listener to grid store
     * @param {Ext.Component} component
     */
    viewBeforeRender: function () {
        var me = this,
            dataview = me.lookupReference('dataview');
        dataview.getStore().addListener({
            'beforeload': function (store) {
                /* Ext.apply(store.getProxy().extraParams, form.getValues(false, true));*/
                return true;
            },
            'load': function (store) {
                store.getProxy().extraParams = {};
            }
        });
    },
    showPicture: function (t, record) {
        window.open("http://img.bingzhiyi.com/" + record.get('path') + '/' + record.get('imageName') + record.get('extensionName'));
    },

    closePictureWindow: function () {
        this.getView().close();
    }

});