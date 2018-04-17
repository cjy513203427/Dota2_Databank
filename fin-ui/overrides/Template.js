/**
 * Created by Administrator on 2016/8/22.
 */
Ext.define('Overrides.Template', {
    override: 'Ext.Template',


    /**
     * @private
     * Do not create the substitution closure on every apply call
     */
    evaluate: function(values) {
        var me = this,
            useFormat = !me.disableFormats,
            fm = Ext.util.Format,
            tpl = me;

        function fn(match, index, name, formatFn, args) {
            // Calculate the correct name extracted from the {}
            // Certain browser pass unmatched parameters as undefined, some as an empty string.
            if (name == null || name === '') {
                name = index;
            }
            if (formatFn && useFormat) {
                if (args) {
                    args = [values[name]].concat(Ext.functionFactory('return ['+ args +'];')());
                } else {
                    args = [values[name]];
                }

                // Caller used '{0:this.bold}'. Create a call to tpl member function
                if (formatFn.substr(0, 5) === "this.") {
                    return tpl[formatFn.substr(5)].apply(tpl, args);
                }
                // Caller used '{0:number("0.00")}'. Create a call to Ext.util.Format function
                else if (fm[formatFn]) {
                    return fm[formatFn].apply(fm, args);
                }
                // Caller used '{0:someRandomText}'. We must return it unchanged
                else {
                    return match;
                }
            }
            else {
                // return values[name] !== undefined ? values[name] : "";
                //start custom by jonnyLee
                return values[name] !== (undefined||null) ? values[name] : "";
                //end custom by jonnyLee
            }
        }

        return me.html.replace(me.tokenRe, fn);
    }

});