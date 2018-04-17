/**
 * Created by hasee on 2018/1/2.
 */
Ext.define('Admin.view.tree.TreeGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'tree-grid',
    controller: 'tree-grid',

    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.grid.column.Check'
    ],

    title: 'Core Team Projects',
    width: 600,
    height: 370,

    reserveScrollbar: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,

    store: {
        type: 'tree',
        model: 'Admin.model.tree.Task',
        folderSort: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/tree/treegrid.json'
        }
    },

    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Task',
        dataIndex: 'task',

        flex: 2,
        sortable: true
    }, {
        text: 'Duration',
        dataIndex: 'duration',

        flex: 1,
        sortable: true,
        align: 'center',
        formatter: 'this.formatHours'
    },{
        text: 'Assigned To',
        dataIndex: 'user',

        flex: 1,
        sortable: true
    }, {
        xtype: 'checkcolumn',
        header: 'Done',
        dataIndex: 'done',

        width: 55,
        stopSelection: false,
        menuDisabled: true
    }, {
        xtype: 'actioncolumn',
        text: 'Edit',

        width: 55,
        menuDisabled: true,
        tooltip: 'Edit task',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'onEditRowAction',
        isActionDisabled: 'isRowEditDisabled'
    }]
});