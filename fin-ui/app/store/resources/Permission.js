/**
 * Created by jonnyLee on 2016/09/26.
 */
Ext.define('Admin.store.resources.Permission', {
    extend: 'Admin.store.Base',
    requires: [
        'Admin.model.resources.Permission'
    ],

    model: 'Admin.model.resources.Permission',

    storeId: 'resources.Permission',

    proxy: {
        type: 'ajax',
        api: {
            read: Common.Config.requestPath('System', 'Resources', 'button')
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'data.total'
        }
    }
});
