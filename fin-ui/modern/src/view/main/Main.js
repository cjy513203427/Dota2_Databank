Ext.define('Admin.view.main.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View'
    ],
    xtype: 'main',
    controller: 'main',
    platformConfig: {
        phone: {
            controller: 'phone-main'
        }
    },

    layout: 'hbox',

    items: [
        {
            xtype: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar shadow'
        },
        {
            xtype: 'container',
            userCls: 'main-nav-container',
            reference: 'navigation',
            layout: 'fit',
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTree',
                    scrollable: true,
                    ui: 'nav',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        itemclick: 'onNavigationItemClick',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }
            ]
        },
        {
            xtype: 'navigationview',
            flex: 1,
            reference: 'mainCard',
            userCls: 'main-container',
            navigationBar: false
        }
    ]
});
