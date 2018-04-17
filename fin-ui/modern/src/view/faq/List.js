Ext.define('Admin.view.faq.List', {
    extend: 'Ext.dataview.List',
    xtype: 'faq',

    container: {
        userCls: 'dashboard'
    },

    store: {
        type: 'faq',
        autoLoad: true
    },

    itemConfig: {
        xtype: 'faqitems',
        ui: 'light',
        userCls: 'dashboard-item shadow',
        viewModel: true,

        bind: {
            title: '{record.name}',
            store: '{record.questions}'
        }
    }
});
