'use strict';

Z.app.factory('placeSource', ['api', 'cache', '$q', '$timeout', function (api, cache, $q, $timeout) {
    var placeSource = new Z.DataSource(cache, $q);

    placeSource.setCacheKeys(['[place]', 'id', 'language']);
    placeSource.setCacheTTL(5);
    placeSource.setLoadDataCb(function (params) {
        return $timeout(function () {
            return api.getPlace(params);
        }, Math.random() * 2000);
    });

    return placeSource;
}]);
