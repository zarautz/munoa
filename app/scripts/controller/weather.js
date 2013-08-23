'use strict';

Z.app.controller('WeatherController', ['$filter', '$scope', 'forecastStore', function($filter, $scope, forecastStore) {
    //
    // Functions
    //
    $scope.changeTab = function (index) {
        $scope.activeTab = index;
    }

    $scope.getWeatherCode = function (forecast, useCurrentHour) {
        // Forecast might not be available as it's a promise
        // We end the execution returning null to avoid console warnings
        if (!forecast) { return null; }

        var forecast = forecast.weather.forecast,
            key;

        if (useCurrentHour) {
            key = Math.floor((new Date()).getHours() / (24 / forecast.length));
        } else {
            key = Math.floor(12 / (24 / forecast.length));
        }

        return forecast[key].code;
    }

    $scope.refresh = function () {
        $scope.activeTab        = 0;
        $scope.forecast         = forecastStore.getForecast(); 
        $scope.weatherCodes     = forecastStore.getWeatherCodes();
        $scope.today            = $scope.forecast.getTodayForecast();
        $scope.currentHourIndex = $scope.forecast.getCurrentHourIndex();
    }

    //
    // Init
    //
    $scope.refresh();
}]);
