'use strict';

Z.app.factory('Event', ['$resource', 'apiHost', function($resource, apiHost) {
    return $resource(
        apiHost + '/events/:id',
        { id: '@id' }
    );
}]);
