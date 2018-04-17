Ext.define('Ext.panel.DateView', {
    extend: 'Ext.Widget',
    xtype: 'datepanelview',
    
    config: {
        startDay: null,
        weekendDays: null,
        specialDates: null,
        disabledDays: null,
        disabledDates: null,
        minDate: null,
        maxDate: null,
        format: null,
        captionFormat: null,
        dateCellFormat: null,
        headerLength: null,
        
        monthOffset: 0,
        focusedDate: null,
        hideCaption: true
    },
    
    element: {
        reference: 'element'
    },
    
    tableTpl: {
        reference: 'tableElement',
        tag: 'table',
        cellspacing: '0',
        cellpadding: '0',
        cls: Ext.baseCSSPrefix + 'table',
        children: []
    },
    
    captionTpl: {
        reference: 'captionElement',
        tag: 'caption',
        cls: Ext.baseCSSPrefix + 'caption'
    },
    
    headTpl: {
        tag: 'thead',
        reference: 'headElement',
        cls: Ext.baseCSSPrefix + 'header'
    },
    
    headRowTpl: {
        tag: 'tr'
    },
    
    headCellTpl: {
        tag: 'th',
        cls: Ext.baseCSSPrefix + 'cell',
        children: [{
            tag: 'div',
            cls: Ext.baseCSSPrefix + 'inner ' + Ext.dom.Element.unselectableCls
        }]
    },
    
    bodyTpl: {
        tag: 'tbody',
        reference: 'bodyElement',
        cls: Ext.baseCSSPrefix + 'body'
    },
    
    bodyRowTpl: {
        tag: 'tr'
    },
    
    bodyCellTpl: {
        tag: 'td',
        cls: Ext.baseCSSPrefix + 'cell',
        tabIndex: -1,
        children: [{
            tag: 'div',
            cls: Ext.baseCSSPrefix + 'inner ' +  Ext.dom.Element.unselectableCls
        }]
    },
    
    rows: 6,
    columns: 7,
    
    cellCls: Ext.baseCSSPrefix + 'cell',
    weekendDayCls: Ext.baseCSSPrefix + 'weekend',
    disabledDayCls: Ext.baseCSSPrefix + 'disabled-day',
    specialDateCls: Ext.baseCSSPrefix + 'special-date',
    todayCls: Ext.baseCSSPrefix + 'today',
    focusedCls: Ext.baseCSSPrefix + 'focused',
    prevMonthCls: Ext.baseCSSPrefix + 'prev-month',
    nextMonthCls: Ext.baseCSSPrefix + 'next-month',
    currentMonthCls: Ext.baseCSSPrefix + 'current-month',
    
    // Yes we want this on the prototype. It's not configurable.
    firstOfMonth: Ext.Date.getFirstDateOfMonth(new Date()),
    
    initElement: function() {
        var me = this;
        
        me.callParent();
        
        me.headCells = me.headElement.select('th');
        me.bodyCells = me.bodyElement.select('td', true);
        me.cellMap = {};
    },
    
    getMonth: function() {
        return Ext.Date.add(this.firstOfMonth, Ext.Date.MONTH, this.getMonthOffset());
    },
    
    getTemplate: function() {
        var me = this,
            table = me.tableTpl,
            headRow = me.headRowTpl,
            headCell = me.headCellTpl,
            bodyRow = me.bodyRowTpl,
            bodyCell = me.bodyCellTpl,
            rows = me.rows,
            columns = me.columns,
            headTpl, bodyTpl, i, len;
        
        headRow = Ext.apply({
            children: []
        }, headRow);
        
        bodyRow = Ext.apply({
            children: []
        }, bodyRow);
        
        for (i = 0, len = columns; i < len; i++) {
            headRow.children.push(headCell);
            bodyRow.children.push(bodyCell);
        }
        
        headTpl = Ext.apply({
            children: []
        }, me.headTpl);
        
        headTpl.children.push(headRow);
        
        bodyTpl = Ext.apply({
            children: []
        }, me.bodyTpl);
        
        for (i = 0, len = rows; i < len; i++) {
            bodyTpl.children.push(bodyRow);
        }

        table.children = [me.captionTpl, headTpl, bodyTpl];
        
        return [table];
    },
    
    getCellByDate: function(date) {
        return date ? this.cellMap[date.getTime()] : null;
    },
    
    updateWeekendDays: function() {
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    
    updateStartDay: function(dayIndex) {
        var cells = this.headCells,
            weekendDays = this.getWeekendDays(),
            weekendCls = this.weekendDayCls,
            headerLength = this.getHeaderLength(),
            cell, i, len;
        
        // We want to do this even during initial config
        for (i = 0, len = cells.getCount(); i < len; i++) {
            cell = cells.item(i);
            cell.dom.firstChild.innerHTML =
                Ext.Date.getShortDayName((i + dayIndex) % 7).substr(0, headerLength);
            
            cell.toggleCls(weekendCls, !!weekendDays[i]);
        }
    },
    
    updateDisabledDays: function() {
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    
    updateMinDate: function() {
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    
    updateMaxDate: function() {
        if (!this.isConfiguring) {
            this.refresh();
        }
    },
    
    applyFocusedDate: function(focusedDate) {
        return Ext.Date.clearTime(focusedDate);
    },
    
    updateFocusedDate: function() {
        this.refresh();
    },
    
    applyMonthOffset: function(offset) {
        return !isNaN(offset) ? offset : 0;
    },
    
    updateMonthOffset: function() {
        this.refresh();
    },
    
    updateCaptionFormat: function(format) {
        var month = this.getMonth();
        
        if (month) {
            this.captionElement.setHtml(Ext.Date.format(month, format));
        }
    },
    
    updateHideCaption: function(hide) {
        this.captionElement.setVisible(!hide);
    },
    
    refresh: function() {
        var me = this,
            ExtDate = Ext.Date,
            cells = me.bodyCells,
            monthStart, startOffset, startDate, startDay, date,
            cellMap, cell, params, i, len;
        
        // Calling getters might cause recursive refresh() calls, we don't want that
        if (me.refreshing) {
            return;
        }
        
        me.refreshing = true;
        
        monthStart = me.getMonth();
        startDay = me.getStartDay();
        startOffset = startDay - monthStart.getDay();
        
        if (startOffset > 0) {
            startOffset -= 7;
        }
        
        startDate = ExtDate.add(monthStart, ExtDate.DAY, startOffset);
        
        cellMap = me.cellMap = {};
        
        params = {
            today: Ext.Date.clearTime(new Date()),
            focusedDate: me.getFocusedDate(),
            weekendDays: me.getWeekendDays(),
            specialDates: me.getSpecialDates(),
            disabledDays: me.getDisabledDays(),
            disabledDates: me.getDisabledDates(),
            minDate: me.getMinDate(),
            maxDate: me.getMaxDate(),
            format: me.getFormat(),
            dateCellFormat: me.getDateCellFormat(),
            currentMonth: monthStart.getMonth()
        };
        
        for (i = 0, len = cells.getCount(); i < len; i++) {
            cell = cells.item(i);
            
            date = ExtDate.add(startDate, ExtDate.DAY, i);
            
            cellMap[date.getTime()] = cell;
            
            params.cell = cell.dom;
            params.date = date;
            
            me.refreshCell(params);
        }
        
        me.captionElement.setHtml(Ext.Date.format(monthStart, me.getCaptionFormat()));
        
        me.refreshing = false;
    },
    
    refreshCell: function(params) {
        var me = this,
            cell = params.cell,
            date = params.date,
            dayOfWeek = date.getDay(),
            month = date.getMonth(),
            ms = date.getTime(),
            currentMonth = params.currentMonth,
            specialDates = params.specialDates,
            disabledDates = params.disabledDates,
            disabled = false,
            cls = [me.cellCls],
            formatted = Ext.Date.format(date, params.format),
            html;
        
        if (Ext.Date.isEqual(date, params.focusedDate)) {
            cls.push(me.focusedCls);
        }
        
        if (month < currentMonth) {
            cls.push(me.prevMonthCls);
        }
        else if (month > currentMonth) {
            cls.push(me.nextMonthCls);
        }
        else {
            cls.push(me.currentMonthCls);
            
            // Today should not be marked in previous or next month
            if (Ext.Date.isEqual(date, params.today)) {
                cls.push(me.todayCls);
            }
        }
        
        if (params.weekendDays[dayOfWeek]) {
            cls.push(me.weekendDayCls);
        }
        
        if (specialDates.dates[ms] || (specialDates.re && specialDates.re.test(formatted))) {
            cls.push(me.specialDateCls);
        }
        
        disabled = (params.minDate && ms < params.minDate.getTime()) ||
                   (params.maxDate && ms > params.maxDate.getTime()) ||
                   params.disabledDays[dayOfWeek] ||
                   disabledDates.dates[ms] ||
                   (disabledDates.re && disabledDates.re.test(formatted));
        
        if (disabled) {
            cls.push(me.disabledDayCls);
        }
        
        cell.tabIndex = -1;
        html = Ext.Date.format(date, params.dateCellFormat);
        
        if (cell.firstChild.innerHTML !== html) {
            cell.firstChild.innerHTML = html;
        }
        
        if (me.transformCellCls) {
            me.transformCellCls(date, cls);
        }
        
        cell.className = cls.join(' ');
        
        // We need this in event handlers
        cell.date = date;
        cell.disabled = disabled;
    },
    
    doDestroy: function() {
        this.headCells.destroy();
        this.bodyCells.destroy();
        this.callParent();
    }
});
