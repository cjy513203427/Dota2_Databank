/**
 * Creates an HTML file input field on the page. This is usually used to upload files to remote server. File fields are usually
 * created inside a form like this:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'My Uploader',
 *                 items: [
 *                     {
 *                         xtype: 'filefield',
 *                         label: "MyPhoto:",
 *                         name: 'photo',
 *                         accept: 'image'
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 */
Ext.define('Ext.field.File', {
    extend: 'Ext.field.Text',
    xtype: 'filefield',

    mixins: [
        'Ext.mixin.ConfigProxy'
    ],

    /**
     * @private
     */
    isFile: true,

    proxyConfigs: {
        fileButton: [
            /**
             * @cfg multiple
             * @inheritdoc Ext.field.FileButton#multiple
             */
            'multiple',

            /**
             * @cfg accept
             * @inheritdoc Ext.field.FileButton#accept
             */
            'accept',

            /**
             * @cfg capture
             * @inheritdoc Ext.field.FileButton#capture
             */
            'capture'
        ]
    },

    readOnly: true,
    editable: false,
    focusable: false,
    inputTabIndex: -1,

    triggers: {
        file: {
            type: 'file'
        }
    },

    classCls: Ext.baseCSSPrefix + 'filefield',

    captureLookup: {
        video: "camcorder",
        image: "camera",
        audio: "microphone"
    },

    onChange: function(me, value, startValue) {
        me.fireEvent('change', this, value, startValue);
    },

    applyName: function (value) {
        var multiple = this.getFileButton().getMultiple();
        if (multiple && value.substr(-2, 2) !== "[]") {
            value += "[]";
        } else if ((!multiple) && value.substr(-2, 2) === "[]") {
            value = value.substr(0, value.length - 2)
        }

        return value;
    },

    updateMultiple: function () {
        var name = this.getName();
        if (!Ext.isEmpty(name)) {
            this.setName(name);
        }
    },

    updateTriggers: function(triggers, oldTriggers) {
        this.callParent([triggers, oldTriggers]);
        this.getFileButton().on('change', 'onFileButtonChange', this);
    },

    updateValue: function(value, oldValue) {
        this.callParent([value, oldValue]);

        this.getFileButton().setValue(value);
    },

    getFileButton: function() {
        return this.getTriggers().file.getComponent();
    },

    /**
     * Returns the field files.
     * @return {FileList} List of the files selected.
     */
    getFiles: function () {
        return this.getFileButton().getFiles();
    },

    privates: {
        onFileButtonChange: function(fileButton, value) {
            this.setValue(value);
        }
    }
});
