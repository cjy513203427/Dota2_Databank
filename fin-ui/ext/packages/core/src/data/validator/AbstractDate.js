/**
 * Base class for date type validators.
 *
 * @abstract
 */
Ext.define('Ext.data.validator.AbstractDate', {
    extend: 'Ext.data.validator.Validator',

    config: {
        /**
         * @cfg {String} message
         * The error message to return when not valid.
         * @locale
         */
        message: null,

        /**
         * @cfg {String/String[]} format
         * The format(s) to allow. See {@link Ext.Date}.
         * @locale
         */
        format: undefined
    },

    applyFormat: function(format) {
        if (!format) {
            format = this.getDefaultFormat();
        }
        
        if (!Ext.isArray(format)) {
            format = [format];
        }
        return format;
    },

    validate: function(value) {
        var format = this.getFormat(),
            len = format.length,
            i;

        for (i = 0; i < len; ++i) {
            if (Ext.Date.parse(value, format[i], true)) {
                return true;
            }
        }

        return this.getMessage();
    },

    privates: {
        getDefaultFormat: Ext.privateFn
    }
});
