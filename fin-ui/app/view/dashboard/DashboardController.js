Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],
    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label) + '个';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('datetime') + ':接单数 ' + record.get('totalOrder')+ ':总业绩 ' + record.get('totalPrice'));
    },

    onItemHighlightChange: function (chart, newHighlightItem, oldHighlightItem) {
        this.setSeriesLineWidth(newHighlightItem, 4);
        this.setSeriesLineWidth(oldHighlightItem, 2);
    },

    setSeriesLineWidth: function (item, lineWidth) {
        if (item) {
            item.series.setStyle({
                lineWidth: lineWidth
            });
        }
    },
    loadData:function(){
        var me = this,
            chart = me.lookupReference('chart');
        chart.getStore().load();
    },
    onRefreshToggle:function(){
        var me = this,
            chart = me.lookupReference('chart');
        chart.getStore().reload();
    },
    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    loadPieData:function(){
        var me = this,
            chart = me.lookupReference('pie');
        chart.getStore().load();
    },
    onRefreshPie:function(){
        var me = this,
            chart = me.lookupReference('pie');
        chart.getStore().reload();
    },

    onPiePreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('pie');
        chart.preview();
    },
    onDataRender: function (v) {
        return v + '%';
    },

    onPieTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('type') + '占比: ' + Number(record.get('proportion')).toFixed(2) + '%，业绩：'+record.get('total'));
    },
    onHideView: function () {

    }
});
