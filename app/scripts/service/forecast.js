'use strict';

Z.app.factory('forecast', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(apiHost + '/forecast');

    return {
        findAll: function () {
            var forecast = cache.get('forecasts.all');

            if (!forecast) {
                forecast = store.get(function (data) {
                    cache.set('forecasts.all', data, 10);
                });
            }

            return forecast;
        }
    };
}]);
