'use strict';

Z.app.controller('ForecastController', ['forecast', function(forecast) {
    this.forecast  = forecast.findAll();
    this.today     = this.forecast.data[0];
    this.activeTab = 0;

    this.getMainForecastCode = function (forecast) {
        var selectionByLength = { 4: 2, 2: 1, 1: 0};

        return forecast[selectionByLength[forecast.length]]['code'];
    }

    this.activateTab = function (index) {
        this.activeTab = index;
    }
}]);
