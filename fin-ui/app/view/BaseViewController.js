/**
 * Created by Administrator on 2016/8/17.
 */
Ext.define('Admin.view.BaseViewController', {
    extend: 'Ext.app.ViewController',

    xtype: 'controller.base',

    requires: [
        'Common.Config',
        'Common.util.Util'
    ],

    config: {
        /*
        Uncomment to add references to view components
        refs: [{
            ref: 'list',
            selector: 'grid'
        }],
        */

        /*
        Uncomment to listen for events from view components
        control: {
            'useredit button[action=save]': {
                click: 'updateUser'
            }
        }
        */
    },

    /**
     * Called when the view is created
     */
    init: function() {

    }
});