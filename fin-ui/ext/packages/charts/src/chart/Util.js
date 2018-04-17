/**
 * @private
 */
Ext.define('Ext.chart.Util', {
    singleton: true,

    /**
     * @private
     * Given a `range` array of two (min/max) numbers and an arbitrary array of numbers
     * (`data`), updates the given `range`, if the range of `data` exceeds it.
     * Typically, one would start with the `[NaN, NaN]` range array instance, call the
     * method on multiple datasets with that range instance, then validate it with
     * {@link #validateRange}.
     * @param {Number[]} range
     * @param {Number[]} data
     */
    expandRange: function (range, data) {
        var length = data.length,
            min = range[0],
            max = range[1],
            i, value;

        for (i = 0; i < length; i++) {
            value = data[i];
            if (!isFinite(value)) {
                continue;
            }
            if (value < min || !isFinite(min)) {
                min = value;
            }
            if (value > max || !isFinite(max)) {
                max = value;
            }
        }

        range[0] = min;
        range[1] = max;
    },

    /**
     * @private
     * Makes sure the range exists, is not zero, and its min/max values are finite numbers.
     * If this is not the case, the values from the provided `defaultRange`
     * are used.
     * @param {Number[]} range The range to validate. Never modified.
     * @param {Number[]} defaultRange
     * @param {Number} [padding=1] Padding to use in case of identical min/max.
     * Range is not guaranteed to be `padding * 2` in such a case, if min/max
     * are close to MIN_SAFE_INTEGER/MAX_SAFE_INTEGER.
     * @return {Number[]}
     */
    validateRange: function (range, defaultRange, padding) {
        if (!range) {
            return defaultRange;
        }
        if (range[0] === range[1]) {
            padding = padding || 1;
            range = [range[0] - padding, range[0] + padding];
        }
        if (range[0] === range[1]) {
            return defaultRange;
        }

        return [
            isFinite(range[0]) ? range[0] : defaultRange[0],
            isFinite(range[1]) ? range[1] : defaultRange[1]
        ];
    }

});
