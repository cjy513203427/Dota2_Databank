/**
 * Created by hasee on 2018/1/2.
 */
Ext.define('Admin.model.tree.Task', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'task',
        type: 'string'
    }, {
        name: 'user',
        type: 'string'
    }, {
        name: 'duration',
        type: 'float'
    }, {
        name: 'done',
        type: 'boolean'
    }]
});