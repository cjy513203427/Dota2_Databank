/**
 * Created by Administrator on 2016/8/17.
 */
Ext.define('Admin.model.security.Menu', {
    extend: 'Admin.model.Base',

    fields: [
        {type: 'string', name: 'id'},
        {type: 'string', name: 'name'},
        {type: 'string', name: 'text'},
        {type: 'string', name: 'menuLInk'},
        {type: 'string', name: 'parentId'},
        {type: 'boolean', name: 'leaf'},
        {type: 'auto', name: 'children'}
    ]
});