Ext.define('Common.util.Util', {

    xtype: 'util',

    statics: {

        /**
         * 监听ajax 事件
         */
        ajaxIntercepters: function () {
            //开始加载  返回false停止加载
            Ext.Ajax.on('beforerequest',
                function (conn, options, eOpts) {
                    /*if (!Ext.getBody().isMasked()) {
                     Ext.getBody().mask('请求中...');
                     }*/
                    conn.setTimeout(Common.Config.ajaxTimeout);
                    if(Common.util.Util.env() === 'dev') {
                        options.withCredentials = true;     //跨域请求  session
                    }
                    /*options.headers = options.headers || {};
                     if (options.method = 'POST') {
                     options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                     }*/
                    /*options.jsonData = options.params || {};

                     Ext.apply(options.headers, {
                     'Source-Type': Common.util.Config._sourceType
                     });
                     options.jsonData = options.params || {};
                     options.params = {};
                     // url 填充参数
                     if (options.jsonData) {
                     options.url = new Ext.Template(options.url).apply(options.jsonData);
                     }
                     if (Common.util.Config.token && options.jsonData) {
                     options.jsonData.tokens = Common.util.Config.token;
                     //给所有ajax添加token  如果登录了的话
                     //options.url = Ext.String.urlAppend(options.url, 'tokens=' + config.token);
                     }*/
                });

            //加载成功  无法阻止成功回调    要阻止成功回掉 修改 Overrides.form.action.Submit.onSuccess
            Ext.Ajax.on('requestcomplete',
                function (conn, options, eOpts) {   //you can add more code here
                    /*if (Ext.getBody().isMasked()) {
                     Ext.getBody().unmask();
                     }*/
                });

            //加载失败  无法阻止失败回调
            Ext.Ajax.on('requestexception',
                function (conn, options, eOpts) {
                    /*if (Ext.getBody().isMasked()) {
                     Ext.getBody().unmask();
                     }*/
                    if (options.status == 403) {
                        Ext.Msg.alert('温馨提示', '浏览器禁止访问');
                    } else if (options.status == 404) {
                        Ext.Msg.alert('温馨提示', '您访问的页面不存在');
                    } else if (options.status == 500) {
                        Ext.Msg.alert('温馨提示', '服务器内部错误!');
                    } else {
                        Ext.Msg.alert('温馨提示', '请求失败，请稍后再试!');
                    }
                });
        },

        /**
         * 消息提示
         * @param content
         */
        toast: function (content) {
            Ext.create('Ext.window.Toast',{
                html: '<p style="text-align: center">'+content+'</p>',
                width: 300,
                align: 'br'
            }).show();
        },


        /**
         * 通用ajax
         * @param cfg
         * @param successFn
         * @param failureFn
         */
        doAjax: function (cfg, successFn, failureFn) {
            var doCfg = {
                url: cfg.url,
                method: cfg.method || 'post',
                params: cfg.params || {},
                callback: cfg.callback || undefined,
                async: cfg.async === false ? false : true,
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.code === '0') {
                        if (successFn) {
                            successFn(obj);
                        }
                    } else {
                        Ext.Msg.alert('温馨提示', obj.message);
                    }
                },
                failure: function (response, opts) {
                    if (failureFn) {
                        doCfg.failure = failureFn;
                    }
                    Ext.Msg.alert('温馨提示', '请求失败，请稍后再试.');
                    console.error('server-side failure with status code ' + response.status);
                }
            };

            Ext.Ajax.request(doCfg);
        },

        /**
         * 判断是否开发环境 动态加载配置信息
         * @returns {String}
         */
        env: function () {
            var search = window.location.search;
            if (search.indexOf('dev') > 0) {
                return 'dev';
            } else if(search.indexOf('test') > 0) {
                return 'test';
            }
          return 'prod';
        },


        //初始化
        inIt: function () {
            //ajax 监听器
            this.ajaxIntercepters();
        }
    }
});