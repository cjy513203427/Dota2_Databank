/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.picture.Picture', {
    extend: 'Admin.model.Base',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'total', type: 'int'},
        {name: 'orderNumber', type: 'string'},
        {name: 'imageName', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'size', type: 'string'},
        {name: 'style', type: 'string'},
        {name: 'extensionName', type: 'string'},
        {name: 'uploadTime', type: 'string'},
        {name: 'thumbnail', type: 'string'},
        {name: 'watermark', type: 'string'},
        {name: 'aspect', type: 'string'},
        {name: 'resolution', type: 'string'},
        {name: 'category1', type: 'string'},
        {name: 'category2', type: 'string'},
        {name: 'category3', type: 'string'}
    ]

});