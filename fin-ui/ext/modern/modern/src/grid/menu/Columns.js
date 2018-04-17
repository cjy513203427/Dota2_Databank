/**
 * This class is created by `Ext.grid.Grid` to display the columns in a menu.
 * @since 6.5.0
 */
Ext.define('Ext.grid.menu.Columns', {
    extend: 'Ext.menu.Item',

    xtype: 'gridcolumnsmenu',

    iconCls: Ext.baseCSSPrefix + 'headermenu-columns-icon',

    /**
     * @cfg {String} text
     * The menu item text for the column visibility sub-menu.
     * @locale
     */
    text: 'Columns',

    menu: {},

    updateMenu: function (menu, oldMenu) {
        this.callParent([menu, oldMenu]);
        if (menu) {
            this.menuListeners = menu.on({
                beforeshow: 'onBeforeShowColumnsMenu',
                checkchange: {
                    fn: 'onCheckItem',
                    delegate: 'menucheckitem'
                },
                scope: this,
                destroyable: true
            });
        } else {
            Ext.destroy(this.menuListeners);
        }
    },

    onBeforeShowColumnsMenu: function (menu) {
        var me = this,
            grid = me.grid,
            columns = grid.getHeaderContainer().getColumns('[isLeafHeader]'),
            items = [],
            len = columns.length,
            i, column;

        for (i = 0; i < len; ++i) {
            column = columns[i];
            if (column.getHideable()) {
                items.push(column.getHideShowMenuItem());
            }
        }

        // The MenuCheckItems are persistent, and lazily owned by each column.
        // We just remove non-destructively here, and add the new payload.
        menu.removeAll(false);
        menu.add(items);
    },

    onCheckItem: function (menuItem, checked) {
        var items = this.getMenu().items.items,
            len = items.length,
            i, item, checkedItem, enable;

        menuItem.column.setHidden(!checked);

        for (i = 0; i < len; ++i) {
            item = items[i];
            if (item.getChecked()) {
                if (checkedItem) {
                    enable = true;
                    break;
                }
                checkedItem = item;
            }
        }

        if (enable) {
            for (i = 0; i < len; ++i) {
                items[i].enable();
            }

        } else if (checkedItem) {
            checkedItem.disable();
        }
    }
});
