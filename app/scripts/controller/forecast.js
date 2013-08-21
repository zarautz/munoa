'use strict';

Z.app.controller('ForecastController', ['forecast', 'weatherCode', function(forecast, weatherCode) {
    this.forecast     = forecast.findAll();
    this.today        = this.forecast.data[0];
    this.activeTab    = 0;
    this.weatherCodes = weatherCode.findAll().data;

    this.getMainWeatherCode = function (forecast, index) {
        var now, key;

        if (index === 0) {
            now = new Date();
            key = Math.floor(now.getHours() / (24 / forecast.length));
        } else {
            key = Math.floor(12 / (24 / forecast.length));
        }

        return forecast[key].code;
    };

    this.activateTab = function (index) {
        this.activeTab = index;
    };
}]);
