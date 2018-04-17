/**
 * Created by hasee on 2018/1/27.
 */
Ext.define('Admin.store.talent.Talent', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.talent.Talent'
    ],

    model: 'Admin.model.talent.Talent',

    storeId: 'talent.Talent',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Talent', 'queryTalent')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});