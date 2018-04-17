/**
 * Validates that the value is a valid U.S. currency value.
 *
 */
Ext.define('Ext.data.validator.Currency', {
    extend: 'Ext.data.validator.Number',
    alias: 'data.validator.currency',

    type: 'currency',

    config: {
        /**
         * @cfg {Boolean} symbolAtEnd
         * `true` to show the currency symbol after the number.
         * Defaults to {Ext.util.Format#currencyAtEnd}.
         */
        symbolAtEnd: undefined,

        /**
         * @cfg {String} spacer
         * The spacer to show between the number and the currency symbol.
         * Defaults to {Ext.util.Format#currencySpacer}.
         */
        spacer: undefined,

        /**
         * @cfg {String} symbol
         * The symbol used to denote currency.
         * Defaults to {Ext.util.Format#currencySign}.
         */
        symbol: undefined
    },

    /**
     * @cfg {String} message
     * The error message to return when the value is not a valid currency amount.
     * @locale
     */
    message: 'Is not a valid currency amount',

    applySymbolAtEnd: function(value) {
        return value === undefined ? Ext.util.Format.currencyAtEnd : value;
    },

    updateSymbolAtEnd: function() {
        this.rebuildMatcher();
    },

    applySpacer: function(value) {
        return value === undefined ? Ext.util.Format.currencySpacer : value;
    },

    updateSpacer: function() {
        this.rebuildMatcher();
    },

    applySymbol: function(value) {
        return value === undefined ? Ext.util.Format.currencySign : value;
    },

    updateSymbol: function() {
        this.rebuildMatcher();
    },

    privates: {
        getMatcherText: function() {
            var me = this,
                ret = me.callParent([true]),
                symbol = Ext.String.escapeRegex(me.getSymbol()),
                spacer = Ext.String.escapeRegex(me.getSpacer() || ''),
                atEnd = me.getSymbolAtEnd();

            if (atEnd) {
                ret += '(' + spacer + symbol + ')?';
            } else {
                ret = '(' + symbol + spacer + ')?' + ret;
            }

            return me.getSignPart() + ret;
        }
    }
});
