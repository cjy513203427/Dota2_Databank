Ext.define('Ext.overrides.calendar.view.Base', {
    override: 'Ext.calendar.view.Base',

    constructor: function(config) {
        this.callParent([config]);
        this.element.on('resize', 'handleResize', this);
    },

    setRendered: function(rendered) {
        var result = this.callParent([rendered]);
        if (result && rendered && !this.parent) {
            this.refresh();
        }
    },

    privates: {
        refreshEvents: function() {
            var me = this,
                el = me.element;

            if (!el.isPainted() && !me.refreshPaintListener) {
                el.on('painted', 'refreshEvents', me, {single: true});
                me.refreshPaintListener = true;
                return;
            }

            me.refreshPaintListener = false;
            me.callParent();
        }
    }
});