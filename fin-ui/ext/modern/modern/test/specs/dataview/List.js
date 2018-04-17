topSuite("Ext.dataview.List", ['Ext.data.ArrayStore'], function() {
    var list;

    afterEach(function() {
        list = Ext.destroy(list);
    });

    function makeData (count) {
        var data = [];

        count = count || 128;

        for (var i = 0; i < count; ++i) {
            data.push({ value: 'Item' + i });
        }

        return data;
    }

    function makeComponent(config, storeData) {
        list = Ext.create(Ext.merge({
            xtype: 'list',
            renderTo: Ext.getBody(),
            itemTpl: '{value}',
            height: 256,
            width: 256,
            store: {
                type: 'store',
                data: storeData || makeData()
            }
        }, config));
    }

    describe('Rendered list with loaded store', function() {
        it('should immediately render records', function() {
            makeComponent({}, [
                    { value: 'foo' },
                    { value: 'bar' }
                ]);

            // Should be two simplelistitems in the List
            var items = list.getItems().items;

            expect(items.length).toBe(2);

            waitsFor(function () {
                return list.isPainted();
            });

            runs(function () {
                var rec = items[0].getRecord();
                expect(rec.data.value).toBe('foo');

                rec = items[1].getRecord();
                expect(rec.data.value).toBe('bar');
            });
        });
    });

    describe("infinite lists", function() {
        function makeList (config, data) {
            if (Ext.isArray(config)) {
                data = config;
                config = null;
            }

            config = config || {};
            config.infinite = true;

            makeComponent(config, data);
        }

        it("should limit itemCount to number of records", function() {
            makeList([
                { value: 'foo' },
                { value: 'bar' }
            ]);

            waitsFor(function() {
                return list.isPainted();
            });

            runs(function(){
                var bodyHeight = list.bodyElement.getHeight();

                expect(list.getItemCount()).toBe(2);

                // The bodyElement gets sized to stretch the scroll region
                var scroller = list.getScrollable();
                var size = scroller.getSize();

                expect(bodyHeight).toBe(size.y);
            });
        });

        it('should adjust rendered range due to scroll', function () {
            makeList();

            var scroller = list.getScrollable();

            waitsFor(function() {
                return list.isPainted();
            });

            runs(function () {
                scroller.scrollBy(0, list.rowHeight * 20);
            });

            waitsFor(function () {
                // scrolling down 20 rows should trigger a 10 row shift
                return list.getTopRenderedIndex() >= 10;
            });
        });

        it('should auto height using maxHeight', function () {
            makeList({
                height: null,
                maxHeight: 400
            });

            waitsFor(function () {
                return list.dataItems.length > 0;
            });

            runs(function () {
                expect(list.el.getHeight()).toBe(400);
            });
        });
    });

    describe('Grouped List', function() {
        it('should correctly handle headers when store is cleared', function() {
            makeComponent({
                grouped: true,
                store: {
                    grouper: {
                        property: 'group'
                    },
                    data: [
                        { group: 'A', value: 'bar' },
                        { group: 'F', value: 'foo' },
                        { group: 'F', value: 'foobar' }
                    ]
                }
            });

            var store = list.getStore();
            var groupInfo = list.groupingInfo;

            expect(store.getCount()).toBe(3);

            expect(groupInfo.headers.indices).toEqual([0, 1]);

            expect(groupInfo.footers.indices).toEqual([0, 2]);

            expect(store.removeAll.bind(store)).not.toThrow();
        })
    });

    describe('scrollToTopOnRefresh', function() {
        it('should not scroll to top when config is false', function() {
            makeComponent({scrollToTopOnRefresh: false});

            var scroller = list.getScrollable();

            waitsFor(function() {
                return list.isPainted();
            });

            runs(function () {
                scroller.scrollTo(null, 128);
                var pos = scroller.getPosition();
                expect(pos.y).toBe(128);

                list.refresh();
                pos = scroller.getPosition();
                expect(pos.y).toBe(128);
            });
        });

        it('should not scroll to top when adding a record', function() {
            makeComponent({scrollToTopOnRefresh: true});

            var scroller = list.getScrollable();

            scroller.scrollTo(null, 128);
            expect(scroller.getPosition().y).toBe(128);

            list.getStore().add({value: 'New item'});
            expect(scroller.getPosition().y).toBe(128);
        });

        it('should not scroll to top when removing a record', function() {
            makeComponent({scrollToTopOnRefresh: true});

            var scroller = list.getScrollable();

            scroller.scrollTo(null, 128);
            expect(scroller.getPosition().y).toBe(128);

            list.getStore().removeAt(42);
            expect(scroller.getPosition().y).toBe(128);
        });

        it('should not scroll to top when updating a record', function() {
            makeComponent({scrollToTopOnRefresh: true});

            var scroller = list.getScrollable();

            scroller.scrollTo(null, 128);
            expect(scroller.getPosition().y).toBe(128);

            list.getStore().getAt(42).set('value', 'foobar');
            expect(scroller.getPosition().y).toBe(128);
        });

        it('should scroll to top when the store is refreshed', function() {
            makeComponent({scrollToTopOnRefresh: true});

            var scroller = list.getScrollable();

            scroller.scrollTo(null, 128);
            expect(scroller.getPosition().y).toBe(128);

            list.getStore().sort('id', 'DESC');
            expect(scroller.getPosition().y).toBe(0);
        });

        it('should scroll to top when calling the refresh() method', function() {
            makeComponent({scrollToTopOnRefresh: true});

            var scroller = list.getScrollable();

            scroller.scrollTo(null, 128);
            expect(scroller.getPosition().y).toBe(128);

            list.refresh();
            expect(scroller.getPosition().y).toBe(0);
        });

        it('should not scroll to top if the refresh event is prevented', function() {
            makeComponent({scrollToTopOnRefresh: true});

            var scroller = list.getScrollable();

            scroller.scrollTo(null, 128);
            expect(scroller.getPosition().y).toBe(128);

            list.on('beforerefresh', function() { return false; });
            list.refresh();
            expect(scroller.getPosition().y).toBe(128);
        });
    });
});
