/**
 * A form field trigger that contains a Component
 */
Ext.define('Ext.field.trigger.Component', {
    extend: 'Ext.field.trigger.Base',
    alias: 'trigger.component',
    classCls: Ext.baseCSSPrefix + 'componenttrigger',

    config: {
        /**
         * @cfg {Ext.Component}
         */
        component: null
    },

    applyComponent: function(component) {
        if (component && !component.isInstance) {
            component.$initParent = this;
            component = Ext.create(component);
            delete component.$initParent;
        }

        component.ownerCmp = this;

        return component;
    },

    updateComponent: function(component, oldComponent) {
        var el = this.el;

        if (oldComponent) {
            el.removeChild(oldComponent.el);
        }

        if (component) {
            el.appendChild(component.el);
        }
    },

    updateDisabled: function(disabled, oldDisabled) {
        this.callParent([disabled, oldDisabled]);

        this.getComponent().setDisabled(disabled);
    },

    getRefItems: function(deep) {
        var refItems = [],
            component = this.getComponent();

        if (component) {
            refItems.push(component);

            if (deep && component.getRefItems) {
                refItems.push.apply(refItems, component.getRefItems(deep));
            }
        }

        return refItems;
    }
});