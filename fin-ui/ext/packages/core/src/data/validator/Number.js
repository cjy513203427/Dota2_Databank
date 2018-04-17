/**
 * Validates that the value is a valid number.
 *
 * A valid number may include a leading + or -, comma separators, and a single decimal point.
 */
Ext.define('Ext.data.validator.Number', {
    extend: 'Ext.data.validator.Validator',
    alias: 'data.validator.number',

    type: 'number',

    config: {
        /**
         * @cfg {String} decimalSeparator
         * The decimal separator. Defaults to {@link Ext.util.Format#decimalSeparator}.
         */
        decimalSeparator: undefined,

        /**
         * @cfg {String} message
         * The error message to return when the value is not a valid number.
         * @locale
         */
        message: 'Is not a valid number',

        /**
         * @cfg {String} thousandSeparator
         * The thousand separator. Defaults to {@link Ext.util.Format#thousandSeparator}.
         */
        thousandSeparator: undefined
    },

    constructor: function(config) {
        this.callParent([config]);
        this.rebuildMatcher();
    },

    applyDecimalSeparator: function(v) {
        return v === undefined ? Ext.util.Format.decimalSeparator : v;
    },

    updateDecimalSeparator: function() {
        this.rebuildMatcher();
    },

    applyThousandSeparator: function(v) {
        return v === undefined ? Ext.util.Format.thousandSeparator : v;
    },

    updateThousandSeparator: function() {
        this.rebuildMatcher();
    },

    validate: function(value) {
        var matcher = this.matcher,
            result = matcher.test(value);

        return result ? result : this.getMessage();
    },

    privates: {
        getMatcherText: function(preventSign) {
            var t = Ext.String.escapeRegex(this.getThousandSeparator()),
                d = Ext.String.escapeRegex(this.getDecimalSeparator()),
                s = '(\\d{1,3}(' + t + '\\d{3})*(' + d + '\\d+)?|' + d + '\\d+)';

            if (!preventSign) {
                s = this.getSignPart() + s;
            }

            return s;
        },

        getSignPart: function() {
            return '(\\+|\\-)?';
        },

        rebuildMatcher: function() {
            if (!this.isConfiguring) {
                this.matcher = new RegExp('^' + this.getMatcherText() + '$');
            }
        }
    }
});
