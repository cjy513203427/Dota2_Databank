/**
 * Created by Cjy on 2017/5/23.
 */
Ext.define('Admin.model.pictureType.PictureType', {
    extend: 'Admin.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'parentId', type: 'int'},
        {name: 'isDelete', type: 'int'}
    ]

    /*validators: {
        text: {type:'presence', message: '名称不能为空'},
        standardPrice: {type:'presence', message: '基础价格不能为空'},
        panoramaPrice:  {type:'presence', message: '全景价格不能为空'}
    }*/


});