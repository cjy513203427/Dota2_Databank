Ext.define('Common.Config', {

    xtype: 'config',

    requires: [
        'Ext.util.LocalStorage',
        'Common.util.Util'
    ],

    statics: {
        ajaxTimeout: 15 * 60 * 1000, // ajax请求超时事件 minute * 60 * 1000
        user: {}, //存储用户信息的全局变量
        IMAGE_ADDRESS:'',
        storage: new Ext.util.LocalStorage({id: 'financial'}),      //localstorage

        LOGINFLAG: 'loginFlag',

        _dev_serverUrl: 'http://127.0.0.1:8004/rest/',

        _serverUrl: 'http://106.14.213.208:8889/rest/',

        _test_serverUrl: 'http://172.29.164.119:8889/rest/',

        /*******业务参数   配置 *******/
        success_code: '0',        //成功返回码
        pageSize: 20, // 分页大小设定
        sourceType: 'YWXT',      //暂时没有使用
        business_name:'Dota2资料库',//企业名称
        business_css:'background-color:white;color: #4E4E4E;font-size: 22px',
        business_image_css:'width:65px;height:53px;',
        serverPaths: {
            /*  安全 */
            Security: {
                Authentic: {
                    login: 'index/login',     //登录
                    logout: 'index/logout',     //退出
                    state:'index/generateStateCode',
                    menuList: 'authentic/menuList'
                },
                Permission: {
                    read: 'security/permission/list'
                },
                Menu: {
                    read: 'security/menu/list'
                },
                Role: {
                    read: '~api/user/role'
                }
            },
            Picture:{
                list:'picture/list',
                info:'picture/info'
            },

            /*  系统管理 */
            System: {
                Roles: {
                    read: 'role/list',
                    create: 'role/create',
                    update: 'role/update',
                    disable: 'role/disable',
                    active: 'role/active'
                },
                Users: {
                    read: 'user/list',
                    create: 'user/create',
                    update: 'user/update',
                    disable: 'user/disable',
                    active: 'user/active',
                    info: 'user',
                    resetpassword: 'user/resetpassword',
                    modifypassword: 'user/modifypassword',
                    getUserRole:'user/getUserRole',
                    updateUserRole:'user/updateUserRole',
                    getWeather:'user/getWeather',
                    validateLogin:'user/validateLogin'
                },
                Resources: {
                    treelist: 'resource/treelist',
                    menu: 'resource/menu',
                    button: 'resource/button',
                    insert: 'resource/insert',
                    update: 'resource/update',
                    delete: 'resource/delete'
                }
            },Img: {
                Chart: {
                    download: 'img/chart/download'
                }
            },
            PictureType:{
                picturelist:'picturetype/picturelist',
                updatePicture:'picturetype/updatePicture',
                insertPicture:'picturetype/insertPicture'
            },
            PictureHandpick:{
                insertPictureHandpick:'picturehandpick/insertPictureHandpick',
                selectPictureHandpickByorderNumber:'picturehandpick/selectPictureHandpickByorderNumber',
                pictureList:'picturehandpick/list',
                deletePictureHandpick:'picturehandpick/deletePictureHandpick'
            },
            Brand:{
                approveBrandApplication: 'brand/approveBrandApplication',
                queryUserBrandNotAllowed: 'brand/queryUserBrandNotAllowed',
                queryAllBrand: 'brand/queryAllBrand',
                queryUserBrand: 'brand/queryUserBrand',
                getUserBrand: 'brand/getUserBrand',
                updateUserBrand: 'brand/updateUserBrand',
                deleteBrand: 'brand/deleteBrand',
                addBrand: 'brand/addBrand',
                modifyBrand: 'brand/modifyBrand',
                modifyBrandId: 'brand/modifyBrandId'
            },
            Photo:{
                queryPhoto: 'photo/queryPhoto',
                queryHistoryPhoto: 'photo/queryHistoryPhoto',
                deletePhoto: 'photo/deletePhoto',
                queryPhotoArborescence: 'photo/queryPhotoArborescence',
                addPhoto: 'photo/addPhoto',
                modifyPhoto: 'photo/modifyPhoto',
                insertPhotoArborescence: 'photo/insertPhotoArborescence',
                updatePhotoArborescence: 'photo/updatePhotoArborescence'
            },
            Excel:{
                uploadServerExcel: 'excelserver/uploadExcel',
                uploadLocalExcel: 'excellocal/uploadExcel'
            },
            PictureUpload:{
                uploadLocalPicture: 'picturelocal/uploadLocalPicture'
            },
            CAD:{
                uploadLocalCAD: 'cadlocal/uploadLocalCAD'
            },
            SystemConfig:{
                uploadConfigurationFile: 'configurationFileServer/uploadConfigurationFile'
            },
            Cover:{
                uploadCover:'coverServer/uploadCover'
            },
            Hero:{
                queryHero:'hero/queryHero'
            },
            Item:{
                queryItem:'item/queryItem',
                getItemById:'item/getItemById'
            },
            Talent:{
                queryTalent:'talent/queryTalent'
            },
            Match:{
                getMatchHistory:'match/getMatchHistory',
                getMatchDetail:'match/getMatchDetail',
                getMatchDetailPlayers:'match/getMatchDetailPlayers'
            }

        },

        /**
         * request path config
         */
        requestPath: function (module, cmodule, method) {
            var path = null;
            try {
                if (arguments.length === 2) {
                    path = Common.Config.serverPaths[module][cmodule];
                } else if (arguments.length === 3) {
                    path = Common.Config.serverPaths[module][cmodule][method];
                } else {
                    console.error(Ext.String.format("you should sepcial module={0}, [cmodule={1}] method={2} in config.js ", module, cmodule, method));
                }
            } catch (ex) {
                console.error(Ext.String.format("you should sepcial module={0}, [cmodule={1}] method={2} in config.js ", module, cmodule, method));
            }
            if (!path) {
                console.error(Ext.String.format('error Path: {0},  module={1}, cmodule={2}, method={3}  ' + path, module, cmodule, method));
            }
            if (Common.util.Util.env() === 'dev') {
                return Common.Config._dev_serverUrl + path;
            } else if (Common.util.Util.env() === 'test') {
                return Common.Config._test_serverUrl + path;
            } else {
                return Common.Config._serverUrl + path;
            }
        },


        // app初始化执行
        inIt: function () {
            Common.util.Util.inIt();
        }
    }
});