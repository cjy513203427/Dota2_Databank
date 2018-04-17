/**
 * A drag proxy for day style events.
 */
Ext.define('Ext.calendar.dd.DaysProxy', {
    extend: 'Ext.drag.proxy.Placeholder',
    alias: 'drag.proxy.calendar-days',

    config: {
        cursorOffset: null
    },

    draggingCls: Ext.baseCSSPrefix + 'calendar-event-dragging',

    getElement: function(info) {
        var me = this,
            source = info.source,
            view = info.view,
            widget = info.widget,
            clone = widget.cloneForProxy(),
            el = clone.element;

        clone.removeCls(view.$staticEventCls);
        clone.addCls(me.draggingCls);
        clone.setWidth(Ext.fly(view.getEventColumn(0)).getWidth());
        clone.setHeight(widget.getHeight());
        view.bodyTable.appendChild(el);
        me.element = el;
        me.clone = clone;
        info.widgetClone = clone;
        return el;
    },

    cleanup: function(info) {
        if (info && info.deferCleanup) {
            return;
        }
        this.clone = this.element = Ext.destroy(this.clone);
    }
});