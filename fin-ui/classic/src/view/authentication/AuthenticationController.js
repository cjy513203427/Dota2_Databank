Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    onLoginButton: function(btn) {
        var me = this;
        var form = btn.up('form');
         if(form.isValid()) {
            /* Ext.getBody().mask('正在验证...');
             /!*Ext.Ajax.request({
                 url:  Common.Config._model_serverUrl+"model_validateLogin.action",
                 method: 'get',
                 timeout : 2000,
                 success: function (response, opts) {
                     Ext.getBody().unmask();
                     var obj = Ext.decode(response.responseText);
                     //办公室的验证代码
                     form.form.findField('roomcode').setValue(obj.msg);
                     me.goLogin(form,me);
                 },
                 callback:function(){
                     Ext.getBody().unmask();
                     me.goLogin(form,me);
                 },
                 failure:function(){
                     Ext.getBody().unmask();
                     me.goLogin(form,me);
                 }
             });*!/*/
             me.goLogin(form,me);
         }
    },
    /*onQQLogin:function () {
        if (window.state) {
            location.href = "https://openapi.b.qq.com/oauth2/authorize"
                + "?app_id=201050985&oauth_version=2&response_type=code&redirect_uri="
                + "http://120.27.225.238/rest/index/qqLogin"
                + "&ui=web&state=" + window.state;
        } else {
            Ext.Msg.alert('温馨提示', '企业QQ参数获取失败，请稍后再试');
        }
    },*/
    goLogin:function(form,me){
        form.submit({
            url: Common.Config.requestPath('Security','Authentic', 'login'),
            waitMsg: '请求中...',
            success: function (form, action) {
                var result = action.result;
                if (result.code != Common.Config.success_code) {
                    Ext.Msg.alert('温馨提示', result.message);
                    return false;
                }
                // 成功登陆
                Common.Config.storage.setItem(Common.Config.LOGINFLAG, 'true');
                var viewport = me.view.up('viewport');
                viewport.destroy();
                Ext.create('Ext.container.Viewport', {
                    items: {
                        xtype: 'main'
                    }
                });
                Ext.util.History.setHash('admindashboard');
            }
        });
    }

});