/**
 * Created by Cjy on 2017/08/05.
 */
Ext.define('Admin.model.photoArborescence.PhotoArborescence', {
    extend: 'Admin.model.Base',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'parentId', type: 'int'}
    ],

    validators: {

        text: {type: 'presence', message: '名称不能为空'}
    }

});

