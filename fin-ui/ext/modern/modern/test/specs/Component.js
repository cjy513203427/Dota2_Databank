/* global Ext, expect */

topSuite("Ext.Component",
    ['Ext.Container', 'Ext.app.ViewModel', 'Ext.layout.HBox',
     'Ext.layout.VBox', 'Ext.Mask'],
function() {
    var component;

    function makeComponent(config) {
        return component = new Ext.Component(config);
    }

    var elHasCls = function(cls) {
        var el = component.element;

        return el.hasCls(cls);
    };

    afterEach(function() {
        component = Ext.destroy(component);
    });

    describe('configuration', function() {
        it('should not fire show/hide events during configuration', function() {
            var beforeShowCalled = false,
                showCalled = false,
                beforeHideCalled = false,
                hideCalled = false,
                InstrumentedComponent = Ext.define(null, {
                    extend: 'Ext.Component',

                    fireEvent: function(eventName) {
                        if (eventName === 'beforeshow') {
                            beforeShowCalled = true;
                        }
                        if (eventName === 'show') {
                            showCalled = true;
                        }
                        if (eventName === 'beforehide') {
                            beforeHideCalled = true;
                        }
                        if (eventName === 'hide') {
                            hideCalled = true;
                        }
                        this.callParent(arguments);
                    }
                });

            component = new InstrumentedComponent();
            Ext.destroy(component);
            // "hide" is fired during destroy
            hideCalled = false;
            component = new InstrumentedComponent({hidden: true});

            expect(beforeShowCalled).toBe(false);
            expect(showCalled).toBe(false);
            expect(beforeHideCalled).toBe(false);
            expect(hideCalled).toBe(false);
        });
    });

    describe("bind", function() {
        describe("defaultBindProperty", function() {
            it("should bind with a string", function() {
                makeComponent({
                    renderTo: Ext.getBody(),
                    viewModel: {
                        data: {
                            theHtml: 'foo'
                        }
                    },
                    bind: '{theHtml}'
                });

                // The component's defaultBindProperty is bound
                expect(component.isBound(component.defaultBindProperty)).toBe(true);

                // No arg version should check defaultBindProperty
                expect(component.isBound()).toBe(true);

                component.getViewModel().notify();
                expect(component.getInnerHtmlElement().dom.innerHTML).toBe('foo');
            });

            it("should throw an exception if we have no default bind", function() {
                expect(function() {
                    makeComponent({
                        id: 'this-should-throw',
                        defaultBindProperty: '',
                        viewModel: {
                            data: {
                                theHtml: 'foo'
                            }
                        },
                        bind: '{theHtml}'
                    });

                    // Any arbitrary name will return false as not being bound
                    expect(component.isBound('foo')).toBe(false);

                    // No defaultBindProperty - should return false
                    expect(component.isBound()).toBe(false);

                    component.getBind();
                }).toThrow();
                // The exception prevented the assoignment to the component var, but the
                // component MUST be cleaned up in the afterEach to prevent ViewModel/Scheduler
                // timer leaks, so we must collect the component into the var now.
                component = Ext.getCmp('this-should-throw');
            });
        });
    });

    describe("'cls' methods", function() {
        var spy;
        var spacesRe = /\s+/;

        function getClsList (el) {
            if (el.isWidget) {
                el = el.el;
            }

            var list = el.dom.className.split(spacesRe);

            Ext.Array.remove(list, 'x-root');
            Ext.Array.remove(list, 'x-component');

            return list;
        }

        function getClsMap (el) {
            var classes = getClsList(el);
            var map = {};

            while (classes.length) {
                map[classes.pop()] = 1;
            }

            return map;
        }

        function expectCls (el, cls) {
            if (el.isWidget) {
                el = el.el;
            }

            var classes = typeof cls === 'string' ? cls.split(' ') : cls;
            var map = getClsMap(el);

            while (classes.length) {
                var c = classes.pop();

                if (c) {
                    if (!map[c]) {
                        Ext.raise('Expected element to have class "' + c +
                            '" but it had these "' + el.dom.className + '"');
                    }

                    delete map[c];
                }
            }

            classes = Ext.Object.getKeys(map);
            if (classes.length) {
                Ext.raise('Expected cls to have only "' + cls + '" but found "' +
                    classes.join(' ') + '"');
            }
        }

        describe("configuration", function() {
            it("should start empty", function() {
                makeComponent();

                expectCls(component, '');
            });

            it("should convert a string into an array", function() {
                makeComponent({
                    cls: 'one'
                });

                expect(component.getCls()).toEqual(['one']);
            });

            it("should accept an array", function() {
                makeComponent({
                    cls: ['one', 'two']
                });

                expect(component.getCls()).toEqual(['one', 'two']);
            });
        });

        describe("addCls", function() {
            beforeEach(function() {
                makeComponent();
            });

            describe("no prefix/suffix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one');
                    expectCls(component, 'one');
                    expect(getClsMap(component)).toEqual({ one: 1 });

                    component.addCls('two');
                    expectCls(component, 'one two');
                    expect(getClsMap(component)).toEqual({ one: 1, two: 1 });
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two']);
                    expectCls(component, 'one two');

                    component.addCls(['two', 'three']);
                    expectCls(component, 'one two three');
                    expect(getClsMap(component)).toEqual({ one: 1, two: 1, three: 1 });
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one');
                    expectCls(component, 'one');

                    component.addCls(['two', 'three']);
                    expectCls(component, 'one two three');
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three']);
                    expectCls(component, 'two three');

                    component.addCls('one');
                    expectCls(component, 'one two three');
                });
            });

            describe("prefix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one', 'x-');
                    expectCls(component, 'x-one');

                    component.addCls('two', 'x-');
                    expectCls(component, 'x-one x-two');
                });

                it("should trim spaces and add it to the component", function() {
                    component.addCls('   one   ', 'x-');
                    expectCls(component, 'x-one');

                    component.addCls('two', 'x-');
                    expectCls(component, 'x-one x-two');
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two'], 'x-');
                    expectCls(component, 'x-one x-two');

                    component.addCls(['two', 'three'], 'x-');
                    expectCls(component, 'x-one x-two x-three');
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one', 'x-');
                    expectCls(component, 'x-one');

                    component.addCls(['two', 'three'], 'x-');
                    expectCls(component, 'x-one x-two x-three');
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three'], 'x-');
                    expectCls(component, 'x-two x-three');

                    component.addCls('one', 'x-');
                    expectCls(component, 'x-one x-two x-three');
                });
            });

            describe("suffix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one', null, '-y');
                    expectCls(component, 'one-y');

                    component.addCls('two', null, '-y');
                    expectCls(component, 'one-y two-y');
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two'], null, '-y');
                    expectCls(component, 'one-y two-y');

                    component.addCls(['two', 'three'], null, '-y');
                    expectCls(component, 'one-y two-y three-y');
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one', null, '-y');
                    expectCls(component, 'one-y');

                    component.addCls(['two', 'three'], null, '-y');
                    expectCls(component, 'one-y two-y three-y');
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three'], null, '-y');
                    expectCls(component, 'two-y three-y');

                    component.addCls('one', null, '-y');
                    expectCls(component, 'one-y two-y three-y');
                });
            });

            describe("prefix + suffix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one', 'x-', '-y');
                    expectCls(component, 'x-one-y');

                    component.addCls('two', 'x-', '-y');
                    expectCls(component, 'x-one-y x-two-y');
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two'], 'x-', '-y');
                    expectCls(component, 'x-one-y x-two-y');

                    component.addCls(['two', 'three'], 'x-', '-y');

                    expectCls(component, 'x-one-y x-two-y x-three-y');
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one', 'x-', '-y');
                    expectCls(component, 'x-one-y');

                    component.addCls(['two', 'three'], 'x-', '-y');
                    expectCls(component, 'x-one-y x-two-y x-three-y');
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three'], 'x-', '-y');
                    expectCls(component, 'x-two-y x-three-y');

                    component.addCls('one', 'x-', '-y');
                    expectCls(component, 'x-one-y x-two-y x-three-y');
                });
            });
        });

        describe("removeCls", function() {
            describe("no prefix/suffix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        var s = component.el.dom.className;

                        component.removeCls('one');

                        expect(component.el.dom.className).toEqual(s);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one'
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.removeCls('one');

                        expect(getClsList(component)).toEqual([]);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.removeCls(['one']);

                        expect(getClsList(component)).toEqual([]);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one', 'two']
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.removeCls('two');

                        expectCls(component, 'one');
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.removeCls(['one']);

                        expectCls(component, 'two');
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.removeCls(['one', 'two']);

                        expect(getClsList(component)).toEqual([]);
                    });
                });
            });

            describe("prefix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        var s = component.el.dom.className;

                        component.removeCls('one', 'x-');

                        expect(component.el.dom.className).toEqual(s);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one'
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.removeCls('one', 'x-');

                        expect(getClsList(component)).toEqual([]);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.removeCls(['one'], 'x-');

                        expect(getClsList(component)).toEqual([]);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one', 'x-two']
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.removeCls('two', 'x-');

                        expectCls(component, 'x-one');
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.removeCls(['one'], 'x-');

                        expectCls(component, 'x-two');
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.removeCls(['one', 'two'], 'x-');

                        expect(getClsList(component)).toEqual([]);
                    });
                });
            });

            describe("suffix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        var s = component.el.dom.className;

                        component.removeCls('one', null, '-y');

                        expect(component.el.dom.className).toEqual(s);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one-y'
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.removeCls('one', null, '-y');

                        expect(getClsList(component)).toEqual([]);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.removeCls(['one'], null, '-y');

                        expect(getClsList(component)).toEqual([]);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one-y', 'two-y']
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.removeCls('two', null, '-y');

                        expectCls(component, 'one-y');
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.removeCls(['one'], null, '-y');

                        expectCls(component, 'two-y');
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.removeCls(['one', 'two'], null, '-y');

                        expect(getClsList(component)).toEqual([]);
                    });
                });
            });

            describe("prefix + suffix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        var s = component.el.dom.className;

                        component.removeCls('one', 'x-', '-y');

                        expect(component.el.dom.className).toEqual(s);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one-y'
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.removeCls('one', 'x-', '-y');

                        expect(getClsList(component)).toEqual([]);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.removeCls(['one'], 'x-', '-y');

                        expect(getClsList(component)).toEqual([]);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one-y', 'x-two-y']
                        });
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.removeCls('two', 'x-', '-y');

                        expectCls(component, 'x-one-y');
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.removeCls(['one'], 'x-', '-y');

                        expectCls(component, 'x-two-y');
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.removeCls(['one', 'two'], 'x-', '-y');

                        expect(getClsList(component)).toEqual([]);
                    });
                });
            });
        });

        describe("setCls", function() {
            describe("with no existing cls", function() {
                beforeEach(function() {
                    makeComponent();
                    spy = spyOn(component, "updateCls");
                });

                it("should set the cls (string)", function() {
                    expect(component.getCls()).toEqual(null);

                    component.setCls('one');

                    expect(spy).toHaveBeenCalledWith(['one'], null);
                    expect(component.getCls()).toEqual(['one']);
                });

                it("should set the cls (array)", function() {
                    expect(component.getCls()).toEqual(null);

                    component.setCls(['one', 'two']);

                    expect(spy).toHaveBeenCalledWith(['one', 'two'], null);
                    expect(component.getCls()).toEqual(['one', 'two']);
                });
            });

            describe("with existing cls (string)", function() {
                beforeEach(function() {
                    makeComponent({
                        cls: 'one'
                    });
                    spy = spyOn(component, "updateCls");
                });

                it("should set the cls (string)", function() {
                    expect(component.getCls()).toEqual(['one']);

                    component.setCls('two');

                    expect(spy).toHaveBeenCalledWith(['two'], ['one']);
                    expect(component.getCls()).toEqual(['two']);
                });

                it("should set the cls (array)", function() {
                    expect(component.getCls()).toEqual(['one']);

                    component.setCls(['two', 'three']);

                    expect(spy).toHaveBeenCalledWith(['two', 'three'], ['one']);
                    expect(component.getCls()).toEqual(['two', 'three']);
                });
            });

            describe("with existing cls (array)", function() {
                beforeEach(function() {
                    makeComponent({
                        cls: ['one', 'two']
                    });
                    spy = spyOn(component, "updateCls");
                });

                it("should set the cls (string)", function() {
                    expect(component.getCls()).toEqual(['one', 'two']);

                    component.setCls('three');

                    expect(spy).toHaveBeenCalledWith(['three'], ['one', 'two']);
                    expect(component.getCls()).toEqual(['three']);
                });

                it("should set the cls (array)", function() {
                    expect(component.getCls()).toEqual(['one', 'two']);

                    component.setCls(['four', 'three']);

                    expect(spy).toHaveBeenCalledWith(['four', 'three'], ['one', 'two']);
                    expect(component.getCls()).toEqual(['four', 'three']);
                });
            });
        });

        describe("replaceCls", function() {
            describe("no prefix/suffix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one');

                        expectCls(component, 'one');
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four']);

                        expectCls(component, 'three four');
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one'
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.replaceCls('one', 'two');

                        expectCls(component, 'two');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.replaceCls(['one'], ['two']);

                        expectCls(component, 'two');
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.replaceCls(['one'], ['two', 'three']);

                        expectCls(component, 'two three');
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one', 'two']
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.replaceCls('one', 'three');

                        expectCls(component, 'two three');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.replaceCls(['one', 'two'], ['four', 'three']);

                        expectCls(component, 'three four');
                    });
                });
            });

            describe("prefix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one', 'x-');

                        expectCls(component, 'x-one');
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four'], 'x-');

                        expectCls(component, 'x-three x-four');
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one'
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.replaceCls('one', 'two', 'x-');

                        expectCls(component, 'x-two');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.replaceCls(['one'], ['two'], 'x-');

                        expectCls(component, 'x-two');
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.replaceCls(['one'], ['two', 'three'], 'x-');

                        expectCls(component, 'x-two x-three');
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one', 'x-two']
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.replaceCls('one', 'three', 'x-');

                        expectCls(component, 'x-two x-three');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.replaceCls(['one', 'two'], ['four', 'three'], 'x-');

                        expectCls(component, 'x-four x-three');
                    });
                });
            });

            describe("suffix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one', null, '-y');

                        expectCls(component, 'one-y');
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four'], null, '-y');

                        expectCls(component, 'three-y four-y');
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one-y'
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.replaceCls('one', 'two', null, '-y');

                        expectCls(component, 'two-y');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.replaceCls(['one'], ['two'], null, '-y');

                        expectCls(component, 'two-y');
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.replaceCls(['one'], ['two', 'three'], null, '-y');

                        expectCls(component, 'two-y three-y');
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one-y', 'two-y']
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.replaceCls('one', 'three', null, '-y');

                        expectCls(component, 'two-y three-y');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.replaceCls(['one', 'two'], ['four', 'three'], null, '-y');

                        expectCls(component, 'four-y three-y');
                    });
                });
            });

            describe("prefix+suffix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one', 'x-', '-y');

                        expectCls(component, 'x-one-y');
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four'], 'x-', '-y');

                        expectCls(component, 'x-three-y x-four-y');
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one-y'
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.replaceCls('one', 'two', 'x-', '-y');

                        expectCls(component, 'x-two-y');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.replaceCls(['one'], ['two'], 'x-', '-y');

                        expectCls(component, 'x-two-y');
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.replaceCls(['one'], ['two', 'three'], 'x-', '-y');

                        expectCls(component, 'x-two-y x-three-y');
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one-y', 'x-two-y']
                        });
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.replaceCls('one', 'three', 'x-', '-y');

                        expectCls(component, 'x-two-y x-three-y');
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);
                        component.replaceCls(['one', 'two'], ['four', 'three'], 'x-', '-y');

                        expectCls(component, 'x-three-y x-four-y');
                    });
                });
            });
        });

        describe("toggleCls", function() {
            describe("add cls", function() {
                it("add to component's element", function() {
                    makeComponent();

                    component.toggleCls('one');

                    expect(component.element).toHaveCls('one');
                });

                it("force add cls to component", function() {
                    makeComponent({
                        cls : 'one'
                    });

                    //normally since the component already has the cls it would remove
                    //but since we are passing `true`, it will force it to add
                    component.toggleCls('one', true);

                    expect(component.element).toHaveCls('one');
                });
            });

            describe("remove cls", function() {
                it("remove from component's element", function() {
                    makeComponent({
                        cls : 'one'
                    });

                    component.toggleCls('one');

                    expect(component.element).not.toHaveCls('one');
                });
            });
        });
    });

    describe("visibility", function() {
        describe("isHidden", function() {
            describe("deep=undefined", function() {
                describe("as a root", function() {
                    it("should return true if the component is hidden", function() {
                        makeComponent({
                            hidden: true
                        });
                        expect(component.isHidden()).toBe(true);
                    });

                    it("should return false if the component is not hidden", function() {
                        makeComponent();
                        expect(component.isHidden()).toBe(false);
                    });
                });

                describe("in a container", function() {
                    it("should return true if the component is hidden but the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden()).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden()).toBe(true);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden()).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden()).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and a high level container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'container',
                                items: {
                                    xtype: 'container',
                                    items: {
                                        xtype: 'component',
                                        itemId: 'c'
                                    }
                                }
                            }
                        });
                        component = ct.down('#c');
                        expect(component.isHidden()).toBe(false);
                        ct.destroy();
                    });
                });
            });

            describe("deep=false", function() {
                describe("as a root", function() {
                    it("should return true if the component is hidden", function() {
                        makeComponent({
                            hidden: true
                        });
                        expect(component.isHidden(false)).toBe(true);
                    });

                    it("should return false if the component is not hidden", function() {
                        makeComponent();
                        expect(component.isHidden(false)).toBe(false);
                    });
                });

                describe("in a container", function() {
                    it("should return true if the component is hidden but the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(false)).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(false)).toBe(true);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(false)).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(false)).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and a high level container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'container',
                                items: {
                                    xtype: 'container',
                                    items: {
                                        xtype: 'component',
                                        itemId: 'c'
                                    }
                                }
                            }
                        });
                        component = ct.down('#c');
                        expect(component.isHidden(false)).toBe(false);
                        ct.destroy();
                    });
                });
            });

            describe("deep=true", function() {
                describe("as a root", function() {
                    it("should return true if the component is hidden", function() {
                        makeComponent({
                            hidden: true
                        });
                        expect(component.isHidden(true)).toBe(true);
                    });

                    it("should return false if the component is not hidden", function() {
                        makeComponent();
                        expect(component.isHidden(true)).toBe(false);
                    });
                });

                describe("in a container", function() {
                    it("should return true if the component is hidden but the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(true)).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(true)).toBe(true);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(true)).toBe(false);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isHidden(true)).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and a high level container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'container',
                                items: {
                                    xtype: 'container',
                                    items: {
                                        xtype: 'component',
                                        itemId: 'c'
                                    }
                                }
                            }
                        });
                        component = ct.down('#c');
                        expect(component.isHidden(true)).toBe(true);
                        ct.destroy();
                    });
                });
            });
        });

        describe("isVisible", function() {
            describe("deep=undefined", function() {
                describe("as a root", function() {
                    it("should return false if the component is hidden", function() {
                        makeComponent({
                            hidden: true
                        });
                        expect(component.isVisible()).toBe(false);
                    });

                    it("should return true if the component is not hidden", function() {
                        makeComponent({
                            renderTo: document.body
                        });
                        expect(component.isVisible()).toBe(true);
                    });
                });

                describe("in a container", function() {
                    it("should return false if the component is hidden but the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible()).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible()).toBe(false);
                        ct.destroy();
                    });

                    it('should return false if the component is not rendered', function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible()).toBe(false);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and the container is not", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible()).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            hidden: true,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible()).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and a high level container is hidden", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            hidden: true,
                            items: {
                                xtype: 'container',
                                items: {
                                    xtype: 'container',
                                    items: {
                                        xtype: 'component',
                                        itemId: 'c'
                                    }
                                }
                            }
                        });
                        component = ct.down('#c');
                        expect(component.isVisible()).toBe(true);
                        ct.destroy();
                    });
                });
            });

            describe("deep=false", function() {
                describe("as a root", function() {
                    it("should return false if the component is hidden", function() {
                        makeComponent({
                            hidden: true
                        });
                        expect(component.isVisible(false)).toBe(false);
                    });

                    it("should return true if the component is not hidden", function() {
                        makeComponent({
                            renderTo: document.body
                        });
                        expect(component.isVisible(false)).toBe(true);
                    });
                });

                describe("in a container", function() {
                    it("should return false if the component is hidden but the container is not", function() {
                        var ct = new Ext.Container({
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(false)).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(false)).toBe(false);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and the container is not", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(false)).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            hidden: true,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(false)).toBe(true);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and a high level container is hidden", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            hidden: true,
                            items: {
                                xtype: 'container',
                                items: {
                                    xtype: 'container',
                                    items: {
                                        xtype: 'component',
                                        itemId: 'c'
                                    }
                                }
                            }
                        });
                        component = ct.down('#c');
                        expect(component.isVisible(false)).toBe(true);
                        ct.destroy();
                    });
                });
            });

            describe("deep=true", function() {
                describe("as a root", function() {
                    it("should return false if the component is hidden", function() {
                        makeComponent({
                            hidden: true
                        });
                        expect(component.isVisible(true)).toBe(false);
                    });

                    it("should return true if the component is not hidden", function() {
                        makeComponent({
                            renderTo: document.body
                        });
                        expect(component.isVisible(true)).toBe(true);
                    });
                });

                describe("in a container", function() {
                    it("should return false if the component is hidden but the container is not", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(true)).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component',
                                hidden: true
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(true)).toBe(false);
                        ct.destroy();
                    });

                    it("should return true if the component is not hidden and the container is not", function() {
                        var ct = new Ext.Container({
                            renderTo: document.body,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(true)).toBe(true);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and the container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'component'
                            }
                        });
                        component = ct.getItems().first();
                        expect(component.isVisible(true)).toBe(false);
                        ct.destroy();
                    });

                    it("should return false if the component is not hidden and a high level container is hidden", function() {
                        var ct = new Ext.Container({
                            hidden: true,
                            items: {
                                xtype: 'container',
                                items: {
                                    xtype: 'container',
                                    items: {
                                        xtype: 'component',
                                        itemId: 'c'
                                    }
                                }
                            }
                        });
                        component = ct.down('#c');
                        expect(component.isVisible(true)).toBe(false);
                        ct.destroy();
                    });
                });
            });
        });
    });

    describe('modal positioned', function() {
        var ct;
        afterEach(function() {
            Ext.destroy(ct);
        });

        it("should set the mask's zIndex one less that its own zIndex", function() {
            makeComponent({
                centered: true,
                modal: true
            });
            ct = new Ext.Container({
                items: component,
                renderTo: document.body
            });
            component.show();

            // Mask must be below component
            expect(Number(component.getModal().el.dom.style.zIndex)).toBe(Number(component.el.dom.style.zIndex) - 1);
        });
    });

    describe('setData call', function() {
        it("should convert a string into an array", function () {
            makeComponent({
                tpl : 'first name is {fname}'
            });

            component.setData({
                fname : null
            });

            expect(component.innerHtmlElement.dom.innerHTML).toEqual('first name is ');
        });
    });

    describe('responding to resizing', function() {
        var container, onResizeSpy, resizeEventSpy, prevWidth, prevHeight;

        beforeEach(function() {
            onResizeSpy = jasmine.createSpy();
            resizeEventSpy = jasmine.createSpy();
        });
        afterEach(function() {
            container = Ext.destroy(container);
        });

        describe('shrinkWrap', function() {
            it('should respond to content size changes', function() {
                makeComponent({
                    html: '<p>Foo</p><p>bar</p><p>bletch</p>',
                    onResize: onResizeSpy,
                    listeners: {
                        resize: resizeEventSpy
                    },
                    renderTo: document.body
                });
                component.el.down('p').destroy();

                waitsFor(function() {
                    return onResizeSpy.callCount === 1 &&
                        resizeEventSpy.callCount === 1;
                });

                // The event is asynchronous, and is fired opn the tail of a browser layout.
                // We have only paused for one layout, so it will be the result of the DOM
                // removal, and there will be no "old" size values.
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 3,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    expect(onResizeSpy.mostRecentCall.args).toEqual(
                        [ w, h, null, null, info ]);

                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual(
                        [ component, w, h, null, null, info ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
                });
            });
        });

        describe('Auto sizing', function() {
            it('should respond to changes in relative sizing values', function() {
                container = new Ext.Container({
                    layout: 'hbox',
                    height: 100,
                    width: 100,
                    items: [makeComponent({
                        width: '50%',
                        onResize: onResizeSpy,
                        listeners: {
                            resize: resizeEventSpy
                        }
                    })],
                    renderTo: document.body
                });

                waitsFor(function() {
                    return onResizeSpy.callCount === 1 &&
                        resizeEventSpy.callCount === 1;
                }, 'first resize', 1000);

                // Wait for the resize event mechanism to flush all its timers
                waits(100);

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 3,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    expect(onResizeSpy.mostRecentCall.args).toEqual([
                        50, h, null, null, info
                    ]);
                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, 50, h, null, null, info
                    ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                    component.setWidth('70%');
                    component.el.dom.offsetWidth;
                });

                // Wait for the resize event mechanism to flush all its timers
                waits(100);

                waitsFor(function() {
                    return onResizeSpy.callCount === 2 &&
                        resizeEventSpy.callCount === 2;
                }, 'second resize', 1000);

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 1,  // w = 0x01
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    // width:50% -> width:70% should mean 70px width
                    expect(w).toEqual(70);

                    expect(onResizeSpy.mostRecentCall.args).toEqual([
                        70, h, 50, h, info
                    ]);
                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, 70, h, 50, h, info
                    ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                    // Now widen the container
                    container.setWidth(200);
                    component.el.dom.offsetWidth;
                });

                // Wait for the resize event mechanism to flush all its timers
                waits(100);

                waitsFor(function() {
                    return onResizeSpy.callCount === 3 &&
                        resizeEventSpy.callCount === 3;
                }, 'third resize', 1000);

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 1,
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    // Doubled container width, so double the component's width
                    expect(component.el.dom.offsetWidth).toEqual(140);

                    expect(onResizeSpy.mostRecentCall.args).toEqual([
                        140, h, 70, h, info
                    ]);
                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, 140, h, 70, h, info
                    ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
                });
            });
        });

        describe('Layout sizing', function() {
            it('should respond to layout-induced changes', function() {
                container = new Ext.Container({
                    layout: 'hbox',
                    height: 100,
                    width: 100,
                    items: [{
                        flex: 1
                    }, makeComponent({
                        flex: 1,
                        onResize: onResizeSpy,
                        listeners: {
                            resize: resizeEventSpy
                        }
                    })],
                    renderTo: document.body
                });

                waitsFor(function() {
                    return onResizeSpy.callCount === 1 &&
                        resizeEventSpy.callCount === 1;
                });

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 3,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    expect(onResizeSpy.mostRecentCall.args).toEqual([
                        50, h, null, null, info ]);
                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, 50, h, null, null, info ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                    component.setFlex(2);
                });

                waitsFor(function() {
                    return onResizeSpy.callCount === 2 &&
                        resizeEventSpy.callCount === 2;
                });

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 1,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    // flex:1 -> flex:2 should mean ~67px width
                    expect(w).toBeGreaterThan(50);
                    prevWidth = w;

                    expect(onResizeSpy.mostRecentCall.args).toEqual([ w, h, 50, h, info ]);

                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, w, h, 50, h, info ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                    // Now widen the container
                    container.setWidth(200);
                });

                waits(100);

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.getWidth(),
                        ow = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 1,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: ow,
                            contentHeight: h
                        };

                    // Double container width should mean ~(67 * 2)px width
                    expect(ow).toBeGreaterThan(prevWidth);

                    expect(onResizeSpy.mostRecentCall.args).toEqual([
                        w, h, prevWidth, h, info ]);

                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, w, h, prevWidth, h, info ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
                });
            });
        });

        describe('Constraints', function() {
            it('should respond to releasing the maxWidth constraint', function() {
                container = new Ext.Container({
                    layout: 'hbox',
                    height: 100,
                    width: 100,
                    items: [{
                        flex: 1
                    }, makeComponent({
                        flex: 1,
                        maxWidth: 40,
                        onResize: onResizeSpy,
                        listeners: {
                            resize: resizeEventSpy
                        }
                    })],
                    renderTo: document.body
                });

                waitsFor(function() {
                    return onResizeSpy.callCount === 1 &&
                        resizeEventSpy.callCount === 1;
                });

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 3,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    expect(onResizeSpy.mostRecentCall.args).toEqual([ 40, h, null, null, info ]);
                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, 40, h, null, null, info ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                    // Release the maxWidth: 40 constraint
                    component.setMaxWidth(null);
                });

                waitsFor(function() {
                    return onResizeSpy.callCount === 2 &&
                        resizeEventSpy.callCount === 2;
                });

                // Wait for the layout and the async event to run on the tail end of a browser layout
                runs(function() {
                    var w = component.el.dom.offsetWidth,
                        h = component.el.dom.offsetHeight,
                        info = {
                            flag: 1,  // w = 0x01, h = 0x02
                            width: w,
                            height: h,
                            contentWidth: w,
                            contentHeight: h
                        };

                    // Releasing the constraint moves to obeying flex: 1
                    expect(onResizeSpy.mostRecentCall.args).toEqual([ 50, h, 40, h, info ]);
                    expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                        component, 50, h, 40, h, info ]);

                    // onResize is called first - its element resize listener is at priority 1000
                    expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
                });
            });
        });

        it('should respond to releasing the minWidth constraint', function() {
            container = new Ext.Container({
                layout: 'hbox',
                height: 100,
                width: 100,
                items: [{
                    flex: 1
                }, makeComponent({
                    flex: 1,
                    minWidth: 60,
                    onResize: onResizeSpy,
                    listeners: {
                        resize: resizeEventSpy
                    }
                })],
                renderTo: document.body
            });

            waitsFor(function() {
                return onResizeSpy.callCount === 1 &&
                    resizeEventSpy.callCount === 1;
            });

            // Wait for the layout and the async event to run on the tail end of a browser layout
            runs(function() {
                var w = component.el.dom.offsetWidth,
                    h = component.el.dom.offsetHeight,
                    info = {
                        flag: 3,  // w = 0x01, h = 0x02
                        width: w,
                        height: h,
                        contentWidth: w,
                        contentHeight: h
                    };

                expect(onResizeSpy.mostRecentCall.args).toEqual([
                    60, h, null, null, info ]);

                expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                    component, 60, h, null, null, info ]);

                // onResize is called first - its element resize listener is at priority 1000
                expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                // Release the minWidth: 60 constraint
                component.setMinWidth(null);
            });

            waitsFor(function() {
                return onResizeSpy.callCount === 2 &&
                    resizeEventSpy.callCount === 2;
            });

            // Wait for the layout and the async event to run on the tail end of a browser layout
            runs(function() {
                var w = component.el.dom.offsetWidth,
                    h = component.el.dom.offsetHeight,
                    info = {
                        flag: 1,  // w = 0x01, h = 0x02
                        width: w,
                        height: h,
                        contentWidth: w,
                        contentHeight: h
                    };

                expect(onResizeSpy.callCount).toBe(2);

                // Releasing the constraint moves to obeying flex: 1
                expect(onResizeSpy.mostRecentCall.args).toEqual([
                    50, h, 60, h, info ]);
                expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                    component, 50, h, 60, h, info ]);

                // onResize is called first - its element resize listener is at priority 1000
                expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
            });
        });

        it('should respond to releasing the maxHeight constraint', function() {
            container = new Ext.Container({
                layout: 'vbox',
                height: 100,
                width: 100,
                items: [{
                    flex: 1
                }, makeComponent({
                    flex: 1,
                    maxHeight: 40,
                    onResize: onResizeSpy,
                    listeners: {
                        resize: resizeEventSpy
                    }
                })],
                renderTo: document.body
            });

            waitsFor(function() {
                return onResizeSpy.callCount === 1 &&
                    resizeEventSpy.callCount === 1;
            });

            // Wait for the layout and the async event to run on the tail end of a browser layout
            runs(function() {
                var w = component.el.dom.offsetWidth,
                    h = component.el.dom.offsetHeight,
                    info = {
                        flag: 3,  // w = 0x01, h = 0x02
                        width: w,
                        height: h,
                        contentWidth: w,
                        contentHeight: h
                    };

                expect(onResizeSpy.mostRecentCall.args).toEqual([
                    w, 40, null, null, info ]);

                expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                    component, w, 40, null, null, info ]);

                // onResize is called first - its element resize listener is at priority 1000
                expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                // Release the maxHeight: 40 constraint
                component.setMaxHeight(null);
            });

            waitsFor(function() {
                return onResizeSpy.callCount === 2 &&
                    resizeEventSpy.callCount === 2;
            });

            // Wait for the layout and the async event to run on the tail end of a browser layout
            runs(function() {
                var w = component.el.dom.offsetWidth,
                    h = component.el.dom.offsetHeight,
                    info = {
                        flag: 2,  // w = 0x01, h = 0x02
                        width: w,
                        height: h,
                        contentWidth: w,
                        contentHeight: h
                    };

                // Releasing the constraint moves to obeying flex: 1
                expect(onResizeSpy.mostRecentCall.args).toEqual([ w, 50, w, 40, info ]);
                expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                    component, w, 50, w, 40, info ]);

                // onResize is called first - its element resize listener is at priority 1000
                expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
            });
        });

        it('should respond to releasing the minHeight constraint', function() {
            container = new Ext.Container({
                layout: 'vbox',
                height: 100,
                width: 100,
                items: [{
                    flex: 1
                }, makeComponent({
                    flex: 1,
                    minHeight: 60,
                    onResize: onResizeSpy,
                    listeners: {
                        resize: resizeEventSpy
                    }
                })],
                renderTo: document.body
            });

            waitsFor(function() {
                return onResizeSpy.callCount === 1 &&
                    resizeEventSpy.callCount === 1;
            });

            // Wait for the layout and the async event to run on the tail end of a browser layout
            runs(function() {
                var w = component.el.dom.offsetWidth,
                    h = component.el.dom.offsetHeight,
                    info = {
                        flag: 3,  // w = 0x01, h = 0x02
                        width: w,
                        height: h,
                        contentWidth: w,
                        contentHeight: h
                    };

                expect(onResizeSpy.mostRecentCall.args).toEqual([ w, 60, null, null, info ]);
                expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                    component, w, 60, null, null, info ]);

                // onResize is called first - its element resize listener is at priority 1000
                expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);

                // Release the minHeight: 60 constraint
                component.setMinHeight(null);
            });

            waitsFor(function() {
                return onResizeSpy.callCount === 2 &&
                    resizeEventSpy.callCount === 2;
            });

            // Wait for the layout and the async event to run on the tail end of a browser layout
            runs(function() {
                var w = component.el.dom.offsetWidth,
                    h = component.el.dom.offsetHeight,
                    info = {
                        flag: 2,  // w = 0x01, h = 0x02
                        width: w,
                        height: h,
                        contentWidth: w,
                        contentHeight: h
                    };

                expect(onResizeSpy.callCount).toBe(2);

                // Releasing the constraint moves to obeying flex: 1
                expect(onResizeSpy.mostRecentCall.args).toEqual([ w, 50, w, 60, info ]);
                expect(resizeEventSpy.mostRecentCall.args.slice(0, 6)).toEqual([
                    component, w, 50, w, 60, info ]);

                // onResize is called first - its element resize listener is at priority 1000
                expect(onResizeSpy.callSequence).toBeLessThan(resizeEventSpy.callSequence);
            });
        });
    });

    describe('destroy', function () {
        it("should fire the 'destroy' event", function () {
            var cmp = makeComponent({}),
                isFired;

            cmp.on('destroy', function () {
                isFired = true;
            });
            cmp.destroy();

            expect(isFired).toBe(true);
        });

        it("should destroy the animations when destroying the component", function() {
            var cmp = makeComponent({
                    showAnimation: {
                        type: 'slideIn',
                        duration: 250,
                        easing: 'ease-out'
                    },
    
                    hideAnimation: {
                        type: 'slideOut',
                        duration: 250,
                        easing: 'ease-in'
                    },
                    modal: true,
                    floated: true,
                    html: 'Test'
                }),
                showAnim, hideAnim;
            
            showAnim = cmp.getShowAnimation();
            hideAnim = cmp.getHideAnimation();

            cmp.show();
            cmp.hide();

            var showAnimSpy = spyOn(showAnim, 'destroy').andCallThrough();
            var hideAnimSpy = spyOn(hideAnim, 'destroy').andCallThrough();
            
            cmp.destroy();
            
            expect(showAnimSpy).toHaveBeenCalled();
            expect(hideAnimSpy).toHaveBeenCalled();
        });
    });

    describe("rootCls", function() {
        it("should add the rootCls to the component if it has no parent container", function() {
            var cmp = new Ext.Component();

            expect(cmp.el).toHaveCls('x-root');

            cmp.destroy();
        });

        it("should remove the rootCls from the component when it is added to a container", function() {
            var cmp = new Ext.Component(),
                ct = new Ext.Container();

            ct.add(cmp);
            expect(cmp.el).not.toHaveCls('x-root');
            expect(ct.el).toHaveCls('x-root');

            ct.destroy();
        });

        it("should add the rootCls when the component is removed from a container", function() {
            var ct = Ext.create({
                xtype: 'container',
                items: [{
                    xtype: 'component',
                    id: 'cmp'
                }]
            });

            var cmp = Ext.getCmp('cmp');

            ct.remove(cmp, false);

            expect(cmp).toHaveCls('x-root');

            ct.destroy();
            cmp.destroy();
        });

        it("should add the rootCls to only the top-level component in a hierarchy", function() {
            var ct = Ext.create({
                xtype: 'container',
                items: [{
                    xtype: 'container',
                    id: 'ct2',
                    items: [{
                        xtype: 'component',
                        id: 'cmp'
                    }]
                }]
            });

            expect(ct).toHaveCls('x-root');
            expect(Ext.getCmp('ct2')).not.toHaveCls('x-root');
            expect(Ext.getCmp('cmp')).not.toHaveCls('x-root');

            ct.destroy();
        });
    });

});
