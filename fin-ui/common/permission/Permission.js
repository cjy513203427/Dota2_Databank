Ext.define('Common.permission.Permission', {

    xtype: 'permission',

    statics: {
        /**
         * [登录标识(false:未登陆,true:已登陆)]
         * @cfg {Boolean}
         */
        loginFlag: false,

        authPage: {		// 需要进行登录验证的配置
            
        },

        /**
         * [权限  首次登录时候赋值]
         * @cfg {Array} permcollections
         */
        server_permcollections: null,

        /**
         * [权限控制]
         * @param  {[String]}  action    权限标识        action为此类的static属性
         * @return {Boolean}   true:有权限<br> false:无权限
         */
        hasPermission: function (action) {
            if(action && Common.permission.Permission.server_permcollections) {
                var hasperm = false;
                for (var i = 0; i < Common.permission.Permission.server_permcollections.length; i++) {
                    if(action.indexOf(Common.permission.Permission.server_permcollections[i].text) > -1) {
                        hasperm = true;
                    }
                }
                return hasperm;
            }
            return false;
        },

        /**
         * [此处添加权限]
         *
         * example:
         *
         *    USER:{
         *    		create: 'user.create',
         *    		delete: 'user.delete',
         *    		update: 'user.update',
         *    		query: 'user.query'
         *    }
         *
         *
         */
        permcollections: {
        	/*	用户 	*/
        	USER: {
        		query: 'user.query',	                //人员查询
        		update: 'user.update',                  //人员修改
        		del: 'user.delete',                     //人员删除
        		create: 'user.create',                  //人员创建
        		roleadjust:'user.roleadjust'            //人员角色调整
        	},
        	/*	角色类型 	*/
        	ROLETYPE: {
        		query: 'roleType.query',	             //角色类型查询
        		update: 'roleType.update',               //角色类型修改
        		del: 'roleType.delete',                  //角色类型删除
        		create: 'roleType.create'                //角色类型创建
        	},
        	/*	角色	*/
        	ROLE: {
        		query: 'role.query',	                 //角色查询
        		update: 'role.update',                   //角色修改
        		del: 'role.delete',                      //角色删除
        		create: 'role.create'                    //角色创建
        	}
        }
    }
});
