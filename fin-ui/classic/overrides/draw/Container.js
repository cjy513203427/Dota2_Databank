/**
 * Created by jonnyLee on 2016.10.10.
 */
Ext.define('Admin.overrides.draw.Container', {
    override: 'Ext.draw.Container',

    /**
     * 默认下载地址修改为本地服务器
     */
    defaultDownloadServerUrl: Common.Config.requestPath('Img', 'Chart', 'download')

});
