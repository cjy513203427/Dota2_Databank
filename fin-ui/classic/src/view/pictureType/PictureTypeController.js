/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.view.pictureType.PictureTypeController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.pictureType',


    /**
     * 界面 渲染的时候加载 菜单 tree
     */
    pictureBeforeRender: function () {
        var store = this.lookupReference('pictureTree').getStore();
        store.getRoot().set('expanded', true);
        store.load();
    },



    /**
     * 菜单 添加按钮
     */
    createPicture: function () {
        var me = this,
            pictureTree = me.lookupReference('pictureTree'),
            selNode = pictureTree.selection || pictureTree.getRootNode();
        Ext.create('Admin.view.pictureType.PictureTypeForm', {
            action: 'create',
            pictureTree: pictureTree,
            delPicture: me.lookupReference('delPicture'),
            viewModel: {
                links: {
                    thePicture: {
                        type: 'pictureType.PictureType',
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
    updatePicture: function () {
        var me = this,
            pictureTree = me.lookupReference('pictureTree'),
            selNode = pictureTree.selection;
        if (!selNode) {
            Ext.Msg.alert('温馨提示', '请选择要修改的菜单');
            return false;
        }
        var parentNode = selNode != null ? selNode.parentNode : pictureTree.getRootNode();
        Ext.create('Admin.view.pictureType.PictureTypeForm', {
            title: '报价修改',
            action: 'update',
            pictureTree: pictureTree,
            viewModel: {
                links: {
                    thePicture: {
                        type: 'pictureType.PictureType',
                        create: {
                            parentId: parentNode.get('id'),
                            parentName: parentNode.get('text'),
                            id: selNode.get('id'),
                            text: selNode.get('text'),
                            isDelete: selNode.get('isDelete')
                        }
                    }
                }
            }
        }).show();
    }

    /**
     *  菜单 删除按钮
     */
   /* deletePicture: function () {
        var offerTree = this.lookupReference('offerTree'),
            selNode = offerTree.selection;
        if (selNode && selNode.get('children').length === 0) {
            Ext.Msg.confirm('温馨提示', '确定删除吗？', function (button) {
                if (button === 'yes') {
                    Common.util.Util.doAjax({
                        url: Common.Config.requestPath('Offer', 'deleteOffer'),
                        //method:'delete',
                        params: {
                            offerId: selNode.get('id')
                        }
                    }, function () {
                        selNode.remove();
                        Common.util.Util.toast('删除成功');
                    });
                }
            });
        }
    }*/

});
