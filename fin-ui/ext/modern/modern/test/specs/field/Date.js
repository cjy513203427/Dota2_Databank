topSuite("Ext.field.Date", ['Ext.viewport.Viewport'],
function() {
    jasmine.usesViewport(); // setup in beforeAll, teardown in afterAll

    var today = Ext.Date.clearTime(new Date()),
        field;

    function makeField(cfg) {
        field = new Ext.field.Date(cfg);
        if (field.getFloated()) {
            field.show();
        } else {
            field.render(Ext.getBody());
        }
    }

    afterEach(function() {
        field = Ext.destroy(field);
    });

    describe("setValue", function() {
        it("should take accept a date object", function() {
            makeField();
            field.setValue(new Date(2010, 0, 1));
            expect(field.getValue()).toEqual(new Date(2010, 0, 1));
        });

        it("should accept a string that matches the dateFormat", function() {
            makeField({
                dateFormat: 'Y-m-d'
            });
            field.setValue('2010-01-01');
            expect(field.getValue()).toEqual(new Date(2010, 0, 1));
        });

        it("should return the string for a string that does not match the format", function() {
            makeField({
                dateFormat: 'Y-m-d'
            });
            field.setValue('01/01/2010');
            expect(field.getValue()).toBe('01/01/2010');
        });

        it("should update the text field with the formatted value when specifying a date", function() {
            makeField({
                dateFormat: 'Y-m-d'
            });
            field.setValue(new Date(2010, 0, 1));
            expect(field.inputElement.dom.value).toBe('2010-01-01');
        });

        it("should clear the text field when specifying null", function() {
            makeField({
                dateFormat: 'Y-m-d'
            });
            field.setValue(new Date(2010, 0, 1));
            field.setValue(null);
            expect(field.inputElement.dom.value).toBe('');
        });

        describe("events", function() {
            var spy;
            beforeEach(function() {
                spy = jasmine.createSpy();
                makeField();
                field.on('change', spy);
            });

            afterEach(function() {
                spy = null;
            });

            it("should fire the change event when setting a value", function() {
                field.setValue(new Date(2010, 0, 1));
                expect(spy.callCount).toBe(1);
                expect(spy.mostRecentCall.args[0]).toBe(field);
                expect(spy.mostRecentCall.args[1]).toEqual(new Date(2010, 0, 1));
                expect(spy.mostRecentCall.args[2]).toBeNull(field);
            });

            it("should fire the change event when changing a value", function() {
                field.setValue(new Date(2010, 0, 1));
                spy.reset();
                field.setValue(new Date(2010, 11, 31));
                expect(spy.callCount).toBe(1);
                expect(spy.mostRecentCall.args[0]).toBe(field);
                expect(spy.mostRecentCall.args[1]).toEqual(new Date(2010, 11, 31));
                expect(spy.mostRecentCall.args[2]).toEqual(new Date(2010, 0, 1));
            });

            it("should fire the change event when clearing a value", function() {
                field.setValue(new Date(2010, 0, 1));
                spy.reset();
                field.setValue(null);
                expect(spy.callCount).toBe(1);
                expect(spy.mostRecentCall.args[0]).toBe(field);
                expect(spy.mostRecentCall.args[1]).toBeNull();
                expect(spy.mostRecentCall.args[2]).toEqual(new Date(2010, 0, 1));
            });

            it("should not fire the change event when setting the same date", function() {
                field.setValue(new Date(2010, 0, 1));
                spy.reset();
                field.setValue(new Date(2010, 0, 1));
                expect(spy).not.toHaveBeenCalled();
            });
        });
    });

    describe("getValue", function() {
        it("should return a date object when configured with a value", function() {
            makeField({
                value: new Date(2010, 0, 1)
            });
            expect(field.getValue()).toEqual(new Date(2010, 0, 1));
        });

        it("should return a date object after having a value set", function() {
            makeField();
            field.setValue(new Date(2010, 0, 1));
            expect(field.getValue()).toEqual(new Date(2010, 0, 1));
        });

        it("should return null when not configured with a value", function() {
            makeField();
            expect(field.getValue()).toBeNull();
        });

        it("should return null after clearing a value", function() {
            makeField({
                value: new Date(2010, 0, 1)
            });
            field.setValue(null);
            expect(field.getValue()).toBeNull();
        });
    });

    describe("getFormattedValue", function() {
        it("should return the formatted value when configured with a value", function() {
            makeField({
                dateFormat: 'Y-m-d',
                value: new Date(2010, 0, 1)
            });
            expect(field.getFormattedValue()).toBe('2010-01-01');
        });

        it("should return the formatted value after having a value set", function() {
            makeField({
                dateFormat: 'Y-m-d'
            });
            field.setValue(new Date(2010, 0, 1));
            expect(field.getFormattedValue()).toBe('2010-01-01');
        });

        it("should favour a passed format over the class format", function() {
            makeField({
                dateFormat: 'd/m/Y'
            });
            field.setValue(new Date(2010, 0, 1));
            expect(field.getFormattedValue('Y-m-d')).toBe('2010-01-01');
        });

        it("should return '' when not configured with a value", function() {
            makeField();
            expect(field.getFormattedValue()).toBe('');
        });

        it("should return '' after clearing a value", function() {
            makeField({
                value: new Date(2010, 0, 1)
            });
            field.setValue(null);
            expect(field.getFormattedValue()).toBe('');
        });
    });

    describe("minDate", function() {
        it("should accept Date object", function() {
            makeField({
                minDate: new Date()
            });

            expect(field.getMinDate()).toEqual(today);
        });

        it("should accept string in dateFormat", function() {
            makeField({
                minDate: Ext.Date.format(today, Ext.util.Format.defaultDateFormat)
            });

            expect(field.getMinDate()).toEqual(today);
        });
    });

    describe("maxDate", function() {
        it("should accept Date object", function() {
            makeField({
                maxDate: new Date()
            });

            expect(field.getMaxDate()).toEqual(today);
        });

        it("should accept string in dateFormat", function() {
            makeField({
                maxDate: Ext.Date.format(today, Ext.util.Format.defaultDateFormat)
            });

            expect(field.getMaxDate()).toEqual(today);
        });
    });

    describe("picker", function() {
        var oldPlatformTags;

        beforeEach(function() {
            oldPlatformTags = Ext.platformTags;
            makeField();
        });

        afterEach(function() {
            Ext.platformTags = oldPlatformTags;
            field = Ext.destroy(field);
        });

        it("should choose edge picker on a phone", function() {
            Ext.platformTags.phone = true;

            var picker = field.getPicker();

            expect(picker.xtype).toBe('datepicker');
        });

        it("should choose floated picker when not on a phone", function() {
            Ext.platformTags.phone = false;

            var picker = field.getPicker();

            expect(picker.xtype).toBe('datepanel');
        });

        it('should set value onto edge picker', function () {
            var date = new Date();

            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            Ext.platformTags.phone = true;

            field.setValue(date);

            var picker = field.getPicker();

            expect(picker.getValue()).toEqual(new Date(date));
        });

        it('should set value onto floated picker', function () {
            var date = new Date();

            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            field.setValue(date);

            var picker = field.getPicker();

            expect(picker.getValue()).toEqual(new Date(date));
        });
    });

    describe('validate', function () {
        it('should validate date object', function () {
            makeField({
                validators: 'date'
            });

            field.setValue(new Date());

            expect(field.validate()).toBe(true);
        });

        it('should validate date string', function () {
            makeField({
                validators: 'date'
            });

            field.setValue('01/01/2017');

            expect(field.validate()).toBe(true);
        });
    });
});
