Ext.define('Overrides.data.request.Ajax', {
    override: 'Ext.data.request.Ajax',


    /**
     * To be called when the request has come back from the server
     * @param {Object} request
     * @return {Object} The response
     * @private
     */
    onComplete: function (xdrResult) {
        var me = this,
            owner = me.owner,
            options = me.options,
            xhr = me.xhr,
            failure = {success: false, isException: false},
            result, success, response;

        if (!xhr || me.destroyed) {
            return me.result = failure;
        }

        try {
            result = Ext.data.request.Ajax.parseStatus(xhr.status);

            if (result.success) {
                // This is quite difficult to reproduce, however if we abort a request
                // just before it returns from the server, occasionally the status will be
                // returned correctly but the request is still yet to be complete.
                result.success = xhr.readyState === 4;
            }
        }
        catch (e) {
            // In some browsers we can't access the status if the readyState is not 4,
            // so the request has failed
            result = failure;
        }

        success = me.success = (me.isXdr ? xdrResult : result.success) || options.success;

        if (success) {
            response = me.createResponse(xhr);

            owner.fireEvent('requestcomplete', owner, response, options);
            //start code by jonnyLee 全局错误处理
            if (response.status === 200) {
                var res = Ext.decode(response.responseText), flag = true;
                if(res.code === '10000') {     // 重新登陆
                    Common.Config.storage.removeItem(Common.Config.LOGINFLAG);
                    Ext.Msg.alert('温馨提示', '登录信息失效，重新登录', function () {
                        window.location.href = window.location.origin+window.location.search;
                    });
                    flag = false;
                } else if(res.code === '50000') {
                    Ext.Msg.alert('温馨提示', '服务器连接失败');
                    flag = false;
                }else if(res.code === '40002') {
                    Ext.Msg.alert('温馨提示', res.message);
                    flag = false;
                }
                if (flag) {
                    res.success = true;         // add success for form submit response json format
                    response.responseText = Ext.encode(res);
                    Ext.callback(options.success, options.scope, [response, options]);
                }
            } else {
                // Ext.callback(options.success, options.scope, [response, options]);
                //验证办公室的登录
                if(options.url.indexOf("validateLogin")<=0){
                    Ext.Msg.alert('温馨提示', '服务器连接失败');
                }
            }
            //end
        } else {
            if (result.isException || me.aborted || me.timedout) {
                response = me.createException(xhr);
            }
            else {
                response = me.createResponse(xhr);
            }

            owner.fireEvent('requestexception', owner, response, options);
            Ext.callback(options.failure, options.scope, [response, options]);
        }

        me.result = response;

        Ext.callback(options.callback, options.scope, [options, success, response]);

        owner.onRequestComplete(me);

        //me.callParent([xdrResult]);           don't call parent

        return response;
    }


});