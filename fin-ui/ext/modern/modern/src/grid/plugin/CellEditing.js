/**
 * The Cell Editing plugin utilizes an `Ext.Editor` to provide inline cell editing for
 * grid cells.
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         fields: ['fname', 'lname', 'talent'],
 *         data: [
 *             { 'fname': 'Barry',  'lname': 'Allen', 'talent': 'Speedster'},
 *             { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery'},
 *             { 'fname': 'Kara',   'lname': 'Zor-El', 'talent': 'All'},
 *             { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert'},
 *             { 'fname': 'Hal',    'lname': 'Jordan', 'talent': 'Willpower'  },
 *         ]
 *     });
 *
 *     Ext.create('Ext.grid.Grid', {
 *         title: 'DC Personnel',
 *
 *         store: store,
 *         plugins: [{
 *            type: 'cellediting'
 *         }],
 *         columns: [
 *             { text: 'First Name', dataIndex: 'fname',  flex: 1, editable: true },
 *             { text: 'Last Name',  dataIndex: 'lname',  flex: 1 },
 *             { text: 'Talent',     dataIndex: 'talent', flex: 1 }
 *         ],
 *         fullscreen: true
 *     });
 *
 * @since 6.5.0
 */
Ext.define('Ext.grid.plugin.CellEditing', {
    extend: 'Ext.plugin.Abstract',
    alias: ['plugin.gridcellediting', 'plugin.cellediting'],

    requires: [
        'Ext.grid.CellEditor',
        'Ext.grid.Location'
    ],

    config: {
        /**
         * @private
         */
        grid: null,

        /**
         * @cfg {String} [triggerEvent=doubletap]
         * An optional pointer event to trigger cell editing.
         *
         * By default, cell editing begins when actionable mode is entered by pressing
         * `ENTER` or `F2` when focused on the cell.
         */
        triggerEvent: 'doubletap'
    },

    init: function(grid) {
        this.setGrid(grid);

        grid.setTouchAction({
            doubleTapZoom: false
        });

        grid.$cellEditing = true;
    },

    getEditor: function(location) {
        var column = location.column,
            editable = column.getEditable(),
            editor;

        if (!(editor = editable !== false && column.getEditor(location.record)) && editable) {
            editor = Ext.create(column.getDefaultEditor());
        }

        if (editor) {
            if (!editor.isCellEditor) {
                editor = Ext.create({
                    xtype: 'celleditor',
                    field: editor
                });
            }
            column.setEditor(editor);
            editor.editingPlugin = this;

            editor.getField().addUi('celleditor');
        }

        return editor;
    },

    getActiveEditor: function() {
        return this.activeEditor;
    },

    updateGrid: function(grid, oldGrid) {
        if (oldGrid) {
            oldGrid.unregisterActionable(this);
        }

        if (grid) {
            grid.registerActionable(this);
        }
    },

    /**
     * @protected
     * Part of the grid Actionable interface.
     *
     * Callback called by the NavigationModel on entry into actionable mode at the specified
     * position.
     * @param {Ext.grid.Location} location The position at which to enter actionable mode.
     * @returns {Ext.grid.Location} The location where actionable mode was successfully started.
     */
    activateCell: function(location) {
        var me = this,
            editor;

        if (location) {
            editor = me.getEditor(location);
            if (editor) {
                if (me.$previousEditor) {
                    me.$previousEditor.cancelEdit();
                }

                editor.startEdit(location);
                if (editor.editing) {
                    me.$previousEditor = editor;
                    return new Ext.grid.Location(me.getGrid(), editor.getField().getFocusEl());
                }
            }
        }
    },

    // for compatibility
    startEdit: function(record, column) {
        this.activateCell(new Ext.grid.Location(this.getGrid(), {
            record: record,
            column: column
        }));
    },

    destroy: function() {
        var grid = this.getGrid();

        if (grid) {
            grid.$cellEditing = false;
        }

        this.$previousEditor = null;
        this.callParent();
    }
});
