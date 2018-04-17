Ext.define('Admin.view.pages.ErrorLogin', {
    extend: 'Admin.view.pages.ErrorBase',
    xtype:'pageLogin',

    items:[{
        cls: 'error-page-top-text',
        html: '请登录'
    },{
        cls: 'error-page-desc',
        html: '<p>本网站为一品效果图内部应用，请由钉钉微应用打开.</p>'
    }]
});
