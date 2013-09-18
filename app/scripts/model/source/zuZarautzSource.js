'use strict';

Z.app.factory('zuZarautzSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var zuZarautzSource = new Z.DataSource(cache, $q);

    zuZarautzSource.setCacheKeys(['[zuZarautz]']);
    zuZarautzSource.setCacheTTL(60 * 60 * 2);

    zuZarautzSource.setLoadDataCb(function () {
        return api.getZuZarautzPosts();
    });

    return zuZarautzSource;
}]);
