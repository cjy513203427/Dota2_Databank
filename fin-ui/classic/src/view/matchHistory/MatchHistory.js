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
            items: [],
            hidden:true
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
            dataIndex: 'duration',
            renderer:function (value) {
                 return Math.floor(value/60)+"分"+(value%60/100).toFixed(2).slice(-2)+"秒";
            }
        }, {
            text: "赛前准备时间",
            dataIndex: 'pre_game_duration',
            renderer:function (value) {
                return Math.floor(value/60)+"分"+(value%60/100).toFixed(2).slice(-2)+"秒";
            }
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
            dataIndex: 'tower_status_radiant',
            hidden:true
        }, {
            text: "夜魇塔",
            dataIndex: 'tower_status_dire',
            hidden:true
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
            dataIndex: 'first_blood_time',
            renderer:function (value) {
                return Math.floor(value/60)+"分"+(value%60/100).toFixed(2).slice(-2)+"秒";
            }
        }, {
            text: "游戏种类",
            dataIndex: 'lobby_type',
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
            dataIndex: 'game_mode',
            renderer: function (status) {
                if (status == 0) {
                    return "无";
                } else if (status == 1) {
                    return "全英雄选择";
                } else if (status == 2) {
                    return "队长模式";
                }else if (status == 3) {
                    return "随机征召";
                }else if (status == 4) {
                    return "单一征召";
                }else if (status == 5) {
                    return "全英雄随机选择";
                }else if (status == 6) {
                    return "Intro";
                }else if (status == 7) {
                    return "Diretide";
                }else if (status == 8) {
                    return "反队长模式";
                }else if (status == 9) {
                    return "贪婪模式";
                }else if (status == 10) {
                    return "指导模式";
                }else if (status == 11) {
                    return "中路对单";
                }else if (status == 12) {
                    return "最少选择";
                }else if (status == 13) {
                    return "生疏模式";
                }else if (status == 14) {
                    return "Compendium Matchmaking";
                }else if (status == 15) {
                    return "机器人合作模式";
                }else if (status == 16) {
                    return "队长征召";
                }else if (status == 18) {
                    return "技能征召";
                }else if (status == 19) {
                    return "反队长模式";
                }else if (status == 20) {
                    return "全随机死亡征召";
                }else if (status == 21) {
                    return "1v1中路对单";
                }else if (status == 22) {
                    return "天梯匹配";
                }else if (status == 23) {
                    return "加速模式";
                }

            }
        }, {
            text: "引擎",
            dataIndex: 'engine',
            renderer:function (value) {
                if(value == 1){
                    return 'Source 1'
                }else if(value == 2){
                    return 'Source 2'
                }
            }
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