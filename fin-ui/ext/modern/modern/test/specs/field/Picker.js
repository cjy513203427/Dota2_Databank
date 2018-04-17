topSuite("Ext.field.Picker", ['Ext.Button', 'Ext.picker.Picker'], function() {
    var oldPlatformTags, field, picker;

    jasmine.usesViewport();

    function makeField(cfg) {
        field = new Ext.field.Picker(cfg);
        
        if (field.getFloated()) {
            field.show();
        }
        else {
            field.render(Ext.getBody());
        }
    }

    beforeEach(function () {
        oldPlatformTags = Ext.platformTags;
    });

    afterEach(function() {
        Ext.platformTags = oldPlatformTags;

        field = picker = Ext.destroy(field);
    });

    describe("picker type", function() {
        beforeEach(function() {
            makeField({
                createEdgePicker: function() {
                    return new Ext.Component({
                        ownerCmp: this,
                        isViewportMenu: true,
                        where: 'edge'
                    });
                },
                
                createFloatedPicker: function() {
                    return new Ext.Component({
                        ownerCmp: this,
                        where: 'floated'
                    });
                }
            });
        });

        it("should choose edge picker on a phone", function() {
            Ext.platformTags.phone = true;
            
            picker = field.getPicker();
            
            expect(picker.where).toBe('edge');
            expect(field.pickerType).toBe('edge');
        });
        
        it("should choose floated picker when not on a phone", function() {
            Ext.platformTags.phone = false;
            
            picker = field.getPicker();
            
            expect(picker.where).toBe('floated');
            expect(field.pickerType).toBe('floated');
        });
    });

    describe('showPicker', function () {
        beforeEach(function() {
            makeField({
                createEdgePicker: function() {
                    return new Ext.picker.Picker({
                        ownerCmp: this,
                        slots: [{
                            name: 'name',
                            data: [{
                                text: 'Bar',
                                value: 'bar'
                            }, {
                                text: 'Baz',
                                value: 'baz'
                            }, {
                                text: 'Foo',
                                value: 'foo'
                            }]
                        }]
                    });
                }
            });
        });

        it('should set value to picker on show', function () {
            Ext.platformTags.phone = true;

            field.setValue('foo');

            field.expand();

            picker = field.getPicker();

            expect(field.pickerType).toBe('edge');
            expect(picker.getValue(true)).toEqual({
                name: 'foo'
            });
        });
    });
    
    describe("input veil", function() {
        var veil, button, expandSpy, collapseSpy;
        
        beforeEach(function() {
            button = new Ext.Button({
                text: 'foo',
                renderTo: document.body
            });
            
            expandSpy = jasmine.createSpy('expand');
            collapseSpy = jasmine.createSpy('collapse');
            
            makeField({
                createEdgePicker: function() {
                    return new Ext.Component({
                        ownerCmp: this,
                        where: 'edge'
                    });
                },
                
                createFloatedPicker: function() {
                    return new Ext.Component({
                        ownerCmp: this,
                        where: 'floated'
                    });
                },
                
                listeners: {
                    expand: expandSpy,
                    collapse: collapseSpy
                }
            });
            
            veil = field.inputVeilElement;
        });
        
        afterEach(function() {
            veil = button = expandSpy = collapseSpy = Ext.destroy(button);
        });
        
        (Ext.supports.Touch ? describe : xdescribe)("veiled input", function() {
            it("should have veil element rendered", function() {
                var el = field.inputWrapElement.down('.' + Ext.baseCSSPrefix + 'input-veil-el', true);
                
                expect(el.parentElement).toBe(field.inputWrapElement.dom);
            });
            
            describe("veil tap", function() {
                beforeEach(function() {
                    Ext.testHelper.tap(veil);
                });
                
                it("should hide the veil", function() {
                    expect(veil.isVisible()).toBe(false);
                });
                
                it("should expand the picker", function() {
                    expect(expandSpy).toHaveBeenCalled();
                });
            });
            
            describe("veiling up", function() {
                it("should show the veil on focus out", function() {
                    Ext.testHelper.tap(veil);
                    
                    waitForSpy(expandSpy);
                    
                    runs(function() {
                        focusAndExpect(field.inputElement);
                    });
                    
                    runs(function() {
                        Ext.testHelper.tap(button.el);
                        button.focus();
                    });
                    
                    expectFocused(button);
                    
                    waitForSpy(collapseSpy);
                    
                    runs(function() {
                        expect(veil.isVisible()).toBe(true);
                    });
                });
                
                it("should show the veil on collapse when input element was not focused", function() {
                    focusAndExpect(button);
                    
                    runs(function() {
                        Ext.testHelper.tap(veil);
                    });
                    
                    waitsForSpy(expandSpy);
                    
                    runs(function() {
                        expect(veil.isVisible()).toBe(false);
                        Ext.testHelper.tap(button.el);
                    });
                    
                    waitsForSpy(collapseSpy);
                    
                    runs(function() {
                        expect(veil.isVisible()).toBe(true);
                    });
                });
            });
        });
        
        (Ext.supports.Touch ? xdescribe : describe)("non-veiled input", function() {
            it("should not have veil element rendered", function() {
                var el = field.inputWrapElement.down('.' + Ext.baseCSSPrefix + 'input-veil-el', true);
                
                expect(el).toBe(null);
            });
            
            it("should not have inputVeil property", function() {
                expect(field.inputVeilElement).not.toBeDefined();
            });
        });
    });
});
