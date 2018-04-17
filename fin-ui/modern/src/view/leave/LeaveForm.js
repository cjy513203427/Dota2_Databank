Ext.define('Admin.view.leave.LeaveForm', {
    extend: 'Ext.form.Panel',
    xtype: 'leaveform',
    cls: 'wizardform',

    requires: [
        'Ext.field.Text'
    ],

    title: '请假申请',
    bodyPadding: '0 20 10 20',
    defaults: {
        margin: '0 0 10 0'
    },

    items: [{
        xtype: 'textfield',
        placeholder: '标题',
        required: true
    }, {
        xtype: 'combobox',
        placeholder: '请假类型',
        store:{
            data: [{
                label: '调休', value: 1
            }, {
                label: '事假', value: 2
            }]
        },
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        required: true,
        itemTpl: '<div data-qalign="b-t" data-qanchor="true" data-qtip="{label}">{label}</div>'
    },{
        xtype: 'datepickerfield',
        destroyPickerOnHide: true,
        name: 'startDate',
        placeholder: '开始时间',
        dateFormat:'Y-m-d',
        value: new Date(),
        required: true,
        edgePicker: {
            yearFrom: 2010
        }
    },{
        xtype: 'datepickerfield',
        destroyPickerOnHide: true,
        name: 'endDate',
        dateFormat:'Y-m-d',
        placeholder: '结束时间',
        required: true,
        value: new Date(),
        edgePicker: {
            yearFrom: 2010
        }
    }, {
        xtype: 'textareafield',
        placeholder: '请假原因',
        required: true
    }],
    buttons: [{
        text: '提交',
        handler: 'onResetTap'
    }],
});