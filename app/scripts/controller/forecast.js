'use strict';

Z.app.controller('ForecastController', ['forecast', 'weatherCode', function(forecast, weatherCode) {
    this.forecast     = forecast.findAll();
    this.today        = this.forecast.data[0];
    this.activeTab    = 0;
    this.weatherCodes = weatherCode.findAll().data;

    this.getMainForecastCode = function (forecast) {
        var selectionByLength = { 4: 2, 2: 1, 1: 0};

        return forecast[selectionByLength[forecast.length]]['code'];
    }

    this.activateTab = function (index) {
        this.activeTab = index;
    }
}]);
