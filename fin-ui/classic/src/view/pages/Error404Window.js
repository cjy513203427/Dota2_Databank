Ext.define('Admin.view.pages.Error404Window', {
    extend: 'Admin.view.pages.ErrorBase',
    xtype: 'page404',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.toolbar.Spacer'
    ],

    items: [
        {
            xtype: 'container',
            width: 400,
            cls:'error-page-inner-container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'error-page-top-text',
                    text: '404'
                },
                {
                    xtype: 'label',
                    cls: 'error-page-desc',
                    html: '<div>页面找不到!</div><div>返回 <a href="#dashboard"> 首页 </a></div>',
                    bind:{
                        html:'<div>{status}</div>'
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        }
    ]
});
