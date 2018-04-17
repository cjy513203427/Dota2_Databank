/**
 * A base class for an event widget. A default implementation is provided
 * by {@link Ext.calendar.Event}. This class should be extended to
 * provide a custom implementation.
 * @abstract
 */
Ext.define('Ext.calendar.EventBase', {
    extend: 'Ext.Gadget',
    config: {
        //<locale>
        /**
         * @cfg {String} defaultTitle
         * The default title to use when one is not specified.
         */
        defaultTitle: '(New Event)',
        //</locale>
        /**
         * @cfg {Date} endDate
         * The end date for this event (as UTC). Will be set automatically if
         * a {@link #model} is passed. May be set independently
         * of any attached {@link #model}.
         */
        endDate: null,
        /**
         * @cfg {String} mode
         * The display mode for this event. Possible options are:
         * - `weekspan`
         * - `weekinline`
         * - `day`
         */
        mode: null,
        /**
         * @cfg {Ext.calendar.model.EventBase} model
         * A backing model for this widget.
         */
        model: null,
        /**
         * @cfg {Ext.calendar.theme.Palette} palette
         * A color palette for this event.
         */
        palette: null,
        /**
         * @cfg {Boolean} resize
         * `true` to allow this event to be resized via the UI.
         */
        resize: false,
        /**
         * @cfg {Date} startDate
         * The start date for this event (as UTC). Will be set automatically if
         * a {@link #model} is passed. May be set independently
         * of any attached {@link #model}.
         */
        startDate: null,
        /**
         * @cfg {String} title
         * The title for this event. Will be set automatically if
         * a {@link #model} is passed.
         */
        title: '',
        /**
         * @inheritdoc
         */
        touchAction: {
            panX: false,
            panY: false
        },
        /**
         * @cfg {Ext.calendar.view.Base} view
         * The view for this event.
         */
        view: null
    },
    /**
     * Clone this event to be used as a proxy for a drag.
     * @return {Ext.calendar.EventBase} The event.
     */
    cloneForProxy: function() {
        var T = this.self;
        return new T(this.config);
    },
    updateModel: function(model) {
        var me = this,
            dom;
        if (model) {
            me.setStartDate(model.getStartDate());
            me.setEndDate(model.getEndDate());
            me.setTitle(model.getTitle());
            dom = me.element.dom;
            dom.setAttribute('data-eventId', model.id);
            dom.setAttribute('data-calendarId', model.getCalendarId());
        }
    },
    updateResize: function(resize) {
        this.toggleCls(this.$allowResizeCls, resize);
    },
    privates: {
        $allowResizeCls: Ext.baseCSSPrefix + 'calendar-event-resizable'
    }
});

/**
 * Represents an event on a calendar view.
 */
Ext.define('Ext.calendar.Event', {
    extend: 'Ext.calendar.EventBase',
    xtype: 'calendar-event',
    config: {
        //<locale>
        /**
         * @cfg {String} timeFormat
         * A display format for the time.
         */
        timeFormat: 'H:i'
    },
    //</locale>
    smallSize: 60,
    getElementConfig: function() {
        var cfg = this.callParent();
        cfg.cls = Ext.baseCSSPrefix + 'calendar-event';
        cfg.children = [
            {
                cls: Ext.baseCSSPrefix + 'calendar-event-inner',
                reference: 'innerElement',
                children: [
                    {
                        cls: Ext.baseCSSPrefix + 'calendar-event-time',
                        reference: 'timeElement',
                        children: [
                            {
                                tag: 'span',
                                reference: 'startElement',
                                cls: Ext.baseCSSPrefix + 'calendar-event-time-start'
                            },
                            {
                                tag: 'span',
                                html: ' - ',
                                reference: 'separatorElement',
                                cls: Ext.baseCSSPrefix + 'calendar-event-time-separator'
                            },
                            {
                                tag: 'span',
                                reference: 'endElement',
                                cls: Ext.baseCSSPrefix + 'calendar-event-time-end'
                            }
                        ]
                    },
                    {
                        reference: 'titleElement',
                        tag: 'span',
                        cls: Ext.baseCSSPrefix + 'calendar-event-title'
                    },
                    {
                        cls: Ext.baseCSSPrefix + 'calendar-event-resizer',
                        reference: 'resizerElement'
                    }
                ]
            }
        ];
        return cfg;
    },
    updateEndDate: function(date) {
        this.endElement.dom.innerHTML = this.displayDate(date);
        this.calculateSize();
    },
    updateMode: function(mode) {
        var me = this;
        me.addCls(this.modes[mode]);
        if (mode === 'weekinline' || mode === 'weekspan') {
            me.addCls(me.$inlineTitleCls);
        }
    },
    updatePalette: function(palette) {
        var inner = this.innerElement.dom.style,
            mode = this.getMode();
        if (mode === 'weekspan' || mode === 'day') {
            inner.backgroundColor = palette.primary;
            inner.color = palette.secondary;
            if (mode === 'day') {
                this.element.dom.style.borderColor = palette.border;
            }
        } else {
            inner.color = palette.primary;
        }
    },
    updateStartDate: function(date) {
        this.startElement.dom.innerHTML = this.displayDate(date);
        this.calculateSize();
    },
    updateTitle: function(title) {
        title = title || this.getDefaultTitle();
        this.titleElement.dom.innerHTML = Ext.String.htmlEncode(title);
    },
    privates: {
        $inlineTitleCls: Ext.baseCSSPrefix + 'calendar-event-inline-title',
        modes: {
            day: Ext.baseCSSPrefix + 'calendar-event-day',
            weekspan: Ext.baseCSSPrefix + 'calendar-event-week-span',
            weekinline: Ext.baseCSSPrefix + 'calendar-event-week-inline'
        },
        calculateSize: function() {
            var me = this,
                start = me.getStartDate(),
                end = me.getEndDate(),
                ms = me.getView().MS_TO_MINUTES,
                isDay = me.getMode() === 'day',
                small;
            if (!isDay || (start && end)) {
                small = !isDay || ((end - start) <= me.smallSize * ms);
                me.element.toggleCls(me.$inlineTitleCls, small);
            }
        },
        displayDate: function(d) {
            var D = Ext.Date;
            if (d) {
                d = this.getView().utcToLocal(d);
                return Ext.Date.format(d, this.getTimeFormat());
            }
        }
    }
});

/**
 * A base class for the calendar view.
 *
 * @private
 */
Ext.define('Ext.calendar.AbstractList', {
    extend: 'Ext.view.View',
    updateNavigationModel: function(navigationModel, oldNavigationModel) {
        navigationModel.focusCls = '';
    },
    onItemClick: function(record, item, index, e) {
        this.callParent([
            record,
            item,
            index,
            e
        ]);
        this.handleItemTap(record);
    }
});

/**
 * A simple view for displaying a list of calendars.
 */
Ext.define('Ext.calendar.List', {
    extend: 'Ext.calendar.AbstractList',
    xtype: 'calendar-list',
    config: {
        /**
         * @cfg {Boolean} enableToggle
         * `true` to allow the calendar {@link Ext.calendar.model.CalendarBase#setHidden hidden}
         * state to be toggled when tapping on a calendar.
         */
        enableToggle: true
    },
    cls: Ext.baseCSSPrefix + 'calendar-list',
    itemTpl: '<div class="' + '<tpl if="hidden">' + Ext.baseCSSPrefix + 'calendar-list-item-hidden' + '</tpl>">' + '<div class="' + Ext.baseCSSPrefix + 'calendar-list-icon" style="background-color: {color};"></div>' + '<div class="' + Ext.baseCSSPrefix + 'calendar-list-text">{title:htmlEncode}</div>' + '</div>',
    itemSelector: '.' + Ext.baseCSSPrefix + 'calendar-list-item',
    itemCls: Ext.baseCSSPrefix + 'calendar-list-item',
    scrollable: true,
    prepareData: function(data, index, record) {
        return {
            id: record.id,
            editable: record.isEditable(),
            hidden: record.isHidden(),
            color: record.getBaseColor(),
            title: record.getTitle()
        };
    },
    handleItemTap: function(record) {
        if (this.getEnableToggle()) {
            record.setHidden(!record.isHidden());
        }
    }
});

/**
 * Utiltiy class for dealing with date ranges.
 */
Ext.define('Ext.calendar.date.Range', {
    /**
     * @property {Date} end
     * The end of this range.
     */
    end: null,
    /**
     * @property {Date} start
     * The start of this range.
     */
    start: null,
    isRange: true,
    statics: {
        fly: (function() {
            var range = null;
            return function(start, end) {
                if (start.isRange) {
                    return start;
                }
                if (!range) {
                    range = new Ext.calendar.date.Range();
                }
                range.start = start;
                range.end = end;
                return range;
            };
        })()
    },
    /**
     * @constructor
     * @param {Date} start The start date.
     * @param {Date} end The end date.
     */
    constructor: function(start, end) {
        this.start = start;
        this.end = end;
    },
    /**
     * Clone this range.
     * @return {Ext.calendar.date.Range} The new range.
     */
    clone: function() {
        var D = Ext.Date,
            T = this.self;
        return new T(D.clone(this.start), D.clone(this.end));
    },
    /**
     * Checks if this range contains a date.
     * @param {Date} d The date.
     * @return {Boolean} `true` if this date is contained in the range.
     */
    contains: function(d) {
        return this.start <= d && d <= this.end;
    },
    /**
     * Checks if this range fully contains another range (inclusive).
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if this range fully contains another range.
     */
    containsRange: function(start, end) {
        var other = this.self.fly(start, end);
        return other.start >= this.start && other.end <= this.end;
    },
    /**
     * Checks if this range equals another range.
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if this range equals another range.
     */
    equals: function(start, end) {
        if (!start) {
            return false;
        }
        var other = this.self.fly(start, end);
        return this.start.getTime() === other.start.getTime() && this.end.getTime() === other.end.getTime();
    },
    /**
     * Get the duration of this range in milliseconds.
     * @return {Number} The duration.
     */
    getDuration: function() {
        return this.end.getTime() - this.start.getTime();
    },
    /**
     * Checks if this range is fully contained by another range.
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if this range fully is fully contained by another range.
     */
    isContainedBy: function(start, end) {
        var other = this.self.fly(start, end);
        return other.containsRange(this);
    },
    /**
     * Checks if any part of this range overlaps another range.
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if this range overlaps any part of the other range.
     */
    overlaps: function(start, end) {
        var other = this.self.fly(start, end);
        return other.start < this.end && this.start < other.end;
    }
});

/**
 * Date utility methods.
 */
Ext.define('Ext.calendar.date.Util', {
    singleton: true,
    /**
     * Clear the time portion of a date as UTC.
     * @param {Date} d The date.
     * @param {Boolean} [clone=false] `true` to create a copy of the passed date
     * and not modify it directly.
     * @return {Date} The date. This will be the original date instance if
     * `clone` was not set.
     */
    clearTimeUtc: function(d, clone) {
        if (clone) {
            d = Ext.Date.clone(d);
        }
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return d;
    },
    privates: {
        getDefaultTimezoneOffset: function() {
            return (new Date()).getTimezoneOffset();
        },
        /**
         * Get the current local date.
         * @return {Date} The date.
         *
         * @private
         */
        getLocalNow: function() {
            // Could be useful for overriding with testing.
            return new Date();
        },
        /**
         * Expand a date range via UTC, set the start to 0 hours, set the end to 0 hours (if needed).
         * @param {Ext.calendar.date.Range} range The range.
         * @return {Ext.calendar.date.Range} The new range.
         *
         * @private
         */
        expandRange: function(range) {
            var D = Ext.Date,
                start = range.start,
                end = range.end;
            start = D.clone(start);
            start.setUTCHours(0);
            if (end.getUTCHours() !== 0) {
                // Move to the next day
                end = D.clone(end);
                end.setUTCHours(24);
            }
            return new Ext.calendar.date.Range(start, end);
        }
    }
});

/**
 * A drag proxy for week style events.
 */
Ext.define('Ext.calendar.dd.WeeksProxy', {
    extend: 'Ext.drag.proxy.Placeholder',
    alias: 'drag.proxy.calendar-weeks',
    config: {
        //<locale>
        /**
         * @cfg {String/Ext.XTemplate}
         * The title to be used while dragging. Values passed:
         * - `model` - The event model.
         * - `title` - The current title.
         * - `days` - The number of days spanned.
         */
        titleTpl: '<tpl if="days &gt; 1">' + '({days} days) ' + '</tpl>' + '{title}',
        //</locale>
        width: null
    },
    draggingCls: Ext.baseCSSPrefix + 'calendar-event-dragging',
    // Appliers/Updaters
    applyTitleTpl: function(titleTpl) {
        if (titleTpl && !titleTpl.isXTemplate) {
            titleTpl = new Ext.XTemplate(titleTpl);
        }
        return titleTpl;
    },
    getElement: function(info) {
        var me = this,
            source = info.source,
            view = info.view,
            clone = info.widget.cloneForProxy(),
            el = clone.element;
        clone.removeCls(view.$staticEventCls);
        clone.addCls(me.draggingCls);
        clone.addCls(me.placeholderCls);
        view.element.appendChild(el);
        clone.setWidth(me.getWidth());
        me.setTitle(clone);
        me.clone = clone;
        me.element = el;
        return el;
    },
    cleanup: function() {
        this.clone = this.element = Ext.destroy(this.clone);
    },
    privates: {
        setTitle: function(clone) {
            var titleTpl = this.getTitleTpl(),
                model;
            if (titleTpl) {
                model = clone.getModel();
                clone.setTitle(titleTpl.apply({
                    model: model,
                    title: clone.getTitle(),
                    days: this.getSource().getView().getEventDaysSpanned(model)
                }));
            }
        }
    }
});

/**
 * Provides DOM helper methods for calendar.
 *
 * @private
 */
Ext.define('Ext.calendar.util.Dom', {
    singleton: true,
    /**
     * Extract the positions for the childnodes of an element.
     * @param {Ext.dom.Element/HTMLElement} parentNode The parent node.
     * @param {String} method The position method to call. Should be a
     * Ext.dom.Element method.
     * @return {Number[]} The values.
     *
     * @private
     */
    extractPositions: function(nodes, method) {
        var len = nodes.length,
            pos = [],
            i;
        for (i = 0; i < len; ++i) {
            pos.push(Ext.fly(nodes[i])[method]());
        }
        return pos;
    },
    /**
     * Find index via the positions.
     * @param {Number[]} positions The positions to check against.
     * @param {Number} pos The position to match.
     * @return {Number} The index.
     *
     * @private
     */
    getIndexPosition: function(positions, pos) {
        var len = positions.length,
            index, i;
        if (pos < positions[0]) {
            index = 0;
        } else if (pos > positions[len - 1]) {
            index = len - 1;
        } else {
            for (i = len - 1; i >= 0; --i) {
                if (pos > positions[i]) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
});

/**
 * A source for events for the all day section of {@link Ext.calendar.view.Days}.
 * 
 * @private
 */
Ext.define('Ext.calendar.dd.DaysAllDaySource', {
    extend: 'Ext.drag.Source',
    requires: [
        'Ext.calendar.dd.WeeksProxy',
        'Ext.calendar.util.Dom'
    ],
    activateOnLongPress: 'touch',
    config: {
        proxy: {
            type: 'calendar-weeks',
            width: 200
        },
        view: null
    },
    describe: function(info) {
        var view = this.getView(),
            event = view.getEvent(info.eventTarget);
        info.event = event;
        info.widget = view.getEventWidget(event);
        info.setData('calendar-event-allday', event);
        info.view = view;
    },
    beforeDragStart: function(info) {
        return this.getView().handleChangeStart('drag', info.event);
    },
    updateView: function(view) {
        if (view) {
            this.setHandle('.' + view.$eventCls);
            this.setElement(view.allDayContent);
        }
    },
    destroy: function() {
        this.setView(null);
        this.callParent();
    },
    privates: {
        setup: function(info) {
            this.callParent([
                info
            ]);
            var view = info.view,
                event = info.event,
                positions = Ext.calendar.util.Dom.extractPositions(view.backgroundCells, 'getX'),
                index = Ext.calendar.util.Dom.getIndexPosition(positions, info.cursor.current.x);
            info.positions = positions;
            info.span = view.getEventDaysSpanned(event);
        }
    }
});

/**
 * A target for events for the all day section of {@link Ext.calendar.view.Days}.
 * 
 * @private
 */
Ext.define('Ext.calendar.dd.DaysAllDayTarget', {
    extend: 'Ext.drag.Target',
    requires: [
        'Ext.calendar.util.Dom',
        'Ext.calendar.date.Range'
    ],
    config: {
        view: null
    },
    updateView: function(view) {
        if (view) {
            this.setElement(view.allDayContent);
        }
    },
    accepts: function(info) {
        return Ext.Array.contains(info.types, 'calendar-event-allday');
    },
    onDragMove: function(info) {
        var D = Ext.Date,
            view = info.view,
            index;
        if (info.valid) {
            index = Ext.calendar.util.Dom.getIndexPosition(info.positions, info.cursor.current.x);
            view.selectRange(index, index + info.span - 1);
        }
        this.callParent([
            info
        ]);
    },
    onDragLeave: function(info) {
        this.getView().clearSelected();
        this.callParent([
            info
        ]);
    },
    onDrop: function(info) {
        var D = Ext.Date,
            view = info.view,
            event = info.event,
            index = Ext.calendar.util.Dom.getIndexPosition(info.positions, info.cursor.current.x),
            newStart = view.utcTimezoneOffset(D.add(view.dateInfo.full.start, D.DAY, index, true)),
            start = event.getStartDate(),
            before = newStart < start;
        difference = D.diff(before ? newStart : start, before ? start : newStart, D.DAY);
        if (before) {
            difference = -difference;
        }
        view.handleChange('drop', event, new Ext.calendar.date.Range(D.add(event.getStartDate(), D.DAY, difference, true), D.add(event.getEndDate(), D.DAY, difference, true)), function() {
            view.clearSelected();
        });
        this.callParent([
            info
        ]);
    },
    destroy: function() {
        this.setView(null);
        this.callParent();
    }
});

/**
 * A drag proxy for day style events.
 */
Ext.define('Ext.calendar.dd.DaysProxy', {
    extend: 'Ext.drag.proxy.Placeholder',
    alias: 'drag.proxy.calendar-days',
    config: {
        cursorOffset: null
    },
    draggingCls: Ext.baseCSSPrefix + 'calendar-event-dragging',
    getElement: function(info) {
        var me = this,
            source = info.source,
            view = info.view,
            widget = info.widget,
            clone = widget.cloneForProxy(),
            el = clone.element;
        clone.removeCls(view.$staticEventCls);
        clone.addCls(me.draggingCls);
        clone.setWidth(Ext.fly(view.getEventColumn(0)).getWidth());
        clone.setHeight(widget.getHeight());
        view.bodyTable.appendChild(el);
        me.element = el;
        me.clone = clone;
        info.widgetClone = clone;
        return el;
    },
    cleanup: function(info) {
        if (info && info.deferCleanup) {
            return;
        }
        this.clone = this.element = Ext.destroy(this.clone);
    }
});

/**
 * A source for events for the body of {@link Ext.calendar.view.Days}.
 * 
 * @private
 */
Ext.define('Ext.calendar.dd.DaysBodySource', {
    extend: 'Ext.drag.Source',
    requires: [
        'Ext.calendar.dd.DaysProxy',
        'Ext.calendar.util.Dom'
    ],
    activateOnLongPress: 'touch',
    config: {
        proxy: {
            type: 'calendar-days'
        },
        view: null
    },
    describe: function(info) {
        var view = this.getView();
        info.event = view.getEvent(info.eventTarget);
        info.widget = view.getEventWidget(info.event);
        info.setData('calendar-event', info.event);
        info.view = view;
    },
    beforeDragStart: function(info) {
        var cls = this.getView().$resizerCls;
        if (Ext.fly(info.eventTarget).hasCls(cls)) {
            return false;
        }
        return this.getView().handleChangeStart('drag', info.event);
    },
    updateView: function(view) {
        var me = this;
        if (view) {
            me.setHandle('.' + view.$eventCls);
            me.setElement(view.bodyTable);
            me.setConstrain({
                snap: {
                    x: me.snapX,
                    y: me.snapY
                }
            });
        }
    },
    onDragStart: function(info) {
        this.callParent([
            info
        ]);
        info.widget.element.hide();
    },
    onDragEnd: function(info) {
        this.callParent([
            info
        ]);
        var w = info.widget;
        if (!w.destroyed && !info.deferCleanup) {
            w.element.show();
        }
    },
    destroy: function() {
        this.setView(null);
        this.callParent();
    },
    privates: {
        startMarginName: 'left',
        setup: function(info) {
            this.callParent([
                info
            ]);
            var view = info.view,
                days = view.getVisibleDays(),
                positions = [],
                i;
            for (i = 0; i < days; ++i) {
                positions.push(Ext.fly(view.getEventColumn(i)).getX());
            }
            info.sizes = {
                height: info.proxy.element.getHeight(),
                slotStyle: view.getSlotStyle(),
                margin: view.getEventStyle().margin,
                startPositions: positions,
                startOffset: info.cursor.initial.y - info.widget.element.getY()
            };
        },
        snapX: function(info, x) {
            var sizes = info.sizes,
                positions = sizes.startPositions,
                index = Ext.calendar.util.Dom.getIndexPosition(positions, x);
            info.dayIndex = index;
            // Scope not "this"
            return positions[index] + sizes.margin[info.source.startMarginName];
        },
        snapY: function(info, y) {
            var sizes = info.sizes,
                view = info.view,
                bodyOffset = view.bodyTable.getY(),
                halfHeight = sizes.slotStyle.halfHeight,
                maxSlots = view.maxSlots,
                offsetY = Math.max(0, y - sizes.startOffset - bodyOffset);
            y = bodyOffset + sizes.margin.top + Ext.Number.roundToNearest(offsetY, halfHeight);
            return Math.min(y, bodyOffset + maxSlots * halfHeight - sizes.height);
        }
    }
});

/**
 * A target for events for the body of {@link Ext.calendar.view.Days}.
 * 
 * @private
 */
Ext.define('Ext.calendar.dd.DaysBodyTarget', {
    extend: 'Ext.drag.Target',
    config: {
        view: null
    },
    updateView: function(view) {
        if (view) {
            this.setElement(view.bodyTable);
        }
    },
    accepts: function(info) {
        return Ext.Array.contains(info.types, 'calendar-event');
    },
    onDragMove: function(info) {
        var sizes = info.sizes,
            view = info.view,
            event = info.event,
            D = Ext.Date,
            y, start, end;
        if (info.valid) {
            y = Math.max(0, info.proxy.current.y - view.bodyTable.getY());
            slot = Math.floor(y / sizes.slotStyle.halfHeight);
            start = D.clone(view.dateInfo.visible.start);
            start = D.add(start, D.DAY, info.dayIndex || 0, true);
            start = D.add(start, D.MINUTE, view.minimumEventMinutes * slot, true);
            end = D.add(start, D.MINUTE, event.getDuration(), true);
            info.widgetClone.setStartDate(start);
            info.widgetClone.setEndDate(end);
            info.range = [
                start,
                end
            ];
        }
        this.callParent([
            info
        ]);
    },
    onDrop: function(info) {
        var view = this.getView(),
            proxy = info.source.getProxy();
        info.deferCleanup = true;
        view.handleChange('drop', info.event, new Ext.calendar.date.Range(info.range[0], info.range[1]), function() {
            proxy.cleanup();
            var w = info.widget;
            if (!w.destroyed) {
                w.element.show();
            }
            view.clearSelected();
        });
        this.callParent([
            info
        ]);
    },
    destroy: function() {
        this.setView(null);
        this.callParent();
    }
});

/**
 * A source for events for {@link Ext.calendar.view.Weeks}.
 * 
 * @private
 */
Ext.define('Ext.calendar.dd.WeeksSource', {
    extend: 'Ext.drag.Source',
    requires: [
        'Ext.calendar.dd.WeeksProxy'
    ],
    activateOnLongPress: 'touch',
    config: {
        proxy: {
            type: 'calendar-weeks',
            width: 200
        },
        view: null
    },
    describe: function(info) {
        var view = this.getView();
        info.event = view.getEvent(info.eventTarget);
        info.widget = view.getEventWidget(info.eventTarget);
        info.setData('calendar-event', info.event);
        info.view = view;
    },
    beforeDragStart: function(info) {
        return this.getView().handleChangeStart('drag', info.event);
    },
    onDragStart: function(info) {
        var view = info.view,
            cursor = info.cursor.current,
            cell = view.getCellByPosition(cursor.x, cursor.y),
            event = info.event;
        info.span = view.getEventDaysSpanned(event);
        info.startDate = view.getDateFromCell(cell);
        this.callParent([
            info
        ]);
    },
    updateView: function(view) {
        if (view) {
            this.setHandle('.' + view.$eventCls);
            this.setElement(view.element);
        }
    },
    destroy: function() {
        this.setView(null);
        this.callParent();
    }
});

/**
 * A target for events for {@link Ext.calendar.view.Weeks}.
 * 
 * @private
 */
Ext.define('Ext.calendar.dd.WeeksTarget', {
    extend: 'Ext.drag.Target',
    requires: [
        'Ext.calendar.date.Range'
    ],
    config: {
        view: null
    },
    updateView: function(view) {
        if (view) {
            this.setElement(view.element);
        }
    },
    accepts: function(info) {
        return Ext.Array.contains(info.types, 'calendar-event');
    },
    onDragMove: function(info) {
        var D = Ext.Date,
            view = info.view,
            cursor = info.cursor.current,
            span = info.span,
            cell, d, end;
        if (info.valid) {
            cell = view.getCellByPosition(cursor.x, cursor.y);
            d = end = view.getDateFromCell(cell);
            end = D.add(d, D.DAY, span - 1, true);
            view.selectRange(d, end);
        }
        this.callParent([
            info
        ]);
    },
    onDragLeave: function(info) {
        this.getView().clearSelected();
        this.callParent([
            info
        ]);
    },
    onDrop: function(info) {
        var D = Ext.Date,
            cursor = info.cursor.current,
            view = info.view,
            cell = view.getCellByPosition(cursor.x, cursor.y),
            event = info.event,
            difference = this.calculateDifference(event, view.getDateFromCell(cell), info.startDate);
        view.handleChange('drop', event, new Ext.calendar.date.Range(D.add(event.getStartDate(), D.DAY, difference, true), D.add(event.getEndDate(), D.DAY, difference, true)), function() {
            view.clearSelected();
        });
        this.callParent([
            info
        ]);
    },
    destroy: function() {
        this.setView(null);
        this.callParent();
    },
    privates: {
        calculateDifference: function(event, d, startDate) {
            var D = Ext.Date,
                start = event.getStartDate(),
                before, difference;
            if (event.getAllDay()) {
                d = D.localToUtc(d);
                before = d < start;
            } else {
                before = d < startDate;
                start = startDate;
            }
            difference = D.diff(before ? d : start, before ? start : d, D.DAY);
            if (before) {
                difference = -difference;
            }
            return difference;
        }
    }
});

/**
 * A calendar picker component.  Similar to {@link Ext.calendar.List}, the items in the
 * picker will display the title for each source calendar along with a color swatch
 * representing the default color the that calendar's events.
 *
 * The {@link #cfg-store} will be the same {@link Ext.calendar.store.Calendars store}
 * instance used by your target {@link Ext.calendar.view.Base calendar}.
 */
Ext.define('Ext.calendar.form.CalendarPicker', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'calendar-calendar-picker',
    cls: Ext.baseCSSPrefix + 'calendar-picker-field',
    listConfig: {
        cls: Ext.baseCSSPrefix + 'calendar-picker-list',
        getInnerTpl: function(displayField) {
            return '<div class="' + Ext.baseCSSPrefix + 'calendar-picker-list-icon" style="background-color: {color};"></div>' + '<div class="' + Ext.baseCSSPrefix + 'calendar-picker-list-text">{' + displayField + '}</div>';
        },
        prepareData: function(data, index, record) {
            return {
                id: record.id,
                title: record.getTitle(),
                color: record.getBaseColor()
            };
        }
    },
    afterRender: function() {
        this.callParent();
        this.updateValue();
    },
    updateValue: function() {
        var me = this,
            el, record;
        me.callParent();
        record = me.valueCollection.first();
        if (me.rendered) {
            el = me.iconEl;
            if (!el) {
                me.iconEl = el = me.inputWrap.createChild({
                    cls: Ext.baseCSSPrefix + 'calendar-picker-field-icon'
                });
            }
            if (record) {
                el.setDisplayed(true);
                el.setStyle('background-color', record.getBaseColor());
            } else {
                el.setDisplayed(false);
            }
        }
    }
});

/**
 * A base implementation of a form for the classic toolkit.
 * @abstract
 */
Ext.define('Ext.calendar.form.AbstractForm', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.form.field.Checkbox',
        'Ext.calendar.form.CalendarPicker'
    ],
    layout: 'fit',
    modal: true,
    closable: false,
    defaultListenerScope: true,
    config: {
        /**
         * @cfg {Object} calendarField
         * The config for the calendar field.
         */
        calendarField: {
            xtype: 'calendar-calendar-picker',
            fieldLabel: 'Calendar',
            name: 'calendarId',
            forceSelection: true,
            editable: false,
            queryMode: 'local',
            displayField: 'title',
            valueField: 'id'
        },
        /**
         * @cfg {Object} titleField
         * The config for the title field.
         */
        titleField: {
            xtype: 'textfield',
            fieldLabel: 'Title',
            name: 'title',
            allowBlank: false
        },
        /**
         * @cfg {Object} fromContainer
         * The config for the from container.
         */
        fromContainer: {
            xtype: 'fieldcontainer',
            fieldLabel: 'From',
            layout: 'hbox'
        },
        /**
         * @cfg {Object} startDateField
         * The config for the start date field.
         */
        startDateField: {
            xtype: 'datefield',
            itemId: 'startDate',
            name: 'startDate',
            allowBlank: false
        },
        /**
         * @cfg {Object} startTimeField
         * The config for the start time field.
         */
        startTimeField: {
            xtype: 'timefield',
            itemId: 'startTime',
            name: 'startTime',
            margin: '0 0 0 5'
        },
        /**
         * @cfg {Object} toContainer
         * The config for the to container.
         */
        toContainer: {
            xtype: 'fieldcontainer',
            fieldLabel: 'To',
            layout: 'hbox'
        },
        /**
         * @cfg {Object} endDateField
         * The config for the end date field.
         */
        endDateField: {
            xtype: 'datefield',
            itemId: 'endDate',
            name: 'endDate',
            allowBlank: false
        },
        /**
         * @cfg {Object} endTimeField
         * The config for the end time field.
         */
        endTimeField: {
            xtype: 'timefield',
            itemId: 'endTime',
            name: 'endTime',
            margin: '0 0 0 5'
        },
        /**
         * @cfg {Object} allDayField
         * The config for the all day field.
         */
        allDayField: {
            xtype: 'checkbox',
            itemId: 'allDay',
            name: 'allDay',
            boxLabel: 'All Day',
            hideEmptyLabel: false,
            handler: 'onAllDayChange'
        },
        /**
         * @cfg {Object} descriptionField
         * The config for the description field.
         */
        descriptionField: {
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            flex: 1
        },
        /**
         * @cfg {Object} dropButton
         * The config for the drop button. `null` to not show this button.
         */
        dropButton: {
            text: 'Delete',
            handler: 'onDropTap'
        },
        /**
         * @cfg {Object} saveButton
         * The config for the save button.
         */
        saveButton: {
            text: 'Save',
            handler: 'onSaveTap'
        },
        /**
         * @cfg {Object} cancelButton
         * The config for the cancel button.
         */
        cancelButton: {
            text: 'Cancel',
            handler: 'onCancelTap'
        }
    },
    initComponent: function() {
        var me = this;
        me.initForm();
        me.fbar = me.generateButtons();
        me.callParent();
        me.form = me.items.first();
        me.checkFields();
        me.applyValues();
    },
    generateButtons: function() {
        var buttons = [],
            drop = this.getDropButton();
        if (drop) {
            buttons.push(drop);
        }
        buttons.push({
            xtype: 'component',
            flex: 1
        }, this.getSaveButton(), this.getCancelButton());
        return buttons;
    },
    applyValues: function() {
        this.form.getForm().setValues(this.consumeEventData());
    },
    createItems: function() {
        var me = this,
            calField = me.getCalendarField(),
            fromCt = me.getFromContainer(),
            toCt = me.getToContainer();
        if (!calField.store) {
            calField.store = me.getCalendarStore();
        }
        if (!fromCt.items) {
            fromCt.items = [
                me.getStartDateField(),
                me.getStartTimeField()
            ];
        }
        if (!toCt.items) {
            toCt.items = [
                me.getEndDateField(),
                me.getEndTimeField()
            ];
        }
        this.items = [
            {
                xtype: 'form',
                border: false,
                trackResetOnLoad: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 10,
                items: [
                    calField,
                    me.getTitleField(),
                    fromCt,
                    toCt,
                    me.getAllDayField(),
                    me.getDescriptionField()
                ]
            }
        ];
    },
    privates: {
        checkFields: function() {
            var checked = this.down('#allDay').checked;
            this.down('#startTime').setDisabled(checked);
            this.down('#endTime').setDisabled(checked);
        },
        onAllDayChange: function() {
            this.checkFields();
        },
        onCancelTap: function() {
            this.fireCancel();
        },
        onDropTap: function() {
            this.fireDrop();
        },
        onSaveTap: function() {
            var form = this.form,
                values = form.getForm().getFieldValues();
            if (!form.isValid()) {
                return;
            }
            values.allDay = this.down('#allDay').checked;
            this.fireSave(this.produceEventData(values));
        }
    }
});

/**
 * Defines the API used by {@link Ext.calendar.view.Base} for showing
 * forms to add and edit events. A default implementation is provided by
 * {@link Ext.calendar.form.Add} and {@link Ext.calendar.form.Edit}.
 */
Ext.define('Ext.calendar.form.Base', {
    extend: 'Ext.Mixin',
    requires: [
        'Ext.data.ChainedStore'
    ],
    config: {
        /**
         * @cfg {Ext.calendar.model.EventBase} event
         * The data for this form.
         */
        event: null,
        /**
         * @cfg {Ext.calendar.view.Base} view
         * The view form this form.
         */
        view: null
    },
    /**
     * @event cancel
     * Fired when this form is dismissed with no change.
     * @param {Ext.calendar.form.Base} this This form.
     */
    /**
     * @event drop
     * Fired when a drop action is taken on this form.
     * @param {Ext.calendar.form.Base} this This form.
     */
    /**
     * @event save
     * Fired when a create/edit has been made on this form.
     * @param {Ext.calendar.form.Base} this This form.
     * @param {Object} context The context.
     * @param {Object} context.data The data to be pushed into
     * the model via {@link Ext.calendar.model.EventBase#setData setData}.
     */
    /**
     * To be called when a cancel action takes place. Fires the
     * cancel event.
     * @protected
     */
    fireCancel: function() {
        this.fireEvent('cancel', this);
    },
    /**
     * To be called when a drop takes place. Fires the drop
     * event.
     * @protected
     */
    fireDrop: function() {
        this.fireEvent('drop', this);
    },
    /**
     * To be called when a save takes place. Fires the save
     * event.
     * @param {Object} data The form data.
     * @protected
     */
    fireSave: function(data) {
        this.fireEvent('save', this, {
            data: data
        });
    },
    /**
     * Gets a calendar store configuration for use with the calendar picker.
     * Automatically adds a filter to exclude calendars that are not 
     * {@link Ext.calendar.model.CalendarBase#isEditable editable}.
     * @return {Object} The config for the calendar store.
     *
     * @protected
     */
    getCalendarStore: function() {
        return {
            type: 'chained',
            autoDestroy: true,
            source: this.getView().getStore(),
            filters: [
                {
                    filterFn: function(cal) {
                        return cal.isEditable();
                    }
                }
            ]
        };
    }
});

/**
 * A base form implementation for data used with {@link Ext.calendar.model.Event}.
 * @abstract
 */
Ext.define('Ext.calendar.form.Form', {
    extend: 'Ext.calendar.form.AbstractForm',
    mixins: [
        'Ext.calendar.form.Base'
    ],
    /**
     * @cfg {Number[]} defaultStartTime
     * The default start time for events. Should be in the
     * format `[hour, minute]`.
     */
    defaultStartTime: [
        9,
        0
    ],
    /**
     * @cfg {Number[]} defaultEndTime
     * The default start time for events. Should be in the
     * format `[hour, minute]`.
     */
    defaultEndTime: [
        10,
        0
    ],
    initForm: function() {
        this.createItems();
    },
    consumeEventData: function() {
        var me = this,
            D = Ext.Date,
            view = me.getView(),
            event = me.getEvent(),
            start = event.getStartDate(),
            end = event.getEndDate(),
            allDay = event.getAllDay(),
            // Don't take into account the view TZ for allday events
            startDate = allDay ? D.utcToLocal(start) : view.utcToLocal(start),
            endDate = allDay ? D.utcToLocal(end) : view.utcToLocal(end),
            ignoreTimes = allDay || startDate.getTime() === endDate.getTime(),
            data = {
                calendarId: event.getCalendarId(),
                title: event.getTitle(),
                description: event.getDescription(),
                allDay: allDay,
                startDate: startDate,
                endDate: endDate
            },
            editable;
        if (!ignoreTimes) {
            data.startTime = startDate;
            data.endTime = endDate;
        }
        if (allDay) {
            data.endDate = D.subtract(endDate, D.DAY, 1, true);
        }
        me.setDefaultTime(data, 'startTime', me.defaultStartTime);
        me.setDefaultTime(data, 'endTime', me.defaultEndTime);
        if (!data.calendarId) {
            editable = view.getEditableCalendars();
            if (editable.length) {
                data.calendarId = editable[0].id;
            }
        }
        return data;
    },
    produceEventData: function(values) {
        var D = Ext.Date,
            view = this.getView(),
            startTime = values.startTime,
            endTime = values.endTime,
            startDate = values.startDate,
            endDate = values.endDate,
            sYear = startDate.getFullYear(),
            sMonth = startDate.getMonth(),
            sDate = startDate.getDate(),
            eYear = endDate.getFullYear(),
            eMonth = endDate.getMonth(),
            eDate = endDate.getDate();
        if (values.allDay) {
            // All day events are always GMT.
            startDate = D.utc(sYear, sMonth, sDate);
            // midnight the next day
            endDate = D.add(D.utc(eYear, eMonth, eDate), D.DAY, 1, true);
            delete values.startTime;
            delete values.endTime;
        } else {
            startDate = view.toUtcOffset(new Date(sYear, sMonth, sDate, startTime.getHours(), startTime.getMinutes()));
            endDate = view.toUtcOffset(new Date(eYear, eMonth, eDate, endTime.getHours(), endTime.getMinutes()));
        }
        values.startDate = startDate;
        values.endDate = endDate;
        return values;
    },
    privates: {
        setDefaultTime: function(data, key, time) {
            if (!data[key]) {
                data[key] = new Date(2010, 0, 1, time[0], time[1]);
            }
        }
    }
});

/**
 * An add form implementation for data used with {@link Ext.calendar.model.Event}.
 */
Ext.define('Ext.calendar.form.Add', {
    extend: 'Ext.calendar.form.Form',
    xtype: 'calendar-form-add',
    dropButton: null,
    //<locale>
    /**
     * @cfg {String} title
     * The title for the dialog.
     */
    title: 'Add Event'
});
//</locale>

/**
 * An edit form implementation for data used with {@link Ext.calendar.model.Event}.
 */
Ext.define('Ext.calendar.form.Edit', {
    extend: 'Ext.calendar.form.Form',
    xtype: 'calendar-form-edit',
    //<locale>
    /**
     * @cfg {String} title
     * The title for the dialog.
     */
    title: 'Edit Event'
});
//</locale>

/**
 * A base class for displaying a set of days/dates as a horizontal header.
 *
 * @abstract
 */
Ext.define('Ext.calendar.header.Base', {
    extend: 'Ext.Gadget',
    mixins: [
        'Ext.mixin.ConfigState'
    ],
    alternateStateConfig: 'compactOptions',
    config: {
        /**
         * @cfg {String} cellCls
         * A class to add to each day cell.
         */
        cellCls: '',
        /**
         * `true` to display this view in compact mode, typically used
         * for smaller form factors.
         */
        compact: false,
        /**
         * @cfg {Object} [compactOptions]
         * A series of config options for this class to set when this class is in
         * {@link #compact} mode.
         */
        compactOptions: null,
        /**
         * @cfg {String} format
         * The format to display the day in the header.
         */
        format: '',
        /**
         * @cfg {Date} value
         * The starting value to display.
         */
        value: null,
        /**
         * @cfg {Number} visibleDays
         * The number of days to display, starting from the {@link #value}.
         */
        visibleDays: null
    },
    baseCls: Ext.baseCSSPrefix + 'calendar-header',
    constructor: function(config) {
        this.callParent([
            config
        ]);
        this.redrawCells();
    },
    // Appliers/Updaters
    updateCompact: function(compact) {
        var me = this,
            baseCls = me.getBaseCls();
        me.element.toggleCls(baseCls + '-compact', compact);
        me.element.toggleCls(baseCls + '-large', !compact);
        me.toggleConfigState(compact);
    },
    updateCompactOptions: function() {
        if (!this.isConfiguring && this.getCompact()) {
            this.toggleConfigState();
        }
    },
    updateFormat: function() {
        if (!this.isConfiguring) {
            this.setHeaderText(true);
        }
    },
    applyValue: function(value, oldValue) {
        if (value && oldValue && value - oldValue === 0) {
            value = undefined;
        }
        return value;
    },
    updateValue: function() {
        if (!this.isConfiguring) {
            this.setHeaderText();
        }
    },
    updateVisibleDays: function() {
        if (!this.isConfiguring) {
            this.redrawCells();
        }
    },
    getElementConfig: function() {
        return {
            tag: 'table',
            cls: this.$tableCls,
            reference: 'element',
            children: [
                {
                    tag: 'tbody',
                    children: [
                        {
                            tag: 'tr',
                            reference: 'row'
                        }
                    ]
                }
            ]
        };
    },
    privates: {
        domFormat: 'Y-m-d',
        useDates: true,
        $headerCls: Ext.baseCSSPrefix + 'calendar-header-cell',
        $hiddenCls: Ext.baseCSSPrefix + 'calendar-header-hidden-cell',
        $tableCls: Ext.baseCSSPrefix + 'calendar-header-table',
        clearCells: function(limit) {
            limit = limit || 0;
            var row = this.row.dom,
                childNodes = row.childNodes;
            while (childNodes.length > limit) {
                row.removeChild(childNodes[limit]);
            }
        },
        createCells: function() {
            var me = this,
                row = me.row.dom,
                cells = [],
                days = me.getCreateDays(),
                cls = me.getCellCls(),
                cell, i;
            if (cls) {
                cls += ' ' + me.$headerCls;
            } else {
                cls = me.$headerCls;
            }
            for (i = 0; i < days; ++i) {
                cell = document.createElement('td');
                Ext.fly(cell).addCls([
                    me.headerCls,
                    cls
                ]);
                cell.className = cls;
                cell.setAttribute('data-index', i);
                me.onCellCreate(cell, i);
                row.appendChild(cell);
                cells.push(cell);
            }
            return cells;
        },
        getCreateDays: function() {
            return this.getVisibleDays();
        },
        onCellCreate: Ext.privateFn,
        redrawCells: function() {
            this.clearCells();
            this.cells = this.createCells();
            this.setHeaderText();
        },
        setHeaderText: function() {
            var me = this,
                D = Ext.Date,
                value = me.getValue(),
                format = me.getFormat(),
                domFormat = me.domFormat,
                cells = me.cells,
                len = cells.length,
                useDates = me.useDates,
                cell, i;
            if (!value) {
                return;
            }
            value = D.clone(value);
            for (i = 0; i < len; ++i) {
                cell = cells[i];
                if (useDates) {
                    cell.setAttribute('data-date', D.format(value, domFormat));
                }
                cell.setAttribute('data-day', value.getDay());
                cell.innerHTML = D.format(value, format);
                value = D.add(value, D.DAY, 1, true);
            }
        }
    }
});

/**
 * A header for {@link Ext.calendar.view.Days} to display the
 * active dates.
 */
Ext.define('Ext.calendar.header.Days', {
    extend: 'Ext.calendar.header.Base',
    xtype: 'calendar-daysheader',
    /**
     * @inheritdoc
     */
    format: 'D m/d',
    compactOptions: {
        format: 'd'
    },
    getElementConfig: function() {
        var result = this.callParent();
        result.cls = this.$tableCls;
        delete result.reference;
        return {
            cls: Ext.baseCSSPrefix + 'calendar-header',
            reference: 'element',
            children: [
                result
            ]
        };
    },
    privates: {
        headerScrollOffsetName: 'padding-right',
        $gutterCls: Ext.baseCSSPrefix + 'calendar-header-gutter',
        createCells: function() {
            var me = this,
                row = me.row,
                cells = me.callParent();
            row.insertFirst({
                tag: 'td',
                cls: me.$headerCls + ' ' + me.$gutterCls
            });
            row.append({
                tag: 'td',
                style: 'display: none;'
            });
            return cells;
        },
        setOverflowWidth: function(width) {
            this.element.setStyle(this.headerScrollOffsetName, width + 'px');
        }
    }
});

/**
 * A header for {@link Ext.calendar.view.Weeks} to display day names.
 */
Ext.define('Ext.calendar.header.Weeks', {
    extend: 'Ext.calendar.header.Base',
    xtype: 'calendar-weeksheader',
    /**
     * @inheritdoc
     */
    format: 'D',
    privates: {
        useDates: false,
        getCreateDays: function() {
            return Ext.Date.DAYS_IN_WEEK;
        },
        onCellCreate: function(cell, index) {
            Ext.fly(cell).toggleCls(this.$hiddenCls, index >= this.getVisibleDays());
        }
    }
});

/**
 * A mixin that provides some base behaviors for events. The default
 * implementation is {@link Ext.calendar.model.Event}. To provide
 * a custom implementation, this mixin should be used and the remaining
 * parts of the API need to be implemented.
 */
Ext.define('Ext.calendar.model.EventBase', {
    extend: 'Ext.Mixin',
    requires: [
        'Ext.calendar.date.Range'
    ],
    inheritableStatics: {
        getDaysSpanned: function(start, end) {
            var D = Ext.Date,
                count = 0;
            start = D.clearTime(start, true);
            while (start < end) {
                ++count;
                start = D.add(start, D.DAY, 1, true);
            }
            return count;
        },
        sort: function(a, b) {
            return a.getStartDate().getTime() - b.getStartDate().getTime() || b.getDuration() - a.getDuration() || a.getTitle() - b.getTitle();
        }
    },
    /**
     * Checks if this event fully contains a date range.
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if this event contains a date range.
     */
    containsRange: function(start, end) {
        return this.getRange().containsRange(start, end);
    },
    /**
     * @method getAllDay
     * Gets whether this event is an all day event.
     * @return {Boolean} `true` if this is an all day event.
     *
     * @abstract
     */
    /**
     * Get the calendar for this event.
     * @return {Ext.calendar.model.Calendar} The calendar, `null` if it does
     * not exist.
     */
    getCalendar: function() {
        return this.calendar || null;
    },
    /**
     * @method getCalendarId
     * Get the id for the calendar this event belongs to.
     * @return {Object} The id.
     *
     * @abstract
     */
    /**
     * @method getColor
     * Get a specified color for this event.
     * @return {String} The color.
     *
     * @abstract
     */
    /**
     * @method getDescription
     * Gets the description for this event.
     * @return {String} The description.
     *
     * @abstract
     */
    /**
     * @method getDuration
     * Get the duration of this event in minutes.
     * @return {Number} The duration of the event in minutes.
     *
     * @abstract
     */
    /**
     * @method getEndDate
     * Get the end date for this event (including time).
     * The date should be UTC.
     * @return {Date} The end date.
     *
     * @abstract
     */
    /**
     * Gets a range for this event,
     * @return {Ext.calendar.date.Range} The range.
     */
    getRange: function() {
        return new Ext.calendar.date.Range(this.getStartDate(), this.getEndDate());
    },
    /**
     * @method getStartDate
     * Get the start date for this event (including time).
     * The date should be UTC.
     * @return {Date} The start date.
     *
     * @abstract
     */
    /**
     * @method getTitle
     * Get the title for this event.
     * @return {String} The title.
     *
     * @abstract
     */
    /**
     * Checks if this event is fully contained by the passed range.
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if this event is fully contained by the passed range.
     */
    isContainedByRange: function(start, end) {
        return this.getRange().isContainedBy(start, end);
    },
    /**
     * @method isEditable
     * Checks if this event is editable. This means that it can be removed
     * or modified via the UI.
     *
     * @abstract
     */
    /**
     * Checks whether this event spans a full day or more.
     * @return {Boolean} `true` if the event is an all day event or spans
     * over 24 hours or more.
     */
    isSpan: function() {
        // Either an all day event, or duration >= 1 day
        return this.getAllDay() || this.getDuration() >= 1440;
    },
    /**
     * Checks if any part of this event occurs within the specified
     * date range.
     * @param {Ext.calendar.date.Range/Date} start The range, or the start date.
     * @param {Date} end The end date. This is not required if a range is passed for start.
     * @return {Boolean} `true` if any part of this events occurs in the range.
     */
    occursInRange: function(start, end) {
        return this.getRange().overlaps(start, end);
    },
    /**
     * @method setAllDay
     * Sets the allDay state of this event.
     * @param {Boolean} allDay The allDay value
     * 
     * @abstract
     */
    /**
     * Sets the calendar of this event. Also sets the underlying
     * {@link setCalendarId calendar id}.
     * @param {Ext.calendar.model.Calendar} calendar The calendar.
     * @param {Boolean} [dirty=true] `false` to not mark this record as dirty. Useful
     * for inferring a calendar id when doing nested loading.
     */
    setCalendar: function(calendar, dirty) {
        dirty = dirty !== false;
        this.calendar = calendar;
        this.setCalendarId(calendar ? calendar.id : null, dirty);
    }
});
/**
     * @method setCalendarId
     * Sets the calendar id for this event.
     * @param {Object} calendarId The calendar id.
     * @param {Boolean} [dirty=true] `false` to not mark this record as dirty. Useful
     * for inferring a calendar id when doing nested loading.
     *
     * @abstract
     */
/**
     * @method setColor
     * Sets the color for this event.
     * @param {String} color The color.
     *
     * @abstract
     */
/**
     * @method setData
     * Sets the data for this event in bulk.
     * @param {Object} A set of key value pairs for this event, matching to the
     * property names, eg:
     *
     *      {
     *          color: '#FFF',
     *          startDate: new Date(),
     *          descrption: 'Foo',
     *          title: 'Bar'
     *      }
     *
     * @abstract
     */
/**
     * @method setDescription
     * Sets the description for this event.
     * @param {String} The description.
     *
     * @abstract
     */
/**
     * @method setDuration
     * Sets the duration for this event. Leaves
     * the {@link #getStartDate} unmodified.
     * @param {Number} duration The duration in minutes.
     *
     * @abstract
     */
/**
     * @method setRange
     * Sets the start and end date for this event.
     * @param {Ext.calendar.date.Range/Date} range The range, or the start date.
     * @param {Date} end The end date (if the first parameter was not the range).
     *
     * @abstract
     */
/**
     * @method setTitle
     * Sets the title for this event.
     * @param {String} title The title.
     *
     * @abstract
     */

/**
 * The default implementation for am event model. All fields are accessed via the
 * getter/setter API to allow for custom model implementations.
 *
 * ## Fields ##
 *
 * The following fields are provided:
 *
 * - id : {Number} - The unique id for the calendar event record
 * - title : {String} - The title to display for the event.  Maps to
 * {@link #method-getTitle} and {@link #method-setTitle}.
 * - calendarId : {Object} - The id of the parent source calendar.  Maps to
 * {@link #method-getCalendarId} and {@link #method-setCalendarId}.
 * - description : {String} - The description to display for the event.  Maps to
 * {@link #method-getDescription} and {@link #method-setDescription}.
 * - startDate : {Date} - The event's start date and time (in UTC format).  Maps to
 * {@link #method-getStartDate} and {@link #method-setStartDate}.
 * - endDate : {Date} - The event's end date and time (in UTC format).  Maps to
 * {@link #method-getEndDate} and {@link #method-setEndDate}.
 * - allDay : {Boolean} - A flag indicating that the event is all day.  Maps to
 * {@link #method-getAllDay} and {@link #method-setAllDay}.
 * - duration : {Number} - The duration of the event.  Maps to
 * {@link #method-getDuration} and {@link #method-setDuration}.
 *
 * Events read / write the time stamp in UTC format.  The time zone should be GMT.  The
 * timezone offset for the local computer is used when rendering the event on the
 * calendar view.  A different timezone offset can be specified using the view's
 * {@link Ext.calendar.view.Base#cfg-timezoneOffset timezoneOffset} config option.
 *
 * ### Sample Response
 *
 * Below is a sample response from a remote source providing a single event for a source
 * calendar with an id of 1:
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Watch cartoons",
 *         "description": "Catch up with adventurers Finn and Jake"
 *     }]
 *
 * Sample response for the same source calendar with an all day event on Sept. 30th 2016
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T00:00:00.000Z",
 *         "endDate": "2016-10-01T00:00:00.000Z",
 *         "allDay": true,
 *         "title": "Netflix Binge",
 *         "description": "Watch Luke Cage.  Maybe twice."
 *     }]
 *
 * **Note:** The "id"s for all events must be unique within a calendar store across all
 * event stores.  Duplicate "id"s even across event stores may result in unintended
 * consequences.
 *
 * ### Custom Data
 *
 * While the Event model fields may not be set on a user-defined model, custom data can
 * easily be accommodated by extending the Event model and modifying the associated
 * getter / setter methods.
 *
 * For example, let's assume your events server provides the `description` as "desc".
 * The response from the server would look like:
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Demo starter app",
 *         "desc": "Demonstrate the starter app to project management"
 *     }]
 *
 * Internally what is used to read and write the description is `getDescription` and
 * `setDescription`.  By default those will be looking for the description string to be
 * on the `description` field.  To have our model work with the `desc` data instead the
 * derived model would look like:
 *
 *     Ext.define('MyApp.model.Event', {
 *         extend: 'Ext.calendar.model.Event',
 *
 *         getDescription: function () {
 *             return this.data.desc;
 *         },
 *         setDescription: function (description) {
 *             this.set('desc', description);
 *         }
 *     });
 *
 * The model can then be specified on the Events store config:
 *
 *     Ext.create({
 *         xtype: 'calendar',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 600,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 model: 'MyApp.model.Event',
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * The calendar makes no assumptions about the structure of the data provided, only that
 * it exists. This abstraction of data access ensures flexibility for a wide range of
 * data structures to be used.
 *
 * As an example of this concept, the default Event model has a `startDate` and `endDate`
 * field. The {@link #method-getDuration} method is calculated based on these values.
 * Another possible implementation could be to have a `startDate` and `duration` field on
 * the model and have the `getEndDate` be a calculated quantity. The API makes no
 * distinction here, as long as the EventBase interface is fulfilled.
 */
Ext.define('Ext.calendar.model.Event', {
    extend: 'Ext.data.Model',
    mixins: [
        'Ext.calendar.model.EventBase'
    ],
    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Integer',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean'
    ],
    fields: [
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'calendarId'
        },
        {
            name: 'color',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'startDate',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'endDate',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'allDay',
            type: 'boolean'
        },
        {
            name: 'duration',
            type: 'int',
            depends: [
                'startDate',
                'endDate'
            ],
            calculate: function(data) {
                var start = data.startDate,
                    end = data.endDate,
                    ms = 0;
                if (end && start) {
                    ms = end.getTime() - start.getTime();
                }
                return ms / 60000;
            }
        }
    ],
    getAllDay: function() {
        return this.data.allDay;
    },
    getCalendarId: function() {
        return this.data.calendarId;
    },
    getColor: function() {
        return this.data.color;
    },
    getDescription: function() {
        return this.data.description;
    },
    getDuration: function() {
        return this.data.duration;
    },
    getEndDate: function() {
        return this.data.endDate;
    },
    getRange: function() {
        var me = this,
            range = me.range;
        if (!range) {
            me.range = range = new Ext.calendar.date.Range(me.getStartDate(), me.getEndDate());
        }
        return range;
    },
    getStartDate: function() {
        return this.data.startDate;
    },
    getTitle: function() {
        return this.data.title;
    },
    isEditable: function() {
        var calendar = this.getCalendar();
        return calendar ? calendar.isEditable() : true;
    },
    setAllDay: function(allDay) {
        this.set('allDay', allDay);
    },
    setCalendarId: function(calendarId, dirty) {
        dirty = dirty !== false;
        this.set('calendarId', calendarId, {
            dirty: dirty
        });
    },
    setColor: function(color) {
        this.set('color', color);
    },
    setData: function(data) {
        var duration = data.duration;
        if (duration) {
            data = Ext.apply({}, data);
            delete data.duration;
            this.setDuration(duration);
        } else if (data.startDate && data.endDate) {
            this.range = null;
        }
        this.set(data);
    },
    setDescription: function(description) {
        this.set('description', description);
    },
    setDuration: function(duration) {
        var D = Ext.Date;
        this.range = null;
        this.set('endDate', D.add(this.data.startDate, D.MINUTE, duration, true));
    },
    setRange: function(start, end) {
        var D = Ext.Date;
        if (start.isRange) {
            end = start.end;
            start = start.start;
        }
        this.range = null;
        this.set({
            startDate: D.clone(start),
            endDate: D.clone(end)
        });
    },
    setTitle: function(title) {
        this.set('title', title);
    }
});

/**
 * This store contains the {@link Ext.calendar.model.EventBase events} for a particular
 * {@link Ext.calendar.model.CalendarBase} calendar.
 *
 * This store has an active range that is typically set via a calendar view.  This store
 * prefetches events outside of the current range (governed by
 * {@link #cfg-prefetchMode}), to facilitate a smoother user experience when navigating
 * views. Once events fall out of the prefetched range, they are pruned from the store.
 *
 * For more information on the the data the Events store may consume refer to
 * {@link Ext.calendar.model.Event}
 */
Ext.define('Ext.calendar.store.Events', {
    extend: 'Ext.data.Store',
    alias: 'store.calendar-events',
    model: 'Ext.calendar.model.Event',
    requires: [
        'Ext.calendar.model.Event',
        'Ext.calendar.date.Range'
    ],
    config: {
        /**
         * @cfg {Ext.calendar.model.Calendar} calendar
         * The calendar for the events.
         */
        calendar: null,
        /**
         * @cfg {String} calendarParam
         * The parameter name for the calendar to be sent to the server.
         */
        calendarParam: 'calendar',
        /**
         * @cfg {String} dateFormat
         * The date format to send to the server.
         */
        dateFormat: 'C',
        /**
         * @cfg {String} endParam
         * The parameter name for the end date to be sent to the server.
         */
        endParam: 'endDate',
        /**
         * @cfg {String} prefetchMode
         * The prefetch mode for pre-loading records on either side of the active range.
         * Possible values are:
         * - `month`
         * - `week`
         * - `day`
         *
         * If this store will be used amongst multiple views, it is recommended to use the largest
         * unit.
         */
        prefetchMode: 'month',
        /**
         * @cfg {String} startParam
         * The parameter name for the start date to be sent to the server.
         */
        startParam: 'startDate'
    },
    remoteSort: false,
    pageSize: 0,
    sorters: [
        {
            direction: 'ASC',
            sorterFn: function(a, b) {
                return Ext.calendar.model.Event.sort(a, b);
            }
        }
    ],
    prefetchSettings: {
        month: {
            unit: Ext.Date.MONTH,
            amount: 2
        },
        week: {
            unit: Ext.Date.WEEK,
            amount: 2
        },
        day: {
            unit: Ext.Date.DAY,
            amount: 4
        }
    },
    constructor: function(config) {
        this.requests = {};
        this.callParent([
            config
        ]);
    },
    /**
     * Gets a list of events that occurs in the specified range.
     * @param {Date} start The start of the range.
     * @param {Date} end The end of the range.
     * @return {Ext.calendar.model.EventBase[]} The events.
     */
    getInRange: function(start, end) {
        var records = this.data.items,
            len = records.length,
            ret = [],
            i, rec;
        for (i = 0; i < len; ++i) {
            rec = records[i];
            if (rec.occursInRange(start, end)) {
                ret.push(rec);
            }
        }
        return ret;
    },
    /**
     * Checks whether a particular date range is cached in this store.
     * @param {Ext.calendar.date.Range} range The range.
     * @return {Boolean} `true` if the range is cached.
     */
    hasRangeCached: function(range) {
        var current = this.range,
            ret = false;
        if (current) {
            ret = current.full.containsRange(range);
        }
        return ret;
    },
    /**
     * Sets the range for the current store. This may trigger the
     * store to load, or to prefetch events.
     * @param {Ext.calendar.date.Range} range The range.
     */
    setRange: function(range) {
        var me = this,
            D = Ext.Date,
            R = Ext.calendar.date.Range,
            current = me.range,
            prefetchSettings = me.getPrefetchSetting(),
            fullStart = D.subtract(range.start, prefetchSettings.unit, prefetchSettings.amount, true),
            fullEnd = D.add(range.end, prefetchSettings.unit, prefetchSettings.amount, true),
            requested = me.requested,
            newRange = {
                actual: range.clone(),
                full: new R(fullStart, fullEnd)
            },
            fetchCount = 0,
            isLeading = false,
            fetchStart, fetchEnd;
        if (me.compareRange(current, newRange)) {
            return;
        }
        if (current && current.full.containsRange(newRange.full)) {
            return;
        }
        if (me.hasRangeCached(range)) {
            if (!me.hasRangeCached(newRange.full)) {
                if (current.full.start > fullStart) {
                    fetchStart = fullStart;
                    fetchEnd = current.full.start;
                    ++fetchCount;
                    isLeading = true;
                }
                if (current.full.end < fullEnd) {
                    fetchStart = current.full.end;
                    fetchEnd = fullEnd;
                    ++fetchCount;
                }
                if (fetchCount === 1) {
                    me.prefetchRange(fetchStart, fetchEnd, isLeading, newRange);
                } else if (fetchCount === 2) {
                    me.loadRange(fullStart, fullEnd, newRange);
                } else {
                    Ext.raise('Should never be here.');
                }
            }
        } else {
            me.loadRange(newRange.full.start, newRange.full.end, newRange);
        }
        me.requested = newRange;
    },
    // Overrides
    onProxyLoad: function(operation) {
        var me = this;
        if (operation.wasSuccessful()) {
            me.range = me.requested;
            me.requested = null;
        }
        me.setCalendarFromLoad = true;
        me.callParent([
            operation
        ]);
        me.setCalendarFromLoad = false;
    },
    onCollectionAdd: function(collection, info) {
        var me = this;
        me.setRecordCalendar(me.getCalendar(), info.items, !me.setCalendarFromLoad);
        me.callParent([
            collection,
            info
        ]);
    },
    onCollectionRemove: function(collection, info) {
        this.callParent([
            collection,
            info
        ]);
        if (!this.isMoving) {
            this.setRecordCalendar(null, info.items, true);
        }
    },
    privates: {
        isMoving: 0,
        abortAll: function() {
            var requests = this.requests,
                id;
            for (id in requests) {
                requests[id].abort();
            }
            this.requests = {};
        },
        compareRange: function(a, b) {
            var ret = false;
            if (!a || !b) {
                ret = (a || null) === (b || null);
            } else {
                ret = a.full.equals(b.full) && a.actual.equals(b.actual);
            }
            return ret;
        },
        getPrefetchSetting: function() {
            return this.prefetchSettings[this.getPrefetchMode()];
        },
        loadRange: function(start, end, newRequested) {
            var me = this,
                requested = me.requested,
                range = new Ext.calendar.date.Range(start, end);
            // We don't have the range cached, are we requesting it?
            if (!(requested && requested.full.equals(range))) {
                me.abortAll();
                me.load({
                    params: me.setupParams(start, end),
                    requested: newRequested
                });
            }
        },
        onBeforeLoad: function(operation) {
            this.requests[operation._internalId] = operation;
        },
        onPrefetch: function(operation) {
            var me = this,
                records = operation.getRecords() || [],
                toPrune = [],
                toAdd = [],
                map = Ext.Array.toMap(records, 'id'),
                range = me.getDataSource().getRange(),
                len = range.length,
                start = me.range.full.start,
                end = me.range.full.end,
                i, rec;
            if (operation.wasSuccessful()) {
                me.range = me.requested;
                me.requested = null;
            }
            delete me.requests[operation._internalId];
            me.suspendEvents();
            for (i = 0; i < len; ++i) {
                rec = range[i];
                if (!(map[rec.id] || rec.occursInRange(start, end))) {
                    toPrune.push(rec);
                }
            }
            for (i = 0 , len = records.length; i < len; ++i) {
                rec = records[i];
                if (!me.getById(rec.id)) {
                    toAdd.push(rec);
                }
            }
            me.ignoreCollectionRemove = me.setCalendarFromLoad = true;
            me.getData().splice(0, toPrune, toAdd);
            me.ignoreCollectionRemove = me.setCalendarFromLoad = false;
            me.resumeEvents();
            me.fireEvent('prefetch', me, toAdd, toPrune);
        },
        prefetch: function(options) {
            var me = this,
                operation;
            options = Ext.apply({
                internalScope: me,
                internalCallback: me.onPrefetch
            }, options);
            me.setLoadOptions(options);
            operation = me.createOperation('read', options);
            me.requests[operation._internalId] = operation;
            operation.execute();
        },
        prefetchRange: function(start, end, isLeading, newRequested) {
            this.prefetch({
                params: this.setupParams(start, end),
                isLeading: isLeading,
                newRequested: newRequested
            });
        },
        setRecordCalendar: function(calendar, records, dirty) {
            var len = records.length,
                i, record;
            for (i = 0; i < len; ++i) {
                record = records[i];
                record.$moving = true;
                record.setCalendar(calendar, dirty);
                delete record.$moving;
            }
        },
        setupParams: function(start, end) {
            var me = this,
                D = Ext.Date,
                format = me.getDateFormat(),
                params = {};
            params[me.getCalendarParam()] = me.getCalendar().id;
            params[me.getStartParam()] = D.format(start, format);
            params[me.getEndParam()] = D.format(end, format);
            return params;
        }
    }
});

/**
 * This class provides theming functionality for events in the calendar.
 *
 * The colors used for call calendars in an app can be stipulated by overriding this
 * class.  Below is an example override that sets the `colors`, `lightColor`, and
 * `darkColor` values:
 *
 *     Ext.define('MyApp.util.MyPalette', {
 *         override: 'Ext.calendar.theme.Theme',
 *         colors: [
 *             'rgb(44,151,222)',
 *             'rgb(233,75,53)',
 *             'rgb(30,206,109)',
 *             'rgb(156,86,184)',
 *             'rgb(60,214,220)',
 *             'rgb(232,126,3)',
 *             'rgb(0,189,156)'
 *         ],
 *         lightColor: 'rgb(238,238,238)',
 *         darkColor: 'rgb(34,34,34)'
 *     });
 */
Ext.define('Ext.calendar.theme.Theme', {
    singleton: true,
    requires: [
        'Ext.util.Color'
    ],
    /**
     * @property {String[]} colors
     * The list of primary colors to use for events. These colors will be used as
     * defaults if the event or owning calendar does not specify a color.
     */
    colors: [
        '#F44336',
        '#3F51B5',
        '#4CAF50',
        '#FF9800',
        '#E91E63',
        '#2196F3',
        '#8BC34A',
        '#FF5722',
        '#673AB7',
        '#009688',
        '#FFC107',
        '#607D8B'
    ],
    /**
     * @property {String} lightColor
     * A complementary color to be used when the primary color is dark.
     */
    lightColor: '#FFFFFF',
    /**
     * @property {String} darkColor
     * A complementary color to be used when the primary color is light.
     */
    darkColor: '#000000',
    /**
     * Gererates a color palette from a base color. To be
     * overriden when providing custom implementations.
     * @param {Ext.util.Color} color The base color.
     * @param {Number} color.r The red component.
     * @param {Number} color.g The green component.
     * @param {Number} color.b The blue component.
     * @return {Ext.calendar.theme.Palette} The color palette.
     *
     * @protected
     */
    generatePalette: function(color) {
        var me = this,
            light = me.light,
            dark = me.dark,
            lightColor = me.lightColor,
            darkColor = me.darkColor,
            brightness = color.getBrightness(),
            lightContrast, darkConstrast, secondary;
        if (!light) {
            me.light = light = Ext.util.Color.fromString(lightColor);
            me.dark = dark = Ext.util.Color.fromString(darkColor);
        }
        lightContrast = Math.abs(light.getBrightness() - brightness);
        darkConstrast = Math.abs(dark.getBrightness() - brightness);
        return {
            primary: color.toString(),
            secondary: lightContrast > darkConstrast ? lightColor : darkColor,
            border: color.createDarker(0.2).toString()
        };
    },
    /**
     * Get the base color for a calendar. If one has been previously generated, use
     * that, otherwise get the next available base color from the specified
     *  {@link #cfg-colors color} sequence.
     * @param {Ext.data.Model} calendar The calendar.
     * @return {String} The color
     */
    getBaseColor: function(calendar) {
        var me = this,
            map = me.idMap,
            colors = me.colors,
            id = calendar.id,
            color;
        color = map[id];
        if (!color) {
            color = colors[me.current % colors.length];
            map[id] = color;
            ++me.current;
        }
        return color;
    },
    /**
     * Gets a palette for a base color.
     * @param {String} color The base color.
     * @return {Ext.calendar.theme.Palette} The color palette.
     */
    getPalette: function(color) {
        var map = this.colorMap,
            palette = map[color],
            o;
        if (!palette) {
            o = Ext.util.Color.fromString(color);
            map[color] = palette = this.generatePalette(o);
        }
        return palette;
    },
    privates: {
        /**
         * @property {Object} colorMap
         * A map of color strings to palettes.
         *
         * @private
         */
        colorMap: {},
        /**
         * @property {Object} idMap
         * A map of calendar id to color.
         *
         * @private
         */
        idMap: {},
        /**
         * @property {Number} current
         * The current index to pull the latest color from.
         *
         * @private
         */
        current: 0,
        /**
         * React to calendar id changing, update the internal map with
         * the new id.
         * @param {Object} newId The new id.
         * @param {Object} oldId The old id.
         *
         * @private
         */
        onIdChanged: function(newId, oldId) {
            var map = this.idMap,
                val = map[oldId];
            if (val) {
                delete map[oldId];
                map[newId] = val;
            }
        }
    }
});

/**
 * A mixin that provides some base behaviors for calendars. The default
 * implementation is {@link Ext.calendar.model.Calendar}. To provide
 * a custom implementation, this mixin should be used and the remaining
 * parts of the API need to be implemented.
 */
Ext.define('Ext.calendar.model.CalendarBase', {
    extend: 'Ext.Mixin',
    requires: [
        'Ext.calendar.store.Events',
        'Ext.calendar.theme.Theme'
    ],
    config: {
        /**
         * @cfg {Object} eventStoreDefaults
         * Defaults to use for the {@link #events} store.
         */
        eventStoreDefaults: {
            type: 'calendar-events',
            proxy: {
                type: 'ajax'
            }
        }
    },
    /**
     * @method getEventStoreDefaults
     * @hide
     */
    /**
     * @method setEventStoreDefaults
     * @hide
     */
    /**
     * Get the events store for this calendar.
     * @return {Ext.calendar.store.Events} The events.
     */
    events: function() {
        var me = this,
            store = me._eventStore,
            cfg;
        if (!store) {
            cfg = Ext.merge({
                calendar: me
            }, me.config.eventStoreDefaults, me.eventStoreDefaults);
            me._eventStore = store = Ext.Factory.store(me.getEventStoreConfig(cfg));
        }
        return store;
    },
    /**
     * @method getAssignedColor
     * Get the assigned color for this calendar. Used when a {@link #getColor color}
     * is not specified.
     * @return {String} The color.
     *
     * @abstract
     */
    /**
     * Get the base color for this calendar. Uses {@link #getColor} or {@link #getAssignedColor}.
     * If not specified, a color is used from the default theme.
     * @return {String} The color.
     */
    getBaseColor: function() {
        var color = this.getColor() || this.getAssignedColor();
        if (!color) {
            color = Ext.calendar.theme.Theme.getBaseColor(this);
            this.setAssignedColor(color);
        }
        return color;
    },
    /**
     * @method getColor
     * Gets a specified color for this calendar.
     * @return {String} The color.
     *
     * @abstract
     */
    /**
     * @method getDescription
     * Gets the description for this calendar.
     * @return {String} The description.
     *
     * @abstract
     */
    /**
     * @method getEditable
     * Gets the editable state for this calendar.
     * @return {Boolean} The editable state.
     *
     * @abstract
     */
    /**
     * @method getEventStoreConfig
     * Get the event store configuration.
     * @param {Object} config The default config.
     * @return {Object} The configuration.
     * 
     * @protected
     */
    /**
     * @method getHidden
     * Gets the hidden state for this calendar.
     * @return {Boolean} The hidden state.
     *
     * @abstract
     */
    /**
     * @method getTitle
     * Gets the title for this calendar.
     * @return {String} The title.
     *
     * @abstract
     */
    /**
      * Checks if this calendar (and events) are editable. This
      * includes being able to create, modify or remove events.
      * @return {Boolean} `true` if this calendar is editable.
      */
    isEditable: function() {
        return this.getEditable();
    },
    /**
     * Checks if this calendar is hidden.
     * @return {Boolean} `true` if the calendar is hidden.
     */
    isHidden: function() {
        return this.getHidden();
    },
    /**
     * @method setAssignedColor
     * Set the assigned color for this calendar.
     * @param {String} color The assigned color.
     *
     * @abstract
     */
    /**
     * @method setColor
     * Set the color for this calendar.
     * @param {String} color The color.
     *
     * @abstract
     */
    /**
     * @method setDescription
     * Set the description for this calendar.
     * @param {String} description The description.
     *
     * @abstract
     */
    /**
     * @method setEditable
     * Set the editable state for this calendar.
     * @param {Boolean} editable The editable state.
     *
     * @abstract
     */
    /**
     * @method setHidden
     * Set the hidden state for this calendar.
     * @param {Boolean} hidden The hidden state.
     *
     * @abstract
     */
    /**
     * @method setTitle
     * Set the title for this calendar.
     * @param {String} title The title.
     *
     * @abstract
     */
    privates: {
        /**
         * @inheritdoc
         * @private
         */
        onIdChanged: function(newId, oldId) {
            Ext.calendar.theme.Theme.onIdChanged(newId, oldId);
        }
    }
});

/**
 * The default implementation for a calendar model. All fields are accessed via the
 * getter/setter API to allow for custom model implementations.
 *
 * ## Fields ##
 *
 * The following fields are provided:
 *
 * - id : {Number} - The unique id for this source calendar record in the Calendars
 * store.
 * - title : {String} - The source calendar title (used when displayed in a
 * {@link Ext.calendar.form.CalendarPicker CalendarPicker})  Maps to
 * {@link #method-getTitle} and {@link #method-setTitle}.
 * - description : {String} - The source calendar description.  Maps to
 * {@link #method-getDescription} and {@link #method-setDescription}.
 * - color : {String} - The color to use in {@link Ext.calendar.Event events} as well as
 * the {@link Ext.calendar.List calendar list}.  Maps to {@link #method-getColor} and
 * {@link #method-setColor}.
 * - hidden : {Boolean} - `true` to hide the source calendar events.  Maps to
 * {@link #method-getHidden} and {@link #method-setHidden}.
 * - editable : {Boolean} - `false` to disable editing of this calendar's events.  Maps
 * to {@link #method-getEditable} and {@link #method-setEditable}.
 * - eventStore : {Object} - Allow per-instance configuration for the
 * {@link #method-events} store. This configuration is merged with the
 * {@link #cfg-eventStoreDefaults}.
 *
 * ### Updating the UI
 *
 * You can programmatically update the UI using a variety of the Calendar model's setters
 *
 *     var store = CalendarInstance.getStore();
 *     var rec = store.first(); // find your source calendar with any of Store's methods
 *     rec.setHidden(true);     // hides the events on the calendar view
 *     rec.setEditable(false);  // disables editing this source calendar's events
 *     rec.setColor('#2fa749'); // sets the events' default color to green
 *
 *
 * ### Custom Data
 *
 * For information on custom calendar / event data as well as how the model may be
 * extended to accommodate the custom data see {@link Ext.calendar.event.Model}'s
 * **Custom Data** section.
 */
Ext.define('Ext.calendar.model.Calendar', {
    extend: 'Ext.data.Model',
    mixins: [
        'Ext.calendar.model.CalendarBase'
    ],
    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Boolean'
    ],
    fields: [
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'color',
            type: 'string'
        },
        {
            name: 'assignedColor',
            type: 'string',
            persist: false
        },
        {
            name: 'hidden',
            type: 'bool'
        },
        {
            name: 'editable',
            type: 'bool',
            defaultValue: true
        },
        {
            name: 'eventStore',
            type: 'auto',
            persist: false
        }
    ],
    constructor: function(data, session) {
        this.callParent([
            data,
            session
        ]);
        // Force base color to be assigned
        this.getBaseColor();
    },
    getAssignedColor: function() {
        return this.data.assignedColor;
    },
    getColor: function() {
        return this.data.color;
    },
    getDescription: function() {
        return this.data.description;
    },
    getEditable: function() {
        return this.data.editable;
    },
    getEventStoreConfig: function(cfg) {
        return Ext.merge(cfg, this.data.eventStore);
    },
    getHidden: function() {
        return this.data.hidden;
    },
    getTitle: function() {
        return this.data.title;
    },
    setAssignedColor: function(color) {
        this.set('assignedColor', color);
    },
    setColor: function(color) {
        this.set('color', color);
    },
    setDescription: function(description) {
        this.set('description', description);
    },
    setEditable: function(editable) {
        this.set('editable', editable);
    },
    setHidden: function(hidden) {
        this.set('hidden', hidden);
    },
    setTitle: function(title) {
        this.set('title', title);
    }
});

/**
 * A base panel class for panels with a header a single view.
 * 
 * @private
 */
Ext.define('Ext.calendar.panel.AbstractBase', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Fit'
    ],
    layout: 'fit',
    // Appliers/Updaters
    updateDayHeader: function(dayHeader) {
        if (dayHeader) {
            this.addItem(dayHeader, 'dockedItems', 'addDocked');
        }
    },
    updateView: function(view) {
        this.addItem(view, 'items', 'add');
    },
    // Overrides
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        this.callParent([
            width,
            height,
            oldWidth,
            oldHeight
        ]);
        this.syncHeaders();
    },
    privates: {
        addItem: function(item, existing, addMethod) {
            var me = this,
                items = me[existing];
            if (items) {
                if (items.isMixedCollection) {
                    me[addMethod](item);
                } else {
                    if (!Ext.isArray(items)) {
                        items = [
                            items
                        ];
                    }
                    me[existing] = items.concat(item);
                }
            } else {
                me[existing] = item;
            }
        },
        syncHeaders: function() {
            var me = this,
                header;
            if (me.syncHeaderSize) {
                header = me.getDayHeader();
                if (header && header.setOverflowWidth) {
                    header.setOverflowWidth(me.getView().scrollable.getScrollbarSize().width);
                }
            }
        }
    }
});

/**
 * @abstract
 * A base class that composes a calendar view and a
 * {@link Ext.calendar.header.Base header}.  Calendar views display events for a date /
 * time range specified by the view subclasses:
 *
 * - {@link Ext.calendar.panel.Day Day}
 * - {@link Ext.calendar.panel.Days Days}
 * - {@link Ext.calendar.panel.Week Week}
 * - {@link Ext.calendar.panel.Weeks Weeks}
 * - {@link Ext.calendar.panel.Month Month}
 * - {@link Ext.calendar.panel.Multi Multi}
 *
 * By default, the view will display the current date along with any other dates surround
 * that date as specified by the particular view type.  A target date can be specified
 * by setting the {@link #cfg-value} config option.
 *
 * ### Sample View
 *
 * Below is a sample view instance.  The following example shows how to create a day view,
 * but the basic configuration applies to all view subclasses with the exception of the
 * xtype used.
 *
 *     Ext.create({
 *         xtype: 'calendar-day',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * Configurations for the view can be specified directly on the panel:
 *
 *     Ext.create({
 *         xtype: 'calendar-day',
 *         height: 500,
 *         height: 500,
 *         resizeEvents: false,
 *         startTime: 8,
 *         endTime: 16,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *         listeners: {
 *             eventdrop: function() {
 *                 console.log('Dropped');
 *             }
 *         }
 *     });
 *
 * **Note:** For more information on possible store configurations and the expected
 * server response for both Calendars and Events stores see:
 * {@link Ext.calendar.store.Calendars}.
 *
 * ### In-View Calendar Events
 *
 * Events show on the view timeline with their start and end times correlating to either
 * the date or the time slots depending on the view type.  The events will display on the
 * timeline according to your local timezone offset from GMT (the expected format for
 * start / end times for events is UTC).  The timezone offset can be applied explicitly
 * using the {@link #cfg-timezoneOffset} config option.  If the view has multiple source
 * calendars, their events will attempt to share overlapping space within their
 * corresponding date / time slots.  Events will be displayed as a different color for
 * each source calendar and their appearance will vary slightly depending on their
 * {@link Ext.calendar.Event.html#cfg-mode mode}.  The overlapping behavior of events
 * competing for the same time slot can be managed using the {@link #cfg-displayOverlap}
 * config option.
 *
 * ### Adding / Editing Events
 *
 * Events may be added to the view by dragging / swiping across the timeline to create
 * the event endpoints.  Doing so shows the {@link Ext.calendar.form.Add add event form}
 * with the dates / times pre-populated from the drag selection.  The
 * {@link #cfg-allowSelection} config can be set to false to prevent user from creating
 * events in this way.  Events added programmatically by calling the
 * {@link #method-showAddForm} method to present the add input form.  Set the view's
 * {@link #cfg-addForm} config to `null` to prevent events from being added to the
 * calendar.
 *
 * Double clicking / tapping an event within the view shows the
 * {@link Ext.calendar.form.Edit edit event form} allowing events to be edited by users.
 * The add form and edit form can be configured using the view's {@link #cfg-addForm} and
 * {@link #cfg-editForm} configs.  For views with time displayed on the y axis of the
 * view (Day, Days, and Week), existing events can be resized using the resize handle on
 * the event widget as well as dragged across the view.  The {@link #cfg-resizeEvents},
 * {@link #cfg-draggable}, and {@link #cfg-droppable} configs may be used to manage event
 * interactions.
 *
 * ### View Navigation
 *
 * The calendar view does not create controls for navigating the view's date range,
 * however the view can be navigated programmatically.  The view's target date can be set
 * explicitly using the {@link #method-setValue} method.  The
 * {@link #method-movePrevious} and {@link #method-moveNext} methods may be called to
 * move the displayed date range forward or back.  And the {@link #method-navigate} lets
 * you move the date an arbitrary amount relative to the current date {@link #cfg-value}.
 *
 * ### Compact Mode
 * The base view class has a {@link #cfg-compact} config.  This boolean configures
 * whether or not the view is in compact mode.  It’s expected that this will be used as a
 * platform config or a responsive config.  Setting compact mode by itself does not
 * modify how the view displays.  What it does do is apply the
 * {@link #cfg-compactOptions} config over the top over the current configuration
 * options.  These `compactOptions` are what is used to specify what compactness means
 * for a particular view.  Check out the `compactOptions` for each calendar view type to
 * see its default `compactOptions`.
 */
Ext.define('Ext.calendar.panel.Base', {
    extend: 'Ext.calendar.panel.AbstractBase',
    config: {
        /**
         * @cfg {Object} dayHeader
         * A config for the {@link Ext.calendar.header.Base day header}. This can be
         * configured directly on the panel.  The relevant configurations will be
         * forwarded to the header.
         */
        dayHeader: null,
        /**
         * @cfg {Object} eventRelayers
         * A list of events to relay from the underlying view.
         * 
         * @private
         */
        eventRelayers: {
            view: {
                /**
                 * @event beforeeventadd
                 * @inheritdoc Ext.calendar.view.Base#beforeeventadd
                 */
                beforeeventadd: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#beforeeventadd
                 */
                beforeeventedit: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#eventadd
                 */
                eventadd: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#eventedit
                 */
                eventedit: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#eventdrop
                 */
                eventdrop: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#eventtap
                 */
                eventtap: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#validateeventadd
                 */
                validateeventadd: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#validateeventedit
                 */
                validateeventedit: true,
                /**
                 * @event
                 * @inheritdoc Ext.calendar.view.Base#validateeventdrop
                 */
                validateeventdrop: true,
                /**
                  * @event
                  * @inheritdoc Ext.calendar.view.Base#valuechange
                  */
                valuechange: true
            }
        },
        /**
         * @cfg {Object} view
         * A config for the main calendar view. This can be configured directly on the panel,
         * the relevant configurations will be forwarded to the view.
         */
        view: null
    },
    platformConfig: {
        '!desktop': {
            compact: true
        }
    },
    // This must sit outside a config block because we need to
    // access the value before initConfig.
    /**
     * @cfg {Object} configExtractor
     * A set of configs for the composable pieces.
     * This serves 2 purposes:
     * - Pulls configs from the initial class config to
     * pass to the constructor for the relevant piece.
     * - Generates proxy getter/setter methods.
     *
     * @protected
     */
    configExtractor: {
        view: {
            addForm: true,
            compact: true,
            compactOptions: true,
            controlStoreRange: true,
            editForm: true,
            eventDefaults: true,
            gestureNavigation: true,
            store: true,
            timezoneOffset: true,
            value: true
        }
    },
    twoWayBindable: {
        value: 1
    },
    constructor: function(config) {
        var me = this,
            C = Ext.Config,
            extractor = me.configExtractor,
            extracted = {},
            cfg, key, item, val, extractedItem, proxyKey;
        config = Ext.apply({}, config);
        me.extracted = extracted;
        for (cfg in extractor) {
            item = extractor[cfg];
            extracted[cfg] = extractedItem = {};
            for (key in config) {
                if (key in item) {
                    proxyKey = item[key];
                    if (proxyKey === true) {
                        proxyKey = key;
                    }
                    extractedItem[proxyKey] = config[key];
                    delete config[key];
                }
            }
            me.setupProxy(item, C.get(cfg).names.get);
        }
        me.callParent([
            config
        ]);
        me.initRelayers();
    },
    onClassExtended: function(cls, data, hooks) {
        // We need to manually merge these because we can't have it in
        // the config block, we need to access it before initConfig.
        var extractor = data.configExtractor;
        if (extractor) {
            delete data.configExtractor;
            cls.prototype.configExtractor = Ext.merge({}, cls.prototype.configExtractor, extractor);
        }
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-getDisplayRange
     */
    getDisplayRange: function() {
        return this.getView().getDisplayRange();
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-getVisibleRange
     */
    getVisibleRange: function() {
        return this.getView().getVisibleRange();
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-moveNext
     */
    moveNext: function() {
        this.getView().moveNext();
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-movePrevious
     */
    movePrevious: function() {
        this.getView().movePrevious();
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-navigate
     */
    navigate: function(amount, interval) {
        this.getView().navigate(amount, interval);
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-showAddForm
     */
    showAddForm: function(data, options) {
        this.getView().showAddForm(data, options);
    },
    /**
     * @inheritdoc Ext.calendar.view.Base#method-showEditForm
     */
    showEditForm: function(event, options) {
        this.getView().showEditForm(event, options);
    },
    // Appliers/Updaters
    applyDayHeader: function(dayHeader) {
        if (dayHeader) {
            dayHeader = Ext.apply(this.extracted.dayHeader, dayHeader);
            dayHeader = Ext.create(dayHeader);
        }
        return dayHeader;
    },
    updateDayHeader: function(dayHeader, oldDayHeader) {
        if (oldDayHeader) {
            oldDayHeader.destroy();
        }
        if (dayHeader) {
            this.getView().setHeader(dayHeader);
        }
        this.callParent([
            dayHeader,
            oldDayHeader
        ]);
    },
    applyView: function(view) {
        if (view) {
            view = Ext.create(Ext.apply(this.extracted.view, view));
        }
        return view;
    },
    updateView: function(view, oldView) {
        if (oldView) {
            oldView.destroy();
        }
        this.callParent([
            view,
            oldView
        ]);
    },
    privates: {
        /**
         * @inheritdoc Ext.calendar.view.Base#calculateMoveNext
         * @private
         */
        calculateMoveNext: function() {
            return this.getView().calculateMoveNext();
        },
        /**
         * @inheritdoc Ext.calendar.view.Base#calculateMovePrevious
         * @private
         */
        calculateMovePrevious: function() {
            return this.getView().calculateMovePrevious();
        },
        /**
         * Create a relayer function. 
         * @param {name} name The event name to fire.
         * @return {Function} A function that fires the relayed event.
         *
         * @private
         */
        createItemRelayer: function(name) {
            var me = this;
            return function(view, o) {
                return me.fireEvent(name, me, o);
            };
        },
        /**
         * Generates proxy getter/setter methods 
         * @param {Ext.Config} thisCfg The config to apply to this object.
         * @param {Ext.Config} targetCfg The config object for the target config.
         * @param {String} targetName The getter name for the item on this component.
         *
         * @private
         */
        generateProxyMethod: function(thisCfg, targetCfg, targetName) {
            var me = this,
                targetSetter = targetCfg.names.set,
                targetGetter = targetCfg.names.get,
                setter = thisCfg.names.set,
                getter = thisCfg.names.get;
            if (!me[setter]) {
                me[setter] = function(value) {
                    var o = me[targetName]();
                    if (o) {
                        o[targetSetter](value);
                    }
                };
            }
            if (!me[getter]) {
                me[getter] = function() {
                    var o = me[targetName]();
                    if (o) {
                        return o[targetGetter]();
                    }
                };
            }
        },
        /**
         * Initialize event relayers.
         *
         * @private
         */
        initRelayers: function() {
            var C = Ext.Config,
                relayers = this.getEventRelayers(),
                view = this.getView(),
                key, events, c, name, prefix;
            for (key in relayers) {
                events = relayers[key];
                c = this[C.get(key).names.get]();
                prefix = events.$prefix || '';
                for (name in events) {
                    c.on(name, this.createItemRelayer(prefix + name));
                }
            }
        },
        /**
         * Refresh events on the view.
         * @private
         */
        refreshEvents: function() {
            this.getView().refreshEvents();
        },
        /**
         * Sets up proxy methods for a component.
         * @param {Object} configs The list of to setup for a component.
         * @param {String} targetName The getter name for the item on this component.
         *
         * @private
         */
        setupProxy: function(configs, targetName) {
            var me = this,
                C = Ext.Config,
                key, targetCfg, thisCfg, val;
            for (key in configs) {
                val = configs[key];
                thisCfg = C.get(key);
                if (val === true) {
                    targetCfg = thisCfg;
                } else {
                    targetCfg = C.get(val);
                }
                me.generateProxyMethod(thisCfg, targetCfg, targetName);
            }
        }
    }
});

/**
 * This store contains a flattened list of {@link Ext.calendar.model.EventBase events}
 * from multiple {@link Ext.calendar.store.Calendars calendars}. It provides a simpler
 * API for calendar views to interact with and monitors the attached {@link #source}
 * for changes.
 *
 * This store ensures that only events within the specified {@link #setRange range} are
 * included. Views will communicate with this store to set the range, which is then 
 * forwarded to any appropriate {@link Ext.calendar.store.Events event stores}.
 *
 * Typically, this class is not created directly but rather via the 
 * {@link Ext.calendar.store.Calendars#getEventSource} method.
 */
Ext.define('Ext.calendar.store.EventSource', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.calendar.date.Range'
    ],
    config: {
        /**
         * @cfg {Ext.calendar.store.Calendars} source
         * The calendar source for events.
         */
        source: null
    },
    sorters: [
        {
            direction: 'ASC',
            sorterFn: function(a, b) {
                return Ext.calendar.model.Event.sort(a, b);
            }
        }
    ],
    trackRemoved: false,
    constructor: function(config) {
        this.calendarMap = {};
        this.callParent([
            config
        ]);
    },
    createEvent: function(data) {
        if (!this.getSource()) {
            Ext.raise('Cannot create event, no source specified.');
        }
        if (!this.getSource().first()) {
            Ext.raise('Cannot create event, source is empty.');
        }
        var T = this.getSource().first().events().getModel(),
            event = new T();
        if (data) {
            event.setData(data);
        }
        return event;
    },
    updateSource: function(source) {
        var me = this;
        me.sourceListeners = Ext.destroy(me.sourceListeners);
        if (source) {
            me.sourceListeners = source.on({
                // Run through the full set on change, it's not expected that
                // there will be a significant amount of calendars so it's not
                // really a performance concern.
                destroyable: true,
                scope: me,
                add: 'checkData',
                remove: 'checkData',
                refresh: 'checkData'
            });
            me.checkData();
        }
    },
    add: function(record) {
        var events = this.getEventsForCalendar(record.getCalendarId());
        if (!events) {
            Ext.raise('Unknown calendar: ' + record.getCalendarId());
            return;
        }
        events.add(record);
    },
    move: function(record, oldCalendar) {
        var store = this.getEventsForCalendar(oldCalendar),
            newCalendar = record.getCalendar(),
            removed;
        if (newCalendar) {
            store.suspendAutoSync();
            ++store.isMoving;
        }
        store.remove(record);
        if (newCalendar) {
            --store.isMoving;
            store.resumeAutoSync();
            record.unjoin(store);
            removed = store.removed;
            if (removed) {
                Ext.Array.remove(removed, record);
            }
            store = this.getEventsForCalendar(newCalendar);
            store.suspendAutoSync();
            store.add(record);
            store.resumeAutoSync();
        }
    },
    remove: function(record) {
        var events = this.getEventsForCalendar(record.getCalendarId());
        if (!events) {
            Ext.raise('Unknown calendar: ' + record.getCalendarId());
            return;
        }
        events.remove(record);
    },
    hasRangeCached: function(range) {
        var map = this.calendarMap,
            current = this.range,
            id, store, hasAny;
        if (!current) {
            return false;
        }
        for (id in map) {
            hasAny = true;
            store = this.getEventsForCalendar(map[id]);
            if (!store.hasRangeCached(range)) {
                return false;
            }
        }
        if (!hasAny) {
            return current.containsRange(range);
        }
        return true;
    },
    setRange: function(range) {
        var me = this,
            current = me.range,
            map = me.calendarMap,
            source = me.getSource(),
            success = true,
            allCached = true,
            cached, store, id, loads, hasAny;
        me.range = range.clone();
        for (id in map) {
            hasAny = true;
            store = me.getEventsForCalendar(map[id]);
            // The store doesn't have the immediate range
            cached = store.hasRangeCached(range);
            allCached = allCached && cached;
            store.setRange(range);
            if (!cached) {
                loads = loads || [];
                store.on('load', function(s, records, successful) {
                    Ext.Array.remove(loads, s);
                    success = success && successful;
                    if (loads.length === 0) {
                        me.doBulkLoad(success);
                    }
                }, null, {
                    single: true
                });
                loads.push(store);
                me.activeLoad = true;
            }
        }
        if (hasAny && allCached) {
            me.checkData(true);
        } else if (loads) {
            me.fireEvent('beforeload', me);
        }
    },
    doDestroy: function() {
        var me = this,
            map = this.calendarMap,
            id;
        for (id in map) {
            me.untrackCalendar(map[id]);
        }
        me.calendarMap = me.stores = null;
        me.setSource(null);
        me.callParent();
    },
    privates: {
        checkData: function(fromSetRange) {
            var me = this,
                map = me.calendarMap,
                o = Ext.apply({}, map),
                source = me.getSource(),
                calendars = source.getRange(),
                len = calendars.length,
                records = [],
                range = me.range,
                i, id, calendar, events, start, end;
            if (range) {
                start = range.start;
                end = range.end;
            }
            for (i = 0; i < len; ++i) {
                calendar = calendars[i];
                id = calendar.getId();
                if (o[id]) {
                    // We already know about it, but the object reference may
                    // be different, so rebind listeners to be sure
                    delete o[id];
                    me.untrackCalendar(map[id]);
                }
                me.trackCalendar(calendar);
                if (range) {
                    events = me.getEventsForCalendar(calendar);
                    if (events.getCount()) {
                        Ext.Array.push(records, events.getInRange(start, end));
                    }
                }
                map[id] = calendar;
            }
            for (id in o) {
                // These are any leftovers, untrack them
                me.untrackCalendar(o[id]);
                delete map[id];
            }
            if (fromSetRange !== true && range) {
                me.setRange(range);
            }
            me.loadRecords(records);
        },
        doBulkLoad: function(success) {
            var me = this,
                map = me.calendarMap,
                range = me.range,
                records = [],
                id, events;
            if (success) {
                for (id in map) {
                    events = me.getEventsForCalendar(map[id]);
                    Ext.Array.push(records, events.getInRange(range.start, range.end));
                }
                me.loadRecords(records);
            }
            me.fireEvent('load', me, records, success);
            me.activeLoad = false;
        },
        fireChangeEvent: function() {
            return false;
        },
        getEventsForCalendar: function(calendar) {
            var ret = null;
            if (!calendar.isModel) {
                calendar = this.calendarMap[calendar];
            }
            if (calendar) {
                ret = calendar.events();
            }
            return ret;
        },
        onEventStoreAdd: function(store, records) {
            var range = this.range,
                len = records.length,
                toAdd = [],
                i, rec;
            for (i = 0; i < len; ++i) {
                rec = records[i];
                if (rec.occursInRange(range.start, range.end)) {
                    toAdd.push(rec);
                }
            }
            if (toAdd.length > 0) {
                this.getDataSource().add(toAdd);
            }
        },
        onEventStoreBeforeUpdate: function(store, record) {
            if (!record.$moving) {
                this.suspendEvents();
                this.lastIndex = this.indexOf(record);
            }
        },
        onEventStoreClear: function(store, records) {
            var me = this,
                result;
            if (records.length > 0) {
                me.suspendEvents();
                result = me.getDataSource().remove(records);
                me.resumeEvents();
                if (result) {
                    me.fireEvent('refresh', me);
                }
            }
        },
        onEventStorePrefetch: function(store, added, pruned) {
            this.getDataSource().remove(pruned);
        },
        onEventStoreRefresh: function() {
            if (this.activeLoad) {
                return;
            }
            this.checkData();
        },
        onEventStoreRemove: function(store, records) {
            this.getDataSource().remove(records);
        },
        onEventStoreUpdate: function(store, record, type, modifiedFieldNames, info) {
            if (record.$moving) {
                return;
            }
            var me = this,
                range = me.range,
                oldIndex = me.lastIndex,
                contained = me.lastIndex !== -1,
                contains = me.contains(record),
                inRange = record.occursInRange(range),
                ds = me.getDataSource();
            me.resumeEvents();
            if (contained && contains) {
                me.fireEvent('update', me, record, type, modifiedFieldNames, info);
            } else if (contained && !contains) {
                me.fireEvent('remove', me, [
                    record
                ], oldIndex, false);
            } else if (!contained && contains) {
                me.fireEvent('add', me, [
                    record
                ], me.indexOf(record));
            }
        },
        trackCalendar: function(calendar) {
            var events = this.getEventsForCalendar(calendar);
            events.sourceListeners = events.on({
                destroyable: true,
                scope: this,
                add: 'onEventStoreAdd',
                beforeupdate: 'onEventStoreBeforeUpdate',
                clear: 'onEventStoreClear',
                prefetch: 'onEventStorePrefetch',
                refresh: 'onEventStoreRefresh',
                remove: 'onEventStoreRemove',
                update: 'onEventStoreUpdate'
            });
        },
        untrackCalendar: function(calendar) {
            var events = this.getEventsForCalendar(calendar);
            events.sourceListeners = Ext.destroy(events.sourceListeners);
        }
    }
});

/**
 * A store for {@link Ext.calendar.model.CalendarBase Calendar} models.
 *
 * This store type is used as the base store for
 * {@link Ext.calendar.view.Base calendar views}.  The Calendars store contains one or
 * more source calendars whose primary purpose is to own
 * {@link Ext.calendar.Event Events} within the source calendar's
 * {@link Ext.calendar.store.Events Events store}.
 *
 * ### Dynamic Events Store Configuration
 *
 * Below is a sample calendar configured to {@link #cfg-autoLoad} source calendars from
 * "calendars.php":
 *
 *     Ext.create({
 *         xtype: 'calendar',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 600,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             }
 *         }
 *     });
 *
 * As mentioned before, source calendars themselves own Events stores.  Loading the
 * Calendars store and its source calendars will automatically fetch events for the
 * calendar view's date range.  However, by default the Events store belonging to each
 * source calendar is not configured with a {@link Ext.data.proxy.Server proxy} to fetch
 * the remote events.  Using the above example the expected data response for a single
 * source calendar would look something like:
 *
 *     [{
 *         "id": 1,
 *         "title": "Personal",
 *         "eventStore": {
 *             "proxy": {
 *                 "type": "ajax",
 *                 "url": "events.php"
 *             }
 *         }
 *     }]
 *
 * In the above data response we see:
 *
 *  - **id** - The unique id for this source calendar record in the Calendars store
 *  - **title** - The source calendar title (used when displayed in a
 * {@link Ext.calendar.form.CalendarPicker CalendarPicker})
 *  - **eventStore** - The config options for the source calendar Events store
 *
 * **Note:** for more information on the data the Calendar model consumes refer to
 * {@link Ext.calendar.model.Calendar}
 *
 * ### Default Events Store Configuration
 *
 * Passing the `eventStore` config back with the calendar offers maximum flexibility as
 * the Events store config / url can be specified uniquely per source calendar.  However,
 * if the events will all be served up from the same remote source it may be more
 * effective to configure the Calendars store's {@link #cfg-eventStoreDefaults} with
 * common defaults.  As an example:
 *
 *     Ext.create({
 *         xtype: 'calendar',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 600,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * With the above configuration a sample response from "calendars.php" including a single
 * source calendar would be:
 *
 *     [{
 *         "id": 1,
 *         "title": "Personal"
 *     }]
 *
 * Using the above Calendars config every source calendar passed back from
 * "calendars.php" will have its events store configured to fetch events from
 * "events.php".  Read operations requesting events will pass up to the remote server:
 *
 *  - **calendar** - The id of the source calendar
 *  - **startDate** - The start date / time of events for the current calendar view
 *  - **endDate** - The end date / time of events for the current calendar view
 *
 * You can configure the param names sent using the Event model's
 * {@link Ext.calendar.store.Events#cfg-calendarParam calendarParam},
 * {@link Ext.calendar.store.Events#cfg-startParam startParam}, and
 * {{@link Ext.calendar.store.Events#cfg-endParam endParam}} config options.
 *
 * **Note:** The date range requested will be somewhat larger than the current visible
 * date range in the calendar view as set in the Events store's
 * {@link Ext.calendar.store.Events#cfg-prefetchMode prefetchMode} config option.
 * Commonly this configuration can be left as its default.
 *
 * ### Events Response
 *
 * Below is a sample response from 'events.php' for a 1 hour event.
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Watch cartoons",
 *         "description": "Catch up with adventurers Finn and Jake"
 *     }]
 *
 * Sample response from 'events.php' for an all day event on Sept. 30th 2016
 *
 *     [{
 *         "id": 1001,
 *         "calendarId": 1,
 *         "startDate": "2016-09-30T00:00:00.000Z",
 *         "endDate": "2016-10-01T00:00:00.000Z",
 *         "allDay": true,
 *         "title": "Netflix Binge",
 *         "description": "Watch Luke Cage.  Maybe twice."
 *     }]
 *
 * An all day event should be indicated as `allDay`: true.  Its `startDate` will be the
 * 00:00:00 hour of the target date and have an `endDate` with a 00:00:00 time on the
 * following day.
 *
 * In the event response we see:
 *
 *  - **id** - The unique id for the calendar event record
 *  - **calendarId** - The id of the parent source calendar
 *  - **startDate** - The event's start date and time (in UTC format)
 *  - **endDate** - The event's end date and time (in UTC format)
 *  - **title** - The title to display for the event
 *  - **description** - The description to display for the event
 *
 * **Note:** for more information on the data the Events model consumes refer to
 * {@link Ext.calendar.model.Event}
 *
 * ### Multi-Calendar Support
 *
 * The calendar views also accommodate multiple source calendars within the same view.
 * The response from the Calendars store (from 'calendars.php' using the above example)
 * should be an array of objects containing a unique "id" per source calendar along with
 * unique "title"s.  The titles will display in a combo field in the add/edit event forms
 * as a way to indicate what source calendar an event belongs to as well as in the
 * {@link Ext.calendar.panel.Panel Calendar panel's}
 * {@link Ext.calendar.List calendar list}.  The id will correlate to the "calendarId"
 * key in the event response.
 *
 * Sample response from 'calendars.php' including two source calendars: "Personal" and
 * "Work"
 *
 *     [{
 *         "id": 1,
 *         "title": "Personal"
 *     }, {
 *         "id": 2,
 *         "title": "Work"
 *     }]
 *
 * A view with two source calendars will make two read request each time the view's date
 * range is rendered.  Expected in return is two separate responses containing events
 * with "calendarId" keys corresponding to the calendar that owns the events.  With a
 * calendar view with both "Personal" and "Work" source calendars two responses would be
 * expected: one like as seen above including a key of `"calendarId": 1` and one for the
 * Work calendar as seen here.
 *
 *     [{
 *         "id": 2001,
 *         "calendarId": 2,
 *         "startDate": "2016-09-30T21:30:00.000Z",
 *         "endDate": "2016-09-30T22:30:00.000Z",
 *         "title": "Meet with Development",
 *         "description": "Discuss the current cycle requirements"
 *     }]
 *
 * **Note:** The "id"s for all events must be unique within a calendar store across all
 * event stores.  Duplicate "id"s even across event stores may result in unintended
 * consequences.
 */
Ext.define('Ext.calendar.store.Calendars', {
    extend: 'Ext.data.Store',
    alias: 'store.calendar-calendars',
    requires: [
        'Ext.calendar.store.EventSource',
        'Ext.calendar.model.Calendar'
    ],
    config: {
        /**
         * @cfg {Object} eventStoreDefaults
         * Defaults for the {@link Ext.calendar.model.CalendarBase event stores} 
         * generated by the calendars.
         */
        eventStoreDefaults: null
    },
    model: 'Ext.calendar.model.Calendar',
    /**
     * Get the event source for this calendar.
     * @return {Ext.calendar.store.EventSource} The event source.
     */
    getEventSource: function() {
        var source = this.eventSource;
        if (!source) {
            this.eventSource = source = new Ext.calendar.store.EventSource({
                source: this
            });
        }
        return source;
    },
    onCollectionAdd: function(collection, info) {
        var cfg = this.getEventStoreDefaults(),
            items = info.items,
            len = items.length,
            i, rec;
        this.callParent([
            collection,
            info
        ]);
        if (cfg) {
            for (i = 0; i < len; ++i) {
                rec = items[i];
                if (!rec.hasOwnProperty('eventStoreDefaults')) {
                    rec.eventStoreDefaults = Ext.merge({}, rec.eventStoreDefaults, cfg);
                }
            }
        }
    },
    doDestroy: function() {
        this.eventSource = Ext.destroy(this.eventSource);
        this.callParent();
    }
});

/**
 * @abstract
 * This is a base class for calendar views.  Calendar views display events for a date /
 * time range specified by the view subclasses:
 *
 * - {@link Ext.calendar.view.Day Day}
 * - {@link Ext.calendar.view.Days Days}
 * - {@link Ext.calendar.view.Week Week}
 * - {@link Ext.calendar.view.Weeks Weeks}
 * - {@link Ext.calendar.view.Month Month}
 * - {@link Ext.calendar.view.Multi Multi}
 *
 * By default, the view will display the current date along with any other dates surround
 * that date as specified by the particular view type.  A target date can be specified
 * by setting the {@link #cfg-value} config option.
 *
 * ### Sample View
 *
 * Below is a sample view instance.  The following example shows how to create a day view,
 * but the basic configuration applies to all view subclasses with the exception of the
 * xtype used.
 *
 *     Ext.create({
 *         xtype: 'calendar-dayview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * **Note:** For more information on possible store configurations and the expected
 * server response for both Calendars and Events stores see:
 * {@link Ext.calendar.store.Calendars}.
 *
 * ### In-View Calendar Events
 *
 * Events show on the view timeline with their start and end times correlating to either
 * the date or the time slots depending on the view type.  The events will display on the
 * timeline according to your local timezone offset from GMT (the expected format for
 * start / end times for events is UTC).  The timezone offset can be applied explicitly
 * using the {@link #cfg-timezoneOffset} config option.  If the view has multiple source
 * calendars, their events will attempt to share overlapping space within their
 * corresponding date / time slots.  Events will be displayed as a different color for
 * each source calendar and their appearance will vary slightly depending on their
 * {@link Ext.calendar.Event.html#cfg-mode mode}.  The overlapping behavior of events
 * competing for the same time slot can be managed using the {@link #cfg-displayOverlap}
 * config option.
 *
 * ### Adding / Editing Events
 *
 * Events may be added to the view by dragging / swiping across the timeline to create
 * the event endpoints.  Doing so shows the {@link Ext.calendar.form.Add add event form}
 * with the dates / times pre-populated from the drag selection.  The
 * {@link #cfg-allowSelection} config can be set to false to prevent user from creating
 * events in this way.  Events added programmatically by calling the
 * {@link #method-showAddForm} method to present the add input form.  Set the view's
 * {@link #cfg-addForm} config to `null` to prevent events from being added to the
 * calendar.
 *
 * Double clicking / tapping an event within the view shows the
 * {@link Ext.calendar.form.Edit edit event form} allowing events to be edited by users.
 * The add form and edit form can be configured using the view's {@link #cfg-addForm} and
 * {@link #cfg-editForm} configs.  For views with time displayed on the y axis of the
 * view (Day, Days, and Week), existing events can be resized using the resize handle on
 * the event widget as well as dragged across the view.  The {@link #cfg-resizeEvents},
 * {@link #cfg-draggable}, and {@link #cfg-droppable} configs may be used to manage event
 * interactions.
 *
 * ### View Navigation
 *
 * The calendar view does not create controls for navigating the view's date range,
 * however the view can be navigated programmatically.  The view's target date can be set
 * explicitly using the {@link #method-setValue} method.  The
 * {@link #method-movePrevious} and {@link #method-moveNext} methods may be called to
 * move the displayed date range forward or back.  And the {@link #method-navigate} lets
 * you move the date an arbitrary amount relative to the current date {@link #cfg-value}.
 *
 * ### Compact Mode
 * The base view class has a {@link #cfg-compact} config.  This boolean configures
 * whether or not the view is in compact mode.  It’s expected that this will be used as a
 * platform config or a responsive config.  Setting compact mode by itself does not
 * modify how the view displays.  What it does do is apply the
 * {@link #cfg-compactOptions} config over the top over the current configuration
 * options.  These `compactOptions` are what is used to specify what compactness means
 * for a particular view.  Check out the `compactOptions` for each calendar view type to
 * see its default `compactOptions`.
 */
Ext.define('Ext.calendar.view.Base', {
    extend: 'Ext.Gadget',
    requires: [
        'Ext.calendar.store.Calendars',
        'Ext.calendar.theme.Theme',
        'Ext.calendar.Event',
        'Ext.Promise',
        'Ext.calendar.date.Range',
        'Ext.calendar.date.Util'
    ],
    mixins: [
        'Ext.mixin.ConfigState'
    ],
    alternateStateConfig: 'compactOptions',
    config: {
        /**
         * @cfg {Object} addForm
         * The configuration for the {@link Ext.calendar.form.Add add form} to be used
         * when an event is to be created.  Use `null` to disable creation.
         * @accessor
         */
        addForm: {
            xtype: 'calendar-form-add'
        },
        /**
         * @cfg {Boolean} compact
         * `true` to display this view in compact mode, typically used
         * for smaller form factors.  Setting to `true` applies any configured
         * {@link #cfg-compactOptions}.
         * @accessor
         */
        compact: false,
        /**
         * @cfg {Object} [compactOptions]
         * A series of config options for this class to set when this class is in
         * {@link #cfg-compact} mode.
         * @accessor
         */
        compactOptions: null,
        /**
         * @cfg {Boolean} controlStoreRange
         * `true` to allow this view to set the date range on event stores
         * in reaction to the value changing. The need to disable this surfaces
         * when using multiple views together and allowing one view (the one with
         * the largest range) to be the in control of loading the stores.
         *
         * @accessor
         * @private
         */
        controlStoreRange: true,
        /**
         * @cfg {Object} editForm
         * The configuration for the {@link Ext.calendar.form.Edit edit form} to be used
         * when an event is to be modified. Use `null` to disable editing.
         * @accessor
         */
        editForm: {
            xtype: 'calendar-form-edit'
        },
        /**
         * @cfg {Object} eventDefaults
         * The default configuration for {@link Ext.calendar.Event event} widgets
         * @accessor
         */
        eventDefaults: {
            xtype: 'calendar-event'
        },
        /**
         * @cfg {Boolean} gestureNavigation
         * Allow the view to have the value (displayed date range) changed via swipe
         * navigation on devices that support it
         * @accessor
         */
        gestureNavigation: true,
        /**
         * @cfg {Ext.calendar.header.Base} header
         * A {@link Ext.calendar.header.Base header} object to link to this view
         * 
         * @private
         */
        header: null,
        /**
         * @cfg {Object/Ext.calendar.store.Calendars} store
         * A {@link Ext.calendar.store.Calendars calendar store} instance or
         * configuration
         * @accessor
         */
        store: null,
        /**
         * @cfg {Number} timezoneOffset
         * The timezone offset to display this calendar in. The value should be
         * specified in the same way as the native Date offset. That is, the number
         * of minutes between UTC and local time. For example the offset for UTC+10
         * would be -600 (10 hours * 60 minutes ahead).
         *
         * Defaults to the current browser offset.
         * @accessor
         */
        timezoneOffset: undefined,
        /**
         * @accessor
         * @cfg {Date} value
         * The value for the current view.
         *
         *     value: new Date('10-02-2016') // to set the date to Oct 2nd 2016
         */
        value: undefined
    },
    platformConfig: {
        '!desktop': {
            compact: true
        }
    },
    twoWayBindable: {
        value: 1
    },
    /**
     * @event beforeeventadd
     * Fired before an event {@link #addForm} is shown.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The new event to be added.
     *
     * Return `false` to cancel the form being shown.
     */
    /**
     * @event beforeeventedit
     * Fired before an event {@link #editForm} is shown.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event to be edited.
     *
     * Return `false` to cancel the form being shown.
     */
    /**
     * @event eventadd
     * Fired when an event has been added via the {@link #addForm}.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The newly added event with data.
     * @param {Object} context.data The data provided by the form.
     */
    /**
     * @event eventedit
     * Fired when an event has been edited via the {@link #editForm}.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The edited event with data.
     * @param {Object} context.data The data provided by the form.
     */
    /**
     * @event eventdrop
     * Fired when an event has been deleted via the {@link #editForm}.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The removed event.
     */
    /**
     * @event eventtap
     * Fired when an event is tapped.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     */
    /**
     * @event validateeventadd
     * Fired after the {@link #addForm} has been completed, but before the event
     * is added. Allows the add to be validated.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The new event to be added, the
     * data is not yet set on the event.
     * @param {Object} context.data The data provided by the form. This will be used to set the 
     * event data using {@link Ext.calendar.model.EventBase#setData}.
     * @param {Ext.Promise} context.validate A promise that allows validation to occur.
     * The default behavior is for no validation to take place. To achieve asynchronous
     * validation, the promise on the context object must be replaced:
     *
     *     {
     *         listeners: {
     *             validateeventadd: function(view, context) {
     *                 context.validate = context.then(function() {
     *                     return Ext.Ajax.request({
     *                         url: '/checkAdd'
     *                     }).then(function(response) {
     *                         return Promise.resolve(response.responseText === 'ok');
     *                     });
     *                 });
     *             }
     *         }
     *     }
     */
    /**
     * @event validateeventedit
     * Fired after the {@link #editForm} has been completed, but before the event
     * is saved. Allows the edit to be validated.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event to be edited, the data
     * is not yet set on the event.
     * @param {Object} context.data The data provided by the form. This will be used to set the 
     * event data using {@link Ext.calendar.model.EventBase#setData}.
     * @param {Ext.Promise} context.validate A promise that allows validation to occur.
     * The default behavior is for no validation to take place. To achieve asynchronous
     * validation, the promise on the context object must be replaced:
     *
     *     {
     *         listeners: {
     *             validateeventedit: function(view, context) {
     *                 context.validate = context.then(function() {
     *                     return Ext.Ajax.request({
     *                         url: '/checkEdit'
     *                     }).then(function(response) {
     *                         return Promise.resolve(response.responseText === 'ok');
     *                     });
     *                 });
     *             }
     *         }
     *     }
     */
    /**
     * @event validateeventdrop
     * Fired when the delete button has been tapped on the {@link #editForm}, but before the event
     * is removed. Allows the removal to be validated.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event to be removed.
     * @param {Ext.Promise} context.validate A promise that allows validation to occur.
     * The default behavior is for no validation to take place. To achieve asynchronous
     * validation, the promise on the context object must be replaced:
     *
     *     {
     *         listeners: {
     *             validateeventdrop: function(view, context) {
     *                 context.validate = context.then(function() {
     *                     return new Promise(function(resolve, reject) {
     *                         Ext.Msg.confirm('Delete', 'Really delete this event?', function(btn) {
     *                             return Promise.resolve(btn === 'yes');
     *                         });
     *                     });
     *                 });
     *             }
     *         }
     *     }
     */
    /**
     * @event valuechange
     * Fired when the {@link #cfg-value} changes.
     * @param {Ext.calendar.view.Base} this This view.
     * @param {Object} context The context.
     * @param {Date} context.value The new value.
     */
    constructor: function(config) {
        this.eventMap = {};
        this.eventPool = {};
        this.callParent([
            config
        ]);
    },
    /**
     * @method getDisplayRange
     * Get the display range for this view.
     * @return {Ext.calendar.date.Range} The display range.
     */
    /**
     * Get the active {@link #cfg-editForm} or {@link #cfg-addForm} if it exists.
     * @return {Ext.calendar.form.Base} The active form. `null` if not active.
     */
    getForm: function() {
        return this.form || null;
    },
    /**
     * @method getVisibleRange
     * Get the visible range for this view.
     * @return {Ext.calendar.date.Range} The visible range.
     */
    // Public methods
    /**
     * Move the view forward to view the "next" portion of the view based
     * on the current {@link #cfg-value}.
     * This amount depends on the current view.
     */
    moveNext: function() {
        this.setValue(this.calculateMoveNext());
    },
    /**
     * Move the view forward to view the "next" portion of the view based
     * on the current {@link #cfg-value}.
     * This amount depends on the current view.
     */
    movePrevious: function() {
        this.setValue(this.calculateMovePrevious());
    },
    /**
     * Move the current view by an amount based off of the current {@link #cfg-value}.
     * @param {Number} amount The number of intervals to move
     * @param {String} [interval=Ext.Date.DAY] The interval to navigate by. See {@link Ext.Date}
     * for valid intervals.
     */
    navigate: function(amount, interval) {
        var D = Ext.Date;
        if (amount !== 0) {
            this.setValue(D.add(this.getValue(), interval || D.DAY, amount, true));
        }
    },
    /**
     * Show the {@link #cfg-addForm} for this calendar. Has no behavior if
     * {@link #cfg-addForm} is `null`.
     * @param {Ext.calendar.model.EventBase} [event] A new event record containing
     * any data to be passed to the form. If not specified, default dates from
     * this view will be chosen.
     * @param {Object} [options] Callback options for form creation.
     * @param {Function} [options.onSave] A save callback function.
     * @param {Function} [options.onCancel] A cancel callback function.
     * @param {Object} [options.scope] A scope for the callback functions.
     */
    showAddForm: function(event, options) {
        var me = this,
            D = Ext.Date;
        if (me.getAddForm()) {
            if (!event) {
                range = me.getDefaultCreateRange();
                event = me.createModel({
                    startDate: range.start,
                    endDate: D.add(range.end, D.DAY, 1, true),
                    allDay: true
                });
            }
            me.doShowForm(event, 'add', me.createAddForm(), 'onFormCreateSave', options);
        }
    },
    /**
     * Show the {@link #cfg-editForm} for this calendar. Has no behavior if
     * {@link #cfg-editForm} is `null`.
     * @param {Ext.calendar.model.EventBase} event The event to be passed to the form.
     * @param {Object} [options] Callback options for form creation.
     * @param {Function} [options.onSave] A save callback function.
     * @param {Function} [options.onCancel] A cancel callback function.
     * @param {Object} [options.scope] A scope for the callback functions.
     */
    showEditForm: function(event, options) {
        if (this.getEditForm()) {
            this.doShowForm(event, 'edit', this.createEditForm(), 'onFormEditSave', options);
        }
    },
    // protected methods
    /**
     * Create the {@link #cfg-addForm add form} configuration. Can be hooked to provide
     * any runtime customization.
     * @return {Object} A configuration for the form instance.
     * 
     * @protected
     */
    createAddForm: function() {
        return Ext.merge({
            view: this
        }, this.getAddForm());
    },
    /**
     * Create the {@link #cfg-editForm edit form} configuration. Can be hooked to provide
     * any runtime customization.
     * @return {Object} A configuration for the form instance.
     * 
     * @protected
     */
    createEditForm: function(event) {
        return Ext.merge({
            view: this
        }, this.getEditForm());
    },
    /**
     * Get the {@link Ext.calendar.store.EventSource event source} for this view.
     * @return {Ext.calendar.store.EventSource} The event source.
     */
    getEventSource: function() {
        return this.eventSource;
    },
    // Appliers/updaters
    updateCompact: function(compact) {
        var me = this,
            baseCls = me.getBaseCls(),
            header = me.getHeader();
        me.toggleCls(Ext.baseCSSPrefix + 'calendar-compact', compact);
        me.toggleCls(baseCls + '-compact', compact);
        me.toggleCls(Ext.baseCSSPrefix + 'calendar-large', !compact);
        me.toggleCls(baseCls + '-large', !compact);
        if (header) {
            header.setCompact(compact);
        }
        me.toggleConfigState(compact);
    },
    updateCompactOptions: function() {
        if (!this.isConfiguring && this.getCompact()) {
            this.toggleConfigState(true);
        }
    },
    updateGestureNavigation: function(gestureNavigation) {
        var method;
        if (Ext.supports.Touch) {
            method = gestureNavigation ? 'on' : 'un';
            this.getBodyElement()[method]('swipe', 'onBodySwipe', this);
        }
    },
    updateHeader: function(header, oldHeader) {
        if (oldHeader) {
            oldHeader.destroy();
        }
        if (header) {
            header.setCompact(this.getCompact());
            this.refreshHeaders();
        }
    },
    applyStore: function(store) {
        if (store) {
            store = Ext.StoreManager.lookup(store, 'calendar-calendars');
        }
        return store;
    },
    updateStore: function(store, oldStore) {
        var me = this;
        me.eventSource = null;
        if (oldStore) {
            if (oldStore.getAutoDestroy()) {
                oldStore.destroy();
            } else {
                oldStore.getEventSource().un(me.getSourceListeners());
                oldStore.un(me.getStoreListeners());
            }
        }
        if (store) {
            store.on(me.getStoreListeners());
            me.eventSource = store.getEventSource();
            me.eventSource.on(me.getSourceListeners());
            if (!me.isConfiguring) {
                me.onSourceAttach();
                me.refreshEvents();
            }
        }
    },
    applyTimezoneOffset: function(timezoneOffset) {
        this.autoOffset = false;
        if (timezoneOffset === undefined) {
            timezoneOffset = Ext.calendar.date.Util.getDefaultTimezoneOffset();
            this.autoOffset = true;
        }
        return timezoneOffset;
    },
    applyValue: function(value, oldValue) {
        value = Ext.Date.clearTime(value || Ext.calendar.date.Util.getLocalNow(), true);
        if (oldValue && oldValue.getTime() === value.getTime()) {
            value = undefined;
        }
        return value;
    },
    updateValue: function(value) {
        if (!this.isConfiguring) {
            this.fireEvent('valuechange', this, {
                value: value
            });
        }
    },
    // Overrides
    doDestroy: function() {
        var me = this;
        me.clearEvents();
        me.form = Ext.destroy(me.form);
        me.setHeader(null);
        me.setStore(null);
        me.callParent();
    },
    privates: {
        $eventCls: Ext.baseCSSPrefix + 'calendar-event',
        $eventInnerCls: Ext.baseCSSPrefix + 'calendar-event-inner',
        $eventColorCls: Ext.baseCSSPrefix + 'calendar-event-marker-color',
        $staticEventCls: Ext.baseCSSPrefix + 'calendar-event-static',
        $tableCls: Ext.baseCSSPrefix + 'calendar-table',
        eventRefreshSuspend: 0,
        refreshCounter: 0,
        forwardDirection: 'left',
        backwardDirection: 'right',
        /**
         * @property {Object} dateInfo
         * Contains information about the current date ranges.
         * 
         * @private
         */
        dateInfo: null,
        calculateMove: function(offset) {
            var interval = this.getMoveInterval(),
                val = this.getMoveBaseValue();
            return Ext.Date.add(val, interval.unit, offset * interval.amount, true);
        },
        /**
         * Calculate the value to use for {@link #moveNext}
         * @return {Date} The new value.
         *
         * @private
         */
        calculateMoveNext: function() {
            return this.calculateMove(1);
        },
        /**
         * Calculate the value to use for {@link #movePrevious}
         * @return {Date} The new value.
         *
         * @private
         */
        calculateMovePrevious: function() {
            return this.calculateMove(-1);
        },
        /**
         * Clear events from the view.
         *
         * @private
         */
        clearEvents: function() {
            var map = this.eventMap,
                key;
            for (key in map) {
                map[key].destroy();
            }
            this.eventMap = {};
        },
        /**
         * Create an event widget.
         * @param {Ext.calendar.model.EventBase} event The event record.
         * @param {Object} [cfg] A config for the event.
         * @param {Boolean} [dummy=false] `true` if this is a dummy event not backed by a record.
         * @return {Ext.calendar.EventBase} The event widget.
         *
         * @private
         */
        createEvent: function(event, cfg, dummy) {
            var me = this,
                defaults = Ext.apply({}, me.getEventDefaults()),
                widget, d;
            if (dummy) {
                d = me.getUtcNow();
                cfg.startDate = d;
                cfg.endDate = d;
            } else {
                cfg.palette = me.getEventPalette(event);
            }
            cfg = cfg || {};
            cfg.model = event;
            cfg.view = me;
            widget = Ext.widget(Ext.apply(cfg, defaults));
            if (!dummy) {
                me.eventMap[widget.id] = widget;
            }
            return widget;
        },
        /**
         * Create a number of event widgets.
         * @param {Ext.calendar.model.EventBase[]} events The events.
         * @param {Object} [cfg] A config for each event.
         * @return {Ext.calendar.EventBase[]} The event widgets.
         *
         * @private
         */
        createEvents: function(events, cfg) {
            var len = events.length,
                ret = [],
                i;
            for (i = 0; i < len; ++i) {
                ret.push(this.createEvent(events[i], Ext.apply({}, cfg)));
            }
            return ret;
        },
        createModel: function(data) {
            return this.getEventSource().createEvent(data);
        },
        /**
         * Execute a full refresh of the view and events.
         * 
         * @private
         */
        doRefresh: Ext.privateFn,
        /**
         * Execute a full refresh of events.
         *
         * @private
         */
        doRefreshEvents: Ext.privateFn,
        /**
         * Show a form for this calendar.
         * @param {Ext.calendar.model.EventBase} event The event.
         * @param type
         * @param {Object} cfg The config for the form.
         * @param {Function} successFn A function to call if the edit is successful.
         * @param {Object} [options] Callback options for form creation.
         * @param {Function} [options.onSave] A save callback function.
         * @param {Function} [options.onCancel] A cancel callback function.
         * @param {Object} [options.scope] A scope for the callback functions.
         *
         * @private
         */
        doShowForm: function(event, type, cfg, successFn, options) {
            var me = this,
                c;
            if (!me.getStore() || !event.isEditable()) {
                return;
            }
            if (me.fireEvent('beforeevent' + type, me, {
                event: event
            }) === false) {
                return;
            }
            options = options || {};
            me.form = c = Ext.create(Ext.apply({
                event: event
            }, cfg));
            c.on({
                save: function(form, context) {
                    var data = context.data,
                        o = {
                            event: event,
                            data: data,
                            validate: Ext.Promise.resolve(true)
                        };
                    me.fireEvent('validateevent' + type, me, o);
                    o.validate.then(function(v) {
                        if (v !== false) {
                            if (options.onSave) {
                                options.onSave.call(options.scope || me, me, event, data);
                            }
                            me[successFn](form, event, data);
                            me.fireEvent('event' + type, me, {
                                event: event,
                                data: data
                            });
                        } else {
                            me.onFormCancel(form);
                        }
                    });
                },
                cancel: function(form, context) {
                    if (options.onCancel) {
                        options.onCancel.call(options.scope || me, me, event);
                    }
                    me.onFormCancel(form);
                    me.fireEvent('event' + type + 'cancel', me, {
                        event: event
                    });
                },
                close: function(form) {
                    if (options.onCancel) {
                        options.onCancel.call(options.scope || me, me, event);
                    }
                    me.onFormCancel(form);
                },
                drop: function(form) {
                    var o = {
                            event: event,
                            validate: Ext.Promise.resolve(true)
                        };
                    me.fireEvent('validateeventdrop', me, o);
                    o.validate.then(function(v) {
                        if (v !== false) {
                            if (options.onDrop) {
                                options.onDrop.call(options.scope || me, me, event);
                            }
                            me.onFormDrop(form, event);
                            me.fireEvent('eventdrop', me, {
                                event: event
                            });
                        } else {
                            me.onFormCancel(form);
                        }
                    });
                }
            });
            c.show();
        },
        /**
         * Get the body element of this view.
         * @return {Ext.dom.Element} The body.
         *
         * @private
         */
        getBodyElement: function() {
            return this.element;
        },
        /**
         * Get a calendar by id.
         * @param {Object} id The id of the calendar.
         * @return {Ext.calendar.model.CalendarBase} The calendar
         *
         * @private
         */
        getCalendar: function(id) {
            return this.getStore().getById(id);
        },
        /**
         * Get the number of days covered for a range. For example,
         * 2010-01-01 22:00, 2010-01-02 01:00 is 2 days because it has boundaries
         * within 2 days.
         * @param {Date} start The start of the range.
         * @param {Date} end The end of the range.
         * @param {Boolean} allDay `true` if the time range should be considered as an all
         * day event.
         * @return {Number} The number of days spanned.
         *
         * @private
         */
        getDaysSpanned: function(start, end, allDay) {
            var D = Ext.Date,
                ret;
            if (allDay) {
                ret = D.diff(start, end, D.DAY);
            } else {
                start = this.utcToLocal(start);
                end = this.utcToLocal(end);
                ret = Ext.calendar.model.Event.getDaysSpanned(start, end);
            }
            return ret;
        },
        /**
         * The the default range when creating a event.
         * @return {Ext.calendar.date.Range} The range.
         *
         * @private
         */
        getDefaultCreateRange: function() {
            var me = this,
                now = Ext.calendar.date.Util.getLocalNow(),
                displayRange = me.getDisplayRange(),
                d;
            now = me.toUtcOffset(Ext.Date.clearTime(now, true));
            if (displayRange.contains(now)) {
                d = Ext.Date.localToUtc(now);
            } else {
                d = me.toUtcOffset(displayRange.start);
            }
            return new Ext.calendar.date.Range(d, d);
        },
        /**
         * Get the default color palette for this view. Defaults to the
         * color of the first calendar, otherwise the first color in the palette.
         * @return {Ext.calendar.theme.Palette} The color palette.
         *
         * @private
         */
        getDefaultPalette: function() {
            var store = this.getStore(),
                Theme = Ext.calendar.theme.Theme,
                rec, color;
            if (store) {
                rec = store.first();
                if (rec) {
                    color = rec.getBaseColor();
                }
            }
            return Theme.getPalette(color || Theme.colors[0]);
        },
        /**
         * Get all calendars that are {@link Ext.calendar.model.CalendarBase#isEditable editable}.
         * @return {Ext.calendar.model.CalendarBase[]} The editable calendars.
         *
         * @private
         */
        getEditableCalendars: function() {
            var store = this.getStore(),
                ret;
            if (store) {
                ret = Ext.Array.filter(store.getRange(), function(cal) {
                    return cal.isEditable();
                });
            }
            return ret || [];
        },
        /**
         * Get an event record via element/DOM event.
         * @param {Ext.dom.Element/HTMLElement/Ext.event.Event} el The element target,
         * @return {Ext.calendar.model.EventBase} The event record.
         *
         * @private
         */
        getEvent: function(el) {
            var cls = this.$eventCls,
                id;
            if (el.isEvent) {
                el = el.target;
            }
            if (!Ext.fly(el).hasCls(cls)) {
                el = Ext.fly(el).up('.' + cls, this.element, true);
            }
            id = el.getAttribute('data-eventId');
            return this.getEventSource().getById(id);
        },
        /**
         * See {@link #getDaysSpanned}.
         * @param {Ext.calendar.model.EventBase} event The event.
         * @return {Number} The number of days spanned.
         *
         * @private
         */
        getEventDaysSpanned: function(event) {
            return this.getDaysSpanned(event.getStartDate(), event.getEndDate(), event.getAllDay());
        },
        /**
         * Get the palette for an event record.
         * @param {Ext.calendar.model.EventBase} event The event record.
         * @return {Ext.calendar.theme.Palette} The palette.
         *
         * @private
         */
        getEventPalette: function(event) {
            var color = event.getColor() || event.getCalendar().getBaseColor();
            return Ext.calendar.theme.Theme.getPalette(color);
        },
        /**
         * Get the value to use as the base for moving when using
         * {@link #moveNext} and {@link #movePrevious}.
         * @return {Date} The value.
         *
         * @private
         */
        getMoveBaseValue: function() {
            return this.getValue();
        },
        /**
         * Get the period to move when using
         * {@link #moveNext} and {@link #movePrevious}.
         * @return {Object} The period to move
         * @return {String} return.unit The units to move, see {@link Ext.Date}.
         * @return {Number} return.amount The number of units to move.
         *
         * @private
         */
        getMoveInteral: Ext.privateFn,
        /**
         * Get listeners to add to the event source.
         * @return {Object} A listeners config.
         *
         * @private
         */
        getSourceListeners: function() {
            return {
                scope: this,
                add: 'onSourceAdd',
                refresh: 'onSourceRefresh',
                remove: 'onSourceRemove',
                update: 'onSourceUpdate'
            };
        },
        /**
         * Get listeners to add to the calendar store..
         * @return {Object} A listeners config.
         *
         * @private
         */
        getStoreListeners: function() {
            return {
                scope: this,
                update: 'onStoreUpdate'
            };
        },
        /**
         * Get the current date in UTC.
         * @return {Date} The current UTC date.
         *
         * @private
         */
        getUtcNow: function() {
            return Ext.Date.utcToLocal(new Date());
        },
        /**
         * Handle drop on the view.
         * @param type
         * @param {Ext.calendar.model.EventBase} event The event.
         * @param {Ext.calendar.date.Range} newRange The new range.
         * @param {Function} [callback] A callback to execute.
         *
         * @private
         */
        handleChange: function(type, event, newRange, callback) {
            var me = this,
                o = {
                    event: event,
                    newRange: newRange.clone(),
                    validate: Ext.Promise.resolve(true)
                },
                fn = callback ? callback : Ext.emptyFn;
            me.fireEvent('validateevent' + type, me, o);
            o.validate.then(function(v) {
                if (v !== false) {
                    fn(true);
                    event.setRange(newRange);
                    me.fireEvent('event' + type, me, {
                        event: event,
                        newRange: newRange.clone()
                    });
                } else {
                    fn(false);
                }
            });
        },
        /**
         * Handle drag/resize start for an event.
         * @param {String} type The event type.
         * @param {Ext.calendar.model.EventBase} event The event.
         * @return {Boolean} `false` to veto the event.
         *
         * @private
         */
        handleChangeStart: function(type, event) {
            var ret = event.isEditable();
            if (ret) {
                ret = this.fireEvent('beforeevent' + type + 'start', this, {
                    event: event
                });
            }
            return ret;
        },
        /**
         * Handle resizing of the main view element.
         *
         * @private
         */
        handleResize: Ext.privateFn,
        /**
         * Checks if the {@link #store} has editable calendars.
         * @return {Boolean} `true` if any calendars are editable.
         *
         * @private
         */
        hasEditableCalendars: function() {
            return this.getEditableCalendars().length > 0;
        },
        /**
         * Checks if an event is hidden, by virtue of the calendar being hidden.
         * @param {Ext.calendar.model.EventBase} event The event.
         * @return {Boolean} `true` if the event should be hidden.
         *
         * @private
         */
        isEventHidden: function(event) {
            var cal = event.getCalendar();
            return cal ? cal.isHidden() : true;
        },
        /**
         * Handle a swipe on the view body.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onBodySwipe: function(e) {
            var me = this;
            if (e.direction === me.forwardDirection) {
                me.moveNext();
            } else if (e.direction === me.backwardDirection) {
                me.movePrevious();
            }
        },
        /**
         * Handle a tap on an event model.
         * @param {Ext.calendar.model.EventBase} event The event model.
         *
         * @private
         */
        onEventTap: function(event) {
            this.fireEvent('eventtap', this, {
                event: event
            });
            this.showEditForm(event);
        },
        /**
         * Handle create form being saved.
         * @param {Ext.calendar.form.Base} form The form.
         * @param {Object} data The data from the form.
         *
         * @private
         */
        onFormCreateSave: function(form, event, data) {
            event.setData(data);
            event.setCalendar(this.getCalendar(event.getCalendarId()));
            this.getEventSource().add(event);
            this.form = Ext.destroy(form);
        },
        /**
         * Handle edit form being saved.
         * @param {Ext.calendar.form.Base} form The form.
         * @param {Ext.calendar.model.EventBase} event The event being edited.
         * @param {Object} data The data from the form.
         *
         * @private
         */
        onFormEditSave: function(form, event, data) {
            var me = this,
                oldCalendar = event.getCalendar(),
                id;
            me.suspendEventRefresh();
            event.setData(data);
            id = event.getCalendarId();
            if (oldCalendar.id !== id) {
                event.setCalendar(me.getCalendar(id));
                me.getEventSource().move(event, oldCalendar);
            }
            me.resumeEventRefresh();
            me.refreshEvents();
            me.form = Ext.destroy(form);
        },
        onFormDrop: function(form, event) {
            this.getEventSource().remove(event);
            this.form = Ext.destroy(form);
        },
        /**
         * Handle the form being cancelled.
         * @param {Ext.calendar.form.Base} form The form.
         *
         * @private
         */
        onFormCancel: function(form) {
            this.form = Ext.destroy(form);
        },
        /**
         * Handle records being added to the source.
         * @param {Ext.calendar.store.EventSource} source The event source.
         * @param {Ext.calendar.model.EventBase[]} events The events.
         *
         * @private
         */
        onSourceAdd: function() {
            this.refreshEvents();
        },
        /**
         * @method
         * Handles a source being attached.
         *
         * @private
         */
        onSourceAttach: Ext.privateFn,
        /**
         * Handles a source being refreshed.
         * @param {Ext.calendar.store.EventSource} source The source.
         *
         * @private
         */
        onSourceRefresh: function() {
            this.refreshEvents();
        },
        /**
         * Handle records being removed from the source.
         * @param {Ext.calendar.store.EventSource} source The event source.
         * @param {Ext.calendar.model.EventBase[]} events The events.
         *
         * @private
         */
        onSourceRemove: function() {
            this.refreshEvents();
        },
        /**
         * Handles a record being updated in the source.
         * @param {Ext.calendar.store.EventSource} source The event source.
         * @param {Ext.calendar.model.EventBase} event The event.
         *
         * @private
         */
        onSourceUpdate: function() {
            this.refreshEvents();
        },
        /**
         * Handles an update on the calendar store.
         * @param {Ext.calendar.store.Calendars} store The store.
         * @param {Ext.calendar.model.CalendarBase} calendar The calendar.
         *
         * @private
         */
        onStoreUpdate: function() {
            this.refreshEvents();
        },
        /**
         * Do a full refresh of the view if not in the middle of configuration.
         *
         * @private
         */
        refresh: function() {
            var me = this;
            if (!me.isConfiguring) {
                ++me.refreshCounter;
                me.doRefresh();
                if (me.hasListeners.refresh) {
                    me.fireEvent('refresh', me);
                }
            }
        },
        /**
         * Do a full event refresh if not configuring and event refresh
         * is not suspended.
         *
         * @private
         */
        refreshEvents: function() {
            var me = this;
            if (!me.eventRefreshSuspend && !me.isConfiguring) {
                if (!me.refreshCounter) {
                    me.refresh();
                }
                me.doRefreshEvents();
            }
        },
        /**
         * @method
         * Refresh any attached {@link #header} object.
         *
         * @private
         */
        refreshHeaders: Ext.privateFn,
        /**
         * Resume the ability to refresh events on the view. The number of calls
         * to resume must match {@link #suspendEventRefresh}.
         *
         * @private
         */
        resumeEventRefresh: function() {
            --this.eventRefreshSuspend;
        },
        /**
         * Set the range on the event source if it exists.
         * @param {Ext.calendar.date.Range} range The range.
         *
         * @private
         */
        setSourceRange: function(range) {
            if (!this.getControlStoreRange()) {
                return;
            }
            var D = Ext.Date,
                eventSource = this.getEventSource(),
                cached, start, end;
            if (eventSource) {
                range = Ext.calendar.date.Util.expandRange(range);
                start = range.start;
                end = range.end;
                cached = eventSource.hasRangeCached(range);
                eventSource.setRange(range);
                if (cached) {
                    this.refreshEvents();
                }
            }
        },
        /**
         * Suspend the ability to refresh events on the view. The number of calls
         * to suspend must match {@link #resumeEventRefresh}.
         *
         * @private
         */
        suspendEventRefresh: function() {
            ++this.eventRefreshSuspend;
        },
        /**
         * Creates a UTC date at the specified time, taking into account
         * the timezone offset. For example if the timezone offset is +01:00GMT
         * and the values are 2010-01-05:00:00, then the resulting value would be
         * 2010-01-04:23:00.
         * 
         * @param {Date} date The date
         * @return {Date} The offset date
         */
        toUtcOffset: function(date) {
            var D = Ext.Date,
                d = D.localToUtc(date),
                autoOffset = this.autoOffset,
                tzOffset = autoOffset ? d.getTimezoneOffset() : this.getTimezoneOffset(),
                dOffset;
            if (autoOffset) {
                dOffset = date.getTimezoneOffset();
                if (dOffset !== tzOffset) {
                    tzOffset += dOffset - tzOffset;
                }
            }
            return D.add(d, D.MINUTE, tzOffset, true);
        },
        /**
         * Get a UTC date as a local date, taking into account the {@link #timezoneOffset}.
         * For example, if the current date is:
         * `Thu May 05 2016 10:00:00 GMT+1000` and the timezoneOffset is `-60`, then the value will
         * be `Thu May 05 2016 01:00:00 GMT+1000`.
         * @param {Date} d The date
         * @return {Date} The offset
         */
        utcToLocal: function(d) {
            var D = Ext.Date,
                viewOffset = this.getTimezoneOffset(),
                localOffset = d.getTimezoneOffset(),
                ret;
            if (this.autoOffset) {
                ret = D.clone(d);
            } else {
                ret = D.subtract(d, D.MINUTE, viewOffset - localOffset, true);
            }
            return ret;
        },
        utcTimezoneOffset: function(date) {
            var D = Ext.Date,
                tzOffset = this.autoOffset ? date.getTimezoneOffset() : this.getTimezoneOffset();
            return D.subtract(date, D.MINUTE, tzOffset, true);
        }
    }
});

Ext.define('Ext.overrides.calendar.view.Base', {
    override: 'Ext.calendar.view.Base',
    constructor: function(config) {
        this.callParent([
            config
        ]);
        this.initialized = true;
    },
    render: function(container, position) {
        var me = this;
        me.callParent([
            container,
            position
        ]);
        if (me.initialized && !me.getRefOwner()) {
            me.refresh();
        }
    },
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        this.callParent([
            width,
            height,
            oldWidth,
            oldHeight
        ]);
        this.handleResize();
    },
    privates: {
        refreshEvents: function() {
            if (this.element.dom.offsetHeight === 0) {
                return;
            }
            this.callParent();
        }
    }
});

/**
 * This class is used to generate the rendering parameters for an event
 * in a {@link Ext.calendar.view.Days}. The purpose of this class is
 * to provide the rendering logic insulated from the DOM.
 * 
 * @private
 */
Ext.define('Ext.calendar.view.DaysRenderer', {
    /**
     * @cfg {Date} end
     * The end for the day.
     */
    end: null,
    /**
     * @cfg {Date} start
     * The start for the day.
     */
    start: null,
    /**
     * @cfg {Ext.calendar.view.Days} view
     * The view.
     */
    view: null,
    constructor: function(config) {
        var me = this,
            D = Ext.Date,
            view, slotTicks;
        Ext.apply(me, config);
        view = me.view;
        slotTicks = view.slotTicks;
        me.slots = (view.getEndTime() - view.getStartTime()) * (60 / slotTicks);
        me.offset = view.MS_TO_MINUTES * slotTicks;
        me.events = [];
    },
    /**
     * Adds the event to this renderer if it is valid.
     * @param {Ext.calendar.model.EventBase} event.
     */
    addIf: function(event) {
        var me = this,
            start = me.start,
            view = me.view,
            offset = me.offset,
            startSlot, endSlot;
        if (!event.isSpan() && event.isContainedByRange(start, me.end)) {
            startSlot = Math.max(0, (view.roundDate(event.getStartDate()) - start) / offset);
            endSlot = Math.min(me.slots, (view.roundDate(event.getEndDate()) - start) / offset);
            this.events.push({
                event: event,
                start: startSlot,
                end: endSlot,
                len: endSlot - startSlot,
                colIdx: -1,
                overlaps: [],
                edgeWeight: -1,
                forwardPos: -1,
                backwardPos: -1
            });
        }
    },
    /**
     * Indicates that all events are added and the positions can be calculated.
     */
    calculate: function() {
        var me = this,
            events = me.events,
            columns, len, i, firstCol;
        events.sort(me.sortEvents);
        columns = me.buildColumns(events);
        me.constructOverlaps(columns);
        firstCol = columns[0];
        if (firstCol) {
            len = firstCol.length;
            for (i = 0 , len = firstCol.length; i < len; ++i) {
                me.calculateEdgeWeights(firstCol[i]);
            }
            for (i = 0 , len = firstCol.length; i < len; ++i) {
                me.calculatePositions(firstCol[i], 0, 0);
            }
        }
    },
    /**
     * Checks if this renderer has any events.
     * @return {Boolean} `true` if there are events.
     */
    hasEvents: function() {
        return this.events.length > 0;
    },
    privates: {
        /**
         * Finds any vertically overlapping events from the candidates and
         * pushes them into the events overlap collection.
         * @param {Object} event The event meta object.
         * @param {Object[]} candidates The possible overlapping candidates.
         *
         * @private
         */
        appendOverlappingEvents: function(event, candidates) {
            this.doOverlap(event, candidates, event.overlaps);
        },
        /**
         * Construct a series of columns for events. If there is no
         * vertical collision between events, they can exist in the same column.
         * @param {Object[]} events The events.
         * @return {Object[][]} The columns. Each column will be an array of events.
         *
         * @private
         */
        buildColumns: function(events) {
            var len = events.length,
                columns = [],
                i, j, colLen, col, event, idx;
            for (i = 0; i < len; ++i) {
                idx = -1;
                event = events[i];
                for (j = 0 , colLen = columns.length; j < colLen; ++j) {
                    if (!this.hasOverlappingEvents(event, columns[j])) {
                        idx = j;
                        break;
                    }
                }
                if (idx === -1) {
                    idx = columns.length;
                    columns[idx] = [];
                }
                columns[idx].push(event);
                event.colIdx = idx;
            }
            return columns;
        },
        /**
         * Calculate the distance of this event to the edge in terms of items that
         * are overlapping in the horizontal group. A larger weight means there are
         * more items between the event and the edge,
         * @param {Object} event The event.
         * @return {Number} The weight.
         *
         * @private
         */
        calculateEdgeWeights: function(event) {
            var overlaps = event.overlaps,
                len = overlaps.length,
                weight = event.edgeWeight,
                i;
            if (weight === -1) {
                weight = 0;
                for (i = 0; i < len; ++i) {
                    weight = Math.max(weight, this.calculateEdgeWeights(overlaps[i]) + 1);
                }
                event.edgeWeight = weight;
            }
            return weight;
        },
        /**
         * Calculate the backward/forward position from the start/end edges. The values
         * for each offset will be a percentage value.
         * @param {Object} event The event
         * @param {Number} edgeOffset The number of items before this one in the horizontal series.
         * @param {Number} backOffset The starting offset of an item in this horizontal series.
         *
         * @private
         */
        calculatePositions: function(event, edgeOffset, backOffset) {
            var overlaps = event.overlaps,
                len = overlaps.length,
                nextEdgeOffset = edgeOffset + 1,
                fwd, i, first, availWidth;
            if (event.forwardPos === -1) {
                if (len === 0) {
                    event.forwardPos = 1;
                } else {
                    overlaps.sort(this.sortOverlaps);
                    first = overlaps[0];
                    // Calculate the forward pos from the backward pos of the first item
                    // in the series. This will be the item with the highest edge weight in
                    // the overlaps collection.
                    this.calculatePositions(first, nextEdgeOffset, backOffset);
                    event.forwardPos = first.backwardPos;
                }
                fwd = event.forwardPos;
                availWidth = fwd - backOffset;
                event.backwardPos = fwd - availWidth / nextEdgeOffset;
                // Start from 1, either we have 0 overlaps or we already calculated it above.
                for (i = 1; i < len; ++i) {
                    this.calculatePositions(overlaps[i], 0, fwd);
                }
            }
        },
        /**
         * Finds events in subsequent columns that have a vertical overlap and tracks
         * them on the event.
         * @param {Object[][]} columns The columns.
         *
         * @private
         */
        constructOverlaps: function(columns) {
            var len = columns.length,
                col, i, j, colLen, event;
            for (i = 0; i < len; ++i) {
                col = columns[i];
                for (j = 0 , colLen = col.length; j < colLen; ++j) {
                    event = col[j];
                    for (k = i + 1; k < len; ++k) {
                        this.appendOverlappingEvents(event, columns[k]);
                    }
                }
            }
        },
        /**
         * Utility method for checking events. Either returns true once
         * it finds an overlap or appends items to an array.
         * 
         * @param {Object} event The event.
         * @param {Object[]} candidates The overlap candidates.
         * @param {Object[]} append If specified, overlapping items will be appended here.
         * @return {Boolean} `true` if there are overlapping events. Only returned if append
         * is not specified.
         *
         * @private
         */
        doOverlap: function(event, candidates, append) {
            var overlaps = [],
                len = candidates.length,
                i, other;
            for (i = 0; i < len; ++i) {
                other = candidates[i];
                if (this.overlaps(event, other)) {
                    if (append) {
                        append.push(other);
                    } else {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * Checks if overlaps exist between an event and candidates.
         * @param {Object} event The event.
         * @param {Object[]} candidates The candidates.
         * @return {Boolean} `true` if there are overlapping events.
         *
         * @private
         */
        hasOverlappingEvents: function(event, candidates) {
            return this.doOverlap(event, candidates);
        },
        /**
         * Checks whether two events vertically overlap.
         * @param {Object} e1 The first event.
         * @param {Object} e2 The second event.
         * @return {Boolean} `true` if the events overlap.
         *
         * @private
         */
        overlaps: function(e1, e2) {
            return e1.start < e2.end && e1.end > e2.start;
        },
        /**
         * A sort comparator function for processing events.
         * @param {Object} e1 The first event.
         * @param {Object} e2 The second event,
         * @return {Number} A standard sort comparator.
         *
         * @private
         */
        sortEvents: function(e1, e2) {
            return Ext.calendar.model.EventBase.sort(e1.event, e2.event);
        },
        /**
         * A sort comparator function for overlapping events.
         * @param {Object} e1 The first event.
         * @param {Object} e2 The second event,
         * @return {Number} A standard sort comparator.
         *
         * @private
         */
        sortOverlaps: function(e1, e2) {
            // Higher edge weights go first, since are at the start.                
            return e2.edgeWeight - e1.edgeWeight || // Otherwise sort by events closer to the start edge, giving
            // precedence to those where the backwardPos hasn't be calculated
            (e1.backwardPos || 0) - (e2.backwardPos || 0) || Ext.calendar.model.EventBase.sort(e1.event, e2.event);
        }
    }
});

/**
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Days view displays events for multiple days with the time of day along the y axis.
 * The view will display the current date as the first day displayed unless configured
 * with a different date {@link #cfg-value}.  The number of days displayed can be set
 * using the {@link #cfg-visibleDays} config option.  By default, the calendar hours are
 * displayed as a 24 hour clock and are constrained to 8 (8:00am) and 20 (8:00pm).  The
 * beginning and end hour can be set using the {@link #cfg-startHour} and
 * {@link #cfg-endHour} configs.  The time displayed on the timeline may be customized
 * using either the {@link #cfg-timeFormat} or {@link #cfg-timeRenderer} config options.
 *
 * Below are some of the distinctions to the Days view (and generally its subclasses).
 *
 * ### Current Local Time
 *
 * The current local time (when the current date is displayed) will be shown on the view
 * as a thin marker on the day's timeline.  The current time marker can be set using the
 * {@link #cfg-showNowMarker} option.
 *
 * ### Calendar Events
 *
 * Events show on the timeline with their start and end times correlating to the time
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.  The exception being all day or multi-day
 * events.  All day / multi-day events will show up at the top of the view in a dedicated
 * space preceding the view's start time.
 *
 * ### Adding All Day Events
 *
 * In addition to being able to drag / swipe across a day's timeline to show the event
 * add form, an all day type event can be quickly added by tapping / clicking on the
 * dedicated all day row displayed above the start hour.  This is the same dedicated
 * space used to display existing all day events.
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward the number of days set on the
 * {@link #cfg-visibleDays} config.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the dates displayed consider using
 * {@link Ext.calendar.panel.Days} instead.  To display a single day consider using the
 * {@link Ext.calendar.view.Day} view or {@link Ext.calendar.view.Week} to view a week at
 * a time.
 */
Ext.define('Ext.calendar.view.Days', {
    extend: 'Ext.calendar.view.Base',
    xtype: 'calendar-daysview',
    requires: [
        'Ext.calendar.view.DaysRenderer',
        'Ext.calendar.Event',
        'Ext.scroll.Scroller',
        'Ext.calendar.util.Dom'
    ],
    uses: [
        'Ext.calendar.dd.DaysAllDaySource',
        'Ext.calendar.dd.DaysAllDayTarget',
        'Ext.calendar.dd.DaysBodySource',
        'Ext.calendar.dd.DaysBodyTarget'
    ],
    isDaysView: true,
    baseCls: Ext.baseCSSPrefix + 'calendar-days',
    cellOverflowScrollBug: Ext.isGecko || Ext.isIE11m || Ext.isEdge,
    config: {
        /**
         * @cfg {Boolean} allowSelection
         * `true` to allow selection in the UI to create events. This includes being able
         * to drag-select a range in the all day area, as well as click/tap in the day
         * area (the dedicated space just above the start time's row) to create an event.
         *
         * See {@link #method-showAddForm} for adding an event when selection is
         * disabled.
         * @accessor
         */
        allowSelection: true,
        compactOptions: {
            displayOverlap: false,
            showNowMarker: false,
            timeFormat: 'g',
            timeRenderer: function(hour, formatted, firstInGroup) {
                var D = Ext.Date,
                    suffix = '',
                    d, cls;
                if (firstInGroup) {
                    cls = Ext.baseCSSPrefix + 'calendar-days-time-ampm';
                    d = D.clone(this.baseDate);
                    d.setHours(hour);
                    suffix = '<div class="' + cls + '">' + Ext.Date.format(d, 'a') + '</div>';
                }
                return formatted + suffix;
            }
        },
        /**
         * @cfg {Boolean} displayOverlap
         * When displaying events, allow events that intersect to horizontally overlap to
         * save on horizontal space.
         * @accessor
         */
        displayOverlap: true,
        /**
         * @cfg {Boolean} draggable
         * `true` to allows events to be dragged from this view.
         * @accessor
         */
        draggable: true,
        /**
         * @cfg {Boolean} droppable
         * `true` to allows events to be dropped on this view.
         * @accessor
         */
        droppable: true,
        /**
         * @cfg {Number} endHour
         * The hour number to end this view. Should be a value between `1` and `24`.
         * @accessor
         */
        endTime: 20,
        /**
         * @cfg {Boolean} resizeEvents
         * `true` to allow events in the day area to be resized.
         * @accessor
         */
        resizeEvents: true,
        /**
         * @cfg {Boolean} showNowMarker
         * `true` to show a marker on the view that equates to the current local time.
         * @accessor
         */
        showNowMarker: true,
        /**
         * @cfg {Number} endHour
         * The hour number to start this view. Should be a value between `0` and `23`.
         * @accessor
         */
        startTime: 8,
        //<locale>
        /**
         * @cfg {String} timeFormat
         * The format to display the time values in the time gutter.
         *
         * Refer to the class description of {@link Ext.Date} for formatting options.
         *
         * Example format for displaying a 12-hour time with an am/pm suffix:
         *
         *     timeFormat: 'h:ia' // displays 14:00 hours as 2:00pm
         *
         * @accessor
         */
        timeFormat: 'H:i',
        //</locale>
        /**
         * @cfg {Function} [timeRenderer]
         * A formatting function for more complex displays of time values in the time
         * gutter.
         *
         * @param {Number} hour The hour being shown.
         * @param {String} formatted The formatted value as specified by the {@link #timeFormat}.
         * @param {Boolean} firstInGroup `true` if this hour is the first hour in the specified time
         * range to be in the morning (< 12) or in the afternoon > 12.
         *
         * @accessor
         */
        timeRenderer: null,
        /**
         * @cfg {Date} [value=new Date()]
         * The value to start the view from. The events displayed on this
         * view are configured by the value and the {@link #visibleDays}.
         *
         * @accessor
         */
        /**
         * @cfg {Number} visibleDays
         * The number of days to show starting from the {@link #cfg-value}.
         * @accessor
         */
        visibleDays: 4
    },
    /**
     * @event beforeeventdragstart
     * Fired before an event drag begins. Depends on the {@link #cfg-draggable} config.
     * @param {Ext.calendar.view.Days} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     *
     * Return `false` to cancel the drag.
     */
    /**
     * @event beforeeventresizestart
     * Fired before an event resize begins. Depends on the {@link #cfg-resizeEvents} config.
     * @param {Ext.calendar.view.Days} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     *
     * Return `false` to cancel the resize.
     */
    /**
     * @event eventdrop
     * Fired when an event drop is complete.
     * Depends on the {@link #cfg-droppable} config.
     * @param {Ext.calendar.view.Days} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     * @param {Ext.calendar.date.Range} context.newRange The new date range.
     */
    /**
     * @event eventresize
     * Fired when an event resize is complete.
     * Depends on the {@link #cfg-resizeEvents} config.
     * @param {Ext.calendar.view.Days} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     * @param {Ext.calendar.date.Range} context.newRange The new date range.
     */
    /**
     * @event validateeventdrop
     * Fired when an event is dropped on this view, allows the drop
     * to be validated. Depends on the {@link #cfg-droppable} config.
     * @param {Ext.calendar.view.Days} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     * @param {Ext.calendar.date.Range} context.newRange The new date range.
     * @param {Ext.Promise} context.validate A promise that allows validation to occur.
     * The default behavior is for no validation to take place. To achieve asynchronous
     * validation, the promise on the context object must be replaced:
     *
     *     {
     *         listeners: {
     *             validateeventdrop: function(view, context) {
     *                 context.validate = context.then(function() {
     *                     return Ext.Ajax.request({
     *                         url: '/checkDrop'
     *                     }).then(function(response) {
     *                         return Promise.resolve(response.responseText === 'ok');
     *                     });
     *                 });
     *             }
     *         }
     *     }
     */
    /**
     * @event validateeventresize
     * Fired when an event is resized on this view, allows the resize
     * to be validated. Depends on the {@link #cfg-resizeEvents} config.
     * @param {Ext.calendar.view.Days} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     * @param {Ext.calendar.date.Range} context.newRange The new date range.
     * @param {Ext.Promise} context.validate A promise that allows validation to occur.
     * The default behavior is for no validation to take place. To achieve asynchronous
     * validation, the promise on the context object must be replaced:
     *
     *     {
     *         listeners: {
     *             validateeventresize: function(view, context) {
     *                 context.validate = context.then(function() {
     *                     return Ext.Ajax.request({
     *                         url: '/checkResize'
     *                     }).then(function(response) {
     *                         return Promise.resolve(response.responseText === 'ok');
     *                     });
     *                 });
     *             }
     *         }
     *     }
     */
    constructor: function(config) {
        var me = this;
        me.slotsPerHour = 60 / me.slotTicks;
        me.callParent([
            config
        ]);
        me.scrollable = me.createScroller();
        me.bodyTable.on('tap', 'handleEventTap', me, {
            delegate: '.' + me.$eventCls
        });
        me.allDayContent.on('tap', 'handleEventTap', me, {
            delegate: '.' + me.$eventCls
        });
        me.recalculate();
        me.refreshHeaders();
    },
    getDisplayRange: function() {
        var me = this,
            range;
        if (me.isConfiguring) {
            me.recalculate();
        }
        range = me.dateInfo.active;
        return new Ext.calendar.date.Range(me.utcToLocal(range.start), me.utcToLocal(range.end));
    },
    getVisibleRange: function() {
        var D = Ext.Date,
            range;
        if (this.isConfiguring) {
            this.recalculate();
        }
        range = this.dateInfo.active;
        return new Ext.calendar.date.Range(D.clone(range.start), D.clone(range.end));
    },
    /**
     * Sets the {@link #startTime} and {@link #endTime} simultaneously.
     * @param {Number} start The start hour between 0 and 23.
     * @param {Number} end The end hour between 1 and 24.
     */
    setTimeRange: function(start, end) {
        var me = this;
        me.isConfiguring = true;
        me.setStartTime(start);
        me.setEndTime(end);
        this.isConfiguring = false;
        me.suspendEventRefresh();
        me.recalculate();
        me.resumeEventRefresh();
        me.refresh();
    },
    // Appliers/Updaters
    updateAllowSelection: function(allowSelection) {
        var me = this;
        me.allDaySelectionListeners = me.selectionListeners = Ext.destroy(me.selectionListeners, me.allDaySelectionListeners);
        if (allowSelection) {
            me.bodySelectionListeners = me.bodyTable.on({
                destroyable: true,
                scope: me,
                touchstart: 'onBodyTouchStart',
                touchmove: 'onBodyTouchMove',
                touchend: 'onBodyTouchEnd'
            });
            me.allDaySelectionListeners = me.headerWrap.on({
                destroyable: true,
                scope: me,
                touchstart: 'onAllDayTouchStart',
                touchmove: 'onAllDayTouchMove',
                touchend: 'onAllDayTouchEnd'
            });
        }
    },
    updateDisplayOverlap: function(displayOverlap) {
        if (!this.isConfiguring) {
            this.refreshEvents();
        }
    },
    applyDraggable: function(draggable) {
        if (draggable) {
            draggable = new Ext.calendar.dd.DaysBodySource();
        }
        return draggable;
    },
    updateDraggable: function(draggable, oldDraggable) {
        var me = this;
        if (oldDraggable) {
            oldDraggable.destroy();
            me.allDayDrag = Ext.destroy(me.allDayDrag);
        }
        if (draggable) {
            draggable.setView(me);
            me.allDayDrag = new Ext.calendar.dd.DaysAllDaySource();
            me.allDayDrag.setView(me);
        }
    },
    applyDroppable: function(droppable) {
        if (droppable && !droppable.isInstance) {
            droppable = new Ext.calendar.dd.DaysBodyTarget(droppable);
        }
        return droppable;
    },
    updateDroppable: function(droppable, oldDroppable) {
        var me = this;
        if (oldDroppable) {
            oldDroppable.destroy();
            me.allDayDrop = Ext.destroy(me.allDayDrop);
        }
        if (droppable) {
            droppable.setView(me);
            me.allDayDrop = new Ext.calendar.dd.DaysAllDayTarget();
            me.allDayDrop.setView(me);
        }
    },
    updateEndTime: function() {
        this.calculateSlots();
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    updateResizeEvents: function(resizeEvents) {
        var me = this;
        me.dragListeners = Ext.destroy(me.dragListeners);
        if (resizeEvents) {
            me.dragListeners = me.bodyTable.on({
                scope: me,
                dragstart: 'onResizerDragStart',
                drag: 'onResizerDrag',
                dragend: 'onResizerDragEnd',
                destroyable: true,
                delegate: '.' + me.$resizerCls,
                // Give priority so drag can be vetoed
                priority: 1001
            });
        }
        if (!(me.isConfiguring || me.destroying)) {
            me.refreshEvents();
        }
    },
    updateShowNowMarker: function(showNowMarker) {
        var me = this,
            markerEl = me.markerEl;
        clearInterval(me.showNowInterval);
        me.showNowInterval = null;
        me.markerEl = null;
        if (markerEl) {
            Ext.fly(markerEl).remove();
        }
        if (showNowMarker) {
            if (!me.isConfiguring) {
                me.checkNowMarker();
            }
            me.showNowInterval = Ext.interval(me.checkNowMarker, 300000, me);
        }
    },
    // 5 mins
    updateStartTime: function() {
        this.calculateSlots();
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    updateTimeFormat: function() {
        if (!this.isConfiguring) {
            this.updateTimeLabels();
        }
    },
    updateTimeRenderer: function() {
        if (!this.isConfiguring) {
            this.updateTimeLabels();
        }
    },
    updateTimezoneOffset: function() {
        if (!this.isConfiguring) {
            this.recalculate();
        }
    },
    updateValue: function(value, oldValue) {
        var me = this;
        if (!me.isConfiguring) {
            me.recalculate();
            me.refreshHeaders();
            me.checkNowMarker();
            me.refreshEvents();
        }
        me.callParent([
            value,
            oldValue
        ]);
    },
    updateVisibleDays: function() {
        var me = this;
        if (!me.isConfiguring) {
            me.suspendEventRefresh();
            me.recalculate();
            me.resumeEventRefresh();
            me.refresh();
        }
    },
    // Protected overrides
    getElementConfig: function() {
        var me = this,
            result = me.callParent(),
            table = [
                {
                    tag: 'table',
                    cls: me.$tableCls + ' ' + me.$bodyTableCls,
                    reference: 'bodyTable',
                    children: [
                        {
                            tag: 'tbody',
                            children: [
                                {
                                    tag: 'tr',
                                    reference: 'timeRow',
                                    children: [
                                        {
                                            tag: 'td',
                                            reference: 'timeContainer',
                                            cls: me.$timeContainerCls
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
        // The ugliness in the markup here could be dropped for flexbox once
        // all supported browsers can take advantage of it. The purpose here is that
        // the body should stretch to the full height - the all day height.
        result.children = [
            {
                cls: Ext.baseCSSPrefix + 'calendar-days-table-wrap',
                reference: 'tableWrap',
                children: [
                    {
                        cls: Ext.baseCSSPrefix + 'calendar-days-header-wrap',
                        reference: 'headerWrap',
                        children: [
                            {
                                cls: Ext.baseCSSPrefix + 'calendar-days-allday-background-wrap',
                                reference: 'allDayBackgroundWrap',
                                children: [
                                    {
                                        tag: 'table',
                                        cls: me.$tableCls + ' ' + Ext.baseCSSPrefix + 'calendar-days-allday-background-table',
                                        children: [
                                            {
                                                tag: 'tbody',
                                                children: [
                                                    {
                                                        tag: 'tr',
                                                        reference: 'allDayBackgroundRow',
                                                        children: [
                                                            {
                                                                tag: 'td',
                                                                cls: me.$headerGutterCls
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: 'table',
                                cls: me.$tableCls + ' ' + Ext.baseCSSPrefix + 'calendar-days-allday-events',
                                children: [
                                    {
                                        tag: 'tbody',
                                        reference: 'allDayContent',
                                        children: [
                                            {
                                                tag: 'tr',
                                                reference: 'allDayEmptyRow'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cls: Ext.baseCSSPrefix + 'calendar-days-body-row',
                        children: [
                            {
                                cls: Ext.baseCSSPrefix + 'calendar-days-body-cell',
                                reference: me.cellOverflowScrollBug ? null : 'bodyWrap',
                                children: me.cellOverflowScrollBug ? [
                                    {
                                        // This extra wrapping element is here to appease firefox
                                        // due to the strange behaviour with table-cell and overflow
                                        cls: Ext.baseCSSPrefix + 'calendar-days-body-wrap',
                                        reference: 'bodyWrap',
                                        children: table
                                    }
                                ] : table
                            }
                        ]
                    }
                ]
            }
        ];
        return result;
    },
    doDestroy: function() {
        var me = this;
        me.scrollable = Ext.destroy(me.scrollable);
        me.setAllowSelection(false);
        me.setShowNowMarker(false);
        me.setResizeEvents(false);
        me.callParent();
    },
    privates: {
        $allDayBackgroundCls: Ext.baseCSSPrefix + 'calendar-days-allday-background-cell',
        $allDayEmptyRowCls: Ext.baseCSSPrefix + 'calendar-days-allday-empty-cell',
        $bodyCls: Ext.baseCSSPrefix + 'calendar-days-body',
        $bodyTableCls: Ext.baseCSSPrefix + 'calendar-days-body-table',
        $dayColumnCls: Ext.baseCSSPrefix + 'calendar-days-day-column',
        $dayEventContainerCls: Ext.baseCSSPrefix + 'calendar-days-day-event-container',
        $headerGutterCls: Ext.baseCSSPrefix + 'calendar-days-header-gutter',
        $markerAltCls: Ext.baseCSSPrefix + 'calendar-days-marker-alt',
        $markerCls: Ext.baseCSSPrefix + 'calendar-days-marker',
        $nowMarkerCls: Ext.baseCSSPrefix + 'calendar-days-now-marker',
        $resizerCls: Ext.baseCSSPrefix + 'calendar-event-resizer',
        $resizingCls: Ext.baseCSSPrefix + 'calendar-event-resizing',
        $selectionCls: Ext.baseCSSPrefix + 'calendar-days-selection',
        $tableCls: Ext.baseCSSPrefix + 'calendar-days-table',
        $timeCls: Ext.baseCSSPrefix + 'calendar-days-time',
        $timeContainerCls: Ext.baseCSSPrefix + 'calendar-days-time-ct',
        baseDate: new Date(2008, 0, 1),
        MS_TO_MINUTES: 60000,
        minimumEventMinutes: 30,
        slotTicks: 5,
        slotsPerHour: null,
        backPosName: 'left',
        forwardPosName: 'right',
        headerScrollOffsetName: 'padding-right',
        /**
         * Calculate the total number of half hour slots available given
         * the current time range.
         *
         * @private
         */
        calculateSlots: function() {
            this.maxSlots = (this.getEndTime() - this.getStartTime()) * 2;
        },
        /**
         * Check for a position update of the now marker. This
         * is contingent on the config to show the marker being enabled.
         * 
         * @private
         */
        checkNowMarker: function() {
            if (this.getShowNowMarker()) {
                this.doCheckNowMarker();
            }
        },
        /**
         * Clear a row element and populate it with child nodes.
         * @param {Ext.dom.Element} row The row
         * @param {Object[]} nodes The configuration for the new nodes to add.
         * @param {Boolean} [clearAll=false] `true` to clear all nodes. `false` to leave the last node (gutter).
         *
         * @private
         */
        clearAndPopulate: function(row, nodes, clearAll) {
            var children = row.dom.childNodes,
                len = nodes.length,
                limit = clearAll ? 0 : 1,
                i;
            while (children.length > limit) {
                row.removeChild(children[limit]);
            }
            // Don't use .append([]) because it uses a document fragment
            // internally which tries to correct the td to divs.
            for (i = 0; i < len; ++i) {
                row.appendChild(nodes[i], true);
            }
        },
        clearEvents: function() {
            this.callParent();
            var body = this.allDayContent.dom,
                childNodes = body.childNodes;
            // Want to leave the last empty row
            while (childNodes.length > 1) {
                body.removeChild(childNodes[0]);
            }
        },
        /**
         * Clear the selected range in the allday portion.
         * 
         * @private
         */
        clearSelected: function() {
            this.selectRange(-1, -1);
        },
        /**
         * Construct all day events.
         * @param {Ext.calendar.model.EventBase[]} events The events.
         *
         * @private
         */
        constructAllDayEvents: function(events) {
            var me = this,
                D = Ext.Date,
                len = events.length,
                visibleDays = me.getVisibleDays(),
                before = me.allDayEmptyRow.dom,
                content = me.allDayContent.dom,
                week, event, i, rows, row, j, item, widget, rowLen, rowEl, cell;
            week = new Ext.calendar.view.WeeksRenderer({
                view: me,
                start: D.clone(this.dateInfo.full.start),
                days: visibleDays,
                index: 0,
                maxEvents: null
            });
            for (i = 0; i < len; ++i) {
                event = events[i];
                if (!me.isEventHidden(event) && event.isSpan()) {
                    week.addIf(event);
                }
            }
            if (before.firstChild.className === me.$headerGutterCls) {
                before.removeChild(before.firstChild);
            }
            if (week.hasEvents()) {
                week.calculate();
                rows = week.rows;
                for (i = 0 , len = rows.length; i < len; ++i) {
                    row = week.compress(i);
                    rowEl = document.createElement('tr');
                    for (j = 0 , rowLen = row.length; j < rowLen; ++j) {
                        item = row[j];
                        cell = document.createElement('td');
                        cell.colSpan = item.len;
                        if (!item.isEmpty) {
                            widget = me.createEvent(item.event, {}, false);
                            widget.addCls(me.$staticEventCls);
                            cell.appendChild(widget.element.dom);
                        }
                        rowEl.appendChild(cell);
                    }
                    content.insertBefore(rowEl, before);
                }
            }
            Ext.fly(content.firstChild).insertFirst({
                tag: 'td',
                cls: me.$headerGutterCls,
                rowSpan: content.childNodes.length
            });
        },
        /**
         * Construct all events.
         * 
         * @private
         */
        constructEvents: function() {
            var me = this,
                D = Ext.Date,
                events = me.getEventSource().getRange(),
                len = events.length,
                visibleDays = me.getVisibleDays(),
                start = D.clone(me.dateInfo.visible.start),
                end = start,
                hours = me.getEndTime() - me.getStartTime(),
                i, j, day, frag, event;
            me.constructAllDayEvents(events);
            for (i = 0; i < visibleDays; ++i) {
                end = D.add(start, D.HOUR, hours, true);
                frag = document.createDocumentFragment();
                day = new Ext.calendar.view.DaysRenderer({
                    view: me,
                    start: start,
                    end: end
                });
                for (j = 0; j < len; ++j) {
                    event = events[j];
                    if (!me.isEventHidden(event)) {
                        day.addIf(event);
                    }
                }
                if (day.hasEvents()) {
                    day.calculate();
                    me.processDay(day, frag);
                }
                me.getEventColumn(i).appendChild(frag);
                start = D.add(start, D.DAY, 1, true);
            }
        },
        createEvent: function(event, cfg, dummy) {
            cfg = cfg || {};
            var allDay = event ? event.getAllDay() : false;
            cfg.mode = allDay ? 'weekspan' : 'day';
            if (!allDay) {
                cfg.resize = this.getResizeEvents();
            }
            return this.callParent([
                event,
                cfg,
                dummy
            ]);
        },
        /**
         * Create the scroller.
         * @return {Ext.scroll.Scroller} The scroller.
         *
         * @private
         */
        createScroller: function() {
            return new Ext.scroll.Scroller({
                element: this.bodyWrap,
                x: false,
                y: true
            });
        },
        /**
         * Checks the position of the now marker, hides/shows it in
         * the correct place as required. Does not check the existence 
         * of the config flag, assumes it's true at this point.
         *
         * @private
         */
        doCheckNowMarker: function() {
            var me = this,
                D = Ext.Date,
                markerEl = me.markerEl,
                now = me.roundDate(Ext.calendar.date.Util.getLocalNow()),
                active = me.dateInfo.visible,
                current = me.utcToLocal(active.start),
                end = me.utcToLocal(active.end),
                visibleDays = me.getVisibleDays(),
                y = now.getFullYear(),
                m = now.getMonth(),
                d = now.getDate(),
                h = now.getHours(),
                min = now.getMinutes(),
                startTime = me.getStartTime(),
                endTime = me.getEndTime(),
                offset, pos, i;
            if (markerEl) {
                Ext.fly(markerEl).remove();
            }
            me.markerEl = null;
            if (!me.element.isVisible(true)) {
                return;
            }
            if (current <= now && now < end) {
                for (i = 0; i < visibleDays; ++i) {
                    if (current.getFullYear() === y && current.getMonth() === m && current.getDate() === d) {
                        // Same day, check time ranges
                        if (startTime <= h && (h < endTime || h === endTime && min === 0)) {
                            current.setHours(startTime);
                            offset = D.diff(current, now, D.MINUTE);
                            pos = (offset / me.slotTicks) * me.getSlotStyle().minSlotHeight;
                        }
                        break;
                    }
                    current = D.add(current, D.DAY, 1, true);
                }
            }
            if (pos !== undefined) {
                me.markerEl = Ext.fly(me.getColumn(i)).createChild({
                    cls: me.$nowMarkerCls,
                    style: {
                        top: pos + 'px'
                    }
                }, null, true);
            }
        },
        /**
         * Do range recalculation.
         * @param {Date} [start] The start to recalculate from. Defaults to the current value.
         * @return {Object}
         * @return {Ext.calendar.date.Range} return.full The full date range (with times cleared).
         * @return {Ext.calendar.date.Range} return.visible The visible date range (with times 
         * based on the {@link #cfg-startTime} and {@link #cfg-endTime}
         * @return {Date} return.visible.start The start date.
         * @return {Date} return.visible.end The end date.
         *
         * @private
         */
        doRecalculate: function(start) {
            var me = this,
                D = Ext.Date,
                R = Ext.calendar.date.Range,
                end, activeEnd;
            if (!start) {
                start = D.clone(me.getValue());
            }
            start = me.toUtcOffset(D.clearTime(start, true));
            end = D.add(start, D.DAY, me.getVisibleDays(), true);
            activeEnd = D.subtract(end, D.DAY, 1, true);
            return {
                full: new R(start, end),
                active: new R(start, activeEnd),
                visible: new R(D.add(start, D.HOUR, me.getStartTime(), true), // Even if the endTime is 24, it will automatically roll over to the next day
                D.subtract(end, D.HOUR, 24 - me.getEndTime(), true))
            };
        },
        doRefresh: function() {
            var me = this,
                timeContainer = me.timeContainer,
                allDayBackgroundRow = me.allDayBackgroundRow,
                nodes;
            if (!me.dateInfo) {
                me.suspendEventRefresh();
                me.recalculate();
                me.resumeEventRefresh();
            }
            timeContainer.dom.innerHTML = '';
            timeContainer.appendChild(me.generateTimeElements());
            me.clearAndPopulate(me.allDayEmptyRow, me.generateAllDayCells(me.$allDayEmptyRowCls, '&#160;'), true);
            me.clearAndPopulate(allDayBackgroundRow, me.generateAllDayCells(me.$allDayBackgroundCls));
            me.clearAndPopulate(me.timeRow, me.generateColumns());
            nodes = Ext.Array.toArray(me.allDayBackgroundRow.dom.childNodes);
            me.backgroundCells = Ext.Array.slice(nodes, 1);
            me.checkNowMarker();
            me.refreshHeaders();
            me.syncHeaderScroll();
            me.refreshEvents();
        },
        doRefreshEvents: function() {
            var source = this.getEventSource();
            this.clearEvents();
            if (source && source.getCount()) {
                this.constructEvents();
            }
        },
        /**
         * Generate cells for the all day portion of the view.
         * @param {String} [cls] The class to add to the cells.
         * @param {String} [html] The markup to add to the cell.
         * @return {Object[]} The DOM configs for the cells.
         *
         * @private
         */
        generateAllDayCells: function(cls, html) {
            var ret = [],
                days = this.getVisibleDays(),
                i;
            for (i = 0; i < days; ++i) {
                ret.push({
                    tag: 'td',
                    cls: cls,
                    html: html
                });
            }
            return ret;
        },
        /**
         * Generate the column elements for the days.
         * @return {Object[]} The DOM configs for the column elements.
         *
         * @private
         */
        generateColumns: function() {
            var me = this,
                days = me.getVisibleDays(),
                start = me.getStartTime(),
                end = me.getEndTime(),
                ret = [],
                col, i, j, markers;
            for (i = 0; i < days; ++i) {
                markers = [];
                col = {
                    tag: 'td',
                    cls: me.$dayColumnCls,
                    'data-index': i,
                    children: [
                        {
                            cls: me.$dayEventContainerCls
                        },
                        {
                            cls: me.$markerContainerCls,
                            children: markers
                        }
                    ]
                };
                for (j = start; j < end; ++j) {
                    markers.push({
                        cls: me.$markerCls,
                        children: [
                            {
                                cls: me.$markerAltCls
                            }
                        ]
                    });
                }
                ret.push(col);
            }
            return ret;
        },
        /**
         * Generate the time elements for the gutter.
         * @return {Object[]} The DOM configs for the time elements.
         *
         * @private
         */
        generateTimeElements: function() {
            var times = this.generateTimeLabels(),
                len = times.length,
                ret = [],
                i;
            for (i = 0; i < times.length; ++i) {
                ret.push({
                    cls: this.$timeCls,
                    html: times[i]
                });
            }
            return ret;
        },
        /**
         * Generate the labels for the time gutter.
         * @return {String[]} The times.
         *
         * @private
         */
        generateTimeLabels: function() {
            var me = this,
                D = Ext.Date,
                current = D.clone(me.baseDate),
                start = me.getStartTime(),
                end = me.getEndTime(),
                format = me.getTimeFormat(),
                ret = [],
                renderer = me.getTimeRenderer(),
                seenAM, seenPM, formatted, i, firstInGroup;
            for (i = start; i < end; ++i) {
                current.setHours(i);
                formatted = D.format(current, format);
                if (renderer) {
                    firstInGroup = false;
                    if (i < 12 && !seenAM) {
                        firstInGroup = seenAM = true;
                    } else if (i >= 12 && !seenPM) {
                        firstInGroup = seenPM = true;
                    }
                    formatted = renderer.call(this, i, formatted, firstInGroup);
                }
                ret.push(formatted);
            }
            return ret;
        },
        getBodyElement: function() {
            return this.bodyTable;
        },
        /**
         * Get a day column by index.
         * @param {Number} index The index of the column.
         * @return {HTMLElement} The column.
         *
         * @private
         */
        getColumn: function(index) {
            return this.getColumns()[index];
        },
        /**
         * Get all day columns.
         * @return {HTMLElement[]} The columns.
         *
         * @private
         */
        getColumns: function() {
            return this.bodyTable.query('.' + this.$dayColumnCls);
        },
        /**
         * Get the event container for a column by index.
         * @param {Number} index The index of the event container column.
         * @return {HTMLElement} The event container.
         *
         * @private
         */
        getEventColumn: function(index) {
            return Ext.fly(this.getColumn(index)).down('.' + this.$dayEventContainerCls);
        },
        /**
         * Get styles regarding events. Creates a fake event and measures pieces of the
         * componentry.
         * @return {Object} Size info.
         * @return {Object} return.margin The margins for the event.
         * @return {Number} return.resizerWidth The width of the resizer element.
         *
         * @private
         */
        getEventStyle: function() {
            var me = this,
                eventStyle = me.eventStyle,
                fakeEvent, el, margin, height;
            if (!eventStyle) {
                fakeEvent = me.createEvent(null, {
                    resize: true
                }, true);
                el = fakeEvent.element;
                el.dom.style.visibility = 'hidden';
                me.getEventColumn(0).appendChild(el.dom);
                margin = el.getMargin();
                margin.height = margin.top + margin.bottom;
                me.eventStyle = eventStyle = {
                    margin: margin,
                    resizerWidth: Ext.fly(el.down('.' + this.$resizerCls, true)).getWidth()
                };
                fakeEvent.destroy();
            }
            return eventStyle;
        },
        /**
         * Find an event widget via record.
         * @param {Ext.calendar.model.EventBase} event The event record.
         * @return {Ext.calendar.EventBase} The event widget. `null` if not found.
         *
         * @private
         */
        getEventWidget: function(event) {
            var map = this.eventMap,
                id = event.id,
                key, w;
            for (key in map) {
                w = map[key];
                if (w.getModel().id === event.id) {
                    return w;
                }
            }
            return null;
        },
        getMoveInterval: function() {
            return {
                unit: Ext.Date.DAY,
                amount: this.getVisibleDays()
            };
        },
        /**
         * Precalculates the heights of slots for sizing events.
         * Should be invalidated when the view height resizes.
         * @return {Object} The sizes.
         * @return {Number} return.hourHeight The height of 1 hour in px.
         * @return {Number} return.halfHeight The height of half an hour in px.
         * @return {Number} return.minSlotHeight The height of the smallest slot resolution
         * for displayng events.
         *
         * @private
         */
        getSlotStyle: function() {
            var me = this,
                slotStyle = me.slotStyle,
                h;
            if (!slotStyle) {
                h = Ext.fly(me.bodyTable.down('.' + me.$markerCls, true)).getHeight();
                me.slotStyle = slotStyle = {
                    hourHeight: h,
                    halfHeight: h / 2,
                    minSlotHeight: h / me.slotsPerHour
                };
            }
            return slotStyle;
        },
        /**
         * Handle taps on event widgets in the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        handleEventTap: function(e) {
            var event = this.getEvent(e);
            if (event) {
                this.onEventTap(event);
            }
        },
        handleResize: function() {
            var me = this;
            me.slotStyle = null;
            me.callParent();
            me.refreshEvents();
            me.checkNowMarker();
            me.syncHeaderScroll();
        },
        /**
         * Handle touchend on the all day portion of the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onAllDayTouchEnd: function(e) {
            var me = this,
                D = Ext.Date,
                creating = me.isAllDayCreating,
                pos, startPos, endPos, start, end, diff, event;
            if (creating) {
                startPos = creating.initialIndex;
                endPos = pos = Ext.calendar.util.Dom.getIndexPosition(creating.positions, e.pageX);
                start = creating.startDate;
                diff = Math.abs(endPos - startPos);
                if (startPos > endPos) {
                    end = start;
                    start = D.subtract(end, D.DAY, diff, true);
                } else {
                    end = D.add(start, D.DAY, diff, true);
                }
                // Start will be UTC here, which means end will also be.
                event = me.createModel({
                    startDate: D.localToUtc(start),
                    endDate: D.add(D.localToUtc(end), D.DAY, 1, true),
                    allDay: true
                });
                me.showAddForm(event, {
                    scope: me,
                    onSave: me.clearSelected,
                    onCancel: me.clearSelected
                });
                me.isAllDayCreating = null;
            }
        },
        /**
         * Handle touchmove on the all day portion of the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onAllDayTouchMove: function(e) {
            var me = this,
                creating = me.isAllDayCreating,
                pos, startPos, endPos;
            if (!creating) {
                return;
            }
            startPos = creating.initialIndex;
            endPos = pos = Ext.calendar.util.Dom.getIndexPosition(creating.positions, e.pageX);
            me.selectRange(startPos, endPos);
        },
        /**
         * Handle touchstart on the all day portion of the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onAllDayTouchStart: function(e) {
            var me = this,
                D = Ext.Date,
                cells, positions, index,
                start = this.utcToLocal(me.dateInfo.full.start);
            if (e.pointerType === 'touch' || e.getTarget('.' + me.$eventCls, me.headerWrap)) {
                return;
            }
            positions = Ext.calendar.util.Dom.extractPositions(me.backgroundCells, 'getX');
            index = Ext.calendar.util.Dom.getIndexPosition(positions, e.pageX);
            me.isAllDayCreating = {
                positions: positions,
                initialIndex: index,
                startDate: D.add(start, D.DAY, index, true)
            };
            me.selectRange(index, index);
        },
        /**
         * Handle touchend on the body day portion of the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onBodyTouchEnd: function(e) {
            var me = this,
                D = Ext.Date,
                creating = me.isBodyCreating,
                w, fn, event;
            if (creating) {
                w = creating.widget;
                if (w) {
                    start = w.getStartDate();
                    end = w.getEndDate();
                    fn = function() {
                        w.destroy();
                    };
                    event = me.createModel({
                        startDate: start,
                        endDate: end
                    });
                    me.showAddForm(event, {
                        onSave: fn,
                        onCancel: fn
                    });
                }
                me.isBodyCreating = null;
            }
        },
        /**
         * Handle touchmove on the body day portion of the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onBodyTouchMove: function(e) {
            var me = this,
                D = Ext.Date,
                creating = me.isBodyCreating,
                resizeMins = me.minimumEventMinutes,
                margin = me.getEventStyle().margin,
                el, w, top, slot, startSlot, topSlot, bottomSlot, start, end;
            if (!creating) {
                return;
            }
            w = creating.widget;
            if (!w) {
                w = me.createEvent(null, {}, true);
                el = w.element;
                w.setPalette(me.getDefaultPalette());
                w.addCls(me.$resizingCls);
                w.setWidth('100%');
                el.setZIndex(999);
                me.getEventColumn(creating.index).appendChild(el);
                creating.widget = w;
            }
            el = w.element;
            slot = me.slotFromPosition(e.getY());
            if (slot < 0 || slot > me.maxSlots) {
                return;
            }
            startSlot = creating.startSlot;
            if (startSlot === slot) {
                slot = startSlot + 1;
            }
            if (startSlot > slot) {
                topSlot = slot;
                bottomSlot = startSlot;
            } else {
                topSlot = startSlot;
                bottomSlot = slot;
            }
            el.setStyle({
                top: (margin.top + me.slotToPosition(topSlot)) + 'px',
                marginTop: 0,
                marginBottom: 0
            });
            w.setHeight((bottomSlot - topSlot) * me.getSlotStyle().halfHeight - margin.bottom);
            start = D.clone(creating.baseDate);
            start = D.add(start, D.MINUTE, topSlot * resizeMins, true);
            end = D.add(start, D.MINUTE, (bottomSlot - topSlot) * resizeMins, true);
            w.setStartDate(start);
            w.setEndDate(end);
        },
        /**
         * Handle touchstart on the body day portion of the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onBodyTouchStart: function(e) {
            var me = this,
                D = Ext.Date,
                col, index, d;
            if (e.pointerType === 'touch' || e.getTarget('.' + me.$eventCls, me.bodyTable)) {
                return;
            }
            col = e.getTarget('.' + me.$dayColumnCls);
            if (col) {
                index = parseInt(col.getAttribute('data-index'), 10);
                d = D.add(me.dateInfo.visible.start, D.DAY, index, true);
                me.isBodyCreating = {
                    col: col,
                    index: index,
                    baseDate: d,
                    startSlot: me.slotFromPosition(e.getY())
                };
            }
        },
        /**
         * Handle drag on an event resizer.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onResizerDrag: function(e) {
            if (!this.resizing) {
                return;
            }
            var me = this,
                D = Ext.Date,
                resizing = me.resizing,
                event = resizing.event,
                w = resizing.widget,
                maxSlots = me.maxSlots,
                halfHeight = me.getSlotStyle().halfHeight,
                slot = me.slotFromPosition(e.getY()),
                h = (slot * halfHeight) - resizing.eventTop,
                startSlot = resizing.startSlot,
                start = event.getStartDate(),
                resizeMins = me.minimumEventMinutes,
                end;
            e.stopEvent();
            if (slot < 0 || slot > me.maxSlots || slot <= startSlot) {
                return;
            }
            resizing.current = end = D.add(start, D.MINUTE, resizeMins * (slot - startSlot), true);
            w.setHeight(h);
            w.setEndDate(end);
        },
        /**
         * Handle dragend on an event resizer.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onResizerDragEnd: function() {
            if (!this.resizing) {
                return;
            }
            var me = this,
                R = Ext.calendar.date.Range,
                resizing = me.resizing,
                d = resizing.current,
                w = resizing.widget,
                originalHeight = resizing.height,
                event = resizing.event,
                fn = function(success) {
                    if (!w.destroyed) {
                        w.element.setZIndex(resizing.oldZIndex);
                        w.removeCls(me.$resizingCls);
                    }
                    if (!success) {
                        w.setHeight(originalHeight);
                        w.setEndDate(event.getEndDate());
                    }
                };
            me.resizing = null;
            if (d) {
                me.handleChange('resize', event, new R(event.getStartDate(), d), fn);
            } else {
                fn();
            }
        },
        /**
         * Handle dragstart on an event resizer.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        onResizerDragStart: function(e) {
            var me = this,
                event = me.getEvent(e),
                w, top;
            e.stopEvent();
            if (me.handleChangeStart('resize', event) !== false) {
                w = me.getEventWidget(event);
                el = w.element;
                top = el.getTop(true);
                me.resizing = {
                    height: w.getHeight(),
                    event: event,
                    eventTop: top,
                    startSlot: me.slotFromPosition(top, true),
                    widget: w,
                    oldZIndex: el.getZIndex()
                };
                w.addCls(me.$resizingCls);
                el.setZIndex(999);
            }
        },
        onSourceAttach: function() {
            this.recalculate();
        },
        /**
         * Position events for a day.
         * @param {Ext.calendar.view.DaysRenderer} day The day.
         * @param {DocumentFragment} frag A fragment to append events to.
         *
         * @private
         */
        processDay: function(day, frag) {
            var me = this,
                events = day.events,
                len = events.length,
                slotHeight = me.getSlotStyle().minSlotHeight,
                eventStyle = me.getEventStyle(),
                margin = eventStyle.margin,
                resizerOffset = 0,
                allowOverlap = me.getDisplayOverlap(),
                i, item, w, back, fwd, forwardPos, backwardPos, styles;
            if (me.getResizeEvents()) {
                resizerOffset = eventStyle.resizerWidth + 5;
            }
            for (i = 0; i < len; ++i) {
                item = events[i];
                forwardPos = item.forwardPos;
                backwardPos = item.backwardPos;
                if (allowOverlap) {
                    forwardPos = Math.min(1, backwardPos + (forwardPos - backwardPos) * 2);
                }
                back = backwardPos;
                fwd = 1 - forwardPos;
                w = me.createEvent(item.event);
                styles = {
                    marginTop: 0,
                    marginBottom: 0,
                    top: (item.start * slotHeight + margin.top) + 'px',
                    zIndex: item.colIdx + 1
                };
                styles[me.backPosName] = back * 100 + '%';
                styles[me.forwardPosName] = fwd * 100 + '%';
                if (allowOverlap && item.edgeWeight > 0) {
                    styles.marginRight = resizerOffset + 'px';
                }
                w.setStyle(styles);
                w.setHeight((item.len * slotHeight - margin.bottom));
                frag.appendChild(w.element.dom);
            }
        },
        /**
         * Recalculate the view bounds and communicate them to the
         * event source.
         *
         * @private
         */
        recalculate: function() {
            var dateInfo = this.doRecalculate();
            this.dateInfo = dateInfo;
            this.setSourceRange(dateInfo.full);
        },
        /**
         * Refresh the {@link #header} if it is attached to the view.
         *
         * @private
         */
        refreshHeaders: function() {
            var me = this,
                header = me.getHeader(),
                dateInfo = me.dateInfo;
            if (header) {
                header.setVisibleDays(me.getVisibleDays());
                if (dateInfo) {
                    header.setValue(me.utcToLocal(dateInfo.full.start));
                }
            }
        },
        /**
         * Round a date to the nearest minimum slot.
         * @param {Date} d The date.
         * @return {Date} The rounded date.
         *
         * @private
         */
        roundDate: function(d) {
            return new Date(Ext.Number.roundToNearest(d.getTime(), this.slotTicks));
        },
        /**
         * Select a range in the all day view.
         * @param {Number} start The start index.
         * @param {Number} end The end index.
         *
         * @private
         */
        selectRange: function(start, end) {
            var cells = this.backgroundCells,
                len = cells.length,
                i;
            if (start > end) {
                i = start;
                start = end;
                end = i;
            }
            for (i = 0 , len = cells.length; i < len; ++i) {
                Ext.fly(cells[i]).toggleCls(this.$selectionCls, i >= start && i <= end);
            }
        },
        /**
         * Get the nearest slot based on the page position.
         * @param {Number} pageY The y position on the page.
         * @param {Boolean} [local=false] `true` to calculate as a local y instead of page y.
         * @return {Number} The slot.
         *
         * @private
         */
        slotFromPosition: function(pageY, local) {
            var y = pageY - (local ? 0 : this.bodyTable.getY());
            return Math.round(y / this.getSlotStyle().halfHeight);
        },
        /**
         * Gets the local y position given a slot.
         * @param {Number} slot The slot.
         * @return {Number} The local y position.
         *
         * @private
         */
        slotToPosition: function(slot) {
            return slot * this.getSlotStyle().halfHeight;
        },
        /**
         * Ensure headers take into account a scrollbar on the
         * view if necessary.
         * 
         * @private
         */
        syncHeaderScroll: function() {
            var me = this,
                scrollable = me.scrollable,
                name = me.headerScrollOffsetName,
                w;
            if (scrollable) {
                w = scrollable.getScrollbarSize().width + 'px';
                me.headerWrap.setStyle(name, w);
                me.allDayBackgroundWrap.setStyle(name, w);
            }
        },
        updateTimeLabels: function() {
            var times = this.generateTimeLabels(),
                nodes = this.timeContainer.dom.childNodes,
                len = times.length,
                i;
            //Should never get here
            if (times.length !== nodes.length) {
                Ext.raise('Number of generated times did not match');
            }
            for (i = 0 , len = times.length; i < len; ++i) {
                nodes[i].innerHTML = times[i];
            }
        }
    }
});

Ext.define('Ext.overrides.calendar.view.Days', {
    override: 'Ext.calendar.view.Days',
    requires: [
        'Ext.calendar.form.Edit',
        'Ext.calendar.form.Add'
    ],
    privates: {
        doRefresh: function() {
            this.setBodyWrapSize();
            this.callParent();
            this.updateLayout();
        },
        doRefreshEvents: function() {
            var me = this,
                bodyWrap = me.bodyWrap;
            me.callParent();
            me.setBodyWrapSize();
            me.syncHeaderScroll();
            // private
            me.fireEvent('eventrefresh', me, {});
        },
        setBodyWrapSize: function() {
            var tableWrap = this.tableWrap,
                bodyWrap = this.bodyWrap,
                tableHeight;
            if (Ext.isIE10m) {
                tableHeight = Ext.fly(tableWrap.dom.parentNode).getHeight();
                tableWrap.setHeight(tableHeight);
                bodyWrap.setHeight(tableHeight - this.headerWrap.getHeight());
            }
        }
    }
});

/**
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a series of days. Composes a 
 * {@link Ext.calendar.view.Days Days View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Days panel displays events for multiple days with the time of day along the y axis.
 * The panel will display the current date as the first day displayed unless configured
 * with a different date {@link #cfg-value}.  The number of days displayed can be set
 * using the {@link #cfg-visibleDays} config option.  By default, the calendar hours are
 * displayed as a 24 hour clock and are constrained to 8 (8:00am) and 20 (8:00pm).  The
 * beginning and end hour can be set using the {@link #cfg-startHour} and
 * {@link #cfg-endHour} configs.  The time displayed on the timeline may be customized
 * using either the {@link #cfg-timeFormat} or {@link #cfg-timeRenderer} config options.
 *
 * Below are some of the distinctions to the Days panel (and generally its subclasses).
 *
 * ### Current Local Time
 *
 * The current local time (when the current date is displayed) will be shown on the panel
 * as a thin marker on the day's timeline.  The current time marker can be set using the
 * {@link #cfg-showNowMarker} option.
 *
 * ### Calendar Events
 *
 * Events show on the timeline with their start and end times correlating to the time
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.  The exception being all day or multi-day
 * events.  All day / multi-day events will show up at the top of the panel in a dedicated
 * space preceding the panel's start time.
 *
 * ### Adding All Day Events
 *
 * In addition to being able to drag / swipe across a day's timeline to show the event
 * add form, an all day type event can be quickly added by tapping / clicking on the
 * dedicated all day row displayed above the start hour.  This is the same dedicated
 * space used to display existing all day events.
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward the number of days set on the
 * {@link #cfg-visibleDays} config.
 *
 * ### Alternative Classes
 *
 * To display a single day consider using the {@link Ext.calendar.panel.Day} panel or
 * {@link Ext.calendar.panel.Week} to view a week at a time.
 */
Ext.define('Ext.calendar.panel.Days', {
    extend: 'Ext.calendar.panel.Base',
    xtype: 'calendar-days',
    requires: [
        'Ext.calendar.header.Days',
        'Ext.calendar.view.Days',
        'Ext.scroll.Scroller'
    ],
    config: {
        /**
         * @inheritdoc
         */
        dayHeader: {
            xtype: 'calendar-daysheader'
        },
        /**
         * @inheritdoc
         */
        eventRelayers: {
            view: {
                /**
                 * @event beforeeventdragstart
                 * @inheritdoc Ext.calendar.view.Days#beforeeventdragstart
                 */
                beforeeventdragstart: true,
                /**
                 * @event validateeventdrop
                 * @inheritdoc Ext.calendar.view.Days#validateeventdrop
                 */
                validateeventdrop: true,
                /**
                 * @event eventdrop
                 * @inheritdoc Ext.calendar.view.Days#eventdrop
                 */
                eventdrop: true,
                /**
                 * @event beforeeventresizestart
                 * @inheritdoc Ext.calendar.view.Days#beforeeventresizestart
                 */
                beforeeventresizestart: true,
                /**
                 * @event validateeventresize
                 * @inheritdoc Ext.calendar.view.Days#validateeventresize
                 */
                validateeventresize: true,
                /**
                 * @event eventresize
                 * @inheritdoc Ext.calendar.view.Days#eventresize
                 */
                eventresize: true
            }
        },
        /**
         * @inheritdoc
         */
        view: {
            xtype: 'calendar-daysview'
        }
    },
    /**
     * @inheritdoc
     */
    configExtractor: {
        dayHeader: {
            /**
             * @inheritdoc Ext.calendar.header.Days#format
             */
            dayHeaderFormat: 'format'
        },
        view: {
            /**
             * @inheritdoc Ext.calendar.view.Days#allowSelection
             */
            allowSelection: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#displayOverlap
             */
            displayOverlap: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#draggable
             */
            draggable: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#droppable
             */
            droppable: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#endTime
             */
            endTime: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#resizeEvents
             */
            resizeEvents: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#showNowMarker
             */
            showNowMarker: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#startTime
             */
            startTime: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#timeFormat
             */
            timeFormat: true,
            /**
             * @inheritdoc Ext.calendar.view.Days#visibleDays
             */
            visibleDays: true
        }
    },
    /**
     * @inheritdoc Ext.calendar.view.Days#setTimeRange
     */
    setTimeRange: function(start, end) {
        this.getView().setTimeRange(start, end);
    },
    privates: {
        /**
         * @property {Boolean} syncHeaderSize
         * Indicates that we need to sync the header size
         * with the body.
         *
         * @private
         */
        syncHeaderSize: true
    }
});

Ext.define('Ext.overrides.calendar.panel.Days', {
    override: 'Ext.calendar.panel.Days',
    updateView: function(view, oldView) {
        this.callParent([
            view,
            oldView
        ]);
        view.on('eventrefresh', 'onEventRefresh', this);
    },
    privates: {
        onEventRefresh: function() {
            this.syncHeaders();
        }
    }
});

/**
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Day view operates the same as its parent {@link Ext.calendar.view.Days Days} view
 * with one notable difference: the {@link #cfg-visibleDays} for the Day view is `1`
 * resulting in only a single day displayed at a time.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the date displayed consider using
 * {@link Ext.calendar.panel.Day} instead.  To display more than a single day consider
 * using the {@link Ext.calendar.view.Days} or {@link Ext.calendar.view.Week} views.
 */
Ext.define('Ext.calendar.view.Day', {
    extend: 'Ext.calendar.view.Days',
    xtype: 'calendar-dayview',
    config: {
        compactOptions: {
            displayOverlap: true
        },
        visibleDays: 1
    },
    privates: {
        getMoveInterval: function() {
            return {
                unit: Ext.Date.DAY,
                amount: 1
            };
        }
    }
});

/**
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a single day. Composes a 
 * {@link Ext.calendar.view.Day Day View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Day panel operates the same as its parent {@link Ext.calendar.panel.Days Days}
 * panel with one notable difference: the {@link #cfg-visibleDays} for the Day panel is
 * `1` resulting in only a single day displayed at a time.
 *
 * ### Alternative Classes
 *
 * To display more than a single day consider using the {@link Ext.calendar.panel.Days}
 * or {@link Ext.calendar.panel.Week} views.
 */
Ext.define('Ext.calendar.panel.Day', {
    extend: 'Ext.calendar.panel.Days',
    xtype: 'calendar-day',
    requires: [
        'Ext.calendar.view.Day'
    ],
    config: {
        /**
         * @inheritdoc
         */
        view: {
            xtype: 'calendar-dayview'
        }
    }
});
/**
     * @cfg visibleDays
     * @inheritdoc Ext.calendar.view.Day#visibleDays
     */

/**
 * This class is used to generate the rendering parameters for an event
 * in a {@link Ext.calendar.view.Weeks}. The purpose of this class is
 * to provide the rendering logic insulated from the DOM.
 * 
 * @private
 */
Ext.define('Ext.calendar.view.WeeksRenderer', {
    /**
     * @cfg {Number} days
     * The number of days.
     */
    days: null,
    /**
     * @cfg {Number} index
     * The index of this week.
     */
    index: null,
    /**
     * @cfg {Number} maxEvents
     * The maximum number of events per day before overflow.
     * `null` to disable this.
     */
    maxEvents: null,
    /**
     * @cfg {Boolean} overflow
     * `true` to calculate sizes as if overflow could occur.
     */
    overflow: true,
    /**
     * @cfg {Date} start
     * The start of the week.
     */
    start: null,
    /**
     * {@link Ext.calendar.view.Base} view
     * The view.
     */
    view: null,
    constructor: function(config) {
        var me = this,
            D = Ext.Date,
            start, end;
        Ext.apply(me, config);
        start = me.start;
        me.end = end = D.add(start, D.DAY, me.days, true);
        me.utcStart = this.view.utcTimezoneOffset(start);
        me.utcEnd = D.add(me.utcStart, D.DAY, me.days, true);
        me.hasMaxEvents = me.maxEvents !== null;
        me.rows = [];
        me.events = [];
        me.seen = {};
        me.overflows = [];
    },
    /**
     * Add an event if it occurs within the range for this week.
     * @param {Ext.calendar.model.EventBase} event The event.
     */
    addIf: function(event) {
        var me = this,
            start, end;
        if (event.getAllDay()) {
            // Treat all day events as UTC
            start = me.utcStart;
            end = me.utcEnd;
        } else {
            start = me.start;
            end = me.end;
        }
        if (event.occursInRange(start, end)) {
            me.events.push(event);
        }
    },
    /**
     * Indicates that all events are added and the positions can be calculated.
     */
    calculate: function() {
        var me = this,
            D = Ext.Date,
            view = me.view,
            seen = me.seen,
            events = me.events,
            len = events.length,
            days = me.days,
            rangeEnd = me.end,
            utcRangeEnd = me.utcEnd,
            start = D.clone(me.start),
            utcStart = D.clone(me.utcStart),
            maxEvents = me.maxEvents,
            hasMaxEvents = me.hasMaxEvents,
            overflows = me.overflows,
            overflowOffset = me.overflow ? 1 : 0,
            dayEventList = [],
            i, j, dayEvents, event, eLen, utcEnd, end, id, eventEnd, span, offsetStart, offsetEnd, offsetRangeEnd, allDay, item, offset, isSpan, dayLen, hasAnyOverflows, overflow, map, prev, dayOverflows;
        for (i = 0; i < days; ++i) {
            end = D.add(start, D.DAY, 1, true);
            utcEnd = D.add(utcStart, D.DAY, 1, true);
            dayEvents = [];
            for (j = 0; j < len; ++j) {
                event = events[j];
                id = event.id;
                allDay = event.getAllDay();
                if (allDay) {
                    offsetStart = utcStart;
                    offsetEnd = utcEnd;
                    offsetRangeEnd = utcRangeEnd;
                } else {
                    offsetStart = start;
                    offsetEnd = end;
                    offsetRangeEnd = rangeEnd;
                }
                if (event.occursInRange(offsetStart, offsetEnd)) {
                    isSpan = event.isSpan();
                    if (!seen[id]) {
                        span = 1;
                        // If the event only spans 1 day, don't bother calculating
                        if (isSpan) {
                            eventEnd = event.getEndDate();
                            if (eventEnd > offsetRangeEnd) {
                                // If the event finishes after our range, then just span it to the end
                                span = days - i;
                            } else {
                                // Otherwise, calculate the number of days used by this event
                                span = view.getDaysSpanned(offsetStart, eventEnd, allDay);
                            }
                        }
                        seen[id] = span;
                        dayEvents.push({
                            event: event,
                            id: id
                        });
                    } else if (isSpan) {
                        // Seen this span already, but it needs to go in the day events so
                        // overflows get generated correctly
                        dayEvents.push({
                            isPlaceholder: true,
                            event: event,
                            id: id
                        });
                    }
                }
            }
            eLen = dayEvents.length;
            // Now we have all of the events for this day, sort them based on "priority",
            // then add them to our internal structure
            dayEvents.sort(me.sortEvents);
            if (hasMaxEvents) {
                map = {};
                overflows[i] = overflow = [];
                overflow.$map = map;
                // Can't check previous days on the first day
                if (i > 0) {
                    prev = overflows[i - 1].$map;
                    // Loop through all the events for today. If the event
                    // is overflowed in the previous day, it must also be overflowed today
                    for (j = 0; j < eLen; ++j) {
                        item = dayEvents[j];
                        id = item.id;
                        if (prev[id]) {
                            overflow.push(item.event);
                            map[id] = true;
                            --j;
                            --eLen;
                            dayEvents.splice(j, 1);
                            hasAnyOverflows = true;
                        }
                    }
                }
                if (eLen > 0) {
                    if (eLen > maxEvents) {
                        // This is a naive attempt to calculate overflows, without taking into account
                        // other days in the row. We'll use this a the basis going forward if we need
                        // to do any extra calculations once we start considering other days.
                        // -1 here because maxEvents is the total we can show, without the "show more" item.
                        // Assuming that "show more" is roughly the same size as an event, which we'll
                        // also need to show, we have to lop off another event.
                        offset = Math.max(0, maxEvents - overflowOffset);
                        dayOverflows = Ext.Array.splice(dayEvents, offset);
                        for (j = 0 , dayLen = dayOverflows.length; j < dayLen; ++j) {
                            item = dayOverflows[j];
                            overflow.push(item.event);
                            map[item.id] = true;
                        }
                        hasAnyOverflows = true;
                    } else if (overflowOffset > 0 && overflow.length && eLen === maxEvents) {
                        item = dayEvents.pop();
                        overflow.push(item.event);
                        map[item.id] = true;
                    }
                }
            }
            dayEventList.push(dayEvents);
            start = end;
            utcStart = utcEnd;
        }
        if (hasAnyOverflows && maxEvents > 0) {
            me.calculateOverflows(dayEventList, overflows);
        }
        // Once we have overflows, place the events
        for (i = 0; i < days; ++i) {
            dayEvents = dayEventList[i];
            eLen = dayEvents.length;
            for (j = 0; j < eLen; ++j) {
                item = dayEvents[j];
                if (!item.isPlaceholder) {
                    event = item.event;
                    me.addToRow(event, i, seen[event.id]);
                }
            }
        }
    },
    /**
     * Compress existing rows into consumable pieces for the view.
     * @param {Number} rowIdx The row index to compress.
     * @return {Object[]} A compressed set of config objects for the row.
     */
    compress: function(rowIdx) {
        var row = this.rows[rowIdx],
            ret = [],
            days = this.days,
            count = 0,
            i = 0,
            inc, item;
        while (i < days) {
            inc = 1;
            item = row[i];
            if (item.event) {
                if (count > 0) {
                    ret.push({
                        isEmpty: true,
                        len: count
                    });
                    count = 0;
                }
                ret.push(item);
                i += item.len;
            } else {
                ++count;
                ++i;
            }
        }
        if (count > 0) {
            ret.push({
                isEmpty: true,
                len: count
            });
        }
        return ret;
    },
    /**
     * Checks if this renderer has any events.
     * @return {Boolean} `true` if there are events.
     */
    hasEvents: function() {
        return this.events.length > 0;
    },
    privates: {
        /**
         * Add an event to an existing row. Creates a new row
         * if one cannout be found.
         * @param {Ext.calendar.model.EventBase} event The event.
         * @param {Number} dayIdx The start day for the event.
         * @param {Number} days The number of days to span
         *
         * @private
         */
        addToRow: function(event, dayIdx, days) {
            var me = this,
                rows = me.rows,
                len = rows.length,
                end = days + dayIdx,
                found, i, j, row, idx;
            for (i = 0; i < len; ++i) {
                row = rows[i];
                for (j = dayIdx; j < end; ++j) {
                    if (row[j]) {
                        // Something occupying the space
                        break;
                    }
                }
                // If we got to the end of the loop above, we're ok to use this row
                if (j === end) {
                    found = row;
                    idx = i;
                    break;
                }
            }
            if (!found) {
                found = me.makeRow();
                rows.push(found);
                idx = rows.length - 1;
            }
            me.occupy(event, found, idx, dayIdx, end - 1);
        },
        /**
         * Setup any overflows triggered by overflows in other days.
         * @param {Object[]} dayEventList The list of events for all days.
         * @param  {Object[]} overflows The list overflows for all days.
         *
         * @private
         */
        calculateOverflows: function(dayEventList, overflows) {
            var days = this.days,
                maxEvents = this.maxEvents,
                i, dayEvents, len, item, id;
            // We are checking if we have events overflowing to the right
            // which may be truncated by overflow. Ignore the last day since it
            // will have no influence because there's nothing it can overflow into
            for (i = days - 2; i >= 0; --i) {
                dayEvents = dayEventList[i];
                len = dayEvents.length;
                // If we don't have any overflow, but we are on the boundary of being
                // overflowed, we need to check if we move into another cell that would
                // cause us to be hidden
                if (len > 0 && overflows[i].length === 0 && len === maxEvents) {
                    item = dayEvents[len - 1];
                    id = item.id;
                    // Only need to check one day forward, since an event can't "jump".
                    // If it's not in the day forward, then it can't be in any further day.
                    if (overflows[i + 1].$map[id]) {
                        // If it's overflowed, then we must overflow it
                        overflows[i].unshift(item.event);
                        overflows[i].$map[id] = true;
                        dayEvents.length = len - 1;
                    }
                }
            }
        },
        /**
         * Construct a new row.
         * @return {Object[]} The new row.
         *
         * @private
         */
        makeRow: function() {
            var row = [],
                days = this.days,
                i;
            for (i = 0; i < days; ++i) {
                row[i] = 0;
            }
            return row;
        },
        /**
         * Have an event occupy space in a row.
         * @param {Ext.calendar.model.EventBase} event The event.
         * @param {Object[]} row  The row.
         * @param {Number} rowIdx The local index of the row.
         * @param {Number} fromIdx The start index to occupy.
         * @param {Number} toIdx The end index to occupy.
         *
         * @private
         */
        occupy: function(event, row, rowIdx, fromIdx, toIdx) {
            var len = toIdx - fromIdx + 1,
                i;
            for (i = fromIdx; i <= toIdx; ++i) {
                row[i] = i === fromIdx ? {
                    event: event,
                    len: len,
                    start: fromIdx,
                    weekIdx: this.index,
                    localIdx: rowIdx
                } : true;
            }
        },
        /**
         * A sort comparator function for processing events.
         * @param {Object} event1 The first event.
         * @param {Object} event2 The second event,
         * @return {Number} A standard sort comparator.
         * @private
         */
        sortEvents: function(event1, event2) {
            event1 = event1.event;
            event2 = event2.event;
            return +event2.isSpan() - +event1.isSpan() || Ext.calendar.model.Event.sort(event1, event2);
        }
    }
});

/**
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Weeks view shows the events for one or more weeks as full days similar to a
 * conventional calendar.  For a week view including an hourly timeline see
 * {@link Ext.calendar.view.Week}.
 *
 * The weeks view shows the week containing the current date (or the date set on the
 * {@link #cfg-value} config) plus any additional weeks totaling the
 * {@link #cfg-visibleWeeks}.  The number of days shown per week is set using
 * {@link #cfg-visibleDays}.  Each week begins on the day set on the
 * {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
 *
 *     Ext.create({
 *         xtype: 'calendar-weeksview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         firstDayOfWeek: 1,  // starts the view on Monday
 *         visibleDays: 5,     // and displays it and the 4 days after
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * ### Calendar Events
 *
 * Events show on the view with their start and end days correlating to the day
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.
 *
 * ### Adding All Day Events
 *
 * Dragging / swiping across multiple days will show the event add form with multiple
 * days pre-populated in the form's start / end dates.  A single all day type event can
 * be added by tapping / clicking on a single day.
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward the number of
 * {@link #cfg-visibleWeeks}.
 *
 * i.e.  `view.moveNext();` called on a 7-day view with 2 visible weeks will advance the
 * view 2 weeks.  **Note** that a view configured with 5 `visibleDays` would not advance
 * 5 days, but rather will show the next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the days of the week consider using
 * {@link Ext.calendar.panel.Weeks} instead.  For a month view refer to
 * {@link Ext.calendar.view.Month}.
 */
Ext.define('Ext.calendar.view.Weeks', {
    extend: 'Ext.calendar.view.Base',
    xtype: 'calendar-weeksview',
    requires: [
        'Ext.calendar.view.WeeksRenderer'
    ],
    uses: [
        'Ext.calendar.dd.WeeksSource',
        'Ext.calendar.dd.WeeksTarget'
    ],
    isWeeksView: true,
    baseCls: Ext.baseCSSPrefix + 'calendar-weeks',
    config: {
        /**
         * @cfg {Boolean} addOnSelect
         * `true` to show the {@link #cfg-addForm} when a selection is made on the body.
         *
         * Use {@link #cfg-addOnSelect} to control view selection itself.
         */
        addOnSelect: true,
        /**
         * @cfg {Boolean} allowSelection
         * `true` to allow days to be selected via the UI.
         */
        allowSelection: true,
        /**
         * @inheritdoc
         */
        compactOptions: {
            overflowText: '+{0}',
            showOverflow: 'top'
        },
        //<locale>
        /**
         * @cfg {String} dayFormat
         * The format for displaying the day in the cell.
         * See {@link Ext.Date} for options.
         */
        dayFormat: 'j',
        //</locale>
        //<locale>
        /**
         * @cfg {Boolean} draggable
         * `true` to allows events to be dragged from this view.
         */
        draggable: true,
        /**
         * @cfg {Boolean} droppable
         * `true` to allows events to be dropped on this view.
         */
        droppable: true,
        /**
         * @cfg {Number} firstDayOfWeek
         * The day on which the calendar week begins. `0` (Sunday) through `6` (Saturday).
         * Defaults to {@link Ext.Date#firstDayOfWeek}
         */
        firstDayOfWeek: undefined,
        //<locale>
        /**
         * @cfg {String} overflowText
         * Text to show when events overflow on a particular day to allow the user to view
         * the rest. This string is evaluated as a formatted string where the argument is
         * the number of overflowing events. Depends on {@link #cfg-showOverflow}.
         */
        overflowText: '+{0} more',
        //</locale>
        /**
         * @cfg {String} showOverflow
         * Show an overflow label that will display an overlay when
         * there are too many events to render in the view. Valid
         * configurations are:
         * - `top`
         * - `bottom`
         *
         * Pass `null` or `''` to not show overflow.
         * The overflow text may be formatted using {@link #cfg-overflowText}.
         */
        showOverflow: 'bottom',
        /**
         * @cfg {Date} [value=new Date()]
         * The start of the date range to show. The visible range of the view will begin
         * at the {@link #firstDayOfWeek} immediately preceding this value or the value if
         * it is the {@link #firstDayOfWeek}. For example, using the following configuration:
         *
         *      {
         *          firstDayOfWeek: 0, // Sunday
         *          value: new Date(2010, 2, 3) // Wed, 3 March 2010
         *      }
         *
         * The visible range would begin on Sun 28th Feb.
         */
        value: undefined,
        /**
         * @cfg {Number} visibleDays
         * The number of days to show in a week, starting from the {@link #firstDayOfWeek}.
         * For example, to show the view with days `Mon - Fri`, use:
         *
         *      {
         *          visibleDays: 5,
         *          firstDayOfWeek: 1 // Monday
         *      }
         */
        visibleDays: 7,
        /**
         * @cfg {Number} [visibleWeeks=2]
         * The number of weeks to show in this view.
         */
        visibleWeeks: 2,
        /**
         * @cfg {Number[]} weekendDays
         * The days of the week that are the weekend. `0` (Sunday) through `6` (Saturday).
         * Defaults to {@link Ext.Date#weekendDays}.
         */
        weekendDays: undefined
    },
    /**
     * @event beforeeventdragstart
     * Fired before an event drag begins. Depends on the {@link #cfg-draggable} config.
     * @param {Ext.calendar.view.Weeks} this This view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     *
     * Return `false` to cancel the drag.
     */
    /**
     * @event eventdrop
     * Fired when an event drop is complete.
     * Depends on the {@link #droppable} config.
     * @param {Ext.calendar.view.Weeks} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     * @param {Ext.calendar.date.Range} context.newRange The new date range.
     */
    /**
     * @event select
     * Fired when a single date is selected.
     * @param {Ext.calendar.view.Weeks} this The view.
     * @param {Object} context The context.
     * @param {Date} context.date The date selected.
     */
    /**
     * @event selectrange
     * Fired when a date range is selected.
     * @param {Ext.calendar.view.Weeks} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.date.Range} context.range The date range.
     */
    /**
     * @event validateeventdrop
     * Fired when an event is dropped on this view, allows the drop
     * to be validated. Depends on the {@link #droppable} config.
     * @param {Ext.calendar.view.Weeks} this The view.
     * @param {Object} context The context.
     * @param {Ext.calendar.model.EventBase} context.event The event model.
     * @param {Ext.calendar.date.Range} context.newRange The new date range.
     * @param {Ext.Promise} context.validate A promise that allows validation to occur.
     * The default behavior is for no validation to take place. To achieve asynchronous
     * validation, the promise on the context object must be replaced:
     *
     *     {
     *         listeners: {
     *             validateeventdrop: function(view, context) {
     *                 context.validate = context.then(function() {
     *                     return Ext.Ajax.request({
     *                         url: '/checkDrop'
     *                     }).then(function(response) {
     *                         return Promise.resolve(response.responseText === 'ok');
     *                     });
     *                 });
     *             }
     *         }
     *     }
     */
    constructor: function(config) {
        var me = this;
        me.callParent([
            config
        ]);
        me.el.on('tap', 'handleEventTap', me, {
            delegate: '.' + me.$eventCls
        });
        me.cellTable.on('click', 'onOverflowClick', me, {
            delegate: '.' + me.$overflowCls
        });
        me.recalculate();
        me.refreshHeaders();
    },
    getDisplayRange: function() {
        var me = this,
            range;
        if (me.isConfiguring) {
            me.recalculate();
        }
        range = me.dateInfo[me.displayRangeProp];
        return new Ext.calendar.date.Range(me.utcToLocal(range.start), me.utcToLocal(range.end));
    },
    getVisibleRange: function() {
        var D = Ext.Date,
            range;
        if (this.isConfiguring) {
            this.recalculate();
        }
        range = this.dateInfo.visible;
        return new Ext.calendar.date.Range(D.clone(range.start), D.clone(range.end));
    },
    // Appliers/Updaters
    updateAllowSelection: function(allowSelection) {
        var me = this;
        me.selectionListeners = Ext.destroy(me.selectionListeners);
        if (allowSelection) {
            me.el.on({
                destroyable: true,
                scope: me,
                touchstart: 'onTouchStart',
                touchmove: 'onTouchMove',
                touchend: 'onTouchEnd'
            });
        }
    },
    updateDayFormat: function(dayFormat) {
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    updateDaysInWeek: function() {
        this.refresh();
    },
    applyDraggable: function(draggable) {
        if (draggable) {
            draggable = new Ext.calendar.dd.WeeksSource(draggable);
        }
        return draggable;
    },
    updateDraggable: function(draggable, oldDraggable) {
        var me = this;
        if (oldDraggable) {
            oldDraggable.destroy();
        }
        if (draggable) {
            draggable.setView(this);
        }
    },
    applyDroppable: function(droppable) {
        if (droppable) {
            droppable = new Ext.calendar.dd.WeeksTarget();
        }
        return droppable;
    },
    updateDroppable: function(droppable, oldDroppable) {
        if (oldDroppable) {
            oldDroppable.destroy();
        }
        if (droppable) {
            droppable.setView(this);
        }
    },
    applyFirstDayOfWeek: function(firstDayOfWeek) {
        if (typeof firstDayOfWeek !== 'number') {
            firstDayOfWeek = Ext.Date.firstDayOfWeek;
        }
        return firstDayOfWeek;
    },
    updateFirstDayOfWeek: function(firstDayOfWeek) {
        var me = this;
        if (!me.isConfiguring) {
            me.recalculate();
            me.refreshHeaders();
            me.refresh();
        }
    },
    updateShowOverflow: function(showOverflow, oldShowOverflow) {
        var base = Ext.baseCSSPrefix + 'calendar-weeks-with-overflow-',
            el = this.element;
        if (oldShowOverflow) {
            el.removeCls(base + oldShowOverflow);
        }
        if (showOverflow) {
            el.addCls(base + showOverflow);
        }
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    updateTimezoneOffset: function() {
        if (!this.isConfiguring) {
            this.recalculate();
        }
    },
    updateValue: function(value, oldValue) {
        var me = this;
        if (!me.isConfiguring) {
            me.suspendEventRefresh();
            me.recalculate();
            me.resumeEventRefresh();
            me.refreshHeaders();
            me.refresh();
        }
        me.callParent([
            value,
            oldValue
        ]);
    },
    updateVisibleDays: function() {
        var me = this;
        if (!me.isConfiguring) {
            me.recalculate();
            me.refreshHeaders();
            me.refresh();
        }
    },
    updateVisibleWeeks: function(visibleWeeks) {
        var me = this,
            table = me.cellTable;
        me.suspendEventRefresh();
        me.recalculate();
        me.resumeEventRefresh();
        table.removeChild(table.dom.firstChild);
        table.createChild({
            tag: 'tbody',
            children: me.generateCells(me.dateInfo.requiredWeeks, true)
        });
        me.cells = me.queryCells();
        if (!me.isConfiguring) {
            me.refresh();
        }
    },
    applyWeekendDays: function(weekendDays) {
        return weekendDays || Ext.Date.weekendDays;
    },
    updateWeekendDays: function(weekendDays) {
        this.weekendDayMap = Ext.Array.toMap(weekendDays);
        this.refresh();
    },
    // Overrides
    getElementConfig: function() {
        var me = this,
            result = me.callParent(),
            i;
        result.children = [
            {
                tag: 'table',
                reference: 'cellTable',
                cls: me.$tableCls + ' ' + Ext.baseCSSPrefix + 'calendar-weeks-week-rows',
                children: [
                    {
                        tag: 'tbody'
                    }
                ]
            }
        ];
        return result;
    },
    doDestroy: function() {
        var me = this;
        // Clean up selection listeners
        me.setAllowSelection(false);
        me.setDraggable(null);
        me.setDroppable(null);
        me.callParent();
    },
    privates: {
        displayRangeProp: 'visible',
        domFormat: 'Y-m-d',
        eventGutter: 5,
        /**
         * @property {Date} maxDayMonth
         * The first day of a month with 31 days.
         *
         * @private
         */
        maxDayMonth: new Date(2000, 0, 1),
        /**
         * @property {Date} sundayDay
         * A date where the month starts on a Sunday. Used to generate day names.
         *
         * @private
         */
        sundayDay: new Date(2000, 9, 1),
        startMarginName: 'left',
        /**
         * @property {Boolean} trackRanges
         * `true` to track the date ranges in the view to add past/future date classes.
         */
        trackRanges: false,
        $rowCls: Ext.baseCSSPrefix + 'calendar-weeks-row',
        $cellCls: Ext.baseCSSPrefix + 'calendar-weeks-cell',
        $weekendCls: Ext.baseCSSPrefix + 'calendar-weeks-weekend-cell',
        $outsideCls: Ext.baseCSSPrefix + 'calendar-weeks-outside-cell',
        $pastCls: Ext.baseCSSPrefix + 'calendar-weeks-past-cell',
        $futureCls: Ext.baseCSSPrefix + 'calendar-weeks-future-cell',
        $todayCls: Ext.baseCSSPrefix + 'calendar-weeks-today-cell',
        $selectionCls: Ext.baseCSSPrefix + 'calendar-weeks-selection',
        $dayTextCls: Ext.baseCSSPrefix + 'calendar-weeks-day-text',
        $hiddenCellCls: Ext.baseCSSPrefix + 'calendar-weeks-hidden-cell',
        $cellInnerCls: Ext.baseCSSPrefix + 'calendar-weeks-cell-inner',
        $overflowCls: Ext.baseCSSPrefix + 'calendar-weeks-overflow',
        $cellOverflowCls: Ext.baseCSSPrefix + 'calendar-weeks-overflow-cell',
        $overflowPopupCls: Ext.baseCSSPrefix + 'calendar-weeks-overflow-popup',
        /**
         * Clear any selected cells.
         *
         * @private
         */
        clearSelected: function() {
            var cells = this.cells,
                len = cells.length,
                i;
            for (i = 0; i < len; ++i) {
                Ext.fly(cells[i]).removeCls(this.$selectionCls);
            }
        },
        /**
         * Construct events for the view.
         *
         * @private
         */
        constructEvents: function() {
            var me = this,
                D = Ext.Date,
                daysInWeek = Ext.Date.DAYS_IN_WEEK,
                events = me.getEventSource().getRange(),
                len = events.length,
                visibleDays = me.getVisibleDays(),
                visibleWeeks = me.dateInfo.requiredWeeks,
                current = D.clone(me.dateInfo.visible.start),
                eventHeight = me.getEventStyle().fullHeight,
                maxEvents = Math.floor(me.getDaySizes().heightForEvents / eventHeight),
                overflow = me.getShowOverflow() === 'bottom',
                weeks = [],
                i, j, week, frag, event;
            me.weeks = weeks;
            frag = document.createDocumentFragment();
            for (i = 0; i < visibleWeeks; ++i) {
                week = new Ext.calendar.view.WeeksRenderer({
                    view: me,
                    start: current,
                    days: visibleDays,
                    index: i,
                    overflow: overflow,
                    maxEvents: maxEvents
                });
                for (j = 0; j < len; ++j) {
                    event = events[j];
                    if (!me.isEventHidden(event)) {
                        week.addIf(event);
                    }
                }
                if (week.hasEvents()) {
                    week.calculate();
                }
                me.processWeek(week, frag);
                weeks.push(week);
                current = D.add(current, D.DAY, daysInWeek, true);
            }
            me.element.appendChild(frag);
        },
        /**
         * @inheritdoc
         */
        createEvent: function(event, cfg, dummy) {
            var span = event ? event.isSpan() : true;
            cfg = Ext.apply({
                mode: span ? 'weekspan' : 'weekinline'
            }, cfg);
            return this.callParent([
                event,
                cfg,
                dummy
            ]);
        },
        /**
         * Do range recalculation.
         * @param {Date} [start] The start to recalculate from. Defaults to the current value.
         * @return {Object} The active ranges
         * @return {Ext.calendar.date.Range} return.visible The visible range for the view.
         * @return {Ext.calendar.date.Range} return.active The active range for the view.
         * @return {Number} return.requiredWeeks The number of weeks in the view.
         *
         * @private
         */
        doRecalculate: function(start) {
            var me = this,
                D = Ext.Date,
                daysInWeek = D.DAYS_IN_WEEK,
                visibleRange = [],
                visibleWeeks = me.getVisibleWeeks(),
                R = Ext.calendar.date.Range,
                value, startOffset, end;
            start = start || me.getValue();
            start = D.clearTime(start, true);
            // The number of days before the value date to reach the previous firstDayOfWeek
            startOffset = (start.getDay() + daysInWeek - me.getFirstDayOfWeek()) % daysInWeek;
            value = me.toUtcOffset(start);
            start = D.subtract(value, D.DAY, startOffset, true);
            end = D.add(start, D.DAY, visibleWeeks * daysInWeek - (daysInWeek - me.getVisibleDays()), true);
            return {
                // For compat with day views
                full: new R(start, end),
                visible: new R(start, end),
                active: new R(start, D.subtract(end, D.DAY, 1, true)),
                requiredWeeks: visibleWeeks
            };
        },
        /**
         * @inheritdoc
         */
        doRefresh: function() {
            var me = this,
                D = Ext.Date,
                dateInfo = me.dateInfo,
                dayFormat = me.getDayFormat(),
                weekendDayMap = me.weekendDayMap,
                now = D.clearTime(Ext.calendar.date.Util.getLocalNow()),
                current = me.utcToLocal(dateInfo.visible.start),
                classes = [],
                trackRanges = me.trackRanges,
                visibleDays = me.getVisibleDays(),
                daysInWeek = Ext.Date.DAYS_IN_WEEK,
                y = now.getFullYear(),
                m = now.getMonth(),
                d = now.getDate(),
                cells, len, i, cell, firstDate, lastDate;
            if (trackRanges) {
                firstDate = me.utcToLocal(dateInfo.month.start);
                lastDate = me.utcToLocal(dateInfo.month.end);
            }
            cells = me.cells;
            for (i = 0 , len = cells.length; i < len; ++i) {
                cell = cells[i];
                classes.length = 0;
                classes.push(me.$cellCls);
                if (weekendDayMap[current.getDay()]) {
                    classes.push(me.$weekendCls);
                }
                if (trackRanges) {
                    if (current < firstDate) {
                        classes.push(me.$pastCls, me.$outsideCls);
                    } else if (current > lastDate) {
                        classes.push(me.$futureCls, me.$outsideCls);
                    }
                }
                if (current.getFullYear() === y && current.getMonth() === m && current.getDate() === d) {
                    classes.push(me.$todayCls);
                }
                if (i % daysInWeek >= visibleDays) {
                    classes.push(me.$hiddenCellCls);
                }
                cell.className = classes.join(' ');
                cell.setAttribute('data-date', D.format(current, me.domFormat));
                cell.firstChild.firstChild.innerHTML = D.format(current, dayFormat);
                current = D.add(current, D.DAY, 1, true);
            }
            me.refreshEvents();
        },
        /**
         * @inheritdoc
         */
        doRefreshEvents: function() {
            var me = this,
                source = me.getEventSource();
            me.clearEvents();
            me.hideOverflowPopup();
            if (source && source.getCount()) {
                me.constructEvents();
            }
        },
        /**
         * Find the index of a cell via position.
         * @param {Number[]} sizes The sizes of each cell in the row/column.
         * @param {Number} offset The offset from the start edge.
         * @return {Number} The index.
         *
         * @private
         */
        findIndex: function(sizes, offset) {
            var i = 0,
                len = sizes.length;
            while (i < len) {
                offset -= sizes[i];
                if (offset <= 0) {
                    break;
                }
                ++i;
            }
            return i;
        },
        /**
         * Generate the cells for the view.
         * @param {Number} numRows The number of rows.
         * @param {Boolean} [setHeights=false] `true` to set the percentage heights on the rows.
         * @return {Object[]} An array of row DOM configs.
         *
         * @private
         */
        generateCells: function(numRows, setHeights) {
            var me = this,
                daysInWeek = Ext.Date.DAYS_IN_WEEK,
                rows = [],
                i, j, cells, style;
            if (setHeights) {
                style = {
                    height: (100 / numRows) + '%'
                };
            }
            for (i = 0; i < numRows; ++i) {
                cells = [];
                for (j = 0; j < daysInWeek; ++j) {
                    cells.push({
                        tag: 'td',
                        'data-index': j,
                        cls: me.$cellCls,
                        children: [
                            {
                                cls: me.$cellInnerCls,
                                children: [
                                    {
                                        tag: 'span',
                                        cls: me.$dayTextCls
                                    },
                                    {
                                        cls: me.$overflowCls
                                    }
                                ]
                            }
                        ]
                    });
                }
                rows.push({
                    tag: 'tr',
                    cls: me.$rowCls,
                    'data-week': i,
                    children: cells,
                    style: style
                });
            }
            return rows;
        },
        /**
         * Get a cell by date.
         * @param {Date} date The date.
         * @return {HTMLElement} The cell, `null` if not found.
         *
         * @private
         */
        getCell: function(date) {
            var ret = null,
                cells = this.cells,
                len = cells.length,
                i, cell;
            if (Ext.isDate(date)) {
                date = Ext.Date.format(date, this.domFormat);
            }
            for (i = 0; i < len; ++i) {
                cell = cells[i];
                if (cell.getAttribute('data-date') === date) {
                    ret = cell;
                    break;
                }
            }
            return ret;
        },
        /**
         * Get a cell by page position.
         * @param {Number} pageX The page x position.
         * @param {Number} pageY The page y position.
         * @return {HTMLElement} The cell.
         *
         * @private
         */
        getCellByPosition: function(pageX, pageY) {
            var me = this,
                daySize, containerXY, cellIdx, rowIdx;
            daySize = me.getDaySizes();
            containerXY = me.element.getXY();
            // We can't use division here because of the way the table distributes dimensions.
            // We can end up having some cells being 1px larger than others.
            cellIdx = me.findIndex(daySize.widths, pageX - containerXY[0]);
            rowIdx = me.findIndex(daySize.heights, pageY - containerXY[1]);
            return me.cells[rowIdx * Ext.Date.DAYS_IN_WEEK + cellIdx];
        },
        /**
         * Get a cell from a DOM event.
         * @param {Ext.event.Event} e The event.
         * @param {Boolean} [inferFromWidget=false] `true` to find the cell if the event
         * occurred on an event widget,
         * @return {HTMLElement} The cell.
         *
         * @private
         */
        getCellFromEvent: function(e, inferFromWidget) {
            var ret = null,
                xy;
            ret = e.getTarget('.' + this.$cellCls, this.element);
            // Didn't hit a cell, probably over an event
            if (!ret && inferFromWidget) {
                xy = e.getXY();
                ret = this.getCellByPosition(xy[0], xy[1]);
            }
            return ret;
        },
        /**
         * Get the date from a cell.
         * @param {HTMLElement} cell The cell.
         * @return {Date} The date.
         *
         * @private
         */
        getDateFromCell: function(cell) {
            return Ext.Date.parse(cell.getAttribute('data-date'), this.domFormat);
        },
        /**
         * Calculate the width/height of each day cell. This is cached and
         * should be invalidated on resize. The reason we need to do this is
         * that the table layout algorithm may assign some rows/cells to be 1px
         * larger than others to achieve full width, so dividing can give slightly
         * inaccurate results.
         * @return {Object} Day size info.
         * @return {Number[]} return.widths The widths for a row of cells.
         * @return {Number[]} return.heights The heights for a column of cells.
         * @return {Number} return.headerHeight The height of the day number header in the cell.
         * @return {heightForEvents} The available height for displaying events in a cell.
         *
         * @private
         */
        getDaySizes: function() {
            var me = this,
                daySizes = me.daySizes,
                cells = me.cells,
                visibleDays = me.getVisibleDays(),
                smallest = Number.MAX_VALUE,
                cell, headerHeight, fly, widths, heights, i, h;
            if (!me.daySizes) {
                cell = cells[0];
                fly = Ext.fly(cell.firstChild);
                headerHeight = fly.getPadding('tb') + Ext.fly(cell.firstChild.firstChild).getHeight();
                widths = [];
                heights = [];
                for (i = 0; i < visibleDays; ++i) {
                    fly = Ext.fly(cells[i]);
                    widths.push(fly.getWidth());
                    h = fly.getHeight();
                    heights.push(h);
                    if (h < smallest) {
                        smallest = h;
                    }
                }
                me.daySizes = daySizes = {
                    widths: widths,
                    heights: heights,
                    headerHeight: headerHeight,
                    heightForEvents: Math.max(0, smallest - headerHeight - me.eventGutter)
                };
            }
            return daySizes;
        },
        /**
         * Get styles regarding events. Creates a fake event and measures pieces of the
         * componentry.
         * @return {Object} Size info.
         * @return {Object} return.margin The margins for the event.
         * @return {Number} return.height The height of the event.
         * @return {Number} return.fullHeight The height + margins.
         *
         * @private
         */
        getEventStyle: function() {
            var me = this,
                eventStyle = me.eventStyle,
                fakeEvent, el, margin, height;
            if (!eventStyle) {
                fakeEvent = me.createEvent(null, null, true);
                el = fakeEvent.element;
                el.dom.style.visibility = 'hidden';
                me.element.appendChild(el);
                height = el.getHeight();
                margin = el.getMargin();
                margin.height = margin.top + margin.bottom;
                margin.width = margin.left + margin.right;
                me.eventStyle = eventStyle = {
                    margin: margin,
                    height: height,
                    fullHeight: height + margin.height
                };
                fakeEvent.destroy();
            }
            return eventStyle;
        },
        /**
         * Gets an event widget via an element/DOM event.
         * @param {HTMLElement/Ext.event.Event} el The element/event.
         * @return {Ext.calendar.EventBase} The widget.
         *
         * @private
         */
        getEventWidget: function(el) {
            var cls = this.$eventCls,
                id;
            if (el.isEvent) {
                el = el.target;
            }
            if (!Ext.fly(el).hasCls(cls)) {
                el = Ext.fly(el).up('.' + cls, this.element, true);
            }
            id = el.getAttribute('data-componentid');
            return this.eventMap[id];
        },
        /**
         * @inheritdoc
         */
        getMoveBaseValue: function() {
            return this.utcToLocal(this.dateInfo.visible.start);
        },
        /**
         * @inheritdoc
         */
        getMoveInterval: function() {
            var D = Ext.Date;
            return {
                unit: D.DAY,
                amount: D.DAYS_IN_WEEK * this.getVisibleWeeks()
            };
        },
        /**
         * Handle taps on event widgets in the view.
         * @param {Ext.event.Event} e The event.
         *
         * @private
         */
        handleEventTap: function(e) {
            var event = this.getEvent(e);
            if (event) {
                this.hideOverflowPopup();
                this.onEventTap(event);
            }
        },
        /**
         * @inheritdoc
         */
        handleResize: function() {
            var me = this;
            me.callParent();
            me.daySizes = null;
            me.hideOverflowPopup();
            me.refreshEvents();
        },
        /**
         * Hide the overflow popup.
         *
         * @private
         */
        hideOverflowPopup: Ext.privateFn,
        /**
         * Handle click on the "show more" overflow element.
         * @param {Ext.event.Event} e The DOM event.
         *
         * @private
         */
        onOverflowClick: function(e) {
            var me = this,
                cell = me.getCellFromEvent(e),
                date = me.getDateFromCell(cell),
                week = parseInt(cell.parentNode.getAttribute('data-week'), 10),
                index = parseInt(cell.getAttribute('data-index'), 10);
            me.showOverflowPopup(me.weeks[week].overflows[index], date, cell);
        },
        /**
         * @inheritdoc
         */
        onSourceAttach: function() {
            this.recalculate();
        },
        /**
         * Handle touchend on the view.
         * @param {Ext.event.Event} event The event.
         *
         * @private
         */
        onTouchEnd: function() {
            var me = this,
                D = Ext.Date,
                cells = me.cells,
                start, end, temp, event;
            if (me.isSelecting) {
                start = me.selectedStartIndex;
                end = me.selectedEndIndex;
                if (start === end) {
                    start = end = me.getDateFromCell(cells[start]);
                    me.fireEvent('select', me, {
                        date: start
                    });
                } else {
                    if (start > end) {
                        temp = end;
                        end = start;
                        start = temp;
                    }
                    start = me.getDateFromCell(cells[start]);
                    end = me.getDateFromCell(cells[end]);
                    me.fireEvent('selectrange', me, {
                        range: new Ext.calendar.date.Range(start, end)
                    });
                }
                if (me.getAddOnSelect() && me.hasEditableCalendars()) {
                    event = me.createModel({
                        allDay: true,
                        startDate: D.localToUtc(start),
                        endDate: D.add(D.localToUtc(end), D.DAY, 1, true)
                    });
                    me.showAddForm(event, {
                        scope: me,
                        onSave: me.clearSelected,
                        onCancel: me.clearSelected
                    });
                }
                me.isSelecting = false;
            }
        },
        /**
         * Handle touchmove on the view.
         * @param {Ext.event.Event} event The event.
         *
         * @private
         */
        onTouchMove: function(e) {
            var me = this,
                start = me.selectedStartIndex,
                cells = me.cells,
                len = cells.length,
                end, current, i, cell, swap;
            if (me.isSelecting) {
                cell = me.getCellFromEvent(e, true);
                current = Ext.Array.indexOf(cells, cell);
                if (current > start) {
                    end = current;
                } else if (current < start) {
                    end = start;
                    start = current;
                    swap = true;
                } else {
                    end = start;
                }
                me.selectedEndIndex = swap ? start : end;
                for (i = 0; i < len; ++i) {
                    Ext.fly(cells[i]).toggleCls(me.$selectionCls, i >= start && i <= end);
                }
            }
        },
        /**
         * Handle touchstart on the view.
         * @param {Ext.event.Event} event The event.
         * @param t
         * @private
         */
        onTouchStart: function(e, t) {
            var me = this,
                el = me.element,
                cell;
            if (e.pointerType === 'touch' || e.getTarget('.' + me.$overflowCls, el) || e.getTarget('.' + me.$overflowPopupCls, el)) {
                return;
            }
            cell = me.getCellFromEvent(e);
            if (cell) {
                me.isSelecting = true;
                me.selectedStartIndex = me.selectedEndIndex = Ext.Array.indexOf(me.cells, cell);
                Ext.fly(cell).addCls(me.$selectionCls);
            }
        },
        /**
         * Sets the position in the DOM for an event widget.
         * @param {Ext.dom.Element} el The element.
         * @param {Object} item The event meta object with position info.
         *
         * @private
         */
        positionEvent: function(el, item) {
            var me = this,
                daySizes = me.getDaySizes(),
                eventStyle = me.getEventStyle(),
                margin = eventStyle.margin,
                widths = daySizes.widths,
                start = item.start,
                idx = item.localIdx,
                weekIdx = item.weekIdx,
                headerOffset;
            headerOffset = daySizes.headerHeight + eventStyle.height * idx + (idx + 1) * margin.height;
            el.setTop(me.positionSum(0, weekIdx, daySizes.heights) + headerOffset);
            el.setLeft(me.positionSum(0, start, widths) + margin[me.startMarginName]);
            el.setWidth(me.positionSum(start, item.len, widths) - margin.width);
        },
        /**
         * Calculates the position based on a set of sizes.
         * See {@link #getDaySizes} on why we can't just use multiplication.
         * @param {Number} start The start index.
         * @param {Number} len The number of cells to span.
         * @param {Number[]} sizes The cell sizes.
         * @return {Number} The sum for the specified range.
         *
         * @private
         */
        positionSum: function(start, len, sizes) {
            var sum = 0,
                end = start + len,
                i;
            for (i = start; i < end; ++i) {
                sum += sizes[i];
            }
            return sum;
        },
        /**
         * Position events for a week.
         * @param {Ext.calendar.view.WeekRenderer} week The week.
         * @param {DocumentFragment} frag A fragment to append events to.
         *
         * @private
         */
        processWeek: function(week, frag) {
            var me = this,
                rows = week.rows,
                days = week.days,
                overflows = week.overflows,
                cellOffset = week.index * Ext.Date.DAYS_IN_WEEK,
                showOverflow = me.getShowOverflow(),
                cells = me.cells,
                overflowCls = me.$cellOverflowCls,
                overflowText = me.getOverflowText(),
                overflow, row, i, rowLen, j, item, widget, el, cell, len;
            if (rows) {
                for (i = 0 , len = rows.length; i < len; ++i) {
                    row = week.compress(i);
                    for (j = 0 , rowLen = row.length; j < rowLen; ++j) {
                        item = row[j];
                        if (!item.isEmpty) {
                            widget = me.createEvent(item.event);
                            el = widget.element;
                            el.dom.style.margin = '0';
                            frag.appendChild(el.dom);
                            me.positionEvent(el, item);
                        }
                    }
                }
            }
            for (i = 0; i < days; ++i) {
                cell = cells[cellOffset + i];
                overflow = overflows && overflows[i];
                if (overflow && overflow.length && showOverflow) {
                    Ext.fly(cell).addCls(overflowCls);
                    cell.firstChild.lastChild.innerHTML = Ext.String.format(overflowText, overflow.length);
                } else {
                    Ext.fly(cell).removeCls(overflowCls);
                }
            }
        },
        /**
         * Gets all day cells.
         * @return {HTMLElement[]} The day cells.
         *
         * @private
         */
        queryCells: function() {
            return this.element.query('.' + this.$cellCls);
        },
        /**
         * @inheritdoc
         */
        recalculate: function() {
            var dateInfo = this.doRecalculate();
            this.dateInfo = dateInfo;
            this.setSourceRange(dateInfo.visible);
        },
        /**
         * @inheritdoc
         */
        refreshHeaders: function() {
            var me = this,
                header = me.getHeader(),
                dateInfo = me.dateInfo;
            if (header) {
                header.setVisibleDays(this.getVisibleDays());
                if (dateInfo) {
                    header.setValue(me.utcToLocal(dateInfo.visible.start));
                }
            }
        },
        /**
         * Select a date range of cells.
         * @param {Date} from The start date.
         * @param {Date} to The end date.
         *
         * @private
         */
        selectRange: function(from, to) {
            var me = this,
                D = Ext.Date,
                range = me.dateInfo.active,
                cells = me.cells,
                len = cells.length,
                highlight = false,
                i, cell;
            if (from < range.start) {
                from = range.start;
            }
            if (to > range.end) {
                to = range.end;
            }
            from = me.getCell(D.clearTime(from, true));
            to = me.getCell(D.clearTime(to, true));
            if (from && to) {
                for (i = 0; i < len; ++i) {
                    cell = cells[i];
                    if (cell === from) {
                        highlight = true;
                    }
                    Ext.fly(cell).toggleCls(me.$selectionCls, highlight);
                    if (cell === to) {
                        highlight = false;
                    }
                }
            }
        },
        /**
         * Show the overflow popup
         *
         * @private
         */
        showOverflowPopup: Ext.privateFn
    }
});

Ext.define('Ext.overrides.calendar.view.Weeks', {
    override: 'Ext.calendar.view.Weeks',
    requires: [
        'Ext.calendar.form.Edit',
        'Ext.calendar.form.Add'
    ],
    doDestroy: function() {
        this.tip = Ext.destroy(this.tip);
        this.callParent();
    },
    privates: {
        doRefresh: function() {
            this.callParent();
            this.updateLayout();
        },
        hideOverflowPopup: function() {
            var tip = this.tip;
            if (tip) {
                tip.hide();
                tip.removeAll();
            }
        },
        showOverflowPopup: function(events, date, cell) {
            var me = this,
                tip = me.tip;
            if (!tip) {
                me.tip = tip = new Ext.tip.ToolTip({
                    ui: 'calendar-overflow',
                    anchor: true,
                    renderTo: document.body,
                    hidden: true,
                    autoHide: false,
                    cls: me.$overflowPopupCls,
                    minWidth: 200,
                    defaultAlign: 'tc-bc?'
                });
                me.tip.el.on('tap', 'handleEventTap', me, {
                    delegate: '.' + me.$eventCls
                });
            }
            tip.removeAll();
            events = me.createEvents(events, {
                cls: me.$staticEventCls
            });
            tip.add(events);
            tip.el.dom.setAttribute('data-date', Ext.Date.format(date, me.domFormat));
            tip.showBy(cell);
        }
    }
});

/**
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a series of weeks. Composes a 
 * {@link Ext.calendar.view.Weeks Weeks View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Weeks panel shows the events for one or more weeks as full days similar to a
 * conventional calendar.  For a week view including an hourly timeline see
 * {@link Ext.calendar.panel.Week}.
 *
 * The weeks panel shows the week containing the current date (or the date set on the
 * {@link #cfg-value} config) plus any additional weeks totaling the
 * {@link #cfg-visibleWeeks}.  The number of days shown per week is set using
 * {@link #cfg-visibleDays}.  Each week begins on the day set on the
 * {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
 *
 *     Ext.create({
 *         xtype: 'calendar-weeksview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         firstDayOfWeek: 1,  // starts the view on Monday
 *         visibleDays: 5,     // and displays it and the 4 days after
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * ### Calendar Events
 *
 * Events show on the view with their start and end days correlating to the day
 * labels.  The events will display on the timeline according to your local timezone
 * offset from GMT.  The timezone offset can be applied explicitly using the
 * {@link #cfg-timezoneOffset} config option.
 *
 * ### Adding All Day Events
 *
 * Dragging / swiping across multiple days will show the event add form with multiple
 * days pre-populated in the form's start / end dates.  A single all day type event can
 * be added by tapping / clicking on a single day.
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward the number of
 * {@link #cfg-visibleWeeks}.
 *
 * i.e.  `panel.moveNext();` called on a 7-day view with 2 visible weeks will advance the
 * view 2 weeks.  **Note** that a panel configured with 5 `visibleDays` would not advance
 * 5 days, but rather will show the next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * For a month view refer to {@link Ext.calendar.view.Month}.
 */
Ext.define('Ext.calendar.panel.Weeks', {
    extend: 'Ext.calendar.panel.Base',
    xtype: 'calendar-weeks',
    requires: [
        'Ext.calendar.header.Weeks',
        'Ext.calendar.view.Weeks'
    ],
    config: {
        /**
         * @inheritdoc
         */
        dayHeader: {
            xtype: 'calendar-weeksheader'
        },
        /**
         * @inheritdoc
         */
        eventRelayers: {
            view: {
                /**
                 * @event beforeeventdragstart
                 * @inheritdoc Ext.calendar.view.Weeks#beforeeventdragstart
                 */
                beforeeventdragstart: true,
                /**
                 * @event validateeventdrop
                 * @inheritdoc Ext.calendar.view.Weeks#validateeventdrop
                 */
                validateeventdrop: true,
                /**
                 * @event eventdrop
                 * @inheritdoc Ext.calendar.view.Weeks#eventdrop
                 */
                eventdrop: true
            }
        },
        /**
         * @inheritdoc
         */
        view: {
            xtype: 'calendar-weeksview'
        }
    },
    /**
     * @inheritdoc
     */
    configExtractor: {
        dayHeader: {
            /**
             * @inheritdoc Ext.calendar.header.Weeks#format
             */
            dayHeaderFormat: 'format'
        },
        view: {
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            addOnSelect: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            allowSelection: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            dayFormat: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            draggable: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            droppable: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            firstDayOfWeek: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            overflowText: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#showOverflow
             */
            showOverflow: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            visibleDays: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            visibleWeeks: true,
            /**
             * @inheritdoc Ext.calendar.view.Weeks#addOnSelect
             */
            weekendDays: true
        }
    }
});

/**
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Month view shows events over an entire month.  The view shows a summary of the
 * events that occur on each day.  The month view uses the current date (or the date set
 * on the {@link #cfg-value} config) to determine the month to show.
 *
 * The Month view displays (as needed) days from trailing/leading months as required to
 * fill the space in the view based on the {@link #cfg-value} and the
 * {@link #cfg-firstDayOfWeek}.  In the following example, the view will start on Sun Dec
 * 27 and conclude on Sat Feb 6 because we require 6 rows to display the month of
 * January.
 *
 *      {
 *          value: new Date(2010, 0, 1) // Fri
 *          firstDayOfWeek: 0 // Sunday
 *      }
 *
 * The {@link #cfg-visibleWeeks} can be specified as `null` to allow the view to
 * calculate the appropriate number of rows to show in the view, as this varies
 * from month to month.  This defaults to the largest possible value (6 weeks) so that
 * the view size is consistent across months.
 *
 * ### Date Range Navigation
 *
 * In addition to {@link #cfg-navigate}, {@link #cfg-movePrevious}, and
 * {@link #cfg-moveNext} the Month view let you quickly navigate between months and
 * years.  The {@link #cfg-previousMonth} and {@link #cfg-nextMonth} methods allow for
 * programmatic month-to-month navigation while {@link #cfg-previousYear} and
 * {@link #cfg-nextYear} navigate the view across years.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the days of the week consider using
 * {@link Ext.calendar.panel.Weeks} instead.  For a multi-week view refer to
 * {@link Ext.calendar.view.Weeks}.
 */
Ext.define('Ext.calendar.view.Month', {
    extend: 'Ext.calendar.view.Weeks',
    xtype: 'calendar-monthview',
    config: {
        /**
         * @cfg {Date} [value=new Date()]
         * The current month to show. The value will default to the 
         * first date of the configured month.  For example:
         *
         *      calendar.setValue(new Date(2010, 0, 13));
         *      console.log(calendar.getValue()); // -> 2010-01-01
         */
        value: undefined,
        /**
         * @cfg {Number} [visibleWeeks=6]
         * The number of weeks to show in this view. If specified as `null`, the view will generate the appropriate
         * number of rows to display a full month based on the passed {@link #cfg-value}. In a majority of cases,
         * this will be 5, however some months will only require 4, while others will need 6. Defaults to the
         * largest value to keep the view size consistent.
         */
        visibleWeeks: 6
    },
    /**
     * Move forward by a number of months.
     * @param {Number} [months=1] The number of months to move.
     */
    nextMonth: function(months) {
        this.navigate(this.getNavigateValue(months), Ext.Date.MONTH);
    },
    /**
     * Move forward by a number of years.
     * @param {Number} [years=1] The number of years to move.
     */
    nextYear: function(years) {
        this.navigate(this.getNavigateValue(years), Ext.Date.YEAR);
    },
    /**
     * Move backward by a number of months.
     * @param {Number} [months=1] The number of months to move.
     */
    previousMonth: function(months) {
        this.navigate(-this.getNavigateValue(months), Ext.Date.MONTH);
    },
    /**
     * Move backward by a number of years.
     * @param {Number} [years=1] The number of years to move.
     */
    previousYear: function(years) {
        this.navigate(-this.getNavigateValue(years), Ext.Date.YEAR);
    },
    privates: {
        displayRangeProp: 'month',
        /**
         * @property {Number} maxWeeks
         * The maximum amount of weeks to be shown 
         *
         * @private
         */
        maxWeeks: 6,
        /**
         * @property {String[]} rowClasses
         * The row classes for the view when they are to be displayed as 
         * @private
         */
        $rowClasses: [
            Ext.baseCSSPrefix + 'calendar-month-4weeks',
            Ext.baseCSSPrefix + 'calendar-month-5weeks',
            Ext.baseCSSPrefix + 'calendar-month-6weeks'
        ],
        trackRanges: true,
        /**
         * Calculate the relevant date ranges given the current value.
         * @param {Date} [start] The start to recalculate from. Defaults to the current value.
         * @return {Object} The active values.
         * @return {Ext.calendar.date.Range} return.visible The visible date range.
         * @return {Ext.calendar.date.Range} return.active The active range for the view.
         * @return {Ext.calendar.date.Range} return.month The month range for the view.
         * @return {Number} return.requireWeeks The number of weeks in the current view.
         *
         * @private
         */
        doRecalculate: function(start) {
            var me = this,
                D = Ext.Date,
                daysInWeek = D.DAYS_IN_WEEK,
                firstDayOfWeek = me.getFirstDayOfWeek(),
                requiredWeeks = me.maxWeeks,
                visibleWeeks = me.getVisibleWeeks(),
                visibleDays = me.getVisibleDays(),
                R = Ext.calendar.date.Range,
                days, end, first, l, last, startOffset;
            start = D.getFirstDateOfMonth(start || me.getValue());
            // The number of days before the value date to reach the previous firstDayOfWeek
            startOffset = (start.getDay() + daysInWeek - firstDayOfWeek) % daysInWeek;
            first = me.toUtcOffset(start);
            l = D.getLastDateOfMonth(start);
            last = me.toUtcOffset(l);
            // A null value means we need to figure out how many weeks we need
            if (visibleWeeks === null) {
                if (startOffset >= visibleDays) {
                    startOffset = visibleDays - startOffset;
                }
                days = startOffset + D.getDaysInMonth(start);
                requiredWeeks = Math.ceil(days / daysInWeek);
            }
            end = daysInWeek * requiredWeeks - (daysInWeek - visibleDays);
            start = D.subtract(first, D.DAY, startOffset, true);
            end = D.add(start, D.DAY, end, true);
            return {
                // For compat with day views
                full: new R(start, end),
                visible: new R(start, end),
                active: new R(start, D.subtract(end, D.DAY, 1, true)),
                month: new R(first, last),
                requiredWeeks: requiredWeeks
            };
        },
        doRefresh: function() {
            var me = this,
                cls = me.$rowClasses,
                weeks = me.dateInfo.requiredWeeks;
            me.element.replaceCls(cls, cls[weeks - 1 - cls.length]);
            me.callParent();
        },
        getMoveBaseValue: function() {
            return this.utcToLocal(this.dateInfo.month.start);
        },
        getMoveInterval: function() {
            return {
                unit: Ext.Date.MONTH,
                amount: 1
            };
        },
        generateCells: function() {
            // Always generate the max number of cells and we'll hide/show as needed.
            return this.callParent([
                this.maxWeeks,
                false
            ]);
        },
        /**
         * Gets the value to navigate by, if no value is specified then
         * it will default to `1`.
         * @param {Number} n Get the value to navigate by.
         * @return {Number} The value to navigate by, `1` if no value is passed.
         *
         * @private
         */
        getNavigateValue: function(n) {
            return n || n === 0 ? n : 1;
        }
    }
});

/**
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a calendar month. Composes a
 * {@link Ext.calendar.view.Month Month View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Month panel shows events over an entire month.  The panel shows a summary of the
 * events that occur on each day.  The Month view uses the current date (or the date set
 * on the {@link #cfg-value} config) to determine the month to show.
 *
 * The Month panel displays (as needed) days from trailing/leading months as required to
 * fill the space in the view based on the {@link #cfg-value} and the
 * {@link #cfg-firstDayOfWeek}.  In the following example, the view will start on Sun Dec
 * 27 and conclude on Sat Feb 6 because we require 6 rows to display the month of
 * January.
 *
 *      {
 *          value: new Date(2010, 0, 1) // Fri
 *          firstDayOfWeek: 0 // Sunday
 *      }
 *
 * The {@link #cfg-visibleWeeks} can be specified as `null` to allow the view to
 * calculate the appropriate number of rows to show in the view, as this varies
 * from month to month.  This defaults to the largest possible value (6 weeks) so that
 * the view size is consistent across months.
 *
 * ### Date Range Navigation
 *
 * In addition to {@link #cfg-navigate}, {@link #cfg-movePrevious}, and
 * {@link #cfg-moveNext} the Month view let you quickly navigate between months and
 * years.  The {@link #cfg-previousMonth} and {@link #cfg-nextMonth} methods allow for
 * programmatic month-to-month navigation while {@link #cfg-previousYear} and
 * {@link #cfg-nextYear} navigate the view across years.
 *
 * ### Alternative Classes
 *
 * For a multi-week panel refer to {@link Ext.calendar.panel.Weeks}.
 */
/**
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a calendar month. Composes a
 * {@link Ext.calendar.view.Month Month View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Month panel shows events over an entire month.  The panel shows a summary of the
 * events that occur on each day.  The Month view uses the current date (or the date set
 * on the {@link #cfg-value} config) to determine the month to show.
 *
 * The Month panel displays (as needed) days from trailing/leading months as required to
 * fill the space in the view based on the {@link #cfg-value} and the
 * {@link #cfg-firstDayOfWeek}.  In the following example, the view will start on Sun Dec
 * 27 and conclude on Sat Feb 6 because we require 6 rows to display the month of
 * January.
 *
 *      {
 *          value: new Date(2010, 0, 1) // Fri
 *          firstDayOfWeek: 0 // Sunday
 *      }
 *
 * The {@link #cfg-visibleWeeks} can be specified as `null` to allow the view to
 * calculate the appropriate number of rows to show in the view, as this varies
 * from month to month.  This defaults to the largest possible value (6 weeks) so that
 * the view size is consistent across months.
 *
 * ### Date Range Navigation
 *
 * In addition to {@link #cfg-navigate}, {@link #cfg-movePrevious}, and
 * {@link #cfg-moveNext} the Month view let you quickly navigate between months and
 * years.  The {@link #cfg-previousMonth} and {@link #cfg-nextMonth} methods allow for
 * programmatic month-to-month navigation while {@link #cfg-previousYear} and
 * {@link #cfg-nextYear} navigate the view across years.
 *
 * ### Alternative Classes
 *
 * For a multi-week panel refer to {@link Ext.calendar.panel.Weeks}.
 */
Ext.define('Ext.calendar.panel.Month', {
    extend: 'Ext.calendar.panel.Weeks',
    xtype: 'calendar-month',
    requires: [
        'Ext.calendar.view.Month'
    ],
    config: {
        /**
         * @inheritdoc
         */
        view: {
            xtype: 'calendar-monthview'
        }
    },
    /**
     * @cfg value
     * @inheritdoc Ext.calendar.view.Month#value
     */
    /**
     * @cfg visibleWeeks
     * @inheritdoc Ext.calendar.view.Month#visibleWeeks
     */
    /**
     * @method nextMonth
     * @inheritdoc Ext.calendar.view.Month#nextMonth
     */
    nextMonth: function(months) {
        this.getView().nextMonth(months);
    },
    /**
     * @method nextYear
     * @inheritdoc Ext.calendar.view.Month#nextYear
     */
    nextYear: function(years) {
        this.getView().nextYear(yers);
    },
    /**
     * @method previousMonth
     * @inheritdoc Ext.calendar.view.Month#previousMonth
     */
    previousMonth: function(months) {
        this.getView().previousMonth(months);
    },
    /**
     * @method previousYear
     * @inheritdoc Ext.calendar.view.Month#previousYear
     */
    previousYear: function(years) {
        this.getView().previousYears(years);
    }
});

/**
 * A base class for a calendar panel that allows switching between views.
 *
 * @private
 */
Ext.define('Ext.calendar.panel.AbstractPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Border',
        'Ext.button.Segmented',
        'Ext.toolbar.Toolbar'
    ],
    layout: 'border',
    config: {
        createButton: {
            ui: 'default-small'
        },
        sideBar: {
            region: 'west',
            collapsible: true
        }
    },
    items: [
        {
            xtype: 'panel',
            reference: 'mainContainer',
            region: 'center',
            layout: 'fit'
        }
    ],
    initComponent: function() {
        var me = this,
            ct;
        me.callParent();
        ct = me.lookup('mainContainer');
        me.addSideBar({
            collapsed: me.getCompact()
        });
        me.addTitleBar();
        ct.add(me.createView());
        me.refreshCalTitle();
    },
    // Appliers/Updaters
    updateCompact: function(compact) {
        if (!this.isConfiguring) {
            this.reconfigureItems();
        }
    },
    updateCreateButtonPosition: function() {
        var me = this,
            sheet = me.sheet,
            vis;
        if (!me.isConfiguring) {
            vis = sheet && sheet.isVisible();
            me.reconfigureItems();
            if (vis) {
                me.showSheet();
            }
        }
    },
    updateSwitcherPosition: function() {
        var me = this,
            sheet = me.sheet,
            vis;
        if (!me.isConfiguring) {
            vis = sheet && sheet.isVisible();
            me.reconfigureItems();
            if (vis) {
                me.showSheet();
            }
        }
    },
    privates: {
        addSideBar: function() {
            var cfg = this.createSideBar();
            if (cfg) {
                this.add(cfg);
            }
        },
        addTitleBar: function() {
            var cfg = this.createTitleBar();
            if (cfg) {
                this.lookup('mainContainer').addDocked(cfg);
            }
        },
        createSideBar: function(cfg) {
            var me = this,
                items = [];
            if (me.getCreateButtonPosition() === 'sideBar') {
                items.push({
                    xtype: 'container',
                    margin: '0 0 10 0',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: me.createCreateButton()
                });
            }
            items.push(me.createCalendarList());
            if (me.getSwitcherPosition() === 'sideBar') {
                items.push(me.createSwitcher({
                    vertical: true
                }));
            }
            cfg = Ext.merge({
                reference: 'sideBar',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            }, cfg);
            return this.createContainerWithChildren(cfg, this.getSideBar(), items);
        },
        createTitleBar: function() {
            var me = this,
                items = [];
            if (me.getCreateButtonPosition() === 'titleBar') {
                items.push(me.createCreateButton({
                    margin: '0 10 0 0'
                }));
            }
            items.push(me.createTodayButton(), {
                xtype: 'segmentedbutton',
                allowToggle: false,
                items: [
                    me.createPreviousButton(),
                    me.createNextButton()
                ]
            }, me.createDateTitle());
            if (me.getSwitcherPosition() === 'titleBar') {
                items.push({
                    xtype: 'component',
                    flex: 1
                }, me.createSwitcher());
            }
            return this.createContainerWithChildren({
                reference: 'titleBar'
            }, this.getTitleBar(), items);
        },
        onSwitcherChange: function(btn, value) {
            this.doSetView(value, true);
        },
        reconfigureItems: function() {
            var me = this;
            Ext.suspendLayouts();
            Ext.destroy(me.lookup('titleBar'), me.lookup('sideBar'));
            me.addTitleBar();
            me.addSideBar({
                collapsed: me.getCompact()
            });
            me.refreshCalTitle();
            Ext.resumeLayouts(true);
        },
        setSwitcherValue: function(value) {
            var switcher = this.lookup('switcher');
            if (switcher) {
                switcher.setValue(value);
            } else {
                this.setView(value, true);
            }
        }
    }
});

/**
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * The Week view displays the week containing the current date (or the date
 * set on the {@link #cfg-value} config).  The number of days configured on the
 * {@link #cfg-visibleDays} config (defaults to 7) are displayed starting with the value
 * set on the {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
 *
 *     Ext.create({
 *         xtype: 'calendar-weekview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         firstDayOfWeek: 1,  // starts the view on Monday
 *         visibleDays: 5,     // and displays it and the 4 days after
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward one week.
 *
 * i.e.  `view.moveNext();` called on a 7-day view 1 week.  **Note** that a view
 * configured with 5 `visibleDays` would not advance 5 days, but rather will show the
 * next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * If your view requires a header showing the dates displayed consider using
 * {@link Ext.calendar.panel.Week} instead.  To display fewer days consider using the
 * {@link Ext.calendar.view.Day} or {@link Ext.calendar.view.Days} view.
 */
Ext.define('Ext.calendar.view.Week', {
    extend: 'Ext.calendar.view.Days',
    xtype: 'calendar-weekview',
    config: {
        /**
         * @cfg {Number} firstDayOfWeek
         * The day on which the calendar week begins. `0` (Sunday) through `6` (Saturday).
         * Defaults to {@link Ext.Date#firstDayOfWeek}
         */
        firstDayOfWeek: undefined,
        /**
         * @cfg {Date} [value=new Date()]
         * The start of the date range to show. The visible range of the view will begin
         * at the {@link #firstDayOfWeek} immediately preceding this value, or the value if
         * it is the {@link #firstDayOfWeek}. For example, using the following configuration:
         *
         *      {
         *          firstDayOfWeek: 0, // Sunday
         *          value: new Date(2010, 2, 3) // Wed, 3 March 2010
         *      }
         *
         * The visible range would begin on Sun 28th Feb.
         * @accessor
         */
        /**
         * @inheritdoc
         */
        visibleDays: 7
    },
    // Appliers/Updaters
    applyFirstDayOfWeek: function(firstDayOfWeek) {
        if (typeof firstDayOfWeek !== 'number') {
            firstDayOfWeek = Ext.Date.firstDayOfWeek;
        }
        return firstDayOfWeek;
    },
    updateFirstDayOfWeek: function() {
        var me = this;
        if (!me.isConfiguring) {
            me.recalculate();
            me.refreshHeaders();
            me.checkNowMarker();
        }
    },
    privates: {
        /**
         * @inheritdoc
         */
        doRecalculate: function(start) {
            var me = this,
                D = Ext.Date,
                R = Ext.calendar.date.Range,
                daysInWeek = D.DAYS_IN_WEEK,
                value, startOffset, activeEnd, end;
            start = start || me.getValue();
            start = D.clearTime(start, true);
            // The number of days before the value date to reach the previous firstDayOfWeek
            startOffset = (start.getDay() + daysInWeek - me.getFirstDayOfWeek()) % daysInWeek;
            start = me.toUtcOffset(start);
            start = D.subtract(start, D.DAY, startOffset, true);
            end = D.add(start, D.DAY, me.getVisibleDays(), true);
            activeEnd = D.subtract(end, D.DAY, 1, true);
            return {
                full: new R(start, end),
                active: new R(start, activeEnd),
                visible: new R(D.add(start, D.HOUR, me.getStartTime(), true), // Even if the endTime is 24, it will automatically roll over to the next day
                D.subtract(end, D.HOUR, 24 - me.getEndTime(), true))
            };
        },
        /**
         * @inheritdoc
         */
        getMoveBaseValue: function() {
            return this.utcToLocal(this.dateInfo.full.start);
        },
        /**
         * @inheritdoc
         */
        getMoveInterval: function() {
            var D = Ext.Date;
            return {
                unit: D.DAY,
                amount: D.DAYS_IN_WEEK
            };
        }
    }
});

/**
 * For an overview of calendar panels see {@link Ext.calendar.panel.Base}
 *
 * A panel for display a Week. Composes a {@link Ext.calendar.view.Week Week View} with a
 * {@link Ext.calendar.header.Base docked header}.
 *
 * The Week panel displays the week containing the current date (or the date
 * set on the {@link #cfg-value} config).  The number of days configured on the
 * {@link #cfg-visibleDays} config (defaults to 7) are displayed starting with the value
 * set on the {@link #cfg-firstDayOfWeek}.
 *
 * By default the first day is Sunday.  If you want to create a "work week" type view
 * where the weekend days are omitted you can modify the `visibleDays` and
 * `firstDayOfWeek` to show only Monday - Friday.
 *
 *     Ext.create({
 *         xtype: 'calendar-weekview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         firstDayOfWeek: 1,  // starts the view on Monday
 *         visibleDays: 5,     // and displays it and the 4 days after
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} methods modify the displayed
 * date range by moving the range forward or backward one week.
 *
 * i.e.  `panel.moveNext();` called on a 7-day view 1 week.  **Note** that a panel
 * configured with 5 `visibleDays` would not advance 5 days, but rather will show the
 * next full week with only 5 visible days.
 *
 * ### Alternative Classes
 *
 * To display fewer days consider using {@link Ext.calendar.panel.Day} or
 * {@link Ext.calendar.panel.Days}.
 */
Ext.define('Ext.calendar.panel.Week', {
    extend: 'Ext.calendar.panel.Days',
    xtype: 'calendar-week',
    requires: [
        'Ext.calendar.view.Week'
    ],
    config: {
        /**
         * @inheritdoc
         */
        view: {
            xtype: 'calendar-weekview'
        }
    },
    configExtractor: {
        view: {
            /**
             * @cfg firstDayOfWeek
             * @inheritdoc Ext.calendar.view.Week#firstDayOfWeek
             */
            firstDayOfWeek: true
        }
    }
});
/**
             * @cfg value
             * @inheritdoc Ext.calendar.view.Week#value
             */
/**
             * @cfg visibleDays
             * @inheritdoc Ext.calendar.view.Week#visibleDays
             */

/**
 * For an overview of calendar views see {@link Ext.calendar.view.Base}
 *
 * This view is used to wrap multiple calendar panels and allows switching between and
 * communicating with them through a single interface. This class does not provide any
 * additional UI functionality.  That is provided by {@link Ext.calendar.panel.Panel}
 * which wraps this component.
 *
 * Sample Multi view
 *
 *     Ext.create({
 *         xtype: 'calendar-multiview',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 400,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         },
 *         views: {
 *             day: {
 *                 xtype: 'calendar-day'
 *             },
 *             week: {
 *                 xtype: 'calendar-week'
 *             },
 *             month: {
 *                 xtype: 'calendar-month'
 *             }
 *         },
 *         defaultView: 'day'
 *     });
 *
 * In the previous example we've detailed the calendar panel types we're interested in
 * having contained within the multi view using the {@link #cfg-views} config option.
 * The key specified for each calendar panel will be used when specifying the initial
 * {@link #cfg-defaultView} as well as when setting the current view at runtime using
 * the {@link method-setView} method.
 *
 * The following Multi view configs will be applied to any calendar panel in the views
 * config:
 *
 *  - {@link #cfg-compact}
 *  - {@link #cfg-compactOptions}
 *  - {@link #cfg-store}
 *  - {@link #cfg-timezoneOffset}
 *  - {@link #cfg-value}
 *
 * ### Date Range Navigation
 *
 * The {@link #cfg-movePrevious} and {@link #cfg-moveNext} move the active view backward
 * and forward.  The amount moved depends on the current view type.
 *
 * ### Alternative Classes
 *
 * If you require UI controls for navigating views and toggling the visibility of events
 * per source calendar consider {@link Ext.calendar.panel.Panel}.
 * Ext.calendar.panel.Panel wraps the Multi view and provides navigational controls.
 */
Ext.define('Ext.calendar.view.Multi', {
    extend: 'Ext.container.Container',
    xtype: 'calendar-multiview',
    requires: [
        'Ext.calendar.date.Util'
    ],
    layout: 'fit',
    platformConfig: {
        '!desktop': {
            compact: true
        }
    },
    config: {
        /**
         * @inheritdoc Ext.calendar.view.Base#cfg-compact
         * <br>The compact config is applied to all configured {@link #cfg-views}.
         */
        compact: false,
        /**
         * @inheritdoc Ext.calendar.view.Base#cfg-compactOptions
         * <br>The compactOptions config is applied to all configured {@link #cfg-views}.
         */
        compactOptions: null,
        /**
         * @inheritdoc Ext.calendar.view.Base#cfg-store
         * <br>The store config is applied to all configured {@link #cfg-views}.
         */
        store: null,
        /**
         * @inheritdoc Ext.calendar.view.Base#cfg-timezoneOffset
         * <br>The timezoneOffset config is applied to all configured {@link #cfg-views}.
         */
        timezoneOffset: undefined,
        /**
         * @inheritdoc Ext.calendar.view.Base#cfg-value
         * <br>The value config is applied to all configured {@link #cfg-views}.
         */
        value: undefined,
        /**
         * @cfg {Object} views
         * The calendar views to have available, each item in this configuration
         * (labelled by a key) is to contain the configuration for the view, a class that
         * extends {@link Ext.calendar.panel.Base}.
         *
         * Example with a day and week view:
         *
         *     views: {
         *         day: {
         *             xtype: 'calendar-day'
         *         },
         *         week: {
         *             xtype: 'calendar-week'
         *         }
         *     }
         *
         * The "day" and "week" keys would be the eligible values for the
         * {@link #cfg-defaultView} and the param string to pass to
         * {@link #method-setView}.
         */
        views: null
    },
    /**
     * @cfg {String} defaultView
     * The key of the item from {@link #views} to use as the default.
     */
    defaultView: null,
    constructor: function(config) {
        this.callParent([
            config
        ]);
        var view = this.defaultView;
        if (view) {
            this.setView(view);
        }
    },
    /**
     * Moves the active view forward. The amount moved
     * depends on the current view.
     */
    moveNext: function() {
        this.setValue(this.activeView.calculateMoveNext());
    },
    /**
     * Moves the active view backward. The amount moved
     * depends on the current view.
     */
    movePrevious: function() {
        this.setValue(this.activeView.calculateMovePrevious());
    },
    /**
     * Move the current view by an amount based of the current {@link #value}.
     * @param {Number} amount The number of intervals to move.
     * @param {String} [interval=Ext.Date.DAY] The interval to navigate by. See {@link Ext.Date}
     * for valid intervals.
     */
    navigate: function(amount, interval) {
        var D = Ext.Date;
        if (amount !== 0) {
            this.setValue(D.add(this.getValue(), interval || D.DAY, amount, true));
        }
    },
    /**
     * Set the active view.
     *
     * Example defaultView / views configuration
     *
     *     defaultView: 'day',
     *     views: {
     *         day: {
     *             xtype: 'calendar-day'
     *         },
     *         week: {
     *             xtype: 'calendar-week'
     *         }
     *     }
     *
     * To change the view from the default of "day" to "week":
     *
     *     ViewInstance.setView('week');
     *
     * @param {String} view The view name from {@link #views}.
     */
    setView: function(view) {
        var me = this,
            active = me.activeView,
            cfg;
        if (active && active.$key === view) {
            return;
        }
        Ext.suspendLayouts();
        if (active) {
            me.remove(active);
        }
        cfg = me.getViews()[view];
        if (!cfg) {
            Ext.raise('Invalid view specified: "' + view + '".');
        }
        me.activeView = me.add(me.createView(cfg, view));
        me.activeView.on('valuechange', 'onValueChange', me);
        me.recalculate(me.getValue());
        Ext.resumeLayouts(true);
    },
    // Appliers/Updaters
    updateCompact: function(compact) {
        this.setViewCfg('setCompact', compact);
    },
    applyStore: function(store) {
        if (store) {
            store = Ext.StoreManager.lookup(store, 'calendar-calendars');
        }
        return store;
    },
    updateStore: function(store) {
        var me = this;
        me.setViewCfg('setStore', store);
        if (!me.isConfiguring) {
            me.recalculate(me.getValue());
        }
    },
    applyTimezoneOffset: function(timezoneOffset) {
        this.autoOffset = false;
        if (timezoneOffset === undefined) {
            timezoneOffset = Ext.calendar.date.Util.getDefaultTimezoneOffset();
            this.autoOffset = true;
        }
        return timezoneOffset;
    },
    updateTimezoneOffset: function(timezoneOffset) {
        this.setViewCfg('setTimezoneOffset', timezoneOffset);
    },
    applyValue: function(value, oldValue) {
        value = Ext.Date.clearTime(value || Ext.calendar.date.Util.getLocalNow(), true);
        if (oldValue && oldValue.getTime() === value.getTime()) {
            value = undefined;
        }
        return value;
    },
    updateValue: function(value) {
        if (!this.isConfiguring) {
            this.recalculate(value);
        }
    },
    showAddForm: function(data, options) {
        return this.activeView.showAddForm(data, options);
    },
    showEditForm: function(event, options) {
        return this.activeView.showEditForm(event, options);
    },
    privates: {
        createView: function(cfg, key) {
            var me = this;
            return Ext.apply({
                $key: key,
                controlStoreRange: false,
                compact: me.getCompact(),
                store: me.getStore(),
                timezoneOffset: me.autoOffset ? undefined : me.getTimezoneOffset(),
                value: me.getValue()
            }, cfg);
        },
        getActiveKey: function() {
            var active = this.activeView;
            return active ? active.$key : '';
        },
        onValueChange: function(view, context) {
            this.setValue(context.value);
            this.fireEvent('valuechange', this, context);
        },
        recalculate: function(value) {
            var view = this.activeView,
                store = this.getStore(),
                range, eventSource;
            if (view && store) {
                eventSource = store.getEventSource();
                range = Ext.calendar.date.Util.expandRange(view.getView().doRecalculate(value).full);
                eventSource.setRange(range);
                view.setValue(value);
            }
        },
        setViewCfg: function(setterName, value) {
            if (!this.isConfiguring) {
                var view = this.activeView;
                if (view) {
                    view[setterName](value);
                }
            }
        }
    }
});

/**
 * This class is the main calendar panel, it wraps {@link Ext.calendar.view.Multi}.
 *
 * It allows switching between multiple views of the same dataset. It is composed of the
 * other calendar types such as {@link Ext.calendar.panel.Month},
 * {@link Ext.calendar.panel.Week}, and {@link Ext.calendar.panel.Day}.
 *
 * It also provides extra UI features like a switcher button,
 * {@link #cfg-titleBar title bar}, and navigation buttons.
 *
 * Sample Calendar panel
 *
 *     Ext.create({
 *         xtype: 'calendar',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 600,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         }
 *     });
 *
 * By default, the Calendar panel contains a {@link Ext.calendar.panel.Day Day},
 * {@link Ext.calendar.panel.Week Week}, and {@link Ext.calendar.panel.Month Month} view.
 * Configurations for these views may be passed in the {@link #cfg-views} config option.
 * For example, to display only a 5-day work week instead of the default 7-day week the
 * following `views` config would be used:
 *
 *     Ext.create({
 *         xtype: 'calendar',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 600,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         },
 *         views: {
 *             week: {
 *                 visibleDays: 5,
 *                 firstDayOfWeek: 1
 *             }
 *         }
 *     });
 *
 * The previous example will result in a Day, Week, and Month view in the Calendar panel
 * with the Week view displaying only 5 days.  Set a default view to `null` to prevent it
 * from being included in the Calendar panel.
 *
 *     Ext.create({
 *         xtype: 'calendar',
 *         renderTo: Ext.getBody(),
 *         height: 400,
 *         width: 600,
 *         store: {
 *             autoLoad: true,
 *             proxy: {
 *                 type: 'ajax',
 *                 url: 'calendars.php'
 *             },
 *             eventStoreDefaults: {
 *                 proxy: {
 *                     type: 'ajax',
 *                     url: 'events.php'
 *                 }
 *             }
 *         },
 *         views: {
 *             month: null,  // now only the Week and Day calendars will be included
 *             week: {
 *                 visibleDays: 5,
 *                 firstDayOfWeek: 1
 *             }
 *         }
 *     });
 *
 * See the {@link #cfg-views} config for additional configuration options.
 *
 * The default view is "month".  This can be set using the {@link #cfg-defaultView}
 * config option.
 *
 * The following Multi view configs will be applied to any calendar panel in the views
 * config:
 *
 *  - {@link #cfg-compact}
 *  - {@link #cfg-compactOptions}
 *  - {@link #cfg-store}
 *  - {@link #cfg-timezoneOffset}
 *  - {@link #cfg-value}
 */
Ext.define('Ext.calendar.panel.Panel', {
    extend: 'Ext.calendar.panel.AbstractPanel',
    xtype: 'calendar',
    mixins: [
        'Ext.mixin.ConfigState'
    ],
    alternateStateConfig: 'compactOptions',
    requires: [
        'Ext.calendar.panel.Day',
        'Ext.calendar.panel.Week',
        'Ext.calendar.panel.Month',
        'Ext.calendar.List',
        'Ext.calendar.view.Multi',
        'Ext.calendar.date.Util'
    ],
    referenceHolder: true,
    platformConfig: {
        '!desktop': {
            compact: true
        }
    },
    config: {
        /**
         * @accessor
         * @cfg {Object} calendarList
         * The config for creating the {@link Ext.calendar.List calendar list).
         */
        calendarList: {
            xtype: 'calendar-list',
            reference: 'list',
            flex: 1
        },
        /**
         * @accessor
         * @inheritdoc Ext.calendar.view.Multi#cfg-compact
         */
        compact: false,
        /**
         * @accessor
         * @inheritdoc Ext.calendar.view.Multi#cfg-compactOptions
         */
        compactOptions: {},
        /**
         * @accessor
         * @cfg {Object} createButton
         * The config for creating the create button.  Clicking / tapping the create
         * button shows the {@link Ext.calendar.form.Add add event form}.  To prevent the
         * create button from being created use `null`.
         *
         *     createButton: null
         *
         * To configure the add form or prevent a user from adding events via calendar
         * interactions see calendar view's
         * {@link Ext.calendar.view.Base#cfg-addForm addForm} config option.
         */
        createButton: {
            xtype: 'button',
            cls: Ext.baseCSSPrefix + 'calendar-panel-create-button',
            text: 'Create'
        },
        /**
         * @accessor
         * @cfg {String} createButtonPosition
         * The position for the create button. Can be "sideBar" or "titleBar".
         */
        createButtonPosition: 'sideBar',
        /**
         * @accessor
         * @cfg {Object} dateTitle
         * The config for the date title.
         *
         * **Note:** The date title template is configurable within the
         * {@link #cfg-views} config option for each view
         */
        dateTitle: {
            xtype: 'component',
            reference: 'calTitle',
            cls: Ext.baseCSSPrefix + 'calendar-panel-title',
            margin: '0 0 0 10'
        },
        /**
         * @accessor
         * @cfg {Object} nextButton
         * The configuration for the next navigation button.
         */
        nextButton: {
            xtype: 'button',
            text: '>'
        },
        /**
         * @accessor
         * @cfg {Object} previousButton
         * The configuration for the previous navigation button.
         */
        previousButton: {
            xtype: 'button',
            text: '<'
        },
        /**
         * @accessor
         * @cfg {Object} sideBar
         * The configuration for the sidebar. Extra items can be added/inserted into
         * the sidebar by adding the items configuration. Items will be sorted by a `weight`
         * property. Existing items in the sidebar have weights `0-100` with an increment of 10
         * for each item. Use a number less than 0 to insert at the front. Use a number larger than 100
         * to insert at the end.
         */
        sideBar: {
            xtype: 'panel',
            cls: Ext.baseCSSPrefix + 'calendar-sidebar'
        },
        /**
         * @accessor
         * @inheritdoc Ext.calendar.view.Multi#cfg-store
         */
        store: null,
        switcher: {
            xtype: 'segmentedbutton',
            reference: 'switcher',
            cls: Ext.baseCSSPrefix + 'calendar-panel-switcher',
            allowMultiple: false
        },
        /**
         * @accessor
         * @cfg {String} switcherPosition
         * The position for the create button. Can be `sideBar` or `titleBar`.
         */
        switcherPosition: 'titleBar',
        /**
         * @accessor
         * @inheritdoc Ext.calendar.view.Multi#cfg-timezoneOffset
         */
        timezoneOffset: undefined,
        /**
         * @accessor
         * @cfg {Object} titleBar
         * The configuration for the titleBar. Extra items can be added/inserted into
         * the title bar by adding the items configuration. Items will be sorted by a
         * `weight` property. Existing items in the title bar have weights `0-100` with
         * an increment of 10 for each item. Use a number less than 0 to insert at the
         * front. Use a number larger than 100 to insert at the end.
         */
        titleBar: {
            xtype: 'toolbar'
        },
        /**
         * @accessor
         * @cfg {Object} todayButton
         * The configuration for the today button.
         */
        todayButton: {
            xtype: 'button',
            text: 'Today',
            margin: '0 10 0 0'
        },
        /**
         * @accessor
         * @inheritdoc Ext.calendar.view.Multi#cfg-value
         */
        value: undefined,
        //<locale>
        /**
         * @accessor
         * @cfg {Object} views
         * The calendar views to have available.  Each item in this configuration
         * (labelled by a key) is to contain the configuration for the view, a class that
         * extends {@link Ext.calendar.panel.Base}. There are also other configurations
         * available only when used in conjunction with this panel:
         *
         * - `label` - A label to display on the switcher control
         * - `weight` - A number to indicate the order in which items are
         * displayed in the switcher.  Lower numbers are displayed first.
         * - `titleTpl` - A template string for displaying the current date title.  The
         * values passed are the start and end dates.
         *
         * The default configuration:
         *
         *     views: {
         *         day: {
         *             xtype: 'calendar-day',
         *             titleTpl: '{start:date("l F d, Y")}',
         *             controlStoreRange: false,
         *             label: 'Day',
         *             weight: 10,
         *             dayHeader: null
         *         },
         *         week: {
         *             xtype: 'calendar-week',
         *             dayHeaderFormat: 'D d',
         *             controlStoreRange: false,
         *             titleTpl: '{start:date("j M")} - {end:date("j M Y")}',
         *             label: 'Week',
         *             weight: 20
         *         },
         *         month: {
         *             xtype: 'calendar-month',
         *             titleTpl: '{start:date("F Y")}',
         *             label: 'Month',
         *             weight: 30
         *         }
         *     }
         *
         * Any view configuration options passed will override the default configuration.
         * For example, to change the week view to show 5 days with the week beginning on
         * Monday:
         *
         *     views: {
         *         week: {
         *             visibleDays: 5,
         *             firstDayOfWeek: 1,
         *             label: 'Work Week'
         *         }
         *     }
         *
         * With the above config the default day and month views will be rendered along
         * with a modified week view with the text of "Work Week" in the view switcher
         * control.
         *
         * To prevent a default view from being displayed set the view config to `null`.
         * For example, to hide the Month view:
         *
         *     views: {
         *         month: null
         *     }
         *
         * Any calendar views configured with keys other than "day", "week", and "month"
         * will be included in addition to the default views.  For example, to show the
         * modified work week view we configured above in addition to the default Day,
         * Week, and Month views we would pass in the same config with a key of
         * "workweek" (the can be anything you choose) along with a weight indicating the
         * placement of the "Work Week" button in the switcher.
         *
         *     views: {
         *         workweek: {
         *             visibleDays: 5,
         *             firstDayOfWeek: 1,
         *             label: 'Work Week',
         *             weight: 25
         *         }
         *     }
         *
         * Using the above config the Calendar would now have 4 views available and would
         * display "Work Week" in the switcher control after "Week" and before "Month".
         *
         * The configuration key will be the string used when specifying the
         * {@link #cfg-defaultView} as well as that passed to the {@link #method-setView}
         * method.  For example, using the last views config example the "worweek" would
         * be shown using:
         *
         *     CalendarInstance.setView('workweek');
         */
        views: {
            day: {
                xtype: 'calendar-day',
                titleTpl: '{start:date("l F d, Y")}',
                controlStoreRange: false,
                label: 'Day',
                weight: 10,
                dayHeader: null
            },
            week: {
                xtype: 'calendar-week',
                dayHeaderFormat: 'D d',
                controlStoreRange: false,
                titleTpl: '{start:date("j M")} - {end:date("j M Y")}',
                label: 'Week',
                weight: 20
            },
            month: {
                xtype: 'calendar-month',
                titleTpl: '{start:date("F Y")}',
                label: 'Month',
                weight: 30
            }
        }
    },
    //</locale>
    /**
     * @inheritdoc Ext.calendar.view.Multi#cfg-defaultView
     */
    defaultView: 'month',
    cls: Ext.baseCSSPrefix + 'calendar-panel',
    /**
     * @method getCalendarList
     * @hide
     */
    /**
     * @method setCalendarList
     * @hide
     */
    /**
     * @method getCreateButton
     * @hide
     */
    /**
     * @method setCreateButton
     * @hide
     */
    /**
     * @method getNextButton
     * @hide
     */
    /**
     * @method setNextButton
     * @hide
     */
    /**
     * @method getPreviousButton
     * @hide
     */
    /**
     * @method setPreviousButton
     * @hide
     */
    /**
     * @method getSideBar
     * @hide
     */
    /**
     * @method setSideBar
     * @hide
     */
    /**
     * @method getSwitcher
     * @hide
     */
    /**
     * @method setSwitcher
     * @hide
     */
    /**
     * @method getTitleBar
     * @hide
     */
    /**
     * @method setTitleBar
     * @hide
     */
    /**
     * @method getTodayButton
     * @hide
     */
    /**
     * @method setTodayButton
     * @hide
     */
    /**
     * @method setViews
     * @hide
     */
    /**
     * Moves the active view forward. The amount moved
     * depends on the current view.
     */
    moveNext: function() {
        this.getView().moveNext();
    },
    /**
     * Moves the active view backward. The amount moved
     * depends on the current view.
     */
    movePrevious: function() {
        this.getView().movePrevious();
    },
    /**
     * Move the current view by an amount based of the current {@link #value}.
     * @param {Number} amount The number of intervals to move.
     * @param {String} [interval=Ext.Date.DAY] The interval to navigate by. See {@link Ext.Date}
     * for valid intervals.
     */
    navigate: function(amount, interval) {
        this.getView().navigate(amount, interval);
    },
    /**
     * @inheritdoc Ext.calendar.view.Multi#method-setView
     */
    setView: function(view) {
        this.doSetView(view);
    },
    // Appliers/Updaters
    updateCompact: function(compact, oldCompact) {
        var me = this;
        me.toggleCls(Ext.baseCSSPrefix + 'compact', compact);
        me.toggleConfigState(compact);
        me.callParent([
            compact,
            oldCompact
        ]);
        me.setViewCfg('setCompact', compact);
    },
    updateCompactOptions: function() {
        if (!this.isConfiguring && this.getCompact()) {
            this.toggleConfigState(true);
        }
    },
    applyStore: function(store) {
        if (store) {
            store = Ext.StoreManager.lookup(store, 'calendar-calendars');
        }
        return store;
    },
    updateStore: function(store) {
        var list = this.lookup('list');
        this.setViewCfg('setStore', store);
        if (list) {
            list.setStore(store);
        }
    },
    applyTimezoneOffset: function(timezoneOffset) {
        this.autoOffset = false;
        if (timezoneOffset === undefined) {
            timezoneOffset = Ext.calendar.date.Util.getDefaultTimezoneOffset();
            this.autoOffset = true;
        }
        return timezoneOffset;
    },
    updateTimezoneOffset: function(timezoneOffset) {
        this.setViewCfg('setTimezoneOffset', timezoneOffset);
    },
    applyValue: function(value, oldValue) {
        value = Ext.Date.clearTime(value || Ext.calendar.date.Util.getLocalNow(), true);
        if (oldValue && oldValue.getTime() === value.getTime()) {
            value = undefined;
        }
        return value;
    },
    updateValue: function(value) {
        this.setViewCfg('setValue', value);
        this.refreshCalTitle();
    },
    getValue: function() {
        var view = this.getView();
        return view ? view.getValue() : this.callParent();
    },
    /**
     * @protected
     * Returns the {@link Ext.calendar.view.Multi} container used to house the configured
     * calendar {@link #cfg-views}
     * @return {Ext.calendar.view.Multi} The multi calendar view container
     */
    getView: function() {
        return this.lookup('view');
    },
    privates: {
        weightStart: 0,
        weightIncrement: 10,
        createCalendarList: function(cfg) {
            return Ext.apply({
                store: this.getStore()
            }, this.getCalendarList());
        },
        createCreateButton: function(cfg) {
            cfg = cfg || {};
            cfg = Ext.apply(cfg, this.getCreateButton());
            return Ext.apply({
                handler: 'onCreateTap',
                scope: this
            }, cfg);
        },
        createContainerWithChildren: function(defaults, cfg, items) {
            cfg = Ext.apply({}, cfg);
            var me = this,
                cfgItems = cfg.items,
                weight = me.weightStart,
                incr = me.weightIncrement,
                len, i, item;
            if (cfgItems) {
                if (!Ext.isArray(cfgItems)) {
                    cfgItems = [
                        cfgItems
                    ];
                }
                for (i = 0 , len = items.length; i < len; ++i) {
                    item = items[i];
                    if (item.weight == null) {
                        item = Ext.apply({
                            weight: weight
                        }, item);
                    }
                    weight += incr;
                }
                items = items.concat(cfgItems);
                Ext.Array.sort(items, me.weightSorter);
                delete cfg.items;
            }
            cfg.items = items;
            return Ext.apply(cfg, defaults);
        },
        createDateTitle: function(cfg) {
            cfg = cfg || {};
            return Ext.apply(cfg, this.getDateTitle());
        },
        createNextButton: function() {
            return Ext.apply({
                handler: 'onNextTap',
                scope: this
            }, this.getNextButton());
        },
        createPreviousButton: function() {
            return Ext.apply({
                handler: 'onPrevTap',
                scope: this
            }, this.getPreviousButton());
        },
        createSwitcher: function(cfg) {
            var me = this,
                view = me.getView();
            cfg = Ext.apply({
                value: (view && view.getActiveKey()) || me.defaultView,
                listeners: {
                    scope: me,
                    change: 'onSwitcherChange'
                },
                items: me.getSwitcherItems()
            }, cfg);
            return Ext.apply(cfg, me.getSwitcher());
        },
        createTodayButton: function() {
            return Ext.apply({
                handler: 'onTodayTap',
                scope: this
            }, this.getTodayButton());
        },
        createView: function() {
            var me = this;
            return {
                xtype: 'calendar-multiview',
                reference: 'view',
                compact: me.getCompact(),
                defaultView: me.defaultView,
                store: me.getStore(),
                timezoneOffset: me.autoOffset ? undefined : me.getTimezoneOffset(),
                value: me.getValue(),
                views: me.getViews(),
                listeners: {
                    scope: me,
                    valuechange: 'onValueChange'
                }
            };
        },
        doSetView: function(view, fromSwitcher) {
            if (!fromSwitcher) {
                this.setSwitcherValue(view);
                return;
            }
            this.getView().setView(view);
            this.refreshCalTitle();
        },
        getSwitcherItems: function() {
            var views = this.getViews(),
                items = [],
                key, o;
            for (key in views) {
                o = views[key];
                if (o) {
                    items.push({
                        text: o.label,
                        value: key,
                        weight: o.weight
                    });
                }
            }
            items.sort(this.weightSorter);
            return items;
        },
        onCreateTap: function() {
            this.getView().showAddForm();
        },
        onNextTap: function() {
            this.moveNext();
        },
        onPrevTap: function() {
            this.movePrevious();
        },
        onValueChange: function(view, context) {
            this.setValue(context.value);
        },
        onTodayTap: function() {
            this.setValue(new Date());
        },
        refreshCalTitle: function() {
            var me = this,
                view = me.getView(),
                calTitle = me.lookup('calTitle'),
                tpl;
            if (view && calTitle) {
                view = view.activeView;
                tpl = view.lookupTpl('titleTpl');
                if (tpl) {
                    calTitle.setHtml(tpl.apply(view.getDisplayRange()));
                }
            }
        },
        setViewCfg: function(setterName, value) {
            if (!this.isConfiguring) {
                var view = this.getView();
                if (view) {
                    view[setterName](value);
                }
            }
        },
        weightSorter: function(a, b) {
            return a.weight - b.weight;
        }
    }
});

/**
 * A color palette for styling events.
 */
Ext.define('Ext.calendar.theme.Palette', {
    /**
     * @property {String} primary
     * The primary color.
     */
    primary: null,
    /**
     * @property {String} secondary
     * The secondary color.
     */
    secondary: null,
    /**
     * @property {String} border
     * The border color.
     */
    border: null,
    constructor: function(config) {
        Ext.apply(this, config);
    }
});

