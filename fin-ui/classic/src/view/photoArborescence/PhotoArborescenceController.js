/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.view.photoArborescence.PhotoArborescenceController', {
    extend: 'Admin.view.BaseViewController',
    alias: 'controller.photoArborescence',


    /**
     * 界面 渲染的时候加载 菜单 tree
     */
    photoArborescenceBeforeRender: function () {
        var store = this.lookupReference('photoTree').getStore();
        store.getRoot().set('expanded', true);
        store.load();
    },


    /**
     * 商品树 添加按钮
     */
    createPhotoArborescence: function () {
        var me = this,
            photoTree = me.lookupReference('photoTree'),
            selNode = photoTree.selection || photoTree.getRootNode();
        Ext.create('Admin.view.photoArborescence.PhotoArborescenceForm', {
            action: 'create',
            photoTree: photoTree,
            viewModel: {
                links: {
                    thePhotoArborescence: {
                        type: 'photoArborescence.PhotoArborescence',
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
     * 商品树 修改按钮
     */
    updatePhotoArborescence: function () {
        var me = this,
            photoTree = me.lookupReference('photoTree'),
            selNode = photoTree.selection;
        if (!selNode) {
            Ext.Msg.alert('温馨提示', '请选择要修改的节点');
            return false;
        }
        var parentNode = selNode != null ? selNode.parentNode : photoTree.getRootNode();
        Ext.create('Admin.view.photoArborescence.PhotoArborescenceForm', {
            title: '商品树修改',
            action: 'update',
            photoTree: photoTree,
            viewModel: {
                links: {
                    thePhotoArborescence: {
                        type: 'photoArborescence.PhotoArborescence',
                        create: {
                            parentId: parentNode.get('id'),
                            parentName: parentNode.get('text'),
                            id: selNode.get('id'),
                            text: selNode.get('text')
                        }
                    }
                }
            }
        }).show();
    },

    /**
     *  菜单 删除按钮
     */
     deletePhotoArborescence: function () {
         var photoTree = this.lookupReference('photoTree'),
         selNode = photoTree.selection;
         if (selNode && selNode.get('children').length === 0) {
         Ext.Msg.confirm('温馨提示', '确定删除吗？', function (button) {
         if (button === 'yes') {
         Common.util.Util.doAjax({
         url: Common.Config.requestPath('Photo', 'deletePhoto'),
         //method:'delete',
         params: {
         id: selNode.get('id')
         }
         }, function () {
         selNode.remove();
         Common.util.Util.toast('删除成功');
         });
         }
         });
         }
     }
});
