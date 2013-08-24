'use strict';

Z.app.factory('ForecastStore', ['WeatherCodesStore', '$filter', 'api', 'cache', '$q', function (WeatherCodesStore, $filter, api, cache, $q) {
    //
    // Forecast
    //
    function Forecast() {
    }

    Forecast.prototype.getCurrentWeatherCode = function () {
        return this.weather.forecast[this.getCurrentHourIndex()].code;
    }        

    Forecast.prototype.getWeatherCode = function () {
        var useCurrentHour = ($filter('date')(new Date(), 'yyyy-MM-dd')) == this.date,
            forecast       = this.weather.forecast,
            key;

        if (useCurrentHour) {
            key = Math.floor((new Date()).getHours() / (24 / forecast.length));
        } else {
            key = Math.floor(12 / (24 / forecast.length));
        }

        return forecast[key].code;
    }

    Forecast.prototype.getCurrentHourIndex = function () {
        return Math.floor((new Date()).getHours() / (24 / this.weather.forecast.length));
    }

    //
    // ForecastStore
    //
    function ForecastStore(api, forecast) {
        this._api      = api;
        this._forecast = forecast;

        // Set data initialization callback
        this._forecast.setInitCb(this._initForecast);
    }

    ForecastStore.prototype._initForecast = function (response) {
        // Get the first 4 Forecasts
        // Find out today index
        var today      = $filter('date')(new Date(), 'yyyy-MM-dd'),
            forecast   = response.data,
            todayIndex = 0,
            i;

        for (i = 0; i < forecast.length; i++) {
            if (forecast[i].date == today) {
                todayIndex = i;
                break;
            }
        }

        // Get the next four days
        response.data = forecast.slice(todayIndex, todayIndex + 4);

        // Convert array in Forecast objects
        angular.forEach(response.data, function (day, i) {
            response.data[i] = angular.extend(new Forecast(), day);
        });

        return response;
    };

    ForecastStore.prototype._fetchForecast = function () {
        if (!this._forecast.isValid()) {
            var that = this;

            // Set a promise for the data, this will only be called 
            // if there is not valid cache
            this._forecast.load(function () {
                return that._api.getForecast();
            });
        }
    
        return this._forecast.get();
    };

    ForecastStore.prototype.getStatus = function () {
        return this._forecast.getStatus();
    };

    ForecastStore.prototype.getMeta = function () {
        return this._fetchForecast().then(function (response) {
            return response.meta;
        });
    }
  
    ForecastStore.prototype.getForecast = function () {
        return this._fetchForecast().then(function (response) {
            return response.data;
        });
    };

    ForecastStore.prototype.getTodayForecast = function () {
        return this.getForecast().then(function (forecast) {
            return forecast[0];
        });
    };
  
    return new ForecastStore(api, new Z.DataBag(cache, $q, 'forecast'));
}]);
