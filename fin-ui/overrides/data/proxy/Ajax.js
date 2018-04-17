/**
 * Created by Administrator on 2016/8/18.
 */
Ext.define('Overrides.data.proxy.Ajax', {
    override: 'Ext.data.proxy.Ajax',

    /**
     * @cfg {String} [pageParam="page"]
     * The name of the 'page' parameter to send in a request. Defaults to 'page'. Set this to `''` if you don't
     * want to send a page parameter.
     */
    pageParam: 'pageIndex',

    /**
     * @cfg {String} [limitParam="limit"]
     * The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this to `''` if you don't
     * want to send a limit parameter.
     */
    limitParam: 'pageSize'
});