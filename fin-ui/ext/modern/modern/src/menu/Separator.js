/**
 * This component renders a simple line to separate menu items.
 * @since 6.5.0
 */
Ext.define('Ext.menu.Separator', {
    extend: 'Ext.Component',
    alias: 'widget.menuseparator',

    isMenuSeparator: true,

    focusable: false,

    classCls: Ext.baseCSSPrefix + 'menuseparator',

    ariaRole: 'separator'
});
