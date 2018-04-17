/**
 * Created by hasee on 2017/12/26.
 */
Ext.define('Admin.store.hero.Hero', {
    extend: 'Admin.store.Base',

    requires: [
        'Admin.model.hero.Hero'
    ],

    model: 'Admin.model.hero.Hero',

    storeId: 'hero.Hero',

    proxy: {
        type: 'ajax',
        api:{
            read: Common.Config.requestPath('Hero', 'queryHero')
        },
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});