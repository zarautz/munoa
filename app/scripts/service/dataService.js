'use strict';

Z.app.factory('dataService', ['$q', 'cache', 'apiInterface', function($q, cache, apiInterface) {
    return {
        getForecast: function () {
            var cacheData = cache.get('forecast');

            // Return a promise
            if (cacheData) {
                var q = $q.defer();
                q.resolve(cacheData);
                return q.promise;
            }

            // Return a promise
            return apiInterface.getForecast().then(function (response) {
                // Check if it's good data
                // Cache data
                cache.set('forecast', response.data, 100000);

                return response.data;
            });
        },
        getTodayForecast: function () {
            return this.getForecast().then(function (data) {
                return data[0];
            });
        }
    };
}]);
