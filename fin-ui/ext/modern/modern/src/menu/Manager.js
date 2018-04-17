/**
 * Provides a common registry groups of {@link Ext.menu.CheckItem}s.
 *
 * @singleton
 */
Ext.define('Ext.menu.Manager', {
    singleton: true,

    alternateClassName: 'Ext.menu.MenuMgr',

    uses: ['Ext.menu.Menu'],

    /**
     * Hides all floating menus that are currently visible
     * @return {Boolean} success True if any active menus were hidden.
     */
    hideAll: function() {
        var allMenus = this.visible,
            len = allMenus.length,
            result = false,
            i;

        if (len) {
            // Clone here, we may modify this collection while the loop is active
            allMenus = allMenus.slice();
            for (i = 0; i < len; i++) {
                allMenus[i].hide();
                result = true;
            }
        }
        return result;
    },

    privates: {
        groups: {},

        visible: [],

        /**
         * @private
         */
        constructor: function() {
            var me = this;

            // Lazily create the mousedown listener on first menu show
            me.onShow = function () {
                // This is a separate method to allow calling eagerly in unit tests
                me.registerGlobalListeners();

                return me.onShow.apply(me, arguments); // do the real thing
            };
        },

        onGlobalScroll: function (scroller) {
            var allMenus = this.visible,
                len = allMenus.length,
                i, menu,
                scrollerEl = scroller.getElement();

            // Scrolling document should not hide menus.
            // The will move along with the document.
            if (len && scroller !== Ext.scroll.Scroller.viewport) {
                // Clone here, we may modify this collection while the loop is active
                allMenus = allMenus.slice();
                for (i = 0; i < len; ++i) {
                    menu = allMenus[i];
                    // Hide the menu if:
                    //      The menu does not own scrolling element
                    if (!menu.alignOnScroll && menu.hideOnScroll !== false && !menu.owns(scrollerEl)) {
                        menu.hide();
                    }
                 }
             }
        },

        checkActiveMenus: function(e) {
            var allMenus = this.visible,
                len = allMenus.length,
                i, menu,
                mousedownCmp = Ext.Component.from(e);

            if (len) {
                // Clone here, we may modify this collection while the loop is active
                allMenus = allMenus.slice();
                for (i = 0; i < len; ++i) {
                    menu = allMenus[i];
                    // Hide the menu if:
                    //      The menu does not own the clicked upon element AND
                    //      The menu is not the child menu of a clicked upon MenuItem
                    if (!(menu.owns(e) || (mousedownCmp && mousedownCmp.isMenuItem && mousedownCmp.getMenu() === menu))) {
                        menu.hide();
                    }
                 }
             }
        },

        /**
         * {@link Ext.menu.Menu#afterShow} adds itself to the visible list here.
         * @private
         */
        onShow: function(menu) {
            if (menu.getFloated()) {
                Ext.Array.include(this.visible, menu);
            }
        },

        /**
         * {@link Ext.menu.Menu#onHide} removes itself from the visible list here.
         * @private
         */
        onHide: function(menu) {
            if (menu.getFloated()) {
                Ext.Array.remove(this.visible, menu);
            }
        },

        registerGlobalListeners: function() {
            var me = this;

            delete me.onShow; // remove the lazy-init hook

            // Use the global mousedown event that gets fired even if propagation is stopped
            Ext.on({
                mousedown: me.checkActiveMenus,
                scroll: me.onGlobalScroll,
                scope: me
            });
            //<debug>
            //These persistent listeners must be tolerated in unit tests
            if (window.jasmine && jasmine.addAllowedListener) {
                jasmine.addAllowedListener('mousedown');
                jasmine.addAllowedListener('scroll');
            }
            //</debug>
        }
    }
});
