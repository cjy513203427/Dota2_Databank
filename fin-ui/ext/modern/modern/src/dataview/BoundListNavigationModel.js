Ext.define('Ext.dataview.BoundListNavigationModel', {
    extend: 'Ext.dataview.NavigationModel',
    alias: 'navmodel.boundlist',
    requires: [
        'Ext.dataview.BoundListLocation'
    ],

    config: {
        navigateOnSpace: true
    },

    locationClass: 'Ext.dataview.BoundListLocation',

    privates: {
        getKeyNavCfg: function(view) {
            var me = this;

            // Drive the KeyNav off the View's itemkeydown event so that beforeitemkeydown listeners may veto.
            // By default KeyNav uses defaultEventAction: 'stopEvent', and this is required for movement keys
            // which by default affect scrolling.
            return {
                target: view.getRefOwner().getFocusEl(),
                eventName: 'keydown',
                defaultEventAction: 'stopEvent',
                esc: me.onKeyEsc,
                up: me.onKeyUp,
                down: me.onKeyDown,
                right: me.onKeyRight,
                left: me.onKeyLeft,
                pageDown: me.onKeyPageDown,
                pageUp: me.onKeyPageUp,
                home: me.onKeyHome,
                end: me.onKeyEnd,
                tab: me.onKeyTab,
                space: me.onKeySpace,
                enter: me.onKeyEnter,
                A: {
                    ctrl: true,
                    // Need a separate function because we don't want the key
                    // events passed on to selectAll (causes event suppression).
                    handler: me.onSelectAllKeyPress
                },
                // This object has to get its key processing in first.
                // Specifically, before any Editor's key hyandling.
                priority: 1001,
                scope: me
            };
        },

        // Focus never moves during BoundList navigation.
        // If expanded using a touch gesture, the body keeps focus to avoid
        // the virtual keyboard. On second tap, the field is focused.
        // Navigation never changes the focused element.
        doFocus: Ext.privateFn,

        handleLocationChange: function(location, options) {
            var target = location.sourceElement;

            if (target) {
                this.getView().getRefOwner().inputElement.dom.setAttribute('aria-activedescendant', target.id);
            }
            this.callParent([location, options]);
        },

        onChildTouchStart: function(view, location) {
            var e = location.event;
            if (e.pointerType === 'mouse') {
                // Stop the mousedown from blurring the input field
                // We can't do this for touch events otherwise scrolling
                // won't work.
                e.preventDefault();
            }

            // We have prevented focusing, so we need to explicitly
            // set the location to the context item.
            this.setLocation(location);
            this.callParent([view, location]);
        },

        onKeyLeft: function() {
            return true;
        },

        onKeyRight: function() {
            return true;
        },

        onKeySpace: function(e) {
            if (this.getNavigateOnSpace()) {
                e.preventDefault();
                this.onNavigate(e);
            }
            // Allow to propagate to field
            return true;
        },

        onKeyEsc: function() {
            var view = this.getView(),
                field = view.getRefOwner();

            // ESC collapsed an expanded list.
            if (field && view.isVisible()) {
                field.collapse();
            }
            // Allow ESC to propagate if it's not being used
            // to do a collapse.
            else {
                return true;
            }
        },

        onKeyTab: function(e) {
            var view = this.getView(),
                field = view.getRefOwner();

            if (view.isVisible()) {
                // SelectOnTab selects the value of the field
                // So that it's propagated into the input field
                // prior to blur so that post blur processing
                // asserts a true value.
                if (field.getSelectOnTab()) {
                    this.selectHighlighted(e);
                }

                if (field.collapse) {
                    field.collapse();
                }
            }

            // Tab key event is allowed to propagate to field
            return true;
        },

        // ENTER emulates an childtap event at the View level
        onKeyEnter: function(e) {
            var view = this.getView(),
                selectable = view.getSelectable(),
                field = view.getRefOwner();

            // Stop the keydown event so that an ENTER keyup does not get delivered to
            // any element which focus is transferred to in a select handler.
            e.stopEvent();

            // Handle the case where the highlighted item is already selected
            // In this case, the change event won't fire, so just collapse
            if (!(field.getMultiSelect && field.getMultiSelect()) && selectable.isSelected(this.location.record) && field.collapse) {
                field.collapse();
            } else {
                this.selectHighlighted(e);
            }

            // Stop propagation of the ENTER keydown event so that any Editor which owns the field
            // does not completeEdit, but we also need to still fire the specialkey event for ENTER,
            // so lets add fromBoundList to the event, and this will be handled by CellEditor#onSpecialKey.
            e.fromBoundList = true;
            field.fireEvent('specialkey', field, e);
            return false;
        },

        onNavigate: function(event) {
            var doNavigate = event && (
                    event.pointerType ||
                    (this.getNavigateOnSpace() && event.keyCode === event.SPACE)
                );

            // We dnly select on pointer gestures or (SPACE if configured).
            // The ENTER key is handled above.
            if (doNavigate) {
                this.callParent([event]);
            }
        },

        /**
         * Triggers selection of the currently highlighted item according to the behavior of
         * the configured SelectionModel.
         */
        selectHighlighted: function(e) {
            var me = this,
                view = me.getView(),
                store = view.getStore(),
                selectable = view.getSelectable(),
                location = me.location,
                highlightedRec, index;

            // If all options have been filtered out, then do NOT add most recently highlighted.
            if (view.getViewItems().length) {
                highlightedRec = location.record;
                if (highlightedRec) {

                    // Select if not already selected.
                    // If already selected, selecting with no CTRL flag will deselect the record.
                    if (e.getKey() === e.ENTER || !selectable.isSelected(highlightedRec)) {
                        selectable.selectWithEvent(highlightedRec, e);

                        // If the result of that selection is that the record is removed or filtered out,
                        // jump to the next one.
                        if (!view.getStore().contains(highlightedRec)) {
                            index = Math.min(location.recordIndex, store.getCount() - 1);
                            me.setLocation(store.getAt(index));
                        }
                    }
                }
            }
        }
    }
});