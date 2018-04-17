topSuite("Ext.chart.series.Pie3D", function() {
    describe("renderer", function () {
        var chart,
            red = '#ff0000',
            layoutDone;

        afterEach(function () {
            chart = Ext.destroy(chart);
        });

        it("should change slice colors", function () {
            runs(function () {
                chart = Ext.create({
                    xtype: 'polar',

                    renderTo: Ext.getBody(),
                    width: 400,
                    height: 400,

                    store: {
                        data: [
                            { x: 1 },
                            { x: 2 },
                            { x: 3 }
                        ]
                    },
                    series: [{
                        type: 'pie',
                        angleField: 'x',
                        renderer: function () {
                            return {
                                fillStyle: red
                            };
                        }
                    }],
                    listeners: {
                        layout: function () {
                            layoutDone = true;
                        }
                    }
                });
            });

            waitsFor(function () {
                return layoutDone;
            });

            runs(function () {
                 var series = chart.getSeries()[0];
                 var sprites = series.getSprites();

                 for (var i = 0; i < sprites.length; i++) {
                     var sprite = sprites[i];
                     expect(sprite.attr.fillStyle).toBe(red);
                 }
            });
        });
    });

    describe("label.renderer", function () {
        var chart,
            labelText = 'xd',
            layoutDone;

        afterEach(function () {
            chart = Ext.destroy(chart);
        });

        it("should change slice labels", function () {
            runs(function () {
                chart = Ext.create({
                    xtype: 'polar',

                    renderTo: Ext.getBody(),
                    width: 400,
                    height: 400,

                    store: {
                        data: [
                            { x: 1 },
                            { x: 2 },
                            { x: 3 }
                        ]
                    },
                    series: [{
                        type: 'pie',
                        angleField: 'x',
                        label: {
                            field: 'x',
                            renderer: function () {
                                return labelText;
                            }
                        }
                    }],
                    listeners: {
                        layout: function () {
                            layoutDone = true;
                        }
                    }
                });
            });

            waitsFor(function () {
                return layoutDone;
            });

            runs(function () {
                var series = chart.getSeries()[0];
                var sprites = series.getSprites();

                for (var i = 0; i < sprites.length; i++) {
                    var sprite = sprites[i];
                    expect(sprite.getMarker('labels').get(0).text).toBe('xd');
                }
            });
        });
    });
});
