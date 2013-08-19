'use strict';

Z.app.factory('post', ['$resource', 'apiHost', 'cache', function($resource, apiHost, cache) {
    var store = $resource(apiHost + '/posts/zuzarautz');

    return {
        findAll: function () {
            var entities = cache.get('posts.all');

            if (!entities) {
                entities = store.get(function (data) {
                    cache.set('posts.all', data, 10);
                });
            }

            return entities;
        }
    };
}]);
