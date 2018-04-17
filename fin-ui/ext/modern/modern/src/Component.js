/**
 * Most of the visual classes you interact with are Components. Every Component is a
 * subclass of Ext.Component, which means they can all:
 *
 * * Render themselves onto the page using a template
 * * Show and hide themselves at any time
 * * Center themselves within their parent container
 * * Enable and disable themselves
 *
 * They can also do a few more advanced things:
 *
 * * Float above other components (windows, message boxes and overlays)
 * * Change size and position on the screen with animation
 * * Dock other Components inside themselves (useful for toolbars)
 * * Align to other components, allow themselves to be dragged around, make their content scrollable & more
 *
 * ## Available Components
 *
 * There are many components.  They are separated into 4 main groups:
 *
 * ### Navigation components
 * * {@link Ext.Toolbar}
 * * {@link Ext.Button}
 * * {@link Ext.TitleBar}
 * * {@link Ext.SegmentedButton}
 * * {@link Ext.Title}
 * * {@link Ext.Spacer}
 *
 * ### Store-bound components
 * * {@link Ext.dataview.DataView}
 * * {@link Ext.Carousel}
 * * {@link Ext.List}
 * * {@link Ext.NestedList}
 *
 * ### Form components
 * * {@link Ext.form.Panel}
 * * {@link Ext.form.FieldSet}
 * * {@link Ext.field.Checkbox}
 * * {@link Ext.field.Hidden}
 * * {@link Ext.field.Slider}
 * * {@link Ext.field.Text}
 * * {@link Ext.picker.Picker}
 * * {@link Ext.picker.Date}
 *
 * ### General components
 * * {@link Ext.Panel}
 * * {@link Ext.tab.Panel}
 * * {@link Ext.Viewport Ext.Viewport}
 * * {@link Ext.Img}
 * * {@link Ext.Audio}
 * * {@link Ext.Video}
 * * {@link Ext.Sheet}
 * * {@link Ext.ActionSheet}
 * * {@link Ext.MessageBox}
 *
 *
 * ## Instantiating Components
 *
 * Components are created the same way as all other classes - using Ext.create. Here's how we can
 * create a Text field:
 *
 *     var panel = Ext.create('Ext.Panel', {
 *         html: 'This is my panel'
 *     });
 *
 * This will create a {@link Ext.Panel Panel} instance, configured with some basic HTML content. A Panel is just a
 * simple Component that can render HTML and also contain other items. In this case we've created a Panel instance but
 * it won't show up on the screen yet because items are not rendered immediately after being instantiated. This allows
 * us to create some components and move them around before rendering and laying them out, which is a good deal faster
 * than moving them after rendering.
 *
 * To show this panel on the screen now we can simply add it to the global Viewport:
 *
 *     Ext.Viewport.add(panel);
 *
 * Panels are also Containers, which means they can contain other Components, arranged by a layout. Let's revisit the
 * above example now, this time creating a panel with two child Components and a hbox layout:
 *
 *     @example
 *     var panel = Ext.create('Ext.Panel', {
 *         layout: 'hbox',
 *
 *         items: [
 *             {
 *                 xtype: 'panel',
 *                 flex: 1,
 *                 html: 'Left Panel, 1/3rd of total size',
 *                  style: 'background-color: #5E99CC;'
 *             },
 *             {
 *                 xtype: 'panel',
 *                 flex: 2,
 *                 html: 'Right Panel, 2/3rds of total size',
 *                 style: 'background-color: #759E60;'
 *             }
 *         ]
 *     });
 *
 *     Ext.Viewport.add(panel);
 *
 * This time we created 3 Panels - the first one is created just as before but the inner two are declared inline using
 * an xtype. Xtype is a convenient way of creating Components without having to go through the process of using
 * Ext.create and specifying the full class name, instead you can just provide the xtype for the class inside an object
 * and the framework will create the components for you.
 *
 * We also specified a layout for the top level panel - in this case hbox, which splits the horizontal width of the
 * parent panel based on the 'flex' of each child. For example, if the parent Panel above is 300px wide then the first
 * child will be flexed to 100px wide and the second to 200px because the first one was given `flex: 1` and the second
 * `flex: 2`.
 *
 * ## Using xtype
 *
 * xtype is an easy way to create Components without using the full class name. This is especially useful when creating
 * a {@link Ext.Container Container} that contains child Components. An xtype is simply a shorthand way of specifying a
 * Component - for example you can use `xtype: 'panel'` instead of typing out Ext.Panel.
 *
 * Sample usage:
 *
 *     @example
 *     Ext.create('Ext.Container', {
 *         fullscreen: true,
 *         layout: 'fit',
 *
 *         items: [
 *             {
 *                 xtype: 'panel',
 *                 html: 'This panel is created by xtype'
 *             },
 *             {
 *                 xtype: 'toolbar',
 *                 title: 'So is the toolbar',
 *                 docked: 'top'
 *             }
 *         ]
 *     });
 *
 *
 * ### Common xtypes
 *
 * <pre>
 xtype                   Class
 -----------------       ---------------------
 actionsheet             Ext.ActionSheet
 audio                   Ext.Audio
 button                  Ext.Button
 image                   Ext.Img
 label                   Ext.Label
 loadmask                Ext.LoadMask
 panel                   Ext.Panel
 segmentedbutton         Ext.SegmentedButton
 sheet                   Ext.Sheet
 spacer                  Ext.Spacer
 titlebar                Ext.TitleBar
 toolbar                 Ext.Toolbar
 video                   Ext.Video
 carousel                Ext.carousel.Carousel
 navigationview          Ext.navigation.View
 datepicker              Ext.picker.Date
 picker                  Ext.picker.Picker
 slider                  Ext.slider.Slider
 thumb                   Ext.slider.Thumb
 tabpanel                Ext.tab.Panel
 viewport                Ext.viewport.Default

 DataView Components
 ---------------------------------------------
 dataview                Ext.dataview.DataView
 list                    Ext.dataview.List
 nestedlist              Ext.dataview.NestedList

 Form Components
 ---------------------------------------------
 checkboxfield           Ext.field.Checkbox
 datepickerfield         Ext.field.DatePicker
 emailfield              Ext.field.Email
 hiddenfield             Ext.field.Hidden
 numberfield             Ext.field.Number
 passwordfield           Ext.field.Password
 radiofield              Ext.field.Radio
 searchfield             Ext.field.Search
 selectfield             Ext.field.Select
 sliderfield             Ext.field.Slider
 spinnerfield            Ext.field.Spinner
 textfield               Ext.field.Text
 textareafield           Ext.field.TextArea
 togglefield             Ext.field.Toggle
 urlfield                Ext.field.Url
 fieldset                Ext.form.FieldSet
 formpanel               Ext.form.Panel
 * </pre>
 *
 * ## Configuring Components
 *
 * Whenever you create a new Component you can pass in configuration options. All of the configurations for a given
 * Component are listed in the "Config options" section of its class docs page. You can pass in any number of
 * configuration options when you instantiate the Component, and modify any of them at any point later. For example, we
 * can easily modify the {@link Ext.Panel#html html content} of a Panel after creating it:
 *
 *     @example
 *     // we can configure the HTML when we instantiate the Component
 *     var panel = Ext.create('Ext.Panel', {
 *         fullscreen: true,
 *         html: 'This is a Panel'
 *     });
 *
 *     // we can update the HTML later using the setHtml method:
 *     panel.setHtml('Some new HTML');
 *
 *     // we can retrieve the current HTML using the getHtml method:
 *     Ext.Msg.alert(panel.getHtml()); // displays "Some new HTML"
 *
 * Every config has a getter method and a setter method - these are automatically generated and always follow the same
 * pattern. For example, a config called `html` will receive `getHtml` and `setHtml` methods, a config called `defaultType`
 * will receive `getDefaultType` and `setDefaultType` methods, and so on.
 */
Ext.define('Ext.Component', {
    extend: 'Ext.Widget',

    // @override Ext.Widget
    alternateClassName: ['Ext.lib.Component', 'Ext.Gadget'],

    requires: [
        'Ext.ComponentManager',
        'Ext.ComponentQuery',
        'Ext.XTemplate',
        'Ext.util.translatable.CssPosition',
        'Ext.util.translatable.CssTransform',
        'Ext.scroll.Scroller'
    ],

    /**
     * @cfg {String} xtype
     * The `xtype` configuration option can be used to optimize Component creation and rendering. It serves as a
     * shortcut to the full component name. For example, the component `Ext.button.Button` has an xtype of `button`.
     *
     * You can define your own xtype on a custom {@link Ext.Component component} by specifying the
     * {@link Ext.Class#alias alias} config option with a prefix of `widget`. For example:
     *
     *     Ext.define('PressMeButton', {
     *         extend: 'Ext.button.Button',
     *         alias: 'widget.pressmebutton',
     *         text: 'Press Me'
     *     });
     *
     * Any Component can be created implicitly as an object config with an xtype specified, allowing it to be
     * declared and passed into the rendering pipeline without actually being instantiated as an object. Not only is
     * rendering deferred, but the actual creation of the object itself is also deferred, saving memory and resources
     * until they are actually needed. In complex, nested layouts containing many Components, this can make a
     * noticeable improvement in performance.
     *
     *     // Explicit creation of contained Components:
     *     var panel = new Ext.Panel({
     *        // ...
     *        items: [
     *           Ext.create('Ext.button.Button', {
     *              text: 'OK'
     *           })
     *        ]
     *     });
     *
     *     // Implicit creation using xtype:
     *     var panel = new Ext.Panel({
     *        // ...
     *        items: [{
     *           xtype: 'button',
     *           text: 'OK'
     *        }]
     *     });
     *
     * In the first example, the button will always be created immediately during the panel's initialization. With
     * many added Components, this approach could potentially slow the rendering of the page. In the second example,
     * the button will not be created or rendered until the panel is actually displayed in the browser. If the panel
     * is never displayed (for example, if it is a tab that remains hidden) then the button will never be created and
     * will never consume any resources whatsoever.
     */
    xtype: 'component',

    cachedConfig: {
        /**
         * @cfg {Number/String} margin The margin to use on this Component. Can be specified as a number (in which case
         * all edges get the same margin) or a CSS string like '5 10 10 10'
         * @accessor
         */
        margin: null,

        /**
         * @cfg {Number/String} padding The padding to use on this Component. Can be specified as a number (in which
         * case all edges get the same padding) or a CSS string like '5 10 10 10'
         * @accessor
         */
        padding: null,

        /**
         * @cfg {Number} [tabIndex] DOM tabIndex attribute for this component's
         * {@link #focusEl}.
         */
        tabIndex: null
    },

    eventedConfig: {
        /**
         * @cfg {Number/String} left
         * The absolute left position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'positioned', which means it will no
         * longer participate in the layout of the Container that it resides in.
         * @accessor
         * @evented
         */
        left: null,

        /**
         * @cfg {Number/String} top
         * The absolute top position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'positioned', which means it will no
         * longer participate in the layout of the Container that it resides in.
         * @accessor
         * @evented
         */
        top: null,

        /**
         * @cfg {Number/String} right
         * The absolute right position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'positioned', which means it will no
         * longer participate in the layout of the Container that it resides in.
         * @accessor
         * @evented
         */
        right: null,

        /**
         * @cfg {Number/String} bottom
         * The absolute bottom position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'positioned', which means it will no
         * longer participate in the layout of the Container that it resides in.
         * @accessor
         * @evented
         */
        bottom: null,

        /**
         * @cfg {Number/String} minWidth
         * The minimum width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * @accessor
         * @evented
         */
        minWidth: null,

        /**
         * @cfg {Number/String} minHeight
         * The minimum height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * @accessor
         * @evented
         */
        minHeight: null,

        /**
         * @cfg {Number/String} maxWidth
         * The maximum width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * Note that this config will not apply if the Component is 'positioned' (absolutely positioned or centered)
         * @accessor
         * @evented
         */
        maxWidth: null,

        /**
         * @cfg {Number/String} maxHeight
         * The maximum height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * Note that this config will not apply if the Component is 'positioned' (absolutely positioned or centered)
         * @accessor
         * @evented
         */
        maxHeight: null,

        /**
         * @cfg {Boolean/String/Object} scrollable
         * Configuration options to make this Component scrollable. Acceptable values are:
         *
         * - `true` to enable auto scrolling.
         * - `false` (or `null`) to disable scrolling - this is the default.
         * - `x` or `horizontal` to enable horizontal scrolling only
         * - `y` or `vertical` to enable vertical scrolling only
         *
         * Also accepts a configuration object for a `{@link Ext.scroll.Scroller}` if
         * if advanced configuration is needed.
         *
         * The getter for this config returns the {@link Ext.scroll.Scroller Scroller}
         * instance.  You can use the Scroller API to read or manipulate the scroll position:
         *
         *     // scrolls the component to 5 on the x axis and 10 on the y axis
         *     component.getScrollable().scrollTo(5, 10);
         *
         * @accessor
         * @evented
         */
        scrollable: null,

        /**
         * @cfg {String} docked
         * The dock position of this component in its container. Can be `left`, `top`, `right` or `bottom`.
         *
         * __Notes__
         *
         * You must use a HTML5 doctype for {@link #docked} `bottom` to work. To do this, simply add the following code to the HTML file:
         *
         *     <!doctype html>
         *
         * So your index.html file should look a little like this:
         *
         *     <!doctype html>
         *     <html>
         *         <head>
         *             <title>MY application title</title>
         *             ...
         *
         * @accessor
         * @evented
         */
        docked: null,

        /**
         * @cfg {Boolean} [centered=false]
         * Configure this as `true` to have this Component centered within its Container.
         * Setting this value to `true` will make this Component become 'positioned', which means it will no
         * longer participate in the layout of the Container that it resides in.
         * @accessor
         * @evented
         */
        centered: {
            lazy: true,
            $value: null
        }
    },

    config: {
        /**
         * @cfg {Boolean} displayed
         * Set to `true` to call `show` and `false` to call `hide`. Unlike the `hidden`
         * config, changing this config will potentially involve animations to show or
         * hide the component.
         * @since 6.5.0
         */
        displayed: null,

        /**
         * @cfg {String/Ext.Element/HTMLElement} html Optional HTML content to render inside this Component, or a reference
         * to an existing element on the page.
         * @accessor
         */
        html: null,

        // @cmd-auto-dependency { defaultType: "Ext.drag.Source" }
        /**
         * @cfg {Boolean/Object/Ext.drag.Source} draggable
         * Set to `true` to allow this component to be dragged. This can also be the config
         * object for the `Ext.drag.Source` that will manage the drag.
         */
        draggable: null,

        /**
         * @cfg {Number} [zIndex] The z-index to give this Component when it is rendered.
         *
         * Not valid for {@link #cfg-floated} Components. The Z ordering of {@link #cfg-floated}
         * Components is managed by ordering of the DOM elements.
         * @accessor
         */
        zIndex: null,

        /**
         * @cfg {String/String[]/Ext.Template/Ext.XTemplate[]} tpl
         * A {@link String}, {@link Ext.Template}, {@link Ext.XTemplate} or an {@link Array} of strings to form an {@link Ext.XTemplate}.
         * Used in conjunction with the {@link #data} and {@link #tplWriteMode} configurations.
         *
         * __Note__
         * The {@link #data} configuration _must_ be set for any content to be shown in the component when using this configuration.
         * @accessor
         */
        tpl: null,

        /**
         * @cfg {String/Mixed} enterAnimation
         * Animation effect to apply when the Component is being shown.  Typically you want to use an
         * inbound animation type such as 'fadeIn' or 'slideIn'.
         * @deprecated 2.0.0 Please use {@link #showAnimation} instead.
         * @accessor
         */
        enterAnimation: null,

        /**
         * @cfg {String/Mixed} exitAnimation
         * Animation effect to apply when the Component is being hidden.
         * @deprecated 2.0.0 Please use {@link #hideAnimation} instead.  Typically you want to use an
         * outbound animation type such as 'fadeOut' or 'slideOut'.
         * @accessor
         */
        exitAnimation: null,

        /**
         * @cfg {String/Mixed} showAnimation
         * Animation effect to apply when the Component is being shown.  Typically you want to use an
         * inbound animation type such as 'fadeIn' or 'slideIn'. For more animations, check the {@link Ext.fx.Animation#type} config.
         * @accessor
         */
        showAnimation: null,

        /**
         * @cfg {String/Mixed} hideAnimation
         * Animation effect to apply when the Component is being hidden.  Typically you want to use an
         * outbound animation type such as 'fadeOut' or 'slideOut'. For more animations, check the {@link Ext.fx.Animation#type} config.
         * @accessor
         */
        hideAnimation: null,

        /**
         * @cfg {String} tplWriteMode The Ext.(X)Template method to use when
         * updating the content area of the Component.
         * Valid modes are:
         *
         * - append
         * - insertAfter
         * - insertBefore
         * - insertFirst
         * - overwrite
         * @accessor
         */
        tplWriteMode: 'overwrite',

        /**
         * @cfg {Object} data
         * The initial set of data to apply to the `{@link #tpl}` to
         * update the content area of the Component.
         * @accessor
         */
        data: null,

        /**
         * @cfg {Ext.Element/HTMLElement/String} contentEl The configured element will automatically be
         * added as the content of this component. When you pass a string, we expect it to be an element id.
         * If the content element is hidden, we will automatically show it.
         * @accessor
         */
        contentEl: null,

        /**
         * @cfg {Ext.data.Model} record A model instance which updates the Component's html based on it's tpl. Similar to the data
         * configuration, but tied to to a record to make allow dynamic updates.  This must be a model
         * instance and not a configuration of one.
         * @accessor
         */
        record: null,

        /**
         * @cfg {Boolean} [useBodyElement=null]
         * @private
         */

        // @cmd-auto-dependency {defaultType: "Ext.tip.ToolTip"}
        /**
         * @cfg {String/Object} tooltip
         * The tooltip for this component - can be a string to be used as innerHTML
         * (html tags are accepted) or {@link Ext.tip.ToolTip} config object.
         *
         * The default behavior is to use a shared tip instance. The tooltip configuration is registered with the
         * {@link Ext.tip.Manager}. To enable this, your application can set the {@link Ext.app.Application#quickTips}
         * config, or an instance of the {@link Ext.tip.Manager} may be created manually.
         *
         * To force a unique tooltip instance to be created, specify `autoCreate: true` on this configuration.
         *
         * Configuring this with `autoHide: false` implies `autoCreate: true` so that the desired persistent
         * behavior can be obtained with other targets still showing the singleton instance.
         */
        tooltip: null,

        /**
         * @cfg {Boolean} [axisLock] If `true`, then, when {@link #showBy} or {@link #alignTo} fallback on
         * constraint violation only takes place along the major align axis.
         *
         * That is, if alignment `"l-r"` is being used, and `axisLock: true` is used, then if constraints
         * fail, only fallback to `"r-l"` is considered.
         */
        axisLock: null,

        // @cmd-auto-dependency {defaultType: "Ext.Mask"}
        /**
         * @cfg {Boolean} modal `true` to make this Component modal. This will create a mask underneath the Component
         * that covers its parent and does not allow the user to interact with any other Components until this
         * Component is dismissed.
         * @accessor
         */
        modal: {
            lazy: true,
            $value: null
        },

        /**
         * @cfg {Boolean} hideOnMaskTap When using a {@link #cfg!modal} Component, setting this to `true`
         * will hide the modal mask and the Container when the mask is tapped on.
         * @accessor
         */
        hideOnMaskTap: {
            lazy: true,
            $value: null
        },

        /**
         * @cfg {Number} [weight=0]
         * This value controls this item's order in a {@link Ext.Container#cfg!weighted weighted}
         * {@link Ext.Container container} (see {@link #cfg!parent}).
         *
         * Lower values gravitate towards the start of the container - the top in vertical layouts, the
         * locale start side in horizontal layouts.
         */
        weight: null
    },

    /**
     * @cfg {Boolean} modelValidation
     * This config enables binding to your `{@link Ext.data.Model#validators}`. This
     * is only processed by form fields (e.g., `Ext.field.*`) at present, however, this
     * setting is inherited and so can be set on a parent container.
     *
     * When set to `true` by a component (or by an ancestor container), the `validators`
     * of for any {@Ext.data.Model record} fields will be used wherever the `value` is
     * bound to such data fields.
     *
     * While this config can be set arbitrarily high in the component hierarchy, doing
     * so can create a lot overhead if most of your form fields do not actually rely on
     * `validators` in your data model.
     *
     * Using this setting for a form that is bound to an `Ext.data.Model` might look
     * like this:
     *
     *      {
     *          xtype: 'panel',
     *          modelValidation: true,
     *          items: [{
     *              xtype: 'textfield',
     *              bind: '{theUser.firstName}'
     *          },{
     *              xtype: 'textfield',
     *              bind: '{theUser.lastName}'
     *          },{
     *              xtype: 'textfield',
     *              bind: '{theUser.phoneNumber}'
     *          },{
     *              xtype: 'textfield',
     *              bind: '{theUser.email}'
     *          }]
     *      }
     * @since 6.5.0
     */
    modelValidation: null,

    /**
     * @event beforeshow
     * Fires before the Component is shown. Show may be vetoed by returning `false` from a handler.
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event show
     * Fires whenever the Component is shown
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event beforehide
     * Fires before the Component is hidden. Hide may be vetoed by returning `false` from a handler.
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event hide
     * Fires whenever the Component is hidden
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event fullscreen
     * Fires whenever a Component with the fullscreen config is instantiated
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event floatingchange
     * Fires whenever there is a change in the positioned status of a component
     * @param {Ext.Component} this The component instance
     * @param {Boolean} positioned The component's new positioned state. This becomes
     * `true` is a component is positioned using the {@link #cfg-top}, {@link #cfg-right},
     * {@link #cfg-bottom} or {@link #cfg-left} configs.
     * @deprecated 6.2.0 Use {@link #positionedchange} instead
     */
    /**
     * @event positionedchange
     * Fires whenever there is a change in the positioned status of a component
     * @param {Ext.Component} this The component instance
     * @param {Boolean} positioned The component's new positioned state. This becomes
     * `true` is a component is positioned using the {@link #cfg-top}, {@link #cfg-right},
     * {@link #cfg-bottom} or {@link #cfg-left} configs.
     */

    /**
     * @event destroy
     * Fires when the component is destroyed
     */

    /**
     * @event beforeorientationchange
     * Fires before orientation changes.
     * @removed 2.0.0 This event is now only available `onBefore` the Viewport's {@link Ext.Viewport#orientationchange}
     */

    /**
     * @event orientationchange
     * Fires when orientation changes.
     * @removed 2.0.0 This event is now only available on the Viewport's {@link Ext.Viewport#orientationchange}
     */

    /**
     * @event initialize
     * Fires when the component has been initialized
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event painted
     * @inheritdoc Ext.dom.Element#painted
     * @param {Ext.Element} element The component's outer element (this.element)
     */

    /**
     * @event erased
     * Fires when the component is no longer displayed in the DOM.  Listening to this event will
     * degrade performance not recommend for general use.
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event resize
     * @inheritdoc Ext.dom.Element#resize
     * @param {Ext.Element} element The component's outer element (this.element).
     * @param {Object} info The component's new size parameters.
     */

    /**
     * @event added
     * Fires after a Component had been added to a Container.
     * @param {Ext.Component} this
     * @param {Ext.Container} container Parent Container
     * @param {Number} index The index of the item within the Container.
     */

    /**
     * @event removed
     * Fires when a component is removed from a Container
     * @param {Ext.Component} this
     * @param {Ext.Container} container Container which holds the component
     * @param {Number} index The index of the item that was removed.
     */

    /**
     * @event moved
     * Fires when a component si moved within its Container.
     * @param {Ext.Component} this
     * @param {Ext.Container} container Container which holds the component
     * @param {Number} toIndex The new index of the item.
     * @param {Number} fromIndex The old index of the item.
     */

    /**
     * @property {Boolean} rendered
     * @readonly
     * The rendered flag is set when a widget is inserted into the document for the first time.
     *
     * Note that this is a one-way operation. The first time a widget is inserted into the
     * document, this flag is set, and it is never unset.
     */

    /**
     * @inheritdoc
     */
    defaultBindProperty: 'html',

    /**
     * @private
     */
    isComponent: true,

    /**
     * @private
     */
    positioned: false,

    /**
     * @private
     */
    rendered: false,

    /**
     * @private
     */
    activeAnimation: null,

    /**
     * @readonly
     * @private
     */
    dockPositions: {
        top: true,
        right: true,
        bottom: true,
        left: true
    },

    bodyElement: null,

    classCls: Ext.baseCSSPrefix + 'component',
    rootCls: Ext.baseCSSPrefix + 'root',
    floatingCls: Ext.baseCSSPrefix + 'floating',
    hiddenCls: Ext.baseCSSPrefix + 'hidden',

    _scrollableCfg: {
        x: {
            x: true,
            y: false
        },
        y: {
            x: false,
            y: true
        },
        horizontal: {
            x: true,
            y: false
        },
        vertical: {
            x: false,
            y: true
        },
        both: {
            x: true,
            y: true
        },
        'true': {
            x: true,
            y: true
        },
        'false': {
            x: false,
            y: false
        }
    },

    statics: {
        /**
         * Find the Widget or Component to which the given event/element belongs.
         *
         * @param {Ext.event.Event/Ext.dom.Element/HTMLElement} el The element or event
         * from which to start to find an owning Component.
         * @param {Ext.dom.Element/HTMLElement} [limit] The element at which to stop upward
         * searching for an owning Component, or the number of Components to traverse
         * before giving up. Defaults to the document's HTML element.
         * @param {String} [selector] An optional {@link Ext.ComponentQuery} selector to
         * filter the target.
         * @return {Ext.Component} Component, or null
         *
         * @since 6.5.0
         */
        from: function(el, limit, selector) {
            return Ext.ComponentManager.from(el, limit, selector);
        },

        /**
         * Find the Widget or Component to which the given Element belongs.
         *
         * @param {Ext.dom.Element/HTMLElement} el The element from which to start to find an owning Component.
         * @param {Ext.dom.Element/HTMLElement} [limit] The element at which to stop upward searching for an
         * owning Component, or the number of Components to traverse before giving up.
         * Defaults to the document's HTML element.
         * @param {String} [selector] An optional {@link Ext.ComponentQuery} selector to filter the target.
         * @return {Ext.Component/null} Component, or null
         *
         * @deprecated 6.5.0 Use {@link Ext.Component#method!from} instead.
         * @since 6.0.1
         */
        fromElement: function(el, limit, selector) {
            return Ext.ComponentManager.from(el, limit, selector);
        }
    },

    initialConfig: null,
    $initParent: null,

    /**
     * Creates new Component.
     * @param {Object} config The standard configuration object.
     */
    constructor: function(config) {
        var me = this,
            VP = Ext['Viewport'],
            // There is similar code in widget, however we
            // want to defer rendering until the component has been initialized
            renderTo = config && config.renderTo,
            el;

        me.lastSize = {};
        me.onInitializedListeners = [];

        if (config) {
            me.initialConfig = config;
            // We need to copy this over here and not rely on initConfig to do so since
            // configs (esp cached configs like "ui") can be set() prior to copying of
            // such properties.
            me.$initParent = config.$initParent;

            // The Responsive plugin must be created before initConfig runs in order to
            // process the initial responsiveConfig block. The simplest and safest solution
            // is to accelerate the activation of this plugin here and leave the timing
            // as it has always been for other plugins.
            if (me.activatePlugin('responsive')) {
                config = me.initialConfig;
            }
        }

        if (renderTo) {
            config = Ext.apply({}, config);
            delete config.renderTo;
        }

        me.callParent([ config ]);

        if (me.onResize) {
            me.on({
                resize: 'onElementResize',
                scope: me,
                priority: 1000
            });
        }

        // Start with the assumption that we are at the root of the component/container
        // hierarchy unless we begin with an upward ownership link.
        // rootCls will be removed when we are added to a container
        if (!me.getRefOwner()) {
            me.getRootEl().addCls(me.rootCls);
        }

        me.refreshPositioned = me.doRefreshPositioned;

        if (me.refreshPositionedOnInitialized) {
            me.refreshPositioned();
        }

        me.initialize();

        me.triggerInitialized();

        el = me.element;

        // Add these after initializing to prevent the monitoring elements
        // from being added too early. If they get added early, they end up
        // as part of the renderTemplate.
        if (me.hasListeners.painted) {
            el.on('painted', 'handleElementPainted', me);
        }

        if (me.hasListeners.resize && !me.isViewport) {
            el.on('resize', 'handleElementResize', me);
        }

        /**
         * Force the component to take up 100% width and height available, by adding it
         * to {@link Ext.Viewport}.
         * @cfg {Boolean} fullscreen
         */
        if (me.fullscreen && VP) {
            VP.setItemFullScreen(me);
        }

        me.fireEvent('initialize', me);

        if (renderTo) {
            me.setRenderTo(renderTo);
        }
    },

    beforeInitConfig: function (config) {
        this.beforeInitialize.apply(this, arguments);
    },

    /**
     * @method
     * @private
     */
    beforeInitialize: Ext.emptyFn,

    /**
     * @method
     * Allows addition of behavior to the rendering phase.
     * @protected
     * @template
     */
    initialize: Ext.emptyFn,

    /**
     * Center this {@link #cfg-floated} or {@link #isPositioned positioned} Component in its parent.
     * @return {Ext.Component} this
     */
    center: function() {
        var me = this,
            parentBox, parent, transalteXY, xy;

        // Sometimes the center method will be pre-processed by the component#show,
        // when this happens me.isVisible() will be false but the element is already
        // visible, so we should check for me.el.isVisible() here.
        if (me.shouldRecenter()) {
            parent = me.getParent();
            transalteXY = !!parent;
            parent = parent ? parent.bodyElement : Ext.getBody();
            parentBox = parent.getConstrainRegion();
            xy = [(parentBox.getWidth() - me.el.getWidth()) / 2, (parentBox.getHeight() - me.el.getHeight()) / 2];

            me.needsCenter = false;
            me._centering = true;

            if (me.getFloated()) {
                if (transalteXY) {
                    xy = parent.reverseTranslateXY(xy);  // local to page
                }
                me.setXY(xy);
            } else {
                me.setLeft(xy[0]);
                me.setTop(xy[1]);
            }
            me._centering = false;
        } else {
            me.needsCenter = true;
        }
        return me;
    },

    shouldRecenter: function () {
        return this.rendered && this.el.isVisible();
    },

    /**
     * Returns the stack of floated components in which this Component resides.
     * This Component and all siblings at this level are returned.
     * @param {String/Function} selector A {@link #Ext.CommponentQuery ComponentQuery} selector, or
     * a selection function which returns `true` to select a component.
     */
    getFloatedStack: function(selector) {
        var me = this,
            floatedEls,
            result = [],
            parentWrap = me.floatParentNode,
            parent, len, i, comp;

        if (parentWrap) {
            parent = Ext.Component.from(parentWrap);

            // Get the .x-floated elements, or .x-float-wrap elements which wrap floateds which have children.
            floatedEls = Ext.supports.Selectors2
                    ? parentWrap.query(':scope>' + me.floatedSelector + ',:scope>.' + me.floatWrapCls)
                    : Ext.getBody().query('#' +  parentWrap.id + '>' + me.floatedSelector + ',#' + parentWrap.id + '>.' + me.floatWrapCls);

            for (i = 0, len = floatedEls.length; i < len; i++) {
                comp = Ext.Component.from(floatedEls[i]);
                if (comp !== parent && (!selector || (typeof selector === 'string' ? comp.is(selector) : comp(selector)))) {
                    result.unshift(comp);
                }
            }
        }
        return result;
    },

    /**
     * Invoked when a scroll is initiated on this component via its {@link #scrollable scroller}.
     * @method onScrollStart
     * @param {Number} x The current x position
     * @param {Number} y The current y position
     * @template
     * @protected
     */

    /**
     * Invoked when this component is scrolled via its {@link #scrollable scroller}.
     * @method onScrollMove
     * @param {Number} x The current x position
     * @param {Number} y The current y position
     * @template
     * @protected
     */

    /**
     * Invoked when a scroll operation is completed via this component's {@link #scrollable scroller}.
     * @method onScrollEnd
     * @param {Number} x The current x position
     * @param {Number} y The current y position
     * @template
     * @protected
     */

    /**
     * @private
     */
    triggerInitialized: function() {
        var listeners = this.onInitializedListeners,
            ln = listeners.length,
            listener, fn, scope, args, i;

        if (!this.initialized) {
            this.initialized = true;

            if (ln > 0) {
                for (i = 0; i < ln; i++) {
                    listener = listeners[i];
                    fn = listener.fn;
                    scope = listener.scope;
                    args = listener.args;

                    if (typeof fn == 'string') {
                        scope[fn].apply(scope, args);
                    }
                    else {
                        fn.apply(scope, args);
                    }
                }

                listeners.length = 0;
            }
        }
    },

    /**
     * @private
     */
    onInitialized: function(fn, scope, args) {
        var listeners = this.onInitializedListeners;

        if (!scope) {
            scope = this;
        }

        if (this.initialized) {
            if (typeof fn == 'string') {
                scope[fn].apply(scope, args);
            }
            else {
                fn.apply(scope, args);
            }
        }
        else {
            listeners.push({
                fn: fn,
                scope: scope,
                args: args
            });
        }
    },

    initElement: function() {
        var me = this;

        me.callParent();

        if (!me.bodyElement) {
            me.bodyElement = me.element;
        }

        // alias for backward compatibility with v < 6.5
        me.innerElement = me.innerElement || me.bodyElement;
    },

    /**
     * Called by `getInherited` to initialize the inheritedState the first time it is requested.
     * @protected
     */
    initInheritedState: function (inheritedState) {
        var me = this;

        // TODO
        //if (me.hidden) {
        //    inheritedState.hidden = true;
        //}

        if (me.modelValidation !== null) {
            inheritedState.modelValidation = me.modelValidation;
        }

        me.callParent([inheritedState]);
    },

    applyScrollable: function(scrollable, oldScrollable) {
        var me = this;

        if ((typeof scrollable === 'boolean') || (typeof scrollable === 'string')) {
            //<debug>
            if (!me._scrollableCfg[scrollable]) {
                Ext.raise("'" + scrollable + "' is not a valid value for 'scrollable'");
            }
            //</debug>
            scrollable = me._scrollableCfg[scrollable];
        }
        return Ext.Factory.scroller.update(oldScrollable, scrollable, this, 'createScrollable');
    },

    createScrollable: function(defaults) {
        return Ext.apply({
            component: this,
            element: this.getScrollerTarget()
        }, defaults);
    },

    getScrollerTarget: function () {
        return this.bodyElement;
    },

    /**
     * This method is required by the Scroller to return the scrollable client region
     * @return {Ext.util.Region} The scrolling viewport region.
     * @private
     */
    getScrollableClientRegion: function() {
        return this.getScrollerTarget().getClientRegion();
    },

    updatePadding: function(padding) {
       this.bodyElement.setPadding(padding);
    },

    updateMargin: function(margin) {
        this.element.setMargin(margin);
    },

    updateWeight: function(weight, oldWeight) {
        var me = this,
            owner = !me.isConfiguring && me.getRefOwner();

        // We want a simply-named property.
        me.weight = weight;

        // Inform the owning Container which might want to reorder the DOM
        if (owner && owner.onItemWeightChange) {
            owner.onItemWeightChange(me, weight, oldWeight);
        }
    },

    applyContentEl: function(contentEl) {
        if (contentEl) {
            return Ext.get(contentEl);
        }
    },

    updateContentEl: function(newContentEl, oldContentEl) {
        if (oldContentEl) {
            oldContentEl.hide();
            Ext.getBody().append(oldContentEl);
        }

        if (newContentEl) {
            this.setHtml(newContentEl.dom);
            newContentEl.show();
        }
    },

    applyTranslatable: function (config, translatable) {
        var me = this;

        if (!me.translationMethod && me.getFloated()) {
            me.translationMethod = 'csstransform';
        }

        return me.callParent([ config, translatable ]);
    },

    /**
     * @private
     * @return {Boolean}
     */
    isCentered: function() {
        return Boolean(this.getCentered());
    },

    isPositioned: function() {
        return this.positioned;
    },

    isDocked: function() {
        return Boolean(this.getDocked());
    },

    applyTop: function(top) {
        return this.filterLengthValue(top);
    },

    applyRight: function(right) {
        return this.filterLengthValue(right);
    },

    applyBottom: function(bottom) {
        return this.filterLengthValue(bottom);
    },

    applyLeft: function(left) {
        return this.filterLengthValue(left);
    },

    applyMinWidth: function(width) {
        return this.filterLengthValue(width);
    },

    applyMinHeight: function(height) {
        return this.filterLengthValue(height);
    },

    applyMaxWidth: function(width) {
        return this.filterLengthValue(width);
    },

    applyMaxHeight: function(height) {
        return this.filterLengthValue(height);
    },

    updateTop: function(top) {
        if (!this.$updatingXY) {
            this.element.setTop(top);
        }

        this.refreshPositioned();
    },

    updateRight: function(right) {
        if (!this.$updatingXY) {
            this.element.setRight(right);
        }

        this.refreshPositioned();
    },

    updateBottom: function(bottom) {
        if (!this.$updatingXY) {
            this.element.setBottom(bottom);
        }

        this.refreshPositioned();
    },

    updateLeft: function(left) {
        if (!this.$updatingXY) {
            this.element.setLeft(left);
        }

        this.refreshPositioned();
    },

    onElementResize: function(me, width, height, oldWidth, oldHeight, info) {
        this.onResize(width, height, oldWidth, oldHeight, info);
    },

    /**
     * @method
     * Optional template method. If implemented, this is called *asynchronously* after a browser layout caused
     * by a component resize. This may be triggered for any or several of the following reasons:
     *    - Programmatic changes to {@link #cfg-width} or {@link #cfg-height} configs.
     *    - Setting the {@link #cfg-flex} config when the owning layout is {@link Ext.layout.Box}.
     *    - Setting {@link #cfg-minHeight}, {@link #cfg-maxHeight}, {@link #cfg-minWidth} or {@link #cfg-maxWidth}.
     *    - Changing device orientation.
     *    - Changing the browser viewport size.
     *    - Any resize caused by browser layout recalculation which may be caused by content size changes
     *      or application of default browser layout rules.
     * @param {Number} width The new width.
     * @param {Number} height The new height.
     * @param {Number} oldWidth The previous width.
     * @param {Number} oldHeight The previous height.
     * @protected
     * @template
     */
    onResize: null,

    updateMinWidth: function(width) {
        this.element.setMinWidth(width);
    },

    updateMinHeight: function(height) {
        this.element.setMinHeight(height);
    },

    updateMaxWidth: function(width) {
        this.element.setMaxWidth(width);
    },

    updateMaxHeight: function(height) {
        this.element.setMaxHeight(height);
    },

    /**
     * @private
     * @param {Boolean} centered
     * @return {Boolean}
     */
    applyCentered: function(centered) {
         var me = this,
             doCenter = me.getLeft() === null && me.getRight() === null &&
                 me.getTop() === null && me.getBottom() === null;

        // We can only center if the CSS top/right/bottom/left properties are not being used.
        if (doCenter) {
            return !!centered;
        }
    },

    updateCentered: function(centered) {
        var me = this,
            resizeParent;

        if (me.getFloated()) {
            if (centered) {
                me.center();

                if (!me.centerResizeListener && !me.needsCenter) {
                    resizeParent = me.floatParentNode;
                    resizeParent = (resizeParent === Ext.floatRoot) ? Ext : resizeParent;

                    me.centerResizeListener = resizeParent.on({
                        resize: 'center',
                        scope: me,
                        destroyable: true
                    });
                }
            } else {
                me.centerResizeListener = Ext.destroy(me.centerResizeListener);
            }
        } else {
            me.el.toggleCls(me.floatingCls, centered);
            if (centered) {
                me.refreshInnerState = Ext.emptyFn;

                if (me.isContainer && (!me.isWidthed() || !me.isHeighted())) {
                    me.setAutoSize(true);
                }

                if (me.isPositioned()) {
                    me.resetPositioned();
                }

                if (me.isDocked()) {
                    me.setDocked(false);
                }

                me.setIsInner(false);
                delete me.refreshInnerState;
            } else {
                me.refreshInnerState();
            }
        }
    },

    applyDocked: function(docked) {
        var me = this;

        if (!docked) {
            return null;
        }

        //<debug>
        if (!/^(top|right|bottom|left)$/.test(docked)) {
            Ext.Logger.error("Invalid docking position of '" + docked.position + "', must be either 'top', 'right', 'bottom', " +
                "'left' or `null` (for no docking)", me);
            return;
        }
        //</debug>

        me.refreshInnerState = Ext.emptyFn;

        if (me.isPositioned()) {
            me.resetPositioned();
        }

        if (me.isCentered()) {
            me.setCentered(false);
        }

        me.setIsInner(false);

        delete me.refreshInnerState;

        return docked;
    },

    getDisplayed: function () {
        return !this.getHidden();
    },

    setDisplayed: function (displayed) {
        var me = this;

        if (displayed === me.getHidden()) {
            me._displayed = displayed;
            me.updateDisplayed(displayed, !displayed);
        }

        return me;
    },

    updateDisplayed: function (displayed) {
        this[displayed ? 'show' : 'hide']();
    },

    updateDocked: function(docked, oldDocked) {
        var me = this;

        if (!me.isConfiguring) {
            me.fireEvent('afterdockedchange', me, docked, oldDocked);
            if (!docked) {
                me.refreshInnerState();
            }
        }
    },

    /**
     * Resets {@link #top}, {@link #right}, {@link #bottom} and {@link #left} configurations to `null`, which
     * will cause this component to stop being 'positioned' and to take its place in its owning container's
     * layout.
     */
    resetPositioned: function() {
        var me = this;

        me.setTop(null);
        me.setRight(null);
        me.setBottom(null);
        me.setLeft(null);
    },

    refreshPositioned: function() {
        this.refreshPositionedOnInitialized = true;
    },

    doRefreshPositioned: function() {
        var me = this,

            // We are positioned if we are *not* floated, and any of the
            // positioning configs are non-null.
            positioned = !me.getConfig('floated', false, true) &&
                (   me.getTop() !== null ||
                    me.getBottom() !== null ||
                    me.getRight() !== null ||
                    me.getLeft() !== null
                );

        if (positioned !== this.positioned) {
            me.positioned = positioned;

            if (positioned) {
                me.refreshInnerState = Ext.emptyFn;
                
                if (me.isContainer && (!me.isWidthed() || !me.isHeighted())) {
                    me.setAutoSize(true);
                }

                if (me.isCentered()) {
                    me.setCentered(false);
                }

                if (me.isDocked()) {
                    me.setDocked(false);
                }

                me.setIsInner(false);

                delete me.refreshInnerState;
            }

            me.element.toggleCls(me.floatingCls, positioned);

            if (me.initialized) {
                me.fireEvent('floatingchange', me, positioned);
                me.fireEvent('positionedchange', me, positioned);
            }

            if (!positioned) {
                me.refreshInnerState();
            }
        }
    },

    applyZIndex: function(zIndex) {
        if (!zIndex && zIndex !== 0) {
            zIndex = null;
        }

        if (zIndex !== null) {
            zIndex = Number(zIndex);

            if (isNaN(zIndex)) {
                zIndex = null;
            }
        }

        return zIndex;
    },

    updateZIndex: function(zIndex) {
        var element = this.element,
            modal = !this.getFloated() && this.getModal(),
            domStyle;

        if (element && !element.destroyed) {
            domStyle = element.dom.style;
            if (zIndex !== null) {
                domStyle.setProperty('z-index', zIndex, 'important');
            }
            else {
                domStyle.removeProperty('z-index');
            }
        }

        if (modal && !modal.destroyed) {
            modal.setZIndex(zIndex - 1);
        }
    },

    getInnerHtmlElement: function () {
        var me = this,
            innerHtmlElement = me.innerHtmlElement;

        if (!innerHtmlElement || !innerHtmlElement.dom || !innerHtmlElement.dom.parentNode) {
            me.innerHtmlElement = innerHtmlElement = Ext.Element.create({cls: Ext.baseCSSPrefix + 'innerhtml'});
            me.getRenderTarget().appendChild(innerHtmlElement);
        }

        return innerHtmlElement;
    },

    updateHtml: function(html) {
        if (!this.destroyed) {
            var innerHtmlElement = this.getInnerHtmlElement();

            if (Ext.isElement(html)){
                innerHtmlElement.setHtml('');
                innerHtmlElement.append(html);
            } else {
                innerHtmlElement.setHtml(html);
            }
        }
    },

    updateHidden: function(hidden, oldHidden) {
        var me = this,
            element = me.renderElement,
            modal = me.getModal();

        if (me.rendered) {
            if (modal && !modal.destroyed) {
                if (me.getFloated()) {
                    if (hidden) {
                        // Hiding a modal must move the modal back to below the next
                        // highest visible modal
                        modal = me.getFloatedStack('{getModal()}{isVisible()}')[0];
                        if (modal) {
                            modal.showModalMask();
                        } else {
                            me.hideModalMask();
                        }
                    } else {
                        me.showModalMask();
                    }
                } else {
                    if (modal !== true) {
                        modal.setZIndex(me.getZIndex() - 1);
                        if (modal.getHidden() !== hidden) {
                            modal.setHidden(hidden);
                        }
                    }
                }
            }

            me.callParent([hidden, oldHidden]);

            if (!me.destroying && element && !element.destroyed) {
                element.toggleCls(me.hiddenCls, hidden);
            }
        } else {
            element.toggleCls(me.hiddenCls, hidden);
            me.callParent([hidden, oldHidden]);
        }

        // Updating to hidden during config should not fire events
        if (!me.isConfiguring) {
            me.fireEvent(hidden ? 'hide' : 'show', me);
            me[hidden ? 'afterHide' : 'afterShow'](me);
        }
    },

    /**
     * Hides this Component optionally using an animation.
     * @param {Object/Boolean} [animation] You can specify an animation here or a bool to use the {@link #hideAnimation} config.
     * @return {Ext.Component}
     * @chainable
     */
    hide: function(animation) {
        var me = this,
            activeAnim = me.activeAnimation,
            modal;

        if (me.isVisible()) {
            // Allow veto of hide.
            if (me.hasListeners.beforehide && me.fireEvent('beforehide', me) === false) {
                return;
            }

            if (me.beforeHide() === false) {
                return;
            }

            me.viewportResizeListener = Ext.destroy(me.viewportResizeListener);
            me.setCurrentAlignmentInfo(null);

            if (activeAnim) {
                activeAnim.on({
                    animationend: function () {
                        me.hide(animation);
                    },
                    single: true
                });
                return me;
            }

            if (!me.getHidden()) {
                if (animation === undefined || (animation && animation.isComponent)) {
                    animation = me.getHideAnimation();
                }
                if (animation) {
                    if (animation === true) {
                        animation = 'fadeOut';
                    }
                    me.on({
                        beforehiddenchange: 'animateFn',
                        scope: me,
                        single: true,
                        args: [animation]
                    });
                }
                me.setHidden(true);
            }

            // Hide the owned modal mask which positioned Components use to
            // implement modality.
            // Floated Components share a single modal mask that is owned by
            // their floatParent.
            if (!me.getFloated()) {
                modal = me.getModal();
                if (modal && modal !== true && !modal.destroyed) {
                    modal.setHidden(true);
                }
            }
        } else {
            me.setHidden(true);
        }

        return me;
    },

    /**
     * @private
     * This is the private method to ensure everything is set up for showing.
     * This is called by both show and showBy to set a component up.
     * the user-facing method is beforeShow, this setup must have
     * happened by the time that is called.
     */
    preprocessShow: function(component, alignment, options) {
        var me = this,
            vm = me.lookupViewModel(),
            hidden, newlyRendered;

        if (me.getFloated()) {
            hidden = me.getHidden();

            // An instantiated, but not yet rendered floated.
            // It will still be wrapped in its documentFragment.
            // Insert it into the global floatRoot.
            if (!me.rendered) {
                hidden = hidden !== false;
                me.findFloatParent();
                newlyRendered = true;
            }

            // The following operations require that the component be
            // temporarily visible for measurement purposes.
            if (hidden) {
                me.setVisibility(true);
                me._hidden = false;
            }

            // Note: If aligning, we have to ensure the final shape is set by flushing
            // though any ViewModel data.
            if (alignment) {
                if (vm) {
                    vm.notify();
                }
                me.alignTo(component, alignment, options);
            } else {
                if (me.isCentered()) {
                    if (vm) {
                        vm.notify();
                    }

                    // We need to set the viewport resize listener to keep centered
                    me.updateCentered(true);
                } else {
                    me.syncXYPosition();
                }
            }
            if (me.getModal()) {
                me.showModalMask();
            }

            // If we just rendered it, it will be appended, so don't waste time
            if (!newlyRendered) {
                if (me.getToFrontOnShow()) {
                    me.toFront();
                } else {
                    me.syncAlwaysOnTop();
                }
            }

            if (hidden) {
                me.setVisibility(false);
                me._hidden = true;
            }
        }
    },

    /**
     * Shows this component by another component. If you specify no alignment, it will automatically
     * position this component relative to the reference component.
     *
     * For example, say we are aligning a Panel next to a Button, the alignment string would look like this:
     *
     *     [panel-vertical (t/b/c)][panel-horizontal (l/r/c)]-[button-vertical (t/b/c)][button-horizontal (l/r/c)]
     *
     * where t = top, b = bottom, c = center, l = left, r = right.
     *
     * ## Examples
     *
     *  - `tl-tr` means top-left corner of the Panel to the top-right corner of the Button
     *  - `tc-bc` means top-center of the Panel to the bottom-center of the Button
     *
     * You can put a '?' at the end of the alignment string to constrain the positioned element to the
     * {@link Ext.Viewport Viewport}
     *
     *     // show `panel` by `button` using the default positioning (auto fit)
     *     panel.showBy(button);
     *
     *     // align the top left corner of `panel` with the top right corner of `button` (constrained to viewport)
     *     panel.showBy(button, "tl-tr?");
     *
     *     // align the bottom right corner of `panel` with the center left edge of `button` (not constrained by viewport)
     *     panel.showBy(button, "br-cl");
     *
     * @param {Ext.Component} component The target component to show this component by.
     * @param {String} [alignment] The alignment string, eg: `'tl-bl'`.
     * @param {Object} [options] An object containing options for the {@link Ext.util.Region#alignTo} method.
     */
    showBy: function(component, alignment, options) {
        var me = this;

        // We may be called while visible, just for repositioning.
        if (me.isVisible()) {
            me.alignTo(component, alignment, options);
        } else {
            // Correct the component display type for being aligned.
            // Component must become floated in time for the preprocessShow
            // machinery to get it into the DOM.
            if (!me.getFloated()) {
                if (!me.getParent()) {
                    me.setFloated(true);
                } else {
                    me.positioned = true;
                }
            }

            // Cache the alignment options for any realign call which might happen on
            // viewport resize or configuration change.
            me.alignToArgs = [component, alignment, options];

            me.show({
                animation: null,
                alignment: {
                    component: component,
                    alignment: alignment,
                    options: options
                }
            });
        }
    },

    /**
     * Shows this component optionally using an animation.
     * @param {Object/Boolean} [animation] You can specify an animation here or a bool to
     *                          use the {@link #showAnimation} config.
     * @param {Object} [options] (private)
     * @param {Object/Boolean} [options.animation] You can specify an animation here or a
     *                          bool to use the {@link #showAnimation} config.
     * @param {Object} [options.alignment] An object containing alignment details.
     * @param {Object} [options.alignment.component] The target component to show this component by.
     * @param {Object} [options.alignment.alignment] The alignment string, eg: `'tl-bl'`.
     * @param {Object} [options.alignment.options] An object containing options for the {@link Ext.util.Region#alignTo} method.
     * @return {Ext.Component}
     * @chainable
     */
    show: function(animation, options) {
        var me = this,
            hidden = me.getHidden(),
            floated = me.getFloated(),
            alignment, modal;

        // One arg signature if options has an animation property.
        // Animation argument can be a Boolean.
        if (animation && typeof animation === 'object' && 'animation' in animation) {
            options = animation;
            animation = options.animation;
        }
        // Optional animation and options args
        else {
            options = Ext.apply({
                animation: animation
            }, options);
        }

        // Allow event listener veto of show or modify options.
        if (me.hasListeners.beforeshow && me.fireEvent('beforeshow', me, options) === false) {
            return false;
        }
        // Allow template method to veto show or modify options.
        if (me.beforeShow(options) === false) {
            return;
        }

        // Prepare the component for a potentially animated show.
        // If floated, it must be layed out, and the final alignment calculated.
        alignment = options.alignment || {};
        me.preprocessShow(alignment.component, alignment.alignment, alignment.options);

        if (me.activeAnimation) {
            me.activeAnimation.on({
                animationend: function(animation) {
                    var me = this;
                    
                    if (!me.destroying && !me.destroyed) {
                        me.show(animation);
                    }
                },
                scope: me,
                single: true
            });
            return me;
        }

        if (hidden || hidden === null) {
            if (animation === true) {
                animation = 'fadeIn';
            }
            else if (animation === undefined || (animation && animation.isComponent)) {
                animation = me.getShowAnimation();
            }

            if (animation) {
                me.beforeShowAnimation();
                me.on({
                    beforehiddenchange: 'animateFn',
                    scope: me,
                    single: true,
                    args: [animation]
                });
            }

            me.setHidden(false);
        }

        // Show the owned modal mask which positioned Components use to
        // implement modality.
        // Floated Components share a single modal mask that is owned by
        // their floatParent.
        if (!floated) {
            modal = me.getModal();
            if (modal && modal.setHidden) {
                modal.setHidden(false);
            }
        }

        return me;
    },

    beforeShowAnimation: function() {
        var me = this,
            element = me.element;

        if (element) {
            me.renderElement.show();
            element.removeCls(me.hiddenCls);
        }
    },

    onAnimationStart: function(animation, data) {
        var me = this,
            fromTransform = data.from.transform,
            toTransform = data.to.transform;

        // If the animation is not controlling the position, we have to fix the position so that the before
        // and after position is our current position.
        if (me.getFloated() && fromTransform && toTransform && !(fromTransform.translateX | toTransform.translateX | fromTransform.translateY | toTransform.translateY)) {
            fromTransform.translateX = toTransform.translateX = me.getX();
            fromTransform.translateY = toTransform.translateY = me.getY();
        }
    },

    animateFn: function(animation, component, newState, oldState, controller) {
        var me = this;

        if (animation && (!newState || (newState && me.isPainted()))) {
            animation = me.activeAnimation = new Ext.fx.Animation(animation);
            animation.setElement(component.element);
            animation.on({
                animationstart: me.onAnimationStart,
                scope: me,
                single: true
            });

            if (!Ext.isEmpty(newState)) {
                animation.setOnEnd(function() {
                    me.activeAnimation = null;

                    // Even if we are destroying we need to resume the controller
                    // to be able to call updateHidden which hides the float mask
                    // if we are modal.
                    if (!me.destroyed) {
                        controller.resume();

                        // Could have been destroyed in controller.resume()
                        if (me.destroying || me.destroyed) {
                            return;
                        }
                        
                        if (me.getFloated()) {
                            me.syncXYPosition();
                        }
                    }
                });

                controller.pause();
            }

            Ext.Animator.run(animation);
        }
    },

    /**
     * @private
     */
    setVisibility: function(isVisible) {
        this.renderElement.setVisible(isVisible);
    },

    /**
     * @private
     */
    isRendered: function() {
        return this.rendered;
    },

    /**
     * @private
     */
    isPainted: function() {
        return this.renderElement.isPainted();
    },

    /**
     * @private
     */
    applyTpl: function(tpl) {
        return Ext.XTemplate.get(tpl);
    },

    applyData: function(data) {
        if (Ext.isObject(data)) {
            return Ext.apply({}, data);
        } else if (!data) {
            data = {};
        }

        return data;
    },

    /**
     * @private
     */
    updateData: function(newData) {
        var me = this;

        if (newData) {
            var tpl = me.getTpl(),
                tplWriteMode = me.getTplWriteMode();

            if (tpl) {
                tpl[tplWriteMode](me.getInnerHtmlElement(), newData);
            }

            /**
             * @event updatedata
             * Fires whenever the data of the component is updated
             * @param {Ext.Component} this The component instance
             * @param {Object} newData The new data
             */
            this.fireEvent('updatedata', me, newData);
        }
    },

    applyRecord: function(config) {
        if (config && Ext.isObject(config) && config.isModel) {
            return config;
        }
        return  null;
    },

    updateRecord: function(newRecord, oldRecord) {
        var me = this;

        if (oldRecord) {
            oldRecord.unjoin(me);
        }

        if (!newRecord) {
            me.updateData('');
        }
        else {
            newRecord.join(me);
            me.updateData(newRecord.getData(true));
        }
    },

    /**
     * @private
     * Used to handle joining of a record to a tpl
     */
    afterEdit: function() {
        this.updateRecord(this.getRecord());
    },

    /**
     * @private
     * Used to handle joining of a record to a tpl
     */
    afterErase: function() {
        this.setRecord(null);
    },

    /**
     * Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all
     * available xtypes, see the {@link Ext.Component} header.
     *
     * __Note:__ If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.
     *
     * Example usage:
     *
     *     var t = new Ext.field.Text();
     *     alert(t.getXTypes());  // alerts 'component/field/textfield'
     *
     * @return {String} The xtype hierarchy string.
     */
    getXTypes: function() {
        return this.xtypesChain.join('/');
    },

    /**
     * @method initDragConstraints
     * This method is called when a drag is initializing. This method should adjust the
     * drag constraints to ensure all drag movements are properly restricted. See
     * {@link Ext.drag.Source#constrain}.
     * @param {Ext.drag.Source} draggable
     * @template
     * @since 6.5.0
     */

    applyDraggable: function (draggable, existing) {
        if (existing) {
            if (draggable) {
                existing.setConfig(draggable);
            }
            else {
                existing.destroy();
            }
        }
        else if (draggable) {
            draggable = this.createDraggable(draggable);
            draggable = new Ext.drag.Source(draggable);

            if (this.initDragConstraints) {
                draggable.on('initdragconstraints', 'initDragConstraints', this);
            }
        }

        return draggable;
    },

    createDraggable: function (draggable) {
        var me = this,
            listeners = draggable.listeners;

        draggable = Ext.apply({
            autoDestroy: false,
            component: me,
            ownerCmp: me,
            local: true
        }, draggable);

        // The resolveListenerScope will handle this case, but this saves many
        // function calls during mousemove...
        if (listeners && listeners.scope === 'this') {
            draggable.listeners = listeners = Ext.apply({}, listeners);
            listeners.scope = me;
        }

        return draggable;
    },

    updateDraggable: function (dragger, existing) {
        if (existing) {
            if (dragger) {
                existing.setConfig(dragger);
            }
            else {
                existing.destroy();
            }
        }
    },

    onModalMaskTap: function (e) {
        var me = this,
            hide = me.getHideOnMaskTap();

        if (hide) {
            me.hideFromModal();
        }

        return hide;
    },

    translateAxis: function(axis, value, animation) {
        var x, y;

        if (axis === 'x') {
            x = value;
        }
        else {
            y = value;
        }

        return this.translate(x, y, animation);
    },

    /**
     * @private
     */
    alignTo: function (component, alignment, options) {
        var me = this;

        // Components maintain alignment upon viewport resize
        if (!me.viewportResizeListener) {
            me.viewportResizeListener = Ext.on({
                resize: 'onViewportResize',
                scope: me,
                destroyable: true
            });
        }
        me.aligning = true;
        me.callParent([component, alignment, Ext.apply({
            axisLock: me.getAxisLock()
        }, options)]);
        me.aligning = false;
    },

    onViewportResize: function () {
        if (this.isVisible()) {
            this.realign();
        }
    },

    /**
     * Displays component at specific xy position.
     * A floating component (like a menu) is positioned relative to its ownerCt if any.
     * Useful for popping up a context menu:
     *
     *     listeners: {
     *         itemcontextmenu: function(view, record, item, index, event, options) {
     *             Ext.create('Ext.menu.Menu', {
     *                 width: 100,
     *                 height: 100,
     *                 margin: '0 0 10 0',
     *                 items: [{
     *                     text: 'regular item 1'
     *                 },{
     *                     text: 'regular item 2'
     *                 },{
     *                     text: 'regular item 3'
     *                 }]
     *             }).showAt(event.getXY());
     *         }
     *     }
     *
     * @param {Number/Number[]/Object} x The new x position or array of `[x,y]`, or an object `{x:10, y:10}`.
     * @param {Number} [y] The new y position.
     * @param {Boolean/Object} [animate] True to animate the Component into its new position. You may also pass an
     * animation configuration.
     * @return {Ext.Component} this
     */
    showAt: function(x, y /*, animate TODO: Animate to position? */) {
        var me = this;

        if (me.getFloated() || me.isPositioned()) {
            if (arguments.length === 1) {
                if (x.x) {
                    y = x.y;
                    x = x.x;
                } else {
                    y = x[1];
                    x = x[0];
                }
            }
            me.show();
            if (me.isPositioned()) {
                me.setLeft(x);
                me.setTop(y);
            } else {
                me.setX(x);
                me.setY(y);
            }
        }
        return me;
    },

    onAdded: function(parent, instanced) {
        var me = this,
            modal;

        me.callParent([parent, instanced]);

        if (!me.getFloated()) {
            modal = me.getModal();
            if (modal) {
                parent.insertBefore(modal, me);
                modal.setZIndex(me.getZIndex() - 1);
            }
        }

        me.getRootEl().removeCls(me.rootCls);
    },

    onRemoved: function(destroying) {
        if (!destroying) {
            this.getRootEl().addCls(this.rootCls);
        }
        this.callParent([destroying]);
    },

    applyTooltip: function(tooltip) {
        if (tooltip) {
            if (tooltip.isInstance) {
                tooltip.setTarget(this);
                return tooltip;
            } else if (typeof tooltip === 'string') {
                tooltip = {
                    html: tooltip
                };
            } else {
                tooltip = Ext.merge({}, tooltip);
            }

            // autocreate means we own an instance.
            // autoHide: false implies that too, otherwise
            // any other component's use of the singleton would defeat autoHide: false
            if (tooltip.autoCreate || tooltip.autoHide === false) {
                delete tooltip.autoCreate;
                tooltip.target = this;
                tooltip.xtype = tooltip.xtype || 'tooltip';
                tooltip = Ext.create(tooltip);
            } else {
                delete tooltip.xtype;
            }
        }

        return tooltip;
    },

    updateTooltip: function(tooltip, oldTooltip) {
        var el = this.el,
            data, manager, target, tip;

        if (oldTooltip) {
            if (oldTooltip.isInstance) {
                Ext.destroy(oldTooltip);
            }
            else {
                target = Ext.fly(oldTooltip.target);
                data = target && target.peekData();
                
                if (data) {
                    delete data.qtip;
                }
            }
        }

        if (tooltip && !tooltip.isInstance) {
            el.getData().qtip = tooltip;

            manager = Ext['tip'];
            manager = manager && manager.Manager;
            manager = manager && manager.instance;

            if (manager) {
                tip = manager.tip;
                if (tip.currentTarget.dom === el.dom) {
                    manager.onBeforeShow(tip);
                }
            }
        }
    },

    applyModal: function(modal, currentModal) {
        if (this.getFloated()) {
            return !!modal;
        }

        var isVisible = true;

        if (modal === false) {
            modal = true;
            isVisible = false;
        }

        currentModal = Ext.factory(modal, Ext['Mask'], typeof currentModal === 'boolean' ? null : currentModal);

        if (currentModal) {
            currentModal.setVisibility(isVisible);
        }

        return currentModal;
    },

    updateModal: function(modal) {
        var me = this,
            parent = me.getParent(),
            positionEl = (me.floatWrap || me.element).dom,
            topModal;

        if (me.getFloated()) {
            if (modal) {
                if (me.isVisible() && !positionEl.nextSibling) {
                    me.showModalMask();
                }
            } else {
                topModal = me.getFloatedStack('{getModal()}{isVisible()}')[0];
                
                if (topModal) {
                    topModal.showModalMask();
                }
                else {
                    // Modal mask must now drop to below the next modal
                    // below us, or hide.
                    me.hideModalMask();
                }
            }
        } else {
            if (parent) {
                if (modal) {
                    parent.insertBefore(modal, me);
                    modal.setZIndex(me.getZIndex() - 1);
                }
                else {
                    parent.remove(modal);
                }
            }
        }
    },

    updateHideOnMaskTap : function(hide) {
        if (!this.getFloated()) {
            var mask = this.getModal();

            if (mask) {
                mask[hide ? 'on' : 'un'].call(mask, 'tap', 'hide', this);
            }
        }
    },

    applyHideAnimation: function(config) {
        if (config === true) {
            config = {
                type: 'fadeOut'
            };
        }
        if (Ext.isString(config)) {
            config = {
                type: config
            };
        }

        return config ? Ext.factory(config, Ext.fx.Animation) : null;
    },

    applyShowAnimation: function(config) {
        if (config === true) {
            config = {
                type: 'fadeIn'
            };
        }
        if (Ext.isString(config)) {
            config = {
                type: config
            };
        }

        return config ? Ext.factory(config, Ext.fx.Animation) : null;
    },

    /**
     * Perform the actual destruction sequence. This is the method to override in your
     * subclasses to add steps specific to the destruction of custom Component.
     *
     * If the Component is currently added to a Container it will first be removed
     * from that Container. All {@link Ext.Element} references are also deleted and
     * the Component is de-registered from {@link Ext.ComponentManager}.
     *
     * As a rule of thumb, subclasses should destroy their child Components, Elements,
     * and/or other objects before calling parent method. Any object references will be
     * nulled after this method has finished, to prevent the possibility of memory leaks.
     *
     * @since 6.2.0
     */
    doDestroy: function() {
        var me = this;

        // Ensure mask is cleaned up and focus is taken care of(!)
        if (me.isVisible()) {
            me.setHidden(true);
        }

        if (me.hasListeners.destroy) {
            me.fireEvent('destroy', me);
        }

        Ext.destroy(
            me.getModal(),
            me.innerHtmlElement,
            me.scrollerElement,
            me.getScrollable(),
            // animations should also be destroyed
            me.getShowAnimation(),
            // destroy of the hide animation calls the 'updateHidden'
            me.getHideAnimation(),
            me.centerResizeListener
        );

        me.setPlugins(null);
        me.setRecord(null);
        me.setTooltip(null);

        me.callParent();
    },

    privates: {
        convertToLocalXY: function(xy) {
            var me = this,
                pageXY = me.element.getXY(),
                x = 0,
                y = 0;

            if (me.isPositioned()) {
                x = me.getLeft() || 0;
                y = me.getTop() || 0;
            } else {
                x = me.getX() || 0;
                y = me.getY() || 0;
            }

            return [xy[0] - pageXY[0] + x, xy[1] - pageXY[1] + y];
        },

        doAddListener: function (name, fn, scope, options, order, caller, manager) {
            var me = this,
                el = me.element,
                initialized = me.initialized;

            // Add element listeners which will fire the component level event
            // only when the first expensive listener is added.
            if (name === 'painted') {
                if (initialized && !me.hasListeners.painted) {
                    el.on('painted', 'handleElementPainted', me);
                }
            } else if (initialized && name === 'resize' && !me.isViewport) {
                if (!me.hasListeners.resize) {
                    el.on('resize', 'handleElementResize', me);
                }
            }

            return me.callParent([name, fn, scope, options, order, caller, manager]);
        },

        doRemoveListener: function (name, fn, scope) {
            var me = this,
                el = me.element,
                initialized = me.initialized;

            me.callParent([name, fn, scope]);

            // Remove expensive element level listeners if nobody is listening
            // to the component level event.
            if (name === 'painted') {
                if (initialized && !me.hasListeners.painted) {
                    el.un('painted', 'handleElementPainted', me);
                }
            } else if (name === 'resize' && !me.isViewport) {
                if (initialized && !me.hasListeners.resize) {
                    el.un('resize', 'handleElementResize', me);
                }
            }
        },

        /**
         * Returns the element into which the html content and items should be rendered.
         * This defaults to the `bodyElement` but derived classes can override this method
         * to use a different element.
         *
         * For containers his only applies to `inner` items, not `docked` items. The
         * `positioned` items are rendered to the element returned by the
         * {@link Ext.Container#getPositionedItemTarget method.
         * @return {Ext.dom.Element}
         * @private
         * @since 6.5.0
         */
        getRenderTarget: function () {
            return this.bodyElement;
        },

        /**
         * @private
         * Returns the element that the "rootCls" (`x-root`) should be applied to.
         * Should always return the component's main element.
         * Overridden by Ext.viewport.Default to return the page body element
         */
        getRootEl: function () {
            return this.el;
        },

        handleElementPainted: function (el) {
            this.fireEvent('painted', this, el);
        },

        handleElementResize: function (el, info) {
            var me = this,
                lastSize = me.lastSize,
                oldWidth = lastSize.width || null,
                oldHeight = lastSize.height || null;

            // Only fire the event if we have actually resized.
            if (info.flag) {
                lastSize.width = info.width;
                lastSize.height = info.height;
                me.fireEvent('resize', this, info.width, info.height, oldWidth, oldHeight, info);
            }
        },

        /**
         * This method has the same arguments as {@link Ext.dom.Element#setXY element's setXY}
         * method, but is used to maintain the `x` and `y` configs (for `floated` components)
         * or the `left` and `top` config for positioned components.
         * @param x
         * @param y
         * @param animation
         * @private
         * @since 6.5.0
         */
        setXY: function (x, y, animation) {
            var me = this,
                floated = me.getFloated();

            if (typeof x !== 'number') {
                animation = y;
                y = x[1];
                x = x[0];
            }

            me.$updatingXY = true;

            if (floated) {
                if (x != null) {
                    me.setX(x);
                }
                if (y != null) {
                    me.setY(y);
                }
            }
            else {
                if (x != null) {
                    me.setLeft(x);
                }
                if (y != null) {
                    me.setTop(y);
                }
            }

            me.$updatingXY = false;

            if (floated) {
                me.syncXYPosition(animation);
            } else {
                me.translate(x, y, animation);
            }
        },

        syncXYPosition: function (animation) {
            var me = this;

            // Any positioning which is *not* within an align operation results in breaking the link between
            // viewport and position.
            if (!me.aligning) {
                me.viewportResizeListener = Ext.destroy(me.viewportResizeListener);
            }

            me.callParent([ animation ]);
        }
    },

    deprecated: {
        "6.2.0": {
            methods: {
                /**
                 * @method resetFloating
                 * @inheritdoc Ext.Component#resetPositioned
                 * @deprecated 6.2 Use {@link #resetPositioned} instead.
                 */
                resetFloating: 'resetPositioned'
            }
        },
        '6.5': {
            configs: {
                styleHtmlCls: null,
                styleHtmlContent: null
            }
        }
    }
}, function(Cls) {
    //<debug>
    if (!document.querySelector('meta[name=viewport]')) {
        Ext.log.warn('Ext JS requires a viewport meta tag in order to function correctly on mobile devices.  Please add the following tag to the <head> of your html page: \n <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">');
    }
    //</debug>
});
