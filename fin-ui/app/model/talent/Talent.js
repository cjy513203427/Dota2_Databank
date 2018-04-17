/**
 * Created by hasee on 2018/1/27.
 */
Ext.define('Admin.model.talent.Talent', {
    extend: 'Admin.model.Base',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'heroId', type: 'int'},
        {name: 'grade', type: 'int'},
        {name: 'type', type: 'int'},
        {name: 'isDelete', type: 'int'}
    ]
});
