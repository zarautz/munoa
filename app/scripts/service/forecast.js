'use strict';

Z.app.factory('forecast', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(
        apiHost + '/forecasts/:id',
        { id: '@id' }
    );

    return {
        findAll: function () {
            var events = cache.get('forecasts.all');

            if (!events) {
                events = store.query(function (data) {
                    cache.set('forecasts.all', data, 10);
                });
            }

            return events;
        }
    };
}]);
