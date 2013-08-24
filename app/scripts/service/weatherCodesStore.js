'use strict';

Z.app.factory('WeatherCodesStore', ['api', 'cache', '$q', function (api, cache, $q) {
    function WeatherCodesStore(api, codes) {
        this._api   = api;
        this._codes = codes;
    }

    WeatherCodesStore.prototype._fetchCodes = function () {
        if (!this._codes.isValid()) {
            var that = this;

            // Set a promise for the data, this will only be called 
            // if there is not valid cache
            this._codes.load(function () {
                return that._api.getWeatherCodes();
            });
        }
    
        return this._codes.get();
    };
  
    WeatherCodesStore.prototype.getStatus = function () {
        return this._codes.getStatus();
    };

    WeatherCodesStore.prototype.getMeta = function () {
        return this._fetchCodes().then(function (response) {
            return response.meta;
        });
    }
  
    WeatherCodesStore.prototype.getAll = function () {
        return this._fetchCodes().then(function (response) {
            return response.data;
        });
    };
  
    WeatherCodesStore.prototype.getOneByCode = function (code) {
        return this._fetchCodes().then(function (response) {
            if (code in response.data) {
                var weatherCode  = response.data[code];
                weatherCode.code = code;

                return weatherCode;
            }
      
            return {};
        });
    };
  
    return new WeatherCodesStore(api, new Z.DataBag(cache, $q, 'weathercodes'));
}]);