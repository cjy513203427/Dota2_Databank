topSuite("Ext.Dialog", ['Ext.app.ViewModel', 'Ext.Button'], function() {
    var dialog;

    function createDialog (config) {
        if (Ext.isArray(config)) {
            config = {
                items: config
            };
        } else {
            config = Ext.apply({}, config);
        }

        dialog = new Ext.Dialog(config);
    }

    function animates (comp) {
        return new Ext.Promise(function (resolve) {
            var anim = comp.activeAnimation;

            if (anim) {
                anim.on({
                    animationend: function () {
                        resolve();
                    }
                });
            }
            else {
                resolve();
            }
        });
    }

    afterEach(function () {
        dialog = Ext.destroy(dialog);
    });

    describe('maximizable:true', function () {
        beforeEach(function () {
            createDialog({
                title: 'Test',
                width: 300,
                height: 200,
                maximizable: true
            });
        });

        it('should have a maximize tool', function () {
            var tool = dialog.down('tool[type=maximize]');

            expect(!tool).toBe(false);
        });

        it('should have proper tools when maximized', function () {
            dialog.maximize(/*animation=*/null);

            var tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(false);

            tool = dialog.down('tool[type=maximize]');
            expect(tool.getHidden()).toBe(true);
        });

        it('should have proper tools when restored', function () {
            dialog.maximize(/*animation=*/null);
            dialog.restore(/*animation=*/null);

            var tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(true);

            tool = dialog.down('tool[type=maximize]');
            expect(tool.getHidden()).toBe(false);
        });

        it('should provide promises with maximize and restore', function (done) {
            dialog.setXY(100, 100);
            dialog.show(null);

            dialog.maximize().then(function () {
                expect(dialog.hasCls('x-maximized')).toBe(true);

                dialog.restore().then(function () {
                    expect(dialog.hasCls('x-maximized')).toBe(false);

                    done();
                });
            })
        });
    });

    describe('maximizable:false', function () {
        beforeEach(function () {
            createDialog({
            });
        });

        it('should have no tools', function () {
            var tool = dialog.down('tool[type=maximize]');

            expect(!tool).toBe(true);

            tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(true);
        });

        it('should have no tools when maximized', function () {
            dialog.maximize(/*animation=*/null);

            var tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(true);

            tool = dialog.down('tool[type=maximize]');
            expect(!tool).toBe(true);
        });

        it('should still have no tools when restored', function () {
            dialog.restore(/*animation=*/null);

            var tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(true);

            tool = dialog.down('tool[type=maximize]');
            expect(!tool).toBe(true);
        });

        it('should provide promises with maximize and restore', function (done) {
            dialog.setXY(100, 100);
            dialog.show(null);

            dialog.maximize().then(function () {
                expect(dialog.hasCls('x-maximized')).toBe(true);

                dialog.restore().then(function () {
                    expect(dialog.hasCls('x-maximized')).toBe(false);

                    done();
                });
            })
        });
    });

    describe('maximizable:false maximized:true', function () {
        beforeEach(function () {
            createDialog({
                title: 'Test',
                width: 300,
                height: 200,
                x: 100,
                y: 100,
                centered: false,
                maximized: true
            });
        });

        it('should have no tools', function () {
            var tool = dialog.down('tool[type=maximize]');

            expect(!tool).toBe(true);

            tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(true);
        });

        it('should still have no tools when restored', function () {
            dialog.restore(/*animation=*/null);

            var tool = dialog.down('tool[type=restore]');
            expect(!tool).toBe(true);

            tool = dialog.down('tool[type=maximize]');
            expect(!tool).toBe(true);
        });

        it('should provide promises with maximize and restore', function (done) {
            dialog.show(null);

            dialog.restore().then(function (restored) {
                expect(restored).toBe(true);
                expect(dialog.hasCls('x-maximized')).toBe(false);

                dialog.maximize().then(function (maximized) {
                    expect(maximized).toBe(true);
                    expect(dialog.hasCls('x-maximized')).toBe(true);

                    done();
                });
            })
        });
    });

    describe('header:false', function () {
        describe('maximizable:true', function () {
            beforeEach(function () {
                createDialog({
                    header: false,
                    maximizable: true
                });
            });

            it('should have a maximize tool', function () {
                var tool = dialog.down('tool[type=maximize]');

                expect(!tool).toBe(true);
            });

            it('should have no tools when maximized', function () {
                dialog.maximize(/*animation=*/null);

                var tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=maximize]');
                expect(!tool).toBe(true);
            });

            it('should still have tools when restored', function () {
                dialog.maximize(/*animation=*/null);
                dialog.restore(/*animation=*/null);

                var tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=maximize]');
                expect(!tool).toBe(true);
            });
        });

        describe('maximizable:false', function () {
            beforeEach(function () {
                createDialog({
                    header: false
                });
            });

            it('should have no tools', function () {
                var tool = dialog.down('tool[type=maximize]');

                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);
            });

            it('should have no tools when maximized', function () {
                dialog.maximize(/*animation=*/null);

                var tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=maximize]');
                expect(!tool).toBe(true);
            });

            it('should still have no tools when restored', function () {
                dialog.restore(/*animation=*/null);

                var tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=maximize]');
                expect(!tool).toBe(true);
            });
        });

        describe('maximizable:false maximized:true', function () {
            beforeEach(function () {
                createDialog({
                    header: false,
                    maximized: true
                });
            });

            it('should have no tools', function () {
                var tool = dialog.down('tool[type=maximize]');

                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);
            });

            it('should still have no tools when restored', function () {
                dialog.restore(/*animation=*/null);

                var tool = dialog.down('tool[type=restore]');
                expect(!tool).toBe(true);

                tool = dialog.down('tool[type=maximize]');
                expect(!tool).toBe(true);
            });
        });
    }); // header:false

    describe('events', function () {
        var events, returnValue;

        function createHandler (ev) {
            return function () {
                events[ev].push(Ext.Array.slice(arguments));
                return returnValue && returnValue[ev];
            };
        }

        beforeEach(function () {
            createDialog({
                title: 'Test',
                x: 100,
                y: 100,
                centered: false,
                width: 300,
                height: 200,
                maximizable: true,
                listeners: {
                    beforemaximize: createHandler('beforemaximize'),
                    beforerestore: createHandler('beforerestore'),
                    maximize: createHandler('maximize'),
                    restore: createHandler('restore')
                }
            });

            events = {
                beforemaximize: [],
                beforerestore: [],
                maximize: [],
                restore: []
            };

            returnValue = null;
        });

        it('should fire events for maximize and restore', function (done) {
            dialog.show();

            animates(dialog).then(function () {
                dialog.maximize().then(function (result) {
                    expect(result).toBe(true);
                    expect(dialog.getMaximized()).toBe(true);

                    expect(events.beforemaximize.length).toBe(1);
                    expect(events.beforerestore.length).toBe(0);
                    expect(events.maximize.length).toBe(1);
                    expect(events.restore.length).toBe(0);

                    expect(events.beforemaximize[0][0]).toBe(dialog);
                    expect(events.maximize[0][0]).toBe(dialog);


                    dialog.restore().then(function (result) {
                        expect(result).toBe(true);
                        expect(dialog.getMaximized()).toBe(false);

                        expect(events.beforemaximize.length).toBe(1);
                        expect(events.beforerestore.length).toBe(1);
                        expect(events.maximize.length).toBe(1);
                        expect(events.restore.length).toBe(1);

                        expect(events.beforemaximize[0][0]).toBe(dialog);
                        expect(events.beforerestore[0][0]).toBe(dialog);
                        expect(events.maximize[0][0]).toBe(dialog);
                        expect(events.restore[0][0]).toBe(dialog);

                        done();
                    });
                });
            });
        });

        it('should abort maximize if beforemaximize returns false', function (done) {
            dialog.show();

            animates(dialog).then(function () {
                returnValue = {
                    beforemaximize: false
                };

                dialog.maximize().then(function (result) {
                    expect(result).toBe(false);
                    expect(dialog.getMaximized()).toBeFalsy();

                    expect(events.beforemaximize.length).toBe(1);
                    expect(events.beforerestore.length).toBe(0);
                    expect(events.maximize.length).toBe(0);
                    expect(events.restore.length).toBe(0);

                    expect(events.beforemaximize[0][0]).toBe(dialog);
                    done();
                });
            });
        });

        it('should abort restore if beforerestore returns false', function (done) {
            dialog.show();

            animates(dialog).then(function () {
                dialog.maximize(null);

                expect(events.beforemaximize.length).toBe(1);
                expect(events.beforerestore.length).toBe(0);
                expect(events.maximize.length).toBe(1);
                expect(events.restore.length).toBe(0);

                expect(events.beforemaximize[0][0]).toBe(dialog);
                expect(events.maximize[0][0]).toBe(dialog);

                returnValue = {
                    beforerestore: false
                };

                dialog.restore().then(function (result) {
                    expect(result).toBe(false);
                    expect(dialog.getMaximized()).toBe(true);

                    expect(events.beforemaximize.length).toBe(1);
                    expect(events.beforerestore.length).toBe(1);
                    expect(events.maximize.length).toBe(1);
                    expect(events.restore.length).toBe(0);

                    expect(events.beforemaximize[0][0]).toBe(dialog);
                    expect(events.beforerestore[0][0]).toBe(dialog);
                    expect(events.maximize[0][0]).toBe(dialog);

                    done();
                });
            });
        });
    });
});
