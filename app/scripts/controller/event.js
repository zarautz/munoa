'use strict';

/*
var app = angular.module('app', []);

app.value('apiHost', 'http://pagoeta.illarra.com/v1')

app.factory('apiInterface', function(apiHost, $http) {
    return {
        getWeatherCodes: function () {
            return $http({
                method: 'GET',
                //params: {language: 'eu'},
                url: apiHost + '/forecast/weather/codes'
            }).then(function (response) {
                return response.data;
            });
        }
    };
});*/

Z.app.factory('WeatherCodesService', function (apiInterface, cache, $q) {
    //
    // DataBag
    //
    function DataBag(cache, $q, cacheKey) {
        this.$q       = $q;
        this.cache    = cache;
        this.cacheKey = cacheKey || ('key.' + Math.random());
        this.status   = {};

        this.reset();
    }

    DataBag.prototype.reset = function () {
        this.data = this.$q.defer();

        this.status.isError   = false;
        this.status.fromCache = false;
        this.status.isDone    = false;
        this.status.isOld     = false;
        this.status.isLoading = false;
    };

    DataBag.prototype.get = function () {
        return this.data.promise;
    };
  
    DataBag.prototype.getStatus = function () {
        return this.status;
    };

    DataBag.prototype.isResolved = function () {
        return this.data.promise.$$v !== undefined;
    };

    DataBag.prototype.isValid = function () {
        console.log(this.status);
        // There has been an error
        // It's old data
        // It's not done and is not loading
        if (this.status.isError ||
            this.status.isOld ||
            (!this.status.isDone && !this.status.isLoading)
        ) {
            console.error('isValid: isError || isOld || !(isDone && isLoading)');
            return false;
        }

        // Check if the cache is valid
        if (!this.cache.get(this.cacheKey) && !this.status.isLoading) {
            console.error('isValid: cache invalid');
            return false;
        }
        console.info('isValid: IS VALID');
        return true;
    };

    DataBag.prototype.load = function (dataPromiseCb) {
        // Check that it's a cb
        if (!angular.isFunction(dataPromiseCb)) {
            throw "DataBag::load needs a callback function as the argument";
        }
    
        // Reset the DataBag
        this.reset();
        
        // We're waiting to the dataPromise
        this.status.isLoading = true;

        // Check the cache
        var cacheData = this.cache.get(this.cacheKey);
    
        if (cacheData) {
            this.resolveWithCache(cacheData);
        } else {
            console.log("[DATABAG] Calling dataPromiseCb()");

            // Get the data promise
            var dataPromise = dataPromiseCb();
            var that = this;
          
            // Check if it's a promise, duck typing :-)
            if (!('catch' in dataPromise && 'finally' in dataPromise && 'then' in dataPromise)) {
                throw "DataBag::load needs a promise as the argument";
            }
      
            // When the promise is done
            dataPromise.then(function (data) {
                that.resolve(data);
                that.cache.set(that.cacheKey, data, 20);
            }, function (reason) {
                // Set the error status
                that.status.isError = true;
        
                // Try to get some old data
                var cacheData = that.cache.getOld(that.cacheKey);
        
                if (cacheData) {
                    that.resolveWithOldCache(cacheData);
                } else {
                    that.data.reject(reason);
                }
            });
        }
    }

    DataBag.prototype.resolve = function (value) {
        this.status.isDone  = true;
        this.status.isLoading = false;
        this.data.resolve(value);
        console.log("[DATABAG] Resolved. :-)");
    };
  
    DataBag.prototype.resolveWithCache = function (value) {
        this.status.fromCache = true;
        this.resolve(value);
    };
  
    DataBag.prototype.resolveWithOldCache = function (value) {
        this.status.isOld = true;
        this.resolveWithCache(value);
    };
  
    //
    // WeatherCodes
    //
    function WeatherCodesService(apiInterface, dataBag) {
        this.api  = apiInterface;
        this.data = dataBag;
    }

    WeatherCodesService.prototype.fetchData = function () {
        if (!this.data.isValid()) {
            // Set a promise for the data, this will only be called 
            // if there is not valid cache
            var that = this;

            this.data.load(function () {
                return that.api.getWeatherCodes();
            });
        }
    
        return this.data.get();
    };
  
    WeatherCodesService.prototype.getStatus = function () {
        return this.data.getStatus();
    };

    WeatherCodesService.prototype.getMeta = function () {
        return this.fetchData().then(function (response) {
            return response.meta;
        });
    }
  
    WeatherCodesService.prototype.findAll = function () {
        return this.fetchData().then(function (response) {
            return response.data;
        });
    };
  
    WeatherCodesService.prototype.findOneByCode = function (code) {
        return this.fetchData().then(function (response) {
            if (code in response.data) {
                var weatherCode  = response.data[code];
                weatherCode.code = code;

                return weatherCode;
            }
      
            return {};
        });
    };
  
    return new WeatherCodesService(apiInterface, new DataBag(cache, $q, 'weathercodes'));
});

Z.app.controller('EventController', function($scope, $timeout, WeatherCodesService) {
    $scope.refresh = function () {
        console.log('-------');
        this.all    = WeatherCodesService.findAll();
        this.code   = WeatherCodesService.findOneByCode(11);
        this.status = WeatherCodesService.getStatus();
        this.meta   = WeatherCodesService.getMeta();
    };

    $scope.loadCode = function (code) {
        $scope.code = WeatherCodesService.findOneByCode(code);
    }
    /*
    $timeout(function refresh() {
        $scope.refresh();
        $timeout(refresh, 2500);
    }, 2500);
    */
});
