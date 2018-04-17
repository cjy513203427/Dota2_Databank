Ext.define('Admin.view.dashboard.Network', {
    extend: 'Ext.panel.Panel',
    xtype: 'network',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom',
        'Ext.ProgressBar'
    ],
    cls: 'dashboard-main-chart shadow',
    height: 380,

    bodyPadding: 15,

    title: '周统计',
    layout: 'fit',
    tools: [
        /*{
            type: 'refresh',
            toggleValue: false,
            listeners: {
                click: 'onRefreshToggle'
            }
        },*/{
            type: 'maximize',
            toggleValue: false,
            listeners: {
                click: 'onPreview'
            }
        }
    ],

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        colors: [
            '#24ad9a',
            '#7c7474',
            '#a66111'
        ],
        insetPadding:20,
        innerPadding: {
            left: 20,
            right: 20
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'dayname',
            yField: 'totalOrder',
            style: {
                lineWidth: 2
            },
            marker: {
                radius: 4,
                lineWidth: 2
            },
            label: {
                field: 'totalOrder',
                display: 'over'
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        listeners: {
            itemhighlightchange: 'onItemHighlightChange'
        }
    },listeners:{
        render:'loadData'
    }


});
