/**
 * A base class for the calendar view.
 *
 * @private
 */
Ext.define('Ext.calendar.AbstractList', {
    extend: 'Ext.dataview.DataView',

    onItemTap: function(container, target, index, e) {
        this.callParent([container, target, index, e]);
        var record = this.getStore().getAt(index);
        this.handleItemTap(record);
    }
})