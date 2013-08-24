'use strict';

Z.app.factory('ForecastStore', ['api', 'cache', '$q', function (api, cache, $q) {
    function ForecastStore(api, forecast) {
        this._api      = api;
        this._forecast = forecast;
    }
/*
    ForecastStore.prototype._fetchEvents = function () {
        if (!this._events.isValid()) {
            var that = this;

            // Set a promise for the data, this will only be called 
            // if there is not valid cache
            this._events.load(function () {
                return that.api.getEvents();
            });
        }
    
        return this._events.get();
    };
  
    ForecastStore.prototype.getStatus = function () {
        return this._events.getStatus();
    };

    ForecastStore.prototype.getMeta = function () {
        return this._fetchEvents().then(function (response) {
            return response.meta;
        });
    }
  
    ForecastStore.prototype.findAll = function () {
        return this._fetchEvents().then(function (response) {
            return response.data;
        });
    };*/
  
    return new ForecastStore(api, new Z.DataBag(cache, $q, 'forecast'));
}]);

/*
Z.app.factory('forecastStore', ['cache', 'apiInterface', '$q', '$filter', function(cache, apiInterface, $q, $filter) {
    var ForecastStore  = new Z.DataStore('forecast', cache, $q);
    var ForecastResult = function ForecastResult() {};
    var WeatherCodesResult = function WeatherCodesResult() {};

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

    // Extend Result
    WeatherCodesResult.prototype = new Z.DataStore.Result();

    WeatherCodesResult.prototype.get = function (code) {
        return this.response.then(function (response) {
            return response.data[code];
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
    }, WeatherCodesResult);

    return ForecastStore;
}]);*/
