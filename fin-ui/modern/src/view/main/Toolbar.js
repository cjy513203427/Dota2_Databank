Ext.define('Admin.view.main.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'Ext.SegmentedButton'
    ],

    items: [
        {
            // This component is moved to the floating nav container by the phone profile
            xtype: 'component',
            reference: 'logo',
            userCls: 'main-logo',
            html: '一品效果图'
        },
        {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        },
        '->',
        {
            xtype: 'segmentedbutton',
            margin: '0 16 0 0',
            //defaultUI: 'header',

            platformConfig: {
                phone: {
                    hidden: true
                }
            },

            items: [{
                iconCls: 'x-fa fa-desktop',
                handler: 'onSwitchToClassic'
            }, {
                iconCls: 'x-fa fa-tablet',
                pressed: true
            }]
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-th-large',
            href: '#leaveform',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            xtype: 'box',
            html: '管理员',
            margin: '0 12 0 4'
        }/*,
         {
         xtype: 'image',
         userCls: 'main-user-image small-image circular',
         alt: 'Current user image',
         src: 'resources/images/user-profile/2.png'
         }*/
    ]
});
