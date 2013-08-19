'use strict';

Z.app.factory('event', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(
        apiHost + '/events/:id',
        { id: '@id' },
        { query: { method: 'GET', isArray: false } }
    );

    return {
        findAll: function () {
            var entities = cache.get('events.all');

            if (!entities) {
                entities = store.query(function (data) {
                    cache.set('events.all', data, 10);
                });
            }

            return entities;
        }
    };
}]);
