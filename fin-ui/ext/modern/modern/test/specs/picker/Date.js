topSuite("Ext.picker.Date", [
    'Ext.viewport.Viewport'
], function() {
    var viewport, datePicker;

    jasmine.usesViewport();  // setup in beforeAll, teardown in afterAll

    function makeDatePicker (value) {
        datePicker = Ext.create('Ext.picker.Date', {
            value: value || null
        });

        Ext.Viewport.add(datePicker);
    } 
    
    afterEach(function() {
        datePicker = Ext.destroy(datePicker);
    });

    describe("create", function() {
        it("should assign an initial value if one was specified in the config", function() {
            var date = new Date();

            makeDatePicker(date);

            datePicker.show(false);

            expect(datePicker.getValue()).toEqual(Ext.Date.clearTime(date));
        });
    });
});
