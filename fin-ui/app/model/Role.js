/**
 * Created by lb on 2016/9/1.
 */
Ext.define('Admin.model.Role', {
    extend: 'Ext.data.Model',

    idProperty: 'rid',
    fields: [ 'id', 'name', 'create_time','description' ]



});
