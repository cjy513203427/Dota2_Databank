/**
 * Created by lb on 2016/9/5.
 */
Ext.define('Admin.view.roles.RoleController', {

    extend: 'Admin.view.BaseViewController',

    alias: 'controller.role',

    requires: [
        'Admin.view.roles.RoleForm'
    ],



    /** 添加角色
     * @param {Ext.button.Button} btn
     * @param {Event} e
     */
    createRole:function () {
        Ext.create('Admin.view.roles.RoleForm', {
            action: 'create',
            store: this.getView().getStore(),
            listeners:{
                beforerender: function() {
                    var store = this.lookupReference('tree').getStore();
                    store.getRoot().set('expanded', true);
                    store.load();
                }
            }
        }).show();
    },

    /** grid 渲染之前 初始化操作
     * add beforeload listener to grid store
     * @param {Ext.Component} component
     */
    gridBeforeRender: function () {
        var me = this, grid = me.getView();
        grid.getStore().addListener({
            'beforeload': function (store) {
                grid.getScrollTarget().scrollTo(0, 0);      //每次加载之前 scrolly to 0
                return true;
            },
            'beginupdate': function () {
                grid.setHeight(grid.getHeight());   //设置grid height，如果不这样则一页显示数据多了则不显示scrolly  估计是extjs6的bug
                return true;
            }
        });
    },

    search: function () {
        var me = this, grid = me.getView();
        grid.getStore().loadPage(1, {
            callback: function () {
            }
        });
    },
    del: function (grid, rowIndex, colIndex) {
        Ext.Msg.confirm(
            "请确认"
            , "确定删除吗？"
            , function (button, text) {
                if (button == 'yes') {
                    var rec = grid.getStore().getAt(rowIndex),
                        roldId = rec.get('id');
                    this.confirmDel('disable', {roleIds: roldId});
                }
            }, this);// 指定作用域，否则无法调用confirmDelUser方法
    },
    batchDel: function (btn, event) {
        var me = this,
            grid = me.getView(),
            selMod = grid.getSelectionModel(),
            records = selMod.getSelection(),
            roldIds = [];
        if (records == undefined || records.length <= 0) {
            Ext.Msg.alert('提醒', '请勾选相关记录！');
            return;
        }
        Ext.Msg.confirm(
            '请确认'
            , '确定删除吗？'
            , function (button, text) {
                if (button == 'yes') {
                    for (var i = 0; i < records.length; i++) {
                        roldIds.push(records[i].get('id'));
                    }
                    this.confirmDel('disable', {roleIds: roldIds});
                }
            }, this);// 指定作用域，否则无法调用confirmDelUser方法
    },

    confirmDel: function (action, params) {
        var me = this;
        Common.util.Util.doAjax({
            url: Common.Config.requestPath('System', 'Roles', action),
            method: 'post',
            params: params
        }, function (data) {
            me.search();
        });
    },

    /** 修改 角色
     */
    updateRole: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.create("Admin.view.roles.RoleForm", {
            action: 'update',
            store: this.getView().getStore(),
            viewModel: {
                links: {
                    theRole: {
                        type: 'roles.Role',
                        create: rec.data
                    }
                }
            },
            listeners:{
                beforerender: function() {
                    var store = this.lookupReference('tree').getStore();
                    store.getRoot().set('expanded', true);
                    store.load({
                        params:{
                            roleId: rec.get('id')
                        }
                    });
                }
            }
        }).show();
    }


});
