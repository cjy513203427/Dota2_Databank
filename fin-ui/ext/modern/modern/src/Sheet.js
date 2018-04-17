/**
 * A floated panel which animates in and out from the side of the screen when shown.
 * Used as the base class for {@link Ext.ActionSheet Action Sheets} and
 * {@link Ext.picker.Picker Pickers}
 */
Ext.define('Ext.Sheet', {
    extend: 'Ext.Panel',

    xtype: 'sheet',

    requires: [
        'Ext.viewport.Viewport',
        'Ext.Mask',
        'Ext.fx.Animation'
    ],

    /**
     * @hide
     */
    isViewportMenu: false,

    /**
     * 
     * @hide
     */
    hidden: true,

    config: {
        /**
        * @cfg {Boolean} reveal
        * Set to true to display the menu using reveal style.  The Viewport will slide up/down/left/right to make 
        * room for the menu to be seen.
        */
        reveal: null,

        /**
        * @cfg {Boolean} cover
        * Set to true to display the menu using cover style.  The menu will be shown over the Viewport from the
        * specified side.  By default, the menu will be modal, displaying a mask over the rest of the Viewport,
        * and the user may tap on the mask to dismiss the menu.
        */
        cover: null,

        /**
         * @cfg {"left"/"right"/"top"/"bottom"}
         * The side of the viewport where the menu will be positioned.
         */
        side: null,

        /**
         * @cfg modal
         * @inheritdoc
         */
        modal: true,

        /**
         * @cfg hideOnMaskTap
         * @inheritdoc
         */
        hideOnMaskTap: true,

        /**
         * @cfg {Boolean} centered
         * Whether or not this component is absolutely centered inside its container.
         * @accessor
         * @evented
         */
        centered: true,

        /**
         * @cfg {Boolean} stretchX `true` to stretch this sheet horizontally.
         */
        stretchX: null,

        /**
         * @cfg {Boolean} stretchY `true` to stretch this sheet vertically.
         */
        stretchY: null,

        /**
         * @cfg {String} enter
         * The viewport side used as the enter point when shown. Valid values are 'top', 'bottom', 'left', and 'right'.
         * Applies to sliding animation effects only.
         */
        enter: 'bottom',

        /**
         * @cfg {String} exit
         * The viewport side used as the exit point when hidden. Valid values are 'top', 'bottom', 'left', and 'right'.
         * Applies to sliding animation effects only.
         */
        exit: 'bottom',

        /**
         * @cfg showAnimation
         * @inheritdoc
         */
        showAnimation: {
            type: 'slideIn',
            duration: 250,
            easing: 'ease-out'
        },

        /**
         * @cfg hideAnimation
         * @inheritdoc
         */
        hideAnimation: {
            type: 'slideOut',
            duration: 250,
            easing: 'ease-in'
        },

        /**
         * @hide
         */
        translatable: {
            type: 'csstransform'
        }
    },

    classCls: Ext.baseCSSPrefix + 'sheet',

    manageBorders: false,

    autoSize: null,
    border: true,
    bodyBorder: false,

    floated: true,

    isInputRegex: /^(input|textarea|select|a)$/i,

    destroy: function() {
        var me = this;

        me.setSide(null);

        // If we were added to the Viewport via setMenu (not a config on this class),
        // the the Viewport pokes $side on us. If our side config drive things then
        // the above setSide() would dissolve that and clear $side. If it is still set
        // then the Viewport was used directly... but we still need to drop out there
        // or else we'll leave our smoldering husk in the Viewports menus collection.
        if (me.$side) {
            me.updateSide(null, me.$side);
        }

        me.callParent();
    },

    applyHideAnimation: function(config) {
        var exit = this.getExit(),
            direction = exit;

        if (exit === null) {
            return null;
        }

        if (config === true) {
            config = {
                type: 'slideOut'
            };
        }
        var anim = this.callParent([config]);

        if (anim) {
            if (exit === 'bottom') {
                direction = 'down';
            } else if (exit === 'top') {
                direction = 'up';
            }
            anim.setDirection(direction);
        }
        return anim;
    },

    applyShowAnimation: function(config) {
        var enter = this.getEnter(),
            direction = enter;

        if (enter === null) {
            return null;
        }

        if (config === true) {
            config = {
                type: 'slideIn'
            };
        }
        var anim = this.callParent([config]);

        if (anim) {
            if (enter === 'bottom') {
                direction = 'down';
            }
            if (enter === 'top') {
                direction = 'up';
            }
            anim.setBefore({
                display: null
            });
            anim.setReverse(true);
            anim.setDirection(direction);
        }
        return anim;
    },

    hide: function(animation) {
        var me = this,
            parent = me.parent;

        if (parent && parent.isViewport && me.$side && !me.viewportIsHiding) {
            parent.hideMenu(me.$side, animation);
        } else {
            me.viewportIsHiding = false;
            me.setDisplayed(false);
            me.callParent([animation]);
        }
    },

    updateSide: function(newSide, oldSide) {
        var me = this;

        me.isViewportMenu = true;

        if (oldSide) {
            Ext.Viewport.removeMenu(oldSide);
        }

        if (newSide) {
            Ext.Viewport.setMenu(me, {
                side: newSide
            });
        }
    },

    updateDisplayed: function(newDisplayed) {
        var me = this,
            VP = Ext.Viewport;

        if (VP) {
            if (newDisplayed) {
                VP.setMenu(me, {
                    side: me.getSide(),
                    reveal: me.getReveal(),
                    cover: me.getCover()
                });
                VP.showMenu(me.$side);
            } else {
                VP.hideMenu(me.$side);
            }
        }
    },

    updateStretchX: function(newStretchX) {
        this.getLeft();
        this.getRight();

        if (newStretchX) {
            this.setLeft(0);
            this.setRight(0);
        }
    },

    updateStretchY: function(newStretchY) {
        this.getTop();
        this.getBottom();

        if (newStretchY) {
            this.setTop(0);
            this.setBottom(0);
        }
    },

    privates: {
        hideFromModal: function() {
            if (this.isViewportMenu) {
                this.setDisplayed(false);
            }
            else {
                this.hide();
            }
        }
    }
});
