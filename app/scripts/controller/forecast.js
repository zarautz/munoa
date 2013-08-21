'use strict';

Z.app.controller('ForecastController', ['forecast', 'weatherCode', 'dataService', function(forecast, weatherCode, dataService) {
    //this.forecast     = forecast.findAll();
    //this.today        = this.forecast.data[0];
    this.activeTab    = 0;
    this.weatherCodes = weatherCode.findAll().data;
    this.forecast     = dataService.getForecast();
    this.today        = dataService.getTodayForecast();

    this.getMainForecastCode = function (forecast) {
        var selectionByLength = { 4: 2, 2: 1, 1: 0};

        return forecast[selectionByLength[forecast.length]]['code'];
    }

    this.activateTab = function (index) {
        this.activeTab = index;
    }
}]);
