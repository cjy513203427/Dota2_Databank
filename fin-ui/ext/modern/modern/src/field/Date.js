/**
 * This is a specialized field which shows a {@link Ext.picker.Date} when tapped. If it has a predefined value,
 * or a value is selected in the {@link Ext.picker.Date}, it will be displayed like a normal {@link Ext.field.Text}
 * (but not selectable/changable).
 *
 *     Ext.create('Ext.field.DatePicker', {
 *         label: 'Birthday',
 *         value: new Date()
 *     });
 *
 * {@link Ext.field.DatePicker} fields are very simple to implement, and have no required configurations.
 *
 * ## Examples
 *
 * It can be very useful to set a default {@link #value} configuration on {@link Ext.field.DatePicker} fields. In
 * this example, we set the {@link #value} to be the current date. You can also use the {@link #setValue} method to
 * update the value at any time.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 items: [
 *                     {
 *                         xtype: 'datepickerfield',
 *                         label: 'Birthday',
 *                         name: 'birthday',
 *                         value: new Date()
 *                     }
 *                 ]
 *             },
 *             {
 *                 xtype: 'toolbar',
 *                 docked: 'bottom',
 *                 items: [
 *                     { xtype: 'spacer' },
 *                     {
 *                         text: 'setValue',
 *                         handler: function() {
 *                             var datePickerField = Ext.ComponentQuery.query('datepickerfield')[0];
 *
 *                             var randomNumber = function(from, to) {
 *                                 return Math.floor(Math.random() * (to - from + 1) + from);
 *                             };
 *
 *                             datePickerField.setValue({
 *                                 month: randomNumber(0, 11),
 *                                 day  : randomNumber(0, 28),
 *                                 year : randomNumber(1980, 2011)
 *                             });
 *                         }
 *                     },
 *                     { xtype: 'spacer' }
 *                 ]
 *             }
 *         ]
 *     });
 *
 * When you need to retrieve the date from the {@link Ext.field.DatePicker}, you can either use the {@link #getValue} or
 * {@link #getFormattedValue} methods:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 items: [
 *                     {
 *                         xtype: 'datepickerfield',
 *                         label: 'Birthday',
 *                         name: 'birthday',
 *                         value: new Date()
 *                     }
 *                 ]
 *             },
 *             {
 *                 xtype: 'toolbar',
 *                 docked: 'bottom',
 *                 items: [
 *                     {
 *                         text: 'getValue',
 *                         handler: function() {
 *                             var datePickerField = Ext.ComponentQuery.query('datepickerfield')[0];
 *                             Ext.Msg.alert(null, datePickerField.getValue());
 *                         }
 *                     },
 *                     { xtype: 'spacer' },
 *                     {
 *                         text: 'getFormattedValue',
 *                         handler: function() {
 *                             var datePickerField = Ext.ComponentQuery.query('datepickerfield')[0];
 *                             Ext.Msg.alert(null, datePickerField.getFormattedValue());
 *                         }
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 *
 *
 */
Ext.define('Ext.field.Date', {
    extend: 'Ext.field.Picker',
    alternateClassName: [
        'Ext.form.DatePicker',
        'Ext.field.DatePicker'
    ],
    
    xtype: ['datefield', 'datepickerfield'],

    requires: [
        'Ext.field.trigger.Date',
        'Ext.picker.Date',
        'Ext.panel.Date'
    ],

    /**
     * @event change
     * Fires when a date is selected
     * @param {Ext.field.DatePicker} this
     * @param {Date} newDate The new date
     * @param {Date} oldDate The old date
     */

    config: {
        /**
         * @cfg {Object/Date} value
         * Default value for the field and the internal {@link Ext.picker.Date} component. Accepts an object of 'year',
         * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
         *
         * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
         * @accessor
         */

        /**
         * @cfg {Boolean} destroyPickerOnHide
         * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently,
         * but increase delay time on the next show due to re-instantiation.
         * @accessor
         */
        destroyPickerOnHide: false,

        /**
         * @cfg {String} [dateFormat=Ext.util.Format.defaultDateFormat] The format to be used when displaying the date in this field.
         * Accepts any valid date format. You can view formats over in the {@link Ext.Date} documentation.
         */
        dateFormat: '',
        
        /**
         * @cfg {Date/String} [minDate] The minimum allowed date value for this field.
         * String value should conform to {@link #cfg!dateFormat}.
         */
        minDate: null,
        
        /**
         * @cfg {Date/String} [maxDate] The maximum allowed date value for this field.
         * String value should conform to {@link #cfg!dateFormat}.
         */
        maxDate: null,

        triggers: {
            expand: {
                type: 'date',
                focusOnMousedown: true
            }
        }
    },

    classCls: Ext.baseCSSPrefix + 'datepickerfield',
    matchFieldWidth: false,
    minDateMessage: "The date in this field must be equal to or after {0}",
    maxDateMessage: "The date in this field must be equal to or before {0}",
    
    floatedPicker: {
        xtype: 'datepanel',
        autoConfirm: true,
        floated: true,
        listeners: {
            tabout: 'onTabOut',
            scope: 'owner'
        },
        keyMap: {
            ESC: 'onTabOut',
            scope: 'owner'
        }
    },
    
    edgePicker: {
        xtype: 'datepicker'
    },

    applyValue: function(value, oldValue) {
        var parsed;

        if (this.isConfiguring) {
            this.originalValue = value;
        }

        if (!Ext.isDate(value)) {
            if (value) {
                parsed = Ext.Date.parse(value, this.getDateFormat());

                if (parsed) {
                    value = parsed;
                }
            } else {
                value = null;
            }
        }

        // The same date value may not be the same reference, so compare them by time.
        // If we have dates for both, then compare the time. If they're the same we
        // don't need to do anything.
        if (Ext.isDate(value) && Ext.isDate(oldValue) && value.getTime() === oldValue.getTime()) {
            value = undefined;
        }

        return value;
    },

    updateValue: function(value, oldValue) {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            this.updatePickerValue(picker, value);
        }

        this.callParent([value, oldValue]);
    },

    updatePickerValue: function (picker, value) {
        picker.setValue(value);
    },

    applyInputValue: function(value, oldValue) {
        if (Ext.isDate(value)) {
            value = Ext.Date.format(value, this.getDateFormat());
        }

        return this.callParent([value, oldValue]);
    },

    applyDateFormat: function(dateFormat) {
        return dateFormat || Ext.util.Format.defaultDateFormat;
    },

    /**
     * Updates the date format in the field.
     * @private
     */
    updateDateFormat: function(newDateFormat) {
        var value = this.getValue();
        
        if (Ext.isDate(value)) {
            this.setInputAttribute('value', Ext.Date.format(value, newDateFormat));
        }
    },
    
    applyMinDate: function(minDate) {
        if (typeof minDate === 'string') {
            minDate = Ext.Date.parse(minDate, this.getDateFormat());
        }
        
        //<debug>
        if (!Ext.isDate(minDate)) {
            Ext.raise("Date object or string in dateFormat required");
        }
        //</debug>
        
        return Ext.Date.clearTime(minDate);
    },
    
    applyMaxDate: function(maxDate) {
        if (typeof maxDate === 'string') {
            maxDate = Ext.Date.parse(maxDate, this.getDateFormat());
        }
        
        //<debug>
        if (!Ext.isDate(maxDate)) {
            Ext.raise("Date object or string in dateFormat required");
        }
        //</debug>
        
        return Ext.Date.clearTime(maxDate);
    },

    /**
     * Returns the {@link Date} value of this field.
     * If you wanted a formatted date use the {@link #getFormattedValue} method.
     *
     * @return {Date} The date selected
     */
    getValue: function() {
        return this._value;
    },

    /**
     * Returns the value of the field formatted using the specified format. If it is not specified, it will default to
     * {@link #dateFormat} and then {@link Ext.util.Format#defaultDateFormat}.
     * @param {String} format The format to be returned.
     * @return {String} The formatted date.
     */
    getFormattedValue: function(format) {
        var value = this.getValue();
        return Ext.isDate(value) ? Ext.Date.format(value, format || this.getDateFormat()) : '';
    },
    
    applyPicker: function(picker) {
        picker = this.callParent([picker]);
        
        this.pickerType = picker.xtype === 'datepicker' ? 'edge' : 'floated';
        picker.ownerCmp = this;
        picker.on('change', 'onPickerChange', this);
        
        return picker;
    },

    createFloatedPicker: function() {
        return this.getFloatedPicker();
    },
    
    createEdgePicker: function() {
        return this.getEdgePicker();
    },
    
    setPickerLocation: function(fromKeyboard) {
        var me = this,
            pickerType = me.pickerType,
            picker = me.getPicker(),
            value = me.getValue(),
            limit;
        
        me.$ignorePickerChange = true;
        if (value != null) {
            picker.setValue(value);
        }
        else if (pickerType === 'edge') {
            picker.setValue(new Date());
        }
        delete me.$ignorePickerChange;
        
        if (pickerType === 'floated') {
            picker.el.dom.tabIndex = -1;
            
            limit = me.getMinDate();
            
            if (limit) {
                picker.setMinDate(limit);
            }
            
            limit = me.getMaxDate();
            
            if (limit) {
                picker.setMaxDate(limit);
            }

            value = value || new Date();

            // Ensure the carousel is at the correct position wth no animation.
            picker.navigateTo(value, false);

            if (fromKeyboard) {
                // Focus the value cell
                picker.setFocusedDate(value);
            }
        }
    },
    
    doValidate: function(value, errors, skipLazy) {
        var me = this,
            format = me.getDateFormat(),
            formatted = Ext.isDate(value) ? Ext.Date.format(value, format): value,
            limit;

        me.callParent([formatted, errors, skipLazy]);

        if (value) {
            limit = me.getMinDate();

            if (limit && value.getTime() < limit.getTime()) {
                formatted = Ext.Date.format(limit, format);
                errors.push(Ext.String.format(me.minDateMessage, formatted));
            }

            limit = me.getMaxDate();

            if (limit && value.getTime() > limit.getTime()) {
                formatted = Ext.Date.format(limit, format);
                errors.push(Ext.String.format(me.maxDateMessage, formatted));
            }
        }
    },

    /**
     * Called when the picker changes its value.
     * @param {Ext.picker.Date} picker The date picker.
     * @param {Object} value The new value from the date picker.
     * @private
     */
    onPickerChange: function(picker, value) {
        var me = this;
        
        if (me.$ignorePickerChange) {
            return;
        }

        me.setValue(value);
        me.fireEvent('select', me, value);
        
        // Focus the inputEl first and then collapse. We configure
        // the picker not to revert focus which is a normal thing to do
        // for floaters; in our case when the picker is focusable it will
        // lead to unexpected results on Tab key presses.
        // Note that this focusing might happen synchronously during Tab
        // key handling in the picker, which is the way we want it.
        me.onTabOut(picker);
    },
    
    onTabOut: function() {
        this.inputElement.focus();
        this.collapse();
    },

    doDestroy: function() {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            picker.destroy();
        }

        this.callParent();
    },
    
    deprecated: {
        '6.5': {
            configs: {
                format: 'dateFormat'
            }
        }
    }
});
