topSuite("Ext.menu.RadioItem", ['Ext.menu.Menu'], function() {
    var nameHolder, menu, radios;

    function makeMenu(menuCfg) {
        nameHolder = Ext.widget({
            xtype: 'panel',
            nameHolder: true,
            items: Ext.apply({
                xtype: 'menu',
                hidden: false,
                items: [
                    makeItem({
                        text: 'Desktop',
                        checked: true,
                        value: 'desktop'
                    }, menuCfg),
                    makeItem({
                        text: 'Tablet',
                        checked: false,
                        value: 'tablet'
                    }, menuCfg),
                    makeItem({
                        text: 'Phone',
                        checked: false,
                        value: 'phone'
                    }, menuCfg)
                ]
            }, menuCfg)
        });

        menu = nameHolder.down('menu');

        radios = {
            desktop: menu.items.items[0],
            tablet: menu.items.items[1],
            phone: menu.items.items[2]
        };
    }

    function makeItem (cfg, menuCfg) {
        var defaults = menuCfg && menuCfg.defaults;

        if (!defaults || !defaults.group) {
            cfg.group = 'ui-choice';
        }

        return cfg;
    }

    afterEach(function() {
        nameHolder = menu = radios = Ext.destroy(nameHolder);
    });

    function clickIt(item, event) {
        jasmine.fireMouseEvent(item.checkboxElement, event || 'click');
    }

    describe("initial config", function() {
        describe("normal", function () {
            beforeEach(function () {
                makeMenu();
            });

            it("should have the only one checked", function () {
                expect(radios.desktop.getChecked()).toBe(true);
                expect(radios.tablet.getChecked()).toBeFalsy();
                expect(radios.phone.getChecked()).toBeFalsy();
            });

            describe("rendered", function () {
                it("should have itemEl as ariaEl", function () {
                    expect(radios.desktop.ariaEl).toBe(radios.desktop.checkboxElement);
                });

                // TODO: Alex. Implement ARIA roles
                xit("should have menuitemcheckbox role", function () {
                    expect(radios.desktop).toHaveAttr('role', 'menuitemcheckbox');
                });

                it("should not have aria-label", function () {
                    expect(radios.desktop).not.toHaveAttr('aria-label');
                });

                describe("aria-checked", function () {
                    it("should be only one checked", function () {
                        expect(radios.desktop.ariaEl).toHaveAttr('aria-checked', 'true');
                        expect(radios.tablet.ariaEl).not.toHaveAttr('aria-checked', 'true');
                        expect(radios.phone.ariaEl).not.toHaveAttr('aria-checked', 'true');
                    });
                });
            });
        });
    });

    describe('menu defaults', function () {
        it('should create radio item with group in defaults', function () {
            makeMenu({
                defaults: {
                    group: 'foo'
                }
            });

            expect(radios.desktop instanceof Ext.menu.RadioItem).toBe(true);
            expect(radios.phone instanceof Ext.menu.RadioItem).toBe(true);
            expect(radios.tablet instanceof Ext.menu.RadioItem).toBe(true);

            expect(radios.desktop.getGroup()).toBe('foo');
            expect(radios.phone.getGroup()).toBe('foo');
            expect(radios.tablet.getGroup()).toBe('foo');
        });

        it('should create radio item with name in defaults', function () {
            makeMenu({
                defaults: {
                    name: 'foo'
                }
            });

            expect(radios.desktop instanceof Ext.menu.RadioItem).toBe(true);
            expect(radios.phone instanceof Ext.menu.RadioItem).toBe(true);
            expect(radios.tablet instanceof Ext.menu.RadioItem).toBe(true);
        });

        it('should create radio item with xtype in defaults', function () {
            makeMenu({
                defaults: {
                    xtype: 'menuradioitem'
                }
            });

            expect(radios.desktop instanceof Ext.menu.RadioItem).toBe(true);
            expect(radios.phone instanceof Ext.menu.RadioItem).toBe(true);
            expect(radios.tablet instanceof Ext.menu.RadioItem).toBe(true);
        });
    });

    describe("setChecked", function() {
        it("should set the checked state on the component", function() {
            makeMenu();

            radios.tablet.setChecked(true);

            expect(radios.desktop.getChecked()).toBe(false);
            expect(radios.tablet.getChecked()).toBe(true);
            expect(radios.phone.getChecked()).toBe(false);

            expect(radios.desktop.ariaEl).toHaveAttr('aria-checked', 'false');
            expect(radios.tablet.ariaEl).toHaveAttr('aria-checked', 'true');
            expect(radios.phone.ariaEl).toHaveAttr('aria-checked', 'false');

            radios.tablet.setChecked(false);

            // Unchecking radio items is invalid. No change must take place
            expect(radios.desktop.getChecked()).toBe(false);
            expect(radios.tablet.getChecked()).toBe(true);
            expect(radios.phone.getChecked()).toBe(false);

            expect(radios.desktop.ariaEl).toHaveAttr('aria-checked', 'false');
            expect(radios.tablet.ariaEl).toHaveAttr('aria-checked', 'true');
            expect(radios.phone.ariaEl).toHaveAttr('aria-checked', 'false');
        });

    });

    describe("pointer interaction", function() {
        it("should set the checked state on the component", function() {
            makeMenu();

            clickIt(radios.tablet);

            expect(radios.desktop.getChecked()).toBe(false);
            expect(radios.tablet.getChecked()).toBe(true);
            expect(radios.phone.getChecked()).toBe(false);

            expect(radios.desktop.ariaEl).toHaveAttr('aria-checked', 'false');
            expect(radios.tablet.ariaEl).toHaveAttr('aria-checked', 'true');
            expect(radios.phone.ariaEl).toHaveAttr('aria-checked', 'false');

            clickIt(radios.tablet);

            // Unchecking radio items is invalid. No change must take place
            expect(radios.desktop.getChecked()).toBe(false);
            expect(radios.tablet.getChecked()).toBe(true);
            expect(radios.phone.getChecked()).toBe(false);

            expect(radios.desktop.ariaEl).toHaveAttr('aria-checked', 'false');
            expect(radios.tablet.ariaEl).toHaveAttr('aria-checked', 'true');
            expect(radios.phone.ariaEl).toHaveAttr('aria-checked', 'false');
        });
    });
});
