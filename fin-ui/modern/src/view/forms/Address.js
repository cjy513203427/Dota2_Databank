Ext.define('Admin.view.forms.Address', {
    extend: 'Ext.form.Panel',
    xtype: 'addressform',
    cls: 'wizardform',

    requires: [
        'Ext.field.Text'
    ],

    title: 'Address',
    iconCls: 'x-fa fa-home',

    bodyPadding: '0 20 10 20',
    defaultType: 'textfield',
    defaults: {
        margin: '0 0 10 0'
    },

    items: [{
        placeholder: 'Phone Number'
    }, {
        placeholder: 'Address'
    }, {
        placeholder: 'City'
    }, {
        placeholder: 'Postal / Zip Code'
    }]
});
