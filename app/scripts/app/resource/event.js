'use strict';

Z.app.factory('Event', ['host', '$resource', function(host, $resource) {
    return $resource(
        host + '/events/:eventId',
        { eventId: '@id' },
        {}
    );
}]);
