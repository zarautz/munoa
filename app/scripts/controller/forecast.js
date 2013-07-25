'use strict';

Z.app.controller('ForecastController', ['forecast', function(forecast) {
    this.forecasts = forecast.findAll();
}]);
