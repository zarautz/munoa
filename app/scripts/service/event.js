'use strict';

Z.app.factory('Event', ['$resource', 'apiHost', '$cacheFactory', function($resource, apiHost, $cacheFactory) {
    var cache    = $cacheFactory('event');
    var resource = $resource(
        apiHost + '/events/:id',
        { id: '@id' }
    );

    return {
        findAll: function () {
            var events = cache.get('all');

            if (!events) {
                events = resource.query();
                cache.put('all', events);
            }

            return events;
        }
    }
}]);
