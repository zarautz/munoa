'use strict';

Z.app.factory('WeatherCodesStore', function ($http, apiHost, cache, $q) {
    function Result() {
        this.isError   = false;
        this.isLoaded  = false;
        this.isOld     = false;
        this.fromCache = false;
        this.response  = null;
    }

    Result.prototype.get = function (code) {
        return this.response.then(function (response) {
            return response.data[code];
        });
    }

    return {
        findAll: function () {
            var result     = new Result(),
                that       = this,
                collection = cache.get('WeatherCodesStore'),
                deferred   = $q.defer();

            // Defaults
            result.response = deferred.promise;

            if (!collection) {
                //
                // REQUEST
                //
                $http({
                    method: 'GET',
                    url: apiHost + '/forecast/weather/codes' + (Math.random() > 0.5 ? '.xxx' : '')
                }).then(function (response) {
                    //
                    // SUCCESS
                    //
                    cache.set('WeatherCodesStore', response.data, 5);
                    deferred.resolve(response.data);
                    result.isLoaded = true;
                }, function (reason) {
                    //
                    // ERROR
                    //
                    console.log(reason);
                    result.isError  = true;
                    result.isLoaded = true;

                    var collection = cache.getOld('WeatherCodesStore');

                    if (collection) {
                        deferred.resolve(collection);
                        result.isOld     = true;
                        result.fromCache = true;
                    } else {
                        deferred.reject('kaka');
                    }
                });
            } else {
                //
                // FROM CACHE
                //
                deferred.resolve(collection);
                result.isLoaded  = true;
                result.fromCache = true;
            }

            return result;
        }
    }
});

Z.app.controller('EventController', function($scope, $timeout, WeatherCodesStore) {
    $scope.refresh = function () {
        this.time   = new Date();
        this.result = WeatherCodesStore.findAll();
        this.code11 = this.result.get(11);
    }

    $scope.refresh();
    /*
    $timeout(function timeout() {
        $scope.refresh();
        $timeout(timeout, 5000);
    }, 1000);*/
});
