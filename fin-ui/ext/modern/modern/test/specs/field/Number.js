topSuite("Ext.field.Number", function() {
    var field;
    
    function createField(config) {
        if (field) {
            field.destroy();
        }
        
        config = Ext.apply({
        }, config);
        
        field = new Ext.field.Number(config);
    }

    function render(f) {
        f = f || field;

        if (f.getFloated()) {
            f.show();
        } else {
            f.render(Ext.getBody());
        }
    }

    afterEach(function() {
        if (field) {
            field.destroy();
        }
    });
    
    describe("configurations", function() {
        describe("minValue", function() {
            var defaultConfig = {
                minValue: 10
            };
            describe("configuration", function() {
                it('should create number input', function () {
                    createField();

                    var inputEl = field.inputElement;

                    expect(inputEl.getAttribute('type')).toBe('number');
                });

                it("should add the min attribute to the inputEl", function() {
                    createField(defaultConfig);
                    render();
                    
                    expect(field).toHaveAttribute('min', 10);
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the min attribute to the inputEl", function() {
                            createField();
                            field.setMinValue(10);
                            render();

                            expect(field).toHaveAttribute('min', 10);
                        });
                    });

                    describe("after render", function() {
                        it("should add the min attribute to the inputEl", function() {
                            createField();
                            render();
                            field.setMinValue(10);

                            expect(field).toHaveAttribute('min', 10);
                        });
                    });
                });

                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the min attribute from the inputEl", function() {
                            createField(defaultConfig);
                            field.setMinValue(null);
                            render();

                            expect(field).not.toHaveAttribute('min');
                        });
                    });

                    describe("after render", function() {
                        it("should remove the min attribute from the inputEl", function() {
                            createField(defaultConfig);
                            render();
                            field.setMinValue(null);

                            expect(field).not.toHaveAttribute('min');
                        });
                    });
                });
            });

            describe('setValue', function () {
                it('should transform value if above minValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(5);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });

                it('should update inputElement when value parsed to minValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(5);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');

                    field.inputElement.dom.value = 0;

                    field.setValue(0);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });
            });
        });

        describe("maxValue", function() {
            var defaultConfig = {
                maxValue: 10
            };

            describe("configuration", function() {
                it("should add the max attribute to the inputEl", function() {
                    createField(defaultConfig);
                    render();
                    
                    expect(field).toHaveAttribute('max', 10);
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the max attribute to the inputEl", function() {
                            createField();
                            field.setMaxValue(10);
                            render();

                            expect(field).toHaveAttribute('max', 10);
                        });
                    });

                    describe("after render", function() {
                        it("should add the max attribute to the inputEl", function() {
                            createField();
                            render();
                            field.setMaxValue(10);

                            expect(field).toHaveAttribute('max', 10);
                        });
                    });
                });

                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the max attribute from the inputEl", function() {
                            createField(defaultConfig);
                            field.setMaxValue(null);
                            render();

                            expect(field).not.toHaveAttribute('max');
                        });
                    });

                    describe("after render", function() {
                        it("should remove the max attribute from the inputEl", function() {
                            createField(defaultConfig);
                            render();
                            field.setMaxValue(null);

                            expect(field).not.toHaveAttribute('max');
                        });
                    });
                });
            });

            describe('setValue', function () {
                it('should transform value if above maxValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(20);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });

                it('should update inputElement when value parsed to maxValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(20);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');

                    field.inputElement.dom.value = 15;

                    field.setValue(15);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });
            });
        });

        describe("stepValue", function() {
            var defaultConfig = {
                stepValue: 10
            };

            describe("configuration", function() {
                it("should add the step attribute to the inputEl", function() {
                    createField(defaultConfig);
                    render();
                    
                    expect(field).toHaveAttribute('step', 10);
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the step attribute to the inputEl", function() {
                            createField();
                            field.setStepValue(10);
                            render();

                            expect(field).toHaveAttribute('step', 10);
                        });
                    });

                    describe("after render", function() {
                        it("should add the step attribute to the inputEl", function() {
                            createField();
                            render();
                            field.setStepValue(10);

                            expect(field).toHaveAttribute('step', 10);
                        });
                    });
                });


                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the step attribute from the inputEl", function() {
                            createField(defaultConfig);
                            field.setStepValue(null);
                            render();

                            expect(field).not.toHaveAttribute('step');
                        });

                    });

                    describe("after render", function() {
                        it("should remove the step attribute from the inputEl", function() {
                            createField(defaultConfig);
                            render();
                            field.setStepValue(null);

                            expect(field).not.toHaveAttribute('step');
                        });
                    });
                });
            });
        });
    });

    describe("getValue", function() {
        describe("when value is null", function() {
            beforeEach(function() {
                createField();
            });

            it("should return null", function() {
                expect(field.getValue()).toBeNull();
            });
        });

        describe("when value is a number", function() {
            beforeEach(function() {
                createField({
                    value: 123
                });
            });

            it("should return 123", function() {
                expect(field.getValue()).toEqual(123);
            });
        });

        describe("when value is 0", function() {
            beforeEach(function() {
                createField({
                    value: 0
                });
            });

            it("should return 0", function() {
                expect(field.getValue()).toEqual(0);
            });
        });

        describe("when value is -123", function() {
            beforeEach(function() {
                createField({
                    value: -123
                });
            });

            it("should return -123", function() {
                expect(field.getValue()).toEqual(-123);
            });
        });

        describe("when value is a string", function() {
            beforeEach(function() {
                createField({
                    value: '123'
                });
            });

            it("should return 123", function() {
                expect(field.getValue()).toEqual(123);
            });
        });
    });

    describe("setValue", function() {
        describe("null value", function() {
            beforeEach(function() {
                createField();
            });

            describe("when value is a number", function() {
                it("should set the value to 123", function() {
                    field.setValue(123);
                    expect(field.getValue()).toEqual(123);
                });
            });

            describe("when value is a string", function() {
                it("should set the value to 123", function() {
                    field.setValue('123');
                    expect(field.getValue()).toEqual(123);
                });
            });

            describe("when value is a negative value", function() {
                it("should set the value to -123", function() {
                    field.setValue(-123);
                    expect(field.getValue()).toEqual(-123);
                });
            });

            describe("when value is a negative value as as tring", function() {
                it("should set the value to -123", function() {
                    field.setValue('-123');
                    expect(field.getValue()).toEqual(-123);
                });
            });

            describe("when value is 0", function() {
                it("should set the value to 0", function() {
                    field.setValue(0);
                    expect(field.getValue()).toEqual(0);
                });
            });

            describe("when value is 0 as string", function() {
                it("should set the value to 0", function() {
                    field.setValue('0');
                    expect(field.getValue()).toEqual(0);
                });
            });
        });
    });
    
    describe("decimals", function() {
        beforeEach(function() {
            createField();
        });
        
        it("should round the value to configured decimal precision", function() {
            field.setValue(0.1 + 0.2);
            
            expect(field.inputElement.dom.value).toBe('0.3');
        });
    });
});
