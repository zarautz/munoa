'use strict';

Z.app.controller('ForecastController', ['forecast', function(forecast) {
    this.forecast = forecast.findAll();
}]);
