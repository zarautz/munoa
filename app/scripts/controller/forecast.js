'use strict';

Z.app.controller('ForecastController', ['$scope', 'forecastStore', function($scope, forecastStore) {
    //
    // Vars
    //
    $scope.activeTab = 0;

    //
    // Functions
    //
    $scope.changeTab = function (index) {
        $scope.activeTab = index;
    }

    $scope.refresh = function () {
        $scope.forecast = forecastStore.getForecast();
        $scope.today    = $scope.forecast.getTodayForecast();
    }

    //
    // Init
    //
    $scope.refresh();

    /*
    var now   = new Date(),
        hour  = now.getHours(),
        day   = now.getDate(),
        month = now.getMonth() + 1,
        year  = now.getFullYear(),
        today = year +'-'+ ('0' + month).slice(-2) +'-'+ ('0' + day).slice(-2);

    this.forecast = forecast.findAll();

    this.getForecastIndexForToday = function () {
        var i, length;

        for (i = 0, length = this.forecast.data.length; i < length; ++i) {
            if (this.forecast.data[i].date == today) {
                return i;
            }
        }
    };
    
    this.todayIndex   = this.getForecastIndexForToday();
    this.todayData    = this.forecast.data[this.todayIndex];
    this.activeTab    = 0;
    this.weatherCodes = weatherCode.findAll().data;

    this.getCurrentHourIndex = function () {
        return Math.floor(hour / (24 / this.todayData.weather.forecast.length));
    };

    this.getForecastWeatherCode = function (forecast, isToday) {
        var key;

        if (isToday) {
            key = Math.floor(hour / (24 / forecast.length));
        } else {
            key = Math.floor(12 / (24 / forecast.length));
        }

        return forecast[key].code;
    };

    this.activateTab = function (index) {
        this.activeTab = index;
    };*/
}]);
