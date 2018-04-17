/**
 * Text Field {@link Ext.field.Text#triggers trigger} widget.
 */
Ext.define('Ext.field.trigger.Trigger', {
    extend: 'Ext.field.trigger.Base',
    xtype: 'trigger',
    alias: 'trigger.trigger',

    requires: [
        'Ext.util.ClickRepeater'
    ],

    /**
     * @cfg {Boolean} [focusOnMouseDown=false] If `true`, the field will be focused upon
     * mousedown on the trigger. This should be used only for main Picker field triggers
     * that expand and collapse the picker; additional triggers should not focus the field.
     * @private
     */
    focusOnMousedown: false,

    config: {
        /**
         * @cfg {Function/String} [handler=undefined]
         * Function to run when trigger is clicked or tapped.
         * @controllable
         */
        handler: null,

        /**
         * @cfg {String}
         * @inheritdoc Ext.Button#iconCls
         */
        iconCls: null,

        /**
         * @cfg {Boolean/Object}
         * `true` to attach a {@link Ext.util.ClickRepeater tap repeater} to the trigger,
         * or a config object for a tap repeater.
         */
        repeat: null,

        /**
         * @cfg {Object} [scope]
         * Execution context for the {@link #handler} function.
         */
        scope: null
    },

    interactiveCls: Ext.baseCSSPrefix + 'interactive',

    template: [{
        reference: 'iconElement',
        classList: [
            Ext.baseCSSPrefix + 'icon-el',
            Ext.baseCSSPrefix + 'font-icon'
        ]
    }],

    constructor: function(config) {
        var me = this,
            element, repeat;

        me.callParent([config]);

        element = me.element;
        repeat = me.getRepeat();

        if (repeat) {
            me.repeater = new Ext.util.ClickRepeater(Ext.apply({
                target: me,
                preventDefault: true,
                listeners: {
                    mousedown: me.onClickRepeaterTouchStart,
                    mouseup: me.onClickRepeaterTouchEnd,
                    click: me.onClick,
                    scope: me
                }
            }, repeat));
        } else {
            element.on({
                click: me.onClick,
                mousedown: me.onMouseDown,
                scope: me
            });
        }
    },

    doDestroy: function() {
        Ext.destroyMembers(this, 'repeater');
        this.callParent();
    },

    onClick: function(e) {
        var me = this,
            handler = me.getHandler(),
            field = me.getField();

        // TODO: skip this if readonly? !editable?
        if (handler && !me.getDisabled()) {
            Ext.callback(handler, me.getScope(), [field, me, e], null, field);
        }
    },

    onMouseDown: function(e) {
        var field = this.getField(),
            activeEl = document.activeElement;

        // If it was a genuine mousedown or pointerdown, NOT a touch, then focus the input field.
        // Usually, the field will be focused, but the mousedown on the trigger
        // might be the user's first contact with the field.
        // It's definitely NOT the user's first contact with our field if the field
        // has the focus.
        // It is also possible that there are multiple triggers on the field, and only one
        // of them causes picker expand/collapse. When picker is about to be collapsed
        // we need to focus the input; otherwise if the picker was focused the focus will go
        // to the document body which is not what we want. However if the mousedown was on
        // a trigger that does not cause collapse we should NOT focus the field.
        if (field && e.pointerType !== 'touch' && (!field.containsFocus || this.focusOnMousedown)) {
            field.focus();
        }
        // If we are not focusing this field, we must blur any other widget, otherwise keyboard control
        // will remain with that widget while this trigger's widget is perceived to be active.
        else if (activeEl !== field.getFocusEl().dom) {
            document.activeElement.blur();
        }

        e.preventDefault();
    },

    onClickRepeaterTouchStart: function(clickRepeater, e) {
        this.onMouseDown(e);
    },

    onClickRepeaterTouchEnd: function(clickRepeater, e) {
        var me = this,
            field = me.field;

        Ext.callback(me.endHandler, me.scope, [field, me, e], 0, field);
    },

    updateHandler: function(handler) {
        this.toggleCls(this.interactiveCls, !!handler);
    },

    updateIconCls: function(iconCls, oldIconCls) {
        this.iconElement.replaceCls(oldIconCls, iconCls);
    }
});