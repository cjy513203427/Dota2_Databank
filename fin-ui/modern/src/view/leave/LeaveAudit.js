Ext.define('Admin.view.leave.LeaveAudit', {
    extend: 'Ext.tab.Panel',
    xtype:'leaveaudit',

    activeTab: 0,
    items: [{
        title: '待审批',
        xtype: 'container',
        layout:'vbox',
        items: [{
            xtype: 'leavelist',
            hideHeaders: true
        }]
    },{
        title: '已审批',
        xtype: 'container',
        layout: 'vbox',
        items: [{
            xtype: 'leavelist',
            hideHeaders: true
        }]
    }]
});
