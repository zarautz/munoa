'use strict';

Z.app.factory('Event', ['$resource', function($resource) {
    return $resource(
        'http://zarautz.apiary.io/event/:eventId',
        { eventId: '@id' },
        {}
    );
}]);
