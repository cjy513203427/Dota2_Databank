/**
 * Created by hasee on 2018/4/19.
 * MatchHistory包含了MatchDetail
 */
Ext.define('Admin.view.matchHistory.MatchHistory', {
    extend: 'Ext.Panel',
    xtype: 'matchHistory',
    title: '战绩信息',
    requires: [
        'Admin.view.matchHistory.MatchHistoryController',
        'Ext.button.Button',
        'Ext.form.field.Date'
    ],
    controller: "matchHistory",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    frame:true,

    items: [{
        xtype: 'form',
        reference: 'form',
        defaultButton: 'btn_search',
        layout: 'column',
        defaults: {
            labelAlign: 'right'
        },
        items: [{
            xtype: 'datefield',
            name: 'startTime',
            reference:'startTime',
            hidden:true,
            fieldLabel: '起始时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        }, {
            xtype: 'datefield',
            name: 'endTime',
            reference:'endTime',
            hidden:true,
            fieldLabel: '结束时间',
            margin: '15px 0px 0px 0px',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        },{
            xtype: 'textfield',
            reference: 'account_id',
            fieldLabel: 'SteamId',
            margin: '15px 0px 0px 0px',
            name: 'account_id'
        }]
    }, {
        xtype: 'grid',
        sortableColumns: true,
        reference: 'grid',
        flex: 1,
        store: 'matchHistory.MatchHistory',
        columns: [{
            xtype: 'rownumberer'
        },{
            text: '比赛id',
            dataIndex: 'match_id',
            width: 150
        },{
            text: '比赛序列号',
            dataIndex: 'match_seq_num',
            width: 150
        },{
            text: '开始时间',
            dataIndex: 'string_start_time',
            width: 150
        },{
            text: '比赛类型',
            dataIndex: 'lobby_type',
            width: 150,
            renderer: function (status) {
                if (status == 0) {
                    return "全英雄匹配";
                } else if (status == 1) {
                    return "练习模式";
                } else if (status == 2) {
                    return "联赛";
                }else if (status == 3) {
                    return "指导赛";
                }else if (status == 4) {
                    return "机器人合作模式";
                }else if (status == 5) {
                    return "小队匹配";
                }else if (status == 6) {
                    return "Solo";
                }else if (status == 7) {
                    return "天梯匹配";
                }else if (status == 8) {
                    return "1v1中路对单";
                }

            }
        },{
            text: '操作',
            xtype: 'actioncolumn',
            width: 100,
            items: []
        }],
        selModel: {
            selType: 'checkboxmodel'
        },
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: '查询',
                iconCls: 'fa fa-search',
                reference: 'btn_search',
                handler: 'search'
            }, {
                text: '清空条件',
                iconCls: 'fa fa-search',
                listeners: {
                    click: 'reset'
                }
            }]
        }],
        listeners: {
            beforerender: 'gridBeforeRender',
            render: 'search',
            itemdblclick: 'dblclickSelected'
        }
    },{
        xtype: 'grid',
        flex: 1,
        title: '比赛信息',
        reference: 'gridDetail',
        store: 'matchDetail.MatchDetail',
        columnLines: true,
        selModel: {
            type: 'checkboxmodel',
            checkOnly: true
        },

        columns: [{
            text: "天辉方赢",
            dataIndex: 'radiant_win'
        }, {
            text: "持续时间",
            dataIndex: 'duration'
        }, {
            text: "赛前准备时间",
            dataIndex: 'pre_game_duration'
        }, {
            text: "开始时间",
            dataIndex: 'string_start_time',
            formatter: 'date("m/d/Y")'
        }, {
            text: "比赛id",
            dataIndex: 'match_id'
        }, {
            text: "比赛序列号",
            dataIndex: 'match_seq_num'
        }, {
            text: "天辉塔",
            dataIndex: 'tower_status_radiant'
        }, {
            text: "夜魇塔",
            dataIndex: 'tower_status_dire'
        }, {
            text: "天辉兵营",
            dataIndex: 'barracks_status_radiant'
        }, {
            text: "夜魇兵营",
            dataIndex: 'barracks_status_dire'
        }, {
            text: "小兵数量",
            dataIndex: 'cluster'
        }, {
            text: "一血时间",
            dataIndex: 'first_blood_time'
        }, {
            text: "游戏种类",
            dataIndex: 'lobby_type'
        }, {
            text: "人类玩家",
            dataIndex: 'human_players'
        }, {
            text: "举报数",
            dataIndex: 'positive_votes'
        }, {
            text: "称赞数",
            dataIndex: 'negative_votes'
        }, {
            text: "游戏模式",
            dataIndex: 'game_mode'
        }, {
            text: "引擎",
            dataIndex: 'engine'
        }, {
            text: "天辉积分",
            dataIndex: 'radiant_score'
        }, {
            text: "夜魇积分",
            dataIndex: 'dire_score'
        }],
        listeners: {
            beforerender: 'gridBeforeRenderDetail',
            itemdblclick: 'dblclickWindow'
        }
    }]
});