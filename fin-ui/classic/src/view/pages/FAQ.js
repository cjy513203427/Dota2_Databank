Ext.define('Admin.view.pages.FAQ', {
    extend: 'Ext.container.Container',
    xtype: 'faq',

    requires: [
        'Ext.panel.Panel',
        'Ext.plugin.Responsive',
        'Ext.button.Button',
        'Ext.layout.container.Accordion'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    padding: 10,

    items: [
        {
            xtype: 'panel',
            cls: 'faq-left-sidebar shadow',
            margin: 10,
            header: false,
            ui: 'light',
            responsiveConfig: {
                'width < 1000': {
                    width: 0,
                    visible: false
                },
                'width >= 1000 && width < 1600': {
                    width: 230,
                    visible: true
                },
                'width >= 1600': {
                    width: 300,
                    visible: true
                }
            },

            items: [
                {
                    xtype: 'panel',
                    title: '提示',
                    ui: 'light',
                    cls: 'shadow pages-faq-container',
                    iconCls: 'x-fa fa-lightbulb-o',
                    html: '<p>我们为大家创建以下列表提示，希望能为大家在使用系统的过程中带来方便。',
                    bodyPadding: 15
                },
                {
                    xtype: 'panel',
                    bodyPadding: 20,
                    ui: 'light',
                    cls: 'shadow pages-faq-container',
                    iconCls: 'x-fa fa-question',
                    title: '找不到答案？',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'box',
                            html: '<p>可以找到您的领导让他们联系我们，我们会及时帮您解决问题。</p><br>'
                        },
                        {
                            xtype: 'button',
                            ui:'soft-blue',
                            margin: '20 20 20 20',
                            text: 'Contact Us'
                        }
                    ]
                }
            ],
            plugins: [
                {
                    ptype: 'responsive'
                }
            ]
        },
        {
            xtype: 'panel',
            ui: 'light',
            margin: 10,
            flex: 1,
            cls: 'pages-faq-container shadow',

            iconCls: 'x-fa fa-question-circle',
            title: '帮助文档',
            bodyPadding: 15,
            items: [
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'General',
                    height: 340,
                    ui: 'light',
                    defaults: {
                        html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    },
                    items: [
                        {
                            title: 'How can I access high resolution images?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'Can I download the application on my PC?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'How often does the database get updated?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'Can I use the downloaded images on a commercial website?',
                            iconCls:'x-fa fa-caret-down'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Account',
                    height: 340,
                    bodyPadding: 10,
                    ui: 'light',
                    defaults: {
                        html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    },
                    items: [
                        {
                            title: 'What are the different membership plans?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'Can I change my plan in between?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'How can I deactivate my account?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'Can I transfer my account to another user?',
                            iconCls:'x-fa fa-caret-down'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Payment',
                    height: 300,
                    bodyPadding: 10,
                    ui: 'light',
                    defaults: {
                        html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    },
                    items: [
                        {
                            title: 'What are the payment methods you accept?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'What is the refund policy?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            title: 'How long does it take to process my payment?',
                            iconCls:'x-fa fa-caret-down'
                        }
                    ]
                }
            ]
        }
    ]
});
