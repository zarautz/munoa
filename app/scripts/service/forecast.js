'use strict';

Z.app.factory('forecast', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(apiHost + '/forecast');

    return {
        findAll: function () {
            var forecast = cache.get('forecast.all');

            if (!forecast) {
                forecast = store.get(function (data) {
                    cache.set('forecast.all', data, 100000);
                });
            }

            return forecast;
        }
    };
}]);
