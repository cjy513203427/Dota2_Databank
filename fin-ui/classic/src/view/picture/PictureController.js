/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.picture.PictureController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.picture',
    requires: [
        'Admin.view.picture.PictureForm'
    ],
    search: function () {
        var me = this,
            dataview = me.lookupReference('dataview');
        /* form = me.lookupReference('form');
         if (!form.isValid()) {
         return false;
         }*/
        dataview.getStore().reload({
            params: {
                keyword: Ext.getCmp('keyword').getValue()
            }
        });
    },
    keywordSearch: function (t,e) {
        var me = this,
            dataview = me.lookupReference('dataview');
        if (e.getKey() === Ext.event.Event.ENTER) {
            dataview.getStore().reload({
                params: {
                    keyword: t.getValue()
                }
            });
        }
    },

    /** dataview 渲染之前 初始化操作
     * add beforeload listener to grid store
     * @param {Ext.Component} component
     */
    viewBeforeRender: function () {
        var me = this,
            /*form = me.lookupReference('form'),*/
            dataview = me.lookupReference('dataview');
        dataview.getStore().addListener({
            'beforeload': function (store) {
                /* Ext.apply(store.getProxy().extraParams, form.getValues(false, true));*/
                return true;
            },
            'load': function (store) {
                me.start = 20;
                me.pageIndex = 2;
                store.getProxy().extraParams = {};
            }
        });
    },
    resetComposing: function () {
        var me = this;
        var container = document.getElementById("container");
        var boxes = container.children;
        var pageWidth = window.innerWidth;
        if (!boxes[0]) {
            return;
        }
        var boxWidth = boxes[0].offsetWidth;
        var column = Math.floor(pageWidth / boxWidth);
        var arrHeight = [];
        for (var i = 0; i < boxes.length; i++) {
            if (i < column) {
                arrHeight[i] = boxes[i].offsetHeight;
            } else {
                var minHeight = me.getMin(arrHeight).value;
                var minHeightIndex = me.getMin(arrHeight).index;
                boxes[i].style.position = "absolute";
                boxes[i].style.top = minHeight + "px";
                boxes[i].style.left = boxes[minHeightIndex].offsetLeft + "px";
                arrHeight[minHeightIndex] = minHeight + boxes[i].offsetHeight;
            }
        }
    },
    getMin: function (arr) {
        var min = {};
        min.index = 0;
        min.value = arr[min.index];
        for (var i = 0; i < arr.length; i++) {
            if (min.value > arr[i]) {
                min.value = arr[i];
                min.index = i;
            }
        }
        return min;
    },
    bottomed: function (y) {
        var container = document.getElementById("container");
        var boxes = container.children;
        var clientHeight = window.innerHeight;
        var scrollTop = y;
        var lastBox = boxes[boxes.length - 1];
        var lastBoxTop = lastBox.offsetTop;
        if (clientHeight + scrollTop > lastBoxTop) {
            return true;
        }
        return false;
    },
    panelRender: function (t) {
        var me = t;
        var method = this;
        var dataview = me.lookupReference('dataview');
        me.getScrollable().setListeners(
            {
                scrollend: function (t, x, y) {
                    if (method.bottomed(y)) {
                        var myMask = new Ext.LoadMask({
                            msg    : '正在加载图片...',
                            target : me
                        });
                        myMask.show();
                        Common.util.Util.doAjax({
                            url: Common.Config.requestPath('Picture', 'list'),
                            method: 'get',
                            params: {
                                pageIndex: me.pageIndex,
                                start: me.start,
                                keyword: Ext.getCmp('keyword').getValue(),
                                pageSize: 20
                            }
                        }, function (data) {
                            if (data.code === '0') {
                                dataview.getStore().loadData(data.data, true);
                                myMask.destroy();
                                method.resetComposing();
                                me.setScrollY(y+300);
                            }
                        });
                        me.pageIndex = me.pageIndex + 1;
                        me.start = me.start + 10;
                    }

                }
            }
        );
    },
    showAllPicture: function (t, record) {
        Ext.create('Admin.view.picture.PictureForm', {
            viewModel: {
                data: {
                    orderNumber: record.get('orderNumber')
                }
            }
        }).show();
    }
});