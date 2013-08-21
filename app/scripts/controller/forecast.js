'use strict';

Z.app.controller('ForecastController', ['forecast', 'weatherCode', function(forecast, weatherCode) {
    var now = new Date();

    this.forecast     = forecast.findAll();
    this.today        = this.forecast.data[0];
    this.hour         = now.getHours();
    this.activeTab    = 0;
    this.weatherCodes = weatherCode.findAll().data;

    this.forecastIsToday = function (index) {
        return index === 0;
    };

    this.getCurrentHourIndex = function () {
        return Math.floor(this.hour / (24 / this.today.weather.forecast.length));
    };

    this.getForecastWeatherCode = function (forecast, isToday) {
        var key;

        if (isToday) {
            key = Math.floor(this.hour / (24 / forecast.length));
        } else {
            key = Math.floor(12 / (24 / forecast.length));
        }

        return forecast[key].code;
    };

    this.activateTab = function (index) {
        this.activeTab = index;
    };
}]);
