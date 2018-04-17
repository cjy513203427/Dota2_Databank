/**
 * Created by Administrator on 2017/6/2.
 */
Ext.define('Admin.view.pictureHandpick.PictureHandpickForm', {
    extend: 'Ext.window.Window',
    xtype: 'pictureHandpickForm',

    title: '订单图集(<font color="red">单击查看原图</font>)',

    requires: [
        'Admin.view.pictureHandpick.PictureHandpickFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit'
    ],
    layout:'fit',

    modal: true,
    height: 500,
    width: 1000,

    controller: 'pictureFormHandpick',
    //bbar:['->',{xtype:'button',text:'添加到精选库',handler:'addSelected'}],

    items: [{
        xtype: 'dataview',
        preserveScrollOnRefresh: true,
        scrollable: "y",
        store: 'pictureHandpick.PictureHandpickInfo',
        flex:7,
        reference: 'dataview',
        tpl:new Ext.XTemplate(
            '<div id="container"><tpl for=".">',
            '<div style="margin-bottom: 10px;" class="thumb-wrap">',
            '<img alt="单击打开原图" src="http://img.bingzhiyi.com/{thumbnail}?x-oss-process=image/resize,w_280" />',
            '<br/><span><i class="order">订单编号：</i><i>{orderNumber}</i></span>  <span><i class="speci">类目：</i><i>{category1}-{category2}-{category3}</i></span>',
            '</div>',
            '</tpl></div>'
        ),
        itemSelector: '#container .thumb-wrap',
        emptyText: '查询失败，请联系管理员',
        listeners: {
            beforerender: 'viewBeforeRender',
            render: 'search',
            itemclick:'showPicture'
        }
    }],bbar: ['->',{
    text: "从精选库删除",
    formBind: true,
    handler: 'deletePictureHandpick',
    hidden: true,
    listeners:{
        render:function (b) {
            if(Common.permission.Permission.hasPermission("删除图库")){
                console.log("删除精选图!!!!!!!!!!1111111111111");
                b.show();
            }
        }
    }
}]

});