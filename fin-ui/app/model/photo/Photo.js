/**
 * Created by Administrator on 2016/9/5.
 */
Ext.define('Admin.model.photo.Photo', {
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
    ],

    validators: {

        text: {type:'presence', message:'商品名称不能为空'},

        photoNumber: {type:'presence', message:'编号不能为空'},

        condition: {type:'presence', message:'品相不能为空'},

        specification:  {type:'presence', message: '规格不能为空'},

        versionName:  {type:'presence', message: '版本名不能为空'},

        type: {type:'presence', message: '类型不能为空'},

        model:   {type:'presence', message: '模型不能为空'},

        photoUrl: {type: 'presence', message: '照片不能为空'},

        dwgUrl: {type: 'presence', message: 'CAD不能为空'},

        brandName: {type: 'presence', message: '品牌名不能为空'}

    }
});

