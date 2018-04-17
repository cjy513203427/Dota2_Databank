topSuite("Ext.field.Spinner", function() {
    var field,
        createField = function(config) {
            if (field) {
                field.destroy();
            }

            field = Ext.create('Ext.field.Spinner', config || {});
        };

    afterEach(function() {
        if (field) {
            field.destroy();
        }
    });

    describe("configurations", function() {
        describe("stepValue", function() {
            beforeEach(function() {
                createField({
                    stepValue: 1,
                    value: 10
                });
            });

            it("should increase the value by 1", function() {
                field.spin();
                expect(field.getValue()).toEqual(11);
            });

            it("should decrease the value by 1", function() {
                field.spin(true);
                expect(field.getValue()).toEqual(9);
            });

            describe("setter", function() {
                beforeEach(function() {
                    field.setStepValue(5);
                });

                it("should increase the value by 5", function() {
                    field.spin();
                    expect(field.getValue()).toEqual(15);
                });

                it("should decrease the value by 5", function() {
                    field.spin(true);
                    expect(field.getValue()).toEqual(5);
                });
            });
        });

        describe("applyValue", function() {
            it('should show 0 as default value', function () {
                createField();

                expect(field.getValue()).toBe(0);
            });

            it("should accept fractional values", function() {
                createField({
                    stepValue: 0.1,
                    value: 0.01
                });
                expect(field.getValue()).toEqual(0.01);
                field.destroy();
                createField({
                    stepValue: 1,
                    value: 0.5
                });
                expect(field.getValue()).toEqual(0.5);
            });
            it("should convert string to number", function() {
                createField({
                    stepValue: 0.1,
                    value: '.01'
                });
                expect(field.getValue()).toEqual(0.01);
                field.destroy();
                createField({
                    stepValue: 0.1,
                    value: '.5'
                });
                expect(field.getValue()).toEqual(0.5);
            });
        });

        describe("minValue", function() {
            beforeEach(function() {
                createField({
                    minValue: 9.9,
                    value: 10
                });
            });

            it("should stop decreasing at 9.8", function() {
                field.spin(true);
                field.spin(true);
                field.spin(true);
                field.spin(true);
                field.spin(true);
                field.spin(true);
                expect(field.getValue()).toEqual(9.9);
            });

            describe("setter", function() {
                beforeEach(function() {
                    field.setMinValue(9.8);
                });

                it("should stop decreasing at 9.8", function() {
                    field.spin(true);
                    field.spin(true);
                    field.spin(true);
                    field.spin(true);
                    field.spin(true);
                    field.spin(true);
                    expect(field.getValue()).toEqual(9.8);
                });
            });
        });

        describe("maxValue", function() {
            beforeEach(function() {
                createField({
                    maxValue: 10.1,
                    value: 10
                });
            });

            it("should stop increasing at 10.1", function() {
                field.spin();
                field.spin();
                field.spin();
                field.spin();
                field.spin();
                field.spin();
                expect(field.getValue()).toEqual(10.1);
            });

            xdescribe("setter", function() {
                beforeEach(function() {
                    field.setMaxValue(10.2);
                });

                it("should stop decreasing at 10.2", function() {
                    field.spin();
                    field.spin();
                    field.spin();
                    field.spin();
                    field.spin();
                    field.spin();
                    expect(field.getValue()).toEqual(10.2);
                });
            });
        });

        describe("cycle", function() {
            beforeEach(function() {
                createField({
                    cycle: true,
                    value: 10,
                    minValue: 8,
                    maxValue: 12,
                    stepValue: 1
                });
            });

            it("should cycle back to the minValue when it hits the maxValue", function() {
                field.spin();
                field.spin();
                field.spin();
                expect(field.getValue()).toEqual(8);
            });

            it("should cycle back to the maxValue when it hits the minValue", function() {
                field.spin(true);
                field.spin(true);
                field.spin(true);
                expect(field.getValue()).toEqual(12);
            });
        });
    });
});
