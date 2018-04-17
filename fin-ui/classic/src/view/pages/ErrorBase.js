Ext.define('Admin.view.pages.ErrorBase', {
    extend: 'Ext.window.Window',

    requires: [
        'Admin.view.authentication.AuthenticationController',
        'Ext.layout.container.VBox'
    ],

    controller: 'authentication',
    autoShow: true,
    cls: 'error-page-container',
    closable: false,
    title:  Common.Config.business_name,
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});
