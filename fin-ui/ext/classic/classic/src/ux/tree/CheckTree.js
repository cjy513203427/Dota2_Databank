/**
 * Created by Administrator on 2016/9/7.
 */
Ext.define('Ext.ux.tree.CheckTree', {
    extend: 'Ext.tree.Panel',

    xtype:'checktree',

    alias: 'widget.checktree',

    userCls: 'check-tree',

    config: {
        scrollable: true,
        animate: true
    },
    listeners: {
        /**
         * 父节点选中，子节点选中  父节点去处选中，子节点跟上
         * @param node
         * @param checked
         * @param e
         * @param eOpts
         */
        checkchange: function (node, checked, e, eOpts) {
            node.cascadeBy(function(n){
                n.set('checked', checked);
            });
            if(checked){
                if(!node.parentNode.isRoot()){
                    node.parentNode.set('checked', checked);
                    if(!node.parentNode.parentNode.isRoot()){
                        node.parentNode.parentNode.set('checked', checked);
                    }
                }
            }
        }

    }


});