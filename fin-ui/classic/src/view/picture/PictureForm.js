/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.picture.PictureForm', {
    extend: 'Ext.window.Window',
    xtype: 'pictureForm',

    title: '订单图集(<font color="red">单击查看原图</font>)',

    requires: [
        'Admin.view.picture.PictureFormController',
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

    controller: 'pictureform',
    //bbar:['->',{xtype:'button',text:'添加到精选库',handler:'addSelected'}],

    items: [{
        xtype: 'dataview',
        preserveScrollOnRefresh: true,
        scrollable: "y",
        store: 'picture.PictureInfo',
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
        text: "添加到精选库",
        formBind: true,
        handler: 'insertPictureHandpick'
    }]
});
