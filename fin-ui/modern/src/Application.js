/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',

    name: 'Admin',

    requires: [
        'Admin.view.authentication.Login',
        'Admin.view.main.Main',
        'Common.Config',
    ],

    profiles: [
        'Phone',
        'Tablet'
    ],
    stores: [
        'NavigationTree'
    ],
    launch: function () {
        Common.Config.inIt();
        Ext.Ajax.request({
            url: Common.Config.requestPath('DingDing', 'getDingDingConfig'),
            method: 'GET',
            async: false,
            success: function (response, opts) {
                var result = Ext.decode(response.responseText);
                var _config=result.data;
                dd.config({
                    agentId : _config.agentid,
                    corpId : _config.corpId,
                    timeStamp : _config.timeStamp,
                    nonceStr : _config.nonceStr,
                    signature : _config.signature,
                    jsApiList : [ 'runtime.info', 'biz.contact.choose',
                        'device.notification.confirm', 'device.notification.alert',
                        'device.notification.prompt', 'biz.ding.post',
                        'biz.util.openLink' ]
                });
                dd.runtime.permission.requestAuthCode({
                    corpId: _config.corpId,
                    onSuccess: function (info) {
                        alert(info.code);
                        Ext.Ajax.request({
                            url: Common.Config.requestPath('DingDing', 'dingLogin'),
                            method: 'GET',
                            async: false,
                            params:{
                                code:info.code,
                                corpid:_config.corpId
                            },
                            success: function (response, opts) {
                                var user = Ext.decode(response.responseText);
                                //登录成功
                                if(user.code==0){
                                    Common.Config.storage.setItem(Common.Config.LOGINFLAG, 'true');
                                    Common.Config.user=user.data;
                                    Ext.Viewport.add({
                                        xtype: 'main'
                                    });
                                   /* Ext.route.Router.onStateChange("dashboard");*/
                                }else{
                                    Ext.Viewport.add({
                                        xtype: 'pageLogin'
                                    });
                                }
                            }
                        });
                    }, onFail:function(err){
                        alert(JSON.stringify(err));
                    }
                }
                );
            }
        });
       return true;
    }
});
