Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',



    data: {
        currentView: null,
        mainTree: {
            fields: [{
                name: 'text'
            }],
            root: {
                expanded: true,
                children: [{
                    text: '首页',
                    iconCls: 'x-fa fa-desktop',
                    rowCls: 'nav-tree-badge nav-tree-badge-new',
                    url: 'dashboard',
                    leaf: true
                }, {
                    text: '订单记录',
                    iconCls: 'x-fa fa-send',
                    rowCls: 'nav-tree-badge nav-tree-badge-hot',
                    url: 'trades',
                    leaf: true,
                    checked: false
                }, {
                    text: '系统管理',
                    iconCls: 'x-fa fa-plus-square',
                    rowCls: 'nav-tree-badge',
                    expanded: false,
                    selectable: false,
                    children: [{
                        text: '用户管理',
                        iconCls: 'x-fa fa-user',
                        rowCls: 'nav-tree-badge',
                        url: 'user',
                        leaf: true
                    }, {
                        text: '角色管理',
                        iconCls: 'x-fa fa-users',
                        rowCls: 'nav-tree-badge',
                        url: 'role',
                        leaf: true
                    }]
                }
                ]
            }

        }

    }
});
