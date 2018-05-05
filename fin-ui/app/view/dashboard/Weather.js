Ext.define('Admin.view.dashboard.Weather', {
    extend: 'Ext.Component',
    xtype: 'weather',
    baseCls: 'weather-panel',

    border: false,
    height: 80,

    data: {
        city: '合肥',
        figure2: 'qing',
        figure1: 'qing',
        temperature1:'',
        temperature2:'',
        pollution_l:'未知',
        status1:'未知',
        status2:'未知'
    },

    tpl: '<div class="weather-image-container"><img width="50px" src="resources/images/3d_180/{code}.png" alt="{status1}"/></div>'+
    '<div class="weather-details-container">' +
    '<div>{temperature}&#176;</div>' +
    '<div>城市：{city}，天气：{text}</div>' +
    '</div>',
    listeners:{
        render:function(){
            var me=this;
            Common.util.Util.doAjax({
                url: Common.Config.requestPath('System','Users', 'getWeather'),
                method: 'get'
            }, function (data) {
                console.log(data.data)
                me.setData(data.data);
            });
        }
    }
});
