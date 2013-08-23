'use strict';

Z.app.factory('forecastStore', ['cache', 'apiInterface', '$q', '$filter', function(cache, apiInterface, $q, $filter) {
    var ForecastStore  = new Z.DataStore('forecast', cache, $q);
    var ForecastResult = function ForecastResult() {};

    // Extend Result
    ForecastResult.prototype = new Z.DataStore.Result();

    ForecastResult.prototype.getTodayForecast = function () {
        return this.response.then(function (response) {
            return response.data[0];
        });
    }

    ForecastResult.prototype.getCurrentHourIndex = function () {
        var hour = (new Date()).getHours();

        return this.getTodayForecast().then(function (today) {
            return Math.floor(hour / (24 / today.weather.forecast.length));
        });
    }

    // DataStore methods
    ForecastStore.addMethod('getForecast', function () {
        return apiInterface.getForecast();
    }, function (apiResponse) {
        // Find out today index
        var today      = $filter('date')(new Date(), 'yyyy-MM-dd'),
            forecast   = apiResponse.data.data,
            todayIndex = 0,
            i;

        for (i = 0; i < forecast.length; i++) {
            if (forecast[i].date == today) {
                todayIndex = i;
                break;
            }
        }

        // Next four days only
        apiResponse.data.data = forecast.slice(todayIndex, todayIndex + 4);

        return apiResponse.data;
    }, ForecastResult);

    ForecastStore.addMethod('getWeatherCodes', function () {
        return apiInterface.getWeatherCodes();
    }, function (apiResponse) {
        return apiResponse.data;
    });

    return ForecastStore;
}]);
