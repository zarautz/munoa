'use strict';

Z.app.factory('event', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(
        apiHost + '/events/:id',
        { id: '@id' }
    );

    return {
        findAll: function () {
            var events = cache.get('events.all');

            if (!events) {
                events = store.query(function (data) {
                    cache.set('events.all', data, 10);
                });
            }

            return events;
        }
    };
}]);
