/**
 * This component is the default data item used by {@link Ext.dataview.List}. This can be
 * changed to `Ext.dataview.ListItem` by setting `useSimpleItems` to `false`.
 *
 * This component supports disclosure icons and generates the slimmest markup possible for
 * a list data item. It doesn't support container functionality like adding or docking
 * items. If you require those features you should have your list you should set the
 * {@link Ext.dataview.List#useSimpleItems useSimpleItems} config to `false` and use
 * {@link Ext.dataview.ListItem} instances for data items.
 */
Ext.define('Ext.dataview.SimpleListItem', {
    extend: 'Ext.Component',
    alternateClassName: 'Ext.dataview.component.SimpleListItem',
    xtype: 'simplelistitem',

    mixins: [
        'Ext.mixin.Toolable',
        'Ext.dataview.GenericItem',
        'Ext.dataview.Pinnable'
    ],

    classCls: Ext.baseCSSPrefix + 'listitem',

    inheritUi: true,

    html: '\xA0',

    template: [{
        reference: 'bodyElement',
        cls: Ext.baseCSSPrefix + 'body-el',
        uiCls: 'body-el',
        children: [{
            reference: 'innerElement',
            cls: Ext.baseCSSPrefix + 'inner-el',
            uiCls: 'inner-el'
        }]
    }],

    toolDefaults: {
        ui: 'listitem'
    },

    toolAnchorName: 'innerElement',

    tools: {
        disclosure: {
            weight: 100
        }
    },

    doDestroy: function() {
        this.mixins.toolable.doDestroy.call(this);
        this.callParent();
    },

    // It must be initialized as focusable, but must never respond itself.
    // It is a slave of the NavigationModel
    handleFocusEvent: Ext.emptyFn,

    getDisclosure: function () {
        return this.lookupTool('disclosure');
    },

    updateRecord: function (record) {
        if (this.destroying || this.destroyed) {
            return;
        }

        var me = this,
            dataview = me.parent,
            disclosure = me.getDisclosure(),
            data;

        data = dataview && dataview.gatherData(record);

        me.updateData(data);

        if (disclosure) {
            disclosure.setHidden(dataview.shouldHideDisclosure(record));
        }
    },

    updateHtml: function(html, oldHtml) {
        this.callParent([this.handleEmptyText(html), oldHtml]);
    },

    privates: {
        getRenderTarget: function () {
            return this.innerElement;
        },

        invokeToolHandler: function (tool, handler, scope, args, ev) {
            if (tool.type === 'disclosure' && !handler) {
                var me = this,
                    parent = me.parent;

                if (parent && parent.onItemDisclosureTap) {
                    parent.onItemDisclosureTap(ev);
                    return false;
                }
            }

            return tool.invokeToolHandler(tool, handler, scope, args, ev);
        }
    }
});
