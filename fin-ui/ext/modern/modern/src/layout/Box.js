/**
 * Box is a superclass for the two box layouts:
 *
 * * {@link Ext.layout.HBox hbox}
 * * {@link Ext.layout.VBox vbox}
 *
 * Box itself is never used directly, but its subclasses provide flexible arrangement of child components
 * inside a {@link Ext.Container Container}.
 *
 * ## Horizontal Box
 *
 * HBox allows you to easily lay out child components horizontally. It can size items based on a fixed width or a
 * fraction of the total width available, enabling you to achieve flexible layouts that expand or contract to fill the
 * space available.
 *
 * See the {@link Ext.layout.HBox HBox layout docs} for more information on using hboxes.
 *
 * ## Vertical Box
 *
 * VBox allows you to easily lay out child components vertically. It can size items based on a fixed height or a
 * fraction of the total height available, enabling you to achieve flexible layouts that expand or contract to fill the
 * space available.
 *
 * See the {@link Ext.layout.VBox VBox layout docs} for more information on using vboxes.
 */
Ext.define('Ext.layout.Box', {
    extend: 'Ext.layout.Auto',
    alias: 'layout.box',

    isBox: true,

    config: {
        orient: 'horizontal',

        /**
         * @cfg {String} align
         * Controls how the child items of the container are aligned. Acceptable configuration values for this property are:
         *
         * - ** start ** : child items are packed together at left side of container
         * - ** center ** : child items are packed together at mid-width of container
         * - ** end ** : child items are packed together at right side of container
         * - **stretch** : child items are stretched vertically to fill the height of the container
         *
         * @accessor
         */
        align: 'stretch',

        /**
         * @cfg {Boolean} constrainAlign
         * Limits the size of {@link #align aligned} components to the size of the container.
         *
         * In order for this option to work in Safari, the container must have
         * {@link Ext.Container#autoSize autoSize} set to `false`.
         */
        constrainAlign: false,

        /**
         * @cfg {String} pack
         * Controls how the child items of the container are packed together. Acceptable configuration values
         * for this property are:
         *
         * - ** start ** : child items are packed together at left side of container
         * - ** center ** : child items are packed together at mid-width of container
         * - ** end ** : child items are packed together at right side of container
         * - ** space-between ** : child items are distributed evenly with the first
         * item at the start and the last item at the end
         * - ** space-around ** : child items are distributed evenly with equal space
         * around them
         * - ** justify ** : behaves the same as `space-between` for backward compatibility.
         *
         * @accessor
         */
        pack: 'start',

        /**
         * @cfg {Boolean} vertical
         * `true` to layout items vertically, otherwise horizontally.
         *
         * @since 6.2.0
         */
        vertical: false,

        /**
         * @cfg {Boolean} reverse
         * `true` to reverse the natural layout direction.
         * - When vertical, items are laid out bottom to top.
         * - When horizontal (assuming LTR), items are laid out right to left.
         *
         * @since 6.5.0
         */
        reverse: false
    },

    cls: Ext.baseCSSPrefix + 'layout-box',
    baseItemCls: Ext.baseCSSPrefix + 'layout-box-item',
    constrainAlignCls: Ext.baseCSSPrefix + 'constrain-align',
    flexedCls: Ext.baseCSSPrefix + 'flexed',

    //<debug>
    boxRe: /^(?:box|hbox|vbox)$/,
    //</debug>

    orientMap: {
        horizontal: {
            sizeProp: 'width',
            containerCls: [
                Ext.baseCSSPrefix + 'layout-hbox',
                Ext.baseCSSPrefix + 'horizontal'
            ],
            itemCls: Ext.baseCSSPrefix + 'layout-hbox-item'
        },
        vertical: {
            sizeProp: 'height',
            containerCls: [
                Ext.baseCSSPrefix + 'layout-vbox',
                Ext.baseCSSPrefix + 'vertical'
            ],
            itemCls: Ext.baseCSSPrefix + 'layout-vbox-item'
        }
    },

    setConfig: function (name, value, options) {
        var config = name,
            type;

        // We override setConfig to accept config objects of {type:'box'},  {type:'hbox'}
        // and {type:'vbox'} and adjust the "vertical" config properly.

        if (name) {
            if (typeof name === 'string') {
                config = {};
                config[name] = value;
            }
            else {
                Ext.apply({}, name);
                options = value;
            }

            type = config.type;
            delete config.type;

            //<debug>
            if (type && !this.boxRe.test(type)) {
                Ext.raise('Cannot change layout from '+this.$className+' to "'+type+'"');
            }
            //</debug>

            if (config.vertical == null) {
                if (type === 'vbox') {
                    config.vertical = true;
                }
                else if (type === 'hbox') {
                    config.vertical = false;
                }
            }

            this.callParent([ config, options ]);
        }

        return this;
    },

    updateContainer: function(container, oldContainer) {
        var listener = {
            flexchange: 'onItemFlexChange',
            scope: this,
            delegate: '> component'
        };

        this.callParent([container, oldContainer]);

        if (container) {
            container.on(listener);
        }

        if (oldContainer) {
            oldContainer.un(listener);
        }
    },

    updateVertical: function(vertical) {
        this.setOrient(vertical ? 'vertical' : 'horizontal');
    },

    applyOrient: function (orient) {
        //<debug>
        if (orient !== 'horizontal' && orient !== 'vertical') {
            Ext.Logger.error("Invalid box orient of: '" + orient + "', must be either 'horizontal' or 'vertical'");
        }
        //</debug>

        return orient;
    },

    updateOrient: function (orient, oldOrient) {
        var me = this,
            container = me.getContainer(),
            renderTarget = container.getRenderTarget(),
            innerItems = container.innerItems,
            len = innerItems.length,
            map = me.orientMap,
            newMap = map[orient],
            oldMap = map[oldOrient],
            i, itemCls, item;

        me.sizePropertyName = newMap.sizeProp;

        if (oldOrient) {
            renderTarget.removeCls(oldMap.containerCls);
            for (i = 0; i < len; ++i) {
                innerItems[i].removeCls(oldMap.itemCls);
            }
        }

        renderTarget.addCls(newMap.containerCls);

        me.itemCls = itemCls = [me.baseItemCls, newMap.itemCls];
        for (i = 0; i < len; ++i) {
            item = innerItems[i];
            item.addCls(itemCls);
        }
    },

    updateConstrainAlign: function(constrainAlign) {
        this.getContainer().getRenderTarget().toggleCls(this.constrainAlignCls, constrainAlign);
    },

    onItemInnerStateChange: function (item, isInner) {
        var me = this,
            flex, size;

        me.callParent(arguments);

        if (isInner) {
            flex = item.getFlex();

            if (flex) {
                me.setItemFlex(item, flex);
            }
        } else {
            me.setItemFlex(item, null);
        }
    },

    onItemFlexChange: function (item, flex) {
        if (item.isInnerItem()) {
            this.setItemFlex(item, flex);
        }
    },

    /**
     * Sets the flex of an item in this box layout.
     * @param {Ext.Component} item The item of this layout which you want to update the flex of.
     * @param {Object} flex The flex to set on this method
     */
    setItemFlex: function (item, flex) {
        var el = item.el,
            type = typeof flex,
            isNumber = (type === 'number'),
            isString = (type === 'string'),
            parts, grow;

        if (!flex || isNumber || isString) {
            if (isNumber) {
                grow = flex;
                flex = flex + ' ' + flex;
            } else if (isString) {
                parts = Ext.String.splitWords(flex);
                grow = parts[0];

                if (parts.length === 1) {
                    flex = grow + ' ' + grow;
                }
            }

            el.setStyle('flex', flex);
        } else {
            grow = flex.grow;

            el.setStyle({
                flexGrow: grow,
                flexShrink: flex.shrink,
                flexBasis: flex.basis
            });
        }

        item.toggleCls(this.flexedCls, !!grow);
    },

    convertPosition: function (position) {
        var positionMap = this.positionMap;

        if (positionMap.hasOwnProperty(position)) {
            return positionMap[position];
        }

        return position;
    },

    applyAlign: function (align) {
        return this.convertPosition(align);
    },

    updateAlign: function (align, oldAlign) {
        this.getContainer().getRenderTarget().swapCls(align, oldAlign, true, Ext.baseCSSPrefix + 'align');
    },

    applyPack: function (pack) {
        return this.convertPosition(pack);
    },

    updatePack: function (pack, oldPack) {
        this.getContainer().getRenderTarget().swapCls(pack, oldPack, true, Ext.baseCSSPrefix + 'pack');
    },

    updateReverse: function(reverse) {
        this.getContainer().getRenderTarget().toggleCls(Ext.baseCSSPrefix + 'reverse', reverse);
    }
});
