/**
 * @private
 */
Ext.define('Ext.util.sizemonitor.Abstract', {

    mixins: ['Ext.mixin.Templatable'],

    requires: [
        'Ext.TaskQueue'
    ],

    config: {
        element: null,

        callback: Ext.emptyFn,

        scope: null,

        args: []
    },

    width: null,

    height: null,

    contentWidth: null,

    contentHeight: null,

    constructor: function(config) {
        var me = this;

        me.refresh = Ext.Function.bind(me.refresh, me);

        me.info = {
            width: 0,
            height: 0,
            contentWidth: 0,
            contentHeight: 0,
            flag: 0
        };

        me.initElement();

        me.initConfig(config);

        me.bindListeners(true);
    },

    bindListeners: Ext.emptyFn,

    applyElement: function(element) {
        if (element) {
            return Ext.get(element);
        }
    },

    updateElement: function(element) {
        element.append(this.detectorsContainer, true);
        element.addCls(Ext.baseCSSPrefix + 'size-monitored');
    },

    applyArgs: function(args) {
        return args.concat([this.info]);
    },

    refreshMonitors: Ext.emptyFn,

    forceRefresh: function() {
        Ext.TaskQueue.requestRead('refresh', this);
    },

    getContentBounds: function() {
        return this.detectorsContainer.getBoundingClientRect();
    },

    getContentWidth: function() {
        return this.detectorsContainer.clientWidth;
    },

    getContentHeight: function() {
        return this.detectorsContainer.clientHeight;
    },

    refreshSize: function() {
        var element = this.getElement();

        if (!element || element.destroyed) {
            return false;
        }

        var me = this,
            width = element.getWidth(),
            height = element.getHeight(),
            contentWidth = me.getContentWidth(),
            contentHeight = me.getContentHeight(),
            currentContentWidth = me.contentWidth,
            currentContentHeight = me.contentHeight,
            info = me.info,
            resized = false,
            flag;

        me.width = width;
        me.height = height;
        me.contentWidth = contentWidth;
        me.contentHeight = contentHeight;

        flag = ((currentContentWidth !== contentWidth ? 1 : 0) + (currentContentHeight !== contentHeight ? 2 : 0));

        if (flag > 0) {
            info.width = width;
            info.height = height;
            info.contentWidth = contentWidth;
            info.contentHeight = contentHeight;
            info.flag = flag;

            resized = true;
            me.getCallback().apply(me.getScope(), me.getArgs());
        }

        return resized;
    },

    refresh: function(force) {
        if (this.destroying || this.destroyed) {
            return;
        }
        
        if (this.refreshSize() || force) {
            Ext.TaskQueue.requestWrite('refreshMonitors', this);
        }
    },

    destroy: function() {
        var me = this,
            element = me.getElement();

        me.bindListeners(false);

        if (element && !element.destroyed) {
            element.removeCls(Ext.baseCSSPrefix + 'size-monitored');
        }

        delete me._element;
        
        // This is a closure so Base destructor won't null it
        me.refresh = null;

        me.callParent();
    }
});
