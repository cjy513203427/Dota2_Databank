/**
 * This component presents a month calendar and allows the user to browse and select a valid
 * date. It is used as a `floated` popup by {@link Ext.field.Date datefield} but can be created
 * and used directly.
 * @since 6.5.0
 */
Ext.define('Ext.panel.Date', {
    extend: 'Ext.Panel',
    xtype: 'datepanel',

    requires: [
        'Ext.layout.Carousel',
        'Ext.layout.HBox',
        'Ext.panel.DateView',
        'Ext.util.DelayedTask'
    ],

    config: {
        /**
         * @cfg {Number} [panes=1] Number of calendar panes to display in the picker.
         */
        panes: 1,

        /**
         * @cfg {Boolean} [autoConfirm=false] When set to `true`, clicking or tapping on
         * a date cell in the calendar will confirm selection and dismiss the picker.
         * When set to `false`, user will have to click OK button after selecting the date.
         */
        autoConfirm: null,

        /**
         * @cfg {Boolean} [showFooter] Set to `true` to always show footer bar with OK,
         * Cancel, and Today buttons. If this config is not provided, footer will be shown
         * or hidden automatically depending on {@link #autoConfirm}.
         */
        showFooter: null,

        /**
         * @cfg {Boolean} [showTodayButton] Set to `true` to show the Today button. Location
         * will depend on {@link #showFooter} config: if the footer is shown, Today button
         * will be placed in the footer; otherwise the button will be placed in picker header.
         */
        showTodayButton: null,

        /**
         * @cfg {Boolean} [animation=true] Set to `false` to disable animations.
         */
        animation: true,

        /**
         * @cfg {Date[]/String[]/RegExp[]} [specialDates] An array of Date objects, strings, or
         * RegExp patterns designating special dates like holidays. These dates will have
         * 'x-special-day' CSS class added to their cells, allowing for visually distinct styling.
         *
         * If you want to disallow selecting these dates you would need to include them in
         * {@link #disabledDates} config as well.
         */
        specialDates: [],

        /**
         * @cfg {Number[]} [disabledDays]
         * An array of days to disable, 0-based. For example, [0, 6] disables Sunday and Saturday.
         */
        disabledDays: [],

        /**
         * @cfg {Date[]/String[]/RegExp} disabledDates
         * An array of dates to disable. This array can contain Date objects, stringified dates
         * in {@link #format}, or RegExp patterns that would match strings in {@link #format}.
         * Date objects can be used to disable specific dates, while strings will be used to build
         * a regular expression to match dates against.
         * Some examples:
         *
         *   - ['03/08/2003', new Date(2003, 8, 16)] would disable those exact dates
         *   - ['03/08', '09/16'] would disable those days for every year
         *   - ['^03/08'] would only match the beginning (useful if you are using short years)
         *   - [/03\/..\/2006/] would disable every day in March 2006
         *   - /^03/ would disable every day in every March
         *
         * Note that the format of the dates included in the array should exactly match the
         * {@link #format} config.
         */
        disabledDates: [],

        /**
         * @cfg {Date/String} [minDate]
         * Minimum allowable date as Date object or a string in {@link #format}.
         */
        minDate: null,

        /**
         * @cfg {Date/String} [maxDate]
         * Maximum allowable date as Date object or a string in {@link #format}.
         */
        maxDate: null,

        /**
         * @cfg {Boolean} [showBeforeMinDate=false] Set to `true` to allow navigating
         * to months preceding {@link #minDate}. This has no effect when `minDate` is not set.
         */
        showBeforeMinDate: false,

        /**
         * @cfg {Boolean} [showAfterMaxDate=false] Set to `true` to allow navigating
         * to months coming after {@link #maxDate}. This has no effect when `maxDate` is not set.
         */
        showAfterMaxDate: false,

        /**
         * @cfg {Date} [value] Initial value of this picker. Defaults to today.
         */
        value: false,

        /**
         * @cfg {Date} [focusedDate] Date to receive focus when the picker is focused
         * for the first time. Subsequent navigation via keyboard will update this value.
         *
         * This config cannot be null. Default is today.
         * @private
         */
        focusedDate: {
            $value: false,
            lazy: true
        },

        /**
         * @cfg {Boolean} Set to `true` to hide calendar pane captions displaying
         * the month and year shown in each pane.
         */
        hideCaptions: null,

        /**
         * @cfg {String} nextText
         * The next month navigation button tooltip.
         * @locale
         */
        nextText: 'Next Month (Control+Right)',

        /**
         * @cfg {String} prevText
         * The previous month navigation button tooltip.
         * @locale
         */
        prevText: 'Previous Month (Control+Left)',

        /**
         * @cfg {Number} [startDay]
         * Day index at which the week should begin, 0-based.
         *
         * Defaults to the value of {@link Ext.Date.firstDayOfWeek}.
         * @locale
         */
        startDay: {
            $value: Ext.Date.firstDayOfWeek,
            cached: true
        },

        /**
         * @cfg {Number[]} [weekendDays] Array of weekend day indices, 0-based.
         *
         * Defaults to the value of {@link Ext.Date.weekendDays}
         * @locale
         */
        weekendDays: {
            $value: Ext.Date.weekendDays,
            cached: true
        },

        /**
         * @cfg {String} format
         * The default date format string which can be overriden for localization support.
         * The format must be valid according to {@link Ext.Date#parse}
         * (defaults to {@link Ext.Date#defaultFormat}).
         * @locale
         */
        format: {
            $value: Ext.Date.defaultFormat,
            cached: true
        },

        headerFormat: {
            $value: 'D, M j Y',
            cached: true
        },

        /**
         * @cfg {String} [paneCaptionFormat="F Y"] Date format for calendar pane captions.
         */
        paneCaptionFormat: {
            $value: 'F Y',
            cached: true
        },

        /**
         * @cfg {String} monthYearFormat
         * The date format for the header month.
         * @locale
         */
        monthYearFormat: {
            $value: 'F Y',
            cached: true
        },

        /**
         * @cfg {String} dateCellFormat The date format to use for date cells,
         * compatible with {@link Ext.Date#format} method.
         * This format usually includes only day of month information.
         * @locale
         */
        dateCellFormat: {
            $value: 'j',
            cached: true
        },

        /**
         * @cfg {Number} [headerLength=1] Length of day names in header cells.
         */
        headerLength: 1
    },

    /**
     * @cfg {Function} [handler] A function that will handle the select event of this picker.
     * The function will receive the following parameters:
     *
     * @params {Ext.picker.Calendar} handler.this The Picker instance
     * @params {Date} handler.date The selected date
     */

    /**
     * @cfg {Object} [scope] The scope in which {@link #handler} function will be called.
     */

    /**
     * @cfg {Function} [transformCellCls] A function that will be called during cell rendering
     * to allow modifying CSS classes applied to the cell.
     *
     * @param {Date} transformCellCls.date Date for which a cell is being rendered.
     * @param {String[]} transformCellCls.classes Array of standard CSS classes for this cell,
     * including class names for {@link #specialDates}, {@link #disabledDates}, etc.
     * You can add custom classes or remove some standard class names as desired.
     */

    focusable: true,
    tabIndex: 0,

    mouseWheelBuffer: 500,

    autoSize: null,

    keyMapTarget: 'bodyElement',

    // Ctrl-PageUp and Ctrl-PageDown are often used in browser to switch tabs
    // so we support both Shift- and Ctrl-PageUp/PageDown for switching years
    keyMap: {
        LEFT: 'onLeftArrowKey',
        RIGHT: 'onRightArrowKey',
        UP: 'onUpArrowKey',
        DOWN: 'onDownArrowKey',
        "*+PAGE_UP": 'onPageUpKey',
        "*+PAGE_DOWN": 'onPageDownKey',
        HOME: 'onHomeKey',
        END: 'onEndKey',
        ENTER: 'onEnterKey',
        SPACE: 'onSpaceKey',
        BACKSPACE: 'onBackspaceKey',
        "*+TAB": 'onTabKey',

        scope: 'this'
    },

    paneXtype: 'datepanelview',

    classCls: Ext.baseCSSPrefix + 'datepanel',

    layout: {
        type: 'carousel',
        animation: {
            duration: 100
        }
    },

    defaultListenerScope: true,
    referenceHolder: true,

    header: {
        titleAlign: 'center'
    },

    tools: {
        previousMonth: {
            iconCls: 'x-fa fa-angle-left',
            cls: Ext.baseCSSPrefix + 'left-year-tool ',
            weight: -100,
            increment: -1,
            tabIndex: null,
            listeners: {
                click: 'onMonthToolClick'
            }
        },
        previousYear: {
            iconCls: 'x-fa fa-angle-double-left',
            cls: Ext.baseCSSPrefix + 'left-month-tool',
            weight: -90,
            increment: -12,
            tabIndex: null,
            listeners: {
                click: 'onMonthToolClick'
            }
        },
        headerTodayButton: {
            xtype: 'button',
            weight: 0,
            text: 'Today',
            handler: 'onTodayButtonClick',
            tabIndex: -1,
            hidden: true
        },
        nextYear: {
            iconCls: 'x-fa fa-angle-double-right',
            cls: Ext.baseCSSPrefix + 'right-month-tool',
            weight: 90,
            increment: 12,
            tabIndex: null,
            listeners: {
                click: 'onMonthToolClick'
            }
        },
        nextMonth: {
            iconCls: 'x-fa fa-angle-right',
            cls: Ext.baseCSSPrefix + 'right-year-tool',
            weight: 100,
            increment: 1,
            tabIndex: null,
            listeners: {
                click: 'onMonthToolClick'
            }
        }
    },

    buttonToolbar: {
        enableFocusableContainer: false,
        cls: Ext.baseCSSPrefix + 'datepanel-footer',
        itemId: 'footer'
    },

    buttons: {
        footerTodayButton: {
            text: 'Today',
            tabIndex: -1,
            hidden: true,
            weight: -20,
            handler: 'onTodayButtonClick'
        },
        spacer: {
            xtype: 'component',
            weight: -10,
            flex: 1
        },
        okButton: {
            text: 'OK',
            tabIndex: -1,
            weight: 10,
            handler: 'onOkButtonClick'
        },
        cancelButton: {
            text: 'Cancel',
            tabIndex: -1,
            weight: 20,
            handler: 'onCancelButtonClick'
        }
    },

    getTemplate: function() {
        var template = this.callParent();

        // Create focus park element *outside* the bodyElement so that we
        // do not key keyboard nav commands during navigation animations
        // when focus is parked.
        template.push({
            reference: 'focusParkingElement',
            cls: Ext.baseCSSPrefix + 'hidden-clip',
            tabIndex: -1,
            'aria-hidden': 'true'
        });

        return template;
    },

    initialize: function() {
        var me = this;

        me.callParent();

        me.updateToolText('prev', me.getPrevText());
        me.updateToolText('next', me.getNextText());

        me.bodyElement.on({
            click: 'onDateClick',
            focus: 'onBodyFocus',
            wheel: 'onMouseWheel',
            scope: me
        });

        // Make sure the panes are refreshed
        me.getShowFooter();
        me.getFocusedDate();
    },

    doDestroy: function() {
        var me = this;

        Ext.destroy(me.animTitle, me.animBody);

        me.callParent();
    },

    getPaneTemplate: function(offset) {
        var me = this;

        return {
            xtype: me.paneXtype,
            monthOffset: offset,
            hideCaption: me.getHideCaptions(),
            startDay: me.getStartDay(),
            weekendDays: me.getWeekendDays(),
            specialDates: me.getSpecialDates(),
            disabledDays: me.getDisabledDays(),
            disabledDates: me.getDisabledDates(),
            minDate: me.getMinDate(),
            maxDate: me.getMaxDate(),
            format: me.getFormat(),
            captionFormat: me.getPaneCaptionFormat(),
            dateCellFormat: me.getDateCellFormat(),
            headerLength: me.getHeaderLength(),
            transformCellCls: me.transformCellCls
        };
    },

    getPaneItems: function() {
        return this.query(this.paneXtype);
    },

    getCenterIndex: function() {
        var count = this.getPanes(),
            index = count - 1;

        return !index ? index : index % 2 ? Math.floor(index / 2) + 1 : Math.floor(index / 2);
    },

    updateToolText: function(type, text) {
        var tool = this.getHeader().down('tool[type=' + type + ']');

        if (tool) {
            tool.setTooltip(text);
        }
    },

    updateNextText: function(text) {
        this.updateToolText('next', text);
    },

    updatePrevText: function(text) {
        this.updateToolText('prev', text);
    },

    applyPanes: function(count) {
        //<debug>
        if (count < 1) {
            Ext.raise("Cannot configure less than 1 pane for Calendar picker");
        }
        //</debug>

        return count;
    },

    updatePanes: function(count) {
        var me = this;

        me.getLayout().setVisibleChildren(count);
        me.initPanes(0);
    },

    updateAnimation: function(animate) {
        this.getLayout().setAnimation(animate);
    },

    updateAutoConfirm: function(autoConfirm) {
        var me = this;

        me.getTools();
        me.getButtons();

        if (!autoConfirm) {
            me.setShowFooter(true);
        }
        else {
            me.setShowFooter(me.initialConfig.showFooter);
        }
    },

    updateShowFooter: function(showFooter) {
        this.down('#footer').setHidden(!showFooter);
        this.getShowTodayButton();
    },

    updateShowTodayButton: function(showButton) {
        var me = this,
            headerBtn, footerBtn;

        me.getTools();
        me.getButtons();

        headerBtn = me.down('#headerTodayButton');
        footerBtn = me.down('#footerTodayButton');

        if (!showButton) {
            headerBtn.hide();
            footerBtn.hide();
        }
        else {
            // May not be visible yet so we check hidden
            if (!me.down('#footer').isHidden()) {
                footerBtn.show();
                headerBtn.hide();
            }
            else {
                headerBtn.show();
                footerBtn.hide();
            }
        }
    },

    applyWeekendDays: function(days) {
        return Ext.Array.toMap(days);
    },

    updateWeekendDays: function(daysMap) {
        this.broadcastConfig('weekendDays', daysMap);
    },

    applyDisabledDays: function(days) {
        return Ext.Array.toMap(days);
    },

    updateDisabledDays: function(daysMap) {
        this.broadcastConfig('disabledDays', daysMap);
    },

    updatePaneCaptionFormat: function(format) {
        this.broadcastConfig('captionFormat', format);
    },

    updateStartDay: function(day) {
        this.broadcastConfig('startDay', day);
    },

    applySpecialDates: function(dates) {
        return this.applyDisabledDates(dates);
    },

    updateSpecialDates: function(cfg) {
        this.broadcastConfig('specialDates', cfg);
    },

    applyDisabledDates: function(dates) {
        var cfg = {
                dates: {}
            },
            re = [],
            item, i, len;

        if (dates instanceof RegExp) {
            cfg.re = dates;
        }
        else {
            if (!Ext.isArray(dates)) {
                dates = [dates];
            }

            for (i = 0, len = dates.length; i < len; i++) {
                item = dates[i];

                if (item instanceof Date) {
                    item = Ext.Date.clearTime(item);
                    cfg.dates[item.getTime()] = true;
                }
                else if (item instanceof RegExp) {
                    re.push(item.source);
                }
                else {
                    re.push(Ext.String.escapeRegex(item));
                }
            }

            if (re.length) {
                cfg.re = new RegExp('(?:' + re.join('|') + ')');
            }
        }

        return cfg;
    },

    updateDisabledDates: function(cfg) {
        this.broadcastConfig('disabledDates', cfg);
    },

    applyMinDate: function(date) {
        if (typeof date === 'string') {
            date = Ext.Date.parse(date, this.getFormat());
        }

        return date;
    },

    updateMinDate: function(date) {
        this.broadcastConfig('minDate', date);
    },

    applyMaxDate: function(date) {
        if (typeof date === 'string') {
            date = Ext.Date.parse(date, this.getFormat());
        }

        return date;
    },

    updateMaxDate: function(date) {
        this.broadcastConfig('maxDate', date);
    },

    updateFormat: function(format) {
        this.broadcastConfig('format', format);
    },

    updateDateCellFormat: function(format) {
        this.broadcastConfig('dateCellFormat', format);
    },

    broadcastConfig: function(config, value) {
        if (this.isConfiguring) {
            return;
        }

        var panes = this.getPaneItems(),
            setter, pane, i, len;

        setter = Ext.Config.map[config].names.set;

        for (i = 0, len = panes.length; i < len; i++) {
            pane = panes[i];

            if (pane[setter]) {
                pane[setter](value);
            }
        }
    },

    applyValue: function(date) {
        if (typeof date === 'string') {
            date = Ext.Date.parse(date, this.getFormat());
        }
        // This is to make sure the default value doesn't get stale
        // in long running apps
        else if (!date) {
            date = new Date();
        }

        return Ext.isDate(date) ? Ext.Date.clearTime(date, true) : null;
    },

    updateValue: function(value, oldValue) {
        var me = this,
            handler = me.handler,
            selectedCls = me.selectedCls,
            cell;

        if (oldValue) {
            cell = me.getCellByDate(oldValue);
            if (cell) {
                cell.removeCls(selectedCls);
            }
        }

        cell = me.getCellByDate(value);
        if (cell) {
            cell.addCls(selectedCls);
        }

        if (!me.isConfiguring) {
            me.fireEvent('change', me, value, oldValue);

            if (handler) {
                Ext.callback(handler, me.scope, [me, value, oldValue]);
            }
        }
    },

    applyFocusedDate: function(date, oldDate) {
        var me = this,
            D = Ext.Date,
            boundary;

        // Null is a valid value to set onFocusLeave in order to clear the focused cell
        // and allow the value to be set the next time the panel is displayed.
        if (date !== null) {
            // Should check default value (today) as well, it could be that
            // allowed selection is in the past or in the future.
            date = D.clearTime(date || new Date());

            if ((boundary = me.getMinDate()) && !me.getShowBeforeMinDate() &&
                date.getTime() < boundary.getTime()) {
                date = boundary;
            }
            else if ((boundary = me.getMaxDate()) && !me.getShowAfterMaxDate() &&
                date.getTime() > boundary.getTime()) {
                date = boundary;
            }

            if (oldDate && D.isEqual(date, oldDate)) {
                me.getCellByDate(date).focus();
                date = undefined;
            }
        }

        return date;
    },

    updateFocusedDate: function(date, oldDate) {
        var me = this,
            toPane, text;

        if (me.destroying || me.destroyed) {
            return;
        }

        if (oldDate) {
            me.updateCellTabIndex(oldDate, -1);
        }

        // No action necessary if we are clearing the focused date.
        // This happens on panel blur so that the focused cell is set back to
        // default rendition, and also so that the next focus call works if
        // the requested date is the same.
        if (date) {
            toPane = me.getPaneByDate(date);
            text = Ext.Date.format(date, me.getHeaderFormat());

            me.setTitleText(text, date, oldDate);

            // New date will be immediately visible, or is in same pane.
            // Simply activate the pane and focus. Do not animate title change.
            if (!me.getAnimation() || me.getLayout().getFrontItem() === toPane) {
                me.navigateTo(date);
                me.getCellByDate(date).focus();
            }

            // There's an animation in the way before we can focus, so
            // temporarily park the focus so we don't get more nav keystrokes.
            // focusParkingElement is outside the bodyElement so we we ill not get
            // keyEvents during this time.
            else {
                me.parkFocus();
                me.navigateTo(date).then(function () {
                    me.getCellByDate(date).focus();
                });
            }

            me.updateCellTabIndex(date, me.getTabIndex());
        }
    },

    onRender: function() {
        var me = this,
            count = me.getPanes(),
            borderWidth;

        me.callParent();

        // Okay this is a hack but will do for now because Carousel layout
        // needs the container to be widthed
        if (me.self.prototype.$paneWidth == null) {
            me.cachePaneWidth();
        }

        borderWidth = me.el.getBorderWidth('lr');
        me.setWidth(borderWidth + count * me.self.prototype.$paneWidth);
    },

    setTitleText: function(text, date, oldDate, animate) {
        var me = this,
            title, direction;

        if (me.destroying || me.destroyed) {
            return;
        }

        if (animate === undefined) {
            animate = me.getAnimation();
        }

        animate = me.rendered ? animate : false;

        title = me.getHeader().getTitle();

        if (animate) {
            direction = (oldDate || date).getTime() < date.getTime() ? 'bottom' : 'top';
            me.animateVertical(title.textElement, direction, '150%', function() {
                title.setText(text);
            }, 'animTitle');
        } else {
            title.setText(text);
        }
    },

    replacePanes: function(increment, animate) {
        var me = this,
            panes, cb, direction;

        if (me.destroying || me.destroyed) {
            return;
        }

        panes = me.getLayout().getVisibleItems();

        cb = function() {
            var pane, offset, j, jlen;

            for (j = 0, jlen = panes.length; j < jlen; j++) {
                pane = panes[j];
                offset = pane.getMonthOffset();
                pane.setMonthOffset(offset + increment);
            }
        };

        if (animate == null) {
            animate = me.getAnimation();
        }

        if (animate) {
            direction = increment < 0 ? 'up' : 'down';
            me.animateVertical(me.carouselElement, direction, 0, cb, 'animBody');
        } else {
            cb();
        }
    },

    initPanes: function(offset) {
        var me = this,
            count = me.getPanes() + 2,
            panes = [],
            oldPanes, index, center, i;

        index = count - 1;
        center = !index ? index : index % 2 ? Math.floor(index / 2) + 1 : Math.floor(index / 2);

        for (i = 0; i < count; i++) {
            panes.push(me.getPaneTemplate((i + offset) - center));
        }

        oldPanes = me.getPaneItems();

        for (i = 0; i < oldPanes.length; i++) {
            me.remove(oldPanes[i], true);
        }

        me.add(panes);
        me.getLayout().setFrontItem(center, false);
    },

    getPaneByDate: function(date) {
        var me = this,
            panes = me.getPaneItems(),
            month, pane, i, len;

        month = Ext.Date.getFirstDateOfMonth(date);

        for (i = 0, len = panes.length; i < len; i++) {
            pane = panes[i];

            if (Ext.Date.isEqual(pane.getMonth(), month)) {
                return pane;
            }
        }

        return null;
    },

    getCellByDate: function(date) {
        var pane = this.getPaneByDate(date);

        return pane ? pane.getCellByDate(date) : null;
    },

    updateCellTabIndex: function(date, tabIndex) {
        var cell = this.getCellByDate(date);

        if (cell) {
            cell.setTabIndex(tabIndex);

            if (tabIndex > -1) {
                this.bodyElement.setTabIndex(null);
            }
        }
        else if (tabIndex > -1) {
            this.bodyElement.setTabIndex(tabIndex);
        }
        return cell;
    },

    canSwitchTo: function(date, offset) {
        var me = this,
            boundary, prevent;

        if (offset < 0) {
            boundary = me.getMinDate();
            prevent = !me.getShowBeforeMinDate();

            if (boundary && prevent) {
                if (date.getTime() < Ext.Date.getFirstDateOfMonth(boundary).getTime()) {
                    return false;
                }
            }
        }
        else if (offset > 0) {
            boundary = me.getMaxDate();
            prevent = !me.getShowAfterMaxDate();

            if (boundary && prevent) {
                if (date.getTime() > Ext.Date.getLastDateOfMonth(boundary).getTime()) {
                    return false;
                }
            }
        }

        return true;
    },

    navigateTo: function(date, animate) {
        var me = this,
            layout = me.getLayout(),
            month, increment, boundary, prevent;

        // Offset is only known beforehand for pointer/touch interaction, where
        // clicking month/year tool switches panes as an action. Keyboard interaction
        // is different; moving focused date might result in not switching panes at all
        // so we have to calculate increment here as a difference between the new date
        // and visible panes.
        // Assignment is intentional
        if (date.getTime() < (month = layout.getFirstVisibleItem().getMonth()).getTime()) {
            boundary = month;
        }
        else if (date.getTime() > (month = layout.getLastVisibleItem().getMonth()).getTime()) {
            boundary = month;
        }
        else {
            boundary = date;
        }

        increment = (date.getFullYear() * 12 + date.getMonth()) -
                    (boundary.getFullYear() * 12 + boundary.getMonth());

        if (increment < 0) {
            boundary = me.getMinDate();
            prevent = !me.getShowBeforeMinDate();

            if (boundary && prevent) {
                if (date.getTime() < Ext.Date.getFirstDateOfMonth(boundary).getTime()) {
                    increment = 0;
                }
            }
        } else if (increment > 0) {
            boundary = me.getMaxDate();
            prevent = !me.getShowAfterMaxDate();

            if (boundary && prevent) {
                if (date.getTime() > Ext.Date.getLastDateOfMonth(boundary).getTime()) {
                    increment = 0;
                }
            }
        }

        if (Math.abs(increment) === 1) {
            return me.switchPanes(increment, animate);
        } else {
            if (increment !== 0) {
                me.replacePanes(increment, animate);
            }
            return Ext.Deferred.getCachedResolved();
        }
    },

    switchPanes: function(increment, animate) {
        var me = this,
            layout = me.getLayout(),
            edgePane, pane;

        edgePane = increment < 0 ? layout.getFirstVisibleItem() : layout.getLastVisibleItem();

        pane = layout.getEdgeItem(increment);
        pane.setMonthOffset(edgePane.getMonthOffset() + increment);

        return layout.move(increment, animate);
    },

    onMonthToolClick: function(tool) {
        var me = this,
            panes = me.getPaneItems(),
            increment = tool.increment,
            index, pane, month;

        index = me.getCenterIndex();
        pane = panes[index];

        month = Ext.Date.add(pane.getMonth(), Ext.Date.MONTH, increment);

        if (!me.canSwitchTo(month, increment)) {
            return;
        }

        if (Math.abs(increment) <= me.getPanes()) {
            me.switchPanes(increment);
        }
        else {
            me.refreshCellTabIndex();
            me.replacePanes(increment);
        }
    },

    refreshCellTabIndex: function() {
        var me = this,
            focusedDate = me.getFocusedDate(),
            cell;

        cell = me.updateCellTabIndex(focusedDate, me.getTabIndex());

        // If we had a previously focused cell and switched panes so that
        // it is no longer in view, there will be no cell to focus.
        // Unlike keyboard navigation, clicking is allowed to "lose" focus;
        // in fact it's going to be parked within the bodyElement.
        if (cell) {
            cell.focus();
        } else {
            me.parkFocus();
        }
    },

    onDateClick: function(e) {
        var me = this,
            cell = e.getTarget('.' + Ext.baseCSSPrefix + 'cell', 2);

        // Click could land on element other than date cell
        if (!cell || !cell.date || me.getDisabled()) {
            return;
        }

        if (!cell.disabled && me.getAutoConfirm()) {
            me.setValue(cell.date);
        }

        // Clicking on a date should focus its cell even if the date is disabled.
        // Setting the value could have destroyed the picker, so need to check.
        if (!me.destroyed) {
            me.setFocusedDate(cell.date);
        }
    },

    onMouseWheel: function (e) {
        var me = this,
            dy = e.browserEvent.deltaY,
            elapsed;

        if (dy) {
            // Some browsers/platforms like desktop Mac will send a lot of
            // wheel events in sequence, causing very rapid calendar transitions.
            // Buffering the event causes delayed scrolling that we don't want
            // so instead we do reverse buffering: react to the first event
            // and then ignore the rest within some fixed buffer time.
            elapsed = me.mouseWheelTime ? e.timeStamp - me.mouseWheelTime : 1000;

            if (elapsed > me.mouseWheelBuffer) {
                me.mouseWheelTime = e.timeStamp;
                me.onMonthToolClick({
                    increment: dy < 0 ? -1 : 1
                });
            }
        }
    },

    onOkButtonClick: function() {
        // We always have a focused date
        this.setValue(this.getFocusedDate());
    },

    onCancelButtonClick: function() {
        this.fireEventArgs('tabout', [this]);
    },

    onTodayButtonClick: function() {
        var me = this,
            frontPane, offset;

        frontPane = me.getLayout().getFrontItem();
        offset = frontPane.getMonthOffset();

        if (offset !== 0) {
            // This looks smoother if switchPane is used
            if (Math.abs(offset) === 1) {
                me.switchPanes(-offset);
            } else {
                me.replacePanes(-offset);
            }
        }

        me.setFocusedDate(Ext.Date.clearTime(new Date()));
    },

    getFocusEl: function() {
        if (!this.initialized) {
            return null;
        }
        var date = this.getFocusedDate();

        return date ? this.getCellByDate(this.getFocusedDate()) : this.el;
    },

    onLeftArrowKey: function(e) {
        this.walkCells(e.target.date, e.ctrlKey ? Ext.Date.MONTH : Ext.Date.DAY, -1);

        // We need to prevent default to avoid scrolling the nearest container
        // which in case of a floating Date picker will be the document body.
        // This applies to all navigation keys and Space key.
        e.preventDefault();
    },

    onRightArrowKey: function(e) {
        this.walkCells(e.target.date, e.ctrlKey ? Ext.Date.MONTH : Ext.Date.DAY, 1);

        e.preventDefault();
    },

    onUpArrowKey: function(e) {
        this.walkCells(e.target.date, Ext.Date.DAY, -7);

        e.preventDefault();
    },

    onDownArrowKey: function(e) {
        this.walkCells(e.target.date, Ext.Date.DAY, 7);

        e.preventDefault();
    },

    onPageUpKey: function(e) {
        var unit = e.ctrlKey || e.shiftKey ? Ext.Date.YEAR : Ext.Date.MONTH;

        this.walkCells(e.target.date, unit, -1);

        e.preventDefault();
    },

    onPageDownKey: function(e) {
        var unit = e.ctrlKey || e.shiftKey ? Ext.Date.YEAR : Ext.Date.MONTH;

        this.walkCells(e.target.date, unit, 1);

        e.preventDefault();
    },

    onHomeKey: function(e) {
        this.walkCells(Ext.Date.getFirstDateOfMonth(e.target.date));

        e.preventDefault();
    },

    onEndKey: function(e) {
        this.walkCells(Ext.Date.getLastDateOfMonth(e.target.date));

        e.preventDefault();
    },

    onBackspaceKey: function(e) {
        this.walkCells(new Date());

        e.preventDefault();
    },

    onEnterKey: function(e) {
        var target = e.target;

        if (target && target.date && !target.disabled) {
            this.setValue(target.date);
        }
    },

    onSpaceKey: function(e) {
        this.onEnterKey(e);

        // Space key scrolls as well
        e.preventDefault();
    },

    onTabKey: function(e) {
        // When the picker is floating and attached to an input field, its
        // 'select' handler will focus the inputEl so when navigation happens
        // it does so as if the input field was focused all the time.
        // This is the desired behavior and we try not to interfere with it
        // in the picker itself, see below.
        this.handleTabKey(e);

        // Allow default behaviour of TAB - it MUST be allowed to navigate.
        return true;
    },

    handleTabKey: function(e) {
        var me = this,
            target = e.target,
            picker = me.pickerField;

        // We're only setting the value if autoConfirm == true; if it's not then pressing
        // Enter key or clicking OK button is required to confirm date selection
        if (!me.getDisabled() && me.getAutoConfirm() && target && target.date && !target.disabled) {
            me.setValue(target.date);

            // If the ownerfield is part of an editor we must preventDefault and let
            // the navigationModel handle the tab event.
            if (picker && picker.isEditorComponent) {
                e.preventDefault();
            }
        }
        // Even if the above condition is not met we have to let the field know
        // that we're tabbing out; that's user action we can do nothing about
        else {
            me.fireEventArgs('tabout', [me]);
        }
    },

    walkCells: function(date, unit, increment) {
        var me = this,
            newDate;

        if (!me.getDisabled()) {
            // The event can come from focus parking element
            date = date || me.getFocusedDate();
            newDate = unit ? Ext.Date.add(date, unit, increment) : date;

            me.setFocusedDate(newDate);
        }
    },

    onBodyFocus: function(e) {
        var date, cell;

        date = this.getFocusedDate() || Ext.Date.clearTime(new Date());
        cell = this.getCellByDate(date);

        // Make sure there is a focusable cell in the view
        if (!cell) {
            this.navigateTo(date);
        }

        cell = this.updateCellTabIndex(date, this.getTabIndex());

        this.focusCell(cell);
    },

    parkFocus: function() {
        this.focusParkingElement.focus();
    },

    getTabIndex: function() {
        // We want this method to always return configured tabIndex value
        // instead of trying to read it off the `focusEl`.
        return this.getConfig('tabIndex', true);
    },

    getFocusClsEl: function() {
        return this.bodyElement;
    },

    onFocusEnter: function(e) {
        if (this.bodyElement.contains(e.target)) {
            this.onFocus(e);
        }

        this.callParent([e]);
    },

    onFocusLeave: function(e) {
        // Must clear our value on blur to clear the selected rendition
        // and also to allow DO focusing to proceed next time in case the
        // same value is requested to take focus.
        this.setFocusedDate(null);
        this.onBlur(e);
        this.callParent([e]);
    },

    privates: {
        clonedCls: Ext.baseCSSPrefix + 'cloned',
        selectedCls: Ext.baseCSSPrefix + 'selected',

        animateVertical: function(el, direction, offset, beforeFn, prop) {
            var me = this,
                clone = el.dom.cloneNode(true);

            clone.id = '';

            Ext.fly(clone).addCls(me.clonedCls);

            el.parent().appendChild(clone);

            if (beforeFn) {
                beforeFn();
            }

            Ext.destroy(me[prop]);

            me[prop] = Ext.Animator.run([{
                offset: offset,
                type: 'slide',
                direction: direction,
                element: el
            }, {
                offset: offset,
                type: 'slideOut',
                direction: direction,
                element: clone,
                callback: function() {
                    Ext.fly(clone).destroy();
                    me[prop] = null;
                }
            }]);
        },

        cachePaneWidth: function(pane) {
            var container = new Ext.Container({
                cls: this.classCls,
                items: [this.getPaneTemplate(0)]
            });

            container.el.setStyle({
                position: 'absolute',
                top: '-10000px',
                'border-width': 0
            });

            container.render(Ext.getBody());

            pane = container.down(this.paneXtype);

            this.self.prototype.$paneWidth = parseInt(window.getComputedStyle(pane.el.dom).width);
            Ext.destroy(container);
        }
    }
});
