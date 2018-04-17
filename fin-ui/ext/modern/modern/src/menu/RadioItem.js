/**
 * A menu item that contains a radio button item which can participate in a group of mutually exclusive radio items.
 *
 *     @example
 *     Ext.create('Ext.menu.Menu', {
 *         width: 100,
 *         height: 110,
 *         items: [{
 *             name: 'ui-type',
 *             text: 'Mobile'
 *         },{
 *             name: 'ui-type',
 *             text: 'Desktop'
 *         }]
 *     });
 */
Ext.define('Ext.menu.RadioItem', {
    extend: 'Ext.menu.CheckItem',
    alias: 'widget.menuradioitem',

    classCls: Ext.baseCSSPrefix + 'menuradioitem',

    nameable: true,
    shareableName: true,

    ariaRole: 'menuitemradio',

    config: {
        /**
         * @cfg {String} [group]
         * Name of a radio group that the item belongs.
         *
         * Specifying this option will turn check item into a radio item.
         *
         * Note that the group name is local to the owning Menu.
         */
        group: null,

        name: null,

        /**
         * @cfg {Boolean} [allowUncheck=false]
         * By default, as in native RadioGroups, a checked radio item cannot be unchecked
         * by the UI. Set this to `true` to allow unchecking of checked RadioItems.
         */
        allowUncheck: null
    },

    privates: {
        onSpace: function (e) {
            // Veto uncheck for radio items.
            if (this.checkboxElement.dom.checked) {
                e.preventDefault();
            }
        },

        applyChecked: function (checked, oldChecked) {
            // We are only allowed to uncheck when being called from onCheckChange
            // which sets the isClearing flag, OR if we have been configured with
            // allowUncheck: true
            if (checked || this.isClearing || this.getAllowUncheck()) {
                return this.callParent([checked, oldChecked]);
            }
        },

        updateGroup: function (group, oldGroup) {
            this.setName(group ? this.getParent().id + '_radio-' + group : null);
        },

        updateName: function (name) {
            // Must have a "name" property for the ComponentManager to use.
            this.checkboxElement.dom.name = this.name = name;
            Ext.ComponentManager.markReferencesDirty();
        },

        onCheckboxChange: function() {
            var checkboxElement = this.checkboxElement.dom;

            // The change event only fires in response to UI changes.
            // And the UI is not allowed to UNcheck radio items.
            // So immediately reverse the setting before the event propagates.
            // We do not take over the click event, and control programatically  because:
            // 1. We want interaction to be native wherever possible for accessibility reasons.
            // 2. The click events fires after the change on some platforms so we have no control.
            // 3. We'd also have to handle keystroke accessibility.
            if (this.getChecked() && !this.getAllowUncheck()) {
                checkboxElement.checked = true;
            }
            // Sync our widget state with the reality of the accessible checkbox field.
            else {
                this.setChecked(checkboxElement.checked);
            }
        },

        onCheckChange: function () {
            var checkboxElement = this.checkboxElement.dom;

            this.callParent();

            if (checkboxElement.checked && !this.isConfiguring) {
                var siblings = this.lookupNameHolder().getNamedItems()[this.getName()],
                    len = siblings.length,
                    i, other;

                // Flip checked state of all others
                for (i = 0; i < len; i++) {
                    other = siblings[i];
                    if (other !== this) {
                        other.isClearing = true;
                        other.setChecked(false);
                        other.isClearing = false;
                    }
                }
            }
        }
    }
});