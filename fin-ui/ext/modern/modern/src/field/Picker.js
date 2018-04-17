/**
 * An abstract class for fields that have a single trigger which opens a "picker" popup
 * above the field. It provides a base implementation for toggling the picker's
 * visibility when the trigger is tapped.
 *
 * You would not normally use this class directly, but instead use it as the parent
 * class for a specific picker field implementation.
 */
Ext.define('Ext.field.Picker', {
    extend: 'Ext.field.Text',
    xtype: 'pickerfield',

    requires: [
        'Ext.field.trigger.Expand'
    ],

    config: {

        /**
         * @cfg {String/Object} [picker='auto']
         *
         * A string representing the type of picker to use.  Can be one of the following values.
         *
         * - `'edge'` to use the {@link #edgePicker}, generally used on small formfactor devices.
         * - `'floated'` to use the {@link #floatedPicker}, generally used on tablets or desktops.
         * - `'auto'` to allow the framework to select the appropriate picker for the device.
         *
         * Can also be a config object for the picker.
         *
         */
        picker: {
            lazy: true,
            $value: 'auto'
        },

        /**
         * A configuration object, containing an {@link cfg#xtype} property which specifies the widget to
         * create if `{@link #cfg!picker}: 'floated'` (or if it's '`auto'` and the app is *not* on a phone)
         * Replaces `defaultTabletPicker`
         * @since 6.5.0
         */
        floatedPicker: {
            lazy: true,
            $value: null
        },

        /**
         * A configuration object, containing an {@link cfg#xtype} property which specifies the widget to
         * create if `{@link #cfg!picker}: 'edge'` (or if it's '`auto'` and the app is on a phone)
         * Replaces `defaultPhonePicker`
         * @since 6.5.0
         */
        edgePicker: {
            lazy: true,
            $value: null
        },

        clearable: false,

        /**
         * @cfg {Boolean} [matchFieldWidth=true]
         * *Only valid when the `{@link #cfg!picker}: 'floated'` is used.
         * Whether the {@link #cfg!floatedPicker}'s width should be explicitly set to match the width of the input element.
         */
        matchFieldWidth: true,

        /**
         * @cfg {String} [floatedPickerAlign=tl-bl?]
         * *Only valud when the {@link #cfg!floatedPicker} is used.
         * The {@link Ext.Component#method!showBy} alignment string to use when showing the floated picker
         * by the input field.
         */
        floatedPickerAlign: 'tl-bl?',

        /**
         * @cfg {String} pickerSlotAlign
         * The alignment of text in the picker created by this Select
         * @private
         */
        pickerSlotAlign: 'center',

        triggers: {
            expand: {
                type: 'expand'
            }
        }
    },

    keyMap: {
        scope: 'this',
        DOWN: 'onDownArrow',
        ESC: 'onEsc'
    },
    keyMapTarget: 'inputElement',

    /**
     * @cfg {Boolean} [autoComplete=false]
     * Autocomplete is disabled on Picker fields by default.
     */
    autoComplete: false,

    classCls: Ext.baseCSSPrefix + 'pickerfield',
    veilCls: Ext.baseCSSPrefix + 'veil',

    /**
     * @event expand
     * Fires when the field's picker is expanded.
     * @param {Ext.form.field.Picker} field This field instance
     */

    /**
     * @event collapse
     * Fires when the field's picker is collapsed.
     * @param {Ext.form.field.Picker} field This field instance
     */

    getBodyTemplate: function () {
        var template = this.callParent();

        if (Ext.os.deviceType !== 'Desktop') {
            template[0].children.push({
                reference: 'inputVeilElement',
                cls: Ext.baseCSSPrefix + 'input-veil-el'
            });
        }

        return template;
    },

    /**
     * @private
     */
    initialize: function () {
        var me = this,
            veil = me.inputVeilElement;

        // We don't want the soft keyboard to open on the first tap
        if (veil) {
            veil.on('tap', 'onInputVeilTap', me);
            veil.setDisplayed(true);
        }

        me.callParent();

        me.inputElement.on({
            click: 'onInputElementClick',
            scope: me
        });
    },

    onFocusLeave: function (e) {
        var veil = this.inputVeilElement;

        this.collapse();
        this.callParent([e]);

        if (veil) {
            veil.setDisplayed(true);
        }
    },

    /**
     * @private
     */
    onEsc: function (e) {
        if (Ext.isIE) {
            // Stop the esc key from "restoring" the previous value in IE
            // For example, type "foo". Highlight all the text, hit backspace.
            // Hit esc, "foo" will be restored. This behaviour doesn't occur
            // in any other browsers
            e.preventDefault();
        }

        if (this.expanded) {
            this.collapse();
            e.stopEvent();
        }
    },

    onDownArrow: function (e) {
        var me = this;

        if ((e.time - me.lastDownArrow) > 150) {
            delete me.lastDownArrow;
        }

        if (!me.expanded) {
            // Do not let the down arrow event propagate into the picker
            e.stopEvent();

            // Don't call expand() directly as there may be additional processing involved before
            // expanding, e.g. in the case of a ComboBox query.
            me.onExpandTap(e);

            // Tell setPickerLocation that it's invoked from the keyboard so
            // that it may set the location regardless of other settings.
            // For example, ComboBox has autoSelect and autoSelectLast which *may*
            // be set to false for some applications. This information
            // can override that.
            me.setPickerLocation(true);

            me.lastDownArrow = e.time;
        }
        else if (!e.stopped && (e.time - me.lastDownArrow) < 150) {
            delete me.lastDownArrow;
        }
    },

    /**
     * @template
     * @method
     * @param {Boolean} [fromKeyboard=false] Passed as `true` if the keyboard was used
     * to open the picker. This usually means that picker location should be set.
     *
     * A function which may be implemented in subclasses which moves the focus
     * to the value in the {@link #cfg!picker} which matches this field's value.
     *
     * For example, if you were writing a time picker, this method would be where
     * you synced the picker's value with the field's value.
     */
    setPickerLocation: Ext.emptyFn,

    applyPicker: function (picker) {
        var me = this,
            pickerListeners = {
                show: 'onPickerShow',
                hide: 'onPickerHide',
                scope: me
            },
            type = picker,
            config;

        if (!type) {
            type = 'auto';
        }
        else if (Ext.isObject(picker)) {
            type = null;

            if (!picker.isWidget && !picker.xtype) {
                config = picker;
                type = 'auto';
            }
        }

        if (type) {
            if (type === 'auto') {
                type = Ext.platformTags.phone ? 'edge' : 'floated';
            }

            if (type === 'edge') {
                picker = me.createEdgePicker(config);
            }
            //<debug>
            else if (type !== 'floated') {
                Ext.raise('Picker type must be "edge" or "floated" not "' + type + '"');
            }
            //</debug>
            else {
                picker = me.createFloatedPicker(config);
                pickerListeners.resize = pickerListeners.hiddenchange = 'realignFloatedPicker';
            }
        }

        if (!picker.isWidget) {
            // Allow mutation of the picker configuration
            me.fireEvent('beforepickercreate', me, picker);

            picker = Ext.create(picker);
        }

        // Detect whether we are using a floated or edge picker.
        me.pickerType = type || (picker.isViewportMenu ? 'edge' : 'floated');

        // Allow configuration of the instantiated picker
        me.fireEvent('pickercreate', me, picker);

        picker.on(pickerListeners);
        return picker;
    },

    updatePicker: function (picker) {
        var value = this.getValue(),
            name, pickerValue;

        if (picker && picker.setValue && value != null) {
            if (this.pickerType === 'floated' || picker.isPicker) {
                picker.setValue(value);
            }
        }
    },

    onResize: function () {
        // See if the picker has been created
        var picker = this.getConfig('picker', false, true);

        if (picker && picker.isVisible()) {
            this.realignFloatedPicker();
        }
    },

    /**
     * @private
     */
    realignFloatedPicker: function (picker) {
        var me = this;

        picker = me.getConfig('picker', false, true);

        if (picker && picker.isVisible()) {
            if (me.getMatchFieldWidth()) {
                picker.setWidth(me.bodyElement.getWidth());
            }
            picker.realign(me.bodyElement, me.getFloatedPickerAlign(), {
                minHeight: 100
            });
            me.setPickerLocation();
        }
    },

    onInputVeilTap: function (e) {
        var me = this;

        e.stopEvent();

        if (!me.hasFocus) {
            // We don't want focus to leave where it was when the veil is tapped
            e.preventDefault();

            me.inputVeilElement.setDisplayed('none');

            if (!me.expanded) {
                me.expand();
            }
        }
    },

    onInputElementClick: function (e) {
        if (e.pointerType === 'mouse' && (!this.getEditable() && !this.getReadOnly())) {
            this[this.expanded ? 'collapse' : 'expand']();
        }
    },

    onExpandTap: function () {
        this.expand();

        return false;
    },

    expand: function () {
        if (!this.expanded && !this.getDisabled()) {
            this.showPicker();
        }
    },

    collapse: function () {
        if (this.expanded) {
            this.getPicker().hide();
        }
    },

    /**
     * @private
     * Runs on touchstart of doc to check to see if we should collapse the picker.
     */
    collapseIf: function (e) {
        var me = this,
            veil = me.inputVeilElement;

        // If what was mousedowned on is outside of this Field, then collapse.
        if (!me.destroyed && !e.within(me.bodyElement, false, true) && !me.owns(e.target)) {
            me.collapse();

            if (veil && veil.getStyle('display') === 'none') {
                veil.setDisplayed(true);
            }
        }
    },

    showPicker: function () {
        var me = this,
            alignTarget = me.bodyElement,
            picker = me.getPicker(),
            value;

        if (me.pickerType === 'floated') {
            if (me.getMatchFieldWidth()) {
                picker.setWidth(alignTarget.getWidth());
            }
            picker.showBy(alignTarget, me.getFloatedPickerAlign(), {
                minHeight: 100
            });

            // Collapse on touch outside this component tree.
            // Because touch platforms do not focus document.body on touch
            // so no focusleave would occur to trigger a collapse.
            me.touchListeners = Ext.getDoc().on({
                // Do not translate on non-touch platforms.
                // mousedown will blur the field.
                translate: false,
                touchstart: me.collapseIf,
                scope: me,
                delegated: false,
                destroyable: true
            });
        } else {
            if (!picker.getParent()) {
                Ext.Viewport.add(picker);
            }

            value = this.getValue();

            if (value != null) {
                this.updatePickerValue(picker, value);
            }

            picker.show();
        }
    },

    updatePickerValue: function (picker, value) {
        var slot = picker.getSlots()[0],
            name = slot.name || slot.getName(),
            pickerValue = {};

        pickerValue[name] = value;

        picker.setValue(pickerValue);
    },

    onPickerShow: function () {
        var me = this;

        me.expanded = true;

        // Scrolling of anything which causes this field to move should collapse
        me.scrollListeners = Ext.on({
            scroll: me.onGlobalScroll,
            scope: me,
            destroyable: true
        });

        me.fireEvent('expand', me);
    },

    onPickerHide: function () {
        var me = this;

        me.expanded = false;
        Ext.destroy(me.scrollListeners, me.touchListeners);
        me.fireEvent('collapse', me);
    },

    doDestroy: function () {
        var me = this;

        Ext.destroy(me.getConfig('picker', false, true), me.scrollListeners);

        me.callParent();
    },

    privates: {
        onGlobalScroll: function (scroller) {
            if (this.expanded) {

                // Edge pickers are modal and anchored. We do not care if other
                // parts of the app scroll.
                if (this.pickerType === 'edge') {
                    return;
                }

                // Collapse if the scroll is anywhere but inside the picker
                if (!this.getPicker().owns(scroller.getElement())) {
                    this.collapse();
                }
            }
        }
    }
});
