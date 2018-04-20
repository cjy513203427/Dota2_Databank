Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Admin.view.authentication.Login',
        'Admin.view.main.Main',
        'Common.Config',
        'Ext.container.Viewport'
    ],

    name: 'Admin',

    stores: [
        'Base',
        'NavigationTree',

        /* 用户管理 */
        'users.User',

        /*角色管理*/
        'roles.Role',
        'users.RoleType',

        /*资源 (权限菜单)*/
        'resources.Resource',
        'resources.Menu',
        'resources.Permission',
        'picture.Picture',
        'picture.PictureInfo',
        /*效果图类目*/
        'pictureType.PictureType',
        /*精选效果图*/
        'pictureHandpick.PictureHandpick',
        'pictureHandpick.PictureHandpickInfo',

        /*品牌申请*/
        'brandApproval.BrandApproval',
        /*品牌*/
        'brand.Brand',
        /*用户品牌*/
        'brand.UserBrand',

        /*商品(图片)*/
        'photo.Photo',
        /*历史版本商品*/
        'historyPhoto.HistoryPhoto',
        /*商品树状*/
        'photoArborescence.PhotoArborescence',
        /*英雄管理*/
        'hero.Hero',
        /*物品管理*/
        'item.Item',
        /*天赋管理*/
        'talent.Talent',
        /*战绩信息*/
        'matchHistory.MatchHistory',
        'matchDetail.MatchDetail'
    ],

    // defaultToken : 'dashboard',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    // mainView: 'Admin.view.main.Main',

    launch: function () {
        Common.Config.inIt();
                Ext.create('Ext.container.Viewport', {
                    items: {
                        xtype: 'login'
                    }
                });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('应用更新', '有新版本发布, 重新加载?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
