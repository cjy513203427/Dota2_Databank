/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.historyPhoto.HistoryPhoto', {
    extend: 'Admin.model.Base',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'brandName', type: 'string'},
        {name: 'photoNumber', type: 'string'},
        {name: 'condition', type: 'string'},
        {name: 'specification', type: 'string'},
        {name: 'versionName', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'model', type: 'string'},
        {name: 'photoUrl', type: 'string'},
        {name: 'dwgUrl', type: 'string'}
    ]


});

