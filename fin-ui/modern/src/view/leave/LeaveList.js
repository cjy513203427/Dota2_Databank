Ext.define('Admin.view.leave.LeaveList', {
    extend: 'Ext.dataview.DataView',
    // xtype is assigned by the phone profile
    xtype:'leavelist',
    store: {
        data: [{
            workno: '表现师223',type:'年假',title:'今天想休息了，请求审批', createDate: '2017-05-15'
        }, {
            workno: '表现师004',type:'病假',title:'昨天想休息了，请求审批', createDate: '2017-05-16'
        }]
    },
    itemTpl:
        '<div class="inbox-item">'+
            '<div class="inbox-inner-row inbox-{read:pick(\'unread\',\'read\')}">'+
                '<div class="list-cls inbox-from">{workno}</div>'+
                '<div class="inbox-date">'+
                    '<tpl if="has_attachments">'+
                        '<span class="x-fa fa-paperclip inbox-attachment"></span>'+
                    '</tpl>'+
                    '{createDate:date("y年m月d日")}'+
                '</div>'+
            '</div>'+
            '<div class="inbox-inner-row">'+
                '<div class="inbox-summary">{title}</div>'+
                '<div class="inbox-favorite">'+
                    '<span>{type}</span>'+
                '</div>'+
            '</div>' +
        '</div>'
});
