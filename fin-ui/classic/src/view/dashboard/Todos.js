Ext.define('Admin.view.dashboard.Todos', {
    extend: 'Ext.panel.Panel',
    xtype: 'todo',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    cls: 'todo-list shadow-panel',

    title: 'Dota2资料库管理平台介绍',
    height: 320,
    bodyPadding: 15,
    layout: 'fit',
    items: [
        {
            xtype: 'gridpanel',
            cls: 'dashboard-todo-list',
            header: false,
            hideHeaders: true,
            scroll: 'none',
            bind: {
                store: '{todos}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'task',
                    text: 'Task',
                    flex: 1
                }
            ]
        }
    ]
});
