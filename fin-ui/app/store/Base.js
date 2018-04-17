Ext.define('Admin.store.Base', {
    extend: 'Ext.data.Store',

    requires: [
        'Common.Config'
    ],

    pageSize: Common.Config.pageSize

});

