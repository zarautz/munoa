'use strict';

Z.app.factory('placeSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var placeSource = new Z.DataSource(cache, $q);

    placeSource.setCacheKeys(['[place]', 'id', 'language']);
    placeSource.setCacheTTL(5);

    placeSource.setLoadDataCb(function (params) {
        return api.getPlace(params);
    });

    return placeSource;
}]);
