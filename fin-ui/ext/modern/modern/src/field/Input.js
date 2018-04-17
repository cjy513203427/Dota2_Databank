/**
 * A base class for form fields that contain and manage an `<input>` element.  This class
 * is intended to be extended, not directly instantiated.
 */
Ext.define('Ext.field.Input', {
    extend: 'Ext.field.Field',
    xtype: 'inputfield',

    /**
     * @property {String} tag
     * The tag name to use for this field's input element. Subclasses should override this
     * property on their class body.  Not intended for instance-level use.
     * @protected
     */
    tag: 'input',

    config: {
        /**
         * @cfg {String} [inputType='text'] The type attribute for input fields -- e.g. text,
         * password, date, url, email, etc.
         */
        inputType: null,

        /**
         * @cfg {Boolean} [readOnly=false]
         * `true` to set the field DOM element `readonly` attribute to `"true"`.
         *
         * Mutation of {@link Ext.field.Text text fields} through triggers is also disabled.
         *
         * To simply prevent typing into the field while still allowing mutation through
         * triggers, set {@link Ext.field.Text#cfg!editable} to `false`.
         * @accessor
         */
        readOnly: null,

        /**
         * @private
         */
        inputValue: null
    },

    focusEl: 'inputElement',
    ariaEl: 'inputElement',
    inputTabIndex: 0,

    eventHandlers: {
        input: 'onInput'
    },

    getBodyTemplate: function () {
        return [this.getInputTemplate()];
    },

    getInputTemplate: function() {
        return {
            tag: this.tag,
            reference: 'inputElement',
            tabindex: this.inputTabIndex,
            cls: Ext.baseCSSPrefix + 'input-el',
            oninput: 'return Ext.doEv(this, event);'
        };
    },

    initElement: function () {
        this.callParent();

        this.labelElement.dom.setAttribute('for', this.inputElement.id);
    },

    updateDisabled: function (disabled, oldDisabled) {
        this.callParent([disabled, oldDisabled]);

        this.inputElement.dom.disabled = !!disabled;
    },

    updateInputType: function (newInputType) {
        this.setInputAttribute('type', newInputType);
    },

    updateName: function (name, oldName) {
        this.callParent([name, oldName]);

        this.setInputAttribute('name', name);
    },

    updateReadOnly: function (readOnly) {
        this.setInputAttribute('readonly', readOnly ? true : null);
    },

    updateValue: function (value, oldValue) {
        this.setInputValue(value);
        this.callParent([value, oldValue]);
    },

    applyInputValue: function(value) {
        return (value != null) ? value : '';
    },

    updateInputValue: function(value) {
        var inputElement = this.inputElement.dom;

        if (inputElement.value !== value) {
            inputElement.value = value;
        }
    },

    privates: {
        /**
         * Helper method to update or remove an attribute on the `inputElement`
         * @private
         */
        setInputAttribute: function (attribute, newValue) {
            var inputElement = this.inputElement;

            if (!Ext.isEmpty(newValue, true)) {
                inputElement.dom.setAttribute(attribute, newValue);
            }
            else {
                inputElement.dom.removeAttribute(attribute);
            }
        }
    },

    deprecated: {
        '6.5': {
            configs: {
                // TODO: should we resurrect this?  is there an equivalent element to place
                // the cls on?  inputWrap perhaps?
                /**
                 * @cfg {String} inputCls
                 * As of version 6.5 this config has been removed because there is no
                 * longer an input component to add the class to.
                 * @deprecated
                 */
                inputCls: null
            }
        }
    }
});
