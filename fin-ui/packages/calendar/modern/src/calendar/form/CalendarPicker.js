/**
 * A calendar picker component.  Similar to {@link Ext.calendar.List}, the items in the
 * picker will display the title for each source calendar along with a color swatch
 * representing the default color the that calendar's events.
 *
 * The {@link #cfg-store} will be the same {@link Ext.calendar.store.Calendars store}
 * instance used by your target {@link Ext.calendar.view.Base calendar}.
 */
Ext.define('Ext.calendar.form.CalendarPicker', {
    extend: 'Ext.field.Select',
    xtype: 'calendar-calendar-picker',

    cls: Ext.baseCSSPrefix + 'calendar-picker-field',

    getDefaultTabletPickerConfig: function() {
        var field = this.getDisplayField();
        return {
            items: {
                xtype: 'list',
                userCls: Ext.baseCSSPrefix + 'calendar-picker-list',
                itemTpl: '<div class="' + Ext.baseCSSPrefix + 'calendar-picker-list-icon" style="background-color: {color};"></div>' + 
                         '<span class="' + Ext.baseCSSPrefix + 'calendar-picker-list-text ' + Ext.baseCSSPrefix + 'list-label">{' + field + ':htmlEncode}</span>'
            }
        };
    },

    getTabletPicker: function() {
        var exists = this.tabletPicker,
            result = this.callParent();

        if (!exists) {
            result.items.first().prepareData = this.prepareData;
        }
        return result;
    },

    getPhonePicker: function() {
        var exists = this.phonePicker,
            result = this.callParent(),
            field = this.getDisplayField(),
            slot;

        if (!exists) {
            result.setUserCls(Ext.baseCSSPrefix + 'calendar-picker-list');
            slot = result.items.first();
            slot.prepareData = this.prepareData;
            slot.setItemTpl(
                '<div class="' + Ext.baseCSSPrefix + 'picker-item {cls}">' + 
                    '<div class="' + Ext.baseCSSPrefix + 'calendar-picker-list-icon" style="background-color: {color};"></div>' + 
                    '<span class="' + Ext.baseCSSPrefix + 'list-label">{' + field + ':htmlEncode}</span>' + 
                '</div>'
            );
        }
        return result;
    },

    prepareData: function(data, index, record) {
        return {
            id: record.id,
            title: record.getTitle(),
            color: record.getBaseColor()
        };
    },

    updateValue: function(value, oldValue) {
        var me = this,
            iconEl = me.iconEl,
            record;

        me.callParent([value, oldValue]);

        if (!iconEl) {
            me.iconEl = iconEl = me.getComponent().element.createChild({
                cls: Ext.baseCSSPrefix + 'calendar-picker-field-icon'
            });
        }

        record = me.getSelection();
        if (record) {
            iconEl.setDisplayed(true);
            iconEl.setStyle('background-color', record.getBaseColor());
        } else {
            iconEl.setDisplayed(false);
        }
    },

    privates: {
        queryTabletPicker: function(picker) {
            return picker.down('calendar-list');
        }
    }
});
