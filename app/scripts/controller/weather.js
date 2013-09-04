'use strict';

Z.app.controller('WeatherController', ['$scope', 'settings', 'forecastMapper', function($scope, settings, forecastMapper) {
    this.changeTab = function (index) {
        this.activeTab = index;
    };

    this.refresh = function () {
        this.activeTab = 0;

        // Forecast
        var forecast = forecastMapper.get({'language': settings.get('language')});

        this.forecast = forecast.promise;
        this.status   = forecast.status;
    };

    this.refresh();
}]);
