/**
 * @class Ext.dom.Element
 * @override Ext.dom.Element
 */
Ext.define('Ext.overrides.dom.Element', {
    override: 'Ext.dom.Element',

    _positionTopLeft: ['position', 'top', 'left'],

    /**
     * Measures and returns the size of this element. When `dimension` is `null` (or
     * not specified), this will be an object with `width` and `height` properties.
     *
     * If `dimension` is `'w'` the value returned will be this element's width. If
     * `dimension` is `'h'` the returned value will be this element's height.
     *
     * Unlike `getWidth` and `getHeight` this method only returns "precise" (sub-pixel)
     * sizes based on the `getBoundingClientRect` API.
     *
     * @param {'w'/'h'} [dimension] Specifies which dimension is desired. If omitted
     * then an object with `width` and `height` properties is returned.
     * @return {Number/Object} This element's width, height or both as a readonly
     * object. This object may be the direct result of `getBoundingClientRect` and
     * hence immutable on some browsers.
     * @private
     * @since 6.5.0
     */
    measure: function (dimension) {
        var me = this,
            dom = me.dom,
            includeWidth = dimension !== 'h',
            height, rect, width;

        // Use the viewport height if they are asking for body height
        if (dom.nodeName === 'BODY') {
            height = dimension !== 'w' && Element.getViewportHeight();
            width = includeWidth && Element.getViewportWidth();

            // Don't create a temporary object unless we need to return it...
            rect = dimension ? null : { width: width, height: height };
        }
        else {
            rect = dom.getBoundingClientRect();

            height = rect.height;
            width = rect.width;
        }

        // NOTE: The classic override handles IE8/9/10 issues (which are many)

        return dimension ? (includeWidth ? width : height) : rect;
    },

    setX: function(x, animate) {
        return this.setXY([x, this.getY()], animate);
    },

    setXY: function(xy, animate) {
        var me = this;

        if (!animate) {
            me.callParent([xy]);
        } else {
            if (!Ext.isObject(animate)) {
                animate = {};
            }
            me.animate(Ext.applyIf({ to: { x: xy[0], y: xy[1] } }, animate));
        }
        return this;
    },

    setY: function(y, animate) {
        return this.setXY([this.getX(), y], animate);
    },

    translateXY: function(x, y) {
        var me = this,
            el = me.el,
            styles = el.getStyle(me._positionTopLeft),
            relative = styles.position === 'relative',
            left = parseFloat(styles.left),
            top = parseFloat(styles.top),
            xy = me.getXY();

        if (Ext.isArray(x)) {
             y = x[1];
             x = x[0];
        }
        if (isNaN(left)) {
            left = relative ? 0 : el.dom.offsetLeft;
        }
        if (isNaN(top)) {
            top = relative ? 0 : el.dom.offsetTop;
        }
        left = (typeof x === 'number') ? x - xy[0] + left : undefined;
        top = (typeof y === 'number') ? y - xy[1] + top : undefined;
        return {
            x: left,
            y: top
        };
    },

    /**
     * Visits nodes in this elements tree which conform to the passed filter bitmask
     * and calls the specified callback on each one.
     *
     * @param {Object} options Properties used to affect the traverse.
     * @param {Function} options.callback A method to call on every node visited. Return
     * `false` to terminate the traverse.
     * @param {HTMLElement} options.callback.node The node being visited.
     * @param {Object} [options.scope] The scope (`this` reference) in which to execute the callback.
     * @param {String} options.selector A DOM query selector string to filter the nodes visited..
     * @param {Boolean} options.reverse `true` to traverse the tree in reverse from lastChild to first.
     * @param {Ext.Element/HTMLElement} [options.excludeRoot] An element inside which to exclude visits.
     * @param {Boolean} [options.skipSelf=false] Pass `true` to exclude this element.
     * @param {Number} [options.include] A bitwise mask of DOM node types to include.
     * Defaults to visiting all *element* nodes.
     * @return {*} The return value from the last call to the callback.
     */
    visit: function (options) {
        var me = this,
            dom = me.dom,
            skipSelf = options.skipSelf,
            excludeRoot = options.excludeRoot,
            callback = options.callback || options.fn,
            scope = options.scope || this,
            reverse = options.reverse,
            selector = options.selector,
            whatToShow = options.include || NodeFilter.SHOW_ELEMENT,
            // The 4th parameter is deprecated and listed as optional, however IE11,
            // requires that it be passed.
            treeWalker = document.createTreeWalker(dom, whatToShow, null, false),
            result = null,
            node = dom;

        // Push TreeWalker to end if we are visiting in reverse.
        if (reverse) {
            for (node = dom.lastElementChild; node.lastElementChild; node = node.lastElementChild);
            treeWalker.currentNode = node;
        }

        // Visit descendants in specified order.
        for (; result !== false && node; node = reverse ? treeWalker.previousNode() : treeWalker.nextNode()) {
            if (!(excludeRoot && excludeRoot.contains(node))) {
                if (!(node === dom && skipSelf)) {
                    if (!(selector && !node[Ext.supports.matchesSelector](selector))) {
                        result = Ext.callback(callback, scope, [node]);
                    }
                }
            }
        }

        return result;
    }
});
