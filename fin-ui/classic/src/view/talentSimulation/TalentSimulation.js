/**
 * Created by hasee on 2018/4/25.
 */
Ext.define('Admin.view.talentSimulation.TalentSimulation', {
    extend: 'Ext.Panel',
    xtype: 'talentSimulation',

    title: '物品模拟',

    requires: [
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

    //controller: 'cadmultiuploadform',



    items: [{
        xtype: 'panel',
        autoScroll:false,
        width:'100%',
        height:'100%',
        html:'<iframe frameborder=0 width=100% height=100% frameborder=0 src="http://127.0.0.1:8889/Talents.html">' +
        '</iframe>'
    }]

});