/**
 * Created by hasee on 2018/4/24.
 */
Ext.define('Admin.view.hero.HeroForm', {
    extend: 'Ext.window.Window',
    xtype: 'heroform',

    title: '英雄添加',

    requires: [
        'Admin.view.hero.HeroFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    modal: true,
    height: 200,
    width: 370,

    controller: 'heroForm',

    viewModel: {
        links: {
            theHero: {
                type: 'hero.Hero',
                create: true
            }
        },
        data: {
            roleComboQueryMode: 'remote'
        }
    },

    items: [{
        flex: 1,
        xtype: 'form',
        reference: 'form',
        modelValidation: true,
        defaults: {
            labelAlign: 'left',
            margin: 10,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'textfield',
            name: 'id',
            fieldLabel: '英雄id',
            hidden: true,
            bind: '{theHero.id}'
        },{
            xtype: 'textfield',
            name: 'localizedName',
            fieldLabel: '英雄名称',
            bind: '{theHero.localizedName}'
        }]
    }],
    buttons: [{
        text: '确定',
        handler: 'editHero'
    }, {
        text: '取消',
        handler: 'closeWindow'
    }]
});
