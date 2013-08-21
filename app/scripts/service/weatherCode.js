'use strict';

Z.app.factory('weatherCode', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(apiHost + '/forecast/weather/codes');

    return {
        findAll: function () {
            var key = 'weatherCodes.all',
                entities = cache.get(key);

            if (!entities) {
                entities = store.get(function (data) {
                    cache.set(key, data, 100000);
                });
            }

            return entities;
        }
    };
}]);
