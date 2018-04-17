/**
 * Created by Administrator on 2016/9/8.
 */
Ext.define('Overrides.data.TreeStore', {

    override: 'Ext.data.TreeStore',

    /**
     * @private
     *
     * Called from a node's insertBefore method.
     */
    onNodeInsert: function(parent, node, index) {
        var me = this,
            data = node.raw || node.data,
            // Must use class-specific removedNodes property.
            // Regular Stores add to the "removed" property on CollectionRemove.
            // TreeStores are having records removed all the time; node collapse removes.
            // TreeStores add to the "removedNodes" property onNodeRemove
            removed = me.removedNodes,
            refNode,
            sibling,
            storeReader,
            nodeProxy,
            nodeReader,
            reader,
            dataRoot;

        if (parent && me.needsLocalFilter()) {
            me.doFilter(parent);
        }

        me.beginUpdate();

        // Only react to a node append if it is to a node which is expanded.
        if (me.isVisible(node)) {
            if (index === 0 || !node.previousSibling) {
                refNode = parent;
            } else {
                // Find the previous visible sibling (filtering may have knocked out intervening nodes)
                for (sibling = node.previousSibling;
                     sibling && !sibling.get('visible');
                     sibling = sibling.previousSibling) {
                    // empty
                }

                while (sibling.isExpanded() && sibling.lastChild) {
                    sibling = sibling.lastChild;
                }
                refNode = sibling;
            }

            // The reaction to collection add joins the node to this Store
            me.insert(me.indexOf(refNode) + 1, node);
            if (!node.isLeaf() && node.isExpanded()) {
                if (node.isLoaded()) {
                    // Take a shortcut
                    me.onNodeExpand(node, node.childNodes);
                } else if (!me.fillCount) {
                    // If the node has been marked as expanded, it means the children
                    // should be provided as part of the raw data. If we're filling the nodes,
                    // the children may not have been loaded yet, so only do this if we're
                    // not in the middle of populating the nodes.
                    node.set('expanded', false);
                    node.expand();
                }
            }
        }

        // In case the node was removed and added to the removed nodes list.
        Ext.Array.remove(removed, node);

        // New nodes mean we need a sync if those nodes are phantom or dirty (have client-side only information)
        me.needsSync = me.needsSync || node.phantom || node.dirty;

        if (!node.isLeaf() && !node.isLoaded() && !me.lazyFill) {
            // With heterogeneous nodes, different levels may require differently configured readers to extract children.
            // For example a "Disk" node type may configure it's proxy reader with root: 'folders', while a "Folder" node type
            // might configure its proxy reader with root: 'files'. Or the root property could be a configured-in accessor.
            storeReader = me.getProxy().getReader();
            nodeProxy = node.getProxy();
            nodeReader = nodeProxy ? nodeProxy.getReader() : null;

            // If the node's reader was configured with a special root (property name which defines the children array) use that.
            reader = nodeReader && nodeReader.initialConfig.rootProperty ? nodeReader : storeReader;

            //start by jonnyLee     tree数据解析  子节点解析
            // reader.setRootProperty(me.getDefaultRootProperty());
            //end

            // dataRoot = reader.getRoot(data);
            dataRoot = data[me.getDefaultRootProperty()];
            if (dataRoot) {
                me.fillNode(node, reader.extractData(dataRoot, {
                    model: node.childType,
                    recordCreator : me.recordCreator
                }));
            }
        }
        me.endUpdate();
    }



});