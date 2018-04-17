/**
 * Validates that the value is a valid date.
 */
Ext.define('Ext.data.validator.Date', {
    extend: 'Ext.data.validator.AbstractDate',
    alias: 'data.validator.date',

    type: 'date',

    /**
     * @cfg {String} message
     * The error message to return when the value is not a valid date.
     * @locale
     */
    message: 'Is not a valid date',

    /**
     * @cfg {String/String[]} format
     * The format(s) to allow. See {@link Ext.Date}. Defaults to {@link Ext.Date#defaultFormat}
     * @locale
     */

    privates: {
        getDefaultFormat: function() {
            return Ext.Date.defaultFormat;
        }
    }
});
