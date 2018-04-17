/**
 * This class makes buffered methods simple and also handles cleanup on `destroy`.
 *
 *      Ext.define('Foo', {
 *          mixins: [
 *              'Ext.mixin.Bufferable'
 *          ],
 *
 *          bufferableMethods: {
 *              // Provides a "foobar" method that calls "doFoobar" with the
 *              // most recent arguments but delayed by 50ms from the last
 *              // call. Calls to "foobar" made during the 50ms wait restart
 *              // the timer and replace the arguments.
 *
 *              foobar: 50
 *          },
 *
 *          method: function () {
 *              this.foobar(42);  // call doFoobar in 50ms
 *
 *              if (this.isFoobarPending) {
 *                  // test if "foobar" is pending
 *              }
 *
 *              this.flushFoobar();  // actually, call it now
 *
 *              this.cancelFoobar(); // or never mind
 *          },
 *
 *          doFoobar: function () {
 *              // time to do the "foobar" thing
 *          }
 *      });
 *
 * @since 6.5.0
 * @private
 */
Ext.define('Ext.mixin.Bufferable', function (Bufferable) { return {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'bufferable',

        before: {
            destroy: 'cancelAllCalls'
        },

        extended: function (baseClass, derivedClass, classBody) {
            var bufferableMethods = classBody.bufferableMethods;

            if (bufferableMethods) {
                delete classBody.bufferableMethods;

                Bufferable.processClass(derivedClass, bufferableMethods);
            }
        }
    },

    afterClassMixedIn: function (targetClass) {
        Bufferable.processClass(targetClass);
    },

    privates: {
        /**
         * Cancel all pending `bufferableMethod` calls on this object.
         * @since 6.5.0
         * @private
         */
        cancelAllCalls: function () {
            var bufferables = this.bufferables,
                name;

            if (bufferables) {
                for (name in bufferables) {
                    bufferables[name].cancel();
                    delete bufferables[name];
                }
            }
        },

        /**
         * Cancel a specific pending `bufferableMethod` call on this object.
         * @param {String} name The name of the buffered method to cancel.
         * @param {Boolean} invoke (private)
         * @return {Boolean} Returns `true` if a cancellation occurred.
         * @since 6.5.0
         * @private
         */
        cancelBufferedCall: function (name, invoke) {
            var bufferables = this.bufferables,
                timer = bufferables && bufferables[name];

            if (timer) {
                timer[invoke ? 'invoke' : 'cancel']();
            }

            return !!timer;
        },

        /**
         * Flushes a specific pending `bufferableMethod` call on this object if one is
         * pending.
         * @param {String} name The name of the buffered method to cancel.
         * @return {Boolean} Returns `true` if a flush occurred.
         * @since 6.5.0
         * @private
         */
        flushBufferedCall: function (name) {
            return this.cancelBufferedCall(name, true);
        },

        /**
         * This method initializes an instance when the first bufferable method is called.
         * It merges an instance-level `bufferableMethods` config if present. This allows
         * an instance to change the buffer timeouts, even to 0 to disable buffering.
         *
         *      Ext.create({
         *          ...
         *          bufferableMethods: {
         *              foobar: 0
         *          }
         *      });
         *
         * Note, this method cannot effect unbuffered methods. The `bufferableMethods`
         * config only instruments buffered methods when used on a class declaration.
         *
         * @return {Object}
         * @since 6.5.0
         * @private
         */
        initBufferables: function () {
            var me = this,
                methods = me.hasOwnProperty('bufferableMethods') && me.bufferableMethods,
                classMethods;

            if (methods) {
                classMethods = me.self.prototype.bufferableMethods;

                me.bufferableMethods = Ext.merge(Ext.clone(classMethods), methods);
            }

            return (me.bufferables = {});
        },

        /**
         * Returns `true` if a specific `bufferableMethod` is pending.
         * @param {String} name The name of the buffered method to cancel.
         * @return {Boolean}
         * @since 6.5.0
         * @private
         */
        isCallPending: function (name) {
            var bufferables = this.bufferables,
                timer = bufferables && bufferables[name];

            return !!timer;
        },

        statics: {
            _canceller: function () {
                var timer = this, // this fn is "cnacel()" on timer instances
                    id = timer.id;

                if (id) {
                    clearTimeout(id);
                    timer.id = null;
                }

                timer.args = null;
                timer.target[timer.flag] = false;
            },

            _invoker: function () {
                var timer = this, // this fn is "invoke()" on timer instances
                    args = timer.args,
                    target = timer.target;

                //<debug>
                ++timer.invokes;
                //</debug>

                timer.cancel();
                target[timer.fn].apply(target, args);
            },

            delayCall: function (target, name, flagName, methodName, args) {
                var bufferables = target.bufferables || target.initBufferables(),
                    timer = bufferables[name] || (bufferables[name] = {
                            //<debug>
                            calls: 0,
                            invokes: 0,
                            //</debug>
                            args: null,
                            cancel: Bufferable._canceller,
                            flag: flagName,
                            fn: methodName,
                            id: null,
                            name: name,
                            target: target,
                            invoke: Bufferable._invoker
                        }),
                    delay = target.bufferableMethods[name];

                if (timer.id) {
                    timer.cancel();
                }

                timer.args = args;
                //<debug>
                ++timer.calls;
                //</debug>

                if (delay) {
                    timer.id = Ext.defer(function () {
                        timer.id = null;
                        timer.invoke();
                    }, delay);

                    target[flagName] = true;
                }
                else {
                    // allow bufferableMethods: { foo: 0 } to force immediate call
                    timer.invoke();
                }
            },

            processClass: function (cls, bufferableMethods) {
                var proto = cls.prototype,
                    inherited = proto.bufferableMethods,
                    name;

                if (bufferableMethods) { // if (derived class)
                    if (inherited) {
                        // If we have a derived class, it could be just adjusting the
                        // configuration, not introducing new properties, so clone the
                        // inherited config and merge on the one from the classBody.
                        inherited = Ext.clone(inherited);
                        proto.bufferableMethods = Ext.merge(inherited, bufferableMethods);
                    }
                }
                else {
                    // else we are being mixed in, so the bufferableMethods on the
                    // prototype almost certainly belong to the immediate user class
                    // that is mixing us in... (leave the config on the prototype)
                    bufferableMethods = inherited;

                    // prevent shape change
                    proto.bufferables = null;
                }

                if (bufferableMethods) {
                    for (name in bufferableMethods) {
                        if (!proto[name]) {
                            Bufferable.processMethod(proto, name, Array.prototype.slice);
                        }
                    }
                }
            },

            processMethod: function (proto, name, slice) {
                var cap = Ext.String.capitalize(name),
                    flag = 'is' + cap + 'Pending',
                    fn = 'do' + cap;

                proto[name] = function () {
                    return Bufferable.delayCall(this, name, flag, fn, slice.call(arguments));
                };

                proto['cancel' + cap] = function () {
                    return this.cancelBufferedCall(name);
                };

                proto['flush' + cap] = function () {
                    return this.flushBufferedCall(name);
                };
            }
        } // statics
    } // privates
}});
