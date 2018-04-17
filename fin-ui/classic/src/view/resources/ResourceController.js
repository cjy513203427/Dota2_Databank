/**
 * Created by jonnyLee on 2016/9/29.
 */
Ext.define('Admin.view.resources.ResourceController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.resource',


    /**
     * 权限界面 渲染的时候加载 菜单 tree
     */
    resourceBeforeRender: function () {
        var store = this.lookupReference('menuTree').getStore();
        store.getRoot().set('expanded', true);
        store.load();
    },

    /**
     * 选择一个菜单 加载 菜单对应的权限
     */
    onMenuTreeSelected: function (rowModel, record) {
        var me = this, permGrid = me.lookupReference('permGrid');
        if (!record.child() && record.id !== 0) {
            permGrid.getStore().load({
                params: {
                    resourceId: record.get('id')
                }
            });
            me.lookupReference('delMenuBtn').setDisabled(false);    //删除按钮的禁用状态
        } else {
            permGrid.getStore().removeAll();
            me.lookupReference('delMenuBtn').setDisabled(true);
        }
    },

    /**
     * 菜单 添加按钮
     */
    createMenu: function () {
        var me = this,
            menuTree = me.lookupReference('menuTree'),
            selNode = menuTree.selection || menuTree.getRootNode();
        Ext.create('Admin.view.resources.MenuForm', {
            action: 'create',
            menuTree: menuTree,
            delMenuBtn: me.lookupReference('delMenuBtn'),
            viewModel: {
                links: {
                    theMenu: {
                        type: 'resources.Menu',
                        create: {
                            parentId: selNode.get('id'),
                            parentName: selNode.get('text'),
                            status: 1
                        }
                    }
                }
            }
        }).show();
    },

    /**
     * 菜单 修改按钮
     */
    updateMenu: function () {
        var me = this,
            menuTree = me.lookupReference('menuTree'),
            selNode = menuTree.selection;
        if (!selNode) {
            Ext.Msg.alert('温馨提示', '请选择要修改的菜单');
            return false;
        }
        var parentNode = selNode != null ? selNode.parentNode : menuTree.getRootNode();
        Ext.create('Admin.view.resources.MenuForm', {
            title: '菜单修改',
            action: 'update',
            menuTree: menuTree,
            viewModel: {
                links: {
                    theMenu: {
                        type: 'resources.Menu',
                        create: {
                            parentId: parentNode.get('id'),
                            parentName: parentNode.get('text'),
                            id: selNode.get('id'),
                            text: selNode.get('text'),
                            iconCls: selNode.get('iconCls'),
                            url: selNode.get('url'),
                            status: selNode.get('status')
                        }
                    }
                }
            }
        }).show();
    },

    /**
     *  菜单 删除按钮
     */
    deleteMenu: function () {
        var menuTree = this.lookupReference('menuTree'),
            selNode = menuTree.selection;
        if (selNode && selNode.get('children').length === 0) {
            Ext.Msg.confirm('温馨提示', '确定删除吗？', function (button) {
                if (button === 'yes') {
                    Common.util.Util.doAjax({
                        url: Common.Config.requestPath('System', 'Resources', 'delete'),
                        params: {
                            resourceId: selNode.get('id')
                        }
                    }, function () {
                        selNode.remove();
                        Common.util.Util.toast('删除成功');
                    });
                }
            });
        }
    },

    /**
     * 权限 添加按钮
     */
    createPermission: function () {
        var me = this,
            menuTree = me.lookupReference('menuTree'),
            selNode = menuTree.selection;
        if (!selNode) {
            Ext.Msg.alert('温馨提示', '请选择所属菜单');
            return false;
        }
        Ext.create('Admin.view.resources.PermForm', {
            action: 'create',
            store: me.lookupReference('permGrid').getStore(),
            viewModel: {
                links: {
                    thePerm: {
                        type: 'resources.Permission',
                        create: {
                            parentId: selNode.get('id'),
                            parentName: selNode.get('text'),
                            status: 1
                        }
                    }
                }
            }
        }).show();
    },
    /**
     * 权限  修改按钮
     * @returns {boolean}
     */
    updatePermission: function () {
        var me = this,
            permGrid = me.lookupReference('permGrid'),
            selMod = permGrid.getSelection()[0];
        if (!selMod) {
            Ext.Msg.alert('温馨提示', '请选择要修改的权限');
            return false;
        }
        var menuTree = me.lookupReference('menuTree'),
            selNode = menuTree.selection;
        Ext.create('Admin.view.resources.PermForm', {
            title: '权限修改',
            action: 'update',
            store: permGrid.getStore(),
            viewModel: {
                links: {
                    thePerm: {
                        type: 'resources.Permission',
                        create: {
                            parentId: selNode.get('id'),
                            parentName: selNode.get('text'),
                            id: selMod.get('id'),
                            text: selMod.get('text'),
                            permission: selMod.get('permission'),
                            status: selMod.get('status')
                        }
                    }
                }
            }
        }).show();
    },

    /**
     *  权限 删除按钮
     */
    deletePermission: function () {
        var permGrid = this.lookupReference('permGrid'),
            selMod = permGrid.getSelection()[0];
        if (selMod) {
            Ext.Msg.confirm('请确认', '确定删除吗？', function (button) {
                if (button === 'yes') {
                    Common.util.Util.doAjax({
                        url: Common.Config.requestPath('System', 'Resources', 'delete'),
                        params: {
                            resourceId: selMod.get('id')
                        }
                    }, function () {
                        permGrid.getStore().remove(selMod);
                        Common.util.Util.toast('删除成功');
                    });
                }
            });
        }
    }


});
