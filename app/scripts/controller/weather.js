'use strict';

Z.app.controller('WeatherController', ['apiInterface', '$filter', '$scope', 'forecastStore', function(apiInterface, $filter, $scope, forecastStore) {
    $scope.refresh = function () {
        this.forecast = apiInterface.getForecast().then(function (response) {
            return response.data;
        });

        this.today = this.forecast.then(function (forecast) {
            return forecast[0];
        });
    }

    //
    // Init
    //
    $scope.refresh();
    /*
    //
    // Functions
    //
    $scope.changeTab = function (index) {
        $scope.activeTab = index;
    }

    $scope.getWeatherCode = function (forecast) {
        // Forecast might not be available as it's a promise
        // We end the execution returning null to avoid console warnings
        if (!forecast.weather) { return null; }

        var useCurrentHour = ($filter('date')(new Date(), 'yyyy-MM-dd')) == forecast.date,
            forecast       = forecast.weather.forecast,
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
        $scope.todayCode        = this.weatherCodes.get(this.getWeatherCode(this.today));
    }

    //
    // Init
    //
    $scope.refresh();
    */
}]);
