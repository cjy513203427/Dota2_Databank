Ext.define('Admin.view.forms.Account', {
    extend: 'Ext.form.Panel',
    xtype: 'accountform',
    cls: 'wizardform',

    requires: [
        'Ext.field.Password',
        'Ext.field.Text'
    ],

    title: 'Account',
    iconCls: 'x-fa fa-info',

    bodyPadding: '0 20 10 20',
    defaults: {
        margin: '0 0 10 0'
    },

    items: [{
        xtype: 'textfield',
        placeholder: 'Username must be unique'
    }, {
        xtype: 'textfield',
        placeholder: 'Email (ex: me@somewhere.com)',
        vtype: 'email'
    }, {
        xtype: 'passwordfield',
        placeholder: 'Enter a password'
    }, {
        xtype: 'passwordfield',
        placeholder: 'Passwords must match'
    }]
});
