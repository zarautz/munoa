'use strict';

Z.app.factory('forecastStore', ['cache', 'apiInterface', '$q', function(cache, apiInterface, $q) {
    var ForecastStore  = new Z.DataStore('forecast', cache, $q);
    var ForecastResult = function ForecastResult() {};

    // Extend Result
    ForecastResult.prototype = new Z.DataStore.Result();
    ForecastResult.prototype.constructor = ForecastResult;

    ForecastResult.getTodayForecast = function () {
        return this.data.then(function (data) {
            return data[0];
        });
    }

    // DataStore methods
    ForecastStore.addMethod('getForecast', function () {
        return apiInterface.getForecast();
    }, function (apiResponse) {
        return apiResponse.data.data;
    }, ForecastResult);

    return ForecastStore;
}]);
