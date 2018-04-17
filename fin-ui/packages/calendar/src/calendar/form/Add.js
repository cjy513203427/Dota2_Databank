/**
 * An add form implementation for data used with {@link Ext.calendar.model.Event}.
 */
Ext.define('Ext.calendar.form.Add', {
    extend: 'Ext.calendar.form.Form',
    xtype: 'calendar-form-add',

    dropButton: null,

    //<locale>
    /**
     * @cfg {String} title
     * The title for the dialog.
     */
    title: 'Add Event'
    //</locale>
});