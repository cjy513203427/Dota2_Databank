Ext.define('Admin.view.dashboard.Services', {
    extend: 'Ext.Panel',
    xtype: 'services',

    tools: [
       /* {
            type: 'refresh',
            toggleValue: false,
            listeners: {
                click: 'onRefreshPie'
            }
        },*/
        {
            type: 'maximize',
            toggleValue: false,
            listeners: {
                click: 'onPiePreview'
            }
        }
    ],
    cls: 'service-type shadow',
    height: 320,
    bodyPadding: 15,
    title: '月度统计',
    layout:'fit',
    listeners: {
        render: 'loadPieData'
    },
    items: [

                {
                    xtype: 'polar',
                    reference: 'pie',
                    theme: 'default-gradients',
                    insetPadding: 25,
                    innerPadding: 10,
                    colors: [
                        '#FF7256',
                        '#00B2EE',
                        '#E9F01D'
                    ],
                    legend: {
                        docked: 'left'
                    },
                    interactions: ['rotate'],
                    series: [{
                        type: 'pie',
                        angleField: 'proportion',
                        label: {
                            field: 'type',
                            calloutLine: {
                                length: 30,
                                width: 3
                            }
                        },
                        highlight: true,
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onPieTooltipRender'
                        }
                    }]
                }
            ]

});
