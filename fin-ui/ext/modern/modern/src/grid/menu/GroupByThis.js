/**
 * This class is used in the column menu of a `Ext.grid.Grid`.
 * @since 6.5.0
 */
Ext.define('Ext.grid.menu.GroupByThis', {
    extend: 'Ext.menu.CheckItem',

    xtype: 'gridgroupbythismenuitem',

    hideOnClick: true,
    iconCls: Ext.baseCSSPrefix + 'group-by-icon',

    /**
     * @cfg {String} text
     * The menu item text for the "Group by this field" menu item.
     * @locale
     */
    text: 'Group by this field'
});
