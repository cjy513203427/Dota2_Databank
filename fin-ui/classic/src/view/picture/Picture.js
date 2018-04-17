/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.picture.Picture', {
    extend: 'Ext.Panel',
    xtype: 'picture',
    title: '一品图库(<font color="red">单击查看图集</font>)',
    requires: [
        'Admin.view.picture.PictureController'
    ],
    tbar:[{
        xtype: 'textfield',
        id:'keyword',
        emptyText:'关键字搜索',
        enableKeyEvents:true,
        listeners:{
            keydown:'keywordSearch'
        }
    },'->',{
        xtype: 'button',
        text: '查询' ,
        handler:'search'
    }],
    controller: "picture",
    layout:'fit',
    start:20,
    pageIndex:2,
    preserveScrollOnRefresh: true,
    scrollable: "y",
    listeners:{
        render:'panelRender'
    },
    items: [{
        xtype: 'dataview',
        store: 'picture.Picture',
        reference: 'dataview',
        tpl:new Ext.XTemplate(
            '<div id="container"><tpl for=".">',
            '<div style="margin-bottom: 10px;" class="thumb-wrap">',
            '<img alt="单击查看订单图集" src="http://img.bingzhiyi.com/{thumbnail}?x-oss-process=image/resize,w_350" />',
            '<br/><span><i class="order">订单编号：</i><i>{orderNumber}</i></span>  <span><i class="speci">类目：</i><i>{category1}-{category2}-{category3}</i></span>',
            '</div>',
            '</tpl></div>'
        ),
        itemSelector: '#container .thumb-wrap',
        emptyText: '请根据查询条件搜索图片',
        listeners: {
            beforerender: 'viewBeforeRender',
            render: 'search',
            refresh:'resetComposing',
            itemclick:'showAllPicture'
        }
    }
    ]
});