/**
 * This class specifies the definition for a column inside a {@link Ext.grid.Grid}. It
 * encompasses both the grid header configuration as well as displaying data within the
 * grid itself.
 *
 * In general an array of column configurations will be passed to the grid:
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId: 'employeeStore',
 *         fields: ['firstname', 'lastname', 'seniority', 'dep', 'hired'],
 *         data: [
 *             {firstname:"Michael", lastname:"Scott", seniority:7, dep:"Management", hired:"01/10/2004"},
 *             {firstname:"Dwight", lastname:"Schrute", seniority:2, dep:"Sales", hired:"04/01/2004"},
 *             {firstname:"Jim", lastname:"Halpert", seniority:3, dep:"Sales", hired:"02/22/2006"},
 *             {firstname:"Kevin", lastname:"Malone", seniority:4, dep:"Accounting", hired:"06/10/2007"},
 *             {firstname:"Angela", lastname:"Martin", seniority:5, dep:"Accounting", hired:"10/21/2008"}
 *         ]
 *     });
 *
 *     var grid = Ext.create('Ext.grid.Grid', {
 *         title: 'Column Demo',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             {text: 'First Name',  dataIndex:'firstname'},
 *             {text: 'Last Name',  dataIndex:'lastname'},
 *             {text: 'Hired Month',  dataIndex:'hired', xtype:'datecolumn', format:'M'},
 *             {text: 'Department (Yrs)', xtype:'templatecolumn', tpl:'{dep} ({seniority})'}
 *         ],
 *         width: 400
 *     });
 *     Ext.ViewPort.add(grid);
 *
 * # Convenience Subclasses
 *
 * There are several column subclasses that provide default rendering for various data types
 *
 *  - {@link Ext.grid.column.Boolean}: Renders for boolean values
 *  - {@link Ext.grid.column.Date}: Renders for date values
 *  - {@link Ext.grid.column.Number}: Renders for numeric values
 *
 * For more information about configuring cell content, see {@link Ext.grid.Grid}.
 *
 * # Setting Sizes
 *
 * The columns can be only be given an explicit width value. If no width is specified the
 * grid will automatically the size the column to 20px.
 *
 * # Header Options
 *
 *  - {@link #text}: Sets the header text for the column
 *  - {@link #sortable}: Specifies whether the column can be sorted by clicking the header
 *    or using the column menu
 *
 * # Data Options
 *
 *  - {@link #dataIndex}: The dataIndex is the field in the underlying {@link Ext.data.Store}
 *    to use as the value for the column.
 *  - {@link #renderer}: Allows the underlying store value to be transformed before being
 *    displayed in the grid.
 */
Ext.define('Ext.grid.column.Column', {
    extend: 'Ext.grid.HeaderContainer',
    alternateClassName: 'Ext.grid.column.Template',

    xtype: ['gridcolumn', 'column', 'templatecolumn'],

    /**
     * @property {Boolean} isGridColumn
     * Set in this class to identify, at runtime, instances which are not instances of the
     * HeaderContainer base class, but are in fact, the subclass: Ext.grid.Column.
     */
    isGridColumn: true,

    mixins: [
        // This mixin is used to cache the padding size for cells in this column,
        // to be shared by all cells in the column.
        'Ext.mixin.StyleCacher',
        'Ext.mixin.Toolable'
    ],

    /**
     * @property {Boolean} isLeafHeader
     * This will be set to `true` if the column has no child columns.
     */

    /**
     * @property {Boolean} isHeaderGroup
     * This will be set to `true` if the column has child columns.
     */

    config: {
        /**
         * @cfg {String} [align='left']
         * Sets the alignment of the header and rendered columns.
         * Possible values are: `'left'`, `'center'`, and `'right'`.
         */
        align: undefined, // undefined so applier will run to determine default value

        /**
         * @cfg {Object} cell
         * The config object used to create {@link Ext.grid.cell.Base cells} for this column.
         * By default, cells use the {@link Ext.grid.cell.Cell gridcell} `xtype`. To create
         * a different type of cell, simply provide this config and the desired `xtype`.
         */
        cell: {
            xtype: 'gridcell'
        },

        /**
         * @cfg {String} dataIndex
         * The name of the field in the grid's {@link Ext.data.Store}'s {@link Ext.data.Model} definition from
         * which to draw the column's value. **Required.**
         */
        dataIndex: null,

        /**
         * @cfg {Number} defaultWidth
         * A width to apply if the {@link #flex} or {@link #width} configurations have not
         * been specified.
         *
         * @since 6.2.0
         */
        defaultWidth: 100,

        emptyText: {
            cached: true,
            $value: '\xA0'
        },

        /**
         * @cfg {String} text
         * The header text to be used as innerHTML (html tags are accepted) to display in the Grid.
         * **Note**: to have a clickable header with no text displayed you can use the default of `&#160;` aka `&nbsp;`.
         */
        text: '\xa0',

        /**
         * @cfg {Boolean} sortable
         * False to disable sorting of this column. Whether local/remote sorting is used is specified in
         * `{@link Ext.data.Store#remoteSort}`.
         */
        sortable: true,

        /**
         * @cfg {Boolean} groupable
         * If the grid is {@link Ext.grid.Grid#grouped grouped}, and uses a
         * {@link Ext.grid.plugin.ViewOptions ViewOptions} plugin this option may be used to
         * disable the option to group by this column. By default, the group option is enabled.
         */
        groupable: true,

        /**
         * @cfg {Boolean} resizable
         * False to prevent the column from being resizable.
         * Note that this configuration only works when the {@link Ext.grid.plugin.ColumnResizing ColumnResizing} plugin
         * is enabled on the {@link Ext.grid.Grid Grid}.
         */
        resizable: true,

        /**
         * @cfg {Boolean} hideable
         * False to prevent the user from hiding this column.
         *
         * @since 6.5.0
         */
        hideable: true,

        /**
         * @cfg {Function/String} renderer
         * A renderer is a method which can be used to transform data (value, appearance, etc.)
         * before it is rendered.
         *
         * For example:
         *
         *      {
         *          text: 'Some column',
         *          dataIndex: 'fieldName',
         *
         *          renderer: function (value, record) {
         *              if (value === 1) {
         *                  return '1 person';
         *              }
         *              return value + ' people';
         *          }
         *      }
         *
         * If a string is supplied, it should be the name of a renderer method from the
         * appropriate {@link Ext.app.ViewController}.
         *
         * This config is only processed if the {@link #cell} type is the default of
         * {@link Ext.grid.cell.Cell gridcell}.
         *
         * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
         * to rendering cell content.
         *
         * @cfg {Object} renderer.value The data value for the current cell.
         * @cfg {Ext.data.Model} renderer.record The record for the current row.
         * @cfg {Number} renderer.dataIndex The dataIndex of the current column.
         * @cfg {Ext.grid.cell.Base} renderer.cell The current cell.
         * @cfg {Ext.grid.column.Column} renderer.column The current column.
         * @cfg {String} renderer.return The HTML string to be rendered. *Note*: to
         * render HTML into the cell, you will have to configure the column's {@link #cell}
         * with `encodeHtml: false`
         */
        renderer: null,

        /**
         * @cfg {String} formatter
         * This config accepts a format specification as would be used in a `Ext.Template`
         * formatted token. For example `'round(2)'` to round numbers to 2 decimal places
         * or `'date("Y-m-d")'` to format a Date.
         *
         * In previous releases the `renderer` config had limited abilities to use one
         * of the `Ext.util.Format` methods but `formatter` now replaces that usage and
         * can also handle formatting parameters.
         *
         * When the value begins with `"this."` (for example, `"this.foo(2)"`), the
         * implied scope on which "foo" is found is the `scope` config for the column.
         *
         * If the `scope` is not given, or implied using a prefix of `"this"`, then either the
         * {@link #method-getController ViewController} or the closest ancestor component configured
         * as {@link #defaultListenerScope} is assumed to be the object with the method.
         * @since 6.2.0
         */
        formatter: null,

        /**
         * @cfg {Object} scope
         * The scope to use when calling the {@link #renderer} or {@link #formatter} function.
         */
        scope: null,

        /**
         * @cfg {Boolean} editable
         * Set this to true to make this column editable.
         * Only applicable if the grid is using an {@link Ext.grid.plugin.Editable Editable} plugin.
         */
        editable: null,

        /**
         * @cfg {Object/String} editor
         * An optional xtype or config object for a {@link Ext.field.Field Field} to use for editing.
         * Only applicable if the grid is using an {@link Ext.grid.plugin.Editable Editable} plugin.
         * Note also that {@link #editable} has to be set to true if you want to make this column editable.
         * If this configuration is not set, and {@link #editable} is set to true, the {@link #defaultEditor} is used.
         */
        editor: null,

        /**
         * @cfg {Object/Ext.field.Field}
         * An optional config object that should not really be modified. This is used to create
         * a default editor used by the {@link Ext.grid.plugin.Editable Editable} plugin when no
         * {@link #editor} is specified.
         */
        defaultEditor: {
            lazy: true,
            $value: {
                xtype: 'textfield',
                required: true
            }
        },

        /**
         * @cfg {Boolean} ignore
         * Setting to `true` prevents this column from being used by plugins such as
         * {@link Ext.grid.plugin.ViewOptions} or {@link Ext.grid.plugin.Summary}. It is
         * intended for special columns such as the row number or checkbox selection.
         */
        ignore: false,

        /**
         * @cfg {Boolean} ignoreExport
         * This flag indicates that this column will be ignored when grid data is exported.
         *
         * When grid data is exported you may want to export only some columns that are important
         * and not everything. You can set this flag on any column that you want to be ignored during export.
         *
         * This is used by {@link Ext.grid.plugin.Exporter exporter plugin}.
         */
        ignoreExport: false,

        /**
         * @cfg {Ext.exporter.file.Style/Ext.exporter.file.Style[]} exportStyle
         *
         * A style definition that is used during data export via the {@link Ext.grid.plugin.Exporter exporter plugin}.
         * This style will be applied to the columns generated in the exported file.
         *
         * You could define it as a single object that will be used by all exporters:
         *
         *      {
         *          xtype: 'numbercolumn',
         *          dataIndex: 'price',
         *          exportStyle: {
         *              format: 'Currency',
         *              alignment: {
         *                  horizontal: 'Right'
         *              },
         *              font: {
         *                  italic: true
         *              }
         *          }
         *      }
         *
         * You could also define it as an array of objects, each object having a `type` that specifies by
         * which exporter will be used:
         *
         *      {
         *          xtype: 'numbercolumn',
         *          dataIndex: 'price',
         *          exportStyle: [{
         *              type: 'html', // used by the `html` exporter
         *              format: 'Currency',
         *              alignment: {
         *                  horizontal: 'Right'
         *              },
         *              font: {
         *                  italic: true
         *              }
         *          },{
         *              type: 'csv', // used by the `csv` exporter
         *              format: 'General'
         *          }]
         *      }
         *
         * Or you can define it as an array of objects that has:
         *
         * - one object with no `type` key that is considered the style to use by all exporters
         * - objects with the `type` key defined that are exceptions of the above rule
         *
         *      {
         *          xtype: 'numbercolumn',
         *          dataIndex: 'price',
         *          exportStyle: [{
         *              // no type defined means this is the default
         *              format: 'Currency',
         *              alignment: {
         *                  horizontal: 'Right'
         *              },
         *              font: {
         *                  italic: true
         *              }
         *          },{
         *              type: 'csv', // only the CSV exporter has a special style
         *              format: 'General'
         *          }]
         *      }
         *
         */
        exportStyle: null,

        /**
         * @cfg {Boolean/Function/String} exportRenderer
         *
         * During data export via the {@link Ext.grid.plugin.Exporter} plugin the data for
         * this column could be formatted in multiple ways:
         *
         * - using the `exportStyle.format`
         * - using the `formatter` if no `exportStyle` is defined
         * - using the `exportRenderer`
         *
         * If you want to use the `renderer` defined on this column then set `exportRenderer`
         * to `true`. Beware that this should only happen if the `renderer` deals only with
         * data on the record or value and it does NOT style the cell or returns an html
         * string.
         *
         *      {
         *          xtype: 'numbercolumn',
         *          dataIndex: 'price',
         *          text: 'Price',
         *          renderer: function (value, record, dataIndex, cell, column) {
         *              return Ext.util.Format.currency(value);
         *          },
         *          exportRenderer: true
         *      }
         *
         * If you don't want to use the `renderer` during export but you still want to format
         * the value in a special way then you can provide a function to `exportRenderer` or
         * a string (which is a function name on the ViewController).
         * The provided function has the same signature as the renderer.
         *
         *      {
         *          xtype: 'numbercolumn',
         *          dataIndex: 'price',
         *          text: 'Price',
         *          exportRenderer: function (value, record, dataIndex, cell, column) {
         *              return Ext.util.Format.currency(value);
         *          }
         *      }
         *
         *
         *      {
         *          xtype: 'numbercolumn',
         *          dataIndex: 'price',
         *          text: 'Price',
         *          exportRenderer: 'exportAsCurrency' // this is a function on the ViewController
         *      }
         *
         *
         * If `exportStyle.format`, `formatter` and `exportRenderer` are all defined on the
         * column then the `exportStyle` wins and will be used to format the data for this
         * column.
         */
        exportRenderer: false,

        /**
         * @cfg {String} summary
         * This config replaces the default mechanism of acquiring a summary result from
         * the summary record. When specified, this string is the name of a summary type:
         *
         *  - {@link Ext.data.summary.Average average}
         *  - {@link Ext.data.summary.Count count}
         *  - {@link Ext.data.summary.Max max}
         *  - {@link Ext.data.summary.Min min}
         *  - {@link Ext.data.summary.Sum sum}
         *
         * The summary is based on either the {@link #cfg!summaryDataIndex} or the
         * {@link #cfg!dataIndex} if there is no `summaryDataIndex`.
         *
         * This config is only valid when all data is available client-side to calculate
         * summaries.
         *
         * It is generally best to allow the summary {@link Ext.data.Model record} to
         * computer summary values (and not use this config). In some cases, however,
         * this config can be useful to isolate summary calculations to only certain grids.
         *
         * To implement a custom summary for a column, use {@link #cfg!summaryRenderer}.
         * @since 6.5.0
         */
        summary: null,

        /**
         * @cfg {Object} summaryCell
         * The config object used to create {@link Ext.grid.cell.Base cells} in
         * {@link Ext.grid.SummaryRow Summary Rows} for this column.
         */
        summaryCell: null,

        /**
         * @cfg {String} summaryDataIndex
         * For {@link Ext.grid.SummaryRow summary rows} this config overrides the normal
         * `dataIndex` to use from the summary record.
         * @since 6.5.0
         */
        summaryDataIndex: null,

        /**
         * @cfg {String} summaryFormatter
         * This summaryFormatter is similar to {@link #formatter} but is called before
         * displaying a value in the SummaryRow. The config is optional, if not specified
         * the default calculated value is shown. The summaryFormatter is called with:
         *
         *  - value: The calculated value.
         *
         * Note that this configuration only works when the grid has the
         * {@link Ext.grid.plugin.Summary gridsummary} plugin enabled.
         */
        summaryFormatter: null,

        /**
         * @cfg {Function/String} summaryRenderer
         * This summaryRenderer is called to render the value to display in a cell of a
         * summary row. If the value of this config is a String, it is the name of the
         * renderer method on the associated {@link Ext.Component#controller controller}.
         *
         * @cfg {Mixed} summaryRenderer.value The summary value to render. This value is
         * retrieved from the summary record based on the {@link #cfg!summaryDataIndex} or
         * {@link #cfg!dataIndex}, or by applying the {@link #cfg!summary} algorithm to
         * the appropriate records. While this value can be useful, it can also be ignored
         * and the renderer method can use the `context` information to determine the value
         * to render entirely on its own.
         *
         * @cfg {Object} summaryRenderer.context The summary context object.
         *
         * @cfg {String} summaryRenderer.context.dataIndex The data field. This will be
         * either the {@link #cfg!summaryDataIndex} if one is specified, or the normal
         * {@link #cfg!dataIndex} if not.
         *
         * @cfg {String} summaryRenderer.context.group The {@link Ext.data.Group group}
         * being summarized. This is `null` if the summary is for the whole `store`.
         *
         * @cfg {String} summaryRenderer.context.store The {@link Ext.data.Store store}
         * being summarized.
         *
         * If this method returns `undefined`, no update is made to the cell. Instead it
         * is assumed that the `summaryRenderer` has made all of the necessary changes.
         *
         * Note that this configuration only works when the grid has the
         * {@link Ext.grid.plugin.Summary gridsummary} plugin enabled.
         */
        summaryRenderer: null,

        /**
         * @cfg {String/Function} summaryType
         * This configuration specifies the type of summary. There are several built in
         * summary types. These call underlying methods on the store:
         *
         *  - {@link Ext.data.Store#count count}
         *  - {@link Ext.data.Store#sum sum}
         *  - {@link Ext.data.Store#min min}
         *  - {@link Ext.data.Store#max max}
         *  - {@link Ext.data.Store#average average}
         *
         * Any other name is assumed to be the name of a method on the associated
         * {@link Ext.app.ViewController view controller}.
         *
         * Note that this configuration only works when the grid has the
         * {@link Ext.grid.plugin.Summary gridsummary} plugin enabled.
         *
         * @deprecated 6.5 Use {@link #cfg!summary} or {@link #cfg!summaryRenderer} instead.
         */
        summaryType: null,

        /**
         * @cfg {Boolean/Function/String} exportSummaryRenderer
         *
         * This config is similar to {@link #exportRenderer} but is applied to summary
         * records.
         */
        exportSummaryRenderer: false,

        minWidth: 40,

        /**
         * @cfg {String/String[]/Ext.XTemplate} tpl
         * An {@link Ext.XTemplate XTemplate}, or an XTemplate *definition string* to use
         * to process a {@link Ext.data.Model records} data to produce a cell's rendered
         * value.
         *
         *     @example
         *     Ext.create('Ext.data.Store', {
         *         storeId:'employeeStore',
         *         fields:['firstname', 'lastname', 'seniority', 'department'],
         *         groupField: 'department',
         *         data:[
         *             { firstname: "Michael", lastname: "Scott",   seniority: 7, department: "Management" },
         *             { firstname: "Dwight",  lastname: "Schrute", seniority: 2, department: "Sales" },
         *             { firstname: "Jim",     lastname: "Halpert", seniority: 3, department: "Sales" },
         *             { firstname: "Kevin",   lastname: "Malone",  seniority: 4, department: "Accounting" },
         *             { firstname: "Angela",  lastname: "Martin",  seniority: 5, department: "Accounting" }
         *         ]
         *     });
         *
         *     Ext.create('Ext.grid.Panel', {
         *         title: 'Column Template Demo',
         *         store: Ext.data.StoreManager.lookup('employeeStore'),
         *         columns: [{
         *             text: 'Full Name',
         *             tpl: '{firstname} {lastname}'
         *         }, {
         *             text: 'Department (Yrs)',
         *             tpl: '{department} ({seniority})'
         *         }],
         *         height: 200,
         *         width: 300,
         *         renderTo: Ext.getBody()
         *     });
         *
         * This config is only processed if the {@link #cell} type is the default of
         * {@link Ext.grid.cell.Cell gridcell}.
         *
         * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
         * to rendering cell content.
         */
        tpl: null,

        /**
         * @cfg {Number} computedWidth
         * The computed width for this column, may come from either
         * {@link #width} or {@link #flex}.
         * @readonly
         */
        computedWidth: null,

        /**
         * @cfg {Function/String/Object/Ext.util.Grouper} grouper
         * A grouper config object to apply when the standard grouping user interface is
         * is invoked. This option is, for example, available in the column's header
         * menu.
         *
         * Note that a grouper may also be specified as a function which accepts two
         * records to compare.
         *
         * A `{@link Ext.app.ViewController controller}` method can be used like so:
         *
         *      grouper: 'groupMethodName'
         *
         * This is different then a `sorter` in that the `grouper` method is used to
         * set the {@link Ext.util.Grouper#cfg!groupFn groupFn}. This string returned
         * by this method is used to determine group membership. To specify both the
         * `grpoupFn` and the `sorterFn`:
         *
         *      grouper: {
         *          groupFn: 'groupMethodName'
         *          sorterFn: 'sorterMethodName
         *      }
         *
         * @since 6.5.0
         */
        grouper: {
            lazy: true,
            $value: null
        },

        /**
         * @cfg {String/String[]/Ext.XTemplate} groupHeaderTpl
         * This config allows a column to replace the default template supplied by the
         * grid's {@link Ext.grid.RowHeader#tpl groupHeader.tpl}.
         *
         * @since 6.5.0
         */
        groupHeaderTpl: null,

        /**
         * @cfg {Function/String/Object/Ext.util.Sorter} sorter
         * A sorter config object to apply when the standard sort user interface is
         * is invoked. This is usually clicking this column header, but there are also
         * menu options to sort ascending or descending.
         *
         * Note that a sorter may also be specified as a function which accepts two
         * records to compare.
         *
         * A `{@link Ext.app.ViewController controller}` method can be used like so:
         *
         *      sorter: 'sorterMethodName'
         *
         * Or more explicitly:
         *
         *      sorter: {
         *          sorterFn: 'sorterMethodName'
         *      }
         *
         * By default sorting is based on the `dataIndex` but this can be adjusted
         * like so:
         *
         *      sorter: {
         *          property: 'otherProperty'
         *      }
         *
         * @since 6.5.0
         */
        sorter: {
            lazy: true,
            $value: null
        },

        /**
         * @cfg {Ext.grid.cell.Cell/Object} scratchCell
         * @since 6.5.0
         * @private
         */
        scratchCell: {
            lazy: true,
            $value: true
        },

        /**
         * @cfg {Ext.menu.Menu/Object} menu
         * An optional menu configuration object which is merged with the grid's
         * {@link #cfg!columnMenu} to create this column's header menu. This can be set
         * to `null` to remove the menu from this column. To dynamically change whether
         * the menu should be enabled or not use the `menuDisabled` config.
         *
         * The grid's {@link Ext.grid.Grid#cfg!columnMenu} provides the sort items, this
         * config can be used to add column-specific menu items or override aspects of
         * the common items.
         * @since 6.5.0
         */
        menu: {
            lazy: true,
            $value: {}
        },

        /**
         * @cfg {Boolean} [menuDisabled=false]
         * Set to `true` to disable this column's `menu` containing sort/hide options.
         * This can be useful if the menu will be dynamically available since setting
         * `menu` to `null` will eliminate the menu making dynamic changes to its
         * availability more expensive.
         * @since 6.5.0
         */
        menuDisabled: null,

        /**
         * @cfg {Ext.menu.CheckItem/Object} hideShowMenuItem
         * The {@link Ext.menu.CheckItem menu item} to be used by the owning grid's
         * header menu to hide or show this column.
         * @since 6.5.0
         * @private
         */
        hideShowMenuItem: {
            lazy: true,
            $value: {
                xtype: 'menucheckitem'
            }
        }
    },

    toolDefaults: {
        ui: 'gridcolumn',
        zone: 'tail'
    },

    toolAnchorName: 'titleWrapElement',

    dockTools: false,

    scrollable: false,

    docked: null,

    sortState: null,

    // These are not readable descriptions; the values go in the aria-sort attribute.
    ariaSortStates: {
        ASC: 'ascending',
        DESC: 'descending'
    },

    inheritUi: true,

    classCls: Ext.baseCSSPrefix + 'gridcolumn',
    sortedCls: Ext.baseCSSPrefix + 'sorted',
    resizableCls: Ext.baseCSSPrefix + 'resizable',
    groupCls: Ext.baseCSSPrefix + 'group',
    leafCls: Ext.baseCSSPrefix + 'leaf',
    menuOpenCls: Ext.baseCSSPrefix + 'menu-open',
    alignCls: {
        left: Ext.baseCSSPrefix + 'align-left',
        center: Ext.baseCSSPrefix + 'align-center',
        right: Ext.baseCSSPrefix + 'align-right'
    },

    /**
     * @event columnmenucreated
     * @member Ext.grid.Grid
     * Fired when a column first creates its column menu. This is to allow plugins
     * to access and manipulate the column menu.
     *
     * There will be the two sort items, and a column hide/show item with a child menu of
     * checkboxes. After this, developers may add custom enu items.
     *
     * Menu items may be configured with a `weight` config, and those with the lowest weight
     * gravitate to the top.
     *
     * The sort ascending, sort descending, and hide columns items have weight -3, -2, and -1
     * @param {Ext.grid.Grid} grid This Grid
     * @param {Ext.grid.Column} column The column creating the menu
     * @param {Ext.menu.Menu} menu The column's new menu
     */

    constructor: function (config) {
        var me = this,
            isHeaderGroup, menu;

        // If we are configured or prototyped as a HeaderGroup
        // TODO - move to updater (me.columns won't work in all cases)
        if (config.columns || me.columns) {
            isHeaderGroup = me.isHeaderGroup = true;
        } else {
            me.isLeafHeader = true;
        }

        me.callParent([config]);

        me.addCls(isHeaderGroup ? me.groupCls : me.leafCls);

        menu = me.getConfig('menu', /*peek=*/true);
        if (!menu && me.getMenuDisabled() === null) {
            me.setMenuDisabled(true);
        }
    },

    getTemplate: function () {
        var me = this,
            beforeTitleTemplate = me.beforeTitleTemplate,
            afterTitleTemplate = me.afterTitleTemplate,
            titleTpl = [];

        // Hook for subclasses to insert extra elements
        if (beforeTitleTemplate) {
            titleTpl.push.apply(titleTpl, beforeTitleTemplate);
        }

        titleTpl.push({
            reference: 'titleElement',
            className: Ext.baseCSSPrefix + 'title-el',
            children: [{
                reference: 'textElement',
                className: Ext.baseCSSPrefix + 'text-el'
            }, {
                reference: 'sortIconElement',
                cls: Ext.baseCSSPrefix + 'sort-icon-el ' +
                Ext.baseCSSPrefix + 'font-icon'
            }]
        });

        // Hook for subclasses to insert extra elements
        if (afterTitleTemplate) {
            titleTpl.push.apply(titleTpl, afterTitleTemplate);
        }

        return [{
            reference: 'headerElement',
            cls: Ext.baseCSSPrefix + 'header-el',
            children: [{
                reference: 'titleWrapElement',
                cls: Ext.baseCSSPrefix + 'title-wrap-el',
                uiCls: 'title-wrap-el',
                children: titleTpl
            }, {
                reference: 'resizerElement',
                cls: Ext.baseCSSPrefix + 'resizer-el ' +
                     Ext.baseCSSPrefix + 'item-no-tap'
            }, {
                reference: 'triggerElement',
                cls: Ext.baseCSSPrefix + 'trigger-el ' +
                     Ext.baseCSSPrefix + 'font-icon ' +
                     Ext.baseCSSPrefix + 'item-no-tap'
            }]
        }, {
            reference: 'bodyElement',
            cls: Ext.baseCSSPrefix + 'body-el',
            uiCls: 'body-el'
        }];
    },

    onAdded: function(parent, instanced) {
        this.visibleIndex = null;
        this.callParent([parent, instanced]);
    },

    /**
     * Returns the index of this column in the list of *visible* columns only if this column is a base level Column. If it
     * is a group column, it returns `false`.
     * @return {Number}
     */
    getVisibleIndex: function() {
        // Note that the visibleIndex property is assigned by the owning HeaderContainer
        // when assembling the visible column set for the view.
        var visibleIndex = this.visibleIndex,
            rootHeaders;

        if (visibleIndex == null) {
            if (this.isHeaderGroup) {
                visibleIndex = false;
            }
            else {
                rootHeaders = this.getRootHeaderCt();

                if (rootHeaders) {
                    visibleIndex = rootHeaders.indexOfLeaf(this);
                }
            }

            this.visibleIndex = visibleIndex;
        }

        return visibleIndex;
    },

    _columnScopeRe: /^column\./,
    _gridScopeRe: /^grid\./,

    applyMenu: function (menu) {
        var me = this,
            grid = me.getGrid(),
            columnScopeRe = me._columnScopeRe,
            gridScopeRe = me._gridScopeRe,
            extraItems, gridColumnMenu, i, item, items, s;

        // Allow menu:null to rid the column of all menus... so only merge in the
        // grid's column menu if we have a non-null menu
        if (menu && !menu.isMenu) {
            if (Ext.isArray(menu)) {
                extraItems = menu;
                menu = null;
            }
            else if (!menu.items) {
                menu = {
                    items: menu
                };
            }

            if (!(gridColumnMenu = grid.getColumnMenu())) {
                // if menu was an array it is now null, so just make an empty {}
                menu = menu ? Ext.clone(menu) : {};
            }
            else {
                gridColumnMenu = Ext.clone(gridColumnMenu);
                menu = menu ? Ext.merge(gridColumnMenu, menu) : gridColumnMenu;
            }

            menu.ownerCmp = me;

            menu = Ext.create(menu);

            // We cannot use defaultListenerScope to map handlers in our menu to
            // ourselves because user views would then be blocked from doing so to
            // items they may have added to the same menu.
            //
            // Our trick is to encode special scopes in the handler names and see
            // if they have survived until now. It is possible the user has set
            // the handler to something else...

            for (items = menu.getItems().items, i = items && items.length; i-- > 0; ) {
                item = items[i];

                if (columnScopeRe.test(s = item.getHandler() || '')) {
                    item.setHandler(s.substr(7));  // remove "column."
                    item.scope = me;
                }
                else if (gridScopeRe.test(s)) {
                    item.setHandler(s.substr(5));  // remove "grid."
                    item.scope = grid;
                }
                else if (item.isMenuCheckItem) {
                    if (columnScopeRe.test(s = item.getCheckHandler() || '')) {
                        item.setCheckHandler(s.substr(7));
                        item.scope = me;
                    }
                    else if (gridScopeRe.test(s)) {
                        item.setCheckHandler(s.substr(5));
                        item.scope = grid;
                    }
                }
            }

            if (extraItems) {
                menu.add(extraItems);
            }

            grid.fireEvent('columnmenucreated', grid, me, menu);
        }

        return menu;
    },

    beforeShowMenu: function (menu) {
        var me = this,
            grid = me.getGrid(),
            grouper = grid.getStore().getGrouper(),
            groupByThis = menu.getComponent('groupByThis'),
            showInGroups = menu.getComponent('showInGroups'),
            sortAsc = menu.getComponent('sortAsc'),
            sortDesc = menu.getComponent('sortDesc'),
            sortable = this.isSortable(),
            groupedByThis = false,
            dataIndex = me.getDataIndex();

        if (sortAsc) {
            sortAsc.setDisabled(!sortable);
        }
        if (sortDesc) {
            sortDesc.setDisabled(!sortable);
        }

        if (groupByThis) {
            if (grouper) {
                if (!(groupedByThis = grouper === me.getGrouper())) {
                    groupedByThis = dataIndex != null && dataIndex === grouper.getProperty();
                }
            }

            groupByThis.setChecked(groupedByThis);
            groupByThis.setDisabled(groupedByThis);
        }

        if (showInGroups) {
            showInGroups.setChecked(!!grouper);
            showInGroups.setDisabled(!grouper);
        }
    },

    showMenu: function () {
        var me = this,
            menu = !me.getMenuDisabled() && me.getMenu(),
            menuOpenCls = me.menuOpenCls,
            columnsMenu, grid;

        // Only try if the menu is not disabled, and there *is* a menu
        if (menu) {
            grid = me.getGrid();
            columnsMenu = grid.getColumnsMenuItem();
            menu.add(columnsMenu);

            if (me.beforeShowMenu(menu) !== false &&
                    grid.beforeShowColumnMenu(me, menu) !== false) {
                menu.showBy(me.triggerElement);

                // Add menu open class which shows the trigger element while the menu is open
                me.addCls(menuOpenCls);

                menu.on({
                    single: true,
                    hide: function () {
                        if (!me.destroyed) {
                            me.removeCls(menuOpenCls);
                            menu.remove(columnsMenu, /*destroy=*/false);
                        }
                    }
                });
            }
        }
    },

    getCells: function () {
        var cells = [],
            rows = this.getGrid().items.items,
            len = rows.length,
            i, row;

        for (i = 0; i < len; ++i) {
            row = rows[i];
            if (row.isGridRow) {
                cells.push(row.getCellByColumn(this));
            }
        }

        return cells;
    },

    getColumnForField: function (fieldName) {
        if (fieldName === this.getDataIndex()) {
            return this;
        }

        return this.callParent([ fieldName ]);
    },

    applyTpl: function (tpl) {
        return Ext.XTemplate.get(tpl);
    },

    applyAlign: function(align, oldAlign) {
        if (align == null) {
            align = this.isHeaderGroup ? 'center' : 'left';
        }

        return align;
    },

    updateAlign: function (align, oldAlign) {
        var me = this,
            alignCls = me.alignCls;

        if (oldAlign) {
            me.removeCls(alignCls[oldAlign]);
        }

        if (align) {
            //<debug>
            if (!alignCls[align]) {
                Ext.raise("Invalid value for align: '" + align + "'");
            }
            //</debug>
            me.addCls(alignCls[align]);
        }

        me.syncToolableAlign();
    },

    updateMenuDisabled: function (menuDisabled) {
        if (this.triggerElement) {
            this.triggerElement.setVisible(!menuDisabled);
        }
    },

    initialize: function () {
        var me = this;

        if (me.isLeafHeader && !me.getWidth() && me.getFlex() == null) {
            me.setWidth(me.getDefaultWidth());
        }

        me.callParent();

        me.element.on({
            tap: 'onColumnTap',
            longpress: 'onColumnLongPress',
            scope: this
        });
        me.triggerElement.on({
            tap: 'onTriggerTap',
            scope: this
        });
        me.resizerElement.on({
            tap: 'onResizerTap',
            scope: this
        });

        if (me.isHeaderGroup) {
            me.on({
                add: 'doVisibilityCheck',
                remove: 'doVisibilityCheck',
                show: 'onColumnShow',
                hide: 'onColumnHide',
                delegate: '> column',
                scope: me
            });

            me.on({
                show: 'onShow',
                scope: me
            });
        }
    },

    onColumnTap: function (e) {
        var me = this;

        // Tapping on the trigger or resizer must not sort the column and
        // neither should tapping on any components (e.g. tools) contained
        // in the column.
        if (Ext.Component.from(e) !== me ||
                e.getTarget('.' + Ext.baseCSSPrefix + 'item-no-tap', me)) {
            return;
        }

        // HeaderContainer's sortable config must be honoured dynamically since
        // SelectionModels can change it.
        if (me.getRootHeaderCt().getSortable()) {
            me.toggleSortState();
        }

        return me.fireEvent('tap', me, e);
    },

    onTriggerTap: function (e) {
        this.fireEvent('triggertap', this, e);
    },

    onResizerTap: function (e) {
        // If they tapped on the resizer without dragging, interpret that as a tap
        // on the trigger, if it's in the correct region.
        if (e.getPoint().isContainedBy(this.triggerElement.getRegion())) {
            this.fireEvent('triggertap', this, e);
        }
    },

    onColumnLongPress: function (e) {
        this.fireEvent('longpress', this, e);
    },

    onGroupByThis: function () {
        var me = this,
            grid = me.getGrid(),
            grouper = me.getGrouper(),
            store = grid.getStore(),
            dataIndex;

        if (!grouper) {
            dataIndex = me.getDataIndex();

            if (dataIndex != null) {
                me.setGrouper({
                    property: dataIndex
                });

                grouper = me.getGrouper();
            }
        }

        if (grouper) {
            store.setGrouper(grouper);
        }
    },

    onSortDirectionToggle: function (menuItem) {
        var me = this,
            grid = me.getGrid(),
            store = grid.getStore(),
            sorter = me.getSorter(),
            sorters = store.getSorters(),
            isSorted = sorter && (sorters.contains(sorter) || sorter === store.getGrouper()),
            direction = menuItem.direction;

        // Remove sorter on uncheck if its the matching direction
        if (sorter && sorter.getDirection() === direction) {
            sorters.remove(sorter);

            // Store will not refresh in response to having a sorter removed, so we must
            // clear the column header arrow now.
            me.setSortState(null);
        }
        else {
            // If have no sorter, or store is not sorting by that sorter, or the sorter
            // is opposite to what we just checked then sort according to the CheckItems's
            // direction
            if (!isSorted || sorter.getDirection() !== direction) {
                me.sort(direction);
            }
        }
    },

    onToggleShowInGroups: function (menuItem) {
        if (!menuItem.getChecked()) {
            var grid = this.getGrid(),
                store = grid.getStore();

            store.setGrouper(null);
        }
    },

    updateResizable: function (resizable) {
        var me = this,
            widthed = me.getWidth() != null,
            flexed = me.getFlex() != null;

        // Column only drag-resizable if it's widthed, flexed, or a leaf.
        // If it's shrinkwrapping child columns then the child columns must be resized.
        me.toggleCls(me.resizableCls, !!(me.getResizable() && (widthed || flexed ||
            me.isLeafHeader)));
    },

    updateText: function (text) {
        this.setHtml(text || '\xa0');
    },

    onResize: function () {
        // Update the resizability of this column based on *how* it's just been sized.
        // If we are shrinkwrapping, we are not drag-resizable.
        this.updateResizable(this.getResizable());

        // Computed with needs to be exact so that sub-pixel changes are
        // not rejected by the config system because scrollbars may
        // depend upon the *exact* width of the cells in the view.
        this.measureWidth();
    },

    getComputedWidth: function () {
        return this.isVisible(true) ? this._computedWidth : 0;
    },

    updateColumns: function (columns) {
        this.getItems();
        this.add(columns);
    },

    measureWidth: function () {
        // Computed width must be a real. exact pixel width.
        // It cannot be em or rem etc because it is used to size owned cells
        // and different styles and fonts may be applied to cells.
        var width = this.el.measure('w');

        this.setComputedWidth(width);

        return width;
    },

    updateComputedWidth: function (value, oldValue) {
        var me = this,
            rootHeaderCt = !me.isConfiguring && me.getRootHeaderCt();

        // This is how grid's resize their cells in response. Not through events.
        // Width change events arrive asynchronously through resize listeners
        // and that would cause janky grid resizes.
        //
        // By informing the grid, it can force all flexed columns to republish
        // their computed widths, and correctly update all cells in one pass.
        if (rootHeaderCt) {
            // This updates the cells.
            rootHeaderCt.onColumnComputedWidthChange(me, value);

            // Fire the event after cells have been resized
            me.fireEvent('columnresize', me, value, oldValue);
        }
    },

    updateDataIndex: function (dataIndex) {
        if (this.isConfiguring) {
            return;
        }

        var editor = this.getEditor();

        if (editor) {
            editor.name = dataIndex;
        } else {
            this.getDefaultEditor().name = dataIndex;
        }
    },

    applyGroupHeaderTpl: function (tpl) {
        return Ext.XTemplate.get(tpl);
    },

    updateGroupHeaderTpl: function (tpl) {
        var grouper = this.grouper;

        if (grouper) {
            grouper.headerTpl = tpl;
        }
    },

    isSortable: function () {
        return this.isLeafHeader && this.getSortable() && this.getGrid().sortableColumns !== false;
    },

    applyEditor: function (value) {
        if (value && !value.isInstance) {
            if (typeof(value) === 'string') {
                value = {
                    xtype: value
                };
            }

            if (!value.xtype) {
                value = Ext.apply({
                    xtype: value.field ? 'celleditor' : 'textfield'
                }, value);
            }

            value.name = value.name || this.getDataIndex();

            return Ext.create(value);
        }

        return value;
    },

    updateDefaultEditor: function(editor) {
        if (!editor.name) {
            editor.name = this.getDataIndex();
        }
    },

    updateEditor: function (editor, oldEditor) {
        // If we are changing editors destroy the last one
        // but if we are changing from a field to a cell editor make sure we do not destroy
        // the field that is now a child of the cell editor
        if (oldEditor && (!editor || (editor.isCellEditor && editor.getField() !== oldEditor))) {
            oldEditor.destroy();
        }
    },

    applyFormatter: function (format) {
        var me = this,
            fmt = format,
            parser;

        if (fmt) {
            parser = Ext.app.bind.Parser.fly(fmt);
            fmt = parser.compileFormat();
            parser.release();

            return function (v) {
                return fmt(v, me.getScope() || me.resolveListenerScope());
            };
        }

        return fmt;
    },

    applySummaryFormatter: function (format) {
        var me = this,
            fmt = format,
            parser;

        if (fmt) {
            parser = Ext.app.bind.Parser.fly(fmt);
            fmt = parser.compileFormat();
            parser.release();
            return function (v) {
                return fmt(v, me.getScope() || me.resolveListenerScope());
            };
        }

        return fmt;
    },

    applyGrouper: function (grouper) {
        var me = this,
            cfg = grouper;

        if (cfg && !cfg.isInstance) {
            if (typeof cfg === 'string') {
                cfg = {
                    groupFn: cfg
                };
            } else {
                cfg = Ext.apply({}, cfg);
            }

            if (typeof cfg.groupFn === 'string') {
                cfg = me.scopeReplacer(cfg, grouper, 'groupFn', 'setGroupFn');
            }

            if (typeof cfg.sorterFn === 'string') {
                cfg = me.scopeReplacer(cfg, grouper, 'sorterFn', 'setSorterFn');
            }
            grouper = new Ext.util.Grouper(cfg);
        }

        // The owner/headerTpl expandos on our grouper are picked up by the ItemHeader
        // as a means to override the list's groupHeaderTpl...
        if (grouper) {
            grouper.owner = me.getGrid();
            grouper.headerTpl = me.getGroupHeaderTpl();
        }

        return grouper;
    },

    updateGrouper: function (grouper, oldGrouper) {
        var store = this.getGrid().getStore();

        if (store && oldGrouper) {
            if (oldGrouper === store.getGrouper()) {
                store.setGrouper(grouper);
            }
        }
    },

    applySorter: function (sorter) {
        var me = this,
            cfg = sorter;

        if (cfg && !cfg.isInstance) {
            if (typeof cfg === 'string') {
                cfg = {
                    sorterFn: cfg
                };
            }

            if (typeof cfg.sorterFn === 'string') {
                cfg = me.scopeReplacer(cfg, sorter, 'sorterFn', 'setSorterFn');
            }

            sorter = new Ext.util.Sorter(cfg);
        }
        return sorter;
    },

    updateSorter: function(sorter, oldSorter) {
        var store = this.getGrid().getStore(),
            sorters = store ? store.getSorters() : null,
            at;

        // If our previous sorter is in the store, replace it with the new one or
        // just remove it if we don't have one.
        if (sorters) {
            if (oldSorter && (at = sorters.indexOf(oldSorter)) > -1) {
                if (sorter) {
                    sorters.splice(at, 1, sorter);
                } else {
                    sorters.remove(oldSorter);
                }
            }
        }
    },

    applyHideShowMenuItem: function(hideShowMenuItem, oldHideShowMenuItem) {
        return Ext.Factory.widget.update(oldHideShowMenuItem, hideShowMenuItem, this, 'createHideShowMenuItem');
    },

    createHideShowMenuItem: function(defaults) {
        return Ext.apply({
            text: this.getText(),
            checked: !this.getHidden(),
            column: this
        }, defaults);
    },

    doDestroy: function () {
        var me = this,
            editor = me.getConfig('editor', false, true);

        me.destroyMembers('resizeListener', 'menu', 'hideShowMenuItem');

        me.setScratchCell(null);

        if (editor && editor.isWidget) {
            editor.ownerCmp = null;
            Ext.destroy(editor);
        }

        this.mixins.toolable.doDestroy.call(this);

        me.callParent();
    },

    getInnerHtmlElement: function () {
        return this.textElement;
    },

    /**
     * Returns the parameter to sort upon when sorting this header. By default this returns the dataIndex and will not
     * need to be overridden in most cases.
     * @return {String}
     */
    getSortParam: function () {
        return this.getDataIndex();
    },

    applyCell: function(cell, oldCell) {
        // Allow the cell config object to be reconfigured.
        if (oldCell) {
            cell = Ext.apply(oldCell, cell);
        }
        return cell;
    },

    createCell: function (row) {
        var me = this,
            cfg = {
                row: row,
                ownerCmp: row || me,
                column: me,
                width: me.rendered ? (me.getComputedWidth() || me.measureWidth()) : me.getWidth(),
                minWidth: me.getMinWidth()
            },
            align = me.getAlign(),
            cellCfg;

        if (row && row.isSummaryRow) {
            cellCfg = me.getSummaryCell();

            if (!cellCfg) {
                cellCfg = me.getCell();

                if (cellCfg.xtype === 'widgetcell') {
                    // We don't default to creating a widgetcell in a summary row, so
                    // fallback to a normal cell
                    cellCfg = Ext.apply({}, cellCfg);
                    cellCfg.xtype = 'gridcell';
                    delete cellCfg.widget;
                }
            }
        }
        else {
            cellCfg = me.getCell();
        }

        if (align) {
            // only put align on the config object if it is not null.  This prevents
            // the column's default value of null from overriding a value set on the
            // cell's class definition (e.g. widgetcell)
            cfg.align = align;
        }

        if (row) {
            cfg.hidden = me.isHidden(row.getGrid().getHeaderContainer());
            cfg.record = row.getRecord();

            if (!(cfg.ui = row.getDefaultCellUI())) {
                delete cfg.ui;
            }
        }

        if (typeof cellCfg === 'string') {
            cfg.xtype = cellCfg;
        }
        else {
            Ext.apply(cfg, cellCfg);
        }

        return cfg;
    },

    applyScratchCell: function(cell, oldCell) {
        var me = this;

        if (cell) {
            cell = Ext.create(me.createCell());

            if (!cell.printValue) {
                // If this cell type (widgetcell) cannot print its value, fallback to
                // default gridcell
                Ext.destroy(cell);
                cell = me.createCell();
                cell.xtype = 'gridcell';
                cell = Ext.create(cell);
            }
        }

        if (oldCell) {
            oldCell.destroy();
        }

        return cell;
    },

    printValue: function (value) {
        var me = this,
            rows = me.getGrid().dataItems,
            cell;

        if (rows.length) {
            cell = rows[0].getCellByColumn(me);
        }

        cell = (cell && cell.printValue) ? cell : me.getScratchCell();

        return cell.printValue(value);
    },

    privates: {
        applySummary: function (summary) {
            if (summary) {
                summary = Ext.Factory.dataSummary(summary);
            }

            return summary;
        },

        beginRefresh: function (context) {
            // This is called by our detached cells
            var me = this,
                grid = me.getGrid();

            context = context || {};

            context.column = me;
            context.grid = grid;
            // record = null
            // row = null
            context.store = grid.store;

            return context;
        },

        sort: function (direction) {
            var me = this,
                sorter = me.getSorter(),
                grid = me.getGrid(),
                store = grid.getStore(),
                isSorted = sorter && store.getSorters().contains(sorter);

            // This is the "group by" column - we have to set the grouper and tellit to recacculate.
            // AbstractStore#group just calls its Collection's updateGrouper if passed a Grouper
            // because *something* in the grouper might have changed, but the config system would
            // reject that as not a change.
            if (store.isGrouped() && store.getGroupField() === me.getDataIndex()) {
                sorter = store.getGrouper();
                me.setSorter(sorter);
                if (sorter.getDirection() !== direction) {
                    sorter.toggle();
                    store.group(sorter);
                }
                return;
            }

            if (sorter) {
                // Our sorter is in the requested direction
                if (sorter.getDirection() === direction) {
                    // If it is applied, we've nothing to do
                    if (isSorted) {
                        return;
                    }
                } else {
                    me.oldDirection = sorter.getDirection();
                    sorter.toggle();
                }
            } else {
                me.setSorter({
                    property: me.getSortParam(),
                    direction: direction
                });
                sorter = me.getSorter();
            }

            // If the sorter is already applied, just command the store to sort with no params.
            // If the grid is NOT configured with multi column sorting, then specify "replace".
            // Only if we are doing multi column sorting do we insert it as one of a multi set.
            store.sort.apply(store, isSorted ? [] : [sorter, grid.getMultiColumnSort() ? 'multi' : 'replace']);
        },

        toggleSortState: function () {
            if (this.isSortable()) {
                this.sort();
            }
        },

        /**
         * Sets the column sort state according to the direction of the Sorter passed, or the direction String passed.
         * @param {Ext.util.Sorter/String} sorter A Sorter, or `'ASC'` or `'DESC'`
         */
        setSortState: function (sorter) {
            // Set the UI state to reflect the state of any passed Sorter
            // Called by the grid's HeaderContainer on view refresh
            var me = this,
                direction,
                sortedCls = me.sortedCls,
                ascCls = sortedCls + '-asc',
                descCls = sortedCls + '-desc',
                ariaDom = me.ariaEl.dom,
                changed;

            if (sorter) {
                direction = sorter.isSorter ? sorter.getDirection() : sorter;
            }

            switch (direction) {
                case 'DESC':
                    if (!me.hasCls(descCls)) {
                        me.addCls([sortedCls, descCls]);
                        me.sortState = 'DESC';
                        changed = true;
                    }
                    me.removeCls(ascCls);
                    break;

                case 'ASC':
                    if (!me.hasCls(ascCls)) {
                        me.addCls([sortedCls, ascCls]);
                        me.sortState = 'ASC';
                        changed = true;
                    }
                    me.removeCls(descCls);
                    break;

                default:
                    me.removeCls([sortedCls, ascCls, descCls]);
                    me.sortState = null;
                    break;
            }

            if (ariaDom) {
                if (me.sortState) {
                    ariaDom.setAttribute('aria-sort', me.ariaSortStates[me.sortState]);
                }
                else {
                    ariaDom.removeAttribute('aria-sort');
                }
            }

            // we only want to fire the event if we have actually sorted
            if (changed) {
                me.fireEvent('sort', this, direction, me.oldDirection);
            }
        },

        getVisibleCount: function () {
            var columns = this.getInnerItems(),
                len = columns.length,
                count = 0,
                i;

            for (i = 0; i < len; ++i) {
                if (columns[i].isHeaderGroup) {
                    count += columns[i].getVisibleCount();
                } else {
                    count += columns[i].isHidden() ? 0 : 1;
                }
            }

            return count;
        },

        onShow: function () {
            var toShow;

            // No visible subcolumns, then show the first child.
            if (!this.getVisibleCount()) {
                toShow = this.getComponent(0);
                if (toShow) {
                    toShow.show();
                }
            }
        },

        doVisibilityCheck: function () {
            var me = this,
                columns = me.getInnerItems(),
                ln = columns.length,
                i, column;

            for (i = 0; i < ln; i++) {
                column = columns[i];
                if (!column.isHidden()) {
                    if (me.isHidden()) {
                        if (me.initialized) {
                            me.show();
                        } else {
                            me.setHidden(false);
                        }
                    }
                    return;
                }
            }

            me.hide();
        },

        onColumnShow: function (column) {
            if (this.getVisibleCount() > 0) {
                this.show();
            }
        },

        onColumnHide: function (column) {
            if (this.getVisibleCount() === 0) {
                this.hide();
            }
        },

        scopeReplacer: function (config, original, prop, setter) {
            var me = this,
                name = config[prop];

            if (typeof name === 'string') {
                prop = prop || 'sorterFn';
                setter = setter || 'setSorterFn';

                if (original === config) {
                    config = Ext.apply({}, config);
                }

                // The goal of this method is to be called only on the first use
                // and then replace itself (using the setter) to direct all future
                // calls to the proper method.
                config[prop] = function () {
                    // NOTE "this" is Sorter or Grouper!
                    var scope = me.resolveListenerScope(),
                        fn = scope && scope[name],
                        ret = 0;

                    if (fn) {
                        this[setter](fn.bind(scope));

                        ret = fn.apply(scope, arguments);
                    }
                    //<debug>
                    else if (!scope) {
                        Ext.raise('Cannot resolve scope for column ' + me.id);
                    }
                    else {
                        Ext.raise('No such method "' + name + '" on ' + scope.$className);
                    }
                    //</debug>

                    return ret;
                };
            }

            return config;
        }
    } // privates

    /**
     * @method getEditor
     * Returns the value of {@link #editor}
     *
     * **Note:** This method will only have an implementation if the
     * {@link Ext.grid.plugin.Editable Editing plugin} has been enabled on the grid.
     *
     * @return {Mixed} The editor value.
     */
    /**
     * @method setEditor
     * @chainable
     * Sets the form field to be used for editing.
     *
     * **Note:** This method will only have an implementation if the
     * {@link Ext.grid.plugin.Editable Editing plugin} has been enabled on the grid.
     *
     * @param {Object} field An object representing a field to be created. You must
     * include the column's dataIndex as the value of the field's name property when
     * setting the editor field.
     *
     *     column.setEditor({
     *         xtype: 'textfield',
     *         name: column.getDataIndex()
     *     });
     *
     * @return {Ext.column.Column} this
     */

    /**
     * @method getDefaultEditor
     * Returns the value of {@link #defaultEditor}
     *
     * **Note:** This method will only have an implementation if the
     * {@link Ext.grid.plugin.Editable Editing plugin} has been enabled on the grid.
     *
     * @return {Mixed} The defaultEditor value.
     */
    /**
     * @method setDefaultEditor
     * @chainable
     * Sets the default form field to be used for editing.
     *
     * **Note:** This method will only have an implementation if the
     * {@link Ext.grid.plugin.Editable Editing plugin} has been enabled on the grid.
     *
     * @param {Object} field An object representing a field to be created. You must
     * include the column's dataIndex as the value of the field's name property when
     * setting the default editor field.
     *
     *     column.setDefaultEditor({
     *         xtype: 'textfield',
     *         name: column.getDataIndex()
     *     });
     *
     * @return {Ext.column.Column} this
     */
});
